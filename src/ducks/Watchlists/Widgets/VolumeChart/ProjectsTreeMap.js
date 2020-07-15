import React from 'react'
import { ResponsiveContainer, Tooltip, Treemap } from 'recharts'
import PageLoader from '../../../../components/Loader/PageLoader'
import Range from '../WatchlistOverview/Range'
import { getSorter, useProjectRanges } from './ProjectsChart'
import { formatNumber } from '../../../../utils/formatting'
import styles from './ProjectsChart.module.scss'
import ChartTooltip from '../../../SANCharts/tooltip/CommonChartTooltip'

const RANGES = [
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

const getFontSize = (index, length) => {
  if (index < length * 0.05) {
    return 12
  } else if (index < length * 0.1) {
    return 10
  } else {
    return 8
  }
}

const TREEMAP_COLORS = [
  'var(--jungle-green)',
  '#89E1C9',
  '#DCF6EF',
  'var(--mystic)',
  '#FFE6E6',
  '#EFA7A7',
  'var(--persimmon)'
]

const MARKETCAP_USD_SORTER = getSorter('marketcapUsd')

const ProjectsTreeMap = ({ assets, title, ranges, className }) => {
  const [
    data,
    loading,
    { intervalIndex, setIntervalIndex, label, key }
  ] = useProjectRanges({ assets, ranges, limit: 100 })

  const logData = data.map(item => ({
    ...item,
    marketcapUsd: Math.log2(item.marketcapUsd)
  }))

  let border = logData.length / TREEMAP_COLORS.length

  let sortedByChange = logData.sort(getSorter(key)).map((item, index) => {
    const colorIndex = Math.floor(index / border)
    return {
      ...item,
      color: TREEMAP_COLORS[colorIndex]
    }
  })

  const sortedByMarketcap = sortedByChange.sort(MARKETCAP_USD_SORTER)

  return (
    <div className={className}>
      <div className={styles.title}>
        <div>{title}</div>
        <div className={styles.selector}>
          <Range
            range={label}
            changeRange={() => {
              setIntervalIndex(
                ranges.length === 1 ? 0 : (intervalIndex + 1) % RANGES.length
              )
            }}
          />
        </div>
      </div>

      {loading ? (
        <PageLoader containerClass={styles.loader} className={styles.loader} />
      ) : (
        <div className={styles.treeMap}>
          <ResponsiveContainer width='100%' height='100%'>
            <Treemap
              data={sortedByMarketcap}
              dataKey={'marketcapUsd'}
              fill='var(--jungle-green)'
              content={<CustomizedContent dataKey={key} />}
            >
              <Tooltip
                content={
                  <ChartTooltip
                    labelFormatter={(value, payload) => {
                      const data = payload[0]
                      if (data.payload) {
                        return data.payload.ticker
                      }
                    }}
                    showValueLabel={false}
                    valueFormatter={({ payload }) => {
                      const data = payload[0]
                      if (data.payload) {
                        return data.payload[key] + '%'
                      }
                    }}
                  />
                }
              />
            </Treemap>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

const getWordLength = (fontSize, word) => (fontSize - 3) * word.length + 8

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

  const item = children[index]
  const { ticker = '', color } = item
  const value =
    formatNumber(item[dataKey], {
      maximumFractionDigits: 2
    }) + '%'

  const fontSize = getFontSize(index, children.length)

  const tickerLength = getWordLength(fontSize, ticker)

  const showTicker = tickerLength < width
  const showChange = showTicker && fontSize * 2 + 8 < height

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
          y={y + height / 2 + fontSize - 3}
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
