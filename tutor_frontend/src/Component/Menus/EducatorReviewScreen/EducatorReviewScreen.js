import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import NavigationMainScreenUser from '../../NavigationBars/NavigationMainScreen/NavigationMainScreenUser';
import './EducatorReviewScreen.css'; // Import the same CSS file for consistency

export default function EducatorReviewScreen() {
    const { username, subject } = useParams(); // Retrieve subject from params
    const [userFullname, setUserFullname] = useState('');
    const [userUsername, setUserUsername] = useState('');
    const [educatorFullname, setEducatorFullname] = useState('');
    const [educatorUsername, setEducatorUsername] = useState('');
    const [review, setReview] = useState(''); // State for storing the review
    const navigate = useNavigate();

    // Function to handle review submission
    const handleReviewSubmit = async (event) => {
        event.preventDefault();
        if (review.trim() === '') {
            toast.error('Review cannot be empty.');
            return;
        }
        try {
            const sentimentScore = calculateSentimentScore(review);
            // Get current date and time
            const currentDate = new Date();
            await axios.post('http://localhost:5000/submitReview', {
                user_fullname: userFullname,
                user_username: userUsername,
                educator_fullname: educatorFullname,
                educator_username: educatorUsername,
                subject_name: subject,
                review_text: review,
                review_date: currentDate,
                sentiment_score: sentimentScore
            });
            toast.success('Review submitted successfully!');
            setReview('');
            navigate('/MainUserMenu')

        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Failed to submit review. Please try again.');
        }
    };

    useEffect(() => {
        // Fetch user data based on the logged-in user's session
        const user = sessionStorage.getItem('user');
        if (user) {
            const { user_username } = JSON.parse(user);
            axios.get(`http://localhost:5000/users/${user_username}`)
                .then(res => {
                    setUserFullname(res.data.user_fullname);
                    setUserUsername(res.data.user_username);
                })
                .catch(err => {
                    console.log('Error fetching user data:', err);
                });
        }

        // Fetch educator data based on the selected educator
        axios.get(`http://localhost:5000/educators/${username}`)
            .then(res => {
                setEducatorFullname(res.data.educator_fullname);
                setEducatorUsername(res.data.educator_username);
            })
            .catch(err => {
                console.log('Error fetching educator data:', err);
            });
    }, [username]);

    // Function to calculate sentiment score
    const calculateSentimentScore = (review) => {
        // Define your sentiment lexicon
        const sentimentLexicon = {
            "good": 0.5,
            "great": 0.7,
            "excellent": 0.8,
            "helpful": 0.3,
            "bad": -0.5,
            "poor": -0.7,
            "terrible": -0.8
        };

        // Split the review into words
        const reviewWords = review.toLowerCase().match(/\b\w+\b/g);
        let score = 0;

        // Iterate over each word in the review and calculate sentiment score
        reviewWords.forEach(word => {
            if (sentimentLexicon.hasOwnProperty(word)) {
                score += sentimentLexicon[word];
            }
        });

        return score;
    };

    return (
        <>
            <div>
                <NavigationMainScreenUser />
            </div>
            <div className="review-container">
                <h1>Educator Review for {educatorFullname} in {subject}</h1>
                <form className="review-form" onSubmit={handleReviewSubmit}>
                    <div className="form-group">
                        <label>User Full Name:</label>
                        <p>{userFullname}</p>
                    </div>
                    <div className="form-group">
                        <label>Educator Full Name:</label>
                        <p>{educatorFullname}</p>
                    </div>
                    <div className="form-group">
                        <label>Subject:</label>
                        <p>{subject}</p>
                    </div>
                    <div className="form-group">
                        <label>Review:</label>
                        <textarea
                            value={review}
                            onChange={(event) => setReview(event.target.value)}
                            placeholder="Write your review here..."
                            rows={4}
                            cols={50}
                            required
                        />
                    </div>
                    <button type="submit">Submit Review</button>
                </form>
            </div>
        </>
    );
}
