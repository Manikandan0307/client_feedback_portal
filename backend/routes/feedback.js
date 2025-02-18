const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Feedback = require('../models/Feedback');
const router = express.Router();

// POST request to submit feedback
router.post('/', authMiddleware, async (req, res) => {  // The route is POST to '/api/feedback'
  try {
    const { feedback, category, priority } = req.body;
    const userId = req.user.id;
    await Feedback.createFeedback(userId, feedback, category, priority);
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting feedback' });
  }
});

// Optionally, add a GET route to fetch feedback
router.get('/', authMiddleware, async (req, res) => {
  try {
    const feedbacks = await Feedback.getFeedbacks();
    res.status(200).json({ feedbacks });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching feedback' });
  }
});

module.exports = router;
