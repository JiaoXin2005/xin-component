import React, { Component } from 'react'
import PropTypes from 'prop-types'

const prefixCls = 'xui-select'

class Option extends Component {

  handleClickItem = () => {
    this.parent().onOptionClick(this)
  }

  parent = () => {
    return this.context.Select
  }

  currentLabel = () => {
    return this.props.children
  }

  currentValue = () => {
    return this.props.value
  }

  render () {
    let {style} = this.props
    return (
      <li style={style} className={`${prefixCls}-options_item`}
        onClick={this.handleClickItem}
        >{this.props.children}</li>
    )
  }
}

Option.contextTypes = {
  Select: PropTypes.any
}

Option.propTypes = {
  value: PropTypes.any.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default Option