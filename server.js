const express = require("express");
const fs = require("fs");
const path = require("path");
const marked = require("marked");
const { Storage } = require("@google-cloud/storage");
const rateLimit = require("express-rate-limit");

const app = express();
const port = process.env.PORT || 8080;
const BUCKET_NAME = process.env.BUCKET_NAME || "lang-assist-25";

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// GCS client
const storage = new Storage();
const bucket = storage.bucket(BUCKET_NAME);

// Local storage path
const LOCAL_STORAGE_PATH = path.join(__dirname, "local_storage");

// Create local storage directory if it doesn't exist
if (!fs.existsSync(LOCAL_STORAGE_PATH)) {
  fs.mkdirSync(LOCAL_STORAGE_PATH, { recursive: true });
}

// Read document from local storage or GCS
async function readDocument(documentPath) {
  const localPath = path.join(LOCAL_STORAGE_PATH, documentPath);

  try {
    // Try to read from local storage first
    if (fs.existsSync(localPath)) {
      console.log("Reading from local storage:", localPath);
      return fs.readFileSync(localPath, "utf-8");
    }

    // If not in local storage, get from GCS and save locally
    console.log("Fetching from GCS:", documentPath);
    const [exists] = await bucket.file(`public/${documentPath}`).exists();
    if (!exists) {
      throw new Error("File not found in GCS");
    }

    const [content] = await bucket.file(`public/${documentPath}`).download();
    const fileContent = content.toString("utf-8");

    // Ensure directory exists
    const dir = path.dirname(localPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Save to local storage
    fs.writeFileSync(localPath, fileContent);
    console.log("Saved to local storage:", localPath);

    return fileContent;
  } catch (error) {
    console.error(`Error reading document: ${error}`);
    throw error;
  }
}

// Clear local storage
app.get("/_clear", (req, res) => {
  try {
    if (fs.existsSync(LOCAL_STORAGE_PATH)) {
      fs.rmSync(LOCAL_STORAGE_PATH, { recursive: true, force: true });
      fs.mkdirSync(LOCAL_STORAGE_PATH, { recursive: true });
      console.log("Local storage cleared");
    }
    res.send("Local storage cleared successfully");
  } catch (error) {
    console.error("Error clearing local storage:", error);
    res.status(500).send("Error clearing local storage");
  }
});

// Health check endpoint
app.get("/_health", (req, res) => {
  res.status(200).send("OK");
});

// Public markdown files endpoint
app.get("/_internal/*", async (req, res) => {
  const requestedPath = decodeURIComponent(req.params[0].split("?")[0]);

  try {
    const content = await readDocument(requestedPath);

    if (requestedPath.endsWith(".svg")) {
      res.type("svg").send(content);
      return;
    }

    const htmlContent = marked.parse(content);

    const fullHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lang Assist Docs</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #24292e;
          }
          pre { 
            background: #f6f8fa;
            padding: 16px;
            border-radius: 6px;
            overflow-x: auto;
          }
          code { 
            background: #f6f8fa;
            padding: 2px 4px;
            border-radius: 3px;
          }
          h1, h2, h3, h4, h5, h6 {
            margin-top: 24px;
            margin-bottom: 16px;
            font-weight: 600;
            line-height: 1.25;
          }
          h1 { font-size: 2em; }
          h2 { font-size: 1.5em; }
          h3 { font-size: 1.25em; }
          a { color: #0366d6; text-decoration: none; }
          a:hover { text-decoration: underline; }
          img { max-width: 100%; }
          table {
            border-spacing: 0;
            border-collapse: collapse;
            margin: 16px 0;
          }
          table th, table td {
            padding: 6px 13px;
            border: 1px solid #dfe2e5;
          }
          table tr:nth-child(2n) {
            background-color: #f6f8fa;
          }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `;

    res.type("html").send(fullHtml);
  } catch (error) {
    console.error("File processing error:", error);
    res.status(404).send("Document not found");
  }
});

// Wildcard route for all other paths
app.get("*", (req, res) => {
  console.log("Unknown path:", req.path);
  res.status(404).send("Not found");
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).send("Internal server error");
});

app.listen(port, () => {
  console.log(`Documentation server running on port ${port}`);
  console.log(`Working directory: ${__dirname}`);
  console.log(`Local storage path: ${LOCAL_STORAGE_PATH}`);
  console.log(`Using GCS bucket: ${BUCKET_NAME}`);
});
