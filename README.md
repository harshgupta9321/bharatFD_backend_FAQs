# Bharat FAQ Backend API

This is a **FAQ Management API** built with Node.js, Express, MongoDB, and Redis. It provides multilingual FAQ support and caching with Redis to improve performance. You can easily interact with the API using the provided endpoints.

---

## Demo API

You can test the API directly at:

- **API Base URL**: [https://bharatfd-backend-faqs.onrender.com](https://bharatfd-backend-faqs.onrender.com)
- **API FAQ Endpoint**: [https://bharatfd-backend-faqs.onrender.com/api/faqs/](https://bharatfd-backend-faqs.onrender.com/api/faqs/)

---

## Features

- Multilingual FAQ support (supports Hindi, Bengali, Russian, etc.)
- Caching with Redis to improve performance
- REST API to manage FAQs
- Admin panel available for managing FAQs (not yet implemented fully)

---

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **MongoDB Atlas** - NoSQL database for storing FAQs
- **Redis** - In-memory database for caching
- **AdminJS** - For admin panel interface (not fully implemented)

---

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/bharatfd-backend-faqs.git
   cd bharatfd-backend-faqs
Install dependencies:

Using npm:

bash
Copy
Edit
npm install
Or using yarn:

bash
Copy
Edit
yarn install
Setup environment variables:

Create a .env file in the root of the project and add your MongoDB and Redis configurations:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
REDIS_URL=your_redis_connection_url
Replace your_mongodb_connection_string and your_redis_connection_url with your actual MongoDB Atlas and Redis credentials.

Run the application locally:

Using npm:

bash
Copy
Edit
npm start
Or using yarn:

bash
Copy
Edit
yarn start
The application will start running at http://localhost:5000.

API Endpoints
1. GET /api/faqs/
Description: Get all FAQs, with support for dynamic language translation.

Query Parameters:

lang: Optional query parameter for the language of the FAQs (default is en).
Supported languages: en, hi, bn, ru, etc.
Example:

bash
Copy
Edit
curl -X GET "https://bharatfd-backend-faqs.onrender.com/api/faqs?lang=hi"
Response: Returns an array of FAQs in the requested language.

json
Copy
Edit
[
  {
    "question": "What is your name?",
    "answer": "मेरा नाम क्या है?",
    "translations": {
      "hi": {
        "question": "आपका नाम क्या है?",
        "answer": "आपका नाम क्या है?"
      }
    }
  }
]
2. POST /api/faqs/
Description: Create a new FAQ. The system will automatically translate the FAQ into multiple languages.

Body Parameters:

question (string): The question for the FAQ.
answer (string): The answer for the FAQ.
Example:

bash
Copy
Edit
curl -X POST "https://bharatfd-backend-faqs.onrender.com/api/faqs/" \
     -H "Content-Type: application/json" \
     -d '{
           "question": "What is the capital of India?",
           "answer": "New Delhi"
         }'
Response: Returns the created FAQ with translations in other languages.

json
Copy
Edit
{
  "question": "What is the capital of India?",
  "answer": "New Delhi",
  "translations": {
    "hi": {
      "question": "भारत की राजधानी क्या है?",
      "answer": "नई दिल्ली"
    },
    "bn": {
      "question": "ভারতের রাজধানী কী?",
      "answer": "নিউ দিল্লি"
    }
  }
}
Admin Panel (Not Fully Implemented Yet)
An Admin Panel will be implemented soon to manage FAQs. Currently, this feature is under development, but it will provide a user-friendly interface to:

Add, edit, or delete FAQs
View FAQs in multiple languages
Manage translations
Deployment
This API is hosted on Render. You can deploy your own instance or use the live version available at:

Live URL: https://bharatfd-backend-faqs.onrender.com
Testing
You can test the API directly on the following endpoints:

GET /api/faqs/ to fetch all FAQs.
POST /api/faqs/ to create a new FAQ.
Use Postman or curl to make requests to these endpoints, or interact with the live API directly from your browser.

Contributing
Feel free to fork the repository and contribute by opening an issue or submitting a pull request. Contributions are welcome!

Steps for contributing:
Fork this repository.
Create a new branch.
Make your changes and commit them.
Push the branch to your forked repository.
Create a pull request to the main repository.
License
This project is licensed under the MIT License - see the LICENSE file for details.

markdown
Copy
Edit

### Key Sections:
1. **API Base URL** & **FAQ Endpoint**: I included these so users can quickly see how to interact with your live API.
2. **Installation**: Clear instructions to clone and run your project locally.
3. **API Endpoints**: Added the full documentation for your `GET` and `POST` API routes, with examples.
4. **Admin Panel**: Placeholder for the admin panel, as you mentioned it’s not fully implemented yet.
5. **Testing**: Clear directions on testing the API.

Just copy-paste this into your `README.md` file, and you'll be good to go!