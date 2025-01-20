const fs = require("fs").promises;
const path = require("path");
const childProcess = require("child_process");
const os = require("os");

// Get draw.io command based on OS
const isWindows = os.platform() === "win32";
const DRAWIO_COMMAND = isWindows ? "draw.io.exe" : "drawio";
const DRAWIO_DIR = isWindows
  ? '"C:\\Program Files\\draw.io"'
  : "/usr/local/bin";

async function findDrawioFiles(dir) {
  const files = [];

  async function scan(directory) {
    const entries = await fs.readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        await scan(fullPath);
      } else if (entry.name.endsWith(".drawio")) {
        files.push(fullPath);
      }
    }
  }

  await scan(dir);
  return files;
}

function exportDiagram(filePath) {
  return new Promise((resolve, reject) => {
    const outputPath = `"${filePath.replace(".drawio", ".svg")}"`;
    const f = `"${filePath}"`;

    console.log(`Exporting: ${path.basename(filePath)}`);

    const process = childProcess.spawn(
      DRAWIO_COMMAND,
      ["-x", "--format", "svg", "-o", outputPath, f],
      {
        shell: true,
        env: {
          ...process.env,
          PATH: `${process.env.PATH}${path.delimiter}${DRAWIO_DIR}`,
        },
      }
    );

    process.stdout.on("data", (data) => {
      console.log(`🔗 ${data.toString().trim()}`);
    });

    process.stderr.on("data", (data) => {
      console.error(`❌ ${data.toString().trim()}`);
    });

    process.on("close", (code) => {
      if (code === 0) {
        console.log(`✅ Exported to: ${outputPath}`);
        resolve();
      } else {
        reject(new Error(`❌ Export failed with code ${code}`));
      }
    });

    process.on("error", (error) => {
      reject(new Error(`❌ Export failed with error: ${error.message}`));
    });
  });
}

async function exportDiagrams() {
  try {
    const publicDir = path.join(__dirname, "..", "public");
    console.log("🔍 Searching for .drawio files in public directory...");
    const files = await findDrawioFiles(publicDir);

    if (files.length === 0) {
      console.log("ℹ️ No .drawio files found");
      return;
    }

    console.log(`📋 Found ${files.length} .drawio files`);

    // Export each file sequentially
    for (const file of files) {
      try {
        await exportDiagram(file);
      } catch (error) {
        console.error(`❌ Failed to export ${file}:`, error.message);
      }
    }

    console.log("✨ Diagram export process completed!");
  } catch (error) {
    console.error("❌ Error during diagram export:", error.message);
    throw error;
  }
}

// Run if script is executed directly
if (require.main === module) {
  exportDiagrams().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = exportDiagrams;
