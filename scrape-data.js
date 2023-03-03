import axios from 'axios';
import { load } from 'cheerio';

console.log('Hello, World!');

console.log('ESLint and Prettier are working on save!');

console.log('ESLint and Prettier are working on save!');
// This function scrapes data using the axios and cheerio libraries.
async function scrapeData() {
  try {
    // I make an HTTP GET request to the specified URL expecting a response.
    const response = await axios.get('https://scrapeme.live/shop/page/2/');
    // I extract the HTML content from the request response.
    const htmlContent = response.data;
    // Loading HTML content in the cheerio document.
    const $ = load(htmlContent);
    // I create an empty array for the extracted products.
    const products = [];
    // Selects all DOM elements with the class 'product'..
    const productElements = $('.product');
    // I iterate through each product element.
    for (let i = 0; i < productElements.length; i++) {
      // I extract product name,image,url,price from the element.
      const element = productElements[i];
      const name = $(element).find('.woocommerce-loop-product__title').text();
      const image = $(element).find('img').attr('src');
      const url = $(element)
        .find('a.woocommerce-LoopProduct-link.woocommerce-loop-product__link')
        .attr('href');
      const price = $(element).find('span.price').text();
      // I create a product object containing the extracted information.
      const product = {
        name: name,
        image: image,
        url: url,
        price: price,
      };
      //I add the product object to the product array.
      products.push(product);
    }

    console.log(products);
  } catch (error) {
    console.error(error);
  }
}

scrapeData();
