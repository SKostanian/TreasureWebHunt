const visitorNameElement = document.getElementById("visitor_name");

function start() {
    let playerName = visitorNameElement.value;
    const appName = "Group-B1-App";
    const params = new URLSearchParams(location.search);
    let treasureHuntID = params.get("treasure-hunt-id");
    fetch(`https://codecyprus.org/th/api/start?player=${playerName}&app=${appName}&treasure-hunt-id=${treasureHuntID}`)
        .then(response => response.json())
        .then(jsonObject => {
            console.log(jsonObject);
            if (jsonObject.status === "OK") {
                let sessionID = jsonObject.session;
                setCookie("sessionID", sessionID);
                location.href = "question.html";
            }
            else {
                alert(jsonObject.errorMessages);
            }
        });
}