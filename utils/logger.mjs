import fs from 'fs'
import path from 'path'
// takes a message as input and an optional options object
export function logger(
  message,
  options = { console: true, file: true, filename: 'file.log' },
) {
  // if the console option is true, the message is logged to the console
  if (options.console) {
    console.log(message)
  }
  // if the file option is true, the function creates a write stream for the log file
  if (options.file) {
    // set default filename to 'file.log'
    const filename = options.filename || 'file.log'
    // create a write stream for the log file and write to the specified path.
    const logStream = fs.createWriteStream(path.join('log', filename), {
      flags: 'a',
    })
    // write the message to the log file
    logStream.write(`${message}\n`)
  }
}
