import React, { useState } from 'react';
import axios from 'axios';

function FeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // To handle button state

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setError('You must be logged in to submit feedback');
      return;
    }

    setLoading(true); // Start loading
    setError('');
    setSuccess('');

    try {
      await axios.post(
        'http://127.0.0.1:5000/api/feedback',
        { feedback, category, priority },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Feedback submitted successfully!');
      setFeedback('');
      setCategory('');
      setPriority('');
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Failed to submit feedback. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Submit Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Feedback:</label>
          <textarea
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            rows="4"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Category:</label>
          <select
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="UI">UI</option>
            <option value="Functionality">Functionality</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Priority:</label>
          <select
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
}

export default FeedbackForm;
