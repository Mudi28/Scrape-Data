import axios from 'axios';
import { load } from 'cheerio';

console.log('Hello, World!');

console.log('ESLint and Prettier are working on save!');

console.log('ESLint and Prettier are working on save!');

async function scrapeData() {
  try {
    const response = await axios.get('https://scrapeme.live/shop/page/2/');
    const htmlContent = response.data;
    const $ = load(htmlContent);
    const products = [];
    const productElements = $('.product');

    for (let i = 0; i < productElements.length; i++) {
      const element = productElements[i];
      const name = $(element).find('.woocommerce-loop-product__title').text();
      const image = $(element).find('img').attr('src');
      const url = $(element)
        .find('a.woocommerce-LoopProduct-link.woocommerce-loop-product__link')
        .attr('href');
      const price = $(element).find('span.price').text();

      const product = {
        name: name,
        image: image,
        url: url,
        price: price,
      };
      products.push(product);
    }

    console.log(products);
  } catch (error) {
    console.error(error);
  }
}

scrapeData();
