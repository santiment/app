import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Overview from './Overview'
import ActiveMetrics from '../Chart/ActiveMetrics'
import styles from './SelectionOverview.module.scss'

const MetricColor = {}
const loadings = []

const SelectionInfo = ({ items, label, onToggle, ...props }) => (
  <div className={styles.left__row}>
    You have selected {items.length} {label}(s):
    <div className={styles.metrics}>
      <ActiveMetrics
        {...props}
        className={styles.metric}
        activeMetrics={items}
        MetricColor={MetricColor}
        loadings={loadings}
        toggleMetric={onToggle}
        isSingleWidget={false}
      />
    </div>
  </div>
)

const SelectionOverview = ({
  widgets,
  currentPhase,
  selectedMetrics,
  selectedWidgets,
  toggleMetric,
  toggleWidget,
  resetSelecion,
  onClose,
  onWidgetClick,
  onNewChartClick,
  setWidgets
}) => (
  <Overview
    widgets={widgets}
    currentPhase={currentPhase}
    selectedMetrics={selectedMetrics}
    onClose={onClose}
    onWidgetClick={onWidgetClick}
    onNewChartClick={onNewChartClick}
    setWidgets={setWidgets}
  >
    <div
      className={cx(
        styles.selection,
        (selectedMetrics.length || selectedWidgets.length) &&
          styles.selection_visible
      )}
    >
      <div className={styles.left}>
        {selectedMetrics.length ? (
          <SelectionInfo
            label='metric'
            items={selectedMetrics}
            onToggle={toggleMetric}
          />
        ) : null}

        {selectedWidgets.length ? (
          <SelectionInfo
            label='widget'
            items={selectedWidgets}
            onToggle={toggleWidget}
            isWithIcon={false}
          />
        ) : null}
      </div>
      <Button className={styles.clear} onClick={resetSelecion}>
        Clear selected
      </Button>
    </div>
  </Overview>
)

export default SelectionOverview
