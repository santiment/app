import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import styles from './index.module.scss'

const Pagination = ({
  pageSize,
  pageOptions,
  pageIndex,
  canNextPage,
  canPreviousPage,
  setPageSize,
  gotoPage,
  previousPage,
  nextPage
}) => {
  return (
    <div className={styles.wrapper}>
      <select
        value={pageSize}
        onChange={evt => setPageSize(Number(evt.target.value))}
      >
        {[10, 25, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
      <span>
        Page{' '}
        <strong>
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={evt => {
              const page = evt.target.value ? Number(evt.target.value) - 1 : 0
              gotoPage(page)
            }}
          />
          of {pageOptions.length}
        </strong>{' '}
      </span>
      <div className={styles.buttons}>
        <Button
          border
          onClick={previousPage}
          disabled={!canPreviousPage}
          className={styles.button}
        >
          Prev
          <Icon className={styles.prev} type='arrow-left' />
        </Button>
        <Button
          border
          onClick={nextPage}
          disabled={!canNextPage}
          className={styles.button}
        >
          <Icon className={styles.next} type='arrow-right' />
          Next
        </Button>
      </div>
    </div>
  )
}

export default Pagination
