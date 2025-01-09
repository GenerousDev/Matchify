# X Dating App - Backend API

## Overview
RESTful API service for Matchify Dating App built with Express.js, featuring user authentication and profile management.

## Prerequisites
- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher)
- Git

## Project Structure
```
backend/
├── src/
│   ├── app.js              # Express app setup
│   ├── config.js           # App configuration
│   └── server.js           # Server entry point
├── tests/
│   └── api.test.js         # API tests
├── jest-reports/
│   └── report.html         # Generated Html report
├── uploads/                # Upload directory for profile pictures
│   └── test-uploads/       # Test fixtures
│       └── profile.jpg     # Sample image for testing
├── .gitignore
├── package.json
└── README.md
```

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode
```bash
# Start with nodemon for development
npm run dev
```

### Production Mode
```bash
# Start the server
npm start
```

The API will be available at `http://localhost:3001` (or your configured PORT)

## Running Tests

### All Tests
```bash
npm test
```

### With Coverage
```bash
npm test -- --coverage
```

### Watch Mode
```bash
npm test -- --watch
```

## API Endpoints

### Authentication
```
POST /api/register
- Register new user
- Body: { email: string, password: string }

POST /api/login
- Login user
- Body: { email: string, password: string }
```

### Profile Management
```
POST /api/profiles
- Create user profile
- Authentication: Bearer token required
- Body: multipart/form-data
  - name: string
  - age: number
  - gender: string
  - location: string
  - interests: string
  - profilePicture: file

GET /api/profiles/:email
- Get user profile
- Authentication: Bearer token required
```

## Testing the API

### Using cURL

1. Register a new user:
```bash
curl -X POST http://localhost:3001/api/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

2. Login:
```bash
curl -X POST http://localhost:3001/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

3. Create profile (save the token from login response):
```bash
curl -X POST http://localhost:3001/api/profiles \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "name=John Doe" \
  -F "age=25" \
  -F "gender=Male" \
  -F "location=New York" \
  -F "interests=Reading,Travel" \
  -F "profilePicture=@/path/to/picture.jpg"
```

## Additional Resources
- [Express.js Documentation](https://expressjs.com/)
- [Jest Documentation](https://jestjs.io/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [JWT Documentation](https://jwt.io/)