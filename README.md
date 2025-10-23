# ReGainAI - A Post Stroke Rehabilitation Program

Winner of NeuroHack 2025 – University of Toronto  
[Watch the Demo Video](https://youtu.be/your-demo-link-here)

<p align="center">
  <img src="./public/screenshot.png" alt="ReGain AI User Interface" width="750"/>
</p>

## Overview

ReGain AI is an AI-powered rehabilitation platform that provides a hands-free, voice-enabled solution for stroke survivors. It leverages real-time natural language processing and adaptive therapy logic to assist patients in rebuilding speech, cognitive, and motor function. By integrating OpenAI’s Realtime API, ReGain AI enables fully interactive and context-aware therapy sessions that simulate the experience of working with a human speech-language pathologist.

## Project Description

ReGain AI Support is structured as a full-stack web service built on modern JavaScript infrastructure. It consists of two primary backend endpoints, a lightweight frontend user interface, and an integrated email notification pipeline for clinical reporting.

### Session Minting Endpoint (`/session`)

This endpoint dynamically generates an ephemeral session token via the OpenAI Realtime API.  
Each session is initialized with a custom system prompt that configures the model to act as a virtual speech-language pathologist, adapting to the user’s progress in real time. The API streams back both audio and text responses, enabling seamless hands-free therapy interactions.

The assistant guides patients through three primary categories of exercises:

- **Speech Exercises:** Word association, sentence completion, phonemic cueing, repetition, and pronunciation correction.  
- **Verbally Directed Mobility Exercises:** Breathing, posture, limb coordination, and guided stretching tasks.  
- **Language and Cognitive Rehabilitation Exercises:** Phonological recall, comprehension, translation practice, and conversational role-play.

### Email Notification Endpoint (`/send-email`)

This endpoint triggers a clinician update once a patient reaches a new therapy level or completes a set number of sessions.  
The system uses Nodemailer (via Gmail SMTP) to send structured email summaries that include:

- Patient name  
- Session date and duration  
- Current level and exercises completed  
- Recommended next steps based on session analysis  

This ensures that clinicians remain informed about the patient’s progress in real time without requiring manual check-ins.

## Detailed Technical Explanation

### System Architecture

The architecture is designed for real-time, low-latency interaction between the AI model, the voice interface, and clinical backend services.

**Frontend Layer:**
- Built using standard web technologies (HTML, CSS, JavaScript) with WebRTC and MediaStream APIs.
- Captures user audio through the browser microphone and streams it directly to the backend.
- Displays real-time transcriptions and AI responses, while maintaining minimal visual distraction for accessibility.

**Backend Layer (Node.js + Express):**
- Manages session lifecycle and OpenAI Realtime API communication.
- Implements a dual WebSocket pipeline:  
  - One connection for receiving live audio input.  
  - One connection for streaming text and synthesized voice responses back to the client.
- Maintains ephemeral session tokens for privacy and HIPAA-friendly operation.

**Realtime AI Processing:**
- Uses OpenAI’s Realtime API for low-latency natural language understanding and speech synthesis.
- Dynamically adapts tone, pacing, and exercise difficulty based on patient responses.
- Session context is stored temporarily in memory to personalize feedback within a session without persisting sensitive data.

**Email and Reporting Layer:**
- Utilizes Nodemailer with secure OAuth2 authentication through Gmail SMTP.
- Each completed session generates a structured report object that is serialized into an email body for clinician review.
- Future versions are designed to integrate with EHR (Electronic Health Record) systems through FHIR-compliant APIs.

### Data Flow

1. **Voice Input:** User speaks into the voice-enabled glasses or microphone.  
2. **Streaming Layer:** Audio is captured and streamed to the backend through a WebSocket.  
3. **Realtime AI Processing:** Backend forwards audio to the OpenAI Realtime API, which interprets intent, generates a response, and synthesizes output speech.  
4. **Therapy Logic Layer:** The system evaluates progress markers (accuracy, latency, speech clarity) and adjusts exercises accordingly.  
5. **Response Delivery:** The synthesized voice and textual feedback are streamed back to the user in real time.  
6. **Session Summary:** Once complete, the session data is compiled and emailed to the clinician.  

This closed-loop interaction enables continuous engagement without manual intervention, providing both patients and clinicians with a seamless, data-informed experience.

## Technology Stack

| Component | Technology Used | Purpose |
|------------|----------------|----------|
| Backend Framework | Node.js + Express | Web server and routing |
| AI Model | OpenAI Realtime API | Speech and language processing |
| Voice Interface | WebRTC + MediaStream | Real-time audio capture and streaming |
| Email Service | Nodemailer + Gmail SMTP | Automated clinician updates |
| Environment Management | dotenv | Secure environment variable handling |
| Frontend | HTML, CSS, JavaScript | Lightweight user interface |
| Hosting | Render / Vercel / AWS EC2 | Deployment environment |

## Use Case

ReGain AI Support addresses the core rehabilitation needs of stroke survivors, including speech, mobility, and communication. Its adaptive AI enables patients to engage in therapy at their own pace while maintaining consistent clinical oversight. The system provides:

- **Accessible Rehabilitation:** Hands-free therapy for users with limited mobility.  
- **Continuous Adaptation:** Exercises evolve based on real-time performance metrics.  
- **Clinician Connectivity:** Automatic email summaries ensure consistent communication between patient and provider.

## Authors

Owen Ostler  
Ehud Zaltzman  
Alp Unsal
