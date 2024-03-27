
function answer() {
    const answerElement = document.getElementById("answerInputField");
    let sessionID = getCookie("sessionID");

    const answer = String(answerElement.value).trim();
    if (!answer){
        return alert("Input an answer!");
    }

    fetch(`https://codecyprus.org/th/api/answer?session=${sessionID}&answer=${answer}`)
        .then(response => response.json())
        .then(jsonData => {
            answerElement.value = "";
            console.log(sessionID);
            console.log(jsonData.canBeSkipped);
            console.log(jsonData);
            if (jsonData.status === "OK") {

                if (jsonData.completed) {
                    //TODO - Move to the leaderboard.
                    alert("TODO - Move to the leaderboard")
                }

                if (jsonData.correct) {
                    alert(jsonData.message);
                    getQuestion();
                }
                else {
                    alert(jsonData.message);
                }
                if (jsonData.canBeSkipped) {
                    alert(jsonData.canBeSkipped);
                }
            }


            // Now you can use the questionText variable as needed
        })
        .catch(error => console.error('Error fetching data:', error));
}

function static_answer(answer) {

    let sessionID = getCookie("sessionID");

    fetch(`https://codecyprus.org/th/api/answer?session=${sessionID}&answer=${answer}`)
        .then(response => response.json())
        .then(jsonData => {

            console.log(sessionID);
            console.log(jsonData.canBeSkipped);
            console.log(jsonData);
            if (jsonData.status === "OK") {

                if (jsonData.completed) {
                    //TODO - Move to the leaderboard.
                    alert("TODO - Move to the leaderboard")
                }

                if (jsonData.correct) {
                    alert(jsonData.message);
                    getQuestion();
                }
                else {
                    alert(jsonData.message);
                }
                if (jsonData.canBeSkipped) {
                    alert(jsonData.canBeSkipped);
                }
            }


            // Now you can use the questionText variable as needed
        })
        .catch(error => console.error('Error fetching data:', error));
}