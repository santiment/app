import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import isEqual from 'lodash.isequal'
import { fetchTimeseries, deleteTimeseries } from './actions'

let id = 0

class GetTimeSeries extends React.Component {
  id = id++

  componentDidMount () {
    this.props.fetchTimeseries({ id: this.id, ...getMetrics(this.props) })
  }

  componentDidUpdate (prevProps, prevState) {
    if (!isEqual(getMetrics(this.props), getMetrics(prevProps))) {
      this.props.fetchTimeseries({ id: this.id, ...getMetrics(this.props) })
    }
  }

  componentWillUnmount () {
    this.props.deleteTimeseries(this.id)
  }

  render () {
    const { render, timeseries = {} } = this.props
    return render(timeseries[this.id] || {})
  }
}

const getMetrics = props => {
  return Object.keys(props)
    .filter(
      metric =>
        metric !== 'store' &&
        metric !== 'render' &&
        metric !== 'fetchTimeseries' &&
        metric !== 'deleteTimeseries' &&
        metric !== 'storeSubscription' &&
        metric !== 'timeseries'
    )
    .reduce((acc, metric) => {
      if (props[metric]) {
        acc = {
          ...acc,
          [metric]: props[metric]
        }
      }
      return acc
    }, {})
}

const mapStateToProps = ({ timeseries }) => ({ timeseries })

const mapDispatchToProps = dispatch => ({
  fetchTimeseries: metrics => {
    return dispatch(fetchTimeseries(metrics))
  },
  deleteTimeseries: id => {
    return dispatch(deleteTimeseries(id))
  }
})

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default enhance(GetTimeSeries)
