import React, { PureComponent } from 'react'
import TrendsTable from './TrendsTable'
import { dateDifferenceInWords, HOUR } from '../../../utils/dates'
import styles from './TrendsTables.module.scss'

class TrendsTables extends PureComponent {
  render () {
    const { trends, isLoading, selectable } = this.props

    return (
      <div className={styles.tables}>
        {trends.length > 1 &&
          trends.slice(0, -1).map(trend => {
            const { datetime } = trend
            return (
              <TrendsTable
                key={datetime}
                header={dateDifferenceInWords({
                  from: new Date(datetime),
                  format: HOUR
                })}
                small
                className={styles.table}
                trend={trend}
              />
            )
          })}
        <TrendsTable
          className={styles.table}
          isLoading={isLoading}
          trend={trends.length > 0 ? trends[trends.length - 1] : {}}
          header='Last trends'
          selectable={selectable}
        />
      </div>
    )
  }
}

export default TrendsTables
