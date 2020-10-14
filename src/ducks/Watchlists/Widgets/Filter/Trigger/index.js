import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Tooltip from '../../../../../components/Tooltip/DarkTooltip'
import filterTooltipImg from '../../../../../assets/tooltips/screener-filter-bg.jpg'
import TooltipWithImg from '../../../../../components/TooltipWithImg/TooltipWithImg'
import styles from './index.module.scss'

export const FILTERS_EXPLANATION_TOOLTIP_MARK = '_FILTER_EXPLANATION'

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
      <TooltipWithImg
        closeTimeout={500}
        mark={FILTERS_EXPLANATION_TOOLTIP_MARK}
        img={filterTooltipImg}
        forceClose={isOpen}
        align='end'
        position='bottom'
        description='Use filters to narrow down your watchlist based on specific on-chain, social or other criteria. You can set a unique time frame for each filter, from the last 24 hours up to 1 year.'
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
      </TooltipWithImg>
    )
  }
}

export default Trigger
