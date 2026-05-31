import { useState } from "react";

function Dashboard({ email }) {
  const [text, setText] = useState("");
const [audioFile, setAudioFile] = useState(null);
  const handleFile = (e) => {
    const file = e.target.files[0];

    if (file) {
       setAudioFile(file); 
      setText("Audio file selected: " +file.name);
      
    }
  };

  const handleUpload = async () => {
  if (!audioFile) {
    alert("Please select an audio file");
    return;
  }

  const formData = new FormData();
  formData.append("audio", audioFile);

  try {
    const response = await fetch("http://localhost:5000/api/transcribe",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    setText(data.transcription);
  } catch (error) {
    console.error(error);
    setText("Upload failed");
  }
};
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800">
          Welcome
        </h2>

        <p  className="text-gray-600">{email}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">

        <h2 className="text-xl font-bold mb-4"> Speech To Text</h2>

        <input
          type="file"
          accept="audio/*"
          onChange={handleFile}
          className="mb-4"
        />
        

        <button 
        onClick={handleUpload} 
         className="bg-green-500 text-white px-4 py-2 rounded mb-4 block">
          Upload & Transcribe
        </button>

        <div className="border p-3 rounded">
          {text || "Transcription will appear here"}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;