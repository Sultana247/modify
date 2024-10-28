document.addEventListener("DOMContentLoaded", function() {
    // Function to update the time every second
    function updateTime() {
        const timeElement = document.getElementById("real-time");
        const now = new Date();
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const day = dayNames[now.getDay()];
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        timeElement.textContent = `${day}, ${hours}:${minutes}:${seconds}`;
    }

    setInterval(updateTime, 1000); // Update the time every second
    updateTime(); // Set initial time on page load

    // Event listener to fetch DID data
    document.getElementById('fetchDIDBtn').addEventListener('click', fetchDIDData);
});

async function fetchDIDData() {
    const url = 'http://localhost:3001/https://portal.klozer.io/api/portal/did'; // Using local CORS proxy

    const username = 'office@klozer.io'; // Replace with actual ID
    const password = '14Klozer#786'; // Replace with actual password
    const encodedCredentials = btoa(`${username}:${password}`); // Encode credentials

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + encodedCredentials,
                'Content-Type': 'application/json'
            }
        });

        const text = await response.text(); // Read response as text

        if (!response.ok) {
            console.error('Response Error:', text); // Log the HTML response if not okay
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = JSON.parse(text); // Parse the response to JSON
        displayData(data);
    } catch (error) {
        console.error('Error fetching DID list:', error);
    }
}



function displayData(data) {
    const displayArea = document.getElementById('didTableBody');
    displayArea.innerHTML = ''; // Clear any previous data

    data.forEach(item => {
        const row = `
            <tr>
                <td><input type="checkbox"></td>
                <td>${item.id || ''}</td>
                <td>${item.did || ''}</td>
                <td>${item.customer_card_id || ''}</td>
                <td>${item.destination || ''}</td>
                <td>${item.destination_type || ''}</td>
                <td>${item.destination2 || ''}</td>
                <td>${item.destination2_type || ''}</td>
                <td>${item.destination3 || ''}</td>
                <td>${item.destination3_type || ''}</td>
                <td>${item.retail || ''}</td>
                <td>${(item.tags || []).join(', ')}</td>
                <td>${JSON.stringify(item.rtp_codec || {})}</td>
                <td>${(item.timeout || []).join(', ')}</td>
                <td>${(item.flags || []).join(', ')}</td>
            </tr>
        `;
        displayArea.insertAdjacentHTML('beforeend', row); // Insert new row
    });
}
