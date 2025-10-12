// Add this file to show error message passed as URL parameter
import { MAINTAINER_EMAIL } from "/config/config.js";

const params = new URLSearchParams(window.location.search);
const msg = params.get("error");
if (msg) {
    document.getElementById("errorMsg").textContent = decodeURIComponent(msg);
}
else {
    document.getElementById("errorMsg").textContent = 'Unknown error occurred. Please contact maintainer' + MAINTAINER_EMAIL + ' for help.';
}