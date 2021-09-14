const massTranslator = require("./assets/massTranslator");
const filter = require("./assets/filter");

const dummyRequest = {
  language: "en",
  text: "What is love?"
}

if (filter(dummyRequest.text)) {
  massTranslator(dummyRequest)
} else {
  console.log("Your request contains inappropriate content")
}