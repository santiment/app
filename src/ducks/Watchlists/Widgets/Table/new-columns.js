import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import { formatNumber, millify } from '../../../../utils/formatting'
import ProjectLabel from '../../../../components/ProjectLabel'
import PercentChanges from '../../../../components/PercentChanges'
import LayoutForAsset from '../../../Studio/Template/LayoutForAsset/LayoutForAsset'
import PriceGraph from './PriceGraph'
import styles from './new-columns.module.scss'

const isValidValue = value => !isNaN(parseFloat(value))

const NO_DATA = 'No data'

export const DEFAULT_SORTING = [{ id: 'marketcapUsd', desc: false }]

export const COLUMNS = [
  // {
  //   id: COLUMNS_NAMES.checkboxes,
  //   Header: ' ',
  //   Cell: row => {
  //     const { original, tdProps = {} } = row
  //     const { rest: { assets, addasset } = {} } = tdProps
  //     return (
  //       <div
  //         className={styles.assetCheckbox}
  //         onClick={() => addasset(original)}
  //       >
  //         <Checkbox isActive={assets.find(({ id }) => id === original.id)} />
  //       </div>
  //     )
  //   }
  // },
  {
    Header: '#',
    accessor: 'name',
    Cell: ({ sortedRows, row }) => {
      const index = sortedRows.findIndex(item => item === row)
      return index + 1
      // const { original, page, pageSize, viewIndex, tdProps = {} } = row
      // const { rest: { markedasnew, hide } = {} } = tdProps
      // return (
      //   <LayoutForAsset
      //     item={original}
      //     index={page * pageSize + viewIndex + 1}
      //     hide={hide}
      //     markedAsNew={markedasnew && markedasnew.id === original.id}
      //   />
      // )
    }
  },
  {
    Header: 'Project',
    accessor: 'Project',
    resizable: true,
    Cell: ({ row: { original } }) => {
      const { slug, priceUsd } = original

      return (
        <Link to={{ pathname: `/projects/${slug}` }}>
          <ProjectLabel {...original} />
        </Link>
      )
    }
  },
  {
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
    Header: 'Price 24h %',
    accessor: 'percentChange24h',
    Cell: ({ value }) => (
      <div className='overview-price-percent'>
        {isValidValue(value) ? <PercentChanges changes={value} /> : NO_DATA}
      </div>
    )
  },
  {
    Header: 'Price chart, 7d',
    accessor: 'priceChart7d',
    Cell: ({ value }) => <PriceGraph data={value} />,
    disableSortBy: true
  },
  {
    Header: 'Volume',
    accessor: 'volumeUsd',
    Cell: ({ value }) => (
      <div className='overview-volume'>
        {isValidValue(value) ? `$${millify(value, 2)}` : NO_DATA}
      </div>
    )
  },
  {
    Header: 'Volume 24h %',
    accessor: 'volumeChange24h',
    Cell: ({ value }) => (
      <div className='overview-volume-percent'>
        {isValidValue(value) ? <PercentChanges changes={value} /> : NO_DATA}
      </div>
    )
  },
  {
    Header: 'Market Cap',
    accessor: 'marketcapUsd',
    Cell: ({ value }) => (
      <div className='overview-marketcap'>
        {isValidValue(value) ? `$${millify(value, 2)}` : NO_DATA}
      </div>
    )
  },
  {
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
    Header: 'ETH spent, 30d',
    accessor: 'ethSpent',
    Cell: ({ value }) => (
      <div className='overview-ethspent'>{`Ξ${millify(value, 2)}`}</div>
    )
  },
  {
    Header: 'Dev act., 30d',
    accessor: 'averageDevActivity',
    Cell: ({ value }) => (
      <div className='overview-devactivity'>
        {!isNaN(parseFloat(value)) ? parseFloat(value).toFixed(2) : NO_DATA}
      </div>
    )
  },
  {
    Header: 'DAA, 30d',
    accessor: 'averageDailyActiveAddresses',
    Cell: ({ value }) => (
      <div className='overview-activeaddresses'>
        {isValidValue(value) ? formatNumber(value) : NO_DATA}
      </div>
    )
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
