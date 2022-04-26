// const { link } = require("fs");
const url = require("url");
link = url.parse("http://www.bolor-toli.com");
const http = require("http");

const req = http.request(
  {
    host: link.hostname,
    path: link.path,
    port: link.port,
  },
  function (res) {
    if (res.statusCode === 200) console.log(res);
    else console.log(res.statusCode);
  }
);
