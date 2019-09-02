import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { fetchTimeseries, deleteTimeseries } from './actions'

let id = 0

function shouldFetch (a, b) {
  if (a.length !== b.length) {
    return true
  }

  const map = new Map()

  for (let i = 0; i < a.length; i++) {
    map.set(a[i].name, true)
  }

  for (let i = 0; i < b.length; i++) {
    if (!map.has(b[i].name)) {
      return true
    }
  }

  return false
}

class GetTimeSeries extends React.Component {
  id = id++

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
      shouldFetch(metrics, prevProps.metrics) ||
      shouldFetch(events, prevProps.events)
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
