// useAuth.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useAuth() {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is authenticated
        const isAuthenticated = sessionStorage.getItem('user');
        if (!isAuthenticated) {
            // If not authenticated, redirect to the login page
            navigate('/');
        }
    }, [navigate]);

    return null;
}
