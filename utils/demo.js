const {
 getOneBoard,
 validate,
 eat,
 blanca,
 negra,
 canMove,
 clearOption,
 printState,
 setIn
} = require('./index')

let board = getOneBoard()
// board = setIn(board, negra, 3, 4);
// board = setIn(board, blanca, 4, 4);
// board = setIn(board, blanca, 4, 5);
// board = setIn(board, negra, 3, 5);
// board = setIn(board, negra, 3, 2);
board = validate(board, negra, blanca)
printState(board)