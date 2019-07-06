import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import { Button } from 'semantic-ui-react'
import { Chart } from 'react-chartjs-2'
import * as qs from 'query-string'
import { compose, withState } from 'recompose'
import ProjectChartHeader from './ProjectChartHeader'
import ProjectChartFooter from './ProjectChartFooter'
import ProjectChart from './ProjectChart'
import ProjectChartMobile from './ProjectChartMobile'
import {
  dateDifference,
  getTimeIntervalFromToday,
  DAY
} from '../../utils/dates'
import { normalizeData, makeItervalBounds } from './utils'

// Fix X mode in Chart.js lib. Monkey loves this.
const originalX = Chart.Interaction.modes.x
Chart.Interaction.modes.x = function (chart, e, options) {
  const activePoints = originalX.apply(this, arguments)
  return activePoints.reduce((acc, item) => {
    const i = acc.findIndex(x => x._datasetIndex === item._datasetIndex)
    if (i <= -1) {
      acc.push(item)
    }
    return acc
  }, [])
}

const getYAxisScale = scales => {
  for (const key in scales) {
    if (/^y-axis/.test(key)) {
      return scales[`${key}`]
    }
  }
  return scales['y-axis-1']
}

// Draw a vertical line in our Chart, when tooltip is activated.
Chart.defaults.LineWithLine = Chart.defaults.line
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
  draw: function (ease) {
    Chart.controllers.line.prototype.draw.call(this, ease)

    const ctx = this.chart.ctx

    if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
      const activePoint = this.chart.tooltip._active[0]
      const x = activePoint.tooltipPosition().x
      const scale = getYAxisScale(this.chart.scales)
      if (!scale) {
        return
      }
      const topY = scale.top
      const bottomY = scale.bottom

      ctx.save()
      ctx.beginPath()
      ctx.moveTo(x, topY)
      ctx.lineTo(x, bottomY)
      ctx.lineWidth = 1
      ctx.strokeStyle = '#adadad'
      ctx.stroke()
      ctx.restore()
    }
  }
})

class ProjectChartContainer extends Component {
  constructor (props) {
    super(props)
    const shareableState = (shareable => {
      Object.keys(shareable).forEach(key => {
        shareable[`${key}`] = shareable[key] === 'true'
      })
      return shareable
    })(qs.parse(props.location.search))
    const { from, to } = makeItervalBounds('all')
    this.state = {
      interval: 'all',
      isError: false,
      errorMessage: '',
      selected: undefined,
      startDate: new Date(shareableState.from) || new Date(from),
      endDate: new Date(shareableState.from) || new Date(to),
      focusedInput: null,
      isToggledBTC: shareableState.currency && shareableState.currency === 'BTC'
    }

    if (Object.keys(shareableState).length > 0) {
      this.props.toggleVolume(shareableState.volume)
      this.props.toggleMarketcap(shareableState.marketcap)
      this.props.toggleDevActivity(shareableState.development)
      this.props.toggleTwitter(shareableState.twitter)
      this.props.toggleEmojisSentiment(shareableState.sentiment)
      this.props.toggleBurnRate(shareableState.tbr)
      this.props.toggleTransactionVolume(shareableState.tv)
      this.props.toggleActiveAddresses(shareableState.daa)
      this.props.toggleExchangeFundFlow(shareableState.eff)
      this.props.toggleEthSpentOverTime(shareableState.ethSpent)
      this.props.toggleEthPrice(shareableState.ethPrice)
      this.props.toggleICOPrice(shareableState.icoPrice)
    }

    this.setFilter = this.setFilter.bind(this)
    this.setSelected = this.setSelected.bind(this)
    this.onFocusChange = this.onFocusChange.bind(this)
    this.toggleBTC = this.toggleBTC.bind(this)
    this.setFromTo = this.setFromTo.bind(this)
  }

  onFocusChange (focusedInput) {
    this.setState({
      focusedInput: focusedInput
    })
  }

  setSelected (selected) {
    this.setState({ selected })
  }

  setFromTo (from, to) {
    if (!from || !to) {
      return
    }
    let interval = '1w'

    const fromDate = new Date(from)
    const toDate = new Date(to)

    const { diff: diffInDays } = dateDifference({
      from: fromDate,
      to: toDate,
      format: DAY
    })

    if (diffInDays > 32 && diffInDays < 900) {
      interval = '1d'
    } else if (diffInDays >= 900) {
      interval = '1w'
    } else if (diffInDays > 1 && diffInDays <= 7) {
      interval = '1h'
    } else if (diffInDays < 0) {
      interval = '5m'
    }
    this.props.changeTimeFilter({
      to: toDate.toISOString(),
      from: fromDate.toISOString(),
      interval,
      timeframe: undefined
    })
  }

  setFilter (timeframe) {
    const { from, to, minInterval } = makeItervalBounds(timeframe)
    let interval = minInterval
    const { diff: diffInDays } = dateDifference({
      from: new Date(from),
      to: new Date(to),
      format: DAY
    })

    if (diffInDays > 32 && diffInDays < 900) {
      interval = '1d'
    } else if (diffInDays >= 900) {
      interval = '1w'
    }
    this.props.changeTimeFilter({
      timeframe,
      to,
      from,
      interval
    })
  }

  toggleBTC (isToggledBTC) {
    this.setState({ isToggledBTC })
  }

  componentWillReceiveProps (nextProps) {
    if (
      nextProps.ticker !== this.props.ticker &&
      typeof this.props.ticker !== 'undefined'
    ) {
      this.setFilter('all')
      this.props.toggleVolume(true)
      this.props.toggleMarketcap(false)
      this.props.toggleDevActivity(false)
      this.props.toggleTwitter(false)
      this.props.toggleEmojisSentiment(false)
      this.props.toggleBurnRate(false)
      this.props.toggleTransactionVolume(false)
      this.props.toggleActiveAddresses(false)
      this.props.toggleExchangeFundFlow(false)
      this.props.toggleEthSpentOverTime(false)
      this.props.toggleEthPrice(false)
      this.props.toggleICOPrice(false)
    }
  }

  componentDidMount () {
    const { from, to, timeframe } = qs.parse(this.props.location.search)
    if (timeframe) {
      this.setFilter(timeframe)
    }
    if (from && to && !timeframe) {
      this.setFromTo(new Date(from), new Date(to))
    }
    if (!from && !to && !timeframe) {
      this.setFilter('all')
    }
  }

  render () {
    const newShareableState = {
      volume: this.props.isToggledVolume || undefined,
      marketcap: this.props.isToggledMarketCap || undefined,
      development: this.props.isToggledDevActivity || undefined,
      twitter: this.props.isToggledTwitter || undefined,
      sentiment: this.props.isToggledEmojisSentiment || undefined,
      tbr: this.props.isToggledBurnRate || undefined,
      tv: this.props.isToggledTransactionVolume || undefined,
      daa: this.props.isToggledDailyActiveAddresses || undefined,
      eff: this.props.isToggledExchangeFundFlow || undefined,
      ethSpent: this.props.isToggledEthSpentOverTime || undefined,
      ethPrice: this.props.isToggledEthPrice || undefined,
      currency: this.state.isToggledBTC ? 'BTC' : 'USD',
      from: this.props.timeFilter.from || undefined,
      to: this.props.timeFilter.to || undefined,
      timeframe: this.props.timeFilter.timeframe || undefined,
      icoPrice: this.props.isToggledICOPrice || undefined
    }
    let fullpath = window.location.href
    if (window.location.href.indexOf('?') > -1) {
      fullpath = window.location.href.split('?')[0]
    }
    const shareableURL = fullpath + '?' + qs.stringify(newShareableState)
    const burnRate = {
      ...this.props.burnRate,
      items: normalizeData({
        data: this.props.burnRate.items,
        fieldName: 'burnRate',
        filter: this.props.blockchainFilter
      })
    }
    const transactionVolume = {
      ...this.props.transactionVolume,
      items: normalizeData({
        data: this.props.transactionVolume.items,
        fieldName: 'transactionVolume',
        filter: this.props.blockchainFilter
      })
    }
    return (
      <div style={{ display: 'flex' }}>
        {this.props.isToggledInsights && <div>CEHCK</div>}
        <div
          className={cx({
            'project-dp-chart': true
          })}
          style={{ flex: 1 }}
        >
          {(this.props.isDesktop || this.props.isFullscreenMobile) && (
            <ProjectChartHeader
              from={this.props.timeFilter.from}
              to={this.props.timeFilter.to}
              setFromTo={this.setFromTo}
              focusedInput={this.state.focusedInput}
              onFocusChange={this.onFocusChange}
              setFilter={this.setFilter}
              toggleBTC={this.toggleBTC}
              isToggledBTC={this.state.isToggledBTC}
              interval={this.props.timeFilter.timeframe}
              shareableURL={shareableURL}
              ticker={this.props.ticker}
              slug={this.props.project.slug}
              name={this.props.project.name}
              isERC20={this.props.isERC20}
              isDesktop={this.props.isDesktop}
              isPremium={this.props.isPremium}
            />
          )}
          {this.props.isDesktop || this.props.isFullscreenMobile ? (
            <ProjectChart
              {...this.props}
              setSelected={this.setSelected}
              isToggledBTC={this.state.isToggledBTC}
              history={this.props.price.history.items}
              burnRate={burnRate}
              from={this.state.startDate}
              to={this.state.endDate}
              transactionVolume={transactionVolume}
              ethSpentOverTimeByErc20Projects={this.props.ethSpentOverTime}
              isLoading={this.props.price.history.loading}
              isERC20={this.props.isERC20}
              isEmpty={this.props.price.history.items.length === 0}
            />
          ) : (
            <ProjectChartMobile {...this.props} />
          )}
          {(this.props.isDesktop || this.props.isFullscreenMobile) && (
            <ProjectChartFooter
              {...this.props}
              isToggledBTC={this.state.isToggledBTC}
            />
          )}
          {this.props.isFullscreenMobile && (
            <Button onClick={this.props.toggleFullscreen} basic>
              Back to newest mode
            </Button>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isFullscreenMobile: state.detailedPageUi.isFullscreenMobile,
    timeFilter: state.detailedPageUi.timeFilter,
    isNightModeEnabled: state.rootUi.isNightModeEnabled
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleFullscreen: () => {
      dispatch({
        type: 'TOGGLE_FULLSCREEN_MOBILE'
      })
    },
    changeTimeFilter: ({ timeframe, from, to, interval }) => {
      const { from: dateFrom, to: dateTo } = getTimeIntervalFromToday(0, DAY, {
        from: new Date(from),
        to: new Date(to)
      })
      dispatch({
        type: 'CHANGE_TIME_FILTER',
        timeframe,
        from: dateFrom.toISOString(),
        to: dateTo.toISOString(),
        interval
      })
    }
  }
}

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withState('isToggledMarketCap', 'toggleMarketcap', false),
  withState('isToggledDevActivity', 'toggleDevActivity', false),
  withState('isToggledEthSpentOverTime', 'toggleEthSpentOverTime', false),
  withState('isToggledVolume', 'toggleVolume', true),
  withState('isToggledTwitter', 'toggleTwitter', false),
  withState('isToggledBurnRate', 'toggleBurnRate', false),
  withState('isToggledTransactionVolume', 'toggleTransactionVolume', false),
  withState('isToggledEthPrice', 'toggleEthPrice', false),
  withState('isToggledEmojisSentiment', 'toggleEmojisSentiment', false),
  withState('isToggledDailyActiveAddresses', 'toggleActiveAddresses', false),
  withState('isToggledExchangeFundFlow', 'toggleExchangeFundFlow', false),
  withState('isToggledICOPrice', 'toggleICOPrice', false),
  withState('blockchainFilter', 'setBlockchainFilter', 'all')
)

export default enhance(ProjectChartContainer)
