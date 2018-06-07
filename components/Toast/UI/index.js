import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createAction } from '../../../utils/index'
import './style.scss!'

const prefixCls = 'xui-toast'

class ToastUI extends Component {
  constructor(props) {
    super(props)

  }

  componentWillReceiveProps (nextProps) {

    let { visible, message } = nextProps.Toast

    if (nextProps.Toast.visible) {

      !this._container && this.createContainer()

      this.timer = setTimeout(() => {
        this.props.dispatch(
          createAction('Toast/hide')()
        )
        this.removeContainer()
      }, 1500);
    }

  }

  componentDidMount () {
  }

  createToast () {
    let { message, visible } = this.props.Toast    
    let style = visible ? {} : { display: 'none' }    
    return (
      <div className={`${prefixCls}`} style={style}>
        {message}
        <es-style/>
      </div>
    )
  }

  createContainer() {
    this._container = document.createElement('div')
    document.body.appendChild(this._container)
  }

  removeContainer () {
    if (this._container) {
      this._container.parentNode.removeChild(this._container);
      this._container = null
    }
  }

  render () {
    let { message, visible } = this.props.Toast
    let styles = visible ? {} : {display: 'none'}

    if (this._container) {
      return ReactDOM.createPortal(this.createToast(), this._container)
    }
    return null
  }
}

export default ToastUI