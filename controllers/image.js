const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "56fa499a8e1e449d8100aa9b5f8148f4",
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(400).json("Error: Unable to interact with API!")
    );
};

const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(400).json("Error: Unable to get entries!"));
};

module.exports = {
  handleImage,
  handleApiCall,
};
