import React, { Component } from 'react'

export default class InkBar extends Component {
  getOffset () {
    let box = this.inkBar.getBoundingClientRect()
    let html = this.inkBar.ownerDocument.documentElement
    return {
      left: box.left + window.pageXOffset - html.clientLeft,
      top: box.top + window.pageYOffset - html.clientTop
    }
  }
  getRefs (ref) {
    return (e) => {
      this[ref] = e
    }
  }
  render () {
    let { className, width, left } = this.props
    return (
      <div 
        ref={this.getRefs('inkBar')}
        className={className}
        role="ink-bar">
      </div>
    )
  }
}