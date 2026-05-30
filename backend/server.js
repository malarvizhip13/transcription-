
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const OpenAI = require("openai");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });



const supabase = require("./config/supabase");

async function saveTranscription() {
  const { data, error } = await supabase
    .from("transcriptions")
    .insert([
      {
        audio_url: "audio1.wav",
        transcription: "Hello World",
      },
    ]);

  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
}

saveTranscription();
app.use("/api", require("./routes/transcribe"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
