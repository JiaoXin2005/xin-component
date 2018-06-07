import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Transition, CSSTransition } from 'react-transition-group'
import Animate from 'rc-animate'
import classNames from 'classnames'
import Portal from './Portal'
import './style.scss!'

const prefixCls = 'xui-modal'
const KEY_CODE = {
  ESC: 27
}

class Modal extends Component {
  constructor (props, context) {
    super(props, context)
  }

  componentWillMount () {
  }

  componentDidMount () {

  }

  componentDidUpdate(prevProps) {
    const props = this.props
    // 聚焦 让esc可点击
    if (props.visible) {
      if (!prevProps.visible) {
        this.addMotionEffect()
        this.wrap.focus()
      }
    }
  }

  onKeyDown = (e) => {
    if (e.keyCode === KEY_CODE.ESC) {
      this.close(e)
    }
  }

  close = (e) => {
    const { onClose } = this.props
    if (onClose) {
      onClose(e)
    }
  }

  onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      this.close(e)
    }
  }

  saveRef = (name) => (node) => {
    this[name] = node
  }

  addMotionEffect = () => {
    let className = this.rootContainer.className
    this.rootContainer.className = removeClass(className, `${prefixCls}-hidden`)
    document.body.style.overflow = 'hidden'
  }

  removeMotionEffect = () => {
    this.rootContainer.className = this.rootContainer.className.trim()
    this.rootContainer.className += ` ${prefixCls}-hidden`
    document.body.removeAttribute('style')
  }

  getMaskElement = () => {
    let { visible } = this.props
    let maskElement = <div className={`${prefixCls}-mask`} onClick={this.onMaskClick}></div>
    function onEnter(node, is) {
      let parentNode = node
      let className = parentNode.className
      parentNode.className = removeClass(className, `${prefixCls}-hidden`)
    }

    function onExited(node) {
      let parentNode = node
      parentNode.className = parentNode.className.trim()
      setTimeout(() => {
        parentNode.className += ` ${prefixCls}-hidden`
      }, 100);
    }
    return (
      <Transition
        appear
        in={visible}
        timeout={100}
      >
        {(status) => (<div className={`${prefixCls}-mask fade-${status}`}></div>)}
      </Transition>
    )
  }



  removeHiddenEffect = () => {
    let className = this.rootContainer.className
    this.rootContainer.className = removeClass(className, `${prefixCls}-hidden`)
  }

  getModalElement = () => {
    const props = this.props
    const {visible} = props;

    let header
    if (props.title) {
      header = (
        <div className={`${prefixCls}-header`}>{props.title}</div>
      )
    }

    let footer
    if (props.footer) {
      footer = (<div className={`${prefixCls}-footer`}>{props.footer}</div>)
    }

    let closeBtn = props.closeBtn ? props.closeBtn : <span className={`${prefixCls}-closeBtn`} onClick={this.close}><i className='xuicon xuicon-cha'></i></span>

    return (
      <Transition
        appear
        timeout={200}
        onExited={() => { this.removeMotionEffect()}}
        in={visible}>
        {
          (status) => (
            <div className={`${prefixCls} modal-slide-${status}`} style={this.props.style}>
              <div className={`${prefixCls}-content`}>
                {closeBtn}
                {header}
                <div className={`${prefixCls}-body`}>{this.props.children}</div>
                {footer}
              </div>
            </div>
          )
        }
      </Transition>
    )
  }

  render () {
    const { children, visible, birthRender } = this.props

    return (
      <Portal {...this.props} >
        <div ref={this.saveRef('rootContainer')}>
          {this.getMaskElement()}

          <div className={`${prefixCls}-wrap`}
               ref={this.saveRef('wrap')}
               tabIndex={-1}
               onClick={this.onMaskClick}
               onKeyDown={this.onKeyDown}>
            {this.getModalElement()}
          </div>

          <es-style/>
        </div>
      </Portal>
    )
  }
}

function removeClass (classNameStr, className) {
  return classNameStr.replace(new RegExp('(^|\\b)' + className + '(\\b|$)', 'gi'), '')
}

Modal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func
};

Modal.defaultProps = {
};

export default Modal
