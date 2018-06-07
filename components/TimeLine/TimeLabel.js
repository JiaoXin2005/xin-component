import React, { Component } from 'react'
import classname from 'classnames'
import './timelabel.scss'
class TimeLabel extends Component {
  static defaultProps = {
    labelAlign: 'right',
    offsetX: 20
  }
  
  getDefaultLabel (text) {
    const { labelAlign } = this.props
    return (
      <div className={`timeline-label__tag ${labelAlign}`}>{text}</div>
    )
  }
  render () {
    let { labelAlign, offsetX, label } = this.props
    offsetX = parseFloat(offsetX)
    if (isNaN(offsetX)) {
      throw new Error('输入的offsetX必须为数值')
    }
    let labelEle = label ? (typeof label === 'object' ? label : this.getDefaultLabel(label)) : this.getDefaultLabel('')
    let styles = {
      position: 'relative'
    }
    let baddgeStyle = {
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      top: '50%',
      zIndex: 3
    }
    if (labelAlign === 'right') {
      styles['marginLeft'] = offsetX
      baddgeStyle['left'] = -1 * offsetX
    } else {
      styles['marginRight'] = offsetX
      styles['transform'] = 'translate(-100%, 0)'
      baddgeStyle['right'] = -1 * offsetX
    }
    return (
      <div style={styles} className="timeline-label">
        { labelEle }
        <div style={baddgeStyle} className="timeline-label__baddge"></div>
      </div>
    )
  }
}

export default TimeLabel
