import React, { useState } from 'react'
import cx from 'classnames'
import PublicSignals from '../signals/PublicSignals'
import PublicInsights from '../insights/PublicInsights'
import PublicWatchlists from '../watchlists/PublicWatchlists'
import { useUserTemplates } from '../../../ducks/Studio/Template/gql/hooks'
import ProfileTemplates from '../templates/ProfileTemplates'
import {
  isAddressesWatchlist,
  isProjectWatchlist,
  isScreener
} from '../../../ducks/Watchlists/detector'
import ProjectCard from '../../../ducks/Watchlists/Cards/ProjectCard'
import AddressCard from '../../../ducks/Watchlists/Cards/AddressCard'
import styles from './ProfileActivities.module.scss'

const STEPS = {
  INSIGHTS: '#insights',
  SIGNALS: '#signals',
  WATCHLISTS: '#watchlists',
  ADDRESSES_WATCHLISTS: '#addresses-watchlists',
  SCREENERS: '#screeners',
  CHART_LAYOUTS: '#chart-layouts'
}

const Counter = ({ value }) => {
  return <div className={styles.counter}>({value})</div>
}

const ProfileActivities = ({ profile }) => {
  const { id: profileId, insightsCount, triggers, watchlists = [] } = profile

  const [step, setStep] = useState(window.location.hash || STEPS.INSIGHTS)
  const [templates] = useUserTemplates(profileId)
  const screeners = watchlists.filter(isScreener)
  const projectWatchlists = watchlists.filter(isProjectWatchlist)
  const addressesWatchlists = watchlists.filter(isAddressesWatchlist)

  const goTo = val => {
    window.location.hash = val
    return setStep(val)
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div
          className={cx(styles.link, step === STEPS.INSIGHTS && styles.active)}
          onClick={() => goTo(STEPS.INSIGHTS)}
        >
          Insights <Counter value={insightsCount.totalCount} />
        </div>
        <div
          className={cx(
            styles.link,
            step === STEPS.WATCHLISTS && styles.active
          )}
          onClick={() => goTo(STEPS.WATCHLISTS)}
        >
          Watchlists <Counter value={projectWatchlists.length} />
        </div>
        <div
          className={cx(
            styles.link,
            step === STEPS.ADDRESSES_WATCHLISTS && styles.active
          )}
          onClick={() => goTo(STEPS.ADDRESSES_WATCHLISTS)}
        >
          Addresses Watchlists <Counter value={addressesWatchlists.length} />
        </div>
        <div
          className={cx(styles.link, step === STEPS.SCREENERS && styles.active)}
          onClick={() => goTo(STEPS.SCREENERS)}
        >
          Screeners <Counter value={screeners.length} />
        </div>
        <div
          className={cx(styles.link, step === STEPS.SIGNALS && styles.active)}
          onClick={() => goTo(STEPS.SIGNALS)}
        >
          Alerts <Counter value={triggers.length} />
        </div>
        <div
          className={cx(
            styles.link,
            step === STEPS.CHART_LAYOUTS && styles.active
          )}
          onClick={() => goTo(STEPS.CHART_LAYOUTS)}
        >
          Chart Layouts <Counter value={templates.length} />
        </div>
      </div>
      <div className={styles.right}>
        {step === STEPS.INSIGHTS && <PublicInsights userId={profileId} />}
        {step === STEPS.SIGNALS && (
          <PublicSignals userId={profileId} data={triggers} />
        )}
        {step === STEPS.WATCHLISTS && (
          <PublicWatchlists watchlists={projectWatchlists} Card={ProjectCard} />
        )}
        {step === STEPS.ADDRESSES_WATCHLISTS && (
          <PublicWatchlists
            watchlists={addressesWatchlists}
            Card={AddressCard}
          />
        )}
        {step === STEPS.SCREENERS && (
          <PublicWatchlists
            watchlists={screeners}
            path='/screener/'
            Card={ProjectCard}
          />
        )}
        {step === STEPS.CHART_LAYOUTS && (
          <ProfileTemplates userId={profileId} data={templates} />
        )}
      </div>
    </div>
  )
}

export default ProfileActivities
