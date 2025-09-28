import { BACKEND_URL, FRONTEND_URL } from "./../config/config.js";

const form = document.querySelector("form");
const errorDiv = document.querySelector("#errorMsg");

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent default form submission behavior

    const data = {
        unique_name: form.unique_name.value,
        scale: form.scale.value,
        isnewadmin: form.isnewadmin.checked,
        isnewmember: form.isnewmember.checked
    };

    try {
        const res = await fetch(`${BACKEND_URL}/database/updatePoints`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const resData = await res.json();

        
        if (!res.ok) { // for error handling, 404 or other error status codes do not trigger catch block, need to check res.ok
            throw new Error('Web error! Response status ' + res.status);
        } else if (resData.isDBError) { // for database operation errors, error inside backend, but still returns 200 OK
            throw new Error('Database error: ' + (resData.message || 'Unknown database error, please contact maintainer email: ' + MAINTAINER_EMAIL));
        }

        window.location.href = `${FRONTEND_URL}/ui/login/submitSuccess.html`;
    } catch (err) {
        //window.location.href = `${FRONTEND_URL}/ui/login/submitFailed.html`;
        const errMsg = encodeURIComponent(err.message); // pass error message as URL parameter to show on failure page
        window.location.href = `${FRONTEND_URL}/ui/login/submitFailed.html?error=${errMsg}`;
        console.error(err);
    }
});