MediConnect API

Overview

MediConnect API is a RESTful backend application designed to simplify healthcare appointment management by connecting patients and doctors through a secure and efficient platform. The API supports authentication, profile management, appointment scheduling, email notifications, and role-based authorization while following a scalable MVC architecture with a dedicated service layer.

Features

- User registration and authentication using JSON Web Tokens (JWT)
- Role-based authorization for Patients, Doctors, and Administrators
- Patient profile management
- Doctor profile management
- Appointment booking and scheduling
- Appointment approval, rejection, cancellation, and rescheduling
- Doctor availability validation
- Double-booking prevention
- Password reset via email
- Email notifications for:
  - Welcome Users
  - Appointment confirmation
  - Appointment approval
  - Appointment rejection
  - Appointment cancellation
  - Password reset
- Interactive API documentation using Swagger/OpenAPI

Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt
- External Email RESTApi (Promailer)
- Swagger UI
- Helmet
- Morgan
- CORS

Project Structure

mediconnect-api/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── docs/
│   ├── emails/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── services/
├── .env.example
├── .gitignore
├── app.js
├── server.js
├── package.json
└── README.md

Installation

*Clone the repository:

git clone https://github.com/cherechi-18/mediconnect-api.git

*Navigate into the project:

cd mediconnect-api

*Install dependencies:

npm install

*Environment Variables

Create a ".env" file in the project root and configure the following variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
SERVER_URL=your_server_url(localhosturl)
API_MAIL_KEY=your_api_key

*Running the Project

- Development:

npm run dev

- Production:

npm start

API Documentation

The server is running, Swagger documentation is available at:

https://mediconnect-api-ist7.onrender.com/api-docs/

Repository

https://github.com/cherechi-18/mediconnect-api

Deployment

The API is successfully deployed on Render 
Live API at:  https://mediconnect-api-ist7.onrender.com

Author

CHERECHI EMMANUEL DIMOBIKA

Email: cherechidimobika@gmail.com

LinkedIn: https://www.linkedin.com/in/cherechi-dimobika-16220a388