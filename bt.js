const axios = require("axios");
const cheerio = require("cheerio");
// var options = {
//   host: "www.bolor-toli.com",
//   port: 80,
//   path: encodeURIComponent(
//     "/dictionary/word?authenticity_token=1xU1WJHwwKwMCQcuL1RkMQ8e%2BrffDjLVYipf5PDJMHg%3D&selected_lang=4-1&search=" +
//       codes[i]
//   ),
// };
let url =
  "http://www.bolor-toli.com/dictionary/word?authenticity_token=1xU1WJHwwKwMCQcuL1RkMQ8e%2BrffDjLVYipf5PDJMHg%3D&selected_lang=4-1&search=баатар";

url = decodeURI(url);
url = encodeURI(url);

const extractLinks = ($) => [
  ...new Set(
    $(".page-numbers a") // Select pagination links
      .map((_, a) => $(a).attr("href")) // Extract the href (url) from each link
      .toArray() // Convert cheerio object to array
  ),
];

axios.get(url).then(({ data }) => {
  const $ = cheerio.load(data); // Initialize cheerio
  const links = extractLinks($);

  console.log(
    $.text().includes(" -The word you've entered isn't in our dictionary.")
  );

  // ['https://scrapeme.live/shop/page/2/', 'https://scrapeme.live/shop/page/3/', ... ]
});

function scrapper(a, word) {
  if (a.includes(word)) {
    return true;
  } else {
    return false;
  }
}
