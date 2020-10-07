console.log("Script has been linked");


init()


function init() {
    //add listener to 'New game button'
    document.querySelector('.new-game-btn')
    .addEventListener('click', createNewGame)
}
function createNewGame(event) {
    event.preventDefault()
    const board = document.querySelector('.board')
    if (board.style.display === "") {
        board.style.display = "block"
    } else {
        board.style.display = ""
    }
    console.log('A new game has been created');
    document.querySelector('.turnDisplay').innerHTML = "Player 1's Turn"
}