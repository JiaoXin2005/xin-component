import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export default class Protal extends React.Component {

  componentWillUnmount () {
    this.removeContainer()
  }

  createContainer () {
    this._container = document.createElement('div')
    document.body.appendChild(this._container)
    // this.forceUpdate()
  }

  removeContainer () {
    if (this._container) {
      this._container.parentNode.removeChild(this._container)
    }
  }

  render () {
    const { visible } = this.props
    if (visible || this._hasRendered) {
      this._hasRendered = true
      !this._container && this.createContainer()
      return ReactDOM.createPortal(this.props.children, this._container)
    }
    return null
  }
}
