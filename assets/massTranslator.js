const projectId = "mass-translator-323504";
const location = "global";
const { TranslationServiceClient } = require("@google-cloud/translate");
const languageCodes = require("./languageCodes.json") 

const translationClient = new TranslationServiceClient();

module.exports = async function massTranslator(translateRequest) {
  // declare these vars above the for-loop, to be manipulated inside of the for-loop and called again after it runs

  const initialText = translateRequest.text;
  const initialLanguage = translateRequest.language;

  let text = initialText;
  let sourceLanguageCode = initialLanguage;
  let targetLanguageCode;
  let languages = [];

  console.log("\nFetching supported languages...\n");

  const request = {
    parent: `projects/${projectId}/locations/${location}`,
  };

  // Get supported languages
  const [languageResponse] = await translationClient.getSupportedLanguages(
    request
  )
    .catch(err => console.log(err));

  for (const language of languageResponse.languages) {
    if (language.supportSource && language.supportTarget) {
      languages.push(language.languageCode);
    }
  }

  console.log("Beginning mass translation!\n");

  for (i = 0; i < 50; i++) {
    // randomNumber returns int from 0 to (languages.length - 1), so that it may be used to call upon a random language from array
    let randomNumber = Math.floor(Math.random() * languages.length);

    // if language called is not equal to current/last used language, do the stuff
    if (languages[randomNumber] != sourceLanguageCode) {
      // set our target language to the random language
      targetLanguageCode = languages[randomNumber];

      // construct request body
      const request = {
        parent: `projects/${projectId}/locations/${location}`,
        contents: [text],
        mimeType: "text/plain",
        sourceLanguageCode,
        targetLanguageCode,
      };

      // make request
      const [translateResponse] = await translationClient
        .translateText(request)
        .catch((err) => console.log(err));

      // for some reason we iterate thru response translations, but it is suggested and it works. It'll just always use the last translation returned, I think it'll make it translate worse, which is better for my use
      for (const translation of translateResponse.translations) {
        text = translation.translatedText;
      }
      // set the language we translated to, to the language we will be translating from

      console.log(
        `${
          i + 1
        }/50 translations complete (${languageCodes[sourceLanguageCode]} >> ${languageCodes[targetLanguageCode]})`
      );

      sourceLanguageCode = targetLanguageCode;
    } else {
      // if the random language == current language, just try again
      // i-- so it thinks that it didn't count. Computer labor laws do not exist :)
      i--;
    }
  }
  // make final request, translating to the initial language
  const oneFinalRequest = {
    parent: `projects/${projectId}/locations/${location}`,
    contents: [text],
    mimeType: "text/plain",
    sourceLanguageCode: sourceLanguageCode,
    targetLanguageCode: initialLanguage,
  };

  const [response] = await translationClient
    .translateText(oneFinalRequest)
    .catch((err) => {
      console.log(err);
    });

  for (const translation of response.translations) {
    text = translation.translatedText;
  }
  console.log("\nOriginal Text:", initialText, "\nTranslated Text:", text);
}
