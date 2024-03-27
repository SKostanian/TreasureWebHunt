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

window.onload = function(){
    const sessionID = getCookie("sessionID");
    if (sessionID){
        // const main = document.querySelector(".main");
        // const button = document.createElement("button");
        // button.textContent
        const result = confirm("We have an unfinished game, do you want to continue?");
        if (result){
            location.href = "question.html";
        }
        else {
            setCookie("sessionID", "");
        }
    }
}