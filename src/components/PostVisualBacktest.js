import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { compose, withProps } from 'recompose'
import moment from 'moment'
import { HistoryPriceByTickerGQL } from './../pages/Detailed/DetailedGQL'
import PercentChanges from './PercentChanges'
import PostVisualBacktestChart from './PostVisualBacktestChart'
import { binarySearchHistoryPriceIndex } from '../utils/utils'
import './PostVisualBacktest.css'

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
  startValue
}) => {
  if (history.loading) {
    return <div className='post-visual-backtest'>Loading...</div>
  }
  if (!history.historyPrice || !changePriceProp) return null

  return (
    <div className='post-visual-backtest'>
      <div className='post-visual-backtest__info'>
        <div className='post-visual-backtest__changes'>
          {ticker} {changeProp} since publication
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
    options: ({ ticker, from }) => {
      return {
        errorPolicy: 'all',
        variables: {
          from: moment(from)
            .subtract(3, 'months')
            .utc()
            .format(),
          to: new Date().toISOString(),
          ticker: isTotalMarket(ticker) ? 'TOTAL_MARKET' : ticker,
          interval: '1d'
        }
      }
    }
  }),
  withProps(({ ticker, history = {}, updatedAt }) => {
    const { historyPrice } = history
    if (!historyPrice || historyPrice.length === 0) return {}

    const start =
      historyPrice[binarySearchHistoryPriceIndex(historyPrice, updatedAt)]

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

export default enhance(PostVisualBacktest)
