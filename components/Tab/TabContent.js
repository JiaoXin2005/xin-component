import React, { Component } from 'react'
import classnames from 'classnames'
export default class extends Component {
  getTabPanels () {
    const { panels, classPrefix, activeIndex, removeDom } = this.props
    return React.Children.map(panels, (child) => {
      if (!child) {
        return
      }
      const order = parseInt(child.props.order, 10)
      const isActive = order === activeIndex
      return React.cloneElement(child, {
        isActive,
        classPrefix,
        children: child.props.children,
        removeDom
      })
    })
  }
  render () {
    const { classPrefix } = this.props
    let classname = classnames({
      [`${classPrefix}tab-content`]: true
    })
    return (
      <div
        role="tab-content"
        className={classname}>
        { this.getTabPanels() }
      </div>
    )
  }
}