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

const columns = preload => [
  {
    Header: () => <div className={cx('heading', 'overview-index')}>#</div>,
    id: 'index',
    maxWidth: 45,
    sortable: true,
    accessor: d => ({ index: d.index }),
    Cell: ({ index }) => <div className='overview-index'>{index + 1}</div>,
    sortMethod: (a, b) => simpleSort(b.index, a.index)
  },
  {
    Header: () => <div className={cx('heading', 'overview-name')}>Project</div>,
    id: 'project',
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
    id: 'price',
    maxWidth: 100,
    accessor: d => ({
      priceUsd: d.priceUsd
    }),
    Cell: ({ value: { priceUsd } }) => (
      <div className='overview-price'>
        {priceUsd ? formatNumber(priceUsd, { currency: 'USD' }) : 'No data'}
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
    id: 'price_change',
    maxWidth: 100,
    accessor: d => ({
      change24h: d.percentChange24h
    }),
    Cell: ({ value: { change24h } }) => (
      <div className='overview-price-percent'>
        {change24h ? <PercentChanges changes={change24h} /> : 'No data'}
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
    id: 'volume',
    maxWidth: 100,
    accessor: d => ({
      volumeUsd: d.volumeUsd
    }),
    Cell: ({ value: { volumeUsd } }) => (
      <div className='overview-volume'>
        {volumeUsd ? `$${millify(volumeUsd, 2)}` : 'No data'}
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
    id: 'volume_change_24h',
    maxWidth: 100,
    accessor: d => ({
      change24h: d.volumeChange24h
    }),
    Cell: ({ value: { change24h } }) => (
      <div className='overview-volume-percent'>
        {change24h ? <PercentChanges changes={change24h} /> : 'No data'}
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
    id: 'marketcapUsd',
    maxWidth: 130,
    accessor: 'marketcapUsd',
    Cell: ({ value }) => (
      <div className='overview-marketcap'>
        {value !== null ? `$${millify(value, 2)}` : 'No data'}
      </div>
    ),
    sortable: true,
    sortMethod: (a, b) => simpleSort(+a, +b)
  },
  {
    Header: () => <div className={cx('heading', 'overview-rank')}>Rank</div>,
    id: 'rank',
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
    id: 'eth_spent',
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
    id: 'dev_activity',
    maxWidth: 100,
    accessor: d => d.averageDevActivity,
    Cell: ({ value }) => (
      <div className='overview-devactivity'>
        {value ? parseFloat(value).toFixed(2) : 'No data'}
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
    id: 'daily_active_addresses',
    maxWidth: 110,
    accessor: d => d.averageDailyActiveAddresses,
    Cell: ({ value }) => (
      <div className='overview-activeaddresses'>
        {value ? formatNumber(value) : 'No data'}
      </div>
    ),
    sortable: true,
    sortMethod: (a, b) => simpleSort(a, b)
  }
]

export const columnSettingsDefault = {
  index: { show: true, selectable: false, name: 'Index' },
  project: { show: true, selectable: false, name: 'Project' },
  marketcapUsd: { show: true, selectable: true, name: 'Market capitalization' },
  price: { show: true, selectable: true, name: 'Price' },
  price_change: { show: true, selectable: true, name: 'Price (last 24h)' },
  volume: { show: true, selectable: true, name: 'Volume' },
  volume_change_24h: {
    show: true,
    selectable: true,
    name: 'Volume (last 24h)'
  },
  rank: { show: true, selectable: true, name: 'Rank' },
  eth_spent: {
    show: true,
    selectable: true,
    name: 'ETH spent',
    description: help['ETH Spent Over Time'].description
  },
  dev_activity: {
    show: true,
    selectable: true,
    name: 'Development activity',
    description: help['Development Activity'].description
  },
  daily_active_addresses: {
    show: true,
    selectable: true,
    name: 'Daily active addresses',
    description: help['Daily Active Addresses'].description
  },
  graph: { show: false, selectable: false, name: 'Graph' },
  token_circulation: {
    show: false,
    selectable: false,
    name: 'Token Circulation',
    description: help['Token Circulation'].description
  }
}

export default columns
