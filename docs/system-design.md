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

The Logical View represents the high-level architecture of the system, focusing on how the major components interact with each other to accomplish the primary goal of recording and managing audio feedback and its transcription. This system is designed to provide a secure, user-friendly, and efficient workflow, aligned with Scorion's requirements.

![Logical View](../docs/resources/logical_view_diagram.png)

#### Explanation of the Logical View

##### User Interface (Frontend)

The user interface is implemented using Svelte and styles with Tailwind CSS, ensuring responsiveness and ease of use. The frontend server as the starting point of user interaction. Users can:
- Record audio feedback through a record button on the interface.
- View the transcription of the recorded audio once it has been processed.

The frontend sends the recorded audio to the backend for processing and displays the processed data (e.g., transcriptions and audio) once it is returned.

##### MediaStream API

The MediaStream API is responsible for recording audio from the user's device (microphone). It facilitates:
- Audio Recording: MediaStream captures the user's audio input in real time and generates an audio file in a browser-compatible format (e.g., webm, ogg, or mp3).
- Data Transmission: Once recorded, the audio file is sent to the backend for further processing and storage.

This API ensures cross-browser compatibility and efficiency, making it suitable for a wide range of devices.

##### Backend API (Express.js)

The backend, built with Express.js, acts as the central communication hub of the system. It performs the following key operations:
- Receiving Audio Files: The backend receives recorded audio files from the frontend via HTTP POST requests.
- Transcription Processing: The backend sends the received audio file to the transcription engine (Whisper API) for speech-to-text processing.
- Data Storage: After transcription, both the audio file and its transcription are stored securely in the SQLite database.
- Data Retrieval: The backend serves saved audio and transcription data to the frontend upon request.

The backend ensures secure and efficient handling of all data without relying on third-party services, aligning with Scorion’s security requirements.

##### Whisper Transcription API

The Whisper Transcription API, running locally, provides speech-to-text functionality. It processes the audio files received from the backend and generates a textual transcription. Key features include:
- Local Processing: Unlike cloud-based transcription APIs, Whisper processes audio files on local resources, ensuring data confidentiality.
- Multilingual Support: Whisper can handle multiple languages (English, Dutch, German), meeting the client's needs for multilingual transcription.
- Output Delivery: Once processed, the transcribed text is sent back to the backend.

##### SQLite Database

The SQLite Database is used for persistent storage. It maintains records of:
- Audio Files: File paths for audio recordings stored locally on the server.
- Transcriptions: Text generated from audio recordings.
- Timestamps: Metadata such as the creation and last update timestamps.

SQLite was chosen due to its lightweight nature, simplicity, and ability to handle the requirements of a standalone proof-of-concept application.

##### Data Flow

The system operates as follows:
1. Audio Recording: The user records audio through the frontend using the MediaStream API.
2. Audio File Transmission: The recorded audio is sent to the backend via the Express.js API.
3. Transcription: The backend forwards the audio file to the Whisper API, which transcribes it into text and sends the result back to the backend.
4. Data Storage: The backend saves both the audio file and its transcription in the SQLite database.
5. Data Retrieval: Upon user request, the backend fetches the saved data and sends it to the frontend for display.

This flow ensures seamless user interaction while maintaining data security and efficiency.

##### Design Goals

- Security: By using Whisper for transcription and SQLite for local data storage, the system avoids reliance on third-party services, ensuring data privacy and compliance with standards like GDPR.
- Scalability: While the current implementation focuses on local processing, the modular architecture allows for future integration of additional features, such as multilingual transcription or video feedback.
- User Experience: The system uses Tailwind CSS for a clean and responsive interface, providing an intuitive user experience that aligns with Scorion's design guidelines.
- Performance: The logical architecture is designed to minimize processing delays by streamlining the flow between the frontend, backend, transcription, and storage components.


#### Summary

The logical view captures the essence of the system, showcasing how the frontend, backend, MediaStream API, Whisper API, and SQLite database collaborate to provide a secure and efficient audio feedback solution.

### Hardware Architecture

The Hardware Architecture describes the physical components that support the system's deployment, ensuring efficient handling of user requests, audio processing, and database operations. Below is the diagram and explanation.

![Hardware Architecture](../docs/resources/hardware_diagram.png)

#### Explanation of the Hardware Architecture

##### User Devices

Devices used by end-users to interact with the system, such as laptops, desktops, tablets, or smartphones.

Responsibilities:
- Recording audio using the MediaStream API.
- Sending HTTP requests (audio files) to the frontend server.
- Receiving processed data (audio and transcription) from the backend.

##### Frontend Server

The server hosting the frontend application, built using Svelte.

Responsibilities:
- Serving the user interface to user devices.
- Forwarding user requests (e.g., recorded audio) to the backend server.
- Displaying processed data received from the backend server.

Deployment: The Svelte frontend application is run locally using Node.js. This setup is for testing and development purposes and is not intended for production deployment.

How it Works: The frontend is served using the development server (npm run dev) specified in the package.json. This allows the team to test and interact with the UI during development.

##### Backend Server

The main application server, built using Express.js.

Responsibilities:
- Handling API requests from the frontend server.
- Managing audio files and transcription workflows.
- Interfacing with the transcription server (Whisper) and database server (SQLite).
- Returning processed data (transcription and audio) to the frontend.

Deployment: The Express.js backend is also run locally using Node.js. The server is started with a script (npm start or equivalent) defined in the package.json.

How it Works: The backend processes requests from the frontend and communicates with Whisper and SQLite, all within the local development environment, simplifying debugging and development workflows.

##### Transcription Server (Whisper API)

A local server running Whisper, responsible for converting audio files into transcribed text.

Responsibilities:
- Processing audio files sent by the backend server.
- Generating text transcriptions with minimal latency.
- Ensuring data security by operating within the controlled environment of the backend infrastructure.

Deployment: Whisper is run locally within the same environment as the backend. No separate infrastructure is used. The system ensures audio files and transcriptions are processed without leaving the local setup.

How it Works: Whisper is initialized and operated on the same machine as the backend, reducing complexity and ensuring all data remains secure.

##### Database Server (SQLite)

A local database server storing audio file paths, transcriptions, and metadata.

Responsibilities:
- Storing feedback data securely and reliably.
- Supporting efficient data retrieval for frontend and backend operations.

Deployment: SQLite is embedded within the backend and operates locally. The database file (database.sqlite) resides in the project directory, making it accessible to the backend without additional configuration.

How it Works: All feedback data is stored and retrieved locally, simplifying development. While SQLite is lightweight and efficient for development, scalability considerations may be needed for future production use.

##### Design Goals for the Hardware Architecture

- Security: The system ensures data safety by processing and storing all feedback locally, avoiding external services that might compromise sensitive data.
- Scalability: The architecture is prepared for future enhancements, such as hosting on scalable platforms, though the current implementation runs locally for simplicity.
- Performance: The local SQLite database and Whisper transcription server are optimized to handle a moderate workload efficiently, ensuring smooth performance during testing and smaller-scale usage.
- Reliability: The current setup minimizes potential points of failure by operating all components on the local machine, providing a controlled and consistent development environment.

### Software Architecture

The software architecture explains how the different components of the system interact on a logical level. It includes the layers and the flow of data between the Frontend, Backend, and other supporting components such as the Database and Whisper Transcription API.

![Software Architecture](../docs/resources/software_architecture_diagram.png)

#### Explanation of the Software Architecture

##### Frontend Application (Svelte)

The frontend application, developed using Svelte, is the primary user-facing component.

Responsibilities:
- Capturing user input, such as audio feedback, using the MediaStream API.
- Sending audio files to the backend via HTTP requests for processing.
- Displaying processed data received from the backend, such as transcribed text and stored feedback.
- Providing an intuitive and responsive interface for interacting with the system.

##### Backend API (Express.js)

The backend acts as the central logic layer, connecting the frontend with other components like the database and Whisper Transcription API.

Responsibilities:
- Handling HTTP requests from the frontend.
- Managing audio files, transcription workflows, and interactions with the database.
- Sending audio files to the Whisper Transcription API for processing and receiving transcription results.
- Returning processed data to the frontend, ensuring efficient and secure data flow.

##### Whisper Transcription API

This locally-hosted API processes audio files and returns corresponding transcribed text.

Responsibilities:
- Converting audio files into accurate text transcriptions.
- Operating securely and independently within the backend environment to maintain data confidentiality.

##### SQLite Database

The database stores feedback data, including audio file paths, transcription results, and associated metadata.

Responsibilities:
- Handling CRUD operations (Create, Read, Update, Delete) initiated by the backend.
- Providing reliable data storage for transcription results and user feedback.
- Supporting efficient data retrieval for display on the frontend.

### Information Architecture

The Information Architecture focuses on the organization, storage, and flow of data within the system. It defines how information is structured and how data is accessed, processed, and stored at different stages of the application.

![Information Architecture](../docs/resources/information_architecture_diagram.png)

#### Explanation of the Information Architecture

##### User Input:

- Role: Serves as the entry point for interacting with the system.
- Responsibilities:
  - Allows users to record audio feedback through the frontend (Svelte) interface.
  - Facilitates submission of recorded audio and retrieval of transcription results.

##### Frontend (Svelte):

- Captures User Input: Utilizes the MediaStream API to record audio feedback from users.
- Transmits Data: Sends recorded audio files to the backend server (Express.js) via HTTP POST requests.
- Receives Processed Data:Displays transcription results and stored feedback retrieved from the backend to the user in an intuitive format.

##### Backend (Express.js):

- Data Handling: Acts as the intermediary that manages the flow of data between the frontend, database, and Whisper Transcription API.
  - Storing Data: Saves audio file paths, transcription results, and metadata (e.g., timestamps) into the SQLite database.
  - Retrieving Data: Fetches stored feedback data from the database and serves it to the frontend.
  - Processing Audio: Sends recorded audio files to the Whisper Transcription API for transcription and receives the processed transcription results.
- Ensures secure and structured data flow across the system components.

##### Database (SQLite):

- Structured Storage: Maintains a database table for audio file paths, transcription results, and metadata (e.g., timestamps).
- CRUD Operations:
  - Create: Adds new feedback records.
  - Read: Retrieves stored feedback data for display.
  - Update: Modifies transcription or audio details if necessary.
  - Delete: Removes feedback entries when needed.

##### Whisper Transcription API:

- Processes audio files sent from the backend and returns accurate transcription results.
- Ensures data privacy by operating locally within the backend environment.

##### User Interface:

- Presents stored data to users, including transcriptions and audio feedback, in a clear and intuitive layout.
- Ensures a seamless user experience by organizing data for efficient display and interaction.

### Performance

The performance of the system is determined by its ability to efficiently handle user interactions, process data, and maintain responsiveness. This section highlights the current performance considerations for each component of the system:

#### Frontend (Svelte Application)

- The MediaStream API is used to record audio directly in the browser, reducing latency and the need for additional processing.
- Audio files are kept lightweight using supported codecs (audio/webm or audio/ogg), ensuring fast upload speeds and minimal network resource consumption.
- Svelte compiles to highly optimized JavaScript, minimizing bundle size and ensuring quick loading times even on low-end devices.

####  Backend (Express.js API)

- The backend handles audio file uploads and transcription requests. It processes requests synchronously and ensures that each task is completed before moving to the next.
- Single-threaded processing: As the backend is built with Express.js, it processes HTTP requests in a single-threaded event loop, suitable for light workloads.

#### Audio Transcription (Whisper API)

- Transcription tasks are sent to the Whisper API, which processes audio asynchronously. Although transcription speed depends on the Whisper model's performance, it is executed independently of the frontend, ensuring that user interactions are not blocked.
- The backend manages transcription tasks sequentially, avoiding overloading the transcription service.

####  Database (SQLite)

- SQLite is used as the database to store feedback and transcription data. It is well-suited for lightweight, single-user applications or small-scale deployments.
- The database handles basic read and write operations efficiently, ensuring quick data retrieval for frontend display.

#### Data Flow

- Data flows seamlessly between components via HTTP requests, ensuring minimal delays.
- Latency is kept low due to the local nature of the database and the lightweight nature of the backend and frontend frameworks.

####  Resource Usage

- Whisper transcription and SQLite operations consume a small amount of memory and processing power, making the system ideal for deployment on resource-constrained environments (e.g., local servers, personal machines).

---

## System Design

### Database Design

![Database Design](../docs/resources/database_design.jpg)

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

#### Audio recording functionality

The [RecordButton](../app/frontend/src/components/RecordButton.svelte) component consists out of 3 buttons, a microphone/pause button, a stop button, and a submit button.

When pressing the start button, the application starts recording the users audio from the user's microphone. While in the progress of recording, it is possible to pause and resume (using the same button as when you start recording). When the user is finished recording their audio, they can click the stop button, which exports the audio file to a parent component ([AudioRecordComponent.svelte](../app/frontend/src/components/AudioRecordComponent.svelte)).

The AudioRecordComponent receives the audio file and then proceeds to export it to a child component ([AudioFile.svelte](../app/frontend/src/components/AudioFile.svelte)). This component then allows the audio file to be played by the user.

### Security Design

---

## Changelog
