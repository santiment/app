import React from 'react'
import { millify } from '../../../utils/formatting'
import WalletLink from '../../WalletLink/WalletLink'
import Project from '../Cells/Project'

const ETHEREUM = 'ethereum'

const TrxAddressCell = ({ wallet, assets }) => <WalletLink {...wallet} assets={assets} />

const EthCell = ({ value, sign = 'Ξ' }) =>
  value ? <div>{`${sign}${millify(value, 2)}`}</div> : <div>No data</div>

export const DEFAULT_SORTING = [
  {
    id: 'ethSpent',
    desc: true,
  },
]

export const COLUMNS = [
  {
    Header: 'Project',
    accessor: 'project',
    disableSortBy: true,
    Cell: ({ row: { original } }) => <Project {...original} to={`/projects/${original.slug}`} />,
  },
  {
    Header: 'Funds Collected',
    accessor: 'fundsRaisedUsdIcoEndPrice',
    Cell: ({ value }) => EthCell({ value, sign: '$' }),
  },
  {
    Header: 'ETH spent, 30d',
    accessor: 'ethSpent',
    Cell: EthCell,
  },
  {
    Header: 'ETH balance',
    accessor: 'ethBalance',
    Cell: EthCell,
  },
  {
    Header: 'Wallets',
    accessor: 'ethAddresses',
    disableSortBy: true,
    Cell: ({ value = {}, row: { original } }) => (
      <>
        {value.length > 0
          ? value.map((wallet, index) => (
              <TrxAddressCell
                key={index}
                wallet={wallet}
                assets={original.slug === ETHEREUM ? [original.slug] : [original.slug, ETHEREUM]}
              />
            ))
          : 'No data'}
      </>
    ),
  },
]
