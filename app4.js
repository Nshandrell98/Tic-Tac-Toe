const game = new Game();
game.start();

function Game(){
    const board = new Board();
    let turn = 0;
    let place = 'X';
    
    this.start = function(){
        const config = {childList: true};
        const observer = new MutationObserver(() => takeTurn());
        board.positions.forEach((el) =>observer.observe(el, config))
        takeTurn()
    }
    function takeTurn(){
        if(board.checkWinner()){
            return;
        }
        if (turn % 2 === 0 ){
            place = 'X'
            board.positions.forEach(el => el.addEventListener('click', handleTurn));
        }
        else{
            // takeTurn()
            place = 'O';
            board.positions.forEach(el => el.addEventListener('click', handleTurn));
    
        }
        turn++;


    }

function Board(){
    this.positions = Array.from(document.querySelectorAll('.tile'))
    
    this.checkWinner = function(){
        let winner = false;
      const combos = [
          [0,1,2],
          [3,4,5],
          [6,7,8],
          [0,4,8],
          [2,4,6],
          [0,3,6],
          [1,4,7],
          [2,5,8]
      ]
      
      const positions = this.positions;

      combos.forEach((combo) => {
          const spot1 = positions[combo[0]].innerText;
          const spot2 = positions[combo[1]].innerText;
          const spot3 = positions[combo[2]].innerText;

          const winningCombo = spot1 !== '' && spot1 === spot2 && spot2 === spot3;

          if( winningCombo){
              winner = true;
              combo.forEach((index) => {
                  positions[index].className +=  ' winner';
              })
              return winner;
          }
      })
    };
    
}

function handleTurn(event){
    event.target.innerHTML = place;
    board.positions.forEach(el => el.addEventListener('click', handleTurn));
}
// for computer playing 
// function Player2(){

//    takeTurn = function() {
//        const openPositions = board.positions.filter((p) => p.innerText === "");
//        const move = Math.floor(Math.random() * openPositions.length);
//        openPositions[move].innerText = 'O'
//    }
// }
}