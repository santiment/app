import React, { Component } from 'react'
import { Tabs } from '@santiment-network/ui'
import cx from 'classnames'
import { compose, pure } from 'recompose'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import MarketcapWidget from '../TotalMarketcapWidget/GetTotalMarketcap'
import InsightAddBtn from '../Insight/InsightAddBtn'
import InsightCard from '../Insight/InsightCard'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import styles from './WidgetSonar.module.scss'

const allInsightsGQL = gql`
  query allInsightsPublic {
    allInsights {
      readyState
      id
      title
      createdAt
      votes {
        totalSanVotes
        totalVotes
      }
      tags {
        name
      }
      user {
        id
        username
      }
    }
  }
`

class WidgetSonar extends Component {
  state = {
    view: 'Marketcap'
  }

  onSelect = view => {
    this.setState({ view })
  }

  render() {
    const { view } = this.state
    const { insights, className, type, listName } = this.props
    console.log(insights)
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
              <Link to='/insights' className={styles.link}>
                See more
              </Link>
              <InsightAddBtn />
            </div>
            <div className={styles.insights}>
              {insights.slice(0, 3).map(insight => (
                <InsightCard
                  key={insight.id}
                  {...insight}
                  className={styles.insight}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tickers: state.projects.items.map(({ ticker }) => ticker)
})

const enhance = compose(
  connect(mapStateToProps),
  graphql(allInsightsGQL, {
    props: ({ data: { allInsights = [] }, ownProps: { tickers } }) => {
      return {
        insights: allInsights.filter(
          ({ tags, readyState }) =>
            readyState === 'published' &&
            tags.some(
              ({ name }) => name === 'Crypto Market' || tickers.includes(name)
            )
        )
      }
    }
  })
)

export default enhance(WidgetSonar)
