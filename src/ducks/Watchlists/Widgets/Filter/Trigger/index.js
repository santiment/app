import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Tooltip from '../../../../../components/Tooltip/DarkTooltip'
import ExplanationTooltip from '../../../../SANCharts/SidecarExplanationTooltip'
import styles from './index.module.scss'

export const EXPLANATION_TOOLTIP_MARK = '_FILTER_EXPLANATION'

const Trigger = ({ activeMetricsCount, isOpen, onClick }) =>
  isOpen ? (
    <Button
      className={cx(styles.button, isOpen && styles.active)}
      onClick={() => onClick(!isOpen)}
      border
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
  ) : activeMetricsCount > 0 ? (
    <Tooltip
      className={styles.tooltip}
      withArrow={false}
      trigger={
        <Button
          className={cx(styles.button, isOpen && styles.active)}
          onClick={() => onClick(!isOpen)}
          border
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
      }
    >
      {`${activeMetricsCount} filter${
        activeMetricsCount > 1 ? 's' : ''
      } applied`}
    </Tooltip>
  ) : (
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

export default Trigger
