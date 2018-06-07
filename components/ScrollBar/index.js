import PerfectScrollbar from 'perfect-scrollbar'
import ReactDOM from 'react-dom'
import React, { Component } from 'react'
class ScrollBar extends Component {
  componentDidMount () {
    const node  = ReactDOM.findDOMNode(this)
    this.ps = new PerfectScrollbar(node, {
      minScrollbarLength: 5
    })
  }
  componentWillUnmount () {
    this.ps.destroy()
    this.ps = null
  }
  render () {
    return this.props.children
  }
}

export default ScrollBar
