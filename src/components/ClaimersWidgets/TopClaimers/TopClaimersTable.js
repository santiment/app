import React from 'react'
import ReactTable from 'react-table'
import { columns } from './columns'
// import { useTopClaimers } from './gql'
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
  // const [data, loading] = useTopClaimers({from: from.toISOString(), to: to.toISOString()})

  // console.log(data)

  const harcoded = [
    {
      address: '0xdb08817d917a0ce2c4fd7370f4b9b44c937b4ef1',
      value: 1944444.455
    },
    {
      address: '0xebabde62e507feca42dbd3e9ce2d2598b1a589cb',
      value: 4584329.4443
    }
  ]

  return (
    <div className={className}>
      <ReactTable
        minRows={1}
        className={tableStyles.claimersTable}
        defaultSorted={DEFAULT_SORTED}
        showPagination={false}
        resizable={false}
        data={harcoded}
        columns={columns}
      />
    </div>
  )
}

export default TopClaimersTable
