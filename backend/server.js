
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
app.use("/api/history", require("./routes/history"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});


const router = express.Router();

const upload = multer({
  dest: "uploads/",
});


router.post(
  "/transcribe",
  upload.single("audio"),
  async (req, res) => {
    try {
      const file = req.file;

      
      const transcription =
        "This is a sample transcription result.";

      res.json({
        success: true,
        transcription,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

module.exports = router;