Speech-to-Text Application

Project Overview

               This project is a Speech-to-Text web application built using React, Node.js, Express.js, Supabase, Tailwind CSS, and OpenAI Whisper API. Users can upload audio files, convert speech into text, and save transcriptions for future reference.
 Features:
User Authentication using Supabase Auth
Audio File Upload
Speech-to-Text Conversion using OpenAI Whisper API
Save Transcriptions to Supabase Database
View Previous Transcriptions
Responsive UI with Tailwind CSS

Frontend

1.React.js
2.Tailwind CSS

Backend

1.Node.js
2.Express.js
3.Multer

Database & Authentication

1.Supabase

AI Service

1.OpenAI Whisper API

Environment Variables
.env
OPENAI_API_KEY=your_openai_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

Database Schema
 Transcriptions Table

| Column        | Type      |
| ------------- | --------- |
| id            | bigint    |
| user_id       | uuid      |
| audio_url     | text      |
| transcription | text      |
| created_at    | timestamp |

---

Project Workflow

1. User logs in.
2. User uploads an audio file.
3. Backend receives the file using Multer.
4. OpenAI Whisper converts speech to text.
5. Transcription is stored in Supabase.
6. User can view previous transcriptions.
---

 Author

Malarvizhi P

Internship Project: Speech-to-Text Application
