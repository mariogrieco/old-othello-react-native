import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import BoardContainer from '../../Board/container/BoardContainer'

class GamePlay extends Component {
  state = {
    turno: 1,
    negras: 0,
    blancas: 0,
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>GamePlay</Text>
        <BoardContainer />
      </View>
    )
  }
}

let styles  = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%'
  }
})

export default GamePlay
