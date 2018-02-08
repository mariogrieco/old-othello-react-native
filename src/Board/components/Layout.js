import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableHighlight
} from 'react-native'

function Layout (props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {`${props.username} vs computer`} 
      </Text>
      <TouchableHighlight>
       <Button onPress={()=>{}}
          title='Restart'
          color='#ABDBDf'
        />
      </TouchableHighlight>
      <Text style={styles.textTo}>
        {`Blancas: ${props.blancas} - Negras: ${props.negras}`} 
      </Text>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#434343'
  },
  textTo: {
    color: 'white'
  },
  title: {
    fontSize: 25,
    color: '#f6f6f6',
    padding: 5
  }
})

export default Layout
