import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './style/Button.scss'

/**
 * 按钮组件
 * @example ./examples/Readme.md
 */
const prefixCls = 'xui-btn' // 组件命名空间

export default class Button extends Component {
  constructor (props) {
    super(props)
    this.state = {
      clicked: false
    }
  }

  handleClick = (e) => {
    clearTimeout(this.timeout)
    this.setState({'clicked': true})
    this.timeout = window.setTimeout(() => this.setState({clicked: false}), 500)
    let onClick = this.props.onClick
    if (onClick) {
      onClick(e)
    }
  }

  render () {
    var { className, icon, children, size, type, gradient, ...other } = this.props
    const {clicked} = this.state
    const ComponentProp = other.href ? 'a' : 'button';
    
    // 按钮大小
    let sizeCls = ''
    switch (size) {
      case 'large':
        sizeCls = 'lg';
        break;
      case 'small':
        sizeCls = 'sm';
      default:
        break;
    }
    
    const classes = classNames(prefixCls, className, {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-gradient`]: gradient,      
      [`${prefixCls}-clicked`]: clicked
    })

    const iconNode = icon ? (<i className={`xuicon xuicon-${icon}`} />) : null

    return (
      <ComponentProp {...other} className={classes} onClick={this.handleClick}>
        {iconNode}
        {children} 
      </ComponentProp>
    )
  }
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  type: PropTypes.oneOf(['dashed', 'primary']),
  size: PropTypes.oneOf(['small', 'default', 'large']),
  style: PropTypes.object,
  icon: PropTypes.string,
  href: PropTypes.string
}

Button.defaultProps = {
  type: 'primary',
  size: 'default'
}
