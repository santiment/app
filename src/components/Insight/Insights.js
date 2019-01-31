import React, { Component } from 'react'
import { Selector, Button, Icon } from '@santiment-network/ui'
import InsightCard from './InsightCard'
import styles from './Insights.module.scss'

class Insights extends Component {
  render () {
    return (
      <div>
        <div className={styles.top}>
          <div className={styles.title}>
            Insights
            <span className={styles.count}> (5)</span>
          </div>
          <div className={styles.controls}>
            <Selector
              className={styles.selectors}
              options={['Recent', 'Popular']}
              onSelectOption={() => {}}
              defaultSelected='Recent'
            />
            <Button className={styles.btn} accent='green'>
              <Icon className={styles.icon} type='plus-round' />
              Add insight
            </Button>
          </div>
        </div>
        <div className={styles.bottom}>
          <InsightCard />
          <InsightCard />
          <InsightCard />
        </div>
      </div>
    )
  }
}

export default Insights
