import React from 'react';
import './style.scss';

const prefixCls = 'loading-circle';

export default class LoadingCircle extends React.Component {
  render() {
    return (
      <div className={`t-c`}>
        <div className={`${prefixCls}-box gray-9`}>
          <div className={`${prefixCls}-item`}><i className={`loading-circle-1 xuicon xuicon-loading1`}/></div>
          <div className={`${prefixCls}-item`}><i className={`loading-circle-2 xuicon xuicon-loading1`}/></div>
          <div className={`${prefixCls}-item`}><i className={`loading-circle-3 xuicon xuicon-loading1`}/></div>
        </div>
      </div>
    )
  }
};


