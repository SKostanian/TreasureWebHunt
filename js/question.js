
const questionElement = document.getElementById("Question-text");

function getQuestion() {
    let sessionID = getCookie("sessionID");

    // Assuming you're making a GET request to fetch the JSON response
    fetch(`https://codecyprus.org/th/api/question?session=${sessionID}`)
        .then(response => response.json())
        .then(jsonData => {
            console.log(jsonData);
            if (jsonData.status === "OK") {
                // Access the "questionText" field from the parsed JSON
                let questionText = jsonData.questionText;
                questionElement.innerHTML = questionText;
                console.log(questionElement)
            }


            // Now you can use the questionText variable as needed
        })
        .catch(error => console.error('Error fetching data:', error));
}

getQuestion()

const answerElement = document.getElementById("answerInputField");
function answer() {
    //TODO - Read value from the input field.
    const answer = answerElement.value;
    let sessionID = getCookie("sessionID");

    fetch(`https://codecyprus.org/th/api/answer?session=${sessionID}&answer=${answer}`)
        .then(response => response.json())
        .then(jsonData => {
            answerElement.value = "";
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
            }


            // Now you can use the questionText variable as needed
        })
        .catch(error => console.error('Error fetching data:', error));
}