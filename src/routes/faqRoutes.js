const express = require('express');
const { getFAQs, createFAQ } = require('../controllers/faqControllers');

const router = express.Router();

// Route to fetch FAQs
router.get('/faqs', getFAQs);

// Route to create a new FAQ
router.post('/faqs', createFAQ);

module.exports = router;
