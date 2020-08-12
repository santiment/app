import React from 'react'
import { ResponsiveContainer, Tooltip, Treemap } from 'recharts'
import Range from '../WatchlistOverview/Range'
import Skeleton from '../../../../components/Skeleton/Skeleton'
import { ProjectsChartTooltip } from '../../../SANCharts/tooltip/CommonChartTooltip'
import ColorsExplanation, { COLOR_MAPS } from './ColorsExplanation'
import NoDataCharts from './NoDataCharts'
import ScreenerChartTitle from './ScreenerChartTitle'
import { useProjectRanges, useWithColors } from './hooks'
import {
  formatProjectTreeMapValue,
  getFontSize,
  getSorter,
  getTooltipLabels,
  getWordLength,
  RANGES
} from './utils'
import styles from './ProjectsChart.module.scss'

const MARKETCAP_USD_SORTER = getSorter('marketcapUsd')

const ProjectsTreeMap = ({
  assets,
  loading: assetsLoading,
  ranges,
  className
}) => {
  const [
    data,
    loading,
    { intervalIndex, setIntervalIndex, label, key }
  ] = useProjectRanges({
    assets,
    ranges,
    limit: 100,
    sortByKey: 'marketcapUsd'
  })

  const sortedByChange = useWithColors(data, key)
  const sortedByMarketcap = sortedByChange.sort(MARKETCAP_USD_SORTER)

  const noData = !assetsLoading && assets.length === 0
  const isLoading = loading || assetsLoading

  return (
    <div className={className}>
      <div className={styles.title}>
        <ScreenerChartTitle type='Treemap' title='Price Changes, %' />
        <Range
          className={styles.selector}
          range={label}
          changeRange={() => {
            setIntervalIndex(
              ranges.length === 1 ? 0 : (intervalIndex + 1) % RANGES.length
            )
          }}
        />
      </div>
      <Skeleton
        className={styles.treeMap__skeletonTop}
        show={isLoading}
        repeat={1}
      />
      <Skeleton
        className={styles.treeMap__skeletonBottom}
        show={isLoading}
        repeat={1}
      />
      {noData ? (
        <div className={styles.noDataTreeMap}>
          <NoDataCharts />
        </div>
      ) : !isLoading ? (
        <div className={styles.treeMap}>
          <ResponsiveContainer width='100%' height='100%'>
            <Treemap
              data={sortedByMarketcap}
              dataKey={'marketcapUsd'}
              fill='var(--jungle-green)'
              isAnimationActive={false}
              content={<CustomizedContent dataKey={key} />}
            >
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
            </Treemap>
          </ResponsiveContainer>

          <ColorsExplanation colorMaps={COLOR_MAPS} range={label} />
        </div>
      ) : null}
    </div>
  )
}

const CustomizedContent = props => {
  const {
    x,
    y,
    width,
    height,
    index,
    dataKey,
    root: { children }
  } = props

  if (!children) {
    return null
  }

  const item = children[index]
  const { ticker = '', color } = item
  const value = formatProjectTreeMapValue(item[dataKey])

  const fontSize = getFontSize(index, children.length)

  const tickerLength = getWordLength(fontSize, ticker)

  const showTicker = tickerLength < width
  const showChange = showTicker && fontSize * 2 + 5 < height

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: color,
          stroke: 'var(--white)',
          strokeWidth: 2
        }}
      />
      {showTicker && (
        <text
          x={x + width / 2}
          y={y + height / 2 - (showChange ? 2 : -2)}
          textAnchor='middle'
          fill='var(--fiord)'
          fontSize={fontSize}
          fontWeight={500}
        >
          {ticker}
        </text>
      )}
      {showChange && (
        <text
          x={x + width / 2}
          y={y + height / 2 + fontSize - 1}
          textAnchor='middle'
          fill='var(--fiord)'
          fontSize={fontSize}
          fontWeight={500}
        >
          {value}
        </text>
      )}
    </g>
  )
}

export default ProjectsTreeMap
