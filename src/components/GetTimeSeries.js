import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import isEqual from 'lodash.isequal'
import * as actions from './../actions/types.js'

class GetTimeSeries extends React.Component {
  componentDidMount () {
    this.props.fetchTimeseries({
      price: this.props.price,
      devActivity: this.props.devActivity
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if (!isEqual(this.props.price, prevProps.price)) {
      this.props.fetchTimeseries({
        price: this.props.price,
        devActivity: this.props.devActivity
      })
    }
  }

  render () {
    const { render, timeseries = {} } = this.props
    return render({ timeseries })
  }
}

const mapStateToProps = ({ timeseries }) => ({ timeseries })

const mapDispatchToProps = dispatch => ({
  fetchTimeseries: ({ price, devActivity }) => {
    return dispatch({
      type: actions.TIMESERIES_FETCH,
      payload: { price, devActivity }
    })
  }
})

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default enhance(GetTimeSeries)
