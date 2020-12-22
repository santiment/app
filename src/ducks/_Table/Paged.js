import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Input from '@santiment-network/ui/Input'
import Button from '@santiment-network/ui/Button'
import Dropdown from '@santiment-network/ui/Dropdown'
import Table from './index'
import styles from './Paged.module.scss'

const DROPDOWN_CLASSES = {
  wrapper: styles.dropdown,
  options: styles.options
}

const PAGE_SIZES = [10, 20, 50, 100].map(index => ({
  index,
  content: `${index} rows`
}))

const PagedTable = ({
  defaultPage,
  defaultPageSize,
  stickyPageControls,
  items,
  ...props
}) => {
  const [page, setPage] = useState(defaultPage)
  const [pageSize, setPageSize] = useState(defaultPageSize)

  const offset = page * pageSize
  const pageItems = items.slice(offset, offset + pageSize)

  const maxPage = Math.ceil(items.length / pageSize)
  const isPrevPageDisabled = page < 1
  const isNextPageDisabled = page >= maxPage - 1

  function onPageInput (e) {
    const newPage = e.target.value - 1

    if (newPage > -1 && newPage < maxPage) {
      setPage(newPage)
    }
  }

  return (
    <>
      <Table {...props} items={pageItems} offset={offset} />
      <div
        className={cx(
          styles.controls,
          stickyPageControls && styles.stickyPageControls
        )}
      >
        <Dropdown
          options={PAGE_SIZES}
          selected={pageSize}
          onSelect={option => setPageSize(option.index)}
          classes={DROPDOWN_CLASSES}
        />
        Page
        <Input
          className={styles.input}
          type='number'
          style={{ '--width': `${(page + 1).toString().length}ch` }}
          value={page + 1}
          onChange={onPageInput}
        />
        of {maxPage}
        <Button
          className={styles.prev}
          border
          disabled={isPrevPageDisabled}
          onClick={() => setPage(page - 1)}
        >
          Prev
          <Icon className={styles.prev__icon} type='arrow-left' />
        </Button>
        <Button
          className={styles.next}
          border
          disabled={isNextPageDisabled}
          onClick={() => setPage(page + 1)}
        >
          <Icon className={styles.next__icon} type='arrow-right' />
          Next
        </Button>
      </div>
    </>
  )
}

PagedTable.defaultProps = {
  defaultPage: 0,
  defaultPageSize: 20,
  items: []
}

export default PagedTable
