const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require("./config");

const sports = require("./models/sport-model");

const app = express();

app.use(jsonParser);

app.listen(PORT, () => {
  console.log("This server is running on port 8080");
  new Promise((resolve, reject) => {
    const settings = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };
    mongoose.connect(DATABASE_URL, settings, (err) => {
      if (err) {
        return reject(err);
      } else {
        console.log("Database connected successfully.");
        return resolve();
      }
    });
  }).catch((err) => {
    console.log(err);
  });
});

// Just testing this endpoint. It may have errors
app.get("/initDB", (req, res) => {
  let initial = [
    {
      id: "0da8b32a-aaff-434f-1bdd-77985e285ba3",
      name: "Basketball",
      num_players: 5,
    },
    {
      id: "f38c7e59-55dd-433b-2fff-c350bb8f9ce5",
      titulo: "Football",
      num_players: 11,
    },
  ];

  console.log(initial);

  sports.addInitial(initial).then((result) => {
    console.log(result);
  });

  res.status(200).end();
});

app.delete("/sports/delete", (req, res) => {
  let bodyId = req.body.id;
  if (!bodyId) {
    res.statusMessage = "Body 'id' is not set";
    res.status(406).end();
  }
  let queryId = req.query.sportId;
  if (!queryId) {
    res.statusMessage = "Query 'sportId' is not set";
    res.status(406).end();
  }

  if (bodyId !== queryId) {
    res.statusMessage = "Body 'id' and Query 'sportId' mismatch";
    res.status(409).end();
  }

  sports.deleteSport(bodyId);

  res.status(200).end();
});
