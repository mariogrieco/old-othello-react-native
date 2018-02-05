import React, { Component }  from 'react'
import Cell from '../components/Cell'
import Chip from '../components/Chip'

class CellContainer extends Component {
  render () {
    const chip = this.props.chip
    const color = this.props.color
    const size = this.props.size

    return (
      <Cell size={size}>
        {
          chip &&
          <Chip size={size-8} color={color}/>
        }
      </Cell>
    )
  }
}

export default CellContainer
