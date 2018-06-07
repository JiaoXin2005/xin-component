import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import RcTooltip from 'rc-tooltip'

import './style/ToolTip.scss!'

/**
 * 文字提示 https://github.com/react-component/tooltip
 * @example ./examples/Readme.md
 */

class ToolTip extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { children, overlay, title } = this.props

    return (
      <Fragment>
        <es-style/>
        <RcTooltip
          {...this.props}
          overlay={overlay || title || ''}
          transitionName='zoom-big-fast'
        >
          {children}
        </RcTooltip>
      </Fragment>
    )
  }
}

ToolTip.propTypes = {
  'placement': PropTypes.string,
  /** @ignore */
  'prefixCls': PropTypes.string,
  'overlay': PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  'trigger': PropTypes.oneOf(['hover', 'click', 'focus'])
}
ToolTip.defaultProps = {
  'prefixCls': 'xui-tooltip',
  'placement': 'top',
  'trigger': 'hover'
}


export default ToolTip
