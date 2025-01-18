# Sprint 1 planning 

## Targets for Sprint 1

1. Design a Template User Interface (UI)
* Create a detailed and visually appealing UI template that outlines the primary features and functionality of the system.
* Ensure the design aligns with user requirements and client expectations gathered in Sprint 0.
* Use tools such as Figma to create interactive wireframes or mockups for team review.
* Initialize and Design the Database

2. Set up the initial database structure based on documented user and system requirements.
* Define schemas, tables, relationships, and data fields to support core functionality like user management and transcription storage.
* Review and validate the database design with the team to ensure scalability and efficiency.
* Implement Core Transcription Functionality

3. Develop and integrate the feature to process audio files and convert them into text using a selected transcription API.
* Ensure the functionality handles various audio formats and provides a reliable output.
* Establish Task Separation and Workflow Management

4. Break down tasks into manageable chunks and assign them based on team members' expertise and availability.
* Conduct regular check-ins to ensure timely completion of assigned tasks and address any roadblocks.
* Research and Evaluate APIs for Audio Recording and Transcription

5. Identify and analyze a shortlist of APIs that support both audio recording and transcription functionalities. Examples could include Google Cloud Speech-to-Text, Rev.ai, or Whisper by OpenAI.
* Compare key factors such as integration complexity, performance, accuracy, cost, and compatibility with the project.
* Document findings in a structured report, highlighting the pros and cons of each option, and present it to the team for decision-making.

## Sprint 1 review 
During Sprint 1, the team made substantial progress in developing key components of the project, achieving many of the planned 
targets while adapting to unforeseen challenges. The sprint began with the successful design of a user interface (UI) aligned 
with the client’s existing system and the wireframes created during Sprint 0. Using tools such as Figma, the team delivered a 
detailed and visually engaging UI template, which was shared for team review and refinement. This step ensured the design met user 
requirements and client expectations.

The database design was another significant accomplishment during the sprint. The team set up the initial database structure, 
defining schemas, tables, relationships, and data fields to support core functionalities, including user management and transcription 
storage. The design was reviewed and validated collaboratively, ensuring it was both scalable and efficient. Task separation and workflow
management were handled effectively, with each member contributing according to their strengths. Regular check-ins facilitated smooth 
communication, allowing the team to stay on track and address any emerging roadblocks promptly.

Although the team initially completed the audio transcription functionality using the Vosk API, an unexpected limitation was identified. 
The API did not include punctuation in the transcribed text, which significantly impacted the output quality. After evaluating 
alternatives, the team decided to transition to the Whisper API in the next sprint. While this change delayed the finalization of 
the transcription feature, it was deemed necessary to ensure high-quality results. Additionally, minor UI adjustments and database 
refactoring were made following the first client meeting. These changes, though unplanned, were not time-consuming and were incorporated 
seamlessly into the workflow.

Overall, Sprint 1 demonstrated the team’s ability to deliver planned tasks while responding effectively to unforeseen challenges. 
Despite the delay in finalizing the transcription functionality, the team maintained strong collaboration and made meaningful progress, 
laying a solid foundation for Sprint 2.
