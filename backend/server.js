const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});



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