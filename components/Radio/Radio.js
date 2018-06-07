import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './style.scss!'

class Radio extends Component {

  constructor (props) {
    super(props)
    this.state = {
      checked: this.props.checked
    }
  }
  
  componentWillReceiveProps (nextProps) {
    let { checked } = nextProps
    if (this.state.checked !== checked) {
      this.setState({ checked })
    }
  }

  handleChange = (e) => {
    let { onChange } = this.props
    const checked = e.target.checked;

    if (checked) {
      if (onChange) { onChange(this.props.value) }
    }
    this.setState({ checked })
  }

  handleFocus = (e) => {
    this.setState({
      focus: true
    })
  }

  handleBlur = (e) => {
    this.setState({
      focus: false
    })
  }

  render () {
    let { style, className, disabled, value, children } = this.props
    const { checked, focus } = this.state
    return (
      <label className={classNames('xui-radio', className)} >
        <span className={classNames('xui-radio_input', {
          'is-checked': checked,
          'is-disabled': disabled,
          'is-focus': focus
        })}>
          <span className="xui-radio_inner"></span>
          <input type="radio"
            className="xui-radio_original"
            checked={checked}
            disabled={disabled}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </span>
        <span className='xui-radio_label'> {children || value}</span>
        <es-style/>
      </label>
    )
  }
}

Radio.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
}

export default Radio