Class name: Server
Responsibilites:
    - Constantly listens for events
    - Handles HTTP requests/responses from students client
    - API calls modify/query database
    - Knows the # of students for sessions
    - Knows the ratings for sessions
    - Knows the comments for sessions
    - Sends data to professor's client
Collaborators:
    - Professor
    - Student
    - Sessions
    - Records

Class name: Professor
Responsibilities:
    - Knows its unique identifier
    - Knows its first name
    - Knows its last name
    - Knows its time of creation

Class name: Student
Responsibilities:
    - Knows its unique identifier
    - Knows its time of creation
    - Knows the id of its current session

Class name: Sessions
    - Knows its unique identifier
    - Knows its time of creation
    - Knows the id of the professor who created it
    - Knows the name that the professor gave it

Class name: Records
Responsibilities:
    - Knows the student id that created it
    - Knows the session id that it belongs to
    - Knows the time that it was created
    - Knows the student's rating
    - Knows the student's previous rating
    - Knows what the student commented

Class name: App
Parent class: Component
Responsibilities:
    - Displays various different views
    - Navigation between various pages/views
Collaborators:
    - LandingPage
    - ProfView
    - StudentView
    - DashBoard

Class name: LandingPage
Parent class: Component
Responsibilities:
    - Display main page
    - Allow students to enter code to join sessions

Class name: DashBoard
Parent class: Component
    - Display professor's view of a session, with all stats
    - Get all comments sent to professor
    - Get all ratings from the students

Class name: StudentView
Parent class: Component
Responsibilities:
    - Display student's view after joining a session
    - Buttons/field to send comments and ratings to the server/database

Class name: ProfessorView
Parent class: Component
Responsibilities:
    - Display professor's view after logging in
    - Create new sessions
    - Look through list of other sessions
Collaborators:
    - SessionsList

Class name: SessionsList
Parent class: Component 
    - Displays all previous sessions
    - Download data from existing sessions