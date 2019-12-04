import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import { connect } from 'react-redux'
import { USER_TOGGLE_WIDE_CHART } from '../../../actions/types'
import SidecarExplanationTooltip from '../SidecarExplanationTooltip'
import styles from './ChartExpandBtn.module.scss'

const ChartExpandBtn = ({ isWideChart, expandToggle }) => {
  return (
    <SidecarExplanationTooltip
      closeTimeout={500}
      localStorageSuffix='_CHART_EXPAND_EXPLANATION'
      position='bottom'
      title='Click here and expand the chart to fullscreen'
      description={''}
      align='end'
    >
      <Button
        onClick={() => expandToggle(!isWideChart)}
        className={cx(styles.expand, isWideChart && styles.wideChart)}
      >
        <Icon
          type='fullscreen'
          className={isWideChart ? styles.wideChart : ''}
        />
      </Button>
    </SidecarExplanationTooltip>
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
