import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  Button, 
  TouchableHighlight
} from 'react-native'
import Layout from '../components/Layout'
import Row from '../components/Row'
import Cell from '../container/CellContainer'
import Chip from '../components/Chip'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions/gameplay'

class BoardContainer extends Component {
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

  moveHandle = (x, y) => {
    this.props.actions.move(x,y)
  }

  componentDidMount() {
    this.props.actions.validate()
  }
  
  render () {
    let width = Dimensions.get('window').width
    let height = Dimensions.get('window').height

    let size = this.getSize(width, height)
    size = size-2

    let rows = new Array(this.props.size).fill(0)
    let cols = new Array(this.props.size).fill(0)
    let board = this.props.BoardState

    return (
      <Layout>
        {
          rows.map((row, rowKey) => {
            return (
              <View key={rowKey} style={styles.row}>
                {
                  cols.map((col, colKey) => {
                    let color = undefined
                    let disabled = false
                    if (board.getIn([rowKey, colKey]) === 'B ') {
                      color = 'white'
                    }
                    else if (board.getIn([rowKey, colKey]) === 'N ') {
                      color = '#434343'
                    }
                    else if (board.getIn([rowKey, colKey]) === 'CM') {
                      color = 'red'
                    }
                    return (
                      <TouchableHighlight 
                        style={styles.col}
                        key={colKey} 
                        onPressIn={()=>{
                          this.moveHandle(rowKey, colKey)
                        }}
                      >
                        <View>
                          <Cell 
                            chip={color} 
                            disabled={disabled} 
                            size={size} 
                            color={color} 
                          />
                        </View>
                      </TouchableHighlight>
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

function mapDispatchToProps(dispatch, props) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

function mapStateToProps(state, props) {
  let BoardState = state.get('gameplay').get('state')
  let size = state.get('gameplay').get('size')
  return {
    BoardState,
    size
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  col: {
  }
})



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardContainer)
