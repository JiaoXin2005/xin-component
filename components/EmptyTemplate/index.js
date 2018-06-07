import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.scss'

/**
 * EmptyTemplate
 * @example ./examples/Readme.md
 */
export default class EmptyTemplate extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  static defaultProps = {
    test: 'EmptyTemplateDefault'
  }

  static propTypes = {
    test: PropTypes.string
  }

  render () {
    const {test} = this.props
    return (
      <div>
        {test}
      </div>
    )
  }
}
