import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Input from '@santiment-network/ui/Input'
import Button from '@santiment-network/ui/Button'
import Dropdown from '@santiment-network/ui/Dropdown'
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
      <div className={styles.totalPages}>
        Page
        <Input
          type='number'
          className={styles.input}
          style={{ '--width': `${(pageIndex + 1).toString().length}ch` }}
          defaultValue={pageIndex + 1}
          value={pageIndex + 1}
          onChange={evt => {
            const newPage = evt.target.value ? Number(evt.target.value) - 1 : 0
            gotoPage(newPage)
          }}
        />
        of {pageOptions.length}
      </div>
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
