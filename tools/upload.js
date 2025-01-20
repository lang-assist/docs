const { exec } = require("child_process");
const path = require("path");
const fs = require("fs").promises;
const util = require("util");
const exportDiagrams = require("./export-diagrams");

const execAsync = util.promisify(exec);
const BUCKET_NAME = process.env.BUCKET_NAME || "lang-assist-25";

async function uploadToGCS() {
  try {
    // Check if public directory exists
    const publicDir = path.join(__dirname, "..", "public");
    try {
      await fs.access(publicDir);
    } catch (error) {
      console.error("Public directory not found!");
      process.exit(1);
    }

    console.log("Exporting diagrams...");
    await exportDiagrams();

    console.log("Uploading files to GCS...");

    // Sync with GCS using gsutil
    const command = `gsutil -m rsync -d -r "${publicDir}" "gs://${BUCKET_NAME}/public"`;

    const { stdout, stderr } = await execAsync(command);

    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);

    console.log("Upload completed successfully!");
  } catch (error) {
    console.error("Upload error:", error);
    process.exit(1);
  }
}

// Run if script is executed directly
if (require.main === module) {
  uploadToGCS();
}

module.exports = { uploadToGCS };
