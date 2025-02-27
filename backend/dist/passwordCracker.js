const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');

// Path to the 7z executable
const sevenZipPath = "C:\\Program Files\\7-Zip\\7z.exe"; // Ensure this is the correct path

// Paths for the archive and extraction directory
const archivePath = "C:/Users/corey/jira-at-home/React-Self-Study/backend/dist/1.7z";
const extractPath = "C:/Users/corey/jira-at-home/React-Self-Study/backend/dist/extracted";

// Function to extract the file with a given password
function extractFileWithPassword(password) {
  return new Promise((resolve, reject) => {
    const command = `"${sevenZipPath}" x "${archivePath}" -o"${extractPath}" -p${password} -y`;

    
    // Spawn a new process to run 7z with the password
    const process = spawn(command, { shell: true });

    // Capture standard output
    process.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    // Capture standard error output
    process.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    // Capture the close event to determine success/failure
    process.on('close', (code) => {
      if (code === 0) {
        console.log("Extraction successful!");
        resolve();
      } else {
        reject(new Error(`Extraction failed with password ${password}`));
      }
    });
  });
}

// Function to try all 4-digit passwords
async function crackPassword() {
  for (let i = 0; i <= 9999; i++) {
    const password = String(i).padStart(4, '0'); // Ensure 4 digits with leading zeros
    console.log(`Trying password: ${password}`);

    try {
      await extractFileWithPassword(password); // Attempt to extract with this password
      console.log(`Password found: ${password}`);

      // Read the extracted file (assuming it's '1.txt')
      const filePath = path.join(extractPath, '1.txt');
      console.log(`Checking extracted file at: ${filePath}`);

      if (fs.existsSync(filePath)) {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        console.log("Extracted file contents:");
        console.log(fileContents);
      } else {
        console.log("Extracted file not found.");
      }
      return; // Exit the loop once the correct password is found
    } catch (error) {
      console.log(`Password ${password} failed.`);
    }
  }

  console.log("No valid password found.");
}

// Start cracking the password
crackPassword();
