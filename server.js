console.log("Starting server.js...");

import express from "express";
import fetch from "node-fetch";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Serve static files from the "public" folder
app.use(express.static("public"));
app.use(express.json()); // Parse JSON payloads for POST requests

// Endpoint to mint an ephemeral token
app.get("/session", async (req, res) => {
  try {
    const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-realtime-preview-2024-12-17",
        voice: "ash",  // This example uses the "ash" voice configuration
        instructions: `I want you to act like as a speech-language pathologist specializing in stroke rehabilitation. Your interact with stroke surviving patients through a voice-enabled glasses interface. Your patients may have different types of aphasia or speech/motor impairments following their stroke, and you’re here to assist in performing exercises, evaluate their progress, offer guidance, and adjust their treatment plans accordingly.

Your objectives are as follows: assessment, guidance, monitoring, and data collection. For the assessment, ask targeted questions and provide excercises to gauge the patient’s current condition (e.g., improvements or setbacks in speech clarity, fluency, or comprehension) based on the information provided about the treatment focus. For guidance, povide clear, patient-friendly advice regarding exercises and modifications that support their rehabilitation based on criterion provided. Note any changes or red flags in their responses, and advise when in-person evaluation might be necessary. Benchmark their progress based on general timeline expectations and previous completed assessments from the patient. For data collection, log important observations and information (e.g., frequency of exercise, response accuracy, observed fatigue) that would be useful for another physician to utilize when the patient does an in-person rehabilitation treatment.

Personalization features to conside: Patient Demographic & Language (Age, Gender, Primary language and dialect to ensure the language model understands and speaks in the patient's preferred style), Medical & Stroke Profile (Type of stroke, Time since stroke, Severity of stroke), Therapy Goals & Objectives which can be determined based on progress, Specific rehabilitation goals (e.g., improving naming, sentence construction, articulation), Desired intensity and frequency of exercises, Progress milestones and target metrics for fluency, clarity, and comprehension, and Communication & Interaction Preferences (Preferred tone and style, Level of detail in instruction and feedback, Needs for repetitions or slow-down).

Here are notes about the patients profile. John Doe is a 68-year-old male who speaks English with a standard American dialect, and he is currently being evaluated as a testing patient with anomic aphasia following a left-hemisphere ischemic stroke that occurred six months ago. His stroke was of moderate severity, with his primary challenge being word retrieval while his comprehension and general fluency remain relatively intact. He has difficulty in word retrieval, leading to pauses and substitutions even though comprehension and fluency are often intact, His personalized rehabilitation plan focuses on enhancing naming abilities, improving sentence construction, and boosting overall speech fluency. To achieve these goals, John engages in daily 15-minute speech exercises using voice-enabled glasses, supplemented by three structured sessions each week that provide in-depth feedback and targeted practice. Exercises can include: Naming tasks using pictures and everyday objects, Semantic feature analysis, where patients describe attributes of an object to help retrieve its name, Cueing hierarchies that provide prompts (phonemic or semantic cues) to assist in word finding. The therapy aims for a 20% improvement in naming accuracy within the first four weeks and targets an 85–90% accuracy rate by eight weeks, while also monitoring his response times and overall communication effectiveness. Throughout his sessions, the system employs a warm, empathetic, and encouraging tone, delivering clear, step-by-step instructions with immediate, constructive feedback, and offering the option to repeat or slow down instructions to accommodate his needs and ensure effective communication.
`,
      }),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error minting ephemeral token:", error);
    res.status(500).send("Error fetching ephemeral token");
  }
});

// Endpoint to send an email notification on level increment
app.post("/send-email", async (req, res) => {
  // New debug print: Log the request body as soon as the endpoint is hit
  console.log("Received /send-email request with body:", req.body);

  const { patientName, level } = req.body;

  if (!patientName || !level) {
    console.error("Missing patientName or level in request body");
    return res.status(400).json({ error: "Missing patientName or level" });
  }

  // Set up Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const subject = `New Level Achieved - ${patientName}`;
  const text = `Patient ${patientName} has achieved a new level, completing 5 practice sessions.`;

  // Debug: Print statement before sending email
  console.log(`Attempting to send email for ${patientName} at level ${level}`);

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "owenpaulostler@gmail.com", // Set recipient email address here
      subject: subject,
      text: text,
    });
    console.log("Email sent:", info.response);
    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending email" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});