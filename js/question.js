
const questionElement = document.getElementById("Question-text");

function getQuestion() {
    let sessionID = getCookie("sessionID");

    // Assuming you're making a GET request to fetch the JSON response
    fetch(`https://codecyprus.org/th/api/question?session=${sessionID}`)
        .then(response => response.json())
        .then(jsonData => {
            console.log(jsonData);
            if (jsonData.status === "OK") {
                let questionText = jsonData.questionText;
                questionElement.innerHTML = questionText;
                console.log(questionElement)
            }
            // Access the "questionText" field from the parsed JSON
            // const questionText = data.questionText;
            // console.log(questionText);
            // document.getElementById("p_question").innerHTML = questionText;

            // Now you can use the questionText variable as needed
        })
        .catch(error => console.error('Error fetching data:', error));
}

getQuestion()