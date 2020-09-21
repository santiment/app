import React from 'react'
import { PieChart, Pie, Cell } from 'recharts'
import { useUniswapWhoMoved } from './gql'
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
    color: '#37D7BA'
  },
  decentralizedExchanges: {
    label: 'Decentralized Exchanges',
    color: '#785549'
  },
  otherAddresses: {
    label: 'Other Addresses',
    color: '#FFDAC5'
  }
}

const COLORS = ['#37D7BA', '#785549', '#FFDAC5']

function transformData (data) {
  if (!data) {
    return
  }

  const total =
    data.centralizedExchanges +
    data.decentralizedExchanges +
    data.otherAddresses

  const items = [
    'centralizedExchanges',
    'decentralizedExchanges',
    'otherAddresses'
  ]

  const chartData = items.map(item => {
    const name = obj[item].label
    const value = (data[item] * 100) / total

    return { name, value, rawValue: data[item], color: obj[item].color }
  })

  return { chartData }
}

const WhoClaimedChart = () => {
  const currDate = new Date()
  const [rawData = {}, loading] = useUniswapWhoMoved()
  const { MMM, D } = getDateFormats(currDate)
  const { H, mm } = getTimeFormats(currDate)
  const { chartData } = transformData(rawData)

  return (
    <>
      <Skeleton repeat={1} className={styles.skeleton} show={loading} />
      {!loading && (
        <div className={styles.wrapper}>
          <div className={styles.chart}>
            <PieChart width={400} height={300}>
              <Pie
                data={chartData}
                cx={200}
                cy={140}
                labelLine={false}
                outerRadius={140}
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
            <ul className={styles.list}>
              {chartData.map(({ name, value, rawValue, color }) => (
                <li
                  key={name}
                  className={styles.item}
                  style={{ '--pie-chart-item-color': color }}
                >
                  <span className={styles.item__name}>
                    {name} ({value.toFixed(2)}%):
                  </span>
                  <span className={styles.item__value}>
                    {formatNumber(rawValue)}
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

export default WhoClaimedChart
