let startButton = document.getElementById("start-button");

localStorage.setItem("ninjaPrototypeMode", "false");

let highScore = localStorage.getItem("ninjaHighScore") || 0;

document.getElementById("high-score").innerText = "High Score: " + highScore;

startButton.addEventListener("mousedown", () => {

    window.location.href = "game.html";

});

let checkbox = document.getElementById("prototype");

checkbox.addEventListener("change", () => {

    if (checkbox.checked) {
        localStorage.setItem("ninjaPrototypeMode", "true");
    } else {
        localStorage.setItem("ninjaPrototypeMode", "false");
    }
});