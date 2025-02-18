const db = require('../config/db'); // Ensure this is correctly exported

const User = {
  findByEmail: async (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [results] = await db.query(query, [email]);
    return results[0];
  },

  createUser: async (username, email, password) => {
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    const [results] = await db.query(query, [username, email, password]);
    return results;
  },
};

module.exports = User; // Ensure this is exporting the User model
