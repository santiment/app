import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Tooltip from '../../../../components/Tooltip/DarkTooltip'
import styles from './Trigger.module.scss'

const Trigger = ({ activeMetricsCount, isActive, onClick }) =>
  activeMetricsCount > 0 ? (
    <Tooltip
      className={styles.tooltip}
      withArrow={false}
      trigger={
        <Button
          className={cx(styles.button, isActive && styles.active)}
          onClick={() => onClick(!isActive)}
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
    <Button
      className={cx(styles.button, isActive && styles.active)}
      onClick={() => onClick(!isActive)}
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
  )

export default Trigger
