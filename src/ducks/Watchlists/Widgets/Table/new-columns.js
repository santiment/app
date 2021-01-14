import React from 'react'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import { formatNumber, millify } from '../../../../utils/formatting'
import Project from '../../../../components/Tables/Cells/Project'
import PercentChanges from '../../../../components/PercentChanges'
import LayoutForAsset from '../../../Studio/Template/LayoutForAsset/LayoutForAsset'
import PriceGraph from './PriceGraph'
import { COLUMNS_NAMES } from './columns'
import { sortFloatNumeric } from '../../../Table/utils'
import styles from './new-columns.module.scss'

const isValidValue = value => !isNaN(parseFloat(value))

const NO_DATA = 'No data'

export const DEFAULT_SORTING = [{ id: COLUMNS_NAMES.marketcapUsd, desc: true }]

export const COLUMNS = [
  {
    id: COLUMNS_NAMES.index,
    Header: '#',
    accessor: 'name',
    collapse: true,
    disableSortBy: true,
    Cell: ({ sortedRows, row, state: { pageSize, pageIndex } }) => {
      const index = sortedRows.findIndex(item => item === row)
      return (
        <LayoutForAsset
          item={row.original}
          className={styles.layout}
          index={pageIndex * pageSize + index + 1}
        />
      )
    }
  },
  {
    id: COLUMNS_NAMES.project,
    Header: 'Project',
    accessor: 'Project',
    disableSortBy: true,
    Cell: ({ row: { original } }) => {
      const { slug } = original

      return <Project {...original} to={`/projects/${slug}`} />
    }
  },
  {
    id: COLUMNS_NAMES.price,
    Header: 'Price',
    accessor: 'priceUsd',
    Cell: ({ value }) => (
      <div className='overview-price'>
        {isValidValue(value)
          ? formatNumber(value, { currency: 'USD' })
          : NO_DATA}
      </div>
    )
  },
  {
    id: COLUMNS_NAMES.price_change,
    Header: 'Price 24h %',
    accessor: 'percentChange24h',
    Cell: ({ value }) => (
      <div className='overview-price-percent'>
        {isValidValue(value) ? <PercentChanges changes={value} /> : NO_DATA}
      </div>
    ),
    sortType: (a, b) =>
      sortFloatNumeric(
        a.original['percentChange24h'],
        b.original['percentChange24h']
      )
  },
  {
    id: COLUMNS_NAMES.price_chart,
    Header: 'Price chart, 7d',
    accessor: 'priceChart7d',
    Cell: ({ value }) => <PriceGraph data={value} />,
    disableSortBy: true
  },
  {
    id: COLUMNS_NAMES.volume,
    Header: 'Volume',
    accessor: 'volumeUsd',
    Cell: ({ value }) => (
      <div className='overview-volume'>
        {isValidValue(value) ? `$${millify(value, 2)}` : NO_DATA}
      </div>
    )
  },
  {
    id: COLUMNS_NAMES.volume_change,
    Header: 'Volume 24h %',
    accessor: 'volumeChange24h',
    Cell: ({ value }) => (
      <div className='overview-volume-percent'>
        {isValidValue(value) ? <PercentChanges changes={value} /> : NO_DATA}
      </div>
    ),
    sortType: (a, b) =>
      sortFloatNumeric(
        a.original['volumeChange24h'],
        b.original['volumeChange24h']
      )
  },
  {
    id: COLUMNS_NAMES.marketcapUsd,
    Header: 'Market Cap',
    accessor: 'marketcapUsd',
    Cell: ({ value }) => (
      <div className='overview-marketcap'>
        {isValidValue(value) ? `$${millify(value, 2)}` : NO_DATA}
      </div>
    )
  },
  {
    id: COLUMNS_NAMES.rank,
    Header: 'Rank',
    accessor: 'rank',
    Cell: ({ value }) => {
      return (
        <div className='overview-rank'>
          <Label variant='fill' className={styles.rank}>
            {value}
          </Label>
        </div>
      )
    }
  },
  {
    id: COLUMNS_NAMES.eth_spent,
    Header: 'ETH spent, 30d',
    accessor: 'ethSpent',
    Cell: ({ value }) => (
      <div className='overview-ethspent'>{`Ξ${millify(value, 2)}`}</div>
    )
  },
  {
    id: COLUMNS_NAMES.devact,
    Header: 'Dev act., 30d',
    accessor: 'averageDevActivity',
    Cell: ({ value }) => (
      <div className='overview-devactivity'>
        {!isNaN(parseFloat(value)) ? parseFloat(value).toFixed(2) : NO_DATA}
      </div>
    )
  },
  {
    id: COLUMNS_NAMES.daily_active_addresses,
    Header: 'DAA, 30d',
    accessor: 'averageDailyActiveAddresses',
    Cell: ({ value }) => (
      <div className='overview-activeaddresses'>
        {isValidValue(value) ? formatNumber(value) : NO_DATA}
      </div>
    )
  },
  {
    id: COLUMNS_NAMES.marketSegments,
    Header: 'Market Segments',
    accessor: 'marketSegments',
    Cell: ({ value: values }) =>
      values ? (
        <div className={cx(styles.segments, 'segments')}>
          {values.map(segment => (
            <Label variant='fill' className={styles.segment} key={segment}>
              {segment}
            </Label>
          ))}
        </div>
      ) : (
        NO_DATA
      ),
    disableSortBy: true
  }
]
