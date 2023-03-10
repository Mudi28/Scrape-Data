import axios from 'axios'
import { load } from 'cheerio'
import minimist from 'minimist'
import fs from 'fs'
import path from 'path'
import os from 'os'
// set to keep track of visited pages
const visitedPages = new Set()

// queue to keep track of links to visit
const linksToVisit = ['https://scrapeme.live/shop/page/1/']

// array to store products
const products = []

// create write stream for console.log output to file
const logStream = fs.createWriteStream('file.log', { flags: 'a' })
async function scrapeData() {
  try {
    // iterate over the links in the queue
    while (linksToVisit.length > 0) {
      // get the next link to visit from the front of the queue
      const link = linksToVisit.shift()

      // check if the link has already been visited
      if (visitedPages.has(link)) {
        // if the link has already been visited, skip it and move on to the next link in the queue
        continue
      }

      // mark the link as visited
      visitedPages.add(link)

      // make an HTTP GET request to the specified URL expecting a response
      const response = await axios.get(link)

      // extract the HTML content from the request response
      const html = response.data

      // loading HTML content in the cheerio document
      const $ = load(html)

      // Selects all DOM elements with the class 'product'
      const productElements = $('.product')

      // iterate through each product element.
      for (let i = 0; i < productElements.length; i++) {
        // extract product name,image,url,price from the element
        const element = productElements[i]
        const name = $(element).find('.woocommerce-loop-product__title').text()
        const image = $(element).find('img').attr('src')
        const url = $(element)
          .find('a.woocommerce-LoopProduct-link.woocommerce-loop-product__link')
          .attr('href')
        const price = $(element).find('span.price').text()

        // create a product object containing the extracted information
        const product = {
          name: name,
          image: image,
          url: url,
          price: price,
        }

        // add the product object to the product array.
        products.push(product)
      }
      logStream.write(`Scraped data from ${link}\n`)
      console.log(`Scraped data from ${link}`)
      // select all the elements that represent links to the next page
      const nextPageUrls = $('a.page-numbers')
      // loop through each of the next page links using .each()
      nextPageUrls.each(function () {
        const nextPageUrl = $(this).attr('href')
        // check if the next page URL is not already in the list of links to visit
        if (!linksToVisit.includes(nextPageUrl)) {
          // if the next page URL is not in the list of links to visit, add it to the list
          linksToVisit.push(nextPageUrl)
        }
      })
    }

    // if there are no more links to visit, export the data to a file
    await exportData(products)
  } catch (error) {
    console.error(error)
  }
}
scrapeData()

// this function exportData using the minimist library
async function exportData() {
  // parse command line arguments using minimist
  const args = minimist(process.argv.slice(2), {
    string: ['export_format'], // 'export' as a string argument
    alias: { e: 'export_format' }, // '-e' as an alias for 'export'
  })

  // check if the `--export_format` argument is provided and its value
  const exportFormat = args.export_format && args.export_format.toUpperCase()
  if (!exportFormat) {
    // if export format is not specified, don't export anything
    return
  }

  // create a folder for the exported files, if it doesn't already exist
  const folderPath = path.join(process.cwd(), 'export-data')
  try {
    await fs.promises.mkdir(folderPath, { recursive: true })
    console.log(`Directory ${folderPath} found successfully!`)
  } catch (error) {
    console.error(`Error creating directory: ${error}`)
  }

  // export data to a json file
  if (exportFormat === 'JSON') {
    const jsonData = JSON.stringify(products)
    const filePath = path.join(folderPath, 'product.json')
    try {
      await fs.promises.writeFile(filePath, jsonData)
      console.log('Correct export format. Data exported to product.json')
    } catch (error) {
      console.log('Error exporting data:', error)
    }

    // export data to a csv file
  } else if (exportFormat === 'CSV') {
    const csvData = `name,image,url,price${os.EOL}${products
      .map(
        (product) =>
          `${product.name},${product.image},${product.url},${product.price}`,
      )
      .join(os.EOL)}`
    const filePath = path.join(folderPath, 'product.csv')
    try {
      await fs.promises.writeFile(filePath, csvData)
      console.log('Correct export format. Data exported to product.csv')
    } catch (error) {
      console.log('Error exporting data:', error)
    }
  } else if (exportFormat) {
    console.error('Invalid export format. Only CSV and JSON are supported.')
  }
}
