import React from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

function Layout (props) {
  return (
    <View style={styles.container}>
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
  }
})

export default Layout
