import React from 'react'
import Label from '@santiment-network/ui/Label'
import PriceGraph from '../PriceGraph'
import Project from '../../../../../components/Tables/Cells/Project'
import LayoutForAsset from '../../../../Studio/Template/LayoutForAsset/LayoutForAsset'
import { defaultFormatter } from '../../Filter/formatters'
import styles from './columns.module.scss'

export const NO_DATA = 'No data'
export const isValid = value => !isNaN(parseFloat(value))

export const DEFAULT_COLUMNS = [
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
    Cell: ({ row: { original } }) => (
      <Project {...original} to={`/projects/${original.slug}`} />
    )
  },
  {
    Header: 'Price chart, 7d',
    accessor: 'priceChart7d',
    Cell: ({ value }) => <PriceGraph data={value} />,
    disableSortBy: true
  }
]

export const STATIC_COLUMNS = [
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
    Cell: ({ value }) =>
      isValid(value) ? `Ξ${defaultFormatter(value)}` : NO_DATA,
    disableSortBy: true
  },
  {
    Header: 'Market Segments',
    accessor: 'marketSegments',
    Cell: ({ value: values = [] }) => (
      <div className={styles.segments}>
        {values.map(segment => (
          <Label variant='fill' className={styles.segment} key={segment}>
            {segment}
          </Label>
        ))}
      </div>
    ),
    disableSortBy: true
  }
]
