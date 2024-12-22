require("dotenv").config();

var express = require("express");
var bodyParser = require("body-parser");
var app = express();

const PORT = process.env.PORT || 3001;

//Allow all requests from all domains & localhost
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var ingredients = [
  {
    id: "234kjw",
    text: "Eggs",
  },
  {
    id: "as82w",
    text: "Milk",
  },
  {
    id: "234sk1",
    text: "Bacon",
  },
  {
    id: "ppo3j3",
    text: "Frog Legs",
  },
];

app.get("/", (req, res) => {
  console.log(`Request handled by server on port ${PORT}`);
  res.send(`Server running on port ${PORT}`);
});

app.get("/ingredients", function (req, res) {
  console.log("GET From SERVER!!!!");
  res.send(ingredients);
});

app.post("/ingredients", function (req, res) {
  var ingredient = req.body;
  console.log(req.body);
  ingredients.push(ingredient);
  res.status(200).send("Successfully posted ingredient");
});

app.listen(PORT, () => {
  console.log("server running " + PORT);
});
