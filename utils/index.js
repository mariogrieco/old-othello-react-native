const {
  Map,
  toJS,
  merge
} = require('immutable')

const clearOption = '0'
const blanca = 'B'
const negra = 'N'
const canMove = '.'

function setIn(Board, that, row, col) {
  return Board.setIn(['state', row, col], that)
}

function changeRound(round) {
  if (round === blanca) {
    return negra
  }

  return blanca
}

function getValidMove(Board) {
  let state = Board.get('state')
  let size = Board.get('size')
  let optionsFor = []
  let printBuffer = ''
  let max = -9999;
  let winnningState = {}
  let winingBoard

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (state.getIn([row, col]) === canMove) {
        optionsFor.push({ row, col })
      }
    }
  }

  if (optionsFor.length === 0) {
    return Map().set('winnningState', false).set('deep', false)
  }

  let tempState = optionsFor.forEach((value) => {
    let moveIn = eat(Board, value.row, value.col, blanca)
    let futState = moveIn.get('state')
    let contadorN = 0
    let contadorB = 0
    //out
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        let cell = futState.getIn([row, col])
        printBuffer += `${cell}`
        if (futState.getIn([row, col]) === negra) {
          contadorN++;
        }
        else if (futState.getIn([row, col]) === blanca) {
          contadorB++
        }
      }
      // console.log(printBuffer, "\n")
      printBuffer = ''
    }
    // console.log(' ')
    // console.log('negra', contadorN)
    // console.log('blanca', contadorB)
    if (contadorB > max) {
      winnningState = value
      winingBoard = moveIn
    } else if (contadorN === max) {
      let num = Math.random(100) % 20
      if (num >= 10) {
        winnningState = value
        winingBoard = moveIn
      }
    }
    //out
    return moveIn
  })

  return Map().set('winnningState', winnningState).set('deep', winingBoard)
}

function clear(Board) {
  let state = Board.get('state')
  let size = Board.get('size')

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (state.getIn([row, col]) === canMove) {
        state = state.setIn([row, col], clearOption)
      }
    }
  }

  return Board.set('state', state)
}

function getLength(Board) {
  let state = Board.get('state')
  let size = Board.get('size')
  let countN = 0
  let countB = 0

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (state.getIn([row, col]) === blanca) {
        countB++
      }
      else if (state.getIn([row, col]) === negra) {
        countN++;
      }
    }
  }

  Board = Board.set(blanca, countB)
  Board = Board.set(negra, countN)


  return Board;
}

function getOneBoard() {
  let Board = Map()
  Board = Board.set('size', 8)
  Board = Board.set('state', Map())
  Board = Board.set('Round', blanca)
  Board = Board.set(blanca, 0)
  Board = Board.set(negra, 0)
  Board = Board.set('player_B ', 0)
  Board = Board.set('player_N ', 0)

  return initialize(Board)
}

function initialize(Board) {
  let state = Board.get('state')
  let size = Board.get('size')

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      state = state.setIn([row, col], clearOption)
    }
  }

  state = state.setIn([size / 2, size / 2], negra)
  state = state.setIn([(size / 2) - 1, (size / 2) - 1], negra) // es blanco
  state = state.setIn([(size / 2), (size / 2) - 1], blanca)
  // state = state.setIn([(size/2), (size/2)-2], negra)
  state = state.setIn([(size / 2) - 1, (size / 2)], blanca)
  // state = state.setIn([3, 5], blanca)
  //   state = state.setIn([(size/2)+2, (size/2)], negra)

  // return an empty board state
  return Board.set('state', state)
}

function printState(Board) {
  let state = Board.get('state')
  let size = Board.get('size')
  let printBuffer = ''

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      let cell = state.getIn([row, col])
      printBuffer += ` ${cell} `
    }
    console.warn(printBuffer, '')
    printBuffer = ''
  }
}

function eat(Board, col, row, chip_name_a = blanca) {
  let size = Board.get('size')
  let state = Board.get('state')
  let chip_name_b = changeRound(chip_name_a)
  let band = true
  let tempCol = col
  let tempRow = row

  // horizontar para atras
  tempRow = row
  tempRow = tempRow - 1
  band = true
  if (tempRow >= 0 && state.getIn([col, tempRow]) === chip_name_b) {
    tempRow--;
    while (tempRow > 0 && state.getIn([col, tempRow]) === chip_name_b) {
      tempRow--;
    }
    if (tempRow >= 0 && state.getIn([col, tempRow]) == chip_name_a) {
      while (tempRow < row) {
        tempRow++;
        state = state.setIn([col, tempRow], chip_name_a)
      }
    }
  }

  // horizontal adelante
  tempRow = row
  tempRow = tempRow + 1
  band = true
  if (tempRow < size && state.getIn([col, tempRow]) === chip_name_b) {
    tempRow++;
    while (tempRow < size && state.getIn([col, tempRow]) === chip_name_b) {
      tempRow++;
    }
    if (tempRow < size && state.getIn([col, tempRow]) == chip_name_a) {
      while (tempRow > row) {
        tempRow--;
        state = state.setIn([col, tempRow], chip_name_a)
      }
    }
  }

  // vertical abajo
  tempCol = col
  tempCol = tempCol + 1
  if (tempCol < size && state.getIn([tempCol, row]) === chip_name_b) {
    tempCol++;
    while (tempCol < size && state.getIn([tempCol, row]) === chip_name_b) {
      tempCol++;
    }
    if (tempCol < size && state.getIn([tempCol, row]) == chip_name_a) {
      while (tempCol > col) {
        tempCol--;
        state = state.setIn([tempCol, row], chip_name_a)
      }
    }
  }

  // vertical arriba
  tempCol = col
  tempCol = tempCol - 1
  if (tempCol >= 0 && state.getIn([tempCol, row]) === chip_name_b) {
    tempCol--;
    while (tempCol > 0 && state.getIn([tempCol, row]) === chip_name_b) {
      tempCol--;
    }
    if (tempCol >= 0 && state.getIn([tempCol, row]) == chip_name_a) {
      while (tempCol < col) {
        tempCol++;
        state = state.setIn([tempCol, row], chip_name_a)
      }
    }
  }

  // vertical arriba
  // horizontal atras
  tempCol = col
  tempCol = tempCol - 1
  tempRow = row
  tempRow = tempRow - 1

  if (tempCol >= 0 && tempRow >= 0 && state.getIn([tempCol, tempRow]) === chip_name_b) {
    tempCol--
    tempRow--
    while (tempCol > 0 && tempRow > 0 && state.getIn([tempCol, tempRow]) === chip_name_b) {
      tempCol--
      tempRow--
    }
    if (tempCol >= 0 && tempRow >= 0 && state.getIn([tempCol, tempRow]) == chip_name_a) {
      while (tempCol < col && tempRow < row) {
        tempCol++;
        tempRow++;
        state = state.setIn([tempCol, tempRow], chip_name_a)
      }
    }
  }

  // //??
  tempCol = col
  tempCol = tempCol - 1
  tempRow = row
  tempRow = tempRow + 1

  if (tempCol >= 0 && tempRow < size && state.getIn([tempCol, tempRow]) === chip_name_b) {
    tempCol--
    tempRow++
    while (tempCol > 0 && tempRow < size && state.getIn([tempCol, tempRow]) === chip_name_b) {
      tempCol--
      tempRow++
    }
    if (tempCol >= 0 && tempRow < size && state.getIn([tempCol, tempRow]) == chip_name_a) {
      while (tempCol < col && tempRow > row) {
        tempCol++;
        tempRow--;
        state = state.setIn([tempCol, tempRow], chip_name_a)
      }
    }
  }

  tempCol = col
  tempCol = tempCol + 1
  tempRow = row
  tempRow = tempRow + 1

  if (tempCol < size && tempRow < size && state.getIn([tempCol, tempRow]) === chip_name_b) {
    tempCol++
    tempRow++
    while (tempCol < size && tempRow < size && state.getIn([tempCol, tempRow]) === chip_name_b) {
      tempCol++
      tempRow++
    }
    if (tempCol < size && tempRow < size && state.getIn([tempCol, tempRow]) == chip_name_a) {
      while (tempCol > col && tempRow > row) {
        tempCol--;
        tempRow--;
        state = state.setIn([tempCol, tempRow], chip_name_a)
      }
    }
  }

  // ??
  // ??
  tempCol = col
  tempCol = tempCol + 1
  tempRow = row
  tempRow = tempRow - 1

  if (tempCol < size && tempRow >= 0 && state.getIn([tempCol, tempRow]) === chip_name_b) {
    tempCol++
    tempRow--
    while (tempCol < size && tempRow > 0 && state.getIn([tempCol, tempRow]) === chip_name_b) {
      tempCol++
      tempRow--
    }
    if (tempCol < size && tempRow >= 0 && state.getIn([tempCol, tempRow]) == chip_name_a) {
      while (tempCol > col && tempRow < row) {
        tempCol--;
        tempRow++;
        state = state.setIn([tempCol, tempRow], chip_name_a)
      }
    }
  }
  return Board.set('state', state)
}

function validateDownLeft(state, row, col, chip_name_b, size) {
  let indexCol = col
  let indexRow = row
  let band = false

  indexCol--
  indexRow++
  while (indexRow < size && indexCol >= 0 && state.getIn([indexRow, indexCol]) === chip_name_b) {
    indexCol--
    indexRow++
    band = true
  }
  if (band && indexCol >= 0 && indexRow < size && state.getIn([indexRow, col]) === clearOption) {
    state = state.setIn([indexRow, indexCol], canMove)
    console.warn('one')
  }

  return state
}

function validateUpBack(state, row, col, chip_name_b, size) {
  
  let indexCol = col
  let indexRow = row
  let band = false

  indexCol--
  indexRow--
  while (indexRow >= 0 && indexCol >= 0 && state.getIn([indexRow, indexCol]) === chip_name_b) {
    indexCol--
    indexRow--
    band = true
  }
  if (band && indexCol >= 0 && indexRow >= 0 && state.getIn([indexRow, indexCol]) === clearOption) {
    state = state.setIn([indexRow, indexCol], canMove)
  }

  return state
}


function validateRigth (state, row, col, chip_name_b, size)  {
  
  let indexCol = col
  let indexRow = row
  let band = false

  indexCol++
  while (indexCol < size && state.getIn([row, indexCol]) === chip_name_b) {
    indexCol++;
    band = true
  }
  if (band && indexCol < size && state.getIn([row, indexCol]) === clearOption) {
    state = state.setIn([row, indexCol], canMove)
  }

  return state
}

function validateDownRight (state, row, col, chip_name_b, size) {
  
  let indexCol = col
  let indexRow = row
  let band = false

  indexCol++
  indexRow++
  while (indexRow < size && indexCol < size && state.getIn([indexRow, indexCol]) === chip_name_b) {
    indexCol++
    indexRow++
    band = true
  }
  if (band && indexCol < size && indexRow < size && state.getIn([indexRow, indexCol]) === clearOption) {
    state = state.setIn([indexRow, indexCol], canMove)
    console.warn('one')
  }

  return state
}

function validateUpRigth (state, row, col, chip_name_b, size) {
  
  let indexCol = col
  let indexRow = row
  let band = false

  indexCol++
  indexRow--
  while (indexRow >= 0 && indexCol < size && state.getIn([indexRow, indexCol]) === chip_name_b) {
    indexCol++
    indexRow--
    band = true
  }

  if (band && indexCol < size && indexRow >= 0 && state.getIn([indexRow, indexCol]) === clearOption) {
    state = state.setIn([indexRow, indexCol], canMove)
  }

  return state
}

function validateDown (state, row, col, chip_name_b, size) {
  
  let indexCol = col
  let indexRow = row
  let band = false

  indexRow++
  while (indexRow < size && state.getIn([indexRow, col]) === chip_name_b) {
    indexRow++;
    band = true
  }
  if (band && indexRow < size && state.getIn([indexRow, col]) === clearOption) {
    state = state.setIn([indexRow, col], canMove)
  }

  return state
}

function validateUp (state, row, col, chip_name_b, size) {
  
  let indexCol = col
  let indexRow = row
  let band = false

  indexRow--
  while (indexRow >= 0 && state.getIn([indexRow, col]) === chip_name_b) {
    indexRow--;
    band = true
  }
  if (band && indexRow >= 0 && state.getIn([indexRow, col]) === clearOption) {
    state = state.setIn([indexRow, col], canMove)
  }
  return state
}

function validateBack (state, row, col, chip_name_b, size) {
  
  let indexCol = col
  let indexRow = row
  let band = false

  indexCol--
  while (indexCol >= 0 && state.getIn([row, indexCol]) === chip_name_b) {
    indexCol--;
    band = true
  }
  if (band && indexCol >= 0 && state.getIn([row, indexCol]) === clearOption) {
    state = state.setIn([row, indexCol], canMove)
  }

  return state
}


function validate(Board, chip_name_a = blanca, chip_name_b = negra) {
  Board = clear(Board)
  let size = Board.get('size')
  let state = Board.get('state')
  let nextState = state

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (state.getIn([row, col]) === chip_name_a) {
        nextState = validateDownRight(nextState, row, col, chip_name_b, size)
        nextState = validateDownLeft(nextState, row, col, chip_name_b, size)
        // nextState = validateUpBack(nextState, row, col, chip_name_b, size)
        // nextState = validateUpRigth(nextState, row, col, chip_name_b, size)
        // nextState = validateDown(nextState, row, col, chip_name_b, size)
        // nextState = validateUp(nextState, row, col, chip_name_b, size)
        // nextState = validateBack(nextState, row, col, chip_name_b, size)
        // nextState = validateRigth(nextState, row, col, chip_name_b, size)
      }
    }
  }

  let result = Board.set('state', nextState)
  return result
}

module.exports = {
  initialize,
  printState,
  validate,
  getOneBoard,
  eat,
  changeRound,
  clear,
  getLength,
  getValidMove,
  clearOption,
  blanca,
  negra,
  canMove,
  setIn
}
