import React, { Component, PureComponent }  from 'react'
import Cell from '../components/Cell'
import Chip from '../components/Chip'

class CellContainer extends PureComponent {
  state = {
    animChange: 'blue'
  }

  render () {
    const chip = this.props.chip
    const color = this.props.color
    const size = this.props.size
    const animChange = this.state.animChange

    return (
      <Cell size={size}>
        {
          chip &&
          <Chip size={size-10} color={color}/>
        }
      </Cell>
    )
  }
}

export default CellContainer
