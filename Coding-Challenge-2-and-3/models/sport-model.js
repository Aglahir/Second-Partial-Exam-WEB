const mongoose = require("mongoose");
const uuid = require("uuid");

const sportsSchema = mongoose.Schema({
  id: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  num_players: {
    type: Number,
    require: true,
  },
});

const sportsModel = mongoose.model("sports", sportsSchema);

const sports = {
  deleteSport: function (id) {
    sportsModel
      .deleteOne({ id: id })
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  },
  addInitial: function (sportsArr) {
    sportsModel
      .insertMany(sportsArr)
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  },
};

module.exports = sports;
