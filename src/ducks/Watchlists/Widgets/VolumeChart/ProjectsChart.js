import React, { useState, useEffect, useCallback } from 'react'
import memoize from 'lodash.memoize'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import cx from 'classnames'
import {
  Bar,
  Cell,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LabelList
} from 'recharts'
import PageLoader from '../../../../components/Loader/PageLoader'
import ChartTooltip from '../../../SANCharts/tooltip/CommonChartTooltip'
import Range from '../WatchlistOverview/Range'
import { useProjectPriceChanges } from '../../../../hooks/project'
import NoDataCharts from './NoDataCharts'
import { formatNumber } from '../../../../utils/formatting'
import ScreenerChartTitle from './ScreenerChartTitle'
import styles from './ProjectsChart.module.scss'

export const getSorter = memoize(({ sortKey, desc }) => (a, b) => {
  if (desc) {
    return +b[sortKey] - +a[sortKey]
  } else {
    return +a[sortKey] - +b[sortKey]
  }
})

export const useProjectRanges = ({
  assets,
  ranges,
  limit,
  sortByKey = 'marketcapUsd',
  desc = true
}) => {
  const [mapAssets, setMapAssets] = useState({})
  const [intervalIndex, setIntervalIndex] = useState(
    Math.min(ranges.length - 1, 1)
  )

  useEffect(
    () => {
      const newMap = {}

      assets.forEach(({ slug }) => {
        newMap[slug] = true
      })

      setMapAssets(newMap)
    },
    [assets]
  )

  const { label, key } = ranges[intervalIndex]

  const sortKey = sortByKey || key
  const sorter = getSorter({ sortKey, desc })

  const [data, loading] = useProjectPriceChanges({
    mapAssets,
    key,
    limit,
    sorter
  })

  return [data, loading, { intervalIndex, setIntervalIndex, label, key }]
}

export const RANGES = [
  {
    label: '1h',
    key: 'percentChange1h'
  },
  {
    label: '24h',
    key: 'percentChange24h'
  },
  {
    label: '7d',
    key: 'percentChange7d'
  }
]

export const SORT_RANGES = [
  {
    label: 'Marketcap  ⬆️',
    key: 'marketcapUsd'
  },
  {
    label: 'Marketcap  ⬇️',
    key: 'marketcapUsd',
    desc: false
  },
  {
    label: `Price changes  ⬆️`,
    key: ''
  },
  {
    label: 'Price changes  ⬇️',
    key: '',
    desc: false
  }
]

const renderCustomizedLabel = props => {
  const { x, y, width, value, fill } = props

  const fontSize = width < 20 ? 7 : 14
  const position = +value >= 0 ? -1 * (fontSize / 2) : fontSize

  return (
    <g>
      <text
        x={x + width / 2}
        y={y + position}
        fill={fill}
        textAnchor='middle'
        fontSize={fontSize}
        fontWeight={500}
      >
        {formatNumber(value, {
          maximumFractionDigits: 2
        })}
      </text>
    </g>
  )
}

function getColor (val) {
  return +val > 0 ? 'var(--jungle-green)' : 'var(--persimmon)'
}

const ProjectsChart = ({ assets, redirect, loading: assetsLoading }) => {
  const [sortedByIndex, setSortedByIndex] = useState(0)

  const { key: sortByKey, label: sortLabel, desc } = SORT_RANGES[sortedByIndex]

  const [
    data,
    loading,
    { intervalIndex, setIntervalIndex, label, key }
  ] = useProjectRanges({
    assets,
    limit: 100,
    ranges: RANGES,
    sortByKey,
    desc
  })

  const onProjectClick = useCallback(
    data => {
      const { value } = data
      return redirect(`/projects/${value}`)
    },
    [redirect]
  )

  const datakey = 'slug'

  const noData = !assetsLoading && assets.length === 0

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.range}>
          <ScreenerChartTitle type='Bar chart' title='Price Changes, %' />
          <Range
            className={styles.selector}
            range={label}
            changeRange={() => {
              setIntervalIndex((intervalIndex + 1) % RANGES.length)
            }}
          />
        </div>
        <div className={cx(styles.range, styles.sortedBy)}>
          <div className={styles.sortedByLabel}>Sorted by </div>
          <Range
            className={styles.rangeValue}
            range={sortLabel}
            changeRange={() => {
              setSortedByIndex((sortedByIndex + 1) % SORT_RANGES.length)
            }}
          />
        </div>
      </div>

      {noData ? (
        <div className={styles.noData}>
          <NoDataCharts />
        </div>
      ) : (
        <div className={styles.chartWrapper}>
          {loading || assetsLoading ? (
            <PageLoader />
          ) : (
            <div className={styles.chart}>
              <ResponsiveContainer width='100%' height='100%'>
                <ComposedChart
                  cursor='pointer'
                  data={data}
                  margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} stroke='var(--athens)' />

                  <YAxis
                    dataKey={key}
                    axisLine={false}
                    tickLine={false}
                    fontSize={10}
                    fontWeight={500}
                    stroke={'var(--casper)'}
                    tickCount={8}
                  />

                  <Bar dataKey={key}>
                    <LabelList dataKey={key} content={renderCustomizedLabel} />
                    {data.map((entry, index) => {
                      const color = getColor(entry[key])
                      return (
                        <Cell
                          key={`cell-${index}`}
                          fill={color}
                          onClick={() =>
                            onProjectClick({ value: entry[datakey] })
                          }
                        />
                      )
                    })}
                  </Bar>

                  <XAxis
                    dataKey={datakey}
                    minTickGap={0}
                    interval={0}
                    domain={['auto', 'auto']}
                    axisLine={false}
                    tickLine={false}
                    angle={-90}
                    height={135}
                    fontSize={12}
                    fontWeight={500}
                    textAnchor='end'
                    verticalAnchor='end'
                    stroke={'var(--fiord)'}
                    onClick={onProjectClick}
                  />

                  <Tooltip
                    content={
                      <ChartTooltip
                        labelFormatter={data => {
                          return data
                        }}
                        valueFormatter={({ value }) => {
                          return value + ' %'
                        }}
                        showValueLabel={false}
                      />
                    }
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  redirect: route => {
    dispatch(push(route))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(ProjectsChart)
