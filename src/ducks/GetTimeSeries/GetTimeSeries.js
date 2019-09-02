import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import isEqual from 'lodash.isequal'
import { fetchTimeseries, deleteTimeseries } from './actions'

let id = 0

class GetTimeSeries extends React.Component {
  id = id++

  static defaultProps = {
    metrics: [],
    events: []
  }

  componentDidMount () {
    this.props.fetchTimeseries({
      id: this.id,
      metrics: this.props.metrics,
      events: this.props.events
    })
  }

  componentDidUpdate (prevProps) {
    const { metrics, fetchTimeseries, events } = this.props
    if (
      !isEqual(metrics, prevProps.metrics) ||
      !isEqual(events, prevProps.events)
    ) {
      fetchTimeseries({ id: this.id, metrics, events })
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

const mapStateToProps = ({ timeseries }) => ({ timeseries })

const mapDispatchToProps = dispatch => ({
  fetchTimeseries: payload => {
    return dispatch(fetchTimeseries(payload))
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
