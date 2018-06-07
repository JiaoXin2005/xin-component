import React, { Component } from 'react'
import TabContent from './TabContent'
import TabNav from './TabNav'
import TabPanel from './TabPanel'
import './style.scss!'
class Tabs extends Component {
  static TabPanel = TabPanel
  static defaultProps = {
    classPrefix: '',
    defaultIndex: '0',
    pureTab: false
  }
  constructor (props) {
    super(props)
    let activeIndex
    if ('defaultIndex' in this.props) {
      activeIndex = parseInt(this.props.defaultIndex, 10)
    } else if ('activeIndex' in this.props) {
      activeIndex = parseInt(this.props.activeIndex, 10)
    }
    this.state = {
      activeIndex
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.defaultIndex !== this.props.defaultIndex) {
      this.setState({
        activeIndex: nextProps.defaultIndex
      })
    }
  }
  handleTabClick = (activeIndex) => {
    let prevIndex = this.state.activeIndex
    let { onChange, pureTab } = this.props
    console.log('handleClick')
    if (prevIndex === activeIndex) {
      return null
    }
    if (this.props.pureTab || onChange) {
      return typeof onChange === 'function' ? onChange(activeIndex, prevIndex) : void(0)
    }
    this.setState({
      activeIndex
    })
  }
  renderTabNav () {
    let { classPrefix, children, inkBar, navAlign, navTitle, sticky } = this.props
    let activeIndex = this.state.activeIndex
    classPrefix ? classPrefix += '-' : void(0)
    return (
      <TabNav
        classPrefix={classPrefix}
        panels={children}
        activeIndex={activeIndex}
        onTabClick={this.handleTabClick}
        inkBar={inkBar}
        navAlign={navAlign}
        navTitle={navTitle}
        sticky={sticky}
      />
    )
  }
  renderTabContent () {
    let activeIndex = this.state.activeIndex
    let { classPrefix, children, removeDom } = this.props
    classPrefix ? classPrefix += '-' : void (0)
    return (
      <TabContent
        classPrefix={classPrefix}
        panels={children}
        activeIndex={activeIndex}
        removeDom={removeDom}
      />
    )
  }
  render () {
    let { classPrefix, style } = this.props
    classPrefix = classPrefix ? `${classPrefix}-`: ''
    return (
      <div
        style={style}
        role="tabs"
        className={`${classPrefix}tabs`}>
        { this.renderTabNav() }
        { this.renderTabContent() }
        <es-style/>
      </div>
    )
  }
}

export default Tabs
