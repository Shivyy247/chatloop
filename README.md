# ChatLoop 

ChatLoop is a full-stack real-time chat application that allows users to register, log in, and chat instantly with other users using WebSockets. It provides secure authentication and smooth real-time messaging experience.

---

## 🚀 Features

- User registration and login
- Google OAuth authentication
- Real-time one-to-one chat
- Instant messaging using Socket.io
- JWT-based authentication
- User list and chat functionality
- Responsive UI

---

## 🛠️ Tech Stack

Frontend:
- React (Vite)
- Material UI (MUI)
- Axios
- React Router

Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.io
- JWT Authentication
- Google OAuth

---

## ⚙️ Setup Instructions

### Clone Repository
git clone https://github.com/Shivyy247/chatloop.git  
cd chatloop  

---

### Backend Setup
cd server  
npm install  

Create a `.env` file:

PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret  
CLIENT_URL=http://localhost:5173  
GOOGLE_CLIENT_ID=your_google_client_id  
GOOGLE_CLIENT_SECRET=your_google_client_secret  

Run backend:
npm start or npm run dev 

---

### Frontend Setup
cd client  
npm install  
npm run dev  

Create a `.env` file:

VITE_API_URL=http://localhost:5000  

---

## 🔌 API Endpoints

Authentication:
- POST /api/auth/register → Register user
- POST /api/auth/login → Login user
- POST /api/auth/google → Google login

Users:
- GET /api/users → Get all users

Messages:
- POST /api/message/send → Send message
- GET /api/message/:chatId → Get messages

---

## ⚡ Socket Events

- connection → user connected
- send_message → send message
- receive_message → receive message
- disconnect → user disconnected

---

## 🚀 Deployment

Frontend → Vercel 
Backend → Render  
Database → MongoDB Atlas  

---

## 📌 Important Notes

- Backend must be running before frontend
- Correct API URL must be set in frontend `.env`
- Socket server must be running for real-time chat
- Enable CORS in backend for frontend origin

---

## 👨‍💻 Author

Shivani Barman

---

Distance means nothing when every message carries a piece of you!!
