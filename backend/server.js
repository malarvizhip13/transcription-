
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const supabase = require("./config/supabase.js");
const multer = require("multer");
const fs = require("fs");
const OpenAI = require("openai");
const { create } = require("domain");
const app = express();

app.use(cors());
app.use(express.json());

console.log("URL:", process.env.SUPABASE_URL);
console.log("KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY);
app.get("/", (req, res) => {
  res.send("Backend Running");
});


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
console.log(process.env.OPENAI_API_KEY);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

app.post("/api/transcribe", upload.single("audio"), async (req, res) => {
  try {
    console.log("File received:", req.file.path);

    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(req.file.path),
      model: "whisper-1",
    });

    const text = transcription.text;

  
    const { data, error } = await supabase
      .from("Transcriptions")
      .insert([
        {
          audio_url: req.file.filename,
          transcription: text,
        },
      ]);

    if (error) console.log(error);

    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      transcription: text,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Transcription failed" });
  }
});

app.use("/api/history", require("./routes/history"));

