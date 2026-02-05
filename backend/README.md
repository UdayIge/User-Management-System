# User Management Portal - Backend API

Production-grade Node.js + Express + MongoDB backend for the User Management Portal.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment variables**
   - Copy `.env.example` to `.env`
   - Set `MONGODB_URI` (default: `mongodb://localhost:27017/user-management`)
   - Set `PORT` (default: `5000`)

3. **Run**
   ```bash
   npm run dev    # Development (with nodemon)
   npm start      # Production
   ```

## Production Deployment (Frontend + Backend)

When `NODE_ENV=production`, the backend serves the built frontend from `../frontend/dist`.

1. **Build frontend** (from project root):
   ```bash
   cd frontend && npm run build && cd ..
   ```

2. **Set environment** (in `backend/.env`):
   ```
   NODE_ENV=production
   MONGODB_URI=your-production-mongodb-uri
   PORT=5000
   ```

3. **Start backend**:
   ```bash
   cd backend && npm start
   ```

4. Open `http://localhost:5000` — API, static assets, and SPA routing work from a single origin.

## API Endpoints

### Health Check
- `GET /api/health` - API status

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Fetch users with pagination and search |
| POST | `/api/users` | Create user |
| GET | `/api/users/:id` | Get user by ID |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |
| GET | `/api/users/export` | Export users to CSV |

### Query Parameters (GET /api/users)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `search` - Search by name, email, mobile, location

### Create/Update User Body
- `firstName` (required) - string
- `lastName` (required) - string
- `email` (required) - valid email
- `mobile` (optional) - string
- `gender` (optional) - "Male" | "Female" | ""
- `status` (optional) - "Active" | "InActive"
- `location` (optional) - string
- `profile` (optional) - image file (multipart/form-data)

### Profile Upload
- For POST/PUT with `profile`: use `multipart/form-data`
- Allowed: JPEG, PNG, GIF, WebP (max 5MB)
- Files stored under `/uploads/profiles/`
- Served at `/uploads/profiles/<filename>`

## Folder Structure

```
backend/
├── src/
│   ├── config/       # Database, multer
│   ├── controllers/  # Request handlers
│   ├── middleware/   # Error handling, not found
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API routes
│   ├── services/     # Business logic
│   ├── utils/        # ApiError, ApiResponse
│   ├── validators/   # express-validator rules
│   ├── app.js        # Express app
│   └── server.js     # Entry point
├── uploads/          # Profile images (gitignored)
├── .env
└── package.json
```
