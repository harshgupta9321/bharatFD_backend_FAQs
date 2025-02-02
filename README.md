# FAQ Backend API

This is the backend API for managing FAQs (Frequently Asked Questions). It supports multilingual FAQs and uses Redis for caching. The API provides endpoints for fetching and creating FAQs.

---

## Table of Contents

1. [Installation](#installation)
2. [Environment Variables](#environment-variables)
3. [API Documentation](#api-documentation)
4. [Unit Testing](#unit-testing)
5. [Contributing](#contributing)
6. [Deployment](#deployment)
7. [License](#license)

---

## Installation

To set up the project locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/your-username/faq-backend.git
cd faq-backend
2. Install dependencies
bash
Copy
Edit
npm install
3. Set up environment variables
Create a .env file at the root of the project with the following environment variables:

ini
Copy
Edit
MONGO_URI=your_mongo_connection_string
REDIS_URL=your_redis_connection_string
PORT=8000
Make sure to replace the values with your actual MongoDB and Redis connection strings.

4. Start the application
bash
Copy
Edit
npm start
Your backend API should now be running on http://localhost:8000.

Environment Variables
Variable	Description
MONGO_URI	MongoDB connection string
REDIS_URL	Redis connection string
PORT	Port to run the server (default: 8000)
API Documentation
1. GET /faqs
Fetch all FAQs in the requested language. You can pass a lang query parameter to get the FAQs in a specific language. If no lang parameter is provided, the default language is English (en).

Input
Query Parameters:
lang (optional): Language code for translation (e.g., en, hi, bn, etc.). Defaults to en if not provided.
Example Request:
bash
Copy
Edit
GET /faqs?lang=hi
Example Response (Success):
json
Copy
Edit
[
    {
        "question": "Node.js क्या है?",
        "answer": "Node.js एक जावास्क्रिप्ट रनटाइम है जो Chrome के V8 इंजन पर बनाया गया है।"
    }
]
Example Response (Error):
json
Copy
Edit
{
  "message": "Error fetching FAQs"
}
2. POST /faqs
Create a new FAQ. You can provide a question and answer in the request body. The FAQ will be translated into multiple languages (e.g., Hindi, Bengali) and cached in Redis.

Input
Body Parameters:
question: The FAQ question (string).
answer: The FAQ answer (string).
Example Request:
bash
Copy
Edit
POST /faqs
Content-Type: application/json

{
  "question": "What is Node.js?",
  "answer": "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine."
}
Example Response (Success):
json
Copy
Edit
{
  "question": "What is Node.js?",
  "answer": "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine."
}
Example Response (Error):
json
Copy
Edit
{
  "message": "Error creating FAQ"
}
Unit Testing
Unit tests are written using Mocha and Chai. To run the tests, follow these steps:

1. Run the tests:
bash
Copy
Edit
npm run test
2. Test Coverage:
The tests check the following:

API endpoints: Ensure the correct data is returned for valid requests.
Translation logic: Ensure that FAQs are correctly translated into multiple languages and cached in Redis.
Contributing
Contributions are welcome! Please follow these steps to contribute:

Fork the repository.
Create a new branch (git checkout -b feature-name).
Make your changes.
Commit your changes (git commit -m 'Add new feature').
Push to the branch (git push origin feature-name).
Open a pull request with a description of your changes.
Deployment
You can deploy the project using Render. Follow these steps:

1. Create a Render account and link your GitHub repository.
2. Create a new Web Service on Render with the following settings:
Build Command: npm install
Start Command: npm start
3. Configure environment variables for MongoDB and Redis (MONGO_URI, REDIS_URL).
4. Click Create Web Service to deploy your application.
License
This project is licensed under the MIT License - see the LICENSE file for details.