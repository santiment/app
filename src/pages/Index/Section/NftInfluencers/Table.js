import React, { useState } from 'react'
import cx from 'classnames'
import NftTable from '../../../../ducks/Table'
import { dateDifferenceInWords } from '../../../../utils/dates'
import { useNftQuery, useNftCountQuery } from './hooks'
import {
  HOME_INDEX,
  PAGE_INDEX,
  DEFAULT_SORTING,
  PAGE_SIZE_OPTIONS,
  Activity,
  Marketplace,
  getTwitterAccount,
  Transaction,
  TRXhash,
} from './utils'
import styles from './index.module.scss'

const Table = ({ isHome = true }) => {
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(isHome ? 6 : 30)
  const [orderBy, setOrderBy] = useState('DATETIME')
  const [direction, setDirection] = useState('DESC')
  const { data, loading } = useNftQuery(pageIndex, pageSize, orderBy, direction)
  const { maxAmount } = useNftCountQuery()

  const index = isHome ? HOME_INDEX : PAGE_INDEX

  const columns = index.map((idx) => ({
    Header: idx,
    accessor: idx,
    collapse: false,
    disableSortBy: isHome ? true : !['Price', 'When'].includes(idx),
    Cell: ({ row }) => {
      switch (idx) {
        case '#':
          return parseInt(row.id) + 1 + pageSize * pageIndex
        case 'Twitter NFT Influencer':
          const account = getTwitterAccount(row.original)
          if (!account) return null
          return (
            <a href={account.Twitter} target='_blank' rel='noopener noreferrer'>
              @{account.Name}
            </a>
          )
        case 'Activity':
          return <Activity original={row.original} />
        case 'NFT collection name':
          return row.original.nft.name
        case 'Transaction':
          return (
            <Transaction
              from={row.original.fromAddress.address}
              to={row.original.toAddress.address}
            />
          )
        case 'TRX hash':
          return <TRXhash hash={row.original.trxHash} />
        case 'When':
          return dateDifferenceInWords({
            from: new Date(row.original.datetime),
          })
        case 'Price':
          return `${parseFloat(row.original.amount.toFixed(3))} ${row.original.currencyProject &&
            row.original.currencyProject.ticker}`
        case 'Quantity':
          return row.original.quantity
        case 'Marketplace':
          return <Marketplace marketplace={row.original.marketplace} />
        default:
          return null
      }
    },
  }))

  const fetchData = ({ pageSize, sortBy }) => {
    if (sortBy) {
      const { id, desc } = sortBy[0]
      if (['Price', 'When'].includes(id)) {
        setOrderBy(id === 'When' ? 'DATETIME' : 'AMOUNT')
        setDirection(desc ? 'DESC' : 'ASC')
      }
    }
    if (!isHome) {
      setPageSize(pageSize)
    }
  }

  return (
    <NftTable
      className={cx(styles.table, !isHome && styles.tablePage)}
      data={data}
      columns={columns}
      fetchData={fetchData}
      options={{
        loadingSettings: {
          isLoading: loading,
        },
        sortingSettings: {
          defaultSorting: DEFAULT_SORTING,
          allowSort: true,
        },
        paginationSettings: !isHome && {
          pageSize,
          pageIndex,
          onChangePage: setPageIndex,
          pageSizeOptions: PAGE_SIZE_OPTIONS,
          controlledPageCount: Math.ceil(maxAmount / pageSize),
          manualPagination: true,
        },
      }}
    />
  )
}

export default Table
