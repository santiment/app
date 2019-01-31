import React, { Component } from 'react'
import { Selector, Button, Icon } from '@santiment-network/ui'
import InsightCard from './InsightCard'
import styles from './Insights.module.scss'

class Insights extends Component {
  static defaultProps = {
    insights: []
  }

  render () {
    const { insights } = this.props

    return (
      <div>
        <div className={styles.top}>
          <div className={styles.title}>
            Insights
            <span className={styles.count}> ({insights.length})</span>
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
          {insights.map(
            ({ id, user: author, title, tags, createdAt, votes }) => {
              return (
                <InsightCard
                  key={id}
                  author={author}
                  title={title}
                  tags={tags}
                  createdAt={createdAt}
                  votes={votes}
                />
              )
            }
          )}
        </div>
      </div>
    )
  }
}

export default Insights
