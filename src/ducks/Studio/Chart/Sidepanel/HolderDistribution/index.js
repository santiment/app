import React, { useState } from 'react'
import cx from 'classnames'
import UIButton from '@santiment-network/ui/Button'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import Tabs, { Tab, TabMetrics } from './Tabs'
import MetricIcon from '../../../../SANCharts/MetricIcon'
import styles from './index.module.scss'
import LabelsSelector from '../../../../../components/LabelsSelector/LabelsSelector'

const Icon = props => (
  <svg
    {...props}
    width='18'
    height='14'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M14.93 4.66a.57.57 0 00-.79 0l-1.98 1.95a.55.55 0 000 .78l1.98 1.95c.22.21.57.21.8 0a.55.55 0 000-.78l-1.03-1h3.53c.31 0 .56-.26.56-.56 0-.3-.25-.55-.56-.55h-3.53l1.02-1a.55.55 0 000-.79zM3.07 9.34c.22.21.57.21.79 0l1.98-1.95a.55.55 0 000-.78L3.86 4.66a.57.57 0 00-.8 0 .55.55 0 000 .78l1.03 1H.56C.25 6.45 0 6.7 0 7c0 .3.25.55.56.55h3.53l-1.02 1a.55.55 0 000 .79z'
      fill='#7A859E'
    />
    <path d='M8.5.5a.5.5 0 011 0v13a.5.5 0 01-1 0V.5z' fill='#7A859E' />
    <path
      d='M1.5 1a.5.5 0 010-1h15a.5.5 0 010 1h-15zM1.5 14a.5.5 0 010-1h15a.5.5 0 010 1h-15z'
      fill='#7A859E'
    />
  </svg>
)

const Button = ({ className, isChecked, ...props }) => (
  <UIButton fluid className={cx(styles.btn, className)} {...props} />
)

const ToggleButton = ({
  className,
  metric,
  color,
  isActive,
  onClick,
  onUnmerge,
  ...props
}) => (
  <Button
    className={cx(styles.toggle, className, isActive && styles.active)}
    onClick={() => onClick(metric)}
    {...props}
  >
    <MetricIcon node='line' color={color} className={styles.icon} />
    <span className={styles.label}>
      {metric.label}
      {onUnmerge && (
        <span
          className={styles.unmerge}
          onClick={e => {
            e.stopPropagation()
            onUnmerge(metric)
          }}
        >
          Unmerge
        </span>
      )}
    </span>
  </Button>
)

const CheckboxButton = ({ metric, isChecked, onClick, ...props }) => (
  <Button
    className={isChecked && styles.active}
    onClick={() => onClick(metric)}
    {...props}
  >
    <Checkbox className={styles.checkbox} isActive={isChecked} />
    {metric.label}
  </Button>
)

const Merge = ({ onClick }) => (
  <UIButton border className={styles.merge} onClick={onClick}>
    <Icon className={styles.icon} />
    Merge
  </UIButton>
)

const Confirm = ({ checkedMetrics, onClick }) => {
  const isMergeable = checkedMetrics.size > 1
  return (
    <UIButton
      border
      className={cx(styles.merge, isMergeable ? styles.confirm : styles.cancel)}
      onClick={onClick}
    >
      {isMergeable ? 'Confirm' : 'Cancel'}
    </UIButton>
  )
}

const HolderDistribution = ({
  header,
  metrics,
  mergedMetrics,
  checkedMetrics,
  MetricColor,
  TabMetrics,
  toggleMetric,
  currentPhase,
  isWithTabs,
  onChangeLabels,
  onMergeClick,
  onMergeConfirmClick,
  onUnmergeClick
}) => {
  const [activeTab, setActiveTab] = useState(Tab.PERCENTS)
  const isIdlePhase = currentPhase === 'idle'
  const MetricButton = isIdlePhase ? ToggleButton : CheckboxButton

  return (
    <>
      <div className={styles.top}>
        {header}
        {isIdlePhase ? (
          <Merge onClick={onMergeClick} />
        ) : (
          <Confirm
            checkedMetrics={checkedMetrics}
            onClick={onMergeConfirmClick}
          />
        )}
      </div>

      {isWithTabs && (
        <Tabs
          activeTab={activeTab}
          isIdlePhase={isIdlePhase}
          setActiveTab={setActiveTab}
        />
      )}

      {onChangeLabels && <LabelsSelector onChange={onChangeLabels} />}

      <div className={styles.metrics}>
        {isIdlePhase &&
          mergedMetrics.map(metric => {
            const { key } = metric
            return (
              <MetricButton
                key={key}
                metric={metric}
                color={MetricColor[key]}
                isActive={metrics.includes(metric)}
                onClick={toggleMetric}
                onUnmerge={onUnmergeClick}
              />
            )
          })}

        {TabMetrics[activeTab].map(metric => {
          const { key } = metric
          return (
            <MetricButton
              key={key}
              metric={metric}
              color={MetricColor[key]}
              isActive={metrics.includes(metric)}
              isChecked={checkedMetrics && checkedMetrics.has(metric)}
              onClick={toggleMetric}
            />
          )
        })}
      </div>
    </>
  )
}

HolderDistribution.defaultProps = {
  TabMetrics,
  mergedMetrics: [],
  currentPhase: 'idle',
  header: 'Supply Distribution'
}

export default HolderDistribution
