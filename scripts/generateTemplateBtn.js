import { BACKEND_URL, FRONTEND_URL, MAINTAINER_EMAIL } from "../config/config.js";

document.getElementById("generateBtn").addEventListener("click", async () => {
  try {
    console.log("Generating template...");
    const res = await fetch(`${BACKEND_URL}/database/generatePointsForm`, { method: "POST" });
    console.log(res);

    if (!res.ok) {
      alert("Failed to generate template!");
      return;
    }

    const blob = await res.blob(); // get file as blob
    console.log(blob);
    const url = window.URL.createObjectURL(blob);

    // Create a hidden download link
    const a = document.createElement("a");
    a.href = url;
    a.download = "points_template.csv"; // filename for user
    document.body.appendChild(a);
    a.click(); // trigger download
    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    alert(`Error generating template. Please contact ${MAINTAINER_EMAIL} for assistance.`);
    console.error(err);
  }
});
