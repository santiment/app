import React, { useState, useEffect } from 'react'
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
    color: '#785549'
  },
  dexTrader: {
    label: 'DEX Traders only',
    color: '#5275FF'
  },
  cexTrader: {
    label: 'CEX Traders only',
    color: '#FFDAC5'
  },
  cexDexTrader: {
    label: 'CEX + DEX Traders',
    color: '#FF5B5B'
  },
  otherTransfers: {
    label: 'Other Addresses',
    color: '#D4E763'
  },
  notMoved: {
    label: 'Not moved',
    color: '#F47BF7'
  }
}

function transformData (data) {
  if (!data && !data.totalMinted) {
    return
  }

  const total = data.totalMinted
  const movedSum =
    data.centralizedExchanges +
    data.decentralizedExchanges +
    data.dexTrader +
    data.cexTrader +
    data.cexDexTrader +
    data.otherTransfers
  const notMoved = total - movedSum
  const fullData = { ...data, notMoved }

  const items = [
    'centralizedExchanges',
    'decentralizedExchanges',
    'dexTrader',
    'cexTrader',
    'cexDexTrader',
    'otherTransfers',
    'notMoved'
  ]

  const chartData = items.map(item => {
    const name = obj[item].label
    const value = (fullData[item] * 100) / total || 0

    return { name, value, rawValue: fullData[item], color: obj[item].color }
  })

  return { total, movedSum, notMoved, chartData }
}

function getPercentStr (value = 0, total = 0) {
  if (total === 0) return ''

  return `(${((value * 100) / total).toFixed(2)}%)`
}

const UniswapPieChart = () => {
  const currDate = new Date()
  const [rawData = {}, loading] = useUniswapValueDistribution()
  const { MMM, D } = getDateFormats(currDate)
  const { H, mm } = getTimeFormats(currDate)
  const {
    total = 0,
    movedSum = 0,
    notMoved = 0,
    chartData = []
  } = transformData(rawData)

  const [isMissedData, setIsMissedData] = useState(false)

  useEffect(
    () => {
      if (!loading) {
        const noData = chartData.filter(
          ({ rawValue }) => rawValue === undefined
        )
        const isTotallyEpmty = chartData.filter(
          ({ rawValue }) => rawValue === null
        )
        if (noData.length > 0 || isTotallyEpmty.length === chartData.length) {
          setIsMissedData(true)
        }
      }
    },
    [loading]
  )

  if (!loading && isMissedData) return null

  return (
    <>
      <Skeleton repeat={1} className={styles.skeleton} show={loading} />
      {!loading && rawData.totalMinted !== undefined && (
        <div className={styles.wrapper}>
          <div className={styles.chart}>
            <PieChart width={400} height={300}>
              <Pie
                data={chartData}
                cx={200}
                cy={140}
                labelLine={false}
                outerRadius={140}
                dataKey={'value'}
                valueKey={'value'}
              >
                {chartData.map(({ color }, idx) => (
                  <Cell fill={color} key={idx} />
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
              <h4 className={styles.title}>Total claimed:</h4>
              <span className={styles.value}>{formatNumber(total)}</span>
            </div>
            <div className={styles.row}>
              <h4 className={styles.title}>
                Moved after claimed {getPercentStr(movedSum, total)}:
              </h4>
              <span className={styles.value}>{formatNumber(movedSum)}</span>
            </div>
            <ul className={styles.list}>
              {chartData.map(({ name, value, rawValue, color }, idx) => {
                if (name === obj.notMoved.label) return null
                return (
                  <li
                    key={idx}
                    className={styles.item}
                    style={{ '--pie-chart-item-color': color }}
                  >
                    <span className={styles.item__name}>
                      {name} ({value.toFixed(2)}%):
                    </span>
                    <span className={styles.item__value}>
                      {formatNumber(rawValue || 0)}
                    </span>
                  </li>
                )
              })}
            </ul>
            <div className={styles.row}>
              <h4 className={styles.title}>
                Dormant after claimed {getPercentStr(notMoved, total)}:
              </h4>
              <span className={styles.value}>{formatNumber(notMoved)}</span>
            </div>
            <ul className={styles.list}>
              {chartData.map(({ name, value, rawValue, color }, idx) => {
                if (name !== obj.notMoved.label) return null
                return (
                  <li
                    key={idx}
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
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default UniswapPieChart
