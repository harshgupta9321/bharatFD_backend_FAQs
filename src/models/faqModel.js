const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    translations: {  // Add translations field to store translations for each language
      type: Map,
      of: {
        question: String,
        answer: String
      },
      default: {}
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('FAQ', faqSchema);
