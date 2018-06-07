import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'


class RadioGroup extends Component {

  constructor (props) {
    super(props)
  }

  onChange = (value) => {
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  render () {
    let { children , style, className } = this.props
    return (
      <div style={style} className={classNames(className, 'xui-radio-group')} >
        {
          React.Children.map(children, (element) => {
            if (!element) return null
            const { elementType } = element.type

            return React.cloneElement(element, Object.assign({}, element.props, {
              onChange: this.onChange.bind(this),
              checked: String(this.props.value) === String(element.props.value)
            }))
          })
        }
      </div>
    )
  }
}

RadioGroup.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func
}

export default RadioGroup