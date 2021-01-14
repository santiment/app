import React from 'react'
import { Cell, Pie, PieChart } from 'recharts'
import {
  getAmPm,
  getDateFormats,
  getTimeFormats,
  make12Hours
} from '../../utils/dates'
import Skeleton from '../Skeleton/Skeleton'
import { millify } from '../../utils/formatting'
import { COLORS } from '../../ducks/Chart/colors'
import { sortBy } from '../../utils/sortMethods'
import ViewBalanceDialog from '../WalletLink/ViewBalanceDialog'
import styles from './DashPieChart.module.scss'

const PIE_COLORS = COLORS

const SORTER = sortBy('value')

const DashPieChart = ({ rawData: chartData, loading }) => {
  const currDate = new Date()
  const { MMM, D } = getDateFormats(currDate)
  const { H, mm } = getTimeFormats(currDate)

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
                dataKey={'value'}
                valueKey={'value'}
              >
                {chartData.map(({ color }, idx) => (
                  <Cell fill={PIE_COLORS[idx]} key={idx} />
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
              {chartData
                .sort(SORTER)
                .map(({ label, value, address, color }, idx) => (
                  <li
                    key={idx}
                    className={styles.item}
                    style={{ '--pie-chart-item-color': PIE_COLORS[idx] }}
                  >
                    <span className={styles.item__name}>{label}:</span>
                    <span className={styles.item__value}>{millify(value)}</span>
                    {address && (
                      <ViewBalanceDialog
                        assets={['ethereum']}
                        address={address}
                        trigger={
                          <span className={styles.item__address}>
                            ({address})
                          </span>
                        }
                      />
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default DashPieChart
