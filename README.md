# Driffle Note Management Backend Assignment
### [API documentation](https://documenter.getpostman.com/view/24519158/2s9Yyv9eb2)
#### [Deployed Live Server Link](https://driffle-backend-assignment.vercel.app/)
## Project Overview

This project serves as the backend application for managing user authentication and notes management. It provides functionalities for user sign-up, login, note creation, updating, deletion, and searching. The application ensures data privacy by allowing users access only to their own notes.

## Tech Stack

- Node.js
- Express.js
- MongoDB (using Mongoose)
- bcrypt (for password hashing)
- JSON Web Token (JWT) for authentication
- dotenv (for environment variable management)
- cookie-parser (for handling cookies)

## Application Structure
The application follows a MVC architecture.

- Controllers: Responsible for manage user authentication and note-related operations, respectively.

- Models: Define the data structure for MongoDB, represent the schema for user information and notes.

- Routes: Express routes handle incoming HTTP requests and delegate them to the appropriate controllers.

- Middleware: Custom middleware, such as authentication middleware.

## Setup in Local Environment

Follow these steps to set up the project locally:

### Prerequisites

- Node.js installed on your machine
- MongoDB Atlas Setup

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/piyushkumarg/driffle-backend-assignment.git

   cd driffle-backend-assignment
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**

   Create a `.env` file in the project root and add the following variables:

   ```env
   PORT = 8080
   SECRET_KEY = your_secret_key
   MONGODB_URL = your_mongodb_connection_string
   ```

   Replace `your_secret_key` with a secure secret key for JWT, and `your_mongodb_connection_string` with the connection string for your MongoDB database.

4. **Run the Application:**

   ```bash
   npm start  
   ```

   The application should now be running at `http://localhost:8080`.

5. **API Endpoints:**

   Explore the API endpoints using tools like Postman. Refer to the API documentation or Postman Collection for detailed information on each endpoint.

   Here is in brief collection of API end points

    ### User Routes

    #### 1. User Signup

    - **Endpoint:** `POST /api/auth/signup`
    - **Description:** Create a new user account.
   
   
    #### 2. User Login

    - **Endpoint:** `POST /api/auth/signin`
    - **Description:** Authenticate user credentials and perform login.
   

    #### 3. User Logout

    - **Endpoint:** `POST /api/auth/logout`
    - **Description:** Logout and clear user session.
   
    ### Notes Routes

    #### 1. Get User Notes

    - **Endpoint:** `GET /api/note`
    - **Description:** Retrieve all notes for the authenticated user.


    #### 2. Search User Notes

    - **Endpoint:** `GET /api/note/search/:query`
    - **Description:** Search for notes based on a keyword.
    

    #### 3. Create User Note

    - **Endpoint:** `POST /api/note`
    - **Description:** Create a new note for the authenticated user.
  
    #### 4. Update User Note

    - **Endpoint:** `PUT /api/note/:id`
    - **Description:** Update a specific note for the authenticated user.
  
    #### 5. Delete User Note

    - **Endpoint:** `DELETE /api/note/:id`
    - **Description:** Delete a specific note for the authenticated user.
   
    #### 6. Update Note Status

    - **Endpoint:** `PUT /api/note/update-status/:id`
    - **Description:** Update the status of a specific note for the authenticated user.
 

## API Documentation
For detailed information on API endpoints, refer to the provided Postman Collection or [API documentation](https://documenter.getpostman.com/view/24519158/2s9Yyv9eb2).