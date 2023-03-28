import fs from 'fs'
import path from 'path'
// takes a message as input and an optional options object
export function logger(
  message,
  options = { console: true, file: true, filename: 'file.log' },
) {
  // get the timestamp
  const timestamp = new Date().toLocaleString()
  // if the console option is true, the timestamp and message is logged to the console
  if (options.console) {
    console.log(`${timestamp} - ${message}`)
  }
  // if the file option is true, the function creates a write stream for the log file
  if (options.file) {
    // create the log directory path relative to the current directory
    const logDir = path.join('.', 'log')
    // set default filename to 'file.log'
    const filename = options.filename || 'file.log'
    // create the log file path by joining the log directory path and filename
    const logFilePath = path.join(logDir, filename)

    // Check if the log directory exists, and create it if it doesn't
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir)
    }
    // create a write stream for the log file and write to the specified path.
    const logStream = fs.createWriteStream(logFilePath, { flags: 'a' })
    // write the message and timestamp to the log file
    logStream.write(`${timestamp} - ${message}\n`)
  }
}
