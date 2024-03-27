// Getting the id from the unordered list
const treasureHuntElement = document.getElementById("TreasureHunts");

// Using async fetch function to retrieve JSON data from the API
async function callApi(name) {
    fetch("https://codecyprus.org/th/api/list")
        .then(value => value.json())
        .then((jsonObject) => {
            // And if the JSONObject.status is OK
            if (jsonObject.status === "OK"){
                const treasureHunts = jsonObject.treasureHunts;
                // then loop through the treasureHunts list
                for (let i = 0; i < treasureHunts.length; i++) {
                    const item = treasureHunts[i];
                    const {startsOn} = item;
                    const isActive = new Date() > new Date(startsOn);
                    const classButton = isActive ? "button-primary" : "button-disable";
                    const buttonLink = isActive ? `href="start.html?treasure-hunt-id=${item.uuid}" target="_blank"` : "";
                    // Using the template literals and string interpolation to iterate through the treasureHunts names and uuid (as uuid is different for each treasure hunt)
                    const listItem = `<a class="link-reset" ${buttonLink}>
                        <li class="${classButton}">${item.name}</li></a>`
                    treasureHuntElement.innerHTML += listItem;
                    // source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
                }
            }
        });
}

function getTreasureHuntId(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Access the "questionText" field from the parsed JSON
            const session = data.session;
            console.log("Session:" + session);
            getQuestion(session);
            // Now you can use the questionText variable as needed
        })
        .catch(error => console.error('Error fetching data:', error));
}


callApi();