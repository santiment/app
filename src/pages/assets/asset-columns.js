import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { Panel, Tooltip, Label } from '@santiment-network/ui'
import { formatNumber, millify } from '../../utils/formatting'
import ProjectLabel from '../../components/ProjectLabel'
import PercentChanges from '../../components/PercentChanges'
import { Description } from '../../ducks/dataHub/metrics/descriptions'
import styles from './AssetsToggleColumns.module.scss'

const simpleSort = (a, b) => b - a

const HeaderWithDesc = ({ description, heading }) => (
  <Tooltip className={styles.tooltip} trigger={<span>{heading}</span>}>
    <Panel padding>{description}</Panel>
  </Tooltip>
)

const isValidValue = value => !isNaN(parseFloat(value))

const NO_DATA = 'No data'

const constructColumn = ({
  heading,
  id = heading,
  description,
  className,
  sortMethod,
  filterMethod,
  ...rest
}) => {
  return {
    id,
    Header: () => (
      <div className={cx('heading', className)}>
        {description ? (
          <HeaderWithDesc description={description} heading={heading} />
        ) : (
          heading
        )}
      </div>
    ),
    sortable: Boolean(sortMethod),
    sortMethod,
    filterable: Boolean(filterMethod),
    filterMethod,
    ...rest
  }
}

export const COLUMNS = (preload, props = {}) => [
  constructColumn({
    id: COLUMNS_NAMES.index,
    heading: '#',
    maxWidth: 45,
    Cell: row => row.page * row.pageSize + row.viewIndex + 1
  }),
  constructColumn({
    id: COLUMNS_NAMES.project,
    heading: 'Project',
    minWidth: 200,
    maxWidth: 280,
    resizable: true,
    Cell: ({ original }) => {
      const { slug, priceUsd } = original
      const { state } = props.projectLink || {}
      return (
        <Link
          onMouseOver={preload}
          to={{
            state,
            pathname: `/projects/${slug}`,
            search: priceUsd === null ? 'metrics=devActivity' : ''
          }}
          className='overview-name'
        >
          <ProjectLabel {...original} />
        </Link>
      )
    },
    filterMethod: (filter, row) => {
      const name = row[filter.id].name || ''
      const ticker = row[filter.id].ticker || ''
      return (
        name.toLowerCase().indexOf(filter.value) !== -1 ||
        ticker.toLowerCase().indexOf(filter.value) !== -1
      )
    }
  }),
  constructColumn({
    id: COLUMNS_NAMES.price,
    heading: 'Price',
    maxWidth: 100,
    accessor: 'priceUsd',
    Cell: ({ value }) => (
      <div className='overview-price'>
        {isValidValue(value)
          ? formatNumber(value, { currency: 'USD' })
          : NO_DATA}
      </div>
    ),
    sortMethod: simpleSort
  }),
  constructColumn({
    id: COLUMNS_NAMES.price_change,
    heading: 'Price +/-',
    maxWidth: 100,
    accessor: 'percentChange24h',
    Cell: ({ value }) => (
      <div className='overview-price-percent'>
        {isValidValue(value) ? <PercentChanges changes={value} /> : NO_DATA}
      </div>
    ),
    sortMethod: simpleSort
  }),
  constructColumn({
    id: COLUMNS_NAMES.volume,
    heading: 'Volume',
    maxWidth: 100,
    accessor: 'volumeUsd',
    Cell: ({ value }) => (
      <div className='overview-volume'>
        {isValidValue(value) ? `$${millify(value, 2)}` : NO_DATA}
      </div>
    ),
    sortMethod: simpleSort
  }),
  constructColumn({
    id: COLUMNS_NAMES.volume_change,
    heading: 'Volume +/-',
    maxWidth: 100,
    accessor: 'volumeChange24h',
    Cell: ({ value }) => (
      <div className='overview-volume-percent'>
        {isValidValue(value) ? <PercentChanges changes={value} /> : NO_DATA}
      </div>
    ),
    sortMethod: simpleSort
  }),
  constructColumn({
    id: COLUMNS_NAMES.marketcapUsd,
    heading: 'Market Cap',
    maxWidth: 130,
    accessor: 'marketcapUsd',
    Cell: ({ value }) => (
      <div className='overview-marketcap'>
        {isValidValue(value) ? `$${millify(value, 2)}` : NO_DATA}
      </div>
    ),
    sortMethod: simpleSort
  }),
  constructColumn({
    id: COLUMNS_NAMES.rank,
    heading: 'Rank',
    maxWidth: 60,
    accessor: 'rank',
    Cell: ({ value }) => {
      return (
        <div className='overview-rank'>
          <Label variant='fill' className={styles.rank}>
            {value}
          </Label>
        </div>
      )
    },
    sortMethod: simpleSort
  }),
  constructColumn({
    id: COLUMNS_NAMES.eth_spent,
    heading: 'ETH spent, 30d',
    description: (
      <>
        <b>Average value for 30d</b>
        <br />
        {Description.ethSpentOverTime}
      </>
    ),
    maxWidth: 120,
    minWidth: 110,
    accessor: 'ethSpent',
    Cell: ({ value }) => (
      <div className='overview-ethspent'>{`Ξ${millify(value, 2)}`}</div>
    ),
    sortMethod: simpleSort
  }),
  constructColumn({
    id: COLUMNS_NAMES.devact,
    heading: 'Dev act., 30d',
    description: (
      <>
        <b>Average value for 30d</b>
        <br />
        {Description.dev_activity}
      </>
    ),
    maxWidth: 100,
    accessor: 'averageDevActivity',
    Cell: ({ value }) => (
      <div className='overview-devactivity'>
        {!isNaN(parseFloat(value)) ? parseFloat(value).toFixed(2) : NO_DATA}
      </div>
    ),
    sortMethod: simpleSort
  }),
  constructColumn({
    id: COLUMNS_NAMES.daily_active_addresses,
    heading: 'DAA, 30d',
    descriprion: (
      <>
        <b>Average value for 30d</b>
        <br />
        {Description.daily_active_addresses}
      </>
    ),
    maxWidth: 110,
    accessor: 'averageDailyActiveAddresses',
    Cell: ({ value }) => (
      <div className='overview-activeaddresses'>
        {isValidValue(value) ? formatNumber(value) : NO_DATA}
      </div>
    ),
    sortMethod: simpleSort
  }),
  constructColumn({
    id: COLUMNS_NAMES.infrastructure,
    heading: 'Infrastructure',
    accessor: 'infrastructure',
    Cell: ({ value }) => (
      <div className='overview-activeaddresses'>{value || NO_DATA}</div>
    )
  }),
  constructColumn({
    id: COLUMNS_NAMES.devActivity7,
    heading: 'Average Dev. Activity (7d)',
    accessor: 'devActivity7',
    Cell: ({ value }) => (
      <div className='overview-activeaddresses'>
        {value ? +value.toFixed(2) : NO_DATA}
      </div>
    ),
    sortMethod: simpleSort
  }),
  constructColumn({
    id: COLUMNS_NAMES.devActivity30,
    heading: 'Average Dev. Activity (30d)',
    accessor: 'devActivity30',
    Cell: ({ value }) => (
      <div className='overview-activeaddresses'>
        {value ? +value.toFixed(2) : NO_DATA}
      </div>
    ),
    sortMethod: simpleSort
  }),
  constructColumn({
    id: COLUMNS_NAMES.devActivityChange30d,
    heading: 'Dev. Act. % change (30d)',
    accessor: 'devActChange30d',
    Cell: ({ value }) =>
      isValidValue(value) ? <PercentChanges changes={value} /> : NO_DATA,
    sortMethod: simpleSort
  })
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
  token_circulation: 'Token Circulation',
  infrastructure: 'Infrastructure',
  devActivity7: 'Dev. activity (7d)',
  devActivity30: 'Dev. activity (30d)',
  devActivityChange30d: 'Dev. activity % change (30d)'
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
    key: 'ethSpentOverTime'
  },
  [COLUMNS_NAMES.devact]: {
    show: true,
    selectable: true,
    key: 'dev_activity'
  },
  [COLUMNS_NAMES.daily_active_addresses]: {
    show: true,
    selectable: true,
    key: 'daily_active_addresses'
  },
  [COLUMNS_NAMES.graph]: { show: false, selectable: false },
  [COLUMNS_NAMES.token_circulation]: {
    show: false,
    selectable: false,
    key: 'circulation'
  },
  [COLUMNS_NAMES.infrastructure]: { show: true, selectable: false },
  [COLUMNS_NAMES.devActivity7]: { show: true, selectable: false },
  [COLUMNS_NAMES.devActivity30]: { show: true, selectable: false },
  [COLUMNS_NAMES.devActivityChange30d]: { show: true, selectable: false }
}

export const COMMON_SETTINGS = {
  pageSize: 20,
  hiddenColumns: [COLUMNS_NAMES.eth_spent],
  sorting: { id: COLUMNS_NAMES.marketcapUsd, desc: false }
}

export const CATEGORIES_SETTINGS = {
  'All Assets': {
    hiddenColumns: [COLUMNS_NAMES.eth_spent]
  },
  'ERC20 Assets': { hiddenColumns: [] },
  'Top 50 ERC20': {
    hiddenColumns: [],
    pageSize: 50
  },
  'Market Segments': {
    hiddenColumns: [],
    sorting: { id: COLUMNS_NAMES.devActivity30, desc: false }
  }
}

export const ASSETS_TABLE_COLUMNS = [
  COLUMNS_NAMES.index,
  COLUMNS_NAMES.project,
  COLUMNS_NAMES.price,
  COLUMNS_NAMES.price_change,
  COLUMNS_NAMES.volume,
  COLUMNS_NAMES.volume_change,
  COLUMNS_NAMES.marketcapUsd,
  COLUMNS_NAMES.rank,
  COLUMNS_NAMES.eth_spent,
  COLUMNS_NAMES.devact,
  COLUMNS_NAMES.daily_active_addresses
]

export const MARKET_SEGMENT_COLUMNS = [
  COLUMNS_NAMES.index,
  COLUMNS_NAMES.project,
  COLUMNS_NAMES.devActivityChange30d,
  COLUMNS_NAMES.infrastructure,
  COLUMNS_NAMES.devActivity30,
  COLUMNS_NAMES.devActivity7
]
