import { Component } from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash.isequal'
import pick from 'lodash.pick'
import { withApollo } from 'react-apollo'
import { HISTORICAL_BALANCE_QUERY } from './common/queries'
import { toEndOfDay } from '../../utils/dates'
import Raven from 'raven-js'

const DEFAULT_FROM_DATE = '2017-12-01T16:28:22.486Z'
const DEFAULT_TO_DATE = toEndOfDay(new Date()).toISOString()

class GetHistoricalBalance extends Component {
  state = {
    assets: {},
    error: undefined
  }

  static propTypes = {
    assets: PropTypes.array.isRequired,
    wallet: PropTypes.string.isRequired,
    render: PropTypes.func
  }

  componentDidMount () {
    this.fetchHistoricalBalance()
  }

  componentDidUpdate (prevProps) {
    if (!isEqual(prevProps, this.props)) {
      this.cleanupHistory().then(() => {
        this.fetchHistoricalBalance()
      })
    }
  }

  cleanupHistory () {
    return new Promise(resolve => {
      const oldAssets = this.state.assets
      const newAssets = pick(oldAssets, this.props.assets)
      const assets = Object.keys(newAssets).reduce((acc, name) => {
        acc[name] = {
          loading: true,
          items: []
        }
        return acc
      }, {})
      this.setState({ assets }, resolve())
    })
  }

  fetchHistoricalBalance () {
    const {
      assets,
      wallet,
      client,
      interval = '1d',
      to = DEFAULT_TO_DATE,
      from = DEFAULT_FROM_DATE
    } = this.props

    assets.forEach(slug => {
      this.setState(({ assets }) => ({
        assets: {
          [slug]: {
            loading: true,
            items: []
          },
          ...assets
        }
      }))

      client
        .query({
          query: HISTORICAL_BALANCE_QUERY,
          skip: ({ wallet }) => {
            return !wallet
          },
          variables: {
            slug,
            address: wallet,
            interval,
            to,
            from
          }
        })
        .then(({ data, loading }) => {
          if (assets.includes(slug)) {
            this.setState(({ assets }) => ({
              assets: {
                ...assets,
                [slug]: {
                  loading,
                  items: data.historicalBalance
                }
              }
            }))
          }
        })
        .catch(error => {
          Raven.captureException(error)
          this.setState({ error })
        })
    })
  }

  render () {
    const { assets, error } = this.state
    return this.props.render({
      error,
      data: assets
    })
  }
}

export default withApollo(GetHistoricalBalance)
