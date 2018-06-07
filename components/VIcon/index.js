import React from 'react'
import PropTypes from 'prop-types'
import Classnames from 'classnames'
import './style/VIcon.scss!'

/**
 * V标
 * @example ./examples/Readme.md
 */

function VIcon (props) {
  let calssString = Classnames(props.className, 'xui-vicon', 
    `xui-vicon-${props.type}-${props.num}`, props.size)
  return (
    <i className={calssString} >
      <es-style />    
    </i>
  )
}

VIcon.propTypes = {
  /** 只支持lg  */
  size: PropTypes.string,
  /** orange 或者 blue  */
  type: PropTypes.string,
  /** 0-16 */
  num: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default VIcon
