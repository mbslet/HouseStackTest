# Notes Application

This is a full-stack project for note management, developed with **NestJS** on the backend and **Next.js** on the frontend.

---

## Prerequisites

Make sure you have the following requirements installed on your machine:
- **Node.js** (recommended: latest LTS version)
- **npm** (Node Package Manager)
- **MongoDB** (for the database)

---

## Installation

1. **Clone the repository** to your local machine:
    ```sh
    git clone <repository_url>
    ```

2. **Navigate to the project directory**:
    ```sh
    cd notes-application
    ```

### Backend

1. **Install the backend dependencies**:
    ```sh
    cd backend
    npm install
    ```

2. **Configure the environment variables**:
    - Create a `.env` file in the `backend` folder with the following parameters:
      ```
      MONGO_URI=<your MongoDB connection>
      ```

3. **Start the backend**:
    ```sh
    npm run start
    ```

The backend will be available at: [http://localhost:3000](http://localhost:3000)

---

### Frontend

1. **Install the frontend dependencies**:
    ```sh
    cd frontend
    npm install
    ```

2. **Start the frontend**:
    ```sh
    npm run dev
    ```

The frontend will be available at: [http://localhost:3001](http://localhost:3001)

---

## Available Endpoints

### Backend (NestJS)
- **`GET /notes`**: Returns all notes.
- **`POST /notes`**: Creates a new note.
  - Body:
    ```json
    {
      "title": "string",
      "content": "string"
    }
    ```
- **`PUT /notes/:id`**: Updates an existing note.
  - Body:
    ```json
    {
      "title": "string",
      "content": "string"
    }
    ```
- **`DELETE /notes/:id`**: Removes a note.

---

## Application Features

### Frontend (Next.js)
- **Note Display**: Lists all notes with title, content, and creation date.
- **Note Creation**: Add new notes through the form.
- **Note Editing**: Edit existing notes by clicking the edit button.
- **Note Deletion**: Delete notes by clicking the delete button.

---

## Project Structure

- **Backend**: Located in the `backend` folder, uses **NestJS** and **Mongoose** for MongoDB integration.
- **Frontend**: Located in the `frontend` folder, uses **Next.js** for rendering and application state management.

---

## Accessing the Application

- **Frontend**: [http://localhost:3001](http://localhost:3001)  
- **Backend**: [http://localhost:3000](http://localhost:3000)  

---

## Issues or Questions

If you encounter any issues or need support, feel free to open an issue in the repository.


## Application Preview
Here are some images that show the appearance of the application:

![Preview](/preview.png)
