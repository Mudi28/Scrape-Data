import axios from 'axios'
import { load } from 'cheerio'
import fs from 'fs'
import minimist from 'minimist'

// Parse command line arguments using minimist
const args = minimist(process.argv.slice(2), {
  string: ['export'], // 'export' as a string argument
  alias: { e: 'export' }, // '-e' as an alias for 'export'
})

// This function scrapes data using the axios and cheerio libraries
async function scrapeData() {
  try {
    // make an HTTP GET request to the specified URL expecting a response
    const response = await axios.get('https://scrapeme.live/shop/page/2/')
    // extract the HTML content from the request response
    const htmlContent = response.data
    // Loading HTML content in the cheerio document
    const $ = load(htmlContent)
    // create an empty array for the extracted products
    const products = []
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
      //add the product object to the product array
      products.push(product)
    }

    // Check if the `--export` argument is provided and its value
    const exportFormat = args.export && args.export.toUpperCase()
    if (exportFormat === 'JSON') {
      // Export data to a JSON file
      const jsonData = JSON.stringify(products)
      fs.writeFileSync('product.json', jsonData)
      console.log('Correct export format. Data exported to product.json')
    } else if (exportFormat === 'CSV') {
      // Export data to a CSV file
      const csvData = products
        .map(
          (product) =>
            `${product.name},${product.image},${product.url},${product.price}`,
        )
        .join('\n')
      fs.writeFileSync('product.csv', csvData)
      console.log('Correct export format. Data exported to product.csv')
    } else if (exportFormat) {
      console.error('Invalid export format. Only CSV and JSON are supported.')
    } else {
      console.log(products)
    }
  } catch (error) {
    console.error(error)
  }
}

scrapeData()
