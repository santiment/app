import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { compose, withState } from 'recompose'
import Sticky from 'react-stickynode'
import TrendsSearch from '../../components/Trends/TrendsSearch'
import GetHypedTrends from './../../components/Trends/GetHypedTrends'
import HypedBlocks from './../../components/Trends/HypedBlocks'
import WordCloud from './../../components/WordCloud/WordCloud'
import styles from './TrendsPage.module.scss'

const WordCloudSticky = () => (
  <div className={styles.WordCloudSticky}>
    <WordCloud />
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
    {!isLoading && isDesktop && (word || isCloudLoading) &&
        <Sticky
          top={'#word-cloud-sticky-anchor'}
          innerZ={2}
          onStateChange={({status}) => {
            setWordCloudStiky(status === Sticky.STATUS_FIXED)
          }}
          enabled>
          {
            isWordCloudSticky
              ? <WordCloudSticky />
              : <div style={{marginTop: 24}}>
                <WordCloud />
              </div>
          }
        </Sticky>
    }
  </div>
)

const TrendsPage = ({
  word,
  isCloudLoading,
  setWordCloudStiky,
  isWordCloudSticky = false,
  isDesktop = true
}) => (
  <div className={styles.TrendsPage + ' page'}>
    <Helmet>
      <style>{'body { background-color: #F6F6F8; }'}</style>
    </Helmet>
    <div className={styles.header}>
      <h1>
        Explore frequently-used <br />
        words in crypto social media
      </h1>
      <TrendsSearch />
    </div>
    <GetHypedTrends
      render={({ isLoading, items }) => (
        <Fragment>
          <div id='word-cloud-sticky-anchor'></div>
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
    />
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
