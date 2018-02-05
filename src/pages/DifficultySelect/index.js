import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Layout from '../../Menu/components/Layout'
import Option from '../../Menu/components/Option'

class DifficultySelect extends Component {
  render () {
    return (
      <Layout title='Difficulty Select'>
        <Option text='Easy' />
        <Option text='Normal' />
        <Option text='Veteran' />
        <Option text='Enginer' disabled/>
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
})

export default DifficultySelect
