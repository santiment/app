import React, { useState, useCallback } from 'react'
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
import { ProjectsChartTooltip } from '../../../SANCharts/tooltip/CommonChartTooltip'
import Range from '../WatchlistOverview/Range'
import Skeleton from '../../../../components/Skeleton/Skeleton'
import NoDataCharts from './NoDataCharts'
import { formatNumber } from '../../../../utils/formatting'
import ScreenerChartTitle from './ScreenerChartTitle'
import { useProjectRanges } from './hooks'
import { getBarColor, getTooltipLabels, RANGES, SORT_RANGES } from './utils'
import styles from './ProjectsChart.module.scss'

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

  data.forEach(item => {
    item.color = getBarColor(item[key])
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
  const isLoading = loading || assetsLoading

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
          <Skeleton
            className={styles.ProjectsChart__skeletonTop}
            show={isLoading}
            repeat={1}
          />
          <Skeleton
            className={styles.ProjectsChart__skeletonBottom}
            show={isLoading}
            repeat={1}
          />
          {!isLoading && (
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
                      return (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
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
                      <ProjectsChartTooltip
                        labelFormatter={(value, payload) => {
                          const data = payload[0]
                          if (data.payload) {
                            return `${data.payload.name} ${data.payload.ticker}`
                          }
                        }}
                        payloadLabels={getTooltipLabels(key)}
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
