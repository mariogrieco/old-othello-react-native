import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ImageBackground
} from 'react-native'
import Menu from '../../Menu/containers/MenuContainer'
import Cell from '../../Board/container/CellContainer'

class Home extends Component {
  render() {
    return (
    <View style={styles.container}>
      <Cell chip size={40} color='black' />
      <Cell chip size={40} color='black' />
      <Cell chip size={40} color='white' />
      <Cell chip size={40} color='white' />
      <Cell chip size={40} color='white' />
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Home
