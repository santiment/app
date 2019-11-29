import React from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import { connect } from 'react-redux'
import { USER_TOGGLE_WIDE_CHART } from '../../../actions/types'

const ChartExpandBtn = ({ isWideChart, expandToggle }) => {
  console.log('isWideChart', isWideChart)
  return (
    <Button onClick={() => expandToggle(!isWideChart)}>
      <Icon type='fullscreen' />
    </Button>
  )
}

const mapStateToProps = state => {
  return {
    isWideChart: state.rootUi.isWideChartEnabled
  }
}

const mapDispatchToProps = dispatch => ({
  expandToggle: value =>
    dispatch({
      type: USER_TOGGLE_WIDE_CHART,
      payload: value
    })
})

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default enhance(ChartExpandBtn)
