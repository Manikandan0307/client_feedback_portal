const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const feedbackRoutes = require('./routes/feedback');  // Ensure this is correct

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Register the feedback routes here
app.use('/api/feedback', feedbackRoutes);  // Feedback route should be mounted here

// Other routes
app.use('/api/auth', authRoutes);  // Ensure auth routes are registered as well

app.get('/', (req, res) => {
  res.send('Backend is up and running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
