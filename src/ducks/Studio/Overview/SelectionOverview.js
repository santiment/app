import React from 'react'
import Overview from './Overview'
import Button from '@santiment-network/ui/Button'
import ActiveMetrics from '../Chart/ActiveMetrics'
import styles from './SelectionOverview.module.scss'

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
              MetricColor={{}}
              loadings={[]}
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
          // onClick={onClearClick}
          onClick={onClose}
        >
          Clear
        </Button>
      </div>
    </Overview>
  )
}

export default SelectionOverview
