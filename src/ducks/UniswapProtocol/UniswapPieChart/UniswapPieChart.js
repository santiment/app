import React from 'react'
import { PieChart, Pie, Cell } from 'recharts'
import { useUniswapValueDistribution } from './gql'
import { formatNumber } from '../../../utils/formatting'
import Skeleton from '../../../components/Skeleton/Skeleton'
import {
  getDateFormats,
  getTimeFormats,
  make12Hours,
  getAmPm
} from '../../../utils/dates'
import styles from './UniswapPieChart.module.scss'

const obj = {
  centralizedExchanges: {
    label: 'Centralized Exchanges',
    color: '#68DBF4'
  },
  decentralizedExchanges: {
    label: 'Decentralized Exchanges',
    color: '#FF5B5B'
  },
  dexTrader: {
    label: 'DEX Trader',
    color: '#5275FF'
  },
  otherTransfers: {
    label: 'Other Transfers',
    color: '#D4E763'
  },
  notMoved: {
    label: 'Not moved',
    color: '#AC948C'
  }
}

const COLORS = ['#68DBF4', '#FF5B5B', '#5275FF', '#D4E763', '#AC948C']

function transformData (data) {
  if (!data) {
    return
  }

  const total = data.totalMinted
  const movedSum =
    data.centralizedExchanges +
    data.decentralizedExchanges +
    data.dexTrader +
    data.otherTransfers
  const notMoved = total - movedSum
  const fullData = { ...data, notMoved }

  const items = [
    'centralizedExchanges',
    'decentralizedExchanges',
    'dexTrader',
    'otherTransfers',
    'notMoved'
  ]

  const chartData = items.map(item => {
    const name = obj[item].label
    const value = (fullData[item] * 100) / total

    return { name, value, rawValue: fullData[item], color: obj[item].color }
  })

  return { total, movedSum, notMoved, chartData }
}

const UniswapPieChart = () => {
  const currDate = new Date()
  const [rawData = {}, loading] = useUniswapValueDistribution()
  const { MMM, D } = getDateFormats(currDate)
  const { H, mm } = getTimeFormats(currDate)
  const { total, movedSum, notMoved, chartData } = transformData(rawData)

  return (
    <>
      <Skeleton repeat={1} className={styles.skeleton} show={loading} />
      {!loading && (
        <div className={styles.wrapper}>
          <div className={styles.chart}>
            <PieChart width={300} height={300}>
              <Pie
                data={chartData}
                cx={150}
                cy={130}
                labelLine={false}
                outerRadius={80}
                fill='#8884d8'
              >
                {chartData.map((entry, index) => (
                  <Cell fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
            <p
              className={styles.time}
            >{`Last update: ${D} ${MMM}, ${make12Hours(H)}:${mm}${getAmPm(
                H
              )}`}</p>
          </div>
          <div className={styles.text}>
            <div className={styles.row}>
              <h4 className={styles.title}>Total minted:</h4>
              <span className={styles.value}>{formatNumber(total)}</span>
            </div>
            <div className={styles.row}>
              <h4 className={styles.title}>Moved after claiming to:</h4>
              <span className={styles.value}>{formatNumber(movedSum)}</span>
            </div>
            <div className={styles.row}>
              <h4 className={styles.title}>Not moved:</h4>
              <span className={styles.value}>{formatNumber(notMoved)}</span>
            </div>
            <ul className={styles.list}>
              {chartData.map(({ name, value, rawValue, color }) => (
                <li
                  className={styles.item}
                  style={{ '--pie-chart-item-color': color }}
                >
                  <span className={styles.item__name}>{name}: </span>
                  <span className={styles.item__value}>
                    {formatNumber(rawValue)} ({value.toFixed(2)}%)
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default UniswapPieChart
