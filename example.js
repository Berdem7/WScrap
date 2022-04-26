function openWindows() {
  var codes = ["баатар", "морь", "ыбөыбө", "хүн", "аырү"];
  for (i = 0; i < codes.length; i++) {
    var params = {
      url:
        "http://www.bolor-toli.com/dictionary/word?authenticity_token=1xU1WJHwwKwMCQcuL1RkMQ8e%2BrffDjLVYipf5PDJMHg%3D&selected_lang=4-1&search=" +
        codes[i],
      i: i,
    };
    // var delay = i * 2000;
    // setTimeout(function(params) {
    //   console.log(params.url);
    //   window.open(params.url,'_blank', 'PopUp', params.i);
    // }, delay, params);
    window.open(params.url);
    console.log(params.url);
  }
}
document.getElementById("button").addEventListener("click", () => {
  openWindows;
});
