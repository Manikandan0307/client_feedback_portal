const db = require('../config/db');

const Feedback = {
  createFeedback: async (userId, feedback, category, priority) => {
    const query = 'INSERT INTO feedbacks (user_id, feedback, category, priority) VALUES (?, ?, ?, ?)';
    const [results] = await db.query(query, [userId, feedback, category, priority]);
    return results;
  },

  getFeedbacks: async () => {
    const query = 'SELECT * FROM feedbacks';
    const [results] = await db.query(query);
    return results;
  },
};

module.exports = Feedback;
