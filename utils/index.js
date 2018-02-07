const {
  Map,
  toJS,
  fromJS
} = require('immutable')
let Board = Map()

Board = Board.set('size', 8)
Board = Board.set('state', Map())

function changeRound (round) {
  if (round === 'B ') {
    return 'N '
  }

  return 'B '
}

function clear (Board) {
  let state = Board.get('state')
  let size = Board.get('size')

  for ( let row = 0; row < size; row++ ) {
      for ( let col = 0; col < size; col++ ) {
        if (state.getIn([row, col]) === 'CM') {
          state = state.setIn([row, col], '0 ')
        }
      }
  }

  return Board.set('state', state)
}

function getLength (Board) {
  let state = Board.get('state')
  let size = Board.get('size')
  let countN = 0
  let countB = 0

  for ( let row = 0; row < size; row++ ) {
      for ( let col = 0; col < size; col++ ) {
        if (state.getIn([row, col]) === 'B ') {
          countB++
        }
        else if (state.getIn([row, col]) === 'N ') {
          countN++;
        }
      }
  }

  Board = Board.set('B ', countB)
  Board = Board.set('N ', countN)


  return Board;
}

function getOneBoard () {
  let Board = Map()
  Board = Board.set('size', 8)
  Board = Board.set('state', Map())
  Board = initialize(Board)
  Board = Board.set('Round', 'B ')
  Board = Board.set('B ', 0)
  Board = Board.set('N ', 0)
  Board = Board.set('player_B ', 0)
  Board = Board.set('player_N ', 0)

  return Board
}

getOneBoard()

function initialize (Board) {
  let state = Board.get('state')
  let size = Board.get('size')

  for ( let row = 0; row < size; row++ ) {
      for ( let col = 0; col < size; col++ ) {
        state = state.setIn([row, col], '0 ')
      }
  }

  state = state.setIn([size/2, size/2], 'B ')
  state = state.setIn([(size/2)-1, (size/2)-1], 'B ') // es blanco
  state = state.setIn([(size/2), (size/2)-1], 'N ')
  // state = state.setIn([(size/2), (size/2)-2], 'N ')
  state = state.setIn([(size/2)-1, (size/2)], 'N ')
//   state = state.setIn([(size/2)+2, (size/2)], 'N ')

  // return an empty board state
  return Board.set('state', state)
}

function printState (Board) {
  let state = Board.get('state')
  let size = Board.get('size')
    let printBuffer = ''

  for ( let row = 0; row < size; row++ ) {
    for ( let col = 0; col < size; col++ ) {
      let cell = state.getIn([row, col])
      printBuffer += `${cell}  `
    }
    console.log(printBuffer, "\n")
    printBuffer = ''
  }
}

function eat (Board, col, row, chip_name_a = 'B ') {
  let size = Board.get('size')
  let state = Board.get('state')
  let band = true
  let tempCol = col
  let tempRow = row

  // dere vertical
  while (tempCol < size && band) {
    tempCol++
    if ( state.getIn([tempCol, row]) !== '0 ' && state.getIn([tempCol, row]) !== chip_name_a ) {
      band = true
    }
    else {
      if (state.getIn([tempCol, row]) !== chip_name_a) {
        band = false
      }
      break;
    }
  }
  if (band) {
    while (tempCol > col) {
      tempCol--;
      state = state.setIn([tempCol, row], chip_name_a)
    }
  }

  // arriba vertical
  band = true
  tempCol = col
  tempRow = row
  while (tempCol >= 0 && band) {
    tempCol--
    if ( state.getIn([tempCol, row]) !== '0 ' && state.getIn([tempCol, row]) !== chip_name_a ) {
      band = true
    }
    else {
      if (state.getIn([tempCol, row]) !== chip_name_a) {
        band = false
      }
      break;
    }
  }
  if (band) {
    while (tempCol < col) {
      tempCol++;
      state = state.setIn([tempCol, row], chip_name_a)
    }
  }


  // atras horiz
  band = true
  tempCol = col
  tempRow = row
  while (tempRow >= 0 && band) {
    tempRow--
    if ( state.getIn([col, tempRow]) !== '0 ' && state.getIn([col, tempRow]) !== chip_name_a ) {
      band = true
    }
    else {
      if (state.getIn([col, tempRow]) !== chip_name_a) {
        band = false
      }
      break;
    }
  }
  if (band) {
    while (tempRow < row) {
      tempRow++;
      state = state.setIn([col, tempRow], chip_name_a)
    }
  }

  // plante horizontal
  band = true
  tempCol = col
  tempRow = row
  while (tempRow < size && band) {
    tempRow++
    if ( state.getIn([col, tempRow]) !== '0 ' && state.getIn([col, tempRow]) !== chip_name_a ) {
      band = true
    }
    else {
      if (state.getIn([col, tempRow]) !== chip_name_a) {
        band = false
      }
      break;
    }
  }
  if (band) {
    while (tempRow > row) {
      tempRow--;
      state = state.setIn([col, tempRow], chip_name_a)
    }
  }
  // diagonal , abajo dere
  band = true
  tempCol = col
  tempRow = row

  while (tempCol < size && tempRow < size && band) {
    tempCol++
    tempRow++
    if ( state.getIn([tempCol, tempRow]) !== '0 ' && state.getIn([tempCol, tempRow]) !== chip_name_a ) {
      band = true
    }
    else {
      if (state.getIn([tempCol, tempRow]) !== chip_name_a) {
        band = false
      }
      break;
    }
  }
  if (band) {
    while (tempCol > col && tempRow > row) {
      tempCol--;
      tempRow--;
      state = state.setIn([tempCol, tempRow], chip_name_a)
    }
  }

  // diagonal , arriba dere
  band = true
  tempCol = col
  tempRow = row

  while (tempCol >= 0 && tempRow < size && band) {
    tempCol--
    tempRow++
    if ( state.getIn([tempCol, tempRow]) !== '0 ' && state.getIn([tempCol, tempRow]) !== chip_name_a ) {
      band = true
    }
    else {
      if (state.getIn([tempCol, tempRow]) !== chip_name_a) {
        band = false
      }
      break;
    }
  }
  if (band) {
    while (tempCol < col && tempRow > row) {
      tempCol++;
      tempRow--;
      state = state.setIn([tempCol, tempRow], chip_name_a)
    }
  }

// diagoanl abajo izq
  while (tempCol < size && tempRow >= 0 && band) {
    tempCol++
    tempRow--
    if ( state.getIn([tempCol, tempRow]) !== '0 ' && state.getIn([tempCol, tempRow]) !== chip_name_a ) {
      band = true
    }
    else {
      if (state.getIn([tempCol, tempRow]) !== chip_name_a) {
        band = false
      }
      break;
    }
  }
  if (band) {
    while (tempCol > col && tempRow < row) {
      tempCol--;
      tempRow++;
      state = state.setIn([tempCol, tempRow], chip_name_a)
    }
  }


  // diagonal arriba iqz
  // diagonal , abajo dere
  band = true
  tempCol = col
  tempRow = row

  while (tempCol >= 0 && tempRow >= 0 && band) {
    tempCol--
    tempRow--
    if ( state.getIn([tempCol, tempRow]) !== '0 ' && state.getIn([tempCol, tempRow]) !== chip_name_a ) {
      band = true
    }
    else {
      if (state.getIn([tempCol, tempRow]) !== chip_name_a) {
        band = false
      }
      break;
    }
  }
  if (band) {
    while (tempCol < col && tempRow < row) {
      tempCol++;
      tempRow++;
      state = state.setIn([tempCol, tempRow], chip_name_a)
    }
  }

  return Board.set('state', state)
}

function validate (Board, chip_name_a = 'B ', chip_name_b = 'N ') {
  let size = Board.get('size')
  let state = Board.get('state')

  for ( let row = 0; row < size; row++ ) {
    for ( let col = 0; col < size; col++ ) {
      if (state.getIn([row, col]) === chip_name_a) {
        let indexCol = col
        let indexRow = row
        let band = false
        //OTRO
            //   while () vertical pa "bajo"
            indexRow++
            while (indexRow < size && state.getIn([indexRow, col]) === chip_name_b) {
            indexRow++;
            band = true
            }
            if (band && indexRow < size && state.getIn([indexRow, col]) === '0 ') {
            state = state.setIn([indexRow, col], 'CM')
            }

            //   while () vertical pa ""rriba""
            indexCol = col
            indexRow = row
            band = false
            indexRow--
            while (indexRow >= 0 && state.getIn([indexRow, col]) === chip_name_b) {
            indexRow--;
            band = true
            }
            if (band && indexRow >= 0 && state.getIn([indexRow, col]) === '0 ') {
            state = state.setIn([indexRow, col], 'CM')
            }

        //OTRO
            //   while () horizontal pa TRA
            indexCol = col
            indexRow = row
            band = false
            indexCol--
            while (indexCol >= 0 && state.getIn([row, indexCol]) === chip_name_b) {
            indexCol--;
            band = true
            }
            if (band && indexCol >= 0 && state.getIn([row, indexCol]) === '0 ') {
            state = state.setIn([row, indexCol], 'CM')
            }

            //   while () horizontal pa lante
            indexCol = col
            indexRow = row
            band = false
            indexCol++
            while (indexCol < size && state.getIn([row, indexCol]) === chip_name_b) {
            indexCol++;
            band = true
            }
            if (band && indexCol < size  && state.getIn([row, indexCol]) === '0 ') {
            state = state.setIn([row, indexCol], 'CM')
            }

    // OTRO
    indexCol = col
    indexRow = row
    band = false
        //   while () diegonal arriba atras
            indexCol--
            indexRow--
            while (indexRow >= 0 && indexCol >= 0 && state.getIn([indexRow, indexCol]) === chip_name_b) {
            indexCol--
            indexRow--
            band = true
            }
            if (band && indexCol >= 0 && indexRow >= 0 && state.getIn([indexRow, indexCol]) === '0 ') {
              state = state.setIn([indexRow, indexCol], 'CM')
            }


     // OTRO
     indexCol = col
     indexRow = row
     band = false
         //   while () diegonal bajo dere
             indexCol++
             indexRow++
             while (indexRow < size && indexCol < size && state.getIn([indexRow, indexCol]) === chip_name_b) {
             indexCol++
             indexRow++
             band = true
             }
             if (band && indexCol < size && indexRow < size && state.getIn([indexRow, indexCol]) === '0 ') {
               state = state.setIn([indexRow, indexCol], 'CM')
             }

    // OTRO
     indexCol = col
     indexRow = row
     band = false
         //   while () diegonal arriba dere
             indexCol++
             indexRow--
             while (indexRow >= 0 && indexCol < size && state.getIn([indexRow, indexCol]) === chip_name_b) {
             indexCol++
             indexRow--
             band = true
             }
             if (band && indexCol < size && indexRow >= 0 && state.getIn([indexRow, indexCol]) === '0 ') {
               state = state.setIn([indexRow, indexCol], 'CM')
             }


                  // OTRO
     indexCol = col
     indexRow = row
     band = false
         //   while () diegonal bajo iqz
             indexCol--
             indexRow++
             while (indexRow < size && indexCol >= 0 && state.getIn([indexRow, indexCol]) === chip_name_b) {
             indexCol--
             indexRow++
             band = true
             }
             if (band && indexCol >= 0 && indexRow < size && state.getIn([indexRow, col]) === '0 ') {
               state = state.setIn([indexRow, indexCol], 'CM')
             }
      }
    }
  }

  return Board.set('state', state)
}

module.exports = {
  initialize,
  printState,
  validate,
  getOneBoard,
  eat,
  changeRound,
  clear,
  getLength
}
