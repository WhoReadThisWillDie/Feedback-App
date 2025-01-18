# Test Report

## 1. Introduction

* Tested By: Danylo Kurbatov
* Date: 16/01/2025
* Purpose: Summarize the testing results, identify any defects, and provide an overview of the project's quality.

## 2. Test Environment

* Device: [Desktop, Mobile]
* Browsers: [Chrome, Firefox, Safari]

## 3. Test Approach

### Testing Type:

* Functional Testing
* Integration Testing
* Usability Testing
* Performance Testing

### Methodology: 
* Manual testing.

## Manual tests

| **Test Case ID** | **Test Case Description**                                  | **Test Steps**                                                                              | **Expected Result**                                          | **Actual Result**                                          | **Status (Pass/Fail)** |
|-------------------|------------------------------------------------------------|---------------------------------------------------------------------------------------------|------------------------------------------------------------|------------------------------------------------------------|------------------------|
| TC001            | The user should be able to fill text area                  | 1. Open the form<br>2. Fill in the text area<br>                                            | The user filled the text area in the form                  | The user filled the text area in the form                  | Pass                   |
| TC002            | The user wants to record an audio by clicking mic button   | 1. Click the mic button<br>2. Speak into the microphone<br>3. Stop recording                | The user recorded audio                                     | The user recorded audio                                     | Pass                   |
| TC003            | The user wants to pause a recording when needed            | 1. Start recording audio<br>2. Click the pause button                                       | The recording process stopped when a user clicks stop button | The recording process stopped when a user clicks stop button | Pass                   |
| TC004            | The user wants to be able to play an audio                 | 1. Record audio<br>3. Click the play button on the appeared audio                           | The user plays an audio by clicking play button on appeared audio | The user plays an audio by clicking play button on appeared audio | Pass                   |
| TC005            | The user wants to switch from audio to video recording     | 1. Click the switch button                                                                  | The user switches recording modes by clicking switch button | The user switches recording modes by clicking switch button | Pass                   |
| TC006            | The user wants to record a video by clicking camera button | 1. Click the camera button<br>2. Perform actions in front of the camera<br>3. Stop recording | The user recorded video                                     | The user recorded video                                     | Pass                   |
| TC007            | The user wants to stop a video recording when needed       | 1. Start video recording<br>2. Click the pause button                                       | The recording process stopped when a user clicks stop button | The recording process stopped when a user clicks stop button | Pass                   |
| TC008            | The user wants to be able to play a video                  | 1. Record video<br>2. Click the play button on the appeared video       | The user plays a video by clicking play button on appeared video | The user plays a video by clicking play button on appeared video | Pass                   |
| TC009            | The user wants to transcribe audio or video                | 1. Record audio/video<br>2. Click the transcribe button<br>3. Check the text area  | The user clicks transcribe button and the transcription appears in the textarea | The user clicks transcribe button and the transcription appears in the textarea | Pass                   |
| TC010            | The user wants to delete the feedback                      | 1. Select an audio/video feedback<br>2. Click the delete button                             | The user clicks delete button and audio or video with the text deletes | The user clicks delete button and audio or video with the text deletes | Pass                   |
| TC011            | The user wants to submit feedback                          | 1. Complete feedback creation<br>2. Click the submit button                                 | The user clicks submit button and the feedback is saved to the database | The user clicks submit button and the feedback is saved to the database | Pass                   |
| TC012            | The user wants to see the feedback they sent               | 1. Click the feedbacks button<br>2. Browse the opened feedbacks window                      | The user clicks feedbacks button and the window with all feedbacks opens | The user clicks feedbacks button and the window with all feedbacks opens | Pass                   |
| TC013            | The user wants to use the service on their phone           | 1. Open the application on a mobile device<br>2. Perform actions on the adaptive UI         | The user effectively uses it due to adaptive UI             | The user effectively uses it due to adaptive UI             | Pass                   |

**Total coverage: 100%**

## Functional Specs coverage

| **Feature** | **User Story** | **Priority** | **Source**                      | **Complete** |
|-------------|----------------|--------------|---------------------------------|--------------|
| **U1**      | As any user, I want to record feedback in the form of audio, with the ability to pause and resume the recording, so that I can improve communication, ensure external interruptions do not affect the recording, and save it for future analysis. | Must         | Assignment Description & Client | Yes          |
| **U2**      | As any user, I want reliable speech-to-text functionality to automatically transcribe my audio feedback into text and save the transcription along with the recording, so that I can access both formats for better usability and analysis.  | Must         | Assignment Description & Client | Yes          |
| **U3**      | As any user, I want the audio recording and text feedback to be protected and kept within the system, because the data I send is confidential. | Must         | Assignment Description & Client | Yes          |
| **U4**      | As a student, I want to access the audio feedback and its transcription provided by my teacher and/or fellow students, so that I can review the feedback in both audio and text format. | Must         | Assignment Description & Client | Yes          |
| **U5**      | As any user, I want the speech-to-text input to be multilingual so that it can support multiple languages and increase the accessibility. | Must         | Assignment Description & Client | No           |
| **U6**      | As any user, I want to be able to record a video file to provide feedback, so that I can show my expressions better. | Must         | Assignment Description & Client | Yes          |
| **U7**      | As a project team member, I want to provide well-researched advice on implementing video feedback, so that the client can evaluate its feasibility for future development.    | Should       | Assignment Description & Client | Yes          |

**Total coverage: 85%**
