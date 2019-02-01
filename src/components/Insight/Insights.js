import React, { Component } from 'react'
import { Selector, Button, Icon } from '@santiment-network/ui'
import InsightCard from './InsightCard'
import styles from './Insights.module.scss'

const View = {
  RECENT: 'Recent',
  POPULAR: 'Popular'
}

const sortByRecent = ({ createdAt: aCreatedAt }, { createdAt: bCreatedAt }) =>
  new Date(aCreatedAt) < new Date(bCreatedAt) ? 1 : -1
const sortByPopularity = ({ votes: aVotes }, { votes: bVotes }) =>
  aVotes < bVotes ? 1 : -1

class Insights extends Component {
  static defaultProps = {
    insights: []
  }

  state = {
    insights: this.props.insights,
    view: View.RECENT
  }

  onViewSelect = newView => {
    const { view, insights } = this.state
    if (newView === view) return

    this.setState({
      insights: [...insights].sort(
        newView === View.RECENT ? sortByRecent : sortByPopularity
      ),
      view: newView
    })
  }

  render () {
    const { insights } = this.state

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
              options={[View.RECENT, View.POPULAR]}
              onSelectOption={this.onViewSelect}
              defaultSelected={View.RECENT}
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
