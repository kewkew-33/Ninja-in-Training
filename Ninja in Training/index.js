let startButton = document.getElementById("start-button");

let highScore = localStorage.getItem("ninjaHighScore") || 0;

document.getElementById("high-score").innerText = "High Score: " + highScore;

startButton.addEventListener("click", () => {

    startButton.disabled = true;
    window.location.href = "game.html";

});