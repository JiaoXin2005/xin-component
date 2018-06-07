import React, { Component } from 'react'
import { Link, withRouter } from 'award/router'
// import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import './style.scss'
/**
 * a simple pagination for SSR
 * curPage, total, pageSize, totalPage, genPageUrl, onPageChange
 */
function noop() {}

@withRouter
export default class PaginationSimple extends Component {
  state = {
    toPage: ''
  }
  handleChange = (page) => {
    this.setState({
      toPage: page
    })
  }
  changePage = (e, page) => {
    e.preventDefault()
    this.setState({
      toPage: ''
    })
    const { onPageChange = noop } = this.props
    onPageChange(page)
    const { history, genPageUrl } = this.props
    const to = genPageUrl(page)
    console.log('to: ', to)
    history.push(to)
  }
  render () {
    const { toPage } = this.state
    const {curPage, total, pageSize, totalPage, genPageUrl, onPageChange = noop, top = true,  x = '0', y = '0'} = this.props
    let finalTotalPage = totalPage
    if (!totalPage) {
      finalTotalPage = Math.ceil(total / pageSize)
    }
    const pageArray = genArray(curPage, finalTotalPage)
    const jumpDisabled = !(toPage && toPage <= finalTotalPage && toPage != curPage && toPage > 0)
    return (
      <nav className="pagination">
        <ul className="pagination-page">
          {
            curPage !== 1 && (
              <li className={`page-prev page-item`}>
                <Link top={top} x={x} y={y} className="page-link" to={genPageUrl(curPage - 1)} onClick={() => onPageChange(curPage - 1)} />
              </li>
            )
          }
          {
            pageArray.map((page, i) => {
              return (
                <li key={i} className={`page-item${page === curPage ? ' active' : ''}${( page==='.' || page==='..' ) ? ' page-omit': ''}`}>
                  <Link top={top} x={x} y={y} to={compose(genPageUrl, transformOmit)(page, curPage, finalTotalPage)} className="page-link" onClick={() => compose(onPageChange, transformOmit)(page, curPage, finalTotalPage)}>
                    <span>
                      {
                        page > 0 && page
                      }
                    </span>
                  </Link>
                </li>
              )
            })
          }
          {
            curPage !== finalTotalPage && (
              <li className={`page-next page-item`}>
                <Link top={top} x={x} y={y} className="page-link" to={genPageUrl(curPage + 1)} onClick={() => onPageChange(curPage + 1)} />
              </li>
            )
          }
        </ul>
        <div className="quick-jump">
          <form>
            <input type="number" placeholder="请输入页码" step="1" min="1" max={finalTotalPage} className="control-input" onChange={(e) => this.handleChange(e.target.value)} value={toPage}/>
            <button disabled={jumpDisabled} type='submit' className={jumpDisabled ? 'btn disabled' : 'btn'} onClick={(e) => this.changePage(e, toPage)}>跳转</button>
          </form>
        </div>
      </nav>
    )
  }
}

function genArray (curPage, totalPage) {
  if (totalPage < curPage || curPage < 1) {
    console.warn('invalid curPage!', curPage, totalPage)
  }
  // 取中间部分为长度5
  if (totalPage < 8) {
    return metaArray(1, totalPage)
  } else {
    if (curPage - 2 - 1 > 2) {
      // left omit
      if (totalPage > curPage + 2 + 2 ) {
        // right omit
        // [1, '...', curPage-2, curPage-1, curPage, curPage+1, curPage+2, '...', totalPage]
        return [1, '.', ...metaArray(curPage-2, 5), '..', totalPage]
      } else {
        // no right omit
        // [1, '...', curPage-2 to totalPage]
        if (totalPage < curPage + 2) {
          // complete the 5
          return [1, '.', ...metaArray(totalPage-4, 5)]
        }
        return [1, '.', ...metaArray(curPage-2, totalPage-curPage+3)]
      }
    } else {
      // no left omit
      if (totalPage > curPage + 2 + 2) {
        // right omit
        // [1 to curPage+2, '...', totalPage]
        if (curPage < 4) {
          // complete to 5
          return [...metaArray(1, 5), '..', totalPage]
        }
        return [...metaArray(1, curPage+2), '..', totalPage ]
      } else {
        // no right omit
        // [1 to totalPage]
        // same as the first situation
        return metaArray(1, totalPage)
      }
    }
  }

}
/** make metaArray
* [start, start+1, ....., start+length-1]
* e.g: metaArray(1, 5) === [1,2,3,4,5]
* */
function metaArray (start, length) {
  return [...new Array(length)].map((_, i) => i+start)
}

function transformOmit (page, curPage, totalPage) {
  if (typeof page === 'number') {
    return page
  } else if (page === '.') {
    // left omit
    if (curPage > 6) {
      return curPage - 5
    }
    return 1
  } else if (page === '..') {
    // right omit
    if (curPage < totalPage - 5) {
      return curPage + 5
    }
    return totalPage
  }
}

function compose (f, g) {
  return (...h) => f(g(...h))
}
