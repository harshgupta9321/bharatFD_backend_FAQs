const app = require('./app');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
