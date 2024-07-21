# MERN Chat Application - ChatHorizon

This is a real-time chat application built using the MERN stack (MongoDB, Express, React, Node.js) and Socket.io.

## Features

- Real-time messaging
- User authentication
- User profile management
- Responsive UI
- CORS and cookie-based authentication

## Prerequisites

- Node.js
- MongoDB
- npm or yarn

## Installation

### Backend

1. Clone the repository:

    ```sh
    git clone <repository-url>
    cd server 
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file and add the following environment variables:

    ```plaintext
    FRONTEND_URL=<.....> 
    PORT=<.....> 
    DBNAME=<.....> 
    MONGOOSE_URI=<.....> 
    JWT_SECRET_KEY =<.....> 
    ```

4. Start the backend server:

    ```sh
    npm start
    ```

### Frontend

1. Navigate to the frontend directory:

    ```sh
    cd ../client
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file and add the following environment variables:

    ```plaintext
    REACT_APP_CLOUDINARY_CLOUD_NAME = <.....> 
    REACT_APP_BACKEND_URL =<.....> 
    ```

4. Start the frontend development server:

    ```sh
    npm start
    ```

## Usage

1. Open your browser and navigate to your LocalHost URI.
2. Register a new account or log in with an existing account.
3. Start chatting in real-time with other users.

## Technologies Used

- MongoDB
- Express.js
- React.js
- Node.js
- Socket.io
- Axios
- React Router
- React Toastify
- Tailwind CSS (or any other CSS framework you used)

## Backend Structure

- `index.js`: Entry point of the application. Configures middleware, routes, and starts the server.
- `config/connectDB.js`: Handles MongoDB connection.
- `routes/index.js`: Defines the API routes.
- `controllers/`: Contains the logic for handling requests.
- `models/`: Defines the Mongoose schemas and models.

## Frontend Structure

- `src/components/`: Contains React components.
- `src/pages/`: Contains different pages of the application.
- `src/context/`: Context API for state management.
- `src/utils/`: Utility functions and constants.

## CORS Configuration

In `index.js` (Backend):

```javascript
import cors from "cors";

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
