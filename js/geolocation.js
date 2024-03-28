let timerId = null;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updateLocation);
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

let sessionID = getCookie("sessionID");

// UpdateLocation function which retrieves the location api call
function updateLocation(position){
    fetch(`https://codecyprus.org/th/api/location?session=${sessionID}&latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`)
        .then(response => response.json())
        .then(jsonData => {
            if (jsonData.status === "OK") {
            }
        })
}

// Set interval to 30 seconds to update the geolocation
window.onload = function (){
    getLocation();
    if (timerId){
        clearInterval(timerId);
    }
    timerId = setInterval(getLocation, 30000);
}