import React, { Component } from 'react'
import { connect } from 'react-redux'
import SvgIcon from '../../../../SvgIcon'

@connect()
class DownloadBtn extends Component {

  /* 下载弹窗 */
  handleDownload = (e) => {
    e.preventDefault()
    this.props.dispatch({ type: 'DownloadDialog/openDownloadDialog'})
  }
  
  render () {
    return (
      <a src='javascript:;' className='btn' onClick={this.handleDownload}>
        <SvgIcon icon='icon-quanjubofangqi-xiazai' width={18} height={18} />
      </a>
    )
  }
}

export default DownloadBtn