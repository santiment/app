import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { compose, withProps } from 'recompose'
import PropTypes from 'prop-types'
import { Panel, Selector } from '@santiment-network/ui'
import GetTimeSeries from './../../components/GetTimeSeries'
import GetTrends from './../../components/Trends/GetTrends'
import TrendsReChart from './../../components/Trends/TrendsReChart'
import TrendsStats from './../../components/Trends/TrendsStats'
import TrendsExploreSearch from './../../components/Trends/Explore/TrendsExploreSearch'
import * as actions from '../../components/Trends/actions'
import withDetectionAsset from '../../components/Trends/withDetectionAsset'
import WordCloud from './../../components/WordCloud/WordCloud'
import GetWordContext from './../../components/WordCloud/GetWordContext'
import ShareModalTrigger from '../../components/Share/ShareModalTrigger'
import { checkHasPremium } from './../UserSelectors'
import { mapQSToState, mapStateToQS, capitalizeStr } from './../../utils/utils'
import styles from './TrendsExplorePage.module.scss'

const getCustomInterval = timeframe => {
  if (timeframe === '1w') {
    return '1h'
  }
  if (timeframe === '1m') {
    return '6h'
  }
  return '1d'
}

export class TrendsExplorePage extends Component {
  state = {
    timeRange: '3m',
    asset: 'bitcoin',
    ...mapQSToState(this.props)
  }

  static defaultProps = {
    match: { params: {} },
    word: '',
    history: {}
  }

  static propTypes = {
    match: PropTypes.object,
    word: PropTypes.string,
    history: PropTypes.object
  }

  componentDidMount () {
    this.props.fetchAllTickersSlugs()
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    return { ...mapQSToState(nextProps) }
  }

  render () {
    const { word, hasPremium, detectedAsset } = this.props
    const { timeRange, asset = '' } = this.state
    const topic = window.decodeURIComponent(word)
    return (
      <div className={styles.TrendsExplorePage}>
        <div className={styles.settings}>
          <div className={styles.settingsLeft}>
            <TrendsExploreSearch className={styles.search} topic={topic} />
          </div>
          <div className={styles.settingsRight}>
            <Selector
              options={['1w', '1m', '3m', '6m']}
              onSelectOption={this.handleSelectTimeRange}
              defaultSelected={timeRange}
            />
            <Panel className={styles.pricePair}>
              <Selector
                options={
                  detectedAsset
                    ? ['bitcoin', 'ethereum', detectedAsset.slug]
                    : ['bitcoin', 'ethereum']
                }
                nameOptions={
                  detectedAsset
                    ? ['BTC/USD', 'ETH/USD', `${detectedAsset.ticker}/USD`]
                    : ['BTC/USD', 'ETH/USD']
                }
                onSelectOption={this.handleSelectAsset}
                defaultSelected={asset}
              />
            </Panel>
            <ShareModalTrigger
              shareTitle='Santiment'
              shareText={`Crypto Social Trends for "${topic}"`}
              shareLink={window.location.href}
            />
          </div>
        </div>
        <div>
          <GetWordContext
            word={word}
            render={({ cloud }) => {
              if (cloud && cloud.length === 0) {
                return ''
              }
              return (
                <div className={styles.wordCloud}>
                  <WordCloud />
                </div>
              )
            }}
          />
          <GetTrends
            topic={word}
            timeRange={timeRange}
            interval={'1d'}
            render={trends => (
              <GetTimeSeries
                price={{
                  timeRange,
                  slug: asset,
                  interval: getCustomInterval(timeRange)
                }}
                render={({ timeseries }) => (
                  <Fragment>
                    <div style={{ minHeight: 300 }}>
                      <TrendsReChart
                        asset={asset && capitalizeStr(asset)}
                        data={timeseries.price}
                        trends={trends}
                        hasPremium={hasPremium}
                      />
                    </div>
                    {trends.length > 0 && <TrendsStats timeRange={timeRange} />}
                  </Fragment>
                )}
              />
            )}
          />
        </div>
      </div>
    )
  }

  handleSelectTimeRange = timeRange => {
    this.setState({ timeRange }, this.updateSearchQuery)
  }

  handleSelectAsset = asset => {
    this.setState({ asset }, this.updateSearchQuery)
  }

  updateSearchQuery = () => {
    this.props.history.push({
      search: mapStateToQS(this.state)
    })
  }
}

const mapStateToProps = state => {
  return {
    hasPremium: checkHasPremium(state),
    allAssets: state.hypedTrends.allAssets
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAllTickersSlugs: () => {
    dispatch({
      type: actions.TRENDS_HYPED_FETCH_TICKERS_SLUGS
    })
  }
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withProps(({ match = { params: {} }, ...rest }) => {
    return {
      word: match.params.word,
      ...rest
    }
  }),
  withDetectionAsset
)(TrendsExplorePage)
