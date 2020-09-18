import React from 'react'
import { useTopClaimers } from './gql'
import { columns } from './columns'
import ReactTable from 'react-table'
import styles from '../index.module.scss'
import tableStyles from './table.module.scss'

const DEFAULT_SORTED = [
  {
    id: 'value',
    desc: true
  }
]

const TopClaimersTable = ({ className }) => {
  const [data, loading] = useTopClaimers('uniswap')

  return (
    <div className={className}>
      <ReactTable
        minRows={1}
        className={tableStyles.claimersTable}
        defaultSorted={DEFAULT_SORTED}
        showPagination={false}
        resizable={false}
        data={data}
        columns={columns}
      />
    </div>
  )
}

export default TopClaimersTable
