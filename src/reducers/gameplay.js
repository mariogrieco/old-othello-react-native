import { fromJS } from 'immutable'
import { getOneBoard, validate, changeRound } from '../../utils'
import { Alert } from 'react-native'

const initialState = getOneBoard()

function gameplay (state = initialState, action) {
  switch (action.type) {
    case 'VALIDATE': {
      let Round = state.get('Round')
      let who = Round === 'B ' ? "Blancas" : "Negras"
      let message = `Turno de las ${who}`
      Alert.alert(message)
      const nextState = validate(state, Round, changeRound(Round))
      return nextState
    }
    case 'CHANGE_ROUND': {
      let Round = state.get('Round')
      return state.set('Round', changeRound(Round))
    }
    case 'MOVE': {
      let { x, y } = action.payload
      let Round = state.get('Round')
      let nextState
      
      if (state.getIn(['state', x, y]) === 'CM') {
        nextState = state.setIn(['state', x, y], Round)
        return nextState
      }
      else {
        Alert.alert(`Movimiento invalido ${action.payload.x}, ${action.payload.y}!`)
      }
     
      return state
    }
    case 'EAT': {
      let Round = state.get('Round')
      let nextState


      return state
    }
    default: {
      return state
    }
  }
}

export default gameplay
