# System Design

**DHI2V.So – Team 3V**  
Danylo Kurbatov, Julie Kuttschreutter, Maksim Sadkov, Mihaela Stoyanova, Simona Waxmann, Syandana Suntana

---

## Table of Contents

1. [Introduction](#introduction)
2. [General Overview and Design Approach](#general-overview-and-design-approach)
    - [Main Components](#main-components)
    - [Alignment with International Security Standards](#alignment-with-international-security-standards)
3. [Design Considerations](#design-considerations)
    - [Goals and Guidelines](#goals-and-guidelines)
    - [Development Methods and Contingencies](#development-methods-and-contingencies)
4. [System Architecture](#system-architecture)
    - [Logical View](#logical-view)
    - [Hardware Architecture](#hardware-architecture)
    - [Software Architecture](#software-architecture)
    - [Information Architecture](#information-architecture)
    - [Security Architecture](#security-architecture)
    - [Performance](#performance)
5. [System Design](#system-design)
    - [Database Design](#database-design)
    - [User Interface Design](#user-interface-design)
    - [Hardware Design](#hardware-design)
    - [Software Design](#software-design)
    - [Security Design](#security-design)
6. [Changelog](#changelog)

---

## Introduction

Scorion is a software company that provides the eponymous platform to medical schools in several countries. As a part of an improvement of the current feedback system between teachers and students who use their platform, the company decided to improve their feedback system.

Currently, the company has a functionality for giving feedback via text and audio files. However, the audio recording is transcribed into text using third-party applications. Since the client is developing a product for medical schools, all research-related data must be confidential and must be protected. For this purpose, the client asked to develop a system which will retain the functionality for recording text and audio feedback. More importantly, audio feedback must be recorded and saved without using third-party APIs. For a detailed understanding of the requirements set, please look at the functional design document where all functional requirements and use cases are described.

The purpose of this document is to describe the system that implements the specified functionality. Structural and technical choices, including the technology stack, architectural patterns, component interaction schemes, and main technical requirements, will be covered in this document. This document is intended for developers and stakeholders involved in the development and maintenance of the audio feedback system.

The goal of this document is to provide a clear understanding of all development stages of the system. The topics related to deployment and integration of the developed system within the Scorion platforms will not be covered in this document since integration is not a part of the assignment.

---

## General Overview and Design Approach

The new system includes several key components that will work together, allowing users to record both text and audio feedback. If the feedback is recorded as audio, the users will be able to transcribe it and save along with the audio.

### Main Components

- **Frontend**: The user interface is developed using JavaScript, Svelte, HTML, and CSS to provide users with a convenient and responsive interface that aligns with Scorion’s design choices.
- **Backend**: The server, built with Express.js, handles data load and is integrated with the frontend. The backend server also ensures that the data is processed within the application and that no information is shared with third parties.
- **Audio Handling APIs**: `<APIs>` are used for recording, editing, and listening to audio files, as well as for transcribing them into text.
- **Database**: `<Database management system name>` is used to store received text and audio feedback, as well as transcriptions of audio files.

---

## Alignment with International Security Standards

The developed system stores confidential data related to student medical research. Therefore, it complies with security standards **ISO 27001**, **NEN 7501**, and **GDPR** at the client’s requirement.

---

## Design Considerations

### Goals and Guidelines

- **Data Safety and Confidentiality**: The main goal is to provide safe handling of text and audio feedback according to the ISO 27001, NEN 7501, and GDPR standards. Protection of data must be a crucial priority on all levels of the system.
- **Convenience of Usage**: The system must be designed in a simple and intuitively understandable way, so that teachers and students are able to use the application without any technical skills on any device and browser.
- **Performance Efficiency**: The client receives about 30,000 feedback forms per day. Therefore, the platform must efficiently handle audio files without excessive memory consumption.
- **Consistency with Scorion’s Design**: The user interface design must correspond to the existing Scorion's design style choices.
- **Coding Guidelines**: The development team must follow the best practices of frontend and backend development using standard code conventions mentioned in the Code Quality document.

### Development Methods and Contingencies

The system is developed using a modular object-oriented approach, with the usage of the component-based framework Svelte for the frontend and Express.js for building the backend server according to the REST API standards.

An iterative approach to prototyping and development is used, allowing the development team to take into consideration the client’s feedback during the development process. This allows all development participants to be aware of the current progress of the project. This reduces the risks of problems related to the functionality of the final product.

If information security and privacy issues limit the use of certain technologies, alternatives that meet security requirements will be considered.

---

## System Architecture

### Logical View

### Hardware Architecture

### Software Architecture

### Information Architecture

### Security Architecture

### Performance

---

## System Design

### Database Design


| Attributes           | Description                                                                                     |
|----------------------|---------------------------------------------------------------------------------|
| `feedback_id`        | Primary Key (auto incrementing integer)                                                         |
| `audio_file_path`    | Location of the audio file in the system in the format of a file path (String)                  |
| `transcription_text` | Transcribed text from the audio (String)                                                      |
| `date_created`       | Date of when the feedback was created (TIMESTAMP)                                               |
| `date_updated`       | Date of when the feedback was updated (TIMESTAMP)                                               |

---

## TIMESTAMP vs DATE/DATETIME

As Scorion is used globally, **TIMESTAMP** is a better choice because it automatically adjusts for time zones. It stores the value in UTC and converts it to the local time (according to the machine accessing it) when queried.


### User Interface Design

### Hardware Design

### Software Design

#### Audio Recording implementation

[You can find the code here](/app/frontend/src/components/RecordButton.svelte)

**State Variables**

```jsx
let recording; // URL of the recorded audio (Blob)
let extension = 'webm'; // Default audio format (this will be adjusted dynamically)
let isRecording = false; // Boolean that tracks whether recording is active
let gumStream, recorder, chunks = [];
const dispatch = createEventDispatcher(); // Enables event dispatching to other components
```

`gumStream`: Stores the microphone stream

`recorder`: Holds the `MediaRecorder` instance for audio recording

`chunks`: Collects audio data chunks during recording.

**MIME type detection**

```jsx
if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
    extension = 'webm';
  } else if (MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')) {
    extension = 'ogg';
  } else if (MediaRecorder.isTypeSupported('audio/mpeg')) {
    extension = 'mp3';
  } else {
    console.error('No supported audio MIME types available in this browser.');
    alert('Your browser does not support audio recording.');
  }
```

Depending on the user’s browser, the best-supported audio format is selected. It will display an error on an alert if there is no MIME type supported.

**Toggle recording**

```jsx
async function toggleRecording() {
    isRecording = !isRecording;
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }
```

Toggles the `isRecording` Boolean and starts or stops the recording process accordingly.

**Start recording**

```jsx
function startRecording() {
    let constraints = { audio: true };

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => { // Step 1
      gumStream = stream; // Save the microphone stream
      chunks = []; // Clear the previous recording data
      recorder = new MediaRecorder(stream, { mimeType: `audio/${extension}` }); // Step 2

      recorder.ondataavailable = (e) => { // Step 3
        chunks.push(e.data); // Collect audio chunks
        if (recorder.state === 'inactive') {
          const blob = new Blob(chunks, { type: `audio/${extension}` });
          recording = URL.createObjectURL(blob); // Generate a URL for playback/download

          // Log and emit the event
          console.log('Dispatching recording-change with', { recording, extension });
          dispatch('recording-change', { recording, extension }); // Step 4
        }
      };

      recorder.start(); // Start recording
    }).catch((err) => {
      console.error('Microphone access denied or not supported:', err);
    });
  }
```

Step 1: Requests access to the user’s microphone using `getUserMedia`.

Step 2: `MediaRecorder` is instantiated with the selected MIME type.

Step 3: Audio data gets collected in chunks and is processed into a Blob when the recording is completed.

Step 4: The `recording-change` event is dispatched with the generated recording URL and extension.

**Stop recording**

### Security Design

---

## Changelog
