const http = require("http");
const fs = require("fs");
let alphabet =
  "а б в г д е ё ж з и й к л м н о ө п р с т у ү ф х ц ч ш ъ ы ь э ю я";
let alphArray = alphabet.split(" ");
var codes = ["баатар", "морь", "ыбөыбө", "хүн", "аырү"];

let words = [];
let nonwords = [];
for (let a = 0; a < alphArray; a++) {
  for (let b = 0; b < alphArray; b++) {
    for (let c = 0; c < alphArray; c++) {
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
              alphArray[a] +
              alphArray[b] +
              alphArray[c] +
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
                  console.log(
                    alphArray[a] +
                      alphArray[b] +
                      alphArray[c] +
                      alphArray[i] +
                      alphArray[j] +
                      " bol ug bish yumaa"
                  );
                } else {
                  //   nonwords.push(codes[i]);
                  console.log(
                    alphArray[a] +
                      alphArray[b] +
                      alphArray[c] +
                      alphArray[i] +
                      alphArray[j] +
                      " bol ug yumaa"
                  );
                  let file = {
                    index: a + b + c + i + j,
                    word:
                      alphArray[a] +
                      alphArray[b] +
                      alphArray[c] +
                      alphArray[i] +
                      alphArray[j],
                  };
                  fs.readFile("words.json", function (err, data) {
                    let json = JSON.parse(data);
                    console.log(json);
                    if (json.includes(file)) {
                      console.log("repeated");
                    } else {
                      json.push(file);
                    }

                    fs.writeFile(
                      "words.json",
                      JSON.stringify(json),
                      function (err) {
                        if (err) {
                          throw err;
                        } else {
                          console.log("success");
                        }
                      }
                    );
                  });
                }

                // ['https://scrapeme.live/shop/page/2/', 'https://scrapeme.live/shop/page/3/', ... ]
              });
            //   console.log(words);
            //   console.log(nonwords);
          }, 10000);
        }
      }
    }
  }
}
