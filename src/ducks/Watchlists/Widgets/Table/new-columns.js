import React from 'react'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import { formatNumber, millify } from '../../../../utils/formatting'
import Project from '../../../../components/Tables/Cells/Project'
import PercentChanges from '../../../../components/PercentChanges'
import LayoutForAsset from '../../../Studio/Template/LayoutForAsset/LayoutForAsset'
import PriceGraph from './PriceGraph'
import styles from './new-columns.module.scss'

const isValidValue = value => !isNaN(parseFloat(value))

const NO_DATA = 'No data'

export const DEFAULT_SORTING = [{ id: 'marketcap_usd', desc: true }]

export const COLUMNS = [
  {
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
    Header: 'Project',
    accessor: 'Project',
    disableSortBy: true,
    Cell: ({ row: { original } }) => {
      const { slug } = original

      return <Project {...original} to={`/projects/${slug}`} />
    }
  },
  {
    Header: 'Price',
    accessor: 'price_usd',
    Cell: ({ value }) =>
      isValidValue(value) ? formatNumber(value, { currency: 'USD' }) : NO_DATA
  },
  {
    Header: 'Price 24h %',
    accessor: 'price_usd_change_1d',
    Cell: ({ value }) =>
      isValidValue(value) ? <PercentChanges changes={value * 100} /> : NO_DATA
  },
  {
    Header: 'Price chart, 7d',
    accessor: 'priceChart7d',
    Cell: ({ value }) => <PriceGraph data={value} />,
    disableSortBy: true
  },
  {
    Header: 'Volume',
    accessor: 'volume_usd',
    Cell: ({ value }) =>
      isValidValue(value) ? `$${millify(value, 2)}` : NO_DATA
  },
  {
    Header: 'Volume 24h %',
    accessor: 'volume_usd_change_1d',
    Cell: ({ value }) =>
      isValidValue(value) ? <PercentChanges changes={value * 100} /> : NO_DATA
  },
  {
    Header: 'Market Cap',
    accessor: 'marketcap_usd',
    Cell: ({ value }) =>
      isValidValue(value) ? `$${millify(value, 2)}` : NO_DATA
  },
  {
    Header: 'Rank',
    accessor: 'rank',
    Cell: ({ value }) => (
      <Label variant='fill' className={styles.rank}>
        {value}
      </Label>
    ),
    disableSortBy: true
  },
  {
    Header: 'ETH spent, 30d',
    accessor: 'ethSpent',
    Cell: ({ value }) => `Ξ${millify(value, 2)}`,
    disableSortBy: true
  },
  {
    Header: 'Dev act., 30d',
    accessor: 'dev_activity_1d',
    Cell: ({ value }) =>
      !isNaN(parseFloat(value)) ? parseFloat(value).toFixed(2) : NO_DATA
  },
  {
    Header: 'DAA, 30d',
    accessor: 'daily_active_addresses',
    Cell: ({ value }) => (isValidValue(value) ? formatNumber(value) : NO_DATA)
  },
  {
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
