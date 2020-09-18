import React from 'react'
import cx from 'classnames'
import ReactTable from 'react-table'
import { columns } from './columns'
import { useTopClaimers } from './gql'
import { DAY, getTimeIntervalFromToday } from '../../../utils/dates'
import styles from './table.module.scss'

const DEFAULT_SORTED = [
  {
    id: 'value',
    desc: true
  }
]

const TopClaimersTable = ({ className }) => {
  const { from, to } = getTimeIntervalFromToday(-1, DAY)
  const [items] = useTopClaimers({
    from: from.toISOString(),
    to: to.toISOString()
  })

  return (
    <div className={cx(className, styles.table)}>
      <ReactTable
        minRows={1}
        className={styles.claimersTable}
        defaultSorted={DEFAULT_SORTED}
        showPagination={false}
        resizable={false}
        data={items}
        columns={columns}
        showPaginationBottom
        defaultPageSize={5}
        pageSize={items.length}
        minRows={5}
      />
    </div>
  )
}

export default TopClaimersTable
