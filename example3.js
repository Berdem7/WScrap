const http = require("http");
const fs = require("fs");
let alphabet =
  "а б в г д е ё ж з и й к л м н о ө п р с т у ү ф х ц ч ш ъ ы ь э ю я";
let alphArray = alphabet.split(" ");
var codes = ["баатар", "морь", "ыбөыбө", "хүн", "аырү"];

const config = {
  timeout: 1000,
};

//   const axiosGet = (url, options = {}) => {
//     const abort = axios.CancelToken.source()
//     const id = setTimeout(
//       () => abort.cancel(`Timeout of ${config.timeout}ms.`),
//       config.timeout
//     )
//     return axios
//       .get(url, { cancelToken: abort.token, ...options })
//       .then(response => {
//         clearTimeout(id)
//         return response
//       })
//   }

//   // example usage
//   axiosGet(`${url}/status.json`)

let words = [];
let nonwords = [];
for (let i = 0; i < alphArray.length; i++) {
  for (let j = 0; j < alphArray.length; j++) {
    setInterval(() => {
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
        "http://toli.gov.mn/search?q=" +
        alphArray[i] +
        alphArray[j] +
        "&t=ТОЛЬ";

      url = decodeURI(url);
      url = encodeURI(url);

      // const extractLinks = ($) => [
      //   ...new Set(
      //     $(".page-numbers a") // Select pagination links
      //       .map((_, a) => $(a).attr("href")) // Extract the href (url) from each link
      //       .toArray() // Convert cheerio object to array
      //   ),
      // ];

      axios
        .get(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36",
          },
        })
        .then(({ data }) => {
          const $ = cheerio.load(data); // Initialize cheerio
          // const links = extractLinks($);

          if (
            $.text().includes(
              "Таны хайсан үг олдсонгүй. Хайх үгээ зөв бичсэн эсэхийг нягтлан дахин оролдоно уу!"
            )
          ) {
            //   words.push(codes[i]);
            console.log(alphArray[i] + alphArray[j] + " bol ug bish yumaa");
          } else {
            //   nonwords.push(codes[i]);
            console.log(alphArray[i] + alphArray[j] + " bol ug yumaa");
            let file = { index: i + j, word: alphArray[i] + alphArray[j] };
            fs.readFile("words2.json", function (err, data) {
              let json = JSON.parse(data);
              console.log(json);
              json.push(file);

              fs.writeFile("words2.json", JSON.stringify(json), function (err) {
                if (err) {
                  throw err;
                } else {
                  console.log("success");
                }
              });
            });
          }

          // ['https://scrapeme.live/shop/page/2/', 'https://scrapeme.live/shop/page/3/', ... ]
        });
      //   console.log(words);
      //   console.log(nonwords);
    }, 10000);
  }
}
