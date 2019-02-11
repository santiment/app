import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import isEqual from 'lodash.isequal'
import { fetchTimeseries } from './actions'

class GetTimeSeries extends React.Component {
  componentDidMount () {
    this.props.fetchTimeseries(getMetrics(this.props))
  }

  componentDidUpdate (prevProps, prevState) {
    if (!isEqual(getMetrics(this.props), getMetrics(prevProps))) {
      this.props.fetchTimeseries(getMetrics(this.props))
    }
  }

  render () {
    const { render, timeseries = {} } = this.props
    return render({ ...timeseries })
  }
}

const getMetrics = props => {
  return Object.keys(props)
    .filter(
      metric =>
        metric !== 'store' &&
        metric !== 'render' &&
        metric !== 'fetchTimeseries' &&
        metric !== 'storeSubscription' &&
        metric !== 'timeseries'
    )
    .reduce((acc, metric) => {
      acc = {
        ...acc,
        [metric]: props[metric]
      }
      return acc
    }, {})
}

const mapStateToProps = ({ timeseries }) => ({ timeseries })

const mapDispatchToProps = dispatch => ({
  fetchTimeseries: metrics => {
    return dispatch(fetchTimeseries(metrics))
  }
})

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default enhance(GetTimeSeries)
