document.onmousemove = function(e) {
    var x = e.clientX;
    var y = e.clientY;
    document.getElementById('crosshairX').style.top = y + 'px';
    document.getElementById('crosshairY').style.left = x + 'px';
    document.getElementById('mouseCoordinates').textContent = 'X: ' + x + ', Y: ' + y;
};

// Fetch IP and Location
fetch('https://api.iplocation.net/?ip=')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.response_code === "200") {
            document.getElementById('ipInfo').textContent = `IP: ${data.ip} - Location: ${data.country_name}`;       
        } else {
            throw new Error(`API Error: ${data.response_message}`);
        }
    })
    .catch(err => {
        console.error('Error:', err);
        document.getElementById('ipInfo').textContent = `Error fetching IP location data`;
    });
    