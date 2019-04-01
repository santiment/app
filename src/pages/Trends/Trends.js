import React, { PureComponent } from 'react'
import moment from 'moment'
import TrendsTable from './TrendsTable'
import styles from './TrendsTables.module.scss'

class Trends extends PureComponent {
  render () {
    const { trends, isLoading } = this.props

    return (
      <div className={styles.tables}>
        {trends.length > 1 &&
          trends
            .slice(0, -1)
            .map((trend, index) => (
              <TrendsTable
                header={`Compiled ${moment(trend.datetime).fromNow()}`}
                notSelected
                key={index}
                trend={trend}
              />
            ))}
        <TrendsTable
          isLoading={isLoading}
          trend={trends.length > 0 ? trends[trends.length - 1] : {}}
          header='Last trends'
        />
      </div>
    )
  }
}

export default Trends
