import { fromJS } from 'immutable'
import {
  getOneBoard,
  validate,
  changeRound,
  eat,
  clear,
  getLength,
  getValidMove,
  clearOption,
  printState,
  blanca,
  canMove,
  negra
} from '../../utils'
import { Alert } from 'react-native'

const initialState = getOneBoard()

function gameplay (state = initialState, action) {
  switch (action.type) {
    case 'VALIDATE': {
      let nextState = clear(state)
      nextState = validate(nextState, negra, blanca)
      nextState = getLength(nextState)

      return nextState
    }
    case 'USERNAME': {
      return state.set('USERNAME', action.payload.username)
    }
    case 'MOVE': {
      let { row, col } = action.payload
      let nextState = state
      if (state.getIn(['state', row, col]) === canMove) {
        nextState = nextState.setIn(['state', row, col], negra)
        nextState = eat(nextState, row, col, negra)
        nextState = clear(nextState)
        nextState = validate(nextState, negra, blanca)
        nextState = getLength(nextState)
        // printState(nextState)
        return nextState
      }
      else {
        Alert.alert(`Movimiento invalido ${action.payload.x}, ${action.payload.y}!`)
      }

      return nextState
    }
    case 'CLEAR': {
      return clear(state)
    }
    case 'RESET': {
      return getOneBoard()
    }
    case 'IA': {
      let nextState = clear(state)
      nextState = validate(nextState, blanca, negra)
      let moves = getValidMove(nextState)
      moves = moves.get('winnningState')
      // // validar cuando no tienen mas movimientos

      if (!moves) {
        Alert.alert('la pc no tiene movimientos')
        nextState = clear(state)
        nextState = validate(nextState, negra, blanca)
        nextState = getLength(nextState)
        return nextState
      }
      else if (nextState.getIn(['state', moves['row'], moves['col']]) === canMove) {
        nextState = nextState.setIn(['state', moves['row'], moves['col']], blanca)
        nextState = validate(nextState, blanca, negra)
        nextState = eat(nextState, moves['row'], moves['col'], blanca)

        nextState = clear(nextState)
        nextState = validate(nextState, negra, blanca)
        nextState = getLength(nextState)
        
        return nextState
      }
      else {
        Alert.alert('false move')
      }
    }
    default: {
      return state
    }
  }
}

export default gameplay
