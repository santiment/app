import React from 'react'
import cx from 'classnames'
import { Bar, Cell, LabelList } from 'recharts'
import { tooltipValueFormatter } from '../../dataHub/metrics/formatters'
import ProjectIcon from '../../../components/ProjectIcon/ProjectIcon'
import { makeShortAddresLink } from '../../../components/WalletLink/EthLinkWithLabels'
import { isEthStrictAddress } from '../../../utils/utils'
import WalletLink from '../../../components/WalletLink/WalletLink'
import styles from './ProjectsBarChart.module.scss'

export const renderHorizontalLabel = props => {
  const { x, y, width, data, index, dataKey } = props
  const item = data[index]
  const value = item[dataKey]
  const fontSize = width < 20 ? 7 : 12
  const position = +value >= 0 ? -1 * (fontSize / 2) : fontSize

  return (
    <g>
      <text
        x={x + width / 2}
        y={y + position}
        fill={'var(--rhino)'}
        textAnchor='middle'
        fontSize={fontSize}
        fontWeight={500}
      >
        {tooltipValueFormatter({
          value
        })}
      </text>
    </g>
  )
}

export const renderVerticalLabel = props => {
  const { x, y, width, data, index, dataKey, isDesktop } = props
  const item = data[index]
  const value = item[dataKey]

  const xOffset = isDesktop ? 34 : 26

  return (
    <g>
      <text
        x={x + width + xOffset}
        y={y + 24}
        fill={'var(--rhino)'}
        textAnchor='middle'
        fontSize={isDesktop ? 16 : 14}
        fontWeight={500}
      >
        {tooltipValueFormatter({
          value
        })}
      </text>
    </g>
  )
}

export const PREDEFINED_COLORS = {
  tether: '#50AF95',
  'gemini-dollar': '#00DCFA',
  'binance-usd': '#F0B90B'
}

export const HorizontalCategoryTick = props => {
  const {
    x,
    y,
    payload: { value },
    data,
    index
  } = props
  const item = data[index] || {}
  return (
    <foreignObject x={x - 35} y={y} width={70} height={80}>
      <div className={styles.name}>
        <ProjectIcon slug={value} size={30} />
        <ProjectTicker item={item} />
      </div>
    </foreignObject>
  )
}

export const VerticalCategoryTick = props => {
  const {
    x,
    y,
    payload: { value },
    data,
    index
  } = props
  const item = data[index] || {}
  return (
    <foreignObject x={x - 94} y={y - 16} width={120} height={40}>
      <div className={cx(styles.name, styles.name__vertical)}>
        <ProjectIcon slug={value} size={26} />
        <ProjectTicker item={item} />
      </div>
    </foreignObject>
  )
}

export function getProjectsMarkup ({
  dataKey,
  data,
  MetricColor,
  onProjectClick,
  radius = [8, 8, 0, 0],
  barSize,
  maxBarSize = 32,
  labelRenderer = renderHorizontalLabel,
  isDesktop
}) {
  return (
    <Bar
      dataKey={dataKey}
      radius={radius}
      maxBarSize={maxBarSize}
      barSize={barSize}
    >
      <LabelList
        dataKey={dataKey}
        content={props => labelRenderer({ ...props, data, dataKey, isDesktop })}
      />
      {data.map((entry, index) => {
        return (
          <Cell
            key={`cell-${index}`}
            fill={MetricColor[entry.key]}
            onClick={() => onProjectClick({ ...entry, value: entry.slug })}
          />
        )
      })}
    </Bar>
  )
}

const LINK_SETTINGS = { linkSymbolsCount: 7 }

const ProjectTicker = ({ item }) => {
  const { ticker, address } = item

  const isEthAddress = address && isEthStrictAddress(address)

  if (!isEthAddress) {
    return <div className={styles.ticker}>{ticker || address}</div>
  }

  return (
    <WalletLink
      trigger={
        <div className={styles.ticker}>
          {makeShortAddresLink({ link: address, settings: LINK_SETTINGS })}
        </div>
      }
      assets={[]}
      address={address}
      settings={{ linkSymbolsCount: address.length }}
    />
  )
}
