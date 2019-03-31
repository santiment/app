import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { compose, withState } from 'recompose'
import { Helmet } from 'react-helmet'
import Sticky from 'react-stickynode'
import GetHypedTrends from './../../components/Trends/GetHypedTrends'
import HypedBlocks from './../../components/Trends/HypedBlocks'
import WordCloud from './../../components/WordCloud/WordCloud'
import SocialVolumeWidget from '../../components/SocialVolumeWidget/SocialVolumeWidget'
import HelpTrendsAbout from './HelpPopupTrendsAbout'
import styles from './TrendsPage.module.scss'
import InsightsTrends from '../../components/Insight/InsightsTrends'
import Devider from '../../components/Navbar/DropdownDevider'
import Trends from './Trends'

const TrendsPage = ({
  word,
  isCloudLoading,
  setWordCloudStiky,
  isWordCloudSticky = false,
  isDesktop = true
}) => (
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
      <h1>Emerging Social Trends</h1>
      <HelpTrendsAbout />
    </div>

    <GetHypedTrends
      render={({ isLoading, items }) => (
        <>
          <div className={styles.tables}>
            {items.length > 1 &&
              items
                .slice(0, -1)
                .map((trend, index) => (
                  <Trends notSelected key={index} trend={trend} />
                ))}
            <Trends
              isLoading={isLoading}
              trend={items.length > 0 ? items[items.length - 1] : {}}
            />
          </div>
          {false && (
            <Fragment>
              <div id='word-cloud-sticky-anchor' />
              <WordCloudWrapper
                isCloudLoading={isCloudLoading}
                isLoading={isLoading}
                word={word}
                isDesktop={isDesktop}
                setWordCloudStiky={setWordCloudStiky}
                isWordCloudSticky={isWordCloudSticky}
              />
              <HypedBlocks
                items={items}
                isLoading={isLoading}
                isDesktop={isDesktop}
              />
            </Fragment>
          )}
        </>
      )}
    />
    <Devider style={{ margin: '40px 0' }} />
    <InsightsTrends className={styles.insights} />
  </div>
)

const WordCloudWrapper = ({
  isLoading,
  isDesktop,
  word,
  isCloudLoading,
  isWordCloudSticky,
  setWordCloudStiky
}) => (
  <div>
    {!isLoading && isDesktop && (
      <Sticky
        top={'#word-cloud-sticky-anchor'}
        innerZ={2}
        onStateChange={({ status }) => {
          setWordCloudStiky(status === Sticky.STATUS_FIXED)
        }}
        enabled
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: isWordCloudSticky ? 0 : 24
          }}
          className={isWordCloudSticky ? styles.WordCloudSticky : ''}
        >
          <SocialVolumeWidget />
          <WordCloud />
        </div>
      </Sticky>
    )}
  </div>
)

const mapStateToProps = (state, ownProps) => ({
  isCloudLoading: state.wordCloud.isLoading,
  error: state.wordCloud.error,
  word: state.wordCloud.word
})

export default compose(
  withState('isWordCloudSticky', 'setWordCloudStiky', false),
  connect(mapStateToProps)
)(TrendsPage)
