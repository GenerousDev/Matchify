# Profile Creation Feature Testing

This project contains a React profile creation form and automated tests using WebDriverIO.

## Project Structure
```
├── src/
│   └── components/
│       └── ProfileCreationForm.jsx
├── features/
│   ├── step-definitions/
│   │   └── steps.js
│   ├── report/
│   │   └── cucumber_report.html
│   ├── login.feature
│   └── testdata/
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

1. You can decide to run cucumber tests in GUI mode:
- To run Cucumber tests in GUI mode with WebDriverIO, you need to modify your wdio.conf.js configuration file and comment this code out in wdio.conf.js.
```
'goog:chromeOptions': {
        args: ['--headless', '--disable-gpu', '--window-size=1920x1080']
      }
```

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
npm test
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
