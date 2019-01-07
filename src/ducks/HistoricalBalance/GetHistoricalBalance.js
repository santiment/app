import { Component } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import isEqual from 'lodash.isequal'
import pick from 'lodash.pick'
import { withApollo } from 'react-apollo'
import moment from 'moment'

const historicalBalanceGQL = gql`
  query historicalBalance(
    $from: DateTime!,
    $to: DateTime!,
    $address: String!,
    $interval: String!,
    $slug: String) {
  historicalBalance(
    address: $address,
    interval: $interval,
    slug: $slug,
    from: $from,
    to: $to
  ) {
    datetime 
    balance
  }
}
`

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

  componentDidMount() {
    this.fetchHistoricalBalance()
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.assets, this.props.assets) 
      || prevProps.wallet !== this.props.wallet) {

      this.cleanupHistory().then(() => {
        this.fetchHistoricalBalance()
      })
    }
  }

  cleanupHistory() {
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
      this.setState({assets}, resolve())
    })
  }

  fetchHistoricalBalance() {
    this.props.assets.forEach(slug => {
      this.setState(({assets}) => ({
        assets: {
          [slug]: {
            loading: true,
            items: []
          },
          ...assets
        }
      }))

      this.props.client.query({
        query: historicalBalanceGQL,
        skip: ({ wallet }) => {
          return !wallet
        },
        variables: {
          slug,
          address: this.props.wallet,
          interval: '4w',
          to: moment().toISOString(),
          from: '2017-12-01T16:28:22.486Z'
        }
      }).then(({data, loading}) => {
        if (this.props.assets.includes(slug)) {
          this.setState(({assets}) => ({
            assets: {
              ...assets,
              [slug]: {
                loading,
                items: data.historicalBalance
              }
            }
          }))
        }
      }).catch(error => {
        this.setState({error})
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
