const express = require("express");
const routes = require("./routes");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;

process.on('uncaughtException', function (err) {
  console.log(err);
});

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "./client/index.html"))
})

app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));