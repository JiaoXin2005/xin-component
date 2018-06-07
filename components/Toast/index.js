import Award from 'award'
import { Component } from 'react'
import { connect } from 'react-redux'
import model from './model'
import UI from './UI'

// 添加model
Award.registerModel(model)

@connect(({ Toast }) => {
  return { Toast }
})
class Toast extends Component {
  render() {
    return (
      <UI {...this.props} />
    )
  }
}

export default Toast
