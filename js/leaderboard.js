function loadLeaderboard(){
    //urlsearch constructor with API parameters
    const url = "https://codecyprus.org/th/api/leaderboard?" + new URLSearchParams({
        session: getCookie("sessionID"),
        sorted: true,
        limit: 20
    })
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.status === "OK"){
                console.log(data);
                const leaderboard = document.querySelector("#leaderboard tbody");
                const textPrize = document.querySelector("h2");

                const players = data.leaderboard;
                const prize = data.hasPrize;

                textPrize.textContent = prize ? "You Won! Congratulations!" : "You did not win! Try again!";

                for (let playerRow of players){
                    const row = document.createElement("tr");
                    const player = document.createElement("td");
                    const time = document.createElement("td");
                    const score = document.createElement("td");
                    player.textContent = String(playerRow.player).substring(0,10);
                    const date = playerRow.completionTime ? new Date(playerRow.completionTime) : null;
                    time.textContent = date ? date.toLocaleString("en-CA", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                    })
                    : "-";
                    score.textContent = playerRow.score;
                    row.appendChild(player);
                    row.appendChild(time);
                    row.appendChild(score);
                    leaderboard.appendChild(row);
                }

            }
            else {
                alert("Failed to load the leaderboard");
            }
        })

        .catch(error => {
            console.error(error)
            alert("Failed to load the leaderboard");
        })

}

window.onload = function (){
    loadLeaderboard();
}