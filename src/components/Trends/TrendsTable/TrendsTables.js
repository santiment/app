import React, { PureComponent } from 'react'
import TrendsTable from './TrendsTable'
import { dateDifferenceInWords, HOUR } from '../../../utils/dates'
import styles from './TrendsTables.module.scss'

class TrendsTables extends PureComponent {
  render () {
    const { trends, isLoading } = this.props

    return (
      <div className={styles.tables}>
        {trends.length > 1 &&
          trends.slice(0, -1).map((trend, index) => (
            <TrendsTable
              header={dateDifferenceInWords({
                from: new Date(trend.datetime),
                format: HOUR
              })}
              notSelected
              key={index}
              className={styles.table}
              trend={trend}
            />
          ))}
        <TrendsTable
          className={styles.table}
          isLoading={isLoading}
          trend={trends.length > 0 ? trends[trends.length - 1] : {}}
          header='Last trends'
        />
      </div>
    )
  }
}

export default TrendsTables
