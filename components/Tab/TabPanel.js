import { Component } from 'react'
import classnames from 'classnames'
export default class extends Component {
  render() {
    const { classPrefix, isActive, removeDom } = this.props
    let classname = classnames({
      [`${classPrefix}tab-panel`]: true,
      'active': isActive
    })
    if (removeDom && !isActive) {
      return null
    }
    return (
      <div
        role="tab-panel"
        className={classname}>
        { this.props.children }
      </div>
    )
  }
}