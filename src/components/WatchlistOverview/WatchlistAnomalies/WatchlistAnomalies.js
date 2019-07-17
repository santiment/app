import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Tooltip from '@santiment-network/ui/Tooltip'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel/Panel'
import { filteringTypes } from '../constants'
import Range from '../Range'
import Stat from '../Stat'
import styles from './WatchlistAnomalies.module.scss'

const WatchlistAnomalies = ({
  assetsAmount,
  range: { value },
  changeRange,
  trends = [],
  onFilterAssets,
  type,
  toggleOpenAnomalies,
  isOpen,
  isDesktop = true
}) => {
  const isTrendsFilter = type === filteringTypes.TRENDS
  const trendsIds = trends.map(({ id }) => id)
  const totalAnomalies = new Set(trendsIds)
  return trends.length > 0 ? (
    <div className={styles.wrapper}>
      <div className={styles.layout}>
        <div
          className={styles.top}
          onClick={isDesktop ? null : toggleOpenAnomalies}
        >
          <Icon type='flash' className={styles.icon} />
          {isDesktop || isOpen ? (
            <Range
              label='Anomalies'
              range={value}
              changeRange={event => {
                event.stopPropagation()
                changeRange()
              }}
            />
          ) : (
            <Stat
              name={`Anomalies, ${value}:`}
              values={[`${totalAnomalies.size}/${assetsAmount} assets`]}
            />
          )}
          {!isDesktop && (
            <Icon
              type={`arrow-${isOpen ? 'up' : 'down'}`}
              className={styles.arrow}
            />
          )}
        </div>
        {(isDesktop || isOpen) && (
          <div className={styles.bottom}>
            <Button
              variant='flat'
              border
              className={cx(styles.button, isTrendsFilter && styles.active)}
              onClick={() => onFilterAssets(trends, filteringTypes.TRENDS)}
            >
              <Stat
                name='Trending assets:'
                values={[trends.length]}
                className={isTrendsFilter && styles.stat}
              />
            </Button>
          </div>
        )}
        {isDesktop && (
          <Tooltip
            className={styles.tooltip}
            position='top'
            align='end'
            trigger={
              <div className={styles.description}>
                <Icon type='question-round-small' className={styles.question} />
                How it works
              </div>
            }
          >
            <Panel padding>
              Anomalies in metrics are detected using combination of statistical
              methods. Currently combination of this methodes defines boundary
              between normal and abnormal values.
            </Panel>
          </Tooltip>
        )}
      </div>
      {!isDesktop && type && (
        <div className={styles.filterDescription}>
          Showed based on {type} anomalies
        </div>
      )}
    </div>
  ) : null
}

export default WatchlistAnomalies
