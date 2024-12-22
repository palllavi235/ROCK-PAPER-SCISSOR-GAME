let useris = 0;
let compis = 0;
let moveCount = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.getElementById("msg");
const userscore = document.querySelector("#useris");
const computerscore = document.querySelector("#compis");
const moveCountDisplay = document.getElementById("moveCount");
const startButton = document.getElementById("startGame");
const endRoundButton = document.getElementById("endRound");
const restartButton = document.getElementById("restartGame");
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");

const computerchoice = () => {
    const options = ["ROCK", "PAPER", "SCISSOR"];
    const compId = Math.floor(Math.random() * 3);
    return options[compId];
};

const winner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        useris++;
        userscore.innerText = useris;
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compis++;
        computerscore.innerText = compis;
        msg.innerText = `You lose! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
};

const drawGame = () => {
    msg.innerText = "Game was a draw! Try again.";
    msg.style.backgroundColor = "yellow";
};

const playgame = (userChoice) => {
    if (moveCount >= 15) {
        endRoundButton.style.display = "inline-block";
        return;
    }

    const compChoice = computerchoice();

    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = false;
        if (
            (userChoice === "ROCK" && compChoice === "SCISSOR") ||
            (userChoice === "PAPER" && compChoice === "ROCK") ||
            (userChoice === "SCISSOR" && compChoice === "PAPER")
        ) {
            userWin = true;
        }
        winner(userWin, userChoice, compChoice);
    }

    moveCount++;
    moveCountDisplay.innerText = `${moveCount}/15`; // Update the move count display
    console.log(`Move ${moveCount}/15`);
};

const showPage = (pageId) => {
    [page1, page2, page3].forEach((page) => page.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");
};

const triggerCelebration = () => {
    const celebrationContainer = document.getElementById('celebration');
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');
        celebrationContainer.appendChild(confetti);
    }
};

const displayFinalResult = () => {
    const resultMessage =
        useris > compis
            ? "You are the Champion! 🎉"
            : useris < compis
            ? "Computer Wins! Better luck next time. 🤖"
            : "It's a Tie! 🤝";

    document.getElementById('finalResult').innerText = resultMessage;
    document.getElementById('scoreSummary').innerText = `Final Scores - You: ${useris}, Computer: ${compis}`;
    triggerCelebration();
};

startButton.addEventListener("click", () => {
    showPage("page2");
});

endRoundButton.addEventListener("click", () => {
    showPage("page3");
    displayFinalResult();
});

restartButton.addEventListener("click", () => {
    useris = 0;
    compis = 0;
    moveCount = 0;
    userscore.innerText = useris;
    computerscore.innerText = compis;
    moveCountDisplay.innerText = `${moveCount}/15`; // Reset the move count
    showPage("page2");
});

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playgame(userChoice);
    });
});
