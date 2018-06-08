let cards = ['fa fa-facebook fa-4x rotated hide', 'fa fa-facebook fa-4x rotated hide', 'fa fa-google fa-4x rotated hide', 'fa fa-google fa-4x rotated hide', 'fa fa-apple fa-4x rotated hide', 'fa fa-apple fa-4x rotated hide', 'fa fa-github fa-4x rotated hide', 'fa fa-github fa-4x rotated hide', 'fa fa-codepen fa-4x rotated hide', 'fa fa-codepen fa-4x rotated hide', 'fa fa-slack fa-4x rotated hide', 'fa fa-slack fa-4x rotated hide', 'fa fa-twitter fa-4x rotated hide', 'fa fa-twitter fa-4x rotated hide', 'fa fa-free-code-camp fa-4x rotated hide', 'fa fa-free-code-camp fa-4x rotated hide'];
let openCards = [];
let moves = 0;
let match = 0;
let mins = 0, secs = 0;
let timer, timeOut;
let currentTime;
let gameBoard = document.getElementById('game');
let moveDisplay = document.getElementById('moves');
let start = document.getElementById('start');
let restart = document.getElementById('reset');
let playAgain = document.getElementById('playAgain');
let result = document.getElementById('result');
let totalMoves = document.getElementById('totalMoves');
let timeTaken = document.getElementById('timeTaken');
let stars = document.getElementsByClassName('fa fa-star');
let leader = document.getElementById('leader');
let clearLeader = document.getElementById('clearLeader');
let localValue, localData;

clearLeader.addEventListener('click', function () {
    window.localStorage.removeItem('Leader')
    leader.innerHTML = 'Cleared';
});

restart.addEventListener('click', restartGame);
playAgain.addEventListener('click', function () {
    result.style.display = 'none';
    restartGame()
});

let allCards = gameBoard.children;
start.addEventListener('click', gameInit);

// Initialize the Game
function gameInit() {
    clearOpenCards();
    startCount();
    start.style.pointerEvents = 'none';

    for (let i = 0; i < allCards.length; i++) {
        allCards[i].innerHTML = '';
    }

    let shuffledCards = shuffle(cards);

    for (let i = 0; i < allCards.length; i++) {
        let iconNode = document.createElement('I');
        iconNode.setAttribute('class', shuffledCards[i]);
        allCards[i].appendChild(iconNode);
    }

    gameStart();

// Start the Game

    function gameStart() {
        let allIcons = document.getElementsByClassName('card')
        for (let j = 0; j < allIcons.length; j++) {
            allIcons[j].onclick = function () {
                cardOpen(allIcons[j].childNodes[0]);
            }
        }

    }

// Open Clicked Card
    function cardOpen(currentIcon) {
        if (openCards.length === 0) {
            currentIcon.parentNode.style.transform = 'rotateY(180deg)';
            currentIcon.classList.remove('hide');
            currentIcon.parentNode.style.pointerEvents = 'none';

            addToOpen(currentIcon);
        }
        else if (openCards.length === 1) {
            currentIcon.parentNode.style.transform = 'rotateY(180deg)';
            currentIcon.classList.remove('hide');
            addToOpen(currentIcon);
            timeOut = setTimeout(compareOpenCards, 500);
        }


    }

// Add card to Opened card List
    function addToOpen(currentIcon) {
        openCards.push(currentIcon)
    }

// Check if both cards are same or not
    function compareOpenCards() {
        moveCounter();
        if (openCards[0].className === openCards[1].className) {
            matchCounter();
            lockCards();
        }
        else {
            restoreCards();
        }
    }

// Lock Matched cards
    function lockCards() {
        openCards[0].classList.add('match');
        openCards[0].classList.remove('rotated');
        openCards[0].parentNode.style.pointerEvents = 'none';
        openCards[0].parentNode.style.transform = 'rotateY(0deg)';
        openCards[0].parentNode.classList.add('cardMatch');
        openCards[0].parentNode.classList.add('match-animation');
        openCards[1].classList.remove('rotated');
        openCards[1].classList.add('match');
        openCards[1].parentNode.style.transform = 'rotateY(0deg)';
        openCards[1].parentNode.style.pointerEvents = 'none';
        openCards[1].parentNode.classList.add('cardMatch');
        openCards[1].parentNode.classList.add('match-animation');
        clearOpenCards();
    }

// Restore unmatched cards to their previous state
    function restoreCards() {
        openCards[0].classList.add('hide');
        openCards[0].parentNode.style.transform = '';
        openCards[0].parentNode.style.pointerEvents = '';
        openCards[1].classList.add('hide');
        openCards[1].parentNode.style.transform = '';
        clearOpenCards();
    }

// Clear opened cards list
    function clearOpenCards() {
        openCards = [];
    }

// Count the moves
    function moveCounter() {
        moves++;
        if (moves > 16 && moves <= 20) {
            stars[2].style.color = 'gray'
        }
        else if (moves > 20) {
            stars[1].style.color = 'gray'
        }
        moveDisplay.innerHTML = moves;
    }

// Matched pair counter
    function matchCounter() {
        match++;
        console.log(match);
        if (match === 8) {
            clearInterval(timer);
            displayResult();
        }
    }

// Open modal when user wins
    function displayResult() {
        localValue = saveToLocal(moves);
        result.style.display = 'flex';
        totalMoves.innerHTML = 'Total moves : ' + moves;
        timeTaken.innerHTML = 'Time : ' + currentTime;
        if (localValue === null) {
            leader.innerHTML = 'Leader : ' + moves + ' moves.'
        }
        else {
            leader.innerHTML = 'Leader : ' + localValue + ' moves.'
        }
    }

// Timer initialization
    function startCount() {
        timer = setInterval(count, 1000);
    }

    function count() {
        let time = document.getElementById("time");

        secs++;
        if (secs === 60) {
            secs = 0;
            mins = mins + 1;
        }
        if (mins === 60) {
            mins = 0;
        }

        time.innerHTML = timeFormat(mins) + ":" + timeFormat(secs);
        currentTime = timeFormat(mins) + ":" + timeFormat(secs);

    }

    function timeFormat(digit) {

        let digits = digit + '';
        if (digit < 10) {
            digits = "0" + digits;
        }
        return digits;
    }
}

// Shuffle the cards
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Restart game
function restartGame() {
    moves = 0;
    match = 0;
    mins = 0;
    secs = 0;
    moveDisplay.innerHTML = '0';
    stars[1].style.color = 'white';
    stars[2].style.color = 'white';
    clearInterval(timer);
    clearTimeout(timeOut);
    for (let a = 0; a < allCards.length; a++) {
        allCards[a].style = null;
        allCards[a].classList.remove('cardMatch');
        allCards[a].classList.remove('match-animation');

    }
    gameInit();
}

function saveToLocal(moves) {
    localData = window.localStorage.getItem("Leader");
    console.log(localData);
    if (localData > moves || localData === null) {
        window.localStorage.setItem("Leader", moves);
    }
    console.log(localData);
    return localData;
}
