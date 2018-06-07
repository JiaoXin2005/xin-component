import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import { Link } from 'award/router'
import './style/Tag.scss!'

const prefixCls = 'xui-tag' // 组件命名空间

class Tag extends Component {
  render () {
    const {children, className} = this.props
    const classes = classNames(prefixCls, className)

    return (
      <div className={classes}>
        <span className={`${prefixCls}-text`}>{children}</span>
        <es-style />
      </div>
    )
  }
}

Tag.propTypes = {

}

class TagLink extends Component {
  render () {
    let { meta, className, children } = this.props
    if (!meta.link) { 
      return null
    }
    return (<Tag className={className}>
      <Link to={meta.link} title={children || meta.metaDisplayName}>{children || meta.metaDisplayName}</Link>
      </Tag>)
  }
}

export { TagLink }

export default Tag
