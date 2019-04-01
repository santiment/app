import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Button, Icon } from '@santiment-network/ui'
import GetHypedTrends from './../../components/Trends/GetHypedTrends'
import styles from './TrendsPage.module.scss'
import InsightsTrends from '../../components/Insight/InsightsTrends'
import Devider from '../../components/Navbar/DropdownDevider'
import TrendsSearch from '../../components/Trends/TrendsSearch'
import TotalSocialVolume from './TotalSocialVolume'
import Trends from './Trends'

const TrendsPage = ({ word }) => (
  <div className={styles.TrendsPage + ' page'}>
    <Helmet>
      <title>Today’s Top Social Gainers in Crypto - SANbase</title>
      <meta
        property='og:title'
        content='Today’s Top Social Gainers in Crypto - SANbase'
      />
      <meta
        property='og:description'
        content='Top 10 words with the biggest spike on crypto social media (compared to their previous 2-week average). These are the biggest developing stories in crypto.'
      />
    </Helmet>
    <div className={styles.header}>
      <h1>Trending Words</h1>
      <Button border as={Link} to='/insights/new?currentTrends'>
        <Icon className={styles.icon} type='plus-round' /> Write insight
      </Button>
    </div>
    <TrendsSearch />
    <TotalSocialVolume />
    <GetHypedTrends
      render={({ isLoading, items }) => (
        <>
          <div className={styles.tables}>
            {items.length > 1 &&
              items
                .slice(0, -1)
                .map((trend, index) => (
                  <Trends
                    header={`Compiled ${moment(trend.datetime).fromNow()}`}
                    notSelected
                    key={index}
                    trend={trend}
                  />
                ))}
            <Trends
              isLoading={isLoading}
              trend={items.length > 0 ? items[items.length - 1] : {}}
              header='Last trends'
            />
          </div>
        </>
      )}
    />
    <Devider style={{ margin: '40px 0' }} />
    <InsightsTrends className={styles.insights} />
  </div>
)

const mapStateToProps = (state, ownProps) => ({
  isCloudLoading: state.wordCloud.isLoading,
  error: state.wordCloud.error,
  word: state.wordCloud.word
})

export default connect(mapStateToProps)(TrendsPage)
