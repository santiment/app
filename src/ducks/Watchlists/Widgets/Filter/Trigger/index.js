import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Tooltip from '../../../../../components/Tooltip/DarkTooltip'
import ExplanationTooltip from '../../../../SANCharts/SidecarExplanationTooltip'
import styles from './index.module.scss'

export const EXPLANATION_TOOLTIP_MARK = '_FILTER_EXPLANATION'

const Trigger = ({ activeMetricsCount, isOpen, onClick }) => {
  if (activeMetricsCount > 0 && !isOpen) {
    return (
      <Tooltip
        className={styles.tooltip}
        withArrow={false}
        trigger={
          <Button
            className={styles.button}
            onClick={() => onClick(!isOpen)}
            border
          >
            <Icon className={styles.icon} type='filter-filled' />
            <span className={cx(styles.text, styles.text__active)}>Filter</span>
          </Button>
        }
      >
        {`${activeMetricsCount} filter${
          activeMetricsCount > 1 ? 's' : ''
        } applied`}
      </Tooltip>
    )
  }

  if (activeMetricsCount > 0 && isOpen) {
    return (
      <Button
        className={cx(styles.button, styles.active)}
        border
        onClick={() => onClick(!isOpen)}
      >
        <Icon className={styles.icon} type='filter-filled' />
        <span className={cx(styles.text, styles.text__active)}>Filter</span>
      </Button>
    )
  }

  if (!activeMetricsCount) {
    return (
      <div className={styles.tooltipWrapper}>
        <ExplanationTooltip
          closeTimeout={500}
          localStorageSuffix={EXPLANATION_TOOLTIP_MARK}
          position='top'
          align='end'
          forceClose={isOpen}
          title={
            <div className={styles.tooltip}>
              Customize your screener with multiple asset filters
            </div>
          }
          description=''
          withArrow
          delay={0}
          className={styles.tooltipContainer}
        >
          <Button
            className={cx(styles.button, isOpen && styles.active)}
            border
            onClick={() => onClick(!isOpen)}
          >
            <Icon className={styles.icon} type='filter-filled' />
            <span
              className={cx(
                styles.text,
                activeMetricsCount > 0 && styles.text__active
              )}
            >
              Filter
            </span>
          </Button>
        </ExplanationTooltip>
      </div>
    )
  }
}

export default Trigger
