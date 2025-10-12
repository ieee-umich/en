// This script checks if the user is logged in by verifying the token with the backend.
// If not logged in, redirects to the failure page.
// Used in adminDashboard.html to ensure only logged-in users can access the page.

import { RELEASE_MODE, FRONTEND_URL, BACKEND_URL } from "./../config/config.js";



async function checkLogin() {
    if (!RELEASE_MODE) return; // skip check in development mode
    try {
        const res = await fetch(`${BACKEND_URL}/database/verifyToken`, {
            method: 'GET',
            credentials: 'include', // must carry cookies for session
        });
        if (!res.ok) throw new Error('Not logged in');
        const data = await res.json();
        if (!data.loggedIn) throw new Error('Not logged in');
        if (data.decoded.role != 'admin') throw new Error('Not an admin user');
    } catch (err) {
        console.log(err);
        window.location.href = `${FRONTEND_URL}/ui/login/submitFailed.html?error=${err}`;
    }
}

// Check login status when the page loads
window.onload = checkLogin;