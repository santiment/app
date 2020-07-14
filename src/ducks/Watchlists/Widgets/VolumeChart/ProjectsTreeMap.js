import React from 'react'
import { ResponsiveContainer, Treemap } from 'recharts'
import PageLoader from '../../../../components/Loader/PageLoader'
import Range from '../WatchlistOverview/Range'
import { getSorter, useProjectRanges } from './ProjectsChart'
import { formatNumber } from '../../../../utils/formatting'
import styles from './ProjectsChart.module.scss'

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

const getColor = (colors, index) => {
  if (index % 2 === 0) {
    return colors[0]
  } else if (index % 3) {
    return colors[1]
  } else {
    return colors[2]
  }
}

const getFontSize = (index, length) => {
  if (index < length * 0.1) {
    return 14
  } else if (index < length * 0.15) {
    return 12
  } else {
    return 10
  }
}

const TREEMAP_COLORS = [
  '#14C393',
  '#89E1C9',
  '#DCF6EF',
  '#9FAAC4',
  '#FFE6E6',
  '#EFA7A7',
  '#FF5B5B'
]

const MARKETCAP_USD_SORTER = getSorter('marketcapUsd')

const ProjectsTreeMap = ({ assets, title, ranges, className }) => {
  const [
    data,
    loading,
    { intervalIndex, setIntervalIndex, label, key }
  ] = useProjectRanges({ assets, ranges, limit: 50 })

  let border = data.length / TREEMAP_COLORS.length

  console.log('--------', border)

  let sortedByChange = data.sort(getSorter(key)).map((item, index) => {
    const colorIndex = Math.round(index / border)

    console.log(colorIndex, index, TREEMAP_COLORS[colorIndex])

    return {
      ...item,
      color: TREEMAP_COLORS[colorIndex]
    }
  })

  console.log(data, sortedByChange)

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
              ratio={2 / 3}
              fill='var(--jungle-green)'
              content={<CustomizedContent dataKey={key} />}
            />
          </ResponsiveContainer>
        </div>
      )}
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

  const item = children[index]
  const { ticker, color } = item

  const fontSize = getFontSize(index, children.length)

  const showChange = index < 10

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
      {index < 25 && (
        <text
          x={x + width / 2}
          y={y + height / 2 - (showChange ? 5 : -4)}
          textAnchor='middle'
          fill='var(--fiord)'
          fontSize={fontSize}
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
        >
          {formatNumber(item[dataKey], {
            maximumFractionDigits: 3
          }) + '%'}
        </text>
      )}
    </g>
  )
}

export default ProjectsTreeMap
