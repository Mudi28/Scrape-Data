import axios from "axios";
import cheerio from "cheerio";

console.log("Hello, World!");

console.log("ESLint and Prettier are working on save!");

console.log("ESLint and Prettier are working on save!");


async function Scrapedata() {
  try {
    const response = await axios.get("https://scrapeme.live/shop/page/2/");
    const htmlContent = response.data;  
    const $ = cheerio.load(htmlContent);
    const products = [];
    const productElements = $(".product");

    for (let i = 0; i < productElements.length; i++) {
      const element = productElements[i];
      const product = {
        name: $(element).find(".woocommerce-loop-product__title").text(),
        image: $(element).find("img").attr("src"),
        url: $(element)
          .find("a.woocommerce-LoopProduct-link.woocommerce-loop-product__link")
          .attr("href"),
        price: $(element).find("span.price").text(),
      };
      products.push(product);
    }


    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      console.log(`Product ${i + 1}:`);
      console.log(`Name: ${product.name}`);
      console.log(`Image URL: ${product.image}`);
      console.log(`Page URL: ${product.url}`);
      console.log(`Price: ${product.price}`);
    }

    console.log(products);
  } catch (error) {
    console.error(error);
  }
}

Scrapedata();
