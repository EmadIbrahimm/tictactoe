const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

]

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElements = document.getElementById('winningMessage');
const winningMessageTextElements = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restartButton')
let circleTurn

startGame();

restartButton.addEventListener('click',startGame )

function startGame() {
    cellElements.forEach(cell =>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick,{once: true})
    
    })
    setBoardHoverClass()
    winningMessageElements.classList.remove('show')
}

//what this function should do is 
// 1- Place the Mark
// 2- Check for win 
// 3- Switch turns
function handleClick(e) {
    const cell = e.target
    currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    // if (circleTurn) {
    //     return CIRCLE_CLAS
    // } else {
    //     return X_CLASS
    // }
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if(isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
   
}

function endGame(draw) {
    if(draw) {
        winningMessageTextElements.innerText = 'Draw !'
    } else {
        winningMessageTextElements.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElements.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}
function swapTurns() {
    circleTurn = !circleTurn
}
function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination =>{
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}