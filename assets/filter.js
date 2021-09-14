const tweetBlacklist = require("./tweetBlacklist.json").losers;

module.exports = function filter(request) {
  let isBad = false;
  tweetBlacklist.forEach((loser) => {
    request.split(" ").forEach((word) => {
      if (
        word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toUpperCase() ===
        loser.toUpperCase()
      ) {
        isBad = true;
      }
    });
  });
  if ((isBad == false)) {
    return true
  } else {
    console.log("Sorry, this string contains content not suitable for this app.")
    return false
  }
}