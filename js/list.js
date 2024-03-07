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
                    // Using the template literals and string interpolation to iterate through the treasureHunts names and uuid (as uuid is different for each treasure hunt)
                    const listItem = `<a href="https://codecyprus.org/th/api/start?player=${name}&app=SpartakDogushTeamApp&treasure-hunt-id=${item.uuid}" target="_blank">
                        <li class="list${i + 1}">${item.name}</li></a>`
                    treasureHuntElement.innerHTML += listItem;
                    // source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
                }
            }
        });
}


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
        if (HasName)
        {
            const linkElement = event.target.closest('a[href]');

            // Check if such an element exists
            if (linkElement) {
                // Get the href attribute of the closest <a> element
                const link = linkElement.getAttribute('href');
                clickedLink = link;
                getTreasureHuntId(link);
                // Now you have the link stored in the variable 'link'
                // You can use it as needed, for example, displaying it in an alert:
                console.log("Clicked link: " + link);
            }

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
        else
        {
            alert("Fill in your name please");
            event.preventDefault();
        }

    }
});


function updateLinks(name) {
    const links = treasureHuntElement.querySelectorAll('a'); // Select all anchor tags within treasureHuntElement
    links.forEach(link => {
        const href = link.getAttribute('href'); // Get the href attribute value
        const updatedHref = href.replace(/player=[^&]*/, 'player=' + encodeURIComponent(name)); // Replace the player parameter value with the new name
        link.setAttribute('href', updatedHref); // Set the updated href attribute value
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


var visitorName = "";
var HasName = false;
var clickedLink = "";
function submitName() {
    visitorName = document.getElementById("visitor_name").value;
    alert("Thank you, " + visitorName + ", for submitting your name!");
    HasName = true;
    updateLinks(visitorName);
}

callApi(visitorName);



function getQuestion(session) {
    // Assuming you're making a GET request to fetch the JSON response
    fetch(`https://codecyprus.org/th/api/question?session=${session}`)
        .then(response => response.json())
        .then(data => {
            // Access the "questionText" field from the parsed JSON
            const questionText = data.questionText;
            console.log(questionText);
            document.getElementById("p_question").innerHTML = questionText;
            // Now you can use the questionText variable as needed
        })
        .catch(error => console.error('Error fetching data:', error));

}