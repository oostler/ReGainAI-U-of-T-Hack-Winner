# NeuroHack 2025 - ReGain AI Support

**Winner of NeuroHack 2025**

## Overview

ReGain AI provides a hands-free, voice-enabled solution that assists stroke patients in regaining communication and mobility skills. By leveraging cutting-edge AI and real-time interaction, our project guides patients through personalized therapy sessions, helping them reintegrate into society with renewed confidence and improved functionality.

## Project Description

ReGain AI Support is built around a modern web server using Node.js, Express, and several supportive libraries. It features two key components:

1. **Session Minting Endpoint (`/session`):**  
   This endpoint creates an ephemeral session token by interfacing with the OpenAI API. The session is tailored for voice-enabled rehabilitation sessions. The AI is configured to act as a speech-language pathologist, guiding patients (e.g., "John Doe") through various therapeutic exercises, such as:
   - **Speech Exercises:** Word association, sentence completion, phonemic cueing, repetition, and expansion.
   - **Verbally Directed Mobility Exercises:** Breathing, posture, limb coordination, and balance exercises.
   - **Lost Language Rehabilitation Exercises:** Phonological recall, translation practice, cognitive association, and role-playing conversations.

2. **Email Notification Endpoint (`/send-email`):**  
   This endpoint sends an email notification to the clinician whenever a patient reaches a new rehabilitation level. The email includes details such as the patient’s name, the new level achieved, and the total number of sessions completed, facilitating timely clinical updates and further intervention when necessary.

## Use Case

Stroke survivors often face challenges with speech, mobility, and overall communication, hindering their reintegration into everyday life. ReGain AI Support provides a hands-free solution that:

- **Facilitates Accessible Rehabilitation:**  
  Patients can engage in therapy sessions using voice commands and interactive exercises, which is particularly beneficial for those with motor impairments.

- **Enables Continuous Progress Monitoring:**  
  Through tailored exercises and real-time AI guidance, the system tracks patient progress, adapting exercises based on individual needs.

- **Enhances Clinical Oversight:**  
  Automated email notifications keep healthcare providers informed about patient progress, enabling timely adjustments to therapy plans.


  ReGain AI Support is dedicated to improving the quality of life for stroke survivors by providing accessible, adaptive, and effective rehabilitation. Join us in our mission to empower recovery and promote reintegration into society.

  Authors:
  Owen Ostler, Ehud Zaltzman, and Alp Unsal