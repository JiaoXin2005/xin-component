import React from 'react';
import './CounterBox.scss';


const PREFIX_CLS = 'counter-box';

/*
hasRead?boolean
hasCount?boolean
count?number
positionType
 */


export default class CounterBox extends React.Component {
  render() {
    const type = this.props.hasRead ? 'grey' : 'orange';
    const hasCount = typeof this.props.hasCount === 'undefined' ? true : this.props.hasCount;
    const hasCountCls = hasCount ? '' : `${PREFIX_CLS}-dot`;
    const count = this.props.count;
    const countTxt = this.props.count ? this.props.count > 99 ? '99+' : this.props.count : 0;
    const positionType = typeof this.props.positionType === 'undefined' ? 'right' : this.props.positionType;
    return (
      count > 0 ? (
          <div className={`${PREFIX_CLS} ${PREFIX_CLS}-${positionType}`}>
            <div className={`${PREFIX_CLS}-content ${PREFIX_CLS}-${type}  ${count >= 10 ? 'counter-box-width' : ''} ${hasCountCls}`}>{countTxt}</div>
          </div>
        )
        : null);
  }
}