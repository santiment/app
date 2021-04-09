import React, { useState } from 'react'
import { HashLink } from 'react-router-hash-link'
import cx from 'classnames'
import { useGroupedBySlugs, useRawSignals } from './hooks'
import Accordion from '../../Accordion'
import StackholderTitle from './StackholderTitle/StackholderTitle'
import Range from '../../../../ducks/Watchlists/Widgets/WatchlistOverview/WatchlistAnomalies/Range'
import Skeleton from '../../../../components/Skeleton/Skeleton'
import { KEYSTACKHOLDERS_ANCHOR } from '../Personal'
import StakeholderSignal from './StakeholderSignal/StakeholderSignal'
import styles from './KeystackeholdersEvents.module.scss'

const DEFAULT_SETTINGS = {
  from: 'utc_now-24h',
  to: 'utc_now'
}

const RANGES = ['24h', '7d', '30d']

const KeystackeholdersEvents = () => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [intervalIndex, setIntervalIndex] = useState(0)

  const { data: signals, loading } = useRawSignals(settings)

  const { slugs, groups } = useGroupedBySlugs(signals)

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <HashLink to={KEYSTACKHOLDERS_ANCHOR} className={styles.anchor}>
          Key Stakeholder Events
        </HashLink>
        <div className={styles.right}>
          <div className={styles.action}>{signals.length} fired</div>
          <Range
            className={styles.action}
            btnClassName={styles.action__range}
            range={RANGES[intervalIndex]}
            changeRange={() => {
              const newInterval = (intervalIndex + 1) % RANGES.length
              setIntervalIndex(newInterval)

              setSettings({
                ...settings,
                from: `utc_now-${RANGES[newInterval]}`
              })
            }}
          />
          <div className={styles.action}>assets: {slugs.length}</div>
        </div>
      </div>

      <div className={styles.description}>
        Real-time signals for big changes in on-chain, social and development
        activity
      </div>

      {loading && (
        <Skeleton
          repeat={3}
          show={loading}
          className={styles.skeleton}
          wrapperClassName={styles.skeletonWrapper}
        />
      )}
      {!loading && slugs.length > 0 && (
        <div className={styles.accordions}>
          {slugs.map((s, index) => {
            const { types, list } = groups[s]
            return (
              <Accordion
                key={s}
                title={
                  <StackholderTitle
                    slug={s}
                    count={list.length}
                    labels={types}
                  />
                }
                isOpenedDefault={index === 0}
                classes={styles}
              >
                <div className={styles.list}>
                  {list.map(item => (
                    <StakeholderSignal
                      key={item.datetime}
                      data={item}
                      settings={settings}
                    />
                  ))}
                </div>
              </Accordion>
            )
          })}
        </div>
      )}

      {!loading && slugs.length === 0 && (
        <div className={cx(styles.accordions, styles.noData)}>
          No fired alerts for selected period
        </div>
      )}
    </div>
  )
}

export default KeystackeholdersEvents
