// runScriptPython.js
const { spawn } = require('child_process');

function runScriptPython(file1Path, file2Path) {
  return new Promise((resolve, reject) => {
    const process = spawn('python', ['./scripts/compare_xlsm_files.py', file1Path, file2Path]);

    process.stdout.on('data', (data) => {
      // Handle script output
      resolve(data.toString());
    });

    process.stderr.on('data', (data) => {
      // Handle script errors
      reject(data.toString());
    });
  });
}

module.exports = { runScriptPython };
