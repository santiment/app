import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import { COLUMNS_NAMES } from './columns'
import { formatNumber, millify } from '../../../../utils/formatting'
import ProjectLabel from '../../../../components/ProjectLabel'
import PercentChanges from '../../../../components/PercentChanges'
import { Description } from '../../../dataHub/metrics/descriptions'
import LayoutForAsset from '../../../Studio/Template/LayoutForAsset/LayoutForAsset'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import PriceGraph from './PriceGraph'
import styles from './new-columns.module.scss'

const simpleSort = (a, b) => b - a

const isValidValue = value => !isNaN(parseFloat(value))

const NO_DATA = 'No data'

const constructColumn = ({
  heading: Heading,
  id = Heading,
  description,
  className,
  sortMethod,
  filterMethod,
  ...rest
}) => {
  const El = typeof Heading === 'string' ? Heading : <Heading />

  return {
    id,
    Header: () => <div className={cx('heading', className)}>{El}</div>,
    sortable: Boolean(sortMethod),
    sortMethod,
    filterable: Boolean(filterMethod),
    filterMethod,
    ...rest
  }
}

export const COLUMNS = (preload, props = {}) => [
  constructColumn({
    id: COLUMNS_NAMES.checkboxes,
    heading: ' ',
    maxWidth: 45,
    Cell: row => {
      const { original, tdProps = {} } = row
      const { rest: { assets, addasset } = {} } = tdProps
      return (
        <div
          className={styles.assetCheckbox}
          onClick={() => addasset(original)}
        >
          <Checkbox isActive={assets.find(({ id }) => id === original.id)} />
        </div>
      )
    }
  }),
  constructColumn({
    id: COLUMNS_NAMES.index,
    heading: '#',
    className: styles.columnId,
    maxWidth: 45,
    Cell: row => {
      const { original, page, pageSize, viewIndex, tdProps = {} } = row
      const { rest: { markedasnew, hide } = {} } = tdProps
      return (
        <LayoutForAsset
          item={original}
          index={page * pageSize + viewIndex + 1}
          hide={hide}
          markedAsNew={markedasnew && markedasnew.id === original.id}
        />
      )
    }
  }),
  constructColumn({
    id: COLUMNS_NAMES.project,
    heading: 'Project',
    minWidth: 200,
    maxWidth: 350,
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
    heading: 'Price 24h %',
    maxWidth: 110,
    accessor: 'percentChange24h',
    Cell: ({ value }) => (
      <div className='overview-price-percent'>
        {isValidValue(value) ? <PercentChanges changes={value} /> : NO_DATA}
      </div>
    ),
    sortMethod: simpleSort
  }),
  constructColumn({
    id: COLUMNS_NAMES.price_chart,
    heading: 'Price chart, 7d',
    maxWidth: 130,
    minWidth: 110,
    accessor: 'priceChart7d',
    Cell: ({ value }) => <PriceGraph data={value} />,
    sortable: false
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
    heading: 'Volume 24h %',
    maxWidth: 110,
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
    id: COLUMNS_NAMES.marketSegments,
    heading: 'Market Segments',
    accessor: 'marketSegments',
    minWidth: 205,
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
    sortMethod: simpleSort
  })
]
