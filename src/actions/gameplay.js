export function move (row, col) {
  return (Dispatch) => {
    Dispatch({
      type: 'MOVE',
      payload: {
        x: row,
        y: col
      }
    })
    Dispatch(changeRound)
    Dispatch(validate)
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