import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Option from './Option'
import './style.scss'

const prefixCls = 'xui-select'

class Select extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      value: null,
      openOptions: false,
      labelValue: '请选择'
    }
    this.setDefaultValue()
  }

  getChildContext = () => {
    return {
      Select: this
    }
  }

  setDefaultValue = () => {
    React.Children.forEach(this.props.children, (child) => {
      if (child.props.value === (this.props.defaultValue || this.props.value)) {
        this.state.labelValue = child.props.children
      }
    })
  }

  onOptionClick = (option) => {
    let { onChange } = this.props
    let { openOptions, labelValue } = this.state
    labelValue = option.currentLabel()
    let currentValue = option.currentValue()
    openOptions = false
    this.setState({ openOptions, labelValue, value: currentValue})
    // console.log('currentValue:', currentValue);

    onChange(currentValue)
  }

  handleOpenOptions = () => {
    this.setState({ openOptions: !this.state.openOptions})
  }

  saveRef = (name) => (el) => {
    this[name] = el
  }

  renderArrow = () => {
    let arrowCls = this.state.openOptions ? 'arrow-top' : 'arrow-bottom'
    return <span className={`arrow ${arrowCls}`} />
  }

  handleClickOutside = (e) => {
    if (!this.$select.contains(e.target)) {
      if (this.state.openOptions) {
        this.setState({openOptions: false})
      }
    }
  }

  componentDidMount () {
    document.addEventListener('click', this.handleClickOutside, true)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleClickOutside, true)
  }

  render () {
    let { openOptions, labelValue } = this.state
    let { children, className = '', ...other } = this.props
    let optionsClass = classNames(`${prefixCls}-options`, {
      [`${prefixCls}-options_hide`]: !openOptions,
    })

    return (
      <div {...other} className={`${prefixCls} ${className}`}
           ref={this.saveRef('$select')}>
        <div className={`${prefixCls}-input`}
             onClick={this.handleOpenOptions}>
          {labelValue}
          {this.renderArrow()}
        </div>
        <ul className={optionsClass}>
          {children}
        </ul>
      </div>
    )
  }
}

Select.childContextTypes = {
  Select: PropTypes.any
}

Select.propTypes = {
  defaultValue: PropTypes.any,
  onChange: PropTypes.func
}

export default Select
