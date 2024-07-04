import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function RankingbySubjects() {
  const { subject } = useParams();
  const [educators, setEducators] = useState([]);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch educators
    axios.get(`http://localhost:5000/educators/subjects_taught/${subject}`)
      .then(res => {
        setEducators(res.data);
      })
      .catch(err => {
        console.log('Error fetching educators for subject:', err);
      });

    // Fetch reviews
    axios.get('http://localhost:5000/reviews')
      .then(res => {
        setReviews(res.data);
      })
      .catch(err => {
        console.log('Error fetching reviews:', err);
      });
  }, [subject]);

  // Calculate the total sentiment score for an educator
  const calculateSentimentScore = (educator) => {
    const educatorReviews = reviews.filter(review => 
      review.subject_name === subject && review.educator_username === educator.educator_username
    );

    const totalScore = educatorReviews.reduce((total, review) => total + review.sentiment_score, 0);
    return totalScore ? totalScore.toFixed(2) : '0.00';
  };

  // Filter educators who have reviews for the specified subject
  const educatorsWithReviews = educators.filter(educator =>
    reviews.some(review => review.subject_name === subject && review.educator_username === educator.educator_username)
  );

  return (
    <>
      <div className="educator-selection-menu">
        <section>
          <div className="heading">
            <h2>Educator Ranking for {subject}</h2>
          </div>
          <div className="subject-table-container">
            {educatorsWithReviews.length > 0 ? (
              <table className="subject-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Full Name</th>
                    <th>Total Sentiment Score</th>
                  </tr>
                </thead>
                <tbody>
                  {educatorsWithReviews.map((educator, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{educator.educator_fullname}</td>
                      <td>{calculateSentimentScore(educator)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No reviews for {subject}.</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
