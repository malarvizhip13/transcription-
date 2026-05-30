import { useState } from "react";
import axios from "axios";

function SpeechToText() {
  const [audioFile, setAudioFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!audioFile) {
      alert("Please select an audio file");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioFile);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/transcribe",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTranscription(response.data.transcription);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-5 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        Speech To Text
      </h2>

      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload & Transcribe
      </button>

      {loading && (
        <p className="mt-4 text-blue-600">
          Transcribing audio...
        </p>
      )}

      {transcription && (
        <div className="mt-4 p-3 border rounded">
          <h3 className="font-bold">
            Transcription:
          </h3>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
}

export default SpeechToText;