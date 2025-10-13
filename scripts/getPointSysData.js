// This script is used in pointSys.html to fetch user point data from the backend
// and populate the HTML table with the retrieved data.

import { BACKEND_URL } from "./../config/config.js";

fetch(`${BACKEND_URL}/database/pointSys`)
    .then(res => {
        console.log(res);
        return res.json();
    })
    .then(users => {
        console.log(users);
        const tbody = document.querySelector("#user-table tbody");
        tbody.innerHTML = "";
        users.forEach(user => {
            const row = `<tr>
                            <td>${user.name}</td>
                            <td>${user.unique_name}</td>
                            <td>${user.point}</td>
                        </tr>`;
            tbody.insertAdjacentHTML("beforeend", row);
        });
    });