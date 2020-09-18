import React from 'react'
import ReactTable from 'react-table'
import { columns } from './columns'
// import { useTopClaimers } from './gql'
import styles from '../index.module.scss'
import tableStyles from './table.module.scss'

const DEFAULT_SORTED = [
  {
    id: 'value',
    desc: true
  }
]

const TopClaimersTable = ({ className }) => {
  // const [data, loading] = useTopClaimers({from: "2020-09-14T00:00:00Z", to:"2020-09-19T00:00:00Z"})

  // console.log(data)

  return (
    <div className={className}>
      <ReactTable
        minRows={1}
        className={tableStyles.claimersTable}
        defaultSorted={DEFAULT_SORTED}
        showPagination={false}
        resizable={false}
        data={[]}
        columns={columns}
      />
    </div>
  )
}

export default TopClaimersTable
