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

export const buildPageSizes = sizes =>
  sizes.map(index => ({
    index,
    content: `${index} rows`
  }))

const PagedTable = ({
  controlsClassName,
  stickyPageControls,
  padding,
  pageSizes,
  defaultPage,
  defaultPageSize,
  items,
  onPageChange,
  ...props
}) => {
  const [page, setPage] = useState(defaultPage)
  const [pageSize, setPageSize] = useState(defaultPageSize)

  const offset = page * pageSize
  const pageItems = items.slice(offset, offset + pageSize)

  const maxPage = Math.ceil(items.length / pageSize)
  const isPrevPageDisabled = page < 1
  const isNextPageDisabled = page >= maxPage - 1

  function changePage (newPage) {
    if (newPage > -1 && newPage < maxPage) {
      setPage(newPage)
      if (onPageChange) onPageChange(newPage)
    }
  }

  return (
    <>
      <Table {...props} items={pageItems} offset={offset} />
      <div
        className={cx(
          styles.controls,
          stickyPageControls && styles.stickyPageControls,
          padding && styles.padding,
          controlsClassName
        )}
      >
        <Dropdown
          options={pageSizes}
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
          onChange={({ target }) => changePage(target.value - 1)}
        />
        of {maxPage || 1}
        <Button
          className={styles.prev}
          border
          disabled={isPrevPageDisabled}
          onClick={() => changePage(page - 1)}
        >
          Prev
          <Icon className={styles.prev__icon} type='arrow-left' />
        </Button>
        <Button
          className={styles.next}
          border
          disabled={isNextPageDisabled}
          onClick={() => changePage(page + 1)}
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
  pageSizes: buildPageSizes([10, 20, 50, 100]),
  items: []
}

export default PagedTable
