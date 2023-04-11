let playerStatus = document.querySelector("[data-playerStatus]") ;
let boxes = document.querySelectorAll(".box") ;
let btn = document.querySelector("button") ;

let currentPlayer ;
let count = 0 ;
let gridArray = ["","","","","","","","",""] ;


let winArray = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

initializeGame() ;

function initializeGame() {
    count = 0 ;
    currentPlayer = "Current Player - X" ;
    playerStatus.innerText = currentPlayer ;
    boxes.forEach((box, index) => {
        box.innerText = "" ;
    });
    btn.classList.remove('active');
    winArray.forEach((position) => {
        boxes[position[0]].classList.remove('win') ;
        boxes[position[1]].classList.remove('win') ;
        boxes[position[2]].classList.remove('win') ;
    });
    boxes.forEach((box) => {
        box.style.pointerEvents = "all" ;
    }) ;
    gridArray = ["","","","","","","","",""] ;
}

function swapTurn() {
    if(currentPlayer === "Current Player - X") {
        currentPlayer = "Current Player - O" ;
        playerStatus.innerText = currentPlayer ;
    } else {
        currentPlayer = "Current Player - X" ;
        playerStatus.innerText = currentPlayer ;
    }
}

function setValue(box, index) {
    if(currentPlayer === "Current Player - X") {
        box.innerText = "X" ;
        gridArray[index] = "X" ;
        box.style.pointerEvents = "none" ;
    } else {
        box.innerText = "O" ;
        gridArray[index] = "O" ;
        box.style.pointerEvents = "none" ;
    }
    swapTurn() ;
    count++ ;
    return count;
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        let totalCount = setValue(box, index) ;
        if(totalCount >= 5) {
            let result = windCondition() ;
            if(result === true) {
                gridArray = ["","","","","","","","",""] ;
                return ;
            }
            if(result === false && totalCount == 9) {
                playerStatus.innerText = "Game Tied" ;
                btn.classList.add('active') ;
            }
        }
    });
})

function windCondition() {
    let color = 'none' ;
   
    winArray.forEach(function(position) {

       if((gridArray[position[0]] === 'X' && gridArray[position[1]] === 'X' && gridArray[position[2]] === 'X') || 
        (gridArray[position[0]] === 'O' && gridArray[position[1]] === 'O' && gridArray[position[2]] === 'O') ) 
        {
            
            color = 'green' ;
            boxes[position[0]].classList.add('win') ;
            boxes[position[1]].classList.add('win') ;
            boxes[position[2]].classList.add('win') ;

            boxes.forEach((box) => {
                box.style.pointerEvents = "none" ;
            }) ;

            currentPlayer = gridArray[position[0]] ;
            playerStatus.innerText = `Winning Player - ${currentPlayer}`  ;

            btn.classList.add('active') ;
           
        }
    });

    if(color === 'none') {
        return false ;
    } else {
        return true ;
    }
}

btn.addEventListener('click', initializeGame) ;
