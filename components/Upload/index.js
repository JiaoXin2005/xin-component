/**
 * @author joe.zhou
 * @date 2017-11-06
 */
import Upload from './uploader'
import IfrUpload from './ifr-upload'
import React, { Component } from 'react'

function noop() { }
class Juploader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      photoUrl: props.photoUrl || ''
    }
    this.onSuccess = this.onSuccess.bind(this)
    this.delPhoto = this.delPhoto.bind(this)
  }

  static defaultProps = {
    tip: '文件大小<3M，尺寸最好>500X500',
    delPhoto: noop
  }

  delPhoto() {
    this.setState({
      photoUrl: ''
    })
    this.props.delPhoto()
  }

  onSuccess(res, file) {
    if (this.props.photo && Array.isArray(res.data)) {
      this.setState({
        photoUrl: res.data[0].url
      })
    }
    this.props.onSuccess(res, file)
  }


  componentWillReceiveProps(nextProps, props) {
    if (typeof nextProps.photoUrl === 'string') {
      this.setState({
        photoUrl: nextProps.photoUrl
      })
    }
  }

  render() {
    const uploaderProp = {
      onSuccess: this.onSuccess,
      onProgress: function (e) {
        console.log(e.percent)
      },
      action: this.props.action,
      onError: this.props.onError || noop
    }

    const trigger = this.props.trigger || this.props.children
    const tip = <span className="mgL-5 txt-sm c02">{this.props.tip}</span>
    const UploadComponent = (typeof FormData !== 'undefined')
      ? <Upload {...uploaderProp}>{trigger}</Upload>
      : <IfrUpload {...uploaderProp}>{trigger}</IfrUpload>

    if (this.props.photo) {
      return (
        <div className="j-uploader j-img-uploader">
          <div className="img-frame" style={this.state.photoUrl ? { backgroundImage: "none" } : {}}>{this.state.photoUrl && <div className="img" style={{ backgroundImage: `url(${this.state.photoUrl})` }}><span className="icon-close" onClick={this.delPhoto}>X</span></div>}</div>
          <div className="upload-picker-wrapper mgT-10">
            {UploadComponent}
            {tip}
          </div>
        </div>
      )
    }

    return (
      <div className="upload-picker-wrapper j-uploader">
        {UploadComponent}
        {tip}
      </div>
    )
  }
}

export default Juploader