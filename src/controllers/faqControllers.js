const FAQ = require("../models/faqModel");
const redisClient = require("../config/redis");
const { translateText } = require("../services/translateService");

// Fetch FAQs with dynamic translation
exports.getFAQs = async (req, res) => {
  const lang = req.query.lang || "en"; // Default to English if no lang param is provided
  const cacheKey = `faqs_${lang}`;

  try {
    // Check if the translated FAQs are already in the cache (Redis)
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.json(JSON.parse(cachedData)); // Return cached data if exists
    }

    // If no cache, fetch FAQs from database
    const faqs = await FAQ.find();

    // Translate the FAQ answers dynamically based on the requested language
    const translatedFAQs = await Promise.all(
      faqs.map(async (faq) => {
        if (lang === "en") {
          return {
            question: faq.question,
            answer: faq.answer,
          };
        }

        // Get translation if it exists
        let translatedFAQ = faq.translations[lang];

        // If translation does not exist, translate the content
        if (!translatedFAQ) {
          const translatedQuestion = await translateText(faq.question, lang);
          const translatedAnswer = await translateText(faq.answer, lang);

          // Save translations in the FAQ model
          faq.translations[lang] = {
            question: translatedQuestion,
            answer: translatedAnswer,
          };
          await faq.save();

          // Cache the translated FAQ in Redis
          translatedFAQ = faq.translations[lang];
        }

        return translatedFAQ;
      })
    );

    // Cache the translated FAQs for 1 hour (3600 seconds)
    await redisClient.set(cacheKey, JSON.stringify(translatedFAQs), "EX", 3600);

    res.json(translatedFAQs);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    res.status(500).json({ message: error.message });
  }
};

// Create FAQ and store translations in Redis
exports.createFAQ = async (req, res) => {
  const { question, answer } = req.body;

  try {
    // Create new FAQ document
    const faq = new FAQ({ question, answer, translations: {} });
    await faq.save();

    // Translate FAQ into other languages and save in both DB and Redis
    const languages = ["hi", "bn"]; // Example: Hindi, Bengali
    const translations = {};

    for (let lang of languages) {
      const translatedQuestion = await translateText(faq.question, lang);
      const translatedAnswer = await translateText(faq.answer, lang);

      // Save translations in the FAQ model
      faq.translations[lang] = {
        question: translatedQuestion,
        answer: translatedAnswer,
      };
      await faq.save();

      // Store only the requested language in Redis
      await redisClient.set(
        `faqs_${lang}`,
        JSON.stringify([
          {
            question: translatedQuestion,
            answer: translatedAnswer,
          },
        ]),
        "EX",
        3600
      ); // Cache for 1 hour
    }

    // Cache the English version in Redis
    await redisClient.set(
      "faqs_en",
      JSON.stringify([{ question, answer }]),
      "EX",
      3600
    );

    res.status(201).json(faq);
  } catch (error) {
    console.error("Error creating FAQ:", error);
    res.status(500).json({ message: error.message });
  }
};
