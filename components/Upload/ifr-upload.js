/**
 * @author joe.zhou
 * @date 2017-11-06
 * iframe 无刷新提交方式（对于不支持FormData 浏览器的兼容）
 */
import React, { Component } from 'react'

function noop() { }
class IfrUpload extends Component {
  constructor(props) {
    super(props)
    this.frameName = 'frame_' + new Date().getTime()
    this.onChange = this.onChange.bind(this)
    this.iframeLoaded = this.iframeLoaded.bind(this)
  }

  static defaultProps = {
    onError: noop,
    onSuccess: noop,

  }

  // ------------------- 自定义方法区 ----------------------
  onChange(e) {
    const files = e.target.files
    if (files) {
      if (files[0].size > 5 * 1024 * 1024) {
        return this.props.onError('文件不能大于5MB')
      }
      this.uploadFiles(files)
    }
  }

  uploadFiles(files) {
    if (this.submitting) return null
    this.submitting = true
    let inputs = []
    let data = this.props.data || {}
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        inputs.push(`<input name="${key}" value="${data[key]}"/>`)
      }
    }
    this.$data.innerHTML = inputs.join('')
    this.$form.submit()
    this.$data.innerHTML = ''
  }

  iframeLoaded() {
    this.submitting = false
    let pre = this.$iframe.contentDocument.getElementsByTagName('pre')[0]
    if (!pre) {
      return null
    }
    let text = pre.innerHTML
    if (!text) return this.props.onError('请求出错')
    try {
      this.props.onSuccess(JSON.parse(text))
    } catch (e) {
      this.props.onError(text)
    }
  }

  // ---------------------react 函数区 ----------------------

  componentDidMount() {
  }

  render() {
    return (
      <div className="upload-picker">
        {this.props.children}
        <iframe onLoad={this.iframeLoaded} ref={e => this.$iframe = e} name={this.frameName}></iframe>
        <form ref={e => this.$form = e} action={this.props.action} target={this.frameName} method="POST" encType="multipart/form-data">
          <input ref={e => this.$input = e} name="file" type="file" className="upload-picker-origin" accept={this.props.accept} onChange={this.onChange} />
          <span ref={e => this.$data = e}></span>
        </form>
      </div>
    )
  }
}


export default IfrUpload