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
  gotoPage,
  previousPage,
  nextPage,
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
