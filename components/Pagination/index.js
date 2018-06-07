import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.scss'
/**
 * improvement:
 * 1. 1,...,3,4,5,6,7 : is it normal?
 * 2. 1,2,....[..]...19,20 : custom head and tail
 */
function noop() {}

/**
 * Pagination =
 *    prevPage + firstPage
 *  + omitPart + midPart(..midPage..) + omitPart
 *  + lastPage + NextPage
 *  + JumpPage
 * @example ./examples/Readme.md
 */
export default class Pagination extends Component {
  constructor (props) {
    super(props)
    const {curPage, midPartLength, totalPageLimit, totalPage, total, pageSize} = this.props
    let tmpTotalPage
    if (!totalPage) {
      if (!total||!pageSize) {
        throw new Error('make sure total and pageSize exist !')
      }
      tmpTotalPage = Math.ceil(total/pageSize)
    } else {
      tmpTotalPage = totalPage
    }

    this.pageCount = !totalPageLimit ? tmpTotalPage : (totalPageLimit < tmpTotalPage ? totalPageLimit : tmpTotalPage)

    this.midPageCount = midPartLength

    this.pageArray = [...Array(this.pageCount)].map((_, i)=>i+1)

    let initState = this.calculateState(curPage)
    this.state = {
      ...initState,
      toPage: '',
      jumpDisabled: true
    }
  }

  static defaultProps = {
    curPage: 1,
    midPartLength: 5,
    // jumpPage: 1,
    // totalPage: 20,
    // 限制最多显示的页数
    // totalPageLimit: 50,
    onPageChange: noop,
  }

  static propTypes = {
    total: PropTypes.number,
    pageSize: PropTypes.number,
    curPage: PropTypes.number,
    midPartLength: PropTypes.number,
    // jumpPage: PropTypes.number,
    totalPage: PropTypes.number,
    // 限制最多显示的页数
    totalPageLimit: PropTypes.number,
    onPageChange: PropTypes.func,
  }

  calculateState = (v, needReCalculate) => {
    if(!needReCalculate && this.preV && this.preV === v) return;
    this.preV = v
    // console.log('set currentPage to ', v)
    let midPageList = this.generateMidArray(v)
    // console.log('midPageList: ', midPageList);

    let midPageListLength = midPageList.length
    var hideFirstPage, hideLastPage, hideLeftOmit, hideRightOmit
    if (!midPageListLength) {
      hideFirstPage = false, hideLastPage = false, hideLeftOmit = true, hideRightOmit = true
    } else {
      hideFirstPage = midPageList[0] === 1
      hideLastPage = midPageList[midPageList.length-1] === this.pageCount
      hideLeftOmit = midPageList[0] <= 2
      hideRightOmit = midPageList[midPageList.length-1] >= this.pageCount - 1
    }
    // console.log(midPageList)
    return {
      currentPage: v,
      midPart: midPageList,
      hideFirstPage: hideFirstPage,
      hideLastPage: hideLastPage,
      hideLeftOmit: hideLeftOmit,
      hideRightOmit: hideRightOmit
    }
  }

  changePage = (v, e) => {
    e && e.preventDefault()
    let nextState = this.calculateState(v)

    this.setState((prevState, props) => {
      return {
        ...nextState,
        jumpDisabled: !prevState.toPage || prevState.toPage === v
      }
    }, () => {
      this.props.onPageChange && this.props.onPageChange(v)
    })
  }

  generateMidArray = (currentPage) => {
    let N = this.midPageCount
    let size = this.pageCount
    // console.log('size', size);

    // size 非负正数
    if (size > 2 && size < N + 3) {
      // 除去首尾 取中间的做数组返回
      return increListMaker(size - 2, 2)
    } else if (size < 3) {
      return []
    }

    // for metaArray:[0,1,2,3,...] of midPageCount, it's linear and midValue = midIndex
    // let metaMidArray = [...Array(N)].map((_, i) => i)
    let midValue = (N - 1) >>> 1
    let offset = currentPage - midValue
    // calculate the list according to the currentPage
    let tmpMidPageList = increListMaker(N, offset)

    // valid and adjust the list to prevent overflow
    if (tmpMidPageList[0] > 1 && tmpMidPageList[N - 1] < size) {
      return tmpMidPageList
    } else if (tmpMidPageList[0] <= 1) {
      return increListMaker(N, 1)
      // [1] [2, 3]
      // return increListMaker(N, 2)
    } else if (tmpMidPageList[N - 1] >= size) {
      return increListMaker(N, size - N+1)
      // [size-2, size-1] [size]
      // return increListMaker(N, size - N)
    }

    function increListMaker (n, startFrom = 0) {
      return [...Array(n)].map((_, i) => i + startFrom)
    }
  }

  handleChange = (v) => {
    let page = +v||v
    let jumpDisabled = !this.pageArray.includes(page) || page===this.state.currentPage
    this.setState({
      toPage: page,
      jumpDisabled: jumpDisabled
    })
  }

  // curPage props change emit a re-render
  componentWillReceiveProps (nextProps) {
    // if curPage changed, will re-init the Pagination component
    if (nextProps.curPage !== this.props.curPage || nextProps.total !== this.props.total) {
      // console.log('nextProps curPage, total', nextProps.curPage, nextProps.total);

      const {curPage, midPartLength, totalPageLimit, totalPage, total, pageSize} = nextProps
      let tmpTotalPage
      if (!totalPage) {
        if (!total||!pageSize) {
          throw new Error('make sure total and pageSize exist !')
        }
        tmpTotalPage = Math.ceil(total/pageSize)
      } else {
        tmpTotalPage = totalPage
      }

      this.pageCount = !totalPageLimit ? tmpTotalPage : (totalPageLimit < tmpTotalPage ? totalPageLimit : tmpTotalPage)

      // console.log('this.pageCount: ', this.pageCount);

      this.midPageCount = midPartLength

      this.pageArray = [...Array(this.pageCount)].map((_, i)=>i+1)

      let initState = this.calculateState(curPage, true)
      this.setState({
        ...initState,
        toPage: '',
        jumpDisabled: true
      })
    }
  }

  render () {
    if (this.pageCount < 2) {
      // only one page, dont render
      return false
    }
    let { currentPage, midPart, hideFirstPage, hideLastPage, hideLeftOmit, hideRightOmit, toPage, jumpDisabled } = this.state
    return (
      <nav className="pagination">
        <ul className="pagination-page">
          { currentPage !== 1 && (
            <li className={ currentPage===1 ? 'page-prev page-item disabled' : 'page-prev page-item' }>
              <a className="page-link" href='javascript:;' onClick={(e) => this.changePage((--currentPage) < 1 ? currentPage = 1 : currentPage, e)}>
                {/* <span>&laquo;</span> */}
                {/* ❮ */}
              </a>
            </li>
          )}
          { !hideFirstPage && (
            <li className={ currentPage===1 ? "page-item active" : "page-item" }>
              <a href='javascript:;' className="page-link" onClick={(e) => this.changePage(1, e)}>
                <span>1</span>
              </a>
            </li>
          )}
          { !hideLeftOmit && (
            <li className="page-item page-omit">
              <a className="page-link" href='javascript:;' onClick={(e) => this.changePage((currentPage-=this.midPageCount) < 1 ? 1 : currentPage, e)}>
                {/* <span>...</span> */}
              </a>
            </li>
          )}
          {
            this.state.midPart.map((e, i) => {
              return (
                <li key={i} className={currentPage===e ? "page-item active":"page-item"}>
                  <a href='javascript:;' className="page-link" onClick={(event) => this.changePage(e, event)}>
                    <span>{e}</span>
                  </a>
                </li>
              )
            })
          }
          { !hideRightOmit && (
            <li className="page-item page-omit">
              <a className="page-link" href='javascript:;' onClick={(e) => this.changePage((currentPage+=this.midPageCount) > this.pageCount ? this.pageCount : currentPage, e)}>
                {/* <span>...</span> */}
              </a>
            </li>
          )}
          {!hideLastPage && (this.pageCount > 1) && (
            <li className={ currentPage===this.pageCount ? "page-item active" : "page-item" }>
              <a href='javascript:;' className="page-link" onClick={(e) => this.changePage(this.pageCount, e)}>
                <span>{this.pageCount}</span>
              </a>
            </li>
          )}
          {currentPage !== this.pageCount && (
            <li className={ currentPage===this.pageCount ? 'page-next page-item disabled' : 'page-next page-item' }>
              <a className="page-link" href='javascript:;' onClick={(e) => this.changePage((++currentPage) > this.pageCount ? currentPage = this.pageCount : currentPage, e)}>
                {/* <span>&raquo;</span> */}
                {/* ❯ */}
              </a>
            </li>
          )}
        </ul>
        <div className="quick-jump">
          <form>
            <input type="number" placeholder="请输入页码" step="1" min="1" max={this.pageCount} className="control-input" onChange={(e)=>this.handleChange(e.target.value)} value={toPage}/>
            <button disabled={jumpDisabled} type='submit' className={jumpDisabled?'btn disabled':'btn'} onClick={(e) => this.changePage(toPage, e)}>跳转</button>
          </form>
        </div>
      </nav>
    )
  }
}
