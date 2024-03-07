// Getting the id from the unordered list
const treasureHuntElement = document.getElementById("TreasureHunts");

// Using async fetch function to retrieve JSON data from the API
fetch("https://codecyprus.org/th/api/list")
    .then(value => value.json())
    .then((jsonObject) => {
        // And if the JSONObject.status is OK
        if (jsonObject.status === "OK"){
            const treasureHunts = jsonObject.treasureHunts;
            // then loop through the treasureHunts list
            for (let i = 0; i < treasureHunts.length; i++) {
                const item = treasureHunts[i];
                // Using the template literals and string interpolation to iterate through the treasureHunts names and uuid (as uuid is different for each treasure hunt)
                const listItem = `<a href="https://codecyprus.org/th/api/start?player=SpartakDogushTeam&app=SpartakDogushTeamApp&treasure-hunt-id=${item.uuid}">
                        <li class="list${i + 1}">${item.name}</li></a>`
                treasureHuntElement.innerHTML += listItem;
                // source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
            }
        }
    });

// Using the addEventListener method instead of a usual function
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
treasureHuntElement.addEventListener('click', function (event){
    // The condition that checks if the element that was clicked on is a <li> tag.
    // source: https://www.w3schools.com/jsref/event_target.asp
    if (event.target.tagName === 'LI'){
        // Class list property
        // source: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
        // I have used this property in conditions as otherwise I was returning the previous alert messages in list2 and list3
        const classList = event.target.classList;
        // source: https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
        if (classList.contains('list1')) {
            alert("Starting treasure hunt: UCLan Cyprus Science Day 2024");
        }
        if (classList.contains('list2')) {
            alert("Starting treasure hunt: Code Cyprus 2024");
        }
        else if (classList.contains('list3')) {
            alert("Starting treasure hunt: Sample treasure hunt");
        }
        else if (classList.contains('list4')) {
            alert("Starting treasure hunt: A future treasure hunt");
        }
    }
});