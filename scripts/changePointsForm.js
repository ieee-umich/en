const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fileInput = document.querySelector("#csvFile");
    const formData = new FormData();
    formData.append("file", fileInput.files[0]); // "file" must match the backend field name

    try {
        const res = await fetch(`${BACKEND_URL}/database/updatePointsForm`, {
            method: "POST",
            body: formData,
        });

        const resData = await res.json();

        if (!resData.success && res.status != 404) { // for database operation errors, error inside backend, but still returns 200 OK
            throw new Error('Database error: ' + (resData.message || 'Unknown database error, please contact maintainer email: ' + MAINTAINER_EMAIL));
        } else if (res.status == 404) { // for error handling, 404 or other error status codes do not trigger catch block, need to check res.ok
            throw new Error('Web error! Response status ' + res.status + '. ' + (resData.message || 'Please contact maintainer email: ' + MAINTAINER_EMAIL));
        }

        window.location.href = `${FRONTEND_URL}/ui/login/submitSuccess.html`;

    } catch (error) {
        //window.location.href = `${FRONTEND_URL}/ui/login/submitFailed.html`;
        const errMsg = encodeURIComponent(error.message); // pass error message as URL parameter to show on failure page
        window.location.href = `${FRONTEND_URL}/ui/login/submitFailed.html?error=${errMsg}`;
        console.error(err);
    }
});
