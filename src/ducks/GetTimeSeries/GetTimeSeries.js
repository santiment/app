import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import isEqual from 'lodash.isequal'
import { fetchTimeseries, deleteTimeseries } from './actions'

let id = 0

class GetTimeSeries extends React.Component {
  id = id++

  componentDidMount () {
    this.props.fetchTimeseries({ id: this.id, metrics: this.props.metrics })
  }

  componentDidUpdate (prevProps) {
    const { metrics, fetchTimeseries } = this.props
    if (!isEqual(metrics, prevProps.metrics)) {
      fetchTimeseries({ id: this.id, metrics })
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
