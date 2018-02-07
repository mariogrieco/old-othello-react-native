export function move (row, col) {
  return {
    type: 'MOVE',
    payload: {
      x: row,
      y: col
    }
  }
}

export function eat (row, col) {
  return {
    type: 'EAT',
    payload: {
      x: row,
      y: col
    }
  }
}

export function validate () {
  return {
    type: 'VALIDATE'
  }
}

export function changeRound () {
  return {
    type: 'CHANGE_ROUND'
  }
}
