import React, { useMemo, useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Input from '@santiment-network/ui/Input'
import Button from '@santiment-network/ui/Button'
import Dropdown from '@santiment-network/ui/Dropdown'
import styles from './index.module.scss'

function prepareOptions (options) {
  return options.map(option => ({
    content: `${option} rows`,
    index: option
  }))
}

const Pagination = ({
  pageSize,
  pageOptions,
  pageIndex,
  canNextPage,
  canPreviousPage,
  setPageSize,
  onGotoPage,
  onPreviousPage,
  onNextPage,
  onChangePage,
  pageSizeOptions,
  className
}) => {
  const [selected, setSelected] = useState({
    index: pageSize,
    content: `${pageSize} rows`
  })
  const preparedOptions = useMemo(() => prepareOptions(pageSizeOptions), [
    pageSizeOptions
  ])

  return (
    <div className={cx(styles.wrapper, className)}>
      <Dropdown
        options={preparedOptions}
        selected={selected}
        onSelect={option => {
          setSelected(option)
          setPageSize(option.index)
        }}
        classes={{ wrapper: styles.dropdown, options: styles.options }}
      />
      <div className={styles.totalPages}>
        Page
        <Input
          type='number'
          className={styles.input}
          style={{ '--width': `${(pageIndex + 1).toString().length}ch` }}
          value={pageIndex + 1}
          onChange={evt => {
            const newPage = evt.target.value ? Number(evt.target.value) - 1 : 0
            onChangePage ? onChangePage(newPage) : onGotoPage(newPage)
          }}
        />
        of {pageOptions.length}
      </div>
      <div className={styles.buttons}>
        <Button
          border
          onClick={evt =>
            onChangePage ? onChangePage(pageIndex - 1) : onPreviousPage(evt)
          }
          disabled={!canPreviousPage}
          className={styles.button}
        >
          Prev
          <Icon className={styles.prev} type='arrow-left' />
        </Button>
        <Button
          border
          onClick={evt =>
            onChangePage ? onChangePage(pageIndex + 1) : onNextPage(evt)
          }
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
