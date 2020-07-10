import React from 'react'
import { ResponsiveContainer, Treemap } from 'recharts'
import PageLoader from '../../../../components/Loader/PageLoader'
import Range from '../WatchlistOverview/Range'
import { useProjectRanges } from './ProjectsChart'
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

const getFontSize = index => {
  if (index < 4) {
    return 14
  } else if (index < 7) {
    return 12
  } else {
    return 10
  }
}

const ProjectsTreeMap = ({ assets, title, ranges, colors, className }) => {
  const [
    data,
    loading,
    { intervalIndex, setIntervalIndex, label, key }
  ] = useProjectRanges({ assets, ranges, limit: 10 })

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
              data={data}
              dataKey={key}
              ratio={2 / 3}
              fill='var(--jungle-green)'
              content={<CustomizedContent colors={colors} dataKey={key} />}
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
    colors,
    dataKey,
    root: { children }
  } = props

  const item = children[index]
  const { ticker } = item

  const fontSize = getFontSize(index)

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: getColor(colors, index),
          stroke: 'var(--white)',
          strokeWidth: 2
        }}
      />
      <text
        x={x + width / 2}
        y={y + height / 2 - 5}
        textAnchor='middle'
        fill='var(--fiord)'
        fontSize={fontSize}
      >
        {ticker}
      </text>
      <text
        x={x + width / 2}
        y={y + height / 2 + fontSize - 3}
        textAnchor='middle'
        fill='var(--fiord)'
        fontSize={fontSize}
      >
        {'+' + formatNumber(item[dataKey]) + '%'}
      </text>
    </g>
  )
}

export default ProjectsTreeMap
