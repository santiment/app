import React from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import { connect } from 'react-redux'
import { USER_TOGGLE_WIDE_CHART } from '../../../actions/types'
import styles from './ChartExpandBtn.module.scss'

const ChartExpandBtn = ({ isWideChart, expandToggle }) => {
  return (
    <Button
      onClick={() => expandToggle(!isWideChart)}
      className={isWideChart && styles.wideChart}
    >
      <Icon type='fullscreen' className={isWideChart && styles.wideChart} />
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
