const axios = require("axios");

const inputEl = document.getElementById("input");
const buttonEl = document.getElementById("button");
const outputEl = document.getElementById("output");

buttonEl.addEventListener("click", (e) => {
  const text = inputEl.textContent;
  e.preventDefault();
  axios({
    method: 'post',
    url: '/api/filter',
    data: {
      text
    }
  })
  .then(function (response) {
    console.log(response)
  })
});
