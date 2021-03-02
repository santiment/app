import React from 'react'
import { getFontSize, getWordLength } from './utils'
import { renderPercent } from '../../../../components/PercentChanges'

const CustomizedTreeMapContent = props => {
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

  console.log(dataKey, item)
  const { ticker = '', color } = item
  const value = renderPercent(100 * item[dataKey])

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

export default CustomizedTreeMapContent
