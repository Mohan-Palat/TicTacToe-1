let currentTurn = 1;

const player1 = {
    name: 'Player 1',
    character: 'X'
}

const player2 = {
    name: 'Player 2',
    character: 'O'
}

init()

function init() {
    //add listener to 'New game button'
    document.querySelector('.new-game-btn')
    .addEventListener('click', createNewGame)

    //add listeners to buttons on grid
    buttons = document.querySelectorAll('.button')
    buttons.forEach(button => {
        button.addEventListener('click', selectSquare)
    });
}
function createNewGame(event) {
    event.preventDefault()
    const board = document.querySelector('.board')
    if (board.style.display === "") {
        board.style.display = "block"
    } else {
        board.style.display = ""
    }
    displayPlayerTurn();
}

function selectSquare(event) {
    let currentPlayer = checkPlayersTurn()
    if (!checkIfButtonSelected(event)) {
        event.target.innerHTML = currentPlayer.character
        currentPlayer.currentTurn = false;
        event.target.value = "selected"
        changePlayersTurn()
        displayPlayerTurn()
    } else {
        alert("This Box was already chosen!! \nPlease Try Again")
    }
}

function checkPlayersTurn() {
    if(currentTurn === 1) {
        return player1
    } else {
        return player2
    }
}
function changePlayersTurn() {
    if(currentTurn === 1) {
        currentTurn = 0;
    } else {
        currentTurn = 1;
    }
}
function displayPlayerTurn() {
    const currentPlayer = checkPlayersTurn()
    document.querySelector('.turnDisplay')
    .innerHTML = currentPlayer.name + "'s Turn <br> You Are " + currentPlayer.character + "'s"
}

function checkIfButtonSelected(event) {
    if (event.target.value === "selected") {
        return true;
    } else {
        false;
    }
}