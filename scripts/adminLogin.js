// This script is used in adminLogin.html(or unique name login) to handle the form submission to check user credentials
// and redirect to dashboard is successful, or failure page if not.

import { BACKEND_URL, FRONTEND_URL, MAINTAINER_EMAIL } from "./../config/config.js";

const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent default form submission behavior

    const data = {
        username: form.username.value,
        password: form.password.value,
        withpassword: true
    };

    try {
        const res = await fetch(`${BACKEND_URL}/database/credentials`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        console.log(res);
        const resData = await res.json();

        if (!resData.success && res.status != 404) { // for database operation errors, error inside backend, but still returns 200 OK
            throw new Error('Database error: ' + (resData.message || 'Unknown database error, please contact maintainer email: ' + MAINTAINER_EMAIL));
        } else if (res.status == 404) { // for error handling, 404 or other error status codes do not trigger catch block, need to check res.ok
            throw new Error('Web error! Response status ' + res.status + '. ' + (resData.message || 'Please contact maintainer email: ' + MAINTAINER_EMAIL));
        }

        // If successful, redirect to admin dashboard, cookie will be set by backend

        window.location.href = `${FRONTEND_URL}/ui/login/adminDashboard.html`;
    } catch (err) {
        //window.location.href = `${FRONTEND_URL}/ui/login/submitFailed.html`;
        const errMsg = encodeURIComponent(err.message); // pass error message as URL parameter to show on failure page
        window.location.href = `${FRONTEND_URL}/ui/login/adminLogin.html?error=${errMsg}`;
        console.error(err);
    }
});