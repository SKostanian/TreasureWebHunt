
const questionElement = document.getElementById("Question-text");

function getQuestion() {
    let sessionID = getCookie("sessionID");
    getScore();
    const answerContainer = document.querySelector('.answer_container');
    const skipButton = answerContainer.querySelector('input[type="button"][value="Skip"]');
    if (skipButton) {

        answerContainer.removeChild(skipButton);
    } else {
        console.log('Skip button not found.');
    }

    const answerInputField = answerContainer.querySelector('#answerInputField');
    const submitButton = answerContainer.querySelector('input[type="button"][value="Submit"]');
    if (answerInputField && submitButton) {

        answerContainer.removeChild(answerInputField);
        answerContainer.removeChild(submitButton);
    } else {
        console.log('Input field or submit button not found.');
    }

    const button1 = answerContainer.querySelector('input[value="True"]');
    const button2 = answerContainer.querySelector('input[value="False"]');
    if (button1 && button2) {

        answerContainer.removeChild(button1);
        answerContainer.removeChild(button2);
    } else {
        console.log('Buttons not found.');
    }

    const buttonA = answerContainer.querySelector('input[value="A"]');
    const buttonB = answerContainer.querySelector('input[value="B"]');
    const buttonC = answerContainer.querySelector('input[value="C"]');
    const buttonD = answerContainer.querySelector('input[value="D"]');
    if (buttonA && buttonB) {

        answerContainer.removeChild(buttonA);
        answerContainer.removeChild(buttonB);
        answerContainer.removeChild(buttonC);
        answerContainer.removeChild(buttonD);
    } else {
        console.log('Buttons not found.');
    }

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
                if (jsonData.canBeSkipped)
                {
                    const answerContainer = document.querySelector('.answer_container');
                    const skipButton = document.createElement('input');
                    skipButton.type = 'button';
                    skipButton.value = 'Skip';
                    skipButton.onclick = skip;
                    answerContainer.appendChild(skipButton);
                }
                if (jsonData.questionType == "BOOLEAN"){
                    console.log("bool");
                    const answerContainer = document.querySelector('.answer_container');
                    const button1 = document.createElement('input');
                    button1.type = 'button'; // Set the button text
                    button1.value = "True";
                    button1.onclick = function () {
                        static_answer("true");
                    };
                    const button2 = document.createElement('input');
                    button2.type = 'button'; // Set the button text
                    button2.value = "False";
                    button2.onclick = function () {
                        static_answer("false");
                    };
                    answerContainer.appendChild(button1);
                    answerContainer.appendChild(button2);
                }

                if (jsonData.questionType == "INTEGER" || jsonData.questionType == "TEXT") {
                    const answerContainer = document.querySelector('.answer_container');
                    const answerInputField = document.createElement('input');
                    answerInputField.type = 'text';
                    answerInputField.id = 'answerInputField';
                    const submitButton = document.createElement('input');
                    submitButton.type = 'button';
                    submitButton.value = 'Submit';
                    submitButton.onclick = answer;
                    answerContainer.appendChild(answerInputField);
                    answerContainer.appendChild(submitButton);
                }
                if (jsonData.questionType == "MCQ") {
                    const answerContainer = document.querySelector('.answer_container');
                    const buttonA = document.createElement('input');
                    buttonA.type = "button";
                    buttonA.value = "A";
                    buttonA.onclick = function () {
                        static_answer("A");
                    }
                    answerContainer.appendChild(buttonA);

                    const buttonB = document.createElement('input');
                    buttonB.type = "button";
                    buttonB.value = "B";
                    buttonB.onclick = function () {
                        static_answer("B");
                    }
                    answerContainer.appendChild(buttonB);

                    const buttonC = document.createElement('input');
                    buttonC.type = "button";
                    buttonC.value = "C";
                    buttonC.onclick = function () {
                        static_answer("C");
                    }
                    answerContainer.appendChild(buttonC);

                    const buttonD = document.createElement('input');
                    buttonD.type = "button";
                    buttonD.value = "D";
                    buttonD.onclick = function () {
                        static_answer("D");
                    }
                    answerContainer.appendChild(buttonD);
                }
                if (jsonData.requiresLocation){

                }

            }


            // Now you can use the questionText variable as needed
        })
        .catch(error => console.error('Error fetching data:', error));
}

getQuestion()


function answer() {
    const answerElement = document.getElementById("answerInputField");
    //TODO - Read value from the input field.
    const answer = answerElement.value;
    let sessionID = getCookie("sessionID");

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

    //TODO - Read value from the input field.

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

function skip() {

    const iSskip = confirm("Are you sure to skip?");
    if (!iSskip) return;
    let sessionID = getCookie("sessionID");

    fetch(`https://codecyprus.org/th/api/skip?session=${sessionID}`)
        .then(response => response.json())
        .then(jsonData => {

            console.log(sessionID);

            console.log(jsonData);
            if (jsonData.status === "OK") {

                if (jsonData.completed) {
                    location.href = "leaderboard.html";
                }
                else {
                    alert(jsonData.message);
                    getQuestion();
                }

            }


            // Now you can use the questionText variable as needed
        })
        .catch(error => console.error('Error fetching data:', error));
}

function getScore() {
    let sessionID = getCookie("sessionID");

    fetch(`https://codecyprus.org/th/api/score?session=${sessionID}`)
        .then(response => response.json())
        .then(jsonData => {

            console.log(sessionID);

            console.log(jsonData);
            if (jsonData.status === "OK") {

                if (jsonData.completed) {
                    location.href = "leaderboard.html";
                }

                if (jsonData.score) {
                    const pScoreElement = document.querySelector('.p_score');
                    if (pScoreElement) {
                        // Update the text content of the element
                        pScoreElement.textContent = jsonData.score;
                    }

                }


            }


            // Now you can use the questionText variable as needed
        })
        .catch(error => console.error('Error fetching data:', error));
}