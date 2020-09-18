import React from 'react'
import ReactTable from 'react-table'
import { columns } from './columns'
import { useTopClaimers } from './gql'
import { DAY, getTimeIntervalFromToday } from '../../../utils/dates'
import styles from '../index.module.scss'
import tableStyles from './table.module.scss'

const DEFAULT_SORTED = [
  {
    id: 'value',
    desc: true
  }
]

const TopClaimersTable = ({ className }) => {
  const { from, to } = getTimeIntervalFromToday(-1, DAY)
  const [items, loading] = useTopClaimers({
    from: from.toISOString(),
    to: to.toISOString()
  })
  console.log(items)

  return (
    <div className={className}>
      <ReactTable
        minRows={1}
        className={tableStyles.claimersTable}
        defaultSorted={DEFAULT_SORTED}
        showPagination={false}
        resizable={false}
        data={items}
        columns={columns}
      />
    </div>
  )
}

export default TopClaimersTable
