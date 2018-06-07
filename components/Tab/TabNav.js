import React, { Component } from 'react'
import ReactDom from 'react-dom'
import classnames from 'classnames'
import InkBar from './InkBar'
import InkBarAni from './inkBarAni'
function getOuterWidth(el) {
  return el.offsetWidth
}
function getOffset(el) {
  const html = el.ownerDocument.documentElement
  const box = el.getBoundingClientRect()
  return {
    top: box.top + window.pageYOffset - html.clientTop,
    left: box.left + window.pageXOffset - html.clientLeft
  }
}
function getComputedStyle (el) {
  return (
    el.currentStyle ? el.currentStyle : window.getComputedStyle(el, null)
  )
}
export default class TabNav extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inkBarWidth: 0,
      inkBarLeft: 0
    }
  }
  
  onTabClick (activeIndex) {
    this.props.onTabClick(activeIndex)
  }
  getTabs () {
    const { panels, activeIndex, classPrefix } = this.props
    return React.Children.map(panels, (child) => {
      if (!child) {
        return 
      }
      const order = parseInt(child.props.order, 10)
      let isActive = order === activeIndex
      let events = {}
      if (!child.props.disabled) {
        events = {
          onClick: this.onTabClick.bind(this, order)
        }
      }
      let classname = classnames({
        'active': order === activeIndex,
        [`${classPrefix}tab-nav__tab`]: true
      })
      let tabElem = child.props.tab
      if (typeof tabElem === 'function') {
        tabElem = tabElem(isActive)
      }
      return (
        <li
          role="tab"
          key={order}
          className={classname}
          { ...events }>
          { tabElem }
        </li>
      )
    })
  }
  getRef (ref) {
    return (e) => {
      this[ref] = e
    } 
  }
  scrollHandler = (e) => {
    let {
      stickyEl, 
      rect, 
      stickyT, 
      stickyTop, 
      footerStyle, 
      footer,
      parentT, 
      footerMarginTop 
    } = this
    let stickyB = getOffset(footer).top
    let scrollT = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    stickyTop = parseInt(stickyTop, 10)
    if (scrollT + stickyTop > stickyT) {
      stickyEl.style.position = 'fixed'
      stickyEl.style.top = stickyTop + 'px'
      stickyEl.style.width = rect.width + 'px'
      stickyEl.style.zIndex = 6
      if (scrollT + rect.height + stickyTop + footerMarginTop > stickyB) {
        stickyEl.style.position = 'absolute'
        stickyEl.style.top = (stickyB - rect.height - parentT - footerMarginTop) + 'px'
      }
    } else {
      stickyEl.style.position = 'static'      
    }
  }
  initSticky (top) {
    if (!this.stickyEl) {
      let stickyEl = this.stickyEl || ReactDom.findDOMNode(this)
      let stickyHolder = document.createElement('div')
      let rect = stickyEl.getBoundingClientRect()
      let parent = stickyEl.parentNode
      let footer = document.getElementById('rootFooter')
      let footerMarginTop = getComputedStyle(footer)['marginTop']
  
      parent.replaceChild(stickyHolder, stickyEl)
      stickyHolder.appendChild(stickyEl)
      stickyHolder.style.height = rect.height + 'px'
      this.stickyEl = stickyEl
      this.rect = rect
      this.stickyT = getOffset(stickyHolder).top
      this.footer = footer
      this.parentT = getOffset(parent).top
      this.footerMarginTop = parseInt((footerMarginTop.replace(/px/, '')), 10)
      this.stickyTop = top
    } else {

    }
    window.removeEventListener('scroll', this.scrollHandler)
    window.addEventListener('scroll', this.scrollHandler)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.activeIndex !== this.props.activeIndex) {
      const { activeIndex } = nextProps
      const node = ReactDom.findDOMNode(this)
      const tabs = node.querySelectorAll('[role=tab]')
      const nav = node.querySelector('[role=tab-nav]')
      const el = tabs[activeIndex]
      this.setState({
        inkBarWidth: getOuterWidth(el),
        inkBarLeft: getOffset(el).left - getOffset(nav).left
      })
    }
  }
  componentDidUpdate (prevProps) {
    const { sticky } = this.props
    if (sticky) {
      this.initSticky(sticky)
    }
  }
  shouldComponentUpdate (nextProps, nextState) {
    if (
      nextState.inkBarLeft !== this.state.inkBarLeft || 
      nextState.inkBarWidth !== this.state.inkBarWidth
    ) {
      return true
    }
    return false
  }
  componentDidMount () {
    const { activeIndex, sticky } = this.props
    const node = ReactDom.findDOMNode(this)
    const tabs = node.querySelectorAll('[role=tab]')
    const nav = node.querySelector('[role=tab-nav]')
    const el = tabs[activeIndex]
    if (sticky) {
      this.initSticky(sticky)
    }
    this.setState({
      inkBarWidth: getOuterWidth(el),
      inkBarLeft: getOffset(el).left - getOffset(nav).left
    })
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this.scrollHandler)
  }
  render() {
    const { classPrefix, inkBar, navAlign, navTitle } = this.props
    const { inkBarWidth, inkBarLeft } = this.state
    return (
      <div style={{fontSize: 0}} className={`${classPrefix}tab-nav-wrap clearfix`}>
        <div style={{display: 'inline-block'}}>
          { navTitle }
        </div>
        <div style={{float: navAlign}} className={`${classPrefix}tab-nav`} role="tab-nav">
          <ul>
            { this.getTabs() }
          </ul>  
          {
            inkBar &&
            <InkBarAni width={inkBarWidth} left={inkBarLeft}>
              <InkBar
                className={`${classPrefix}ink-bar`}
                role="ink-bar" />
            </InkBarAni>
          }
          {/* { inkBar && 
            <Motion style={{left: spring(inkBarLeft)}}>
              {
                ({left}) => (
                  <InkBar
                    width={inkBarWidth}
                    left={left}
                    className={`${classPrefix}ink-bar`}
                    role="ink-bar" />
                )
              }
            </Motion>
          } */}
        </div>
      </div>
    )
  }
}
