import React from 'react'
import Button from '@santiment-network/ui/Button'
import Overview from './Overview'
import ActiveMetrics from '../Chart/ActiveMetrics'
import styles from './SelectionOverview.module.scss'

const MetricColor = {}
const loadings = []

const SelectionOverview = ({
  widgets,
  selectedMetrics,
  toggleMetric,
  onClose,
  onWidgetClick,
  onNewChartClick
}) => {
  return (
    <Overview
      widgets={widgets}
      selectedMetrics={selectedMetrics}
      onClose={onClose}
      onWidgetClick={onWidgetClick}
      onNewChartClick={onNewChartClick}
    >
      <div className={styles.selection}>
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
        <Button
          variant='fill'
          accent='negative'
          className={styles.clear}
          onClick={onClose}
        >
          Clear
        </Button>
      </div>
    </Overview>
  )
}

export default SelectionOverview
