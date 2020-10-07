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
        event.target.value = currentPlayer.character
        checkForWinner()
        changePlayersTurn()
        displayPlayerTurn()
    } else {
        alert("This Box was already chosen!! \nPlease Choose Another Box")
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
    if (event.target.value == 'X' || event.target.value == 'O') {
        return true;
    } else {
        false;
    }
}

function displayWinner(winningCharacter = 0) {
    if(winningCharacter === player1.character) {
        console.log(player1.name + " is the winner!");
    } else if(winningCharacter === player2.character) {
        console.log(player2.name + " is the winner!");
    } else {
        console.log("The Game is a Tie!!");
    }

}
function checkIfArrayComplete(valueArray) {
    let count = 0;
    valueArray.forEach(element => {
        if (element === 'O' || element === 'X') {
            count = count + 1;
        }
    })
    return count
}
function checkForWinner() {
    buttons = document.querySelectorAll('.button')
    let valueArray = []
    buttons.forEach( (button) => {
       valueArray.push(button.value)
    })
    console.log(valueArray);
    //======= horizontal matches
    if(valueArray[0] === valueArray[1] && 
        valueArray[1] === valueArray[2] && 
        valueArray[0] === valueArray[2] ) {
        displayWinner(valueArray[0])
    } else if(valueArray[3] === valueArray[4] && 
        valueArray[4] === valueArray[5] && 
        valueArray[3] === valueArray[5] ) {
        displayWinner(valueArray[3])
    } else if(valueArray[6] === valueArray[7] && 
        valueArray[8] === valueArray[9] && 
        valueArray[6] === valueArray[9] ) {
        displayWinner(valueArray[6])
    //====== vertical matches
    } else if(valueArray[0] === valueArray[3] && 
        valueArray[3] === valueArray[6] && 
        valueArray[0] === valueArray[6] ) {
        displayWinner(valueArray[0])
    } else if(valueArray[1] === valueArray[4] && 
        valueArray[4] === valueArray[7] && 
        valueArray[1] === valueArray[7] ) {
        displayWinner(valueArray[1])
    } else if(valueArray[2] === valueArray[5] && 
        valueArray[5] === valueArray[8] && 
        valueArray[2] === valueArray[8] ) {
        displayWinner(valueArray[1])
    }
    //===== diagonal matches 
    else if(valueArray[0] === valueArray[4] && 
        valueArray[4] === valueArray[8] && 
        valueArray[0] === valueArray[8] ) {
        displayWinner(valueArray[0])
    } else if(valueArray[2] === valueArray[4] && 
        valueArray[4] === valueArray[6] && 
        valueArray[2] === valueArray[6] ) {
        displayWinner(valueArray[2])
    } else {
        let count = checkIfArrayComplete(valueArray)
        if (count === 9) {
            displayWinner()
        }
    }
    //===== horizontal winners
    // index 0, 1, 2 match - done
    // index 3, 4, 5 match - done
    // index 6, 7, 8 match - done
    //===== vertical winners
    // index 0, 3, 6 match - done
    // index 1, 4, 7 match - done 
    // index 2, 5, 8 match - done 
    //===== diagonal winners
    // index 0, 4, 8 match - done
    // index 2, 4, 6 match - done
}