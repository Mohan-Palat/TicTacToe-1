// Create global objects
// Represents the Game, player 1, player 2
let game = {
    turn: 1,
    status: "On",
    boardElement: document.querySelector('.boardForm'),
    board: Array.from(Array(9).keys()),
    scoreBoard: {
        element: document.querySelector('.scoreboard'),
        player1: [0,0,0],
        player2: [0,0,0]
    }
}
let player1 = {
    name: document.querySelector('.player1-name').innerHTML,
    character: document.querySelector('.player1-icon').innerHTML,
}
let player2 = {
    name: document.querySelector('.player2-name').innerHTML,
    character: document.querySelector('.player2-icon').innerHTML,
}
// init function to be ran first
// Adds listeners to elements on page
init()
function init() {
    //add listener to 'New game button'
    document.querySelector('.new-game-btn')
    .addEventListener('click', createNewGame)

    //add listener to 'New game button'
    document.querySelector('.computer-btn')
    .addEventListener('click', createNewGame)

    //add listner to sound button
    document.querySelector('.sound-button')
    .addEventListener('click', enableAudio)

    //add listeners to buttons
    const buttons = document.querySelectorAll('.button')
    buttons.forEach( (button) => { 
        button.addEventListener('click', selectSquare)
    })

    //add update button listeners
    document.querySelector('.update-player-1').addEventListener('click',updatePlayer)
    document.querySelector('.update-player-2').addEventListener('click',updatePlayer)

    //add listener to reset-score button
    document.querySelector('.reset-score').addEventListener('click',resetScore)
}
// function to initalize the game
// updates scoreboard, sets the turn, game status, and sets/resets the game board
function createNewGame(event) {
    if(event != undefined) {
        event.preventDefault()
    }
    game.turn = Math.floor(Math.random() * Math.floor(2))
    game.status = "On"
    retrieveLocalPlayerStorage()
    retrieveLocalGameStorage()
    clearBoardButtons()
    enableBoard()
    updateGameBoard()
    displayPlayerTurn()
}
// function that triggers when a square is selected on the board
// checks players turn, checks square is selected, checks if gamestatus is on
// sets the buttons value on click
// changes turn, displays turn, checks for winner
function selectSquare(event) {
    event.preventDefault();
    const currentPlayer = checkPlayersTurn()
        if (!checkIfButtonSelected(event, currentPlayer) && game.status === "On" ) {
            event.target.innerHTML = currentPlayer.character
            event.target.value = currentPlayer.character
            game.board[event.target.id] = currentPlayer.character
            changePlayersTurn()
            displayPlayerTurn()
            if(checkForWinner(game.board, currentPlayer) === true) {
                displayWinner(currentPlayer.character)
            } else if(checkIfBoardComplete().length === 0) {
                displayWinner()
            }
        } else if (game.status === "Off") {
            alert("The game has ended! Select New Game to play again")
        } else {
            alert("This Box was already chosen!! \nPlease Choose Another Box")
        }
    }
// function that returns which players turn it is
function checkPlayersTurn() {
    if(game.turn === 1) {
        return player1
    } else {
        return player2
    }
}
// function that changes the currentTurn from player1 to player2 and vice versa
function changePlayersTurn() {
    if(game.turn === 1) {
        game.turn = 0;
    } else {
        game.turn = 1;
    }
}
//function that displays which players turn it is under the board
function displayPlayerTurn() {
    const currentPlayer = checkPlayersTurn()
    document.querySelector('.turnDisplay')
    .innerHTML = currentPlayer.name + "'s Turn " + currentPlayer.character
}
//function that checks if a button on the board has already been selected
function checkIfButtonSelected(event) {
    if (event.target.value === player1.character || event.target.value === player2.character) {
        return true;
    } else {
        false;
    }
}
// function that checks for available spots left on the board
function checkIfBoardComplete() {
    return game.board.filter(s => s != player1.character && s != player2.character);
}
// function that holds the logic for checking if there is a winner after each turn
// adds button values to an array, depending on values in certain indexes tries to find a winner
// calls the displayWinner function with the characters symbol
function checkForWinner(board, player) {
    let availSpots
    if (
        // horizontal wins
        (board[0] == player.character && board[1] == player.character && board[2] == player.character) ||
        (board[3] == player.character && board[4] == player.character && board[5] == player.character) ||
        (board[6] == player.character && board[7] == player.character && board[8] == player.character) ||
        // vertical wins
        (board[0] == player.character && board[3] == player.character && board[6] == player.character) ||
        (board[1] == player.character && board[4] == player.character && board[7] == player.character) ||
        (board[2] == player.character && board[5] == player.character && board[8] == player.character) ||
        // diagonal wins
        (board[0] == player.character && board[4] == player.character && board[8] == player.character) ||
        (board[2] == player.character && board[4] == player.character && board[6] == player.character)
        ) {
            return true;
        } else {
            return false;
        }
}
// function that receives the winning character of the player 
// calls addScore with that player 
// changes display to show who won
// calls the endGame function
function displayWinner(winningCharacter = 0) {
    switch(winningCharacter) {
        case player1.character:
            document.querySelector('.turnDisplay').innerHTML = player1.name + " " + player1.character + " is the winner!";
            addScore(player1)
            endGame();
            break;
        case player2.character:
            document.querySelector('.turnDisplay').innerHTML = player2.name + " " + player2.character + " is the winner!";
            addScore(player2)
            endGame();
            break;
        default:
            document.querySelector('.turnDisplay').innerHTML = "The Game is a Tie!!";
            addScore()
            endGame();
            break;
    }
}
// function that sets the gameStatus to off - avoids continued playing
function endGame() {
    game.status = "Off";
}
// function that displays the game board and scoreBoard
function enableBoard() {
    if (game.boardElement.style.display === "") {
        game.boardElement.style.display = "flex"
    }
    if (document.querySelector('.scoreboard').style.display === "") {
        document.querySelector('.scoreboard').style.display = "flex"
    }
    if (document.querySelector('.reset-score').style.display === "") {
        document.querySelector('.reset-score').style.display = "flex"
    }
}
// function that addscore for a player to their player object
function addScore(player = 0) {
    if(player.name === player1.name) {
        game.scoreBoard.player1[0] += 1
        game.scoreBoard.player2[1] += 1
    } else if(player.name === player2.name) {
        game.scoreBoard.player1[1] += 1
        game.scoreBoard.player2[0] += 1
    } else {
        game.scoreBoard.player1[2] += 1
        game.scoreBoard.player2[2] += 1
    }
    updateGameBoard();
    storeScoreboardLocalStorage();
}
// function that updates the scoreBoard based on the players scores set in their objects
function updateGameBoard() {
    document.querySelector('.player1-name').innerHTML = player1.name
    document.querySelector('.player2-name').innerHTML = player2.name
    document.querySelector('.player1-icon').innerHTML = player1.character
    document.querySelector('.player2-icon').innerHTML = player2.character
    const player1P = document.querySelector('.scoreboard .player-1 p')
    const player2P = document.querySelector('.scoreboard .player-2 p')
    player1P.innerHTML = player1.name +" "+ player1.character + "<br> Wins " + game.scoreBoard.player1[0] + "<br>Losses " + game.scoreBoard.player1[1] + "<br>Ties " + game.scoreBoard.player1[2]
    player2P.innerHTML = player2.name +" "+ player2.character + "<br> Wins " + game.scoreBoard.player2[0] + "<br>Losses " + game.scoreBoard.player2[1] + "<br>Ties " + game.scoreBoard.player2[2]
}
// function that updates the player name and icon character after new ones have been chosen
function updatePlayer(event) {
    event.preventDefault()
    player1.name = document.querySelector('.player1-name').innerHTML
    player2.name = document.querySelector('.player2-name').innerHTML
    let tempChar1 = document.querySelector('.player1-icon').innerHTML
    let tempChar2 =  player2.character = document.querySelector('.player2-icon').innerHTML
    if(tempChar1 === tempChar2) {
        alert('Please select another character!')
        createNewGame();
    } else {
        player1.character = document.querySelector('.player1-icon').innerHTML
        player2.character = document.querySelector('.player2-icon').innerHTML
        storePlayerLocalStorage()
        createNewGame();
    }
}
function resetScore(){
    game.scoreBoard.player1[0] = 0;
    game.scoreBoard.player1[1] = 0;
    game.scoreBoard.player1[2] = 0;
    game.scoreBoard.player2[0] = 0;
    game.scoreBoard.player2[1] = 0;
    game.scoreBoard.player2[2] = 0;
    updateGameBoard();
    storeScoreboardLocalStorage();

}
// functions to store and retrieve player data and scoreboard data
function storePlayerLocalStorage() {
    localStorage.setItem("player1", JSON.stringify(player1))
    localStorage.setItem("player2", JSON.stringify(player2))
}
function storeScoreboardLocalStorage() {
    localStorage.setItem("scoreboard", JSON.stringify(game.scoreBoard))
}
function retrieveLocalGameStorage() {
    if(localStorage.getItem('scoreboard') != null) {
        game.scoreBoard = JSON.parse(localStorage.getItem('scoreboard'))
    }
}
function retrieveLocalPlayerStorage() {
    if(localStorage.getItem('player1') != null) {
        player1 = JSON.parse(localStorage.getItem('player1'))
        player2 = JSON.parse(localStorage.getItem('player2'))
    }
}
function clearBoardButtons(){
    buttons = document.querySelectorAll('.button')
    buttons.forEach( (button, index) => {
        button.innerHTML = ''
        button.value = ''
    })
    game.board = Array.from(Array(9).keys())
}
function enableAudio(event) {
    let volcanoSound = document.querySelector('.volcano-mp3')
    let volanoSoundButtonStatus = document.querySelector('.sound-button').innerHTML
    if (volanoSoundButtonStatus === "Sound Off") {
        volcanoSound.play()
        document.querySelector('.sound-button').innerHTML = "Sound On"
    } else {
        volcanoSound.pause()
        document.querySelector('.sound-button').innerHTML = "Sound Off"
    }
}
function minimax(newBoard, player) {
    // recursive function
    // 1. return a value if a terminal state is found (+10, -10, 0)
    // 2. go through available spots on the board
    // 3. call the minima function on each available spot (recursion)
    // 4. evaluate returning values from function calls
    // 5. return the best value

    let availSpots = checkIfBoardComplete()
    let moves = []
    if (checkForWinner(newBoard, player1)){
        return {score:-10};
    }
    else if (checkForWinner(newBoard, player2)){
        return {score:10};
    }
    else if (availSpots.length === 0){
        return {score:0};
    }

    for (let i = 0; i < availSpots.length; i++) {
         let move = {}
         move.index = newBoard[availSpots[i]]
         newBoard[availSpots[i]] = player.character
        if(player.character == player2.character ) {
            let result = minimax(newBoard, player1)
            move.score = result.score
        }else {
            let result = minimax(newBoard, player2)
            move.score = result.score
        }
        newBoard[availSpots[i]] = move.index
        moves.push(move)
    }
    let bestMove;
    if (player.character === player2.character) {
        let bestScore = -Infinity
        for(let i =0; i < moves.length; i++) {
            if(moves[i].score > bestScore) {
                bestScore = moves[i].score
                bestMove = i
            }
        }
    }else {
        let bestScore = +Infinity
        for(let i = 0; i < moves.length; i++) {
            if(moves[i].score < bestScore) {
                bestScore = moves[i].score
                bestMove = i
            }
        }
    }
    return moves[bestMove];
}
function chooseSpot() {
    return minimax(game.board, player2).index
}