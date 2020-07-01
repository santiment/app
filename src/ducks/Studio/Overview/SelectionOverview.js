import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Overview from './Overview'
import ActiveMetrics from '../Chart/ActiveMetrics'
import styles from './SelectionOverview.module.scss'

const MetricColor = {}
const loadings = []

const SelectionOverview = ({
  widgets,
  currentPhase,
  selectedMetrics,
  toggleMetric,
  resetSelecion,
  onClose,
  onWidgetClick,
  onNewChartClick,
}) => {
  return (
    <Overview
      widgets={widgets}
      currentPhase={currentPhase}
      selectedMetrics={selectedMetrics}
      onClose={onClose}
      onWidgetClick={onWidgetClick}
      onNewChartClick={onNewChartClick}
    >
      <div
        className={cx(
          styles.selection,
          selectedMetrics.length && styles.selection_visible,
        )}
      >
        <div className={styles.left}>
          You have selected {selectedMetrics.length} metrics:
          <div className={styles.metrics}>
            <ActiveMetrics
              className={styles.metric}
              MetricColor={MetricColor}
              loadings={loadings}
              activeMetrics={selectedMetrics}
              toggleMetric={toggleMetric}
              isSingleWidget={false}
            />
          </div>
        </div>
        <Button className={styles.clear} onClick={resetSelecion}>
          Clear selected
        </Button>
      </div>
    </Overview>
  )
}

export default SelectionOverview
