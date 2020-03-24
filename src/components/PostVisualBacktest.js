import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { compose, withProps } from 'recompose'
import LazyLoad from 'react-lazyload'
import { HistoryPriceByTickerGQL } from '../pages/Detailed/gqlWrappers/DetailedGQL'
import PercentChanges from './PercentChanges'
import PostVisualBacktestChart from './PostVisualBacktestChart'
import { binarySearchHistoryPriceIndex, uncapitalizeStr } from '../utils/utils'
import { getTimeIntervalFromToday, MONTH } from '../utils/dates'
import './PostVisualBacktest.scss'

const getChanges = (start, last, prop = 'priceUsd') =>
  ((last[`${prop}`] - start[`${prop}`]) / start[`${prop}`]) * 100

const isTotalMarket = ticker => ticker === 'Crypto Market'

const propTypes = {
  ticker: PropTypes.string,
  history: PropTypes.object
}

export const PostVisualBacktest = ({
  ticker,
  change,
  changeProp,
  changePriceProp,
  history,
  postUpdatedAt,
  startValue,
  className
}) => {
  if (history.loading) {
    return (
      <div className={cx('post-visual-backtest', className)}>Loading...</div>
    )
  }
  if (!history.historyPrice || !changePriceProp) return null
  return (
    <div className={cx('post-visual-backtest', className)}>
      <div className='post-visual-backtest__info'>
        <div className='post-visual-backtest__changes'>
          {ticker} {uncapitalizeStr(changeProp)} since publication
        </div>
      </div>
      <PostVisualBacktestChart
        history={history}
        change={change}
        postUpdatedAt={postUpdatedAt}
        changePriceProp={changePriceProp}
        startValue={startValue}
      />
      {Number.isFinite(change) && (
        <PercentChanges
          className={'post-visual-backtest__percent'}
          changes={change}
        />
      )}
    </div>
  )
}

const enhance = compose(
  graphql(HistoryPriceByTickerGQL, {
    name: 'history',
    skip: ({ ticker, from }) => !ticker || !from,
    options: ({ ticker, from: fromDate }) => {
      const { from, to } = getTimeIntervalFromToday(-2, MONTH, {
        from: new Date(fromDate)
      })

      return {
        errorPolicy: 'all',
        variables: {
          from: from.toISOString(),
          to: to.toISOString(),
          ticker: isTotalMarket(ticker) ? 'TOTAL_MARKET' : ticker,
          interval: '1d'
        }
      }
    }
  }),
  withProps(({ ticker, history = {}, publishedAt }) => {
    const { historyPrice } = history
    if (!historyPrice || historyPrice.length === 0) return {}

    const start =
      historyPrice[binarySearchHistoryPriceIndex(historyPrice, publishedAt)]

    const last = historyPrice[historyPrice.length - 1]
    if (!start || !last) return {}
    const changeProp = isTotalMarket(ticker) ? 'Total marketcap' : 'Price'
    const changePriceProp = isTotalMarket(ticker) ? 'marketcap' : 'priceUsd'
    return {
      change: getChanges(start, last, changePriceProp),
      changeProp,
      changePriceProp,
      startValue: start,
      postUpdatedAt: start.datetime
    }
  })
)

PostVisualBacktest.propTypes = propTypes

PostVisualBacktest.defaultProps = {
  ticker: undefined,
  history: {
    historyPrice: []
  }
}
const Enhanced = enhance(PostVisualBacktest)

export default props => (
  <LazyLoad offset={700} once>
    <Enhanced {...props} />
  </LazyLoad>
)
