import React, { Component } from 'react'
import classnames from 'classnames'
import TimeLable from './TimeLabel'
import './style.scss'
const TimeWrap = ({ children }) => (
  children
)
class TimeLine extends Component {
  static TimeWrap = TimeWrap
  static defaultProps = {
    align: 'left',
    bgColor: '#fff'
  }
  renderTimeLine () {
    const { children } = this.props
    return React.Children.map(children, (child) => {
      if (!child) return
      const { label } = child.props
      return (
        <React.Fragment>
          <TimeLable label={label}/>
          {React.cloneElement(child)}
        </React.Fragment>
      )
    })
  }
  render () {
    const { align, bgColor } = this.props
    let classes = classnames(align, 'timeline-wrap')
    return (
      <div style={{paddingTop: 3}} className={classes}>
        { this.renderTimeLine() }
      </div>
    )
  }
}

export default TimeLine
