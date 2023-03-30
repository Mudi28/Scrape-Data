import minimist from 'minimist'
import path from 'path'
import os from 'os'
import fsPromises from 'fs/promises'
import { logger } from './logger.js'
import * as CONSTANTS from '../constants.js'
export async function exportData(products) {
  // parse command line arguments using minimist
  const args = minimist(process.argv.slice(2), {
    string: [CONSTANTS.EXPORT_FORMAT], // 'export' as a string argument
    alias: { e: CONSTANTS.EXPORT_FORMAT }, // '-e' as an alias for 'export'
  })

  // check if the `--export_format` argument is provided and its value
  const exportFormat = args.export_format && args.export_format.toUpperCase()
  if (!exportFormat) {
    // if export format is not specified, don't export anything
    return
  }

  // create a folder for the exported files, if it doesn't already exist
  const folderPath = path.join(process.cwd(), CONSTANTS.FOLDER_NAME1)

  try {
    await fsPromises.mkdir(folderPath, { recursive: true })
    logger(`[INFO] - Directory : ${folderPath} - Found successfully! `, {
      console: true,
      file: true,
    })
  } catch (error) {
    logger(`[ERROR] - Error creating directory : ${error}`, {
      console: true,
      file: true,
    })
  }

  // export data to a json file
  if (exportFormat === 'JSON') {
    const jsonData = JSON.stringify(products)
    const filePath = path.join(folderPath, CONSTANTS.PRODUCT_JSON)
    try {
      await fsPromises.writeFile(filePath, jsonData)
      logger(`[INFO] - Correct export format. Data exported to product.json`, {
        console: true,
        file: true,
      })
    } catch (error) {
      logger(`[ERROR] - Error exporting data : ${error}`, {
        console: true,
        file: true,
      })
    }

    // export data to a csv file
  } else if (exportFormat === 'CSV') {
    const csvData = `name,image,url,price${os.EOL}${products
      .map(
        (product) =>
          `${product.name} , ${product.image} , ${product.url} , ${product.price}`,
      )
      .join(os.EOL)}`
    const filePath = path.join(folderPath, CONSTANTS.PRODUCT_CSV)
    try {
      await fsPromises.writeFile(filePath, csvData)
      logger(`[INFO] - Correct export format. Data exported to product.csv`, {
        console: true,
        file: true,
      })
    } catch (error) {
      logger(`[ERROR] - Error exporting data: ${error}`, {
        console: true,
        file: true,
      })
    }
  } else if (exportFormat) {
    logger(
      `[ERROR] - Invalid export format. Only CSV and JSON are supported.`,
      {
        console: true,
        file: true,
      },
    )
  }
}
