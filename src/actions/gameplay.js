export function move (row, col) {
  return {
    type: 'MOVE',
    payload: {
      row,
      col
    }
  }
}

export function eat (row, col) {
  return {
    type: 'EAT',
    payload: {
      row,
      col
    }
  }
}

export function validate () {
  return {
    type: 'VALIDATE'
  }
}

export function IA () {
  return {
    type: 'IA'
  }
}

export function changeRound () {
  return {
    type: 'CHANGE_ROUND'
  }
}


export function clear () {
  return {
    type: 'CLEAR'
  }
}

export function reset () {
  return {
    type: 'RESET'
  }
}