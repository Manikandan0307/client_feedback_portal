import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/feedbacks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeedbacks(response.data.feedbacks);
      } catch (err) {
        alert('Error fetching feedbacks');
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Feedback List</h2>
      <ul className="space-y-4">
        {feedbacks.map((feedback) => (
          <li key={feedback.id} className="border-b pb-2">
            <p><strong>Feedback:</strong> {feedback.feedback}</p>
            <p><strong>Category:</strong> {feedback.category}</p>
            <p><strong>Priority:</strong> {feedback.priority}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedbackList;
