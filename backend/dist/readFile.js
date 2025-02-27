const fs = require('fs');
const path = require('path');

// Path to the extracted file
const extractedFilePath = "C:/Users/corey/jira-at-home/React-Self-Study/backend/dist/extracted/1.txt";

// Function to read the file as binary data
function readFileAsBinary() {
  fs.readFile(extractedFilePath, (err, data) => {
    if (err) {
      console.log("Error reading file:", err);
      return;
    }

    // Convert the binary data to hex string
    console.log("Raw binary data (hex):");
    console.log(data.toString('hex')); // Display the data in hexadecimal form

    // Convert the hex back to a buffer (assuming UTF-8 or another text encoding)
    const buffer = Buffer.from(data, 'hex');
    
    // Try to decode it as UTF-8
    const text = buffer.toString('utf-8');

    // Display the decoded text
    console.log("\nDecoded text:");
    console.log(text);
  });
}

// Call this function to read the file as raw binary
readFileAsBinary();
