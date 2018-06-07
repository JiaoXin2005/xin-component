import React, { Component } from 'react'
import Select, { Option } from '../Select'
import './style.scss'

let pageSizeArray = [
  {
    name: '20条',
    value: 20
  },
  {
    name: '50条',
    value: 50
  },
  {
    name: '100条',
    value: 100
  }
]

export default class ChangePageSize extends Component {
  render() {
    const { defaultSelectValue, onPageSizeChange } = this.props
    return (
      <div className='page-size-wrap'>
        <span className='page-size-label'>展示条数：</span>
        <Select
          className='page-size-select'
          value={defaultSelectValue}
          onChange={onPageSizeChange}
        >
          {
            pageSizeArray.map((item, index) => <Option value={item.value} key={index}>{item.name}</Option>)
          }
        </Select>
      </div>
    )
  }
}
