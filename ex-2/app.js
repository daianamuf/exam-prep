const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());

const weather = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));

app.get("/weather/:city", (req, res) => {
  const city = req.params.city;
  const cityData = weather.find(
    (item) => item.town.toLowerCase() === city.toLowerCase()
  );

  if (cityData) {
    res.json(cityData);
  } else {
    res.status(404).send("Orașul solicitat nu a fost găsit în datele noastre.");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
