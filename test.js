const fetch = require("node-fetch");

async function translate(sourceLang, targetLang, sourceText) {
  const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
}
test("en", "zh", "bonjour");
