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

![Database Design](/docs/resources/database_design.jpg)

| Attributes           | Description                                                                                     |
|----------------------|---------------------------------------------------------------------------------|
| `feedback_id`        | Primary Key (auto incrementing integer)                                                         |
| `audio_file_path`    | Location of the audio file in the system in the format of a file path (String)                  |
| `transcription_text` | Transcribed text from the audio (String)                                                      |
| `date_created`       | Date of when the feedback was created (TIMESTAMP)                                               |
| `date_updated`       | Date of when the feedback was updated (TIMESTAMP)                                               |

---

#### TIMESTAMP vs DATE/DATETIME

As Scorion is used globally, **TIMESTAMP** is a better choice because it automatically adjusts for time zones. It stores the value in UTC and converts it to the local time (according to the machine accessing it) when queried.


## User Interface Design

The purpose of the user interface, is to record audio feedback and to view a transcription of said audio feedback. The user should also be able to edit the text after it appears as the transcribed audio file.

### Visual design

**Colors**: Scorion provided us with their style guide, which contained the colors they commonly use in their Scorion platform:
![Scorions color palette](resources/ScorionColorPalette.png)

- ![Background color](resources/BackgroundColor.png) The color used for the background.
- ![Font color](./resources/FontColor.png) The color used for any text (outside from buttons).

**Fonts**: The specified font to use in the style guide is Roboto.

### Design
The client wants us to design a feedback form, which has a text field, a recording function and a transcribing function. From what we've seen of the client's platform, we designed the following mockups for how the user would interact with the platform to record their audio:

**Screen 1**: This is the first state of the component. An empty text form, with some buttons in the bottom. When the first button is pressed (the button with the microphone icon) the application starts recording the user's audio from their microphone. And we go to screen 2.
![User interface screen 1](./resources/Frame1.png)

**Screen 2**: The first button's icon changes to a pause icon. The user can now either click on the pause button, which pauses the recording (which also changes the icon back to the microphone icon), and click it again to resume recording. Or the stop button (the second button), which stops recording and creates an audio file component (screen 3).
![User interface screen 2](./resources/Frame2.png)

**Screen 3**: When the stop button is pressed, an audio file gets displayed and can be played. When clicking the transcript button, the audio file gets send to the back end to be transcribed, when the file is transcribed we get to screen 4.
![User interface screen 3](./resources/Frame3.png)

**Screen 4**: The transcribed text appears in the text box. When the submit button is clicked, the feedback (audio file and transcription) is sent to the backend to be saved in the database.
![User interface screen 4](./resources/Frame4.png)

### Software Design

#### Audio recording functionality

The [RecordButton](../app/frontend/src/components/RecordButton.svelte) component consists out of 3 buttons, a microphone/pause button, a stop button, and a submit button.

When pressing the start button, the application starts recording the users audio from the user's microphone. While in the progress of recording, it is possible to pause and resume (using the same button as when you start recording). When the user is finished recording their audio, they can click the stop button, which exports the audio file to a parent component ([AudioRecordComponent.svelte](../app/frontend/src/components/AudioRecordComponent.svelte)).

The AudioRecordComponent receives the audio file and then proceeds to export it to a child component ([AudioFile.svelte](../app/frontend/src/components/AudioFile.svelte)). This component then allows the audio file to be played by the user.

### Security Design

---

## Changelog
