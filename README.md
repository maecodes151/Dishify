# Dishify

Dishify is a full-stack food video discovery platform where users can explore dishes through short videos, interact with food content, and discover food partners.

Food partners can create accounts, publish dishes with videos, and showcase their food through dedicated profiles.

---

## Features

### User Features
- User registration and login.
- Browse food videos.
- Like and unlike dishes.
- Save and unsave favorite dishes.
- View saved dishes.
- Explore food partner profiles.

### Food Partner Features
- Food partner registration and login.
- Business and contact information management.
- Upload and publish dishes with videos.
- Add dish names and descriptions.
- Dedicated partner profiles displaying published dishes.

---

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React, Vite, React Router |
| Styling | CSS |
| HTTP Client | Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcryptjs, cookie-parser |
| File Uploads | Multer |
| Video Storage | ImageKit |

---

## Project Structure

```text
Dishify/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   └── general/
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── dishify-partner/
│   │   │   └── general/
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx
│   │   ├── styles/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   │   └── db.js
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   │       └── storage.service.js
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Installation and Setup

### Prerequisites

- Node.js and npm
- MongoDB (local installation or MongoDB Atlas)
- ImageKit account

### 1. Clone the Repository

```bash
git clone https://github.com/maecodes151/Dishify.git
cd Dishify
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

Open another terminal from the project root:

```bash
cd frontend
npm install
```

---

## Environment Variables

Create a `.env` file inside the `backend/` directory.

```env
MONGODB_URL=mongodb://127.0.0.1:27017/dishify

JWT_SECRET=your_jwt_secret

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

| Variable | Description |
|---|---|
| `MONGODB_URL` | MongoDB database connection string |
| `JWT_SECRET` | Secret key used to sign and verify JWTs |
| `IMAGEKIT_PUBLIC_KEY` | ImageKit public key |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private key |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit URL endpoint |

Never commit your `.env` file or expose private credentials.

---

## Running the Application

Dishify requires two terminals to run the frontend and backend.

### Start the Backend

```bash
cd backend
node server.js
```

Backend URL: `http://localhost:3000`

### Start the Frontend

```bash
cd frontend
npm run dev
```

Frontend URL: `http://localhost:5173`

The frontend communicates with the backend using Axios. Protected requests use `withCredentials: true` to send authentication cookies.

The backend CORS configuration currently allows requests from `http://localhost:5173`.

### Available Frontend Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

---

## Frontend Routes

| Route | Description |
|---|---|
| `/` | Food video feed |
| `/login` | Redirects to user login |
| `/user/register` | User registration |
| `/user/login` | User login |
| `/dishify-partner/register` | Food partner registration |
| `/dishify-partner/login` | Food partner login |
| `/dishify-partner/:id` | Food partner profile |
| `/create-dishify` | Publish a new dish |
| `/saved` | View saved dishes |

---

## API Documentation

**Base URL:** `http://localhost:3000`

Protected endpoints require the authentication cookie named `token`.

### Authentication APIs

#### User Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/user/register` | Register a user |
| POST | `/api/auth/user/login` | Login a user |
| GET | `/api/auth/user/logout` | Logout a user |

#### Food Partner Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/Dishify-Partner/register` | Register a food partner |
| POST | `/api/auth/Dishify-Partner/login` | Login a food partner |
| GET | `/api/auth/Dishify-Partner/logout` | Logout a food partner |

### Food APIs

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/food` | User | Fetch food items |
| POST | `/api/food` | Food Partner | Publish a dish |
| POST | `/api/food/like` | User | Like or unlike a dish |
| POST | `/api/food/save` | User | Save or unsave a dish |
| GET | `/api/food/save` | User | Fetch saved dishes |

### Food Partner APIs

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/dishify-partner/:id` | User | Fetch a food partner profile |

### Example Request Bodies

**User Registration**

```json
{
  "fullname": "Alex Example",
  "email": "alex@example.com",
  "password": "example"
}
```

**User Login**

```json
{
  "email": "alex@example.com",
  "password": "example"
}
```

**Food Partner Registration**

```json
{
  "name": "Example Kitchen",
  "email": "kitchen@example.com",
  "password": "example",
  "phone": "555-0100",
  "Address": "1 Example Street",
  "contactName": "Sam Example"
}
```

**Publish a Dish**

The food partner submits multipart form data containing:

| Field | Type |
|---|---|
| `video` | File |
| `name` | String |
| `description` | String |

**Like or Save a Dish**

```json
{
  "foodId": "your_food_id"
}
```

---

## Authentication

Dishify uses JWT-based authentication.

The authentication flow includes:

1. Passwords are hashed using bcryptjs.
2. Users and food partners register and log in.
3. The backend generates a JWT containing the account ID.
4. The JWT is stored in a cookie named `token`.
5. `cookie-parser` reads the authentication cookie.
6. Authentication middleware verifies the JWT and retrieves the account.
7. Protected routes check whether the request is authenticated.
8. Logout clears the authentication cookie.

Separate authentication middleware is used for users and food partners.

---

## Database Models

Dishify uses MongoDB with Mongoose.

| Model | Purpose |
|---|---|
| User | Stores user account information |
| Dishify Partner | Stores food partner and business information |
| Food | Stores dish details, video URL and partner reference |
| Like | Connects users with liked dishes |
| Save | Connects users with saved dishes |

Food documents belong to a partner, while likes and saves associate users with food documents.

---

## Video Upload System

Dishify uses ImageKit to store uploaded food videos.

The upload process:

1. A food partner selects a video.
2. The frontend sends the video using multipart form data.
3. Multer handles the uploaded file in memory.
4. The backend uploads the file buffer to ImageKit.
5. ImageKit returns a video URL.
6. The URL is stored in the MongoDB food document.
7. The frontend displays the video in the food feed and partner profile.

---

## Current Limitations

- Comments are currently stored in browser `localStorage`, not the backend.
- Removing a saved dish from the saved page currently updates local state instead of calling the unsave API.
- JWT expiration is not currently configured.
- Cookie security settings are inconsistent across authentication handlers.
- Video upload size and server-side file-type validation are not currently configured.
- The food partner profile endpoint currently returns the full partner document, including its stored password hash. This should be fixed before production deployment.

---

## Author

**Mae_codes**

Full-Stack Web Developer

- GitHub: [@maecodes151](https://github.com/maecodes151)
- Repository: [Dishify](https://github.com/maecodes151/Dishify)

---

If you find this project interesting, consider giving it a star.