import axios from 'axios'
import { load } from 'cheerio'
import { exportData } from './utils/export.mjs'
import { logger } from './utils/logger.mjs'
// create write stream for console.log output to file
async function scrapeData() {
  // set to keep track of visited pages
  const visitedPages = new Set()

  // queue to keep track of links to visit
  const linksToVisit = ['https://scrapeme.live/shop/page/1/']

  // array to store products
  const products = []
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
        logger(` ${name} `, {
          console: false,
          file: true,
          filename: 'name.log',
        })
        // add the product object to the product array.
        products.push(product)
      }

      logger(`Scraped data from ${link}`, {
        console: true,
        file: true,
      })
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
