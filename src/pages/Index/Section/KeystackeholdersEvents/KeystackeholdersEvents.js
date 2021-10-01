import React, { useState, useMemo, useEffect, Fragment } from 'react'
import { HashLink } from 'react-router-hash-link'
import {
  TEMPORARY_HIDDEN_LABELS,
  useGroupedBySlugs,
  useRawSignals
} from './hooks'
import Accordion from '../../Accordion'
import StackholderTitle, {
  StakeholderProBanner
} from './StackholderTitle/StackholderTitle'
import Range from '../../../../ducks/Watchlists/Widgets/WatchlistOverview/WatchlistAnomalies/Range'
import Skeleton from '../../../../components/Skeleton/Skeleton'
import { KEYSTACKHOLDERS_ANCHOR } from '../../Navigation/anchors'
import StakeholderSignal from './StakeholderSignal/StakeholderSignal'
import StakeholderLabels from './StakeholderLabels/StakeholderLabels'
import NoSignals from '../../../../components/Illustrations/NoSignals'
import AssetsSelector from '../../../../components/AssetsSelector/AssetsSelector'
import styles from './KeystackeholdersEvents.module.scss'

const DEFAULT_SETTINGS = {
  from: 'utc_now-12h',
  to: 'utc_now'
}

const RANGES = ['12h', '24h', '7d', '30d']
const INTERVALS = ['5m', '15m', '1h', '3h']

const READABLE_DAYS = {
  '12h': '12 hours',
  '24h': '1 day',
  '7d': '7 days',
  '30d': '30 days'
}

const getCountSuffix = (source, count) =>
  count + ' ' + (count === 1 ? `${source}` : `${source}s`)

const KeystackeholdersEvents = () => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [selectedAssets, setSelectedAssets] = useState({})
  const [intervalIndex, setIntervalIndex] = useState(0)

  const { data: signals, loading } = useRawSignals(settings)
  const [hiddenLabels, setHiddenLabels] = useState(TEMPORARY_HIDDEN_LABELS)

  const {
    slugs,
    projects,
    visibleSlugs,
    groups,
    labels,
    restrictedSignals
  } = useGroupedBySlugs(signals, hiddenLabels, selectedAssets)

  const signalsCount = useMemo(
    () => Object.values(groups).reduce((acc, { list }) => acc + list.length, 0),
    [groups]
  )

  const visibleRestrictedSignals = useMemo(
    () => restrictedSignals.filter(signal => !hiddenLabels[signal]),
    [restrictedSignals, hiddenLabels]
  )

  useEffect(
    () => {
      setSelectedAssets(
        signals.reduce((acc, { slug }) => {
          acc[slug] = true
          return acc
        }, {})
      )
    },
    [signals]
  )

  const proBannerIdx = visibleSlugs.length > 3 ? 2 : visibleSlugs.length - 1

  return (
    <div className={styles.container} id={KEYSTACKHOLDERS_ANCHOR}>
      <div className={styles.title}>
        <HashLink to={`#${KEYSTACKHOLDERS_ANCHOR}`} className={styles.anchor}>
          Key Stakeholder Signals
        </HashLink>
        <div className={styles.right}>
          <Range
            className={styles.action}
            btnClassName={styles.action__range}
            range={RANGES[intervalIndex]}
            changeRange={() => {
              const newInterval = (intervalIndex + 1) % RANGES.length
              setIntervalIndex(newInterval)

              const from = `utc_now-${RANGES[newInterval]}`
              const interval = INTERVALS[newInterval]

              setSettings({ ...settings, from, interval })
            }}
          />

          {slugs.length > 0 && (
            <AssetsSelector
              projects={projects}
              slugs={slugs}
              className={styles.action}
              selected={selectedAssets}
              onChange={setSelectedAssets}
            />
          )}
        </div>
      </div>

      <div className={styles.description}>
        Real-time signals for big changes in on-chain, social and development
        activity
      </div>

      {!loading && (
        <StakeholderLabels
          labels={labels}
          hidden={hiddenLabels}
          setHidden={setHiddenLabels}
          restrictedSignals={restrictedSignals}
        />
      )}

      <div className={styles.count}>
        Last {READABLE_DAYS[RANGES[intervalIndex]]}{' '}
        {getCountSuffix('signal', signalsCount)} fired for{' '}
        {getCountSuffix('asset', visibleSlugs.length)}
      </div>

      {loading && (
        <Skeleton
          repeat={3}
          show={loading}
          className={styles.skeleton}
          wrapperClassName={styles.skeletonWrapper}
        />
      )}
      {!loading && visibleSlugs.length > 0 && (
        <div className={styles.accordions}>
          {visibleSlugs.length === 0 && visibleRestrictedSignals.length > 0 && (
            <StakeholderProBanner signals={visibleRestrictedSignals} />
          )}
          {visibleSlugs.map((slug, index) => {
            const { types, list } = groups[slug]

            return (
              <Fragment key={slug}>
                {index === proBannerIdx &&
                  visibleRestrictedSignals.length > 0 && (
                  <StakeholderProBanner signals={visibleRestrictedSignals} />
                )}
                <Accordion
                  title={
                    <StackholderTitle
                      slug={slug}
                      labels={types}
                      count={list.length}
                      project={projects[slug]}
                    />
                  }
                  isOpenedDefault={index === 0}
                  classes={styles}
                >
                  <div className={styles.list}>
                    {list.map(item => (
                      <StakeholderSignal
                        key={`${item.datetime}_${item.slug}_${item.signal}`}
                        data={item}
                        settings={settings}
                      />
                    ))}
                  </div>
                </Accordion>
              </Fragment>
            )
          })}
        </div>
      )}

      {!loading && visibleSlugs.length === 0 && (
        <div className={styles.noData}>
          <div>
            <NoSignals className={styles.noDataImage} />
          </div>
          <div className={styles.noDataInfo}>
            <span className={styles.noDataTitle}>
              There are currently no signals matching your filters.
            </span>
            <span>
              Try a different filter to activate Key Stakeholder signals
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default KeystackeholdersEvents
