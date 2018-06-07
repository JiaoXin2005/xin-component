/**
 * @author joe.zhou
 * @ date 2017-11-06
 * @ react 上传组件
 */
import React, { Component } from 'react'
import httpRequest from './ajax'
function noop() { }
class Juploader extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  static defaultProps = {
    onError: noop,
    onProgress: noop,
    onSuccess: noop,
    headers: {}
  }

  onChange(e) {
    const files = e.target.files
    if (!files) return
    if (files[0].size > 5 * 1024 * 1024) {
      return this.props.onError('文件不能大于5MB')
    }
    this.uploadFiles(files)
  }

  uploadFiles(files) {
    let postFiles = Array.prototype.slice.call(files)
    if (!this.multiple) {
      postFiles.slice(0, 1)
    }
    if (postFiles.length === 0) return null

    postFiles.forEach(rawFile => {
      this.upload(rawFile)
    })
  }

  upload(rawFile) {
    this.$input.value = null
    this.post(rawFile)
  }

  post(rawFile) {
    const options = {
      headers: this.props.headers,
      file: rawFile,
      data: this.props.data,
      filename: this.props.name || rawFile.name,
      size: rawFile.size,
      action: this.props.action,
      onProgress: e => {
        this.props.onProgress(e, rawFile)
      },
      onSuccess: res => {
        this.props.onSuccess(res, rawFile)
      },
      onError: err => {
        this.props.onError(err, rawFile)
      },
    }

    const req = httpRequest(options)

  }

  render() {
    return (
      <div className="upload-picker">
        {this.props.children}
        <input ref={e => this.$input = e} name="file" type="file" className="upload-picker-origin" accept={this.props.accept} onChange={this.onChange} />
      </div>
    )
  }
}

export default Juploader