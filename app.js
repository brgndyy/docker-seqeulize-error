const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios").default;
const { sequelize } = require("./models");

const Favorite = require("./models/favorite");

const app = express();

app.set("port", process.env.PORT || 3002);

app.use(bodyParser.json());

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database connect is succeed!");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/favorites", async (req, res) => {
  let favorites = await Favorite.findAll();

  res.status(200).json({
    favorites: favorites,
  });
});

app.post("/favorites", async (req, res) => {
  const favName = req.body.name;
  const favType = req.body.type;
  const favUrl = req.body.url;

  try {
    if (favType !== "movie" && favType !== "character") {
      throw new Error('"type" should be "movie" or "character"!');
    }
    const existingFav = await Favorite.findOne({
      where: {
        type: favType,
      },
    });
    if (existingFav) {
      throw new Error("Favorite exists already!");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  const favorite = await Favorite.create({
    name: favName,
    type: favType,
    url: favUrl,
  });

  try {
    res.status(201).json({ message: "Favorite saved!", favorite: favorite });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

app.get("/movies", async (req, res) => {
  try {
    const response = await axios.get("https://swapi.dev/api/films");
    res.status(200).json({ movies: response.data });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

app.get("/people", async (req, res) => {
  try {
    const response = await axios.get("https://swapi.dev/api/people");
    res.status(200).json({ people: response.data });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "port is ready");
});
