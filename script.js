let gameBoard = document.querySelector("#gameBoard");
let restartButton = document.querySelector("#restartButton");
let difficulty = document.querySelector("#difficulty");
let selectedValue = difficulty.value;
let time = document.querySelector(".time");
var arr;
let matchedPairs = 0;
let eventDate;
let interval;

function createCard() {
    let openedCard = [];
    matchedPairs = 0;
    shuffleArray(arr);
    gameBoard.innerHTML = "";

    arr.forEach((emoji) => {
        const cardContainer = document.createElement("div");
        const card = document.createElement("div");
        cardContainer.classList.add("card");
        card.innerHTML = emoji;
        cardContainer.appendChild(card);
        gameBoard.appendChild(cardContainer);
        card.style.opacity = 0;

        const handleClick = () => {
            if (openedCard.length >= 2 || card.style.opacity === "1") return;

            card.style.opacity = 1;
            openedCard.push({ card, emoji, cardContainer });

            if (openedCard.length === 2) {
                const [first, second] = openedCard;

                if (first.emoji === second.emoji) {
                    first.cardContainer.classList.add("matched");
                    second.cardContainer.classList.add("matched");
                    openedCard = [];
                    matchedPairs++;

                    if (matchedPairs === arr.length / 2) {
                        clearInterval(interval);
                        setTimeout(() => {
                            alert("Congratulations! You've matched all the cards!");
                            resetGame();
                        }, 400);
                    }
                } else {
                    setTimeout(() => {
                        first.card.style.opacity = 0;
                        second.card.style.opacity = 0;
                        openedCard = [];
                    }, 500);
                }
            }
        };

        cardContainer.addEventListener("click", handleClick);
        cardContainer.handleClick = handleClick;
    });
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function resetGame() {
    createCard();

    restartButton.addEventListener("click", () => {
        clearInterval(interval);
        select();
    });
}

function select() {
    clearInterval(interval);
    if (difficulty.value == "easy") {
        eventDate = new Date().getTime() + 3 * 60 * 1000;
        gameBoard.style.gridTemplateColumns = "repeat(4, 100px)";
        arr = ["🍎", "🍏", "🍌", "🍇", "🍉", "🍓", "🍒", "🍍", "🍎", "🍏", "🍌", "🍇", "🍉", "🍓", "🍒", "🍍"];
    } else if (difficulty.value == "medium") {
        gameBoard.style.gridTemplateColumns = "repeat(6, 100px)";
        eventDate = new Date().getTime() + 4 * 60 * 1000;
        arr = [
            "🍎", "🍏", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓",
            "🍒", "🍑", "🥭", "🍎", "🍏", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓",
            "🍒", "🍑", "🥭",
        ];
    } else if (difficulty.value == "hard") {
        gameBoard.style.gridTemplateColumns = "repeat(8, 100px)";
        eventDate = new Date().getTime() + 6 * 60 * 1000;
        arr = [
            "🍎", "🍏", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓",
            "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍎", "🍏", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓",
            "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅",
        ];
    }
    createCard();
    resetGame();
    interval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance > 0) {
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("countdown").textContent = `${minutes}m ${seconds}s`;
    } else {
        clearInterval(interval);
        document.getElementById("countdown").textContent = "Time's up!";
        disableGame();
    }
}

function disableGame() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((cardContainer) => {
        cardContainer.removeEventListener("click", cardContainer.handleClick);
    });
    alert("Time's up! Game over.");
}

difficulty.addEventListener("change", select);

select();
resetGame();
