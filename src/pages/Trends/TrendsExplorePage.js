import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as qs from 'query-string'
import { Panel, Selector } from '@santiment-network/ui'
import GetTimeSeries from './../../components/GetTimeSeries'
import GetTrends from './../../components/Trends/GetTrends'
import TrendsReChart from './../../components/Trends/TrendsReChart'
import TrendsStats from './../../components/Trends/TrendsStats'
import TrendsTitle from '../../components/Trends/TrendsTitle'
import TrendsExploreShare from './../../components/Trends/Explore/TrendsExploreShare'
import TrendsExploreSearch from './../../components/Trends/Explore/TrendsExploreSearch'
import WordCloud from './../../components/WordCloud/WordCloud'
import GetWordContext from './../../components/WordCloud/GetWordContext'
import { checkHasPremium } from './../UserSelectors'
import { mapQSToState, mapStateToQS, capitalizeStr } from './../../utils/utils'
import styles from './TrendsExplorePage.module.scss'

export class TrendsExplorePage extends Component {
  state = {
    ...mapQSToState(this.props)
  }

  static defaultProps = {
    match: { params: {} },
    history: {}
  }

  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    return { ...mapQSToState(nextProps) }
  }

  render () {
    const { match, hasPremium } = this.props
    const { timeRange, asset = '' } = this.state
    const topic = window.decodeURIComponent(match.params.topic)
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
                options={['bitcoin', 'ethereum']}
                nameOptions={['BTC/USD', 'ETH/USD']}
                onSelectOption={this.handleSelectAsset}
                defaultSelected={asset}
              />
            </Panel>
            <TrendsExploreShare topic={topic} />
          </div>
        </div>
        <div>
          <GetWordContext
            word={match.params.topic}
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
            topic={match.params.topic}
            timeRange={timeRange}
            interval={'1d'}
            render={trends => (
              <GetTimeSeries
                price={{
                  timeRange,
                  slug: asset,
                  interval: '1d'
                }}
                render={({ timeseries }) => (
                  <div style={{ minHeight: 300 }}>
                    <TrendsReChart
                      asset={asset && capitalizeStr(asset)}
                      data={timeseries.price}
                      trends={trends}
                      hasPremium={hasPremium}
                    />
                  </div>
                )}
              />
            )}
          />

          <TrendsStats timeRange={timeRange} />
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
    hasPremium: checkHasPremium(state)
  }
}

export default connect(mapStateToProps)(TrendsExplorePage)
