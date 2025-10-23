# ReGainAI - A Post Stroke Rehabilitation Program

Winner of NeuroHack 2025 – University of Toronto  
[Watch the Demo Video](https://youtu.be/wzIhDSpJFKM)

<p align="center">
  <table width="100%">
    <tr>
      <td align="center" width="50%">
        <img src="./public/image%204.png" alt="ReGain AI – Home Interface" width="95%"/><br/>
      </td>
      <td align="center" width="50%">
        <img src="./public/image%203.png" alt="ReGain AI – Active Session" width="95%"/><br/>
      </td>
    </tr>
    <tr>
      <td align="center" width="50%">
        <img src="./public/image%202.png" alt="ReGain AI – Feedback Summary" width="95%"/><br/>
      </td>
      <td align="center" width="50%">
        <img src="./public/image%201.png" alt="ReGain AI – Clinician Dashboard" width="95%"/><br/>
      </td>
    </tr>
  </table>
</p>



## Overview

ReGain AI is an AI-powered rehabilitation platform that provides a hands-free, voice-enabled solution for stroke survivors. It leverages real-time natural language processing and adaptive therapy logic to assist patients in rebuilding speech, cognitive, and motor function. By integrating OpenAI’s Realtime API, ReGain AI enables fully interactive and context-aware therapy sessions that simulate the experience of working with a human speech-language pathologist.

## Project Description

ReGain AI Support is structured as a full-stack web service built on JavaScript infrastructure. It consists of two primary backend endpoints, a lightweight frontend user interface, and an integrated email notification pipeline for clinical reporting.

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
- Built using standard web technologies (HTML, CSS, JavaScript) with the browser **MediaStream API** for real-time microphone capture.
- Captures user audio through `navigator.mediaDevices.getUserMedia()` and streams it directly to the backend via a single WebSocket connection.
- Displays AI responses and live transcriptions in real time through a lightweight, accessible interface.

**Backend Layer (Node.js + Express):**
- Manages session lifecycle and OpenAI Realtime API communication.
- Maintains a single WebSocket connection for bidirectional audio and text streaming between the client and the OpenAI Realtime API.
- Generates ephemeral session tokens for temporary, secure API access.

**Realtime AI Processing:**
- Uses OpenAI’s **Realtime API** for low-latency natural language understanding and speech synthesis.
- Adapts conversationally to patient responses within each session using contextual memory.
- Session context is stored temporarily in memory to personalize interactions without persisting user data.

**Email and Reporting Layer:**
- Utilizes **Nodemailer** with Gmail SMTP for automated clinician summaries.
- Each completed session generates a structured report object (patient name, date, duration, exercises completed) that is serialized into an email body for clinician review.
- Future versions are intended to integrate with EHR (Electronic Health Record) systems through FHIR-compliant APIs.

### Data Flow

1. **Voice Input:** User speaks into a microphone connected to the browser.  
2. **Streaming Layer:** Audio is captured via the MediaStream API and streamed to the backend through a WebSocket.  
3. **Realtime AI Processing:** The backend forwards audio to the OpenAI Realtime API, which interprets intent, generates a response, and synthesizes output speech.  
4. **Response Delivery:** The synthesized voice and textual feedback are streamed back to the user in real time.  
5. **Session Summary:** After completion, session data is compiled and emailed to the clinician.  

This closed-loop interaction enables hands-free, adaptive therapy sessions that keep clinicians informed without manual intervention.

## Technology Stack

| Component | Technology Used | Purpose |
|------------|----------------|----------|
| Backend Framework | Node.js + Express | Web server and routing |
| AI Model | OpenAI Realtime API | Speech and language processing |
| Voice Interface | MediaStream API + WebSocket | Real-time audio capture and streaming |
| Email Service | Nodemailer + Gmail SMTP | Automated clinician updates |
| Environment Management | dotenv | Secure environment variable handling |
| Frontend | HTML, CSS, JavaScript | Lightweight user interface |

## Use Case

ReGain AI addresses the core rehabilitation needs of stroke survivors, including speech, mobility, and communication. Its AI-powered, voice-interactive sessions allow patients to engage in therapy independently while maintaining clinical oversight. The system provides:

- **Accessible Rehabilitation:** Hands-free therapy for users with limited mobility.  
- **Conversational Adaptation:** Exercises adjust contextually based on real-time interaction.  
- **Clinician Connectivity:** Automatic email summaries ensure consistent communication between patient and provider.


## Authors

Owen Ostler  
Ehud Zaltzman  
Alp Unsal
