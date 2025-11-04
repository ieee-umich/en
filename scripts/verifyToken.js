// This script checks if the user is logged in by verifying the token with the backend.
// If not logged in, redirects to the failure page.
// Used in adminDashboard.html to ensure only logged-in users can access the page.

import { RELEASE_MODE, FRONTEND_URL, BACKEND_URL, USING_LOCAL_FRONTEND } from "./../config/config.js";



async function checkLogin() {
    if (USING_LOCAL_FRONTEND ) return; // skip check in development mode
    try {
        const res = await fetch(`${BACKEND_URL}/database/verifyToken`, {
            method: 'GET',
            credentials: 'include', // must carry cookies for session
        });
        const data = await res.json();
        if (!data.loggedIn) window.location.href = `${FRONTEND_URL}/login.html`;
        if (data.decoded.role != 'admin') window.location.href = `${FRONTEND_URL}/ui/login/submitFailed.html?error=Not an admin user`;
    } catch (err) {
        console.log(err);
        window.location.href = `${FRONTEND_URL}/ui/login/submitFailed.html?error=${err}`;
    }
}

// Check login status when the page loads
window.onload = checkLogin;