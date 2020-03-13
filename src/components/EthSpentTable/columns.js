import React from 'react'
import { Link } from 'react-router-dom'
import { simpleSort } from '../../utils/sortMethods'
import { millify } from '../../utils/formatting'
import ProjectIcon from '../ProjectIcon/ProjectIcon'
import WalletLink from '../WalletLink/WalletLink'
import styles from './EthSpentTable.module.scss'

const TrxAddressCell = ({ wallet, assets }) => (
  <WalletLink {...wallet} assets={assets} />
)

export const columns = [
  {
    Header: '',
    id: 'icon',
    filterable: true,
    sortable: false,
    minWidth: 24,
    maxWidth: 100,
    accessor: ({ name, ticker, slug, logoUrl, darkLogoUrl }) => ({
      name,
      ticker,
      slug,
      logoUrl,
      darkLogoUrl
    }),
    Cell: ({ value }) => (
      <div className='overview-ticker'>
        <ProjectIcon {...value} />
      </div>
    )
  },
  {
    Header: 'Asset',
    id: 'project',
    maxWidth: 310,
    minWidth: 260,
    filterable: true,
    sortable: true,
    accessor: ({ name, ticker, slug }) => ({ name, ticker, slug }),
    Cell: ({ value = {} }) => (
      <Link className={styles.name} to={`/projects/${value.slug}`}>
        <span>{value.name}</span>
        <span className={styles.ticker}>({value.ticker})</span>
      </Link>
    ),
    filterMethod: (filter, row) => {
      const name = row[filter.id].name || ''
      const ticker = row[filter.id].ticker || ''
      return (
        name.toLowerCase().indexOf(filter.value) !== -1 ||
        ticker.toLowerCase().indexOf(filter.value) !== -1
      )
    }
  },
  {
    Header: 'Funds Collected',
    id: 'collected-usd',
    maxWidth: 210,
    accessor: 'fundsRaisedUsdIcoEndPrice',
    Cell: ({ value }) =>
      value ? (
        <div className='ethereum-table-cell-eth-spent'>{`$${millify(
          value,
          2
        )}`}</div>
      ) : (
        <div>No data</div>
      ),
    sortable: true,
    sortMethod: (a, b) => simpleSort(+a, +b)
  },
  {
    Header: 'ETH spent (30D)',
    maxWidth: 150,
    id: 'eth_spent',
    accessor: d => d.ethSpent,
    Cell: ({ value }) => (
      <div className='ethereum-table-cell-eth-spent'>{`Ξ${millify(
        value,
        2
      )}`}</div>
    ),
    sortable: true,
    sortMethod: (a, b) => simpleSort(+a, +b)
  },
  {
    Header: 'ETH balance',
    maxWidth: 150,
    id: 'eth_balance',
    accessor: d => d.ethBalance,
    Cell: ({ value }) => (
      <div className='ethereum-table-cell-eth-spent'>{`Ξ${millify(
        value,
        2
      )}`}</div>
    ),
    sortable: true,
    sortMethod: (a, b) => simpleSort(+a, +b)
  },
  {
    Header: 'Wallets',
    id: 'wallets',
    accessor: 'ethAddresses',
    minWidth: 250,
    Cell: ({ value = {}, original }) => (
      <>
        {value.length > 0
          ? value.map((wallet, index) => (
            <TrxAddressCell
              key={index}
              wallet={wallet}
              assets={[original.slug, 'ethereum']}
            />
          ))
          : 'No data'}
      </>
    ),
    sortable: false
  }
]
