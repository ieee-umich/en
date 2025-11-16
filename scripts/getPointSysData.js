// This script is used in pointSys.html to fetch user point data from the backend
// and populate the HTML table with the retrieved data.

import { BACKEND_URL } from "./../config/config.js";

fetch(`${BACKEND_URL}/database/pointSys`)
    .then(res => res.json())
    .then(users => {
        // 排序
        users.sort((a, b) => b.point - a.point);

        // --- Point Lookup by Form ---
        const form = document.getElementById("pointForm");
        form.addEventListener("submit", e => {
            e.preventDefault();

            const uniqueName = document.getElementById("unique_name").value.trim();
            const user = users.find(u => u.unique_name === uniqueName);

            const resultDiv = document.getElementById("pointResult");

            if (user) {
                resultDiv.innerHTML = `Your point: <strong>${user.point}</strong>`;
            } else {
                resultDiv.innerHTML = `User not found`;
            }
        });

        // --- Ranking Table (Top 5) ---
        const top5 = users.slice(0, 5);

        const tbody = document.querySelector("#user-table tbody");
        tbody.innerHTML = "";

        top5.forEach(user => {
            const row = `<tr>
                            <td>${user.name}</td>
                            <td>${user.unique_name}</td>
                            <td>${user.point}</td>
                        </tr>`;
            tbody.insertAdjacentHTML("beforeend", row);
        });
    });