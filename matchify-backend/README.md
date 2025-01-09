# X Dating App - Backend API

## Overview
RESTful API service for X Dating App built with Express.js, featuring user authentication and profile management.

## Prerequisites
- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher)
- Git

## Project Structure
```
backend/
├── src/
│   ├── app.js              # Express app setup
│   └── server.js           # Server entry point
├── tests/
│   ├── api.test.js         # API tests
│   └── fixtures/           # Test fixtures
│       └── profile.jpg     # Sample image for testing
├── uploads/                # Upload directory for profile pictures
├── .env                    # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd x-dating-app-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
touch .env
```

4. Add the following environment variables to `.env`:
```env
PORT=3001
JWT_SECRET=your-secret-key
NODE_ENV=development
```

## Required Dependencies
Install the following packages:
```bash
# Core dependencies
npm install express cors multer bcryptjs jsonwebtoken

# Development dependencies
npm install --save-dev jest supertest nodemon
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

### Using Postman

1. Import the following collection:
```json
{
  "info": {
    "name": "X Dating App API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Register User",
      "request": {
        "method": "POST",
        "url": "http://localhost:3001/api/register",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"email\":\"user@example.com\",\"password\":\"password123\"}"
        }
      }
    }
  ]
}
```

## Common Issues and Troubleshooting

### CORS Issues
If you're getting CORS errors:
1. Check the CORS configuration in `app.js`
2. Verify the frontend origin matches the allowed origins
3. Ensure all necessary headers are included

### File Upload Issues
1. Create the uploads directory:
```bash
mkdir uploads
chmod 777 uploads  # For development only
```

2. Check file size limits in `multer` configuration

### Authentication Issues
1. Verify JWT_SECRET in .env
2. Check token expiration
3. Ensure token is properly formatted in Authorization header

## Development Guidelines

### Adding New Endpoints
1. Add route handler in `app.js`
2. Create corresponding test in `tests/api.test.js`
3. Update documentation
4. Run tests to verify changes

### Code Style
- Use async/await for asynchronous operations
- Follow ESLint configuration
- Add JSDoc comments for functions
- Keep functions small and focused

## Scripts in package.json
```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint ."
  }
}
```

## Contributing
1. Create a new branch
2. Make changes
3. Add tests
4. Create pull request

## Security Notes
- JWT_SECRET should be long and random in production
- Implement rate limiting for production
- Use secure headers (helmet)
- Validate all inputs
- Sanitize file uploads

## Performance Monitoring
- Use PM2 in production
- Monitor memory usage
- Watch for file upload limits
- Monitor API response times

## Additional Resources
- [Express.js Documentation](https://expressjs.com/)
- [Jest Documentation](https://jestjs.io/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [JWT Documentation](https://jwt.io/)