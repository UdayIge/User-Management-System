# User Management Portal - MERN Stack

A full-stack user management application built with the MERN (MongoDB, Express, React, Node.js) stack. This application allows you to create, read, update, and delete user records with profile images and comprehensive user information.

[Live Demo](https://users-hub-five.vercel.app/)

## Features

- **User CRUD Operations**: Create, read, update, and delete users
- **Form Validation**:
  - Required fields: First Name, Gender, Status
  - At least Email OR Mobile required
  - Mobile number validation (10-15 digits)
- **Mobile Verification**: Blue tick indicator for verified mobile numbers
- **Status Management**: Color-coded active/inactive status (green for Active, red for Inactive)
- **Profile Images**: Upload and display user profile pictures
- **Search & Filter**: Search users by name, email, or location
- **Pagination**: Efficient data loading with pagination
- **Export**: Export user data to CSV
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS

## Tech Stack

### Frontend

- React 18
- React Router v6
- Tailwind CSS
- React Hot Toast (notifications)
- React Icons
- Vite (build tool)

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- Express Validator
- Multer (file uploads)
- CORS

## Project Structure

```
Proj/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── api/       # API client functions
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/     # Page components
│   │   ├── utils/     # Utility functions
│   │   └── config/    # Configuration files
│   └── package.json
│
├── backend/           # Express backend API
│   ├── src/
│   │   ├── models/    # MongoDB models
│   │   ├── controllers/ # Route controllers
│   │   ├── routes/    # API routes
│   │   ├── validators/ # Input validation
│   │   ├── middleware/ # Express middleware
│   │   ├── services/  # Business logic
│   │   ├── config/    # Configuration
│   │   └── utils/     # Utility functions
│   ├── api/
│   │   └── index.js   # Vercel serverless entry point
│   ├── uploads/       # User profile images
│   ├── vercel.json    # Vercel deployment config
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/UdayIge/User-Management-System.git
   cd Proj
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the backend directory:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/user-management
   NODE_ENV=development
   ```

3. **Frontend Setup**

   ```bash
   cd ../frontend
   npm install
   ```

   Create a `.env` file in the frontend directory:

   ```env
   VITE_API_URL=http://localhost:5000
   ```

### Running the Application

1. **Start MongoDB** (if using local MongoDB)

   ```bash
   mongod
   ```

2. **Start Backend Server**

   ```bash
   cd backend
   npm run dev
   ```

   Server runs on http://localhost:5000

3. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on http://localhost:5173

## Deployment

### Backend - Vercel Serverless

The backend is configured for serverless deployment on Vercel:

1. Install Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. Deploy backend:

   ```bash
   cd backend
   vercel
   ```

3. Set environment variables in Vercel dashboard:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: production

### Frontend - Vercel/Netlify

1. Build the frontend:

   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `dist` folder to Vercel or Netlify

3. Update `VITE_API_URL` to point to your deployed backend

## API Endpoints

### Users

- `GET /api/users` - Get all users (with pagination & search)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/export` - Export users to CSV

## Validation Rules

### User Model

- **firstName**: Required, max 50 characters
- **lastName**: Optional, max 50 characters
- **email**: Optional (if mobile provided), must be valid email format
- **mobile**: Optional (if email provided), must be 10-15 digits
- **gender**: Required, must be "Male" or "Female"
- **status**: Required, must be "Active" or "InActive"
- **location**: Optional, max 100 characters
- **verified**: Boolean, indicates mobile verification status
- **profile**: Optional profile image

## Features Explained

### Required Fields

- First Name, Gender, and Status are mandatory
- At least Email OR Mobile must be provided

### Mobile Verification

- When a user's mobile is verified, a blue checkmark appears next to the mobile number
- Verification status is stored in the database

### Status Colors

- **Active**: Green background with green text
- **InActive**: Red background with red text

### Profile Images

- Supported formats: JPEG, JPG, PNG, GIF, WEBP
- Images are stored in the backend's `/uploads` folder
- Images are displayed throughout the application

## Development Notes

- The backend uses Express with async/await error handling
- Frontend uses React Hooks for state management
- Tailwind CSS for utility-first styling
- Form validation on both client and server side
- MongoDB indexes for efficient text search

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

For issues and questions, please open an issue in the GitHub repository.
