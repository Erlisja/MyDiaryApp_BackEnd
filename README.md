# Mémoire -Diary app

## Backend Repository

The backend repository for this application is available here:  
**[Backend Repository URL](https://github.com/Erlisja/MyDiaryApp_BackEnd)** .

### Backend Overview

The backend is responsible for handling user authentication, managing data for diary entries, goals, and manifestations, and integrating with the OpenAI API for generating affirmations and manifestations. The backend uses **Node.js** with **Express.js** as the framework and **MongoDB** as the database.

---

### Models

1. **User Model**:

   - Fields:
     - `username`: String, unique, required.
     - `email`: String, unique, required.
     - `password`: String, hashed, required.
   - Handles user authentication and profile updates.

2. **DiaryEntry Model**:

   - Fields:
     - `userId`: ObjectId (references User), required.
     - `title`: String, required.
     - `content`: String, required.
     - `tags`: [String], required.
     - `mood`: String, required.
     - `date`: Date, required.
   - Stores user-created diary entries.

3. **Goals Model**:

   - Fields:
     - `userId`: ObjectId (references User), required.
     - `title`: String, required.
     - `description`: String, required.
     - `status`: String (e.g., `Pending`, `Completed`), required.
     - `priority`: String (e.g., `High`, `Medium`, `Low`), required.
   - Tracks user goals with status and priority.

4. **Manifestation Model**:
   - Fields:
     - `userId`: ObjectId (references User), required.
     - `content`: String, required.
     - `category`: String, required.
   - Stores both AI-generated and user-created manifestations.

---

### Routes

#### 1. **User Routes** (`/auth`):

- **POST `/register`**: Register a new user.
- **POST `/login`**: Authenticate a user and return a JSON Web Token (JWT).
- **PUT `/update-profile`**: Update user details such as username or password.

#### 2. **DiaryEntry Routes** (`/diary`):

- **GET `/`**: Fetch all diary entries for the authenticated user.
- **POST `/diary-entries`**: Create a new diary entry.
- **PUT `/:id`**: Edit an existing diary entry by its ID.
- **DELETE `/:id`**: Delete a diary entry by its ID.
- **GET `/diary-entries/last5`**: Fetch last 5 entries for the authenticated user.

#### 3. **Goals Routes** (`/goals`):

- **GET `/`**: Fetch all goals for the authenticated user.
- **POST `/new-goal`**: Add a new goal.
- **PUT `/:id`**: Update an existing goal by its ID.
- **DELETE `/:id`**: Delete a goal by its ID.

#### 4. **Manifestation Routes** (`/manifestations`):

- **GET `/`**: Fetch all manifestations for the authenticated user.
- **POST `/generate-manifestation`**: Generate manifestations using the OpenAI API.
  - Requires a `category` in the request body.
- **POST `/new-manifestation`**: Add a custom manifestation.
- **DELETE `/:id`**: Delete a manifestation by its ID.

---

### Database Connection

The backend uses **MongoDB** as the database. The connection is established using the **Mongoose** library, which provides a schema-based solution to model application data.

The `MONGO_URI` is stored in an `.env` file for security, along with other sensitive keys such as the OpenAI API key and JWT secret.

---

### Server Setup

The server is created using **Express.js**, with middleware for JSON parsing and authentication using JWT.

## How to Use the Backend

1. Clone the backend repository:

   ```bash
   git clone https://github.com/Erlisja/MyDiaryApp_BackEnd.git
   cd backend
   npm install
   ```

2. Set up the .env file with the following keys:

   - PORT=3030
   - MONGO_URI=< your-mongo-db-url >
   - SECRET=< your-jwt-secret >
   - OPENAI_API_KEY=< your-openai-api-key >

3. Start the server
   ```bash
   npm start
   ```
