const puppeteer = require("puppeteer");
const fs = require("fs");
const download = require("image-downloader");
const path = require("path");

// crawl data from hoanghamobile.com //

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const URL = "https://hoanghamobile.com";

  await page.goto(URL);

  // const products = await page.evaluate(() => {
  //   let productsPrice = document.querySelectorAll(
  //     ".list-content .list-item .product-price"
  //   );
  //   productsPrice = [...productsPrice];
  //   const prodPrice = products.map((prod) => prod.innerHTML);
  //   return prodPrice;
  // });

  const products = await page.evaluate(() => {
    let productsText = document.querySelectorAll(".list-content .list-item");
    productsText = [...productsText];

    // let productsPrice = products.map((p) => p.querySelector(".product-price"));
    let url = "https://hoanghamobile.com";
    let products = productsText.map((prod, index) => ({
      id: index,
      name: prod.querySelector(".product-name h4 a").innerHTML,
      label: prod.querySelector("span.label")
        ? prod.querySelector("span.label").innerHTML
        : "",
      link: `${url}${prod
        .querySelector(".mosaic-block a.mosaic-overlay")
        .getAttribute("href")}`,
      details: prod.querySelector(".details")
        ? [...prod.querySelectorAll(".details ul li")].map((i) => i.innerHTML)
        : [],
      price: prod.querySelector(".product-price").innerHTML,
    }));
    return products;
  });

  // console.log(products);
  // fs.writeFileSync("./list-products.txt", JSON.stringify(products));

  await browser.close();
})();

// crawl data from hoanghamobile.com //
// // download img from ... //
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(
//     "https://eva.vn/nhan-vat-dep/mac-do-luoi-va-bikini-hot-girl-lam-dan-tinh-phat-nghien-vi-lan-da-trang-nhu-bach-tuyet-c262a447226.html"
//   );

//   const imgLinks = await page.evaluate(() => {
//     let links;
//     let linksEle = document.querySelectorAll(".nwsCt img");
//     linksEle = [...linksEle];

//     links = linksEle.map((ele) => ele.getAttribute("data-original"));
//     return links;
//   });

//   console.log(imgLinks);

//   // // download ve may voi image downloader
//   await Promise.all(
//     imgLinks.map((img) =>
//       download
//         .image({
//           url: img,
//           dest: __dirname,
//         })
//         .then(({ filename }) => {
//           console.log(`save to ${filename}`);
//         })
//         .catch((err) => {
//           console.log(err);
//         })
//     )
//   );

//   browser.close();
// })();
