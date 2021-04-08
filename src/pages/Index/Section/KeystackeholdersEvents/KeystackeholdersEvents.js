import React, { useState, useMemo } from 'react'
import { HashLink } from 'react-router-hash-link'
import { useRawSignals } from './hooks'
import Accordion from '../../Accordion'
import StackholderTitle from './StackholderTitle/StackholderTitle'
import Range from '../../../../ducks/Watchlists/Widgets/WatchlistOverview/WatchlistAnomalies/Range'
import Skeleton from '../../../../components/Skeleton/Skeleton'
import { KEYSTACKHOLDERS_ANCHOR } from '../Personal'
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

  const groups = useMemo(
    () => {
      return signals.reduce((acc, item) => {
        const { slug } = item
        if (!acc[slug]) {
          acc[slug] = {
            list: [],
            types: []
          }
        }

        acc[slug].list.push(item)
        acc[slug].types.push(item.signal)
        return acc
      }, {})
    },
    [signals]
  )

  const slugs = useMemo(() => Object.keys(groups), [groups])

  return (
    <div>
      <div className={styles.title}>
        <HashLink to={KEYSTACKHOLDERS_ANCHOR} className={styles.anchor}>
          Keystakeholders stream events
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

      <Skeleton repeat={3} className={styles.skeleton} show={loading} />
      {!loading && (
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
                Signals list
              </Accordion>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default KeystackeholdersEvents
