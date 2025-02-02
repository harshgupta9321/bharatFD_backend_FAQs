const axios = require('axios');
require("dotenv").config();


// Function to translate text using RapidAPI
const translateText = async (text, targetLanguage) => {
  const options = {
    method: 'POST',
    url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/html',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY, 
      'x-rapidapi-host': 'google-translate113.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      from: 'en',
      to: targetLanguage,
      html: text
    }
  };

  try {
    const response = await axios.request(options);
    return response.data.trans; // This contains the translated HTML (translated text)
  } catch (error) {
    console.error('Error translating text:', error);
    throw new Error('Translation failed');
  }
};

module.exports = { translateText };
