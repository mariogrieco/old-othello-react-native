import React, { Component } from 'react'
import { 
  StyleSheet, 
  Text 
} from 'react-native'
import { Actions }  from 'react-native-router-flux'
import Layout from '../components/Layout'
import Option from '../components/Option'

class MenuContainer extends Component {
  playHandlePless = () => {
    Actions.DifficultySelect()
  }

  loginHandlePress = () => {
   Actions.Login() 
  }

  render () {
    return (
      <Layout title="OTHELLO">
         <Option text='Player vs Player' handlePress={this.loginHandlePress} />
         <Option text='Player vs IA' handlePress={this.playHandlePless} />
         <Option text='Online mode' disabled handlePress={()=>{}} />
         <Option text='Options' handlePress={()=>{}} />
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
})

export default MenuContainer
