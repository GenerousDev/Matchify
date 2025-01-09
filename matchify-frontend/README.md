# Profile Creation Feature Testing

This project contains a React profile creation form and automated tests using WebDriverIO.

## Project Structure
```
├── src/
│   └── components/
│       └── ProfileCreationForm.jsx
├── test/
│   ├── specs/
│   │   └── profileCreation.test.js
│   └── fixtures/
│       ├── valid-profile-pic.jpg
│       └── invalid-file.txt
├── wdio.conf.js
└── package.json
```

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Chrome browser

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Install required packages:
```bash
npm install @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter webdriverio
```

3. Place test fixtures:
- Add a valid image file named `valid-profile-pic.jpg` in `test/fixtures/`
- Add a text file named `invalid-file.txt` in `test/fixtures/`

## Running the Application

1. Start the React development server:
```bash
npm start
```

2. The application will be available at `http://localhost:3000`

## Running Tests

1. Make sure the React application is running
2. In a separate terminal, run the tests:
```bash
npx wdio run wdio.conf.js
```

## Test Cases

The test suite includes the following scenarios:

1. Successful Profile Creation
   - Fills all mandatory fields with valid data
   - Uploads a valid profile picture
   - Verifies success message

2. Validation Errors
   - Submits empty form
   - Verifies error messages for all mandatory fields

3. Age Validation
   - Tests age requirement (18+)
   - Verifies appropriate error message

4. Image Upload Validation
   - Tests invalid file upload
   - Verifies error message for invalid file type

## Component Features

The Profile Creation Form includes:
- Input validation for all fields
- Age restriction (18+)
- Image upload with file type validation
- Success message on successful submission
- Error messages for invalid inputs

## Troubleshooting

If you encounter any issues:

1. Ensure all dependencies are installed correctly
2. Verify the React application is running before executing tests
3. Check Chrome browser is installed and up to date
4. Verify test fixtures are in the correct location
5. Check console for any error messages