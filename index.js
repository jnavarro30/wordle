import axios from "axios";
import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = 8000;

app.get("/word", (req, res) => {
  const options = {
    method: "GET",
    url: "https://random-words5.p.rapidapi.com/getRandom",
    params: { wordLength: "5" },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "random-words5.p.rapidapi.com",
    },
  };

  (async function getWordle() {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      res.send({ word: response.data });
    } catch (error) {
      console.error(error);
    }
  })();
});

app.get("/check", (req, res) => {
  const { guess } = req.query;
  const options = {
    method: "GET",
    url: "https://twinword-word-graph-dictionary.p.rapidapi.com/definition/",
    params: { entry: guess },
    headers: {
      "X-RapidAPI-Key": "de58b97feemsh3d6b45a024cf57cp1be277jsn9e0052b8fd4f",
      "X-RapidAPI-Host": "twinword-word-graph-dictionary.p.rapidapi.com",
    },
  };
  (async function checkWordle() {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      const result_message = response.data.result_msg;
      res.send({ result_message });
    } catch (error) {
      console.error(error);
    }
  })();
});

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
