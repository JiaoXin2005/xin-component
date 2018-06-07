import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import anime from 'animejs'
class InkBarAni extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return false
  }
  componentDidMount () {
    this.$node = ReactDOM.findDOMNode(this)
  }
  componentWillReceiveProps (nextProps) {
    anime({
      targets: this.$node,
      translateX: [{
        value: nextProps.left,
        duration: 800
      }],
      width: {
        value: nextProps.width,
        duration: 200
      }
    })
  }
  render () {
    return (
      <Fragment>
        { this.props.children }
      </Fragment>
    )
  }
}

export default InkBarAni
