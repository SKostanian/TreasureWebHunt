let timerId = null;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updateLocation);
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

// function showPosition(position) {
//     alert("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
// }
let sessionID = getCookie("sessionID");

// updateLocation function
function updateLocation(position){
    fetch(`https://codecyprus.org/th/api/location?session=${sessionID}&latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`)
        .then(response => response.json())
        .then(jsonData => {
            if (jsonData.status === "OK") {
                // setInterval(getLocation, 30000);
            }
        })
}

window.onload = function (){
    getLocation();
    if (timerId){
        clearInterval(timerId);
    }
    timerId = setInterval(getLocation, 30000);
}