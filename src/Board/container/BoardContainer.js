import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions
} from 'react-native'
import Layout from '../components/Layout'
import Row from '../components/Row'
import Cell from '../components/Cell'
import Chip from '../components/Chip'
import Icon from 'react-native-vector-icons/FontAwesome';


class BoardContainer extends Component {
  state = {
    rows: new Array(8).fill(0),
    cols: new Array(8).fill(0)
  }

  getSize (w, h) {
    let sw = w/8
    let sh = h/8
    if (sw < sh) {
      return sw
    }
    else {
      return sh
    }
  }

  render () {
    let width = Dimensions.get('window').width
    let height = Dimensions.get('window').height

    let size = this.getSize(width, height)
    size = size-4

    return (
      <Layout>
        {
          this.state.rows.map((row, rowKey) => {
            return (
              <View key={rowKey} style={styles.row}>
                {
                  this.state.cols.map((col, colKey) => {
                    return (
                      <View key={colKey} style={styles.col}>
                        <Cell size={size}>
                        </Cell>
                      </View>
                    )
                  })
                }
              </View>
            )
          })
        }
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  col: {
  }
})

export default BoardContainer
