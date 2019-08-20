import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { Panel, Tooltip, Label } from '@santiment-network/ui'
import { simpleSort } from '../../utils/sortMethods'
import { formatNumber, millify } from '../../utils/formatting'
import ProjectLabel from '../../components/ProjectLabel'
import PercentChanges from '../../components/PercentChanges'
import help from './../../assets/help.json'
import styles from './AssetsToggleColumns.module.scss'

const HeaderWithDesc = ({ description, heading }) => (
  <Tooltip className={styles.tooltip} trigger={<span>{heading}</span>}>
    <Panel padding>{description}</Panel>
  </Tooltip>
)

const isValidValue = value => !isNaN(parseFloat(value))

const NO_DATA = 'No data'

export const COLUMNS = preload => [
  {
    Header: () => <div className={cx('heading', 'overview-index')}>#</div>,
    id: COLUMNS_NAMES.index,
    maxWidth: 45,
    sortable: false,
    Cell: row => (
      <div className='overview-index'>
        {row.page * row.pageSize + row.viewIndex + 1}
      </div>
    )
  },
  {
    Header: () => <div className={cx('heading', 'overview-name')}>Project</div>,
    id: COLUMNS_NAMES.project,
    minWidth: 200,
    maxWidth: 280,
    filterable: true,
    sortable: true,
    resizable: true,
    accessor: d => ({
      name: d.name,
      ticker: d.ticker,
      cmcId: d.coinmarketcapId
    }),
    Cell: ({ value }) => (
      <Link
        onMouseOver={preload}
        to={`/projects/${value.cmcId}`}
        className='overview-name'
      >
        <ProjectLabel {...value} />
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
    Header: () => <div className={cx('heading', 'overview-price')}>Price</div>,
    id: COLUMNS_NAMES.price,
    maxWidth: 100,
    accessor: d => ({
      priceUsd: d.priceUsd
    }),
    Cell: ({ value: { priceUsd } }) => (
      <div className='overview-price'>
        {isValidValue(priceUsd)
          ? formatNumber(priceUsd, { currency: 'USD' })
          : NO_DATA}
      </div>
    ),
    sortable: true,
    sortMethod: (a, b) =>
      simpleSort(parseFloat(a.priceUsd || 0), parseFloat(b.priceUsd || 0))
  },
  {
    Header: () => (
      <div className={cx('heading', 'overview-price-percent')}>Price +/-</div>
    ),
    id: COLUMNS_NAMES.price_change,
    maxWidth: 100,
    accessor: d => ({
      change24h: d.percentChange24h
    }),
    Cell: ({ value: { change24h } }) => (
      <div className='overview-price-percent'>
        {isValidValue(change24h) ? (
          <PercentChanges changes={change24h} />
        ) : (
          NO_DATA
        )}
      </div>
    ),
    sortable: true,
    sortMethod: (a, b) =>
      simpleSort(parseFloat(a.change24h || 0), parseFloat(b.change24h || 0))
  },
  {
    Header: () => (
      <div className={cx('heading', 'overview-volume')}>Volume</div>
    ),
    id: COLUMNS_NAMES.volume,
    maxWidth: 100,
    accessor: d => ({
      volumeUsd: d.volumeUsd
    }),
    Cell: ({ value: { volumeUsd } }) => (
      <div className='overview-volume'>
        {isValidValue(volumeUsd) ? `$${millify(volumeUsd, 2)}` : NO_DATA}
      </div>
    ),
    sortable: true,
    sortMethod: (a, b) =>
      simpleSort(parseFloat(a.volumeUsd || 0), parseFloat(b.volumeUsd || 0))
  },
  {
    Header: () => (
      <div className={cx('heading', 'overview-volume-percent')}>Volume +/-</div>
    ),
    id: COLUMNS_NAMES.volume_change,
    maxWidth: 100,
    accessor: d => ({
      change24h: d.volumeChange24h
    }),
    Cell: ({ value: { change24h } }) => (
      <div className='overview-volume-percent'>
        {isValidValue(change24h) ? (
          <PercentChanges changes={change24h} />
        ) : (
          NO_DATA
        )}
      </div>
    ),
    sortable: true,
    sortMethod: (a, b) =>
      simpleSort(parseFloat(a.change24h || 0), parseFloat(b.change24h || 0))
  },
  {
    Header: () => (
      <div className={cx('heading', 'overview-marketcap')}>Market Cap</div>
    ),
    id: COLUMNS_NAMES.marketcapUsd,
    maxWidth: 130,
    accessor: 'marketcapUsd',
    Cell: ({ value }) => (
      <div className='overview-marketcap'>
        {isValidValue(value) ? `$${millify(value, 2)}` : NO_DATA}
      </div>
    ),
    sortable: true,
    sortMethod: (a, b) => simpleSort(+a, +b)
  },
  {
    Header: () => <div className={cx('heading', 'overview-rank')}>Rank</div>,
    id: COLUMNS_NAMES.rank,
    maxWidth: 60,
    sortable: true,
    accessor: d => ({ rank: d.rank }),
    Cell: prop => {
      const {
        value: { rank }
      } = prop
      return (
        <div className='overview-rank'>
          <Label variant='fill' className={styles.rank}>
            {rank}
          </Label>
        </div>
      )
    },
    sortMethod: (a, b) => simpleSort(b.rank, a.rank)
  },
  {
    Header: () => (
      <div className={cx('heading', 'overview-ethspent')}>
        <HeaderWithDesc
          description={help['ETH Spent Over Time'].description}
          heading={'ETH spent, 30d'}
        />
      </div>
    ),
    maxWidth: 120,
    minWidth: 110,
    id: COLUMNS_NAMES.eth_spent,
    accessor: d => d.ethSpent,
    Cell: ({ value }) => (
      <div className='overview-ethspent'>{`Ξ${millify(value, 2)}`}</div>
    ),
    sortable: true,
    sortMethod: (a, b) => simpleSort(a, b)
  },
  {
    Header: () => (
      <div className={cx('heading', 'overview-devactivity')}>
        <HeaderWithDesc
          description={help['Development Activity'].description}
          heading={'Dev act., 30d'}
        />
      </div>
    ),
    id: COLUMNS_NAMES.devact,
    maxWidth: 100,
    accessor: d => d.averageDevActivity,
    Cell: ({ value }) => (
      <div className='overview-devactivity'>
        {!isNaN(parseFloat(value)) ? parseFloat(value).toFixed(2) : NO_DATA}
      </div>
    ),
    sortable: true,
    sortMethod: (a, b) => simpleSort(a, b)
  },
  {
    Header: () => (
      <div className={cx('heading', 'overview-activeaddresses')}>
        <HeaderWithDesc
          description={help['Daily Active Addresses'].description}
          heading={'DAA, 30d'}
        />
      </div>
    ),
    id: COLUMNS_NAMES.daily_active_addresses,
    maxWidth: 110,
    accessor: d => d.averageDailyActiveAddresses,
    Cell: ({ value }) => (
      <div className='overview-activeaddresses'>
        {isValidValue(value) ? formatNumber(value) : NO_DATA}
      </div>
    ),
    sortable: true,
    sortMethod: (a, b) => simpleSort(a, b)
  }
]

export const COLUMNS_NAMES = {
  index: 'Index',
  project: 'Project',
  marketcapUsd: 'Market capitalization',
  price: 'Price',
  price_change: 'Price (last 24h)',
  volume: 'Volume',
  volume_change: 'Volume (last 24h)',
  rank: 'Rank',
  eth_spent: 'ETH spent',
  devact: 'Development activity',
  daily_active_addresses: 'Daily active addresses',
  graph: 'Graph',
  token_circulation: 'Token Circulation'
}

export const COLUMNS_SETTINGS = {
  [COLUMNS_NAMES.index]: { show: true, selectable: false },
  [COLUMNS_NAMES.project]: { show: true, selectable: false },
  [COLUMNS_NAMES.price]: { show: true, selectable: true },
  [COLUMNS_NAMES.price_change]: { show: true, selectable: true },
  [COLUMNS_NAMES.volume]: { show: true, selectable: true },
  [COLUMNS_NAMES.volume_change]: { show: true, selectable: true },
  [COLUMNS_NAMES.marketcapUsd]: { show: true, selectable: true },
  [COLUMNS_NAMES.rank]: { show: true, selectable: true },
  [COLUMNS_NAMES.eth_spent]: {
    show: true,
    selectable: true,
    description: help['ETH Spent Over Time'].description
  },
  [COLUMNS_NAMES.devact]: {
    show: true,
    selectable: true,
    description: help['Development Activity'].description
  },
  [COLUMNS_NAMES.daily_active_addresses]: {
    show: true,
    selectable: true,
    description: help['Daily Active Addresses'].description
  },
  [COLUMNS_NAMES.graph]: { show: false, selectable: false },
  [COLUMNS_NAMES.token_circulation]: {
    show: false,
    selectable: false,
    description: help['Token Circulation'].description
  }
}

export const COMMON_SETTINGS = {
  pageSize: 20,
  hiddenColumns: [COLUMNS_NAMES.eth_spent],
  sorting: { id: COLUMNS_NAMES.marketcapUsd, desc: false }
}

export const CATEGORIES_SETTINGS = {
  'All Assets': { hiddenColumns: [COLUMNS_NAMES.eth_spent] },
  'ERC20 Assets': { hiddenColumns: [] },
  'Top 50 ERC20': { hiddenColumns: [], pageSize: 50 }
}
