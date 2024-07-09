import { Link, createSearchParams } from 'react-router-dom'
import classNames from 'classnames'
import path from 'src/constants/path'
import { QueryConfig } from 'src/pages/HomePage/HomePageVisitor'
type Props = {
  pageSize: string
  queryConfig: QueryConfig
}

/**
Với range = 2 áp dụng cho khoảng cách đầu, cuối và xung quanh current_page
[1] 2 3 ... 19 20
1 [2] 3 4 ... 19 20 
1 2 [3] 4 5 ... 19 20
1 2 3 [4] 5 6 ... 19 20
1 2 3 4 [5] 6 7 ... 19 20
1 2 ... 4 5 [6] 8 9 ... 19 20
1 2 ...13 14 [15] 16 17 ... 19 20
1 2 ... 14 15 [16] 17 18 19 20
1 2 ... 15 16 [17] 18 19 20
1 2 ... 16 17 [18] 19 20
1 2 ... 17 18 [19] 20
1 2 ... 18 19 [20]
 */

const RANGE = 2

const renderPaginate = (
  page: number,
  total: string,
  queryConfig: QueryConfig
) => {
  const total_page = Number(total)
  let dotAfter = false
  let dotBefore = false
  const renderDotBefore = (index: number) => {
    if (!dotBefore) {
      dotBefore = true
      return (
        <span
          key={index}
          className='text-pink-light rounded px-3 py-2 shadow-sm mx-2 border'
        >
          ...
        </span>
      )
    }
    return null
  }
  const renderDotAfter = (index: number) => {
    if (!dotAfter) {
      dotAfter = true
      return (
        <span
          key={index}
          className='text-pink-light rounded px-3 py-2 shadow-sm mx-2 border'
        >
          ...
        </span>
      )
    }
    return null
  }

  return Array(total_page)
    .fill(0)
    .map((_, index) => {
      const pageNumber = index + 1
      if (
        page < RANGE * 2 + 1 &&
        pageNumber > RANGE + 1 &&
        pageNumber < total_page - RANGE + 1
      ) {
        return renderDotAfter(index)
      } else if (page > RANGE * 2 + 1 && page < total_page - RANGE * 2) {
        if (pageNumber < page - RANGE && pageNumber > RANGE) {
          return renderDotBefore(index)
        } else if (
          pageNumber > page + RANGE &&
          pageNumber < total_page - RANGE + 1
        ) {
          return renderDotAfter(index)
        }
      } else if (
        page > total_page - RANGE * 2 &&
        pageNumber > RANGE &&
        pageNumber < page - RANGE
      ) {
        return renderDotBefore(index)
      }

      return (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              limit: String(5),
              page: pageNumber.toString()
            }).toString()
          }}
          key={index}
          className={classNames(
            'text-black-900 bg-white-A700 rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border',
            {
              'border-gray-400': pageNumber === page,
              'border-transparent opacity-95': pageNumber !== page
            }
          )}
        >
          {pageNumber}
        </Link>
      )
    })
}

const Pagination = ({ queryConfig, pageSize }: Props): JSX.Element => {
  const limit = 5
  const pageSizeNumber = Number(pageSize)
  const page = Number(queryConfig.page)
  return (
    <div className='flex flex-wrap mt-6 justify-center'>
      {page === 1 ? (
        <span className='text-black-900 bg-white-A700  rounded px-3 py-2 shadow-sm mx-2 cursor-not-allowed border opacity-70'>
          Prev
        </span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className='text-black-900 bg-white-A700 rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'
        >
          Prev
        </Link>
      )}
      {renderPaginate(page, pageSize, queryConfig)}
      {page === pageSizeNumber ? (
        <span className='text-black-900 bg-white-A700 rounded px-3 py-2 shadow-sm mx-2 cursor-not-allowed border opacity-70'>
          Next
        </span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='text-black-900 bg-white-A700 rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'
        >
          Next
        </Link>
      )}
    </div>
  )
}

export default Pagination
