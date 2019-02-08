import React, { Component } from 'react'
import { Tabs } from '@santiment-network/ui'
import cx from 'classnames'
import MarketcapWidget from '../TotalMarketcapWidget/GetTotalMarketcap'
import InsightAddBtn from '../Insight/InsightAddBtn'
import InsightCard from '../Insight/InsightCard'
import styles from './WidgetSonar.module.scss'
const insights = [
  {
    id: 0,
    user: {
      username: 'Storybook very very very long name',
      id: 0
    },
    title: 'Small title',
    tags: [],
    createdAt: new Date().toISOString(),
    votes: {
      totalVotes: 5
    }
  },
  {
    id: 1,
    user: {
      username: 'Storyboodnfgkjsdnfgkjnsdfgknsdfgkjnsdfkgjasdfasdfn',
      id: 1
    },
    title: 'Small title',
    tags: [{ name: 'btc' }, { name: 'eth' }],
    createdAt: new Date(Date.now() - 99000).toISOString(),
    votes: {
      totalVotes: 3
    }
  },
  {
    id: 2,
    user: {
      username: 'Storybook',
      id: 2
    },
    title:
      'Veryvery very very very very very very very very large large long long title asdhjfbasjdhbfkj abshsdbf kjabdhskj',
    tags: [
      { name: 'btc' },
      { name: 'eth' },
      { name: 'erm' },
      { name: 'et' },
      { name: 'very very long tag' },
      { name: 'long tags' }
    ],
    createdAt: new Date(Date.now() - 9950000).toISOString(),
    votes: {
      totalVotes: 4
    }
  }
]

class WidgetSonar extends Component {
  state = {
    view: 'Marketcap'
  }

  onSelect = view => {
    this.setState({ view })
  }

  render () {
    const { view } = this.state
    const { className, type, listName } = this.props
    return (
      <div className={cx(styles.wrapper, className)}>
        <Tabs
          options={['Marketcap', 'Insights']}
          defaultSelectedIndex='Marketcap'
          onSelect={this.onSelect}
          className={styles.tabs}
        />
        {view === 'Marketcap' ? (
          <MarketcapWidget type={type} listName={listName} />
        ) : (
          <div className={styles.content}>
            <div className={styles.content__top}>
              <a href=''>See more</a>
              <InsightAddBtn />
            </div>
            <div className={styles.insights}>
              {insights.map(insight => (
                <InsightCard {...insight} className={styles.insight} />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default WidgetSonar
