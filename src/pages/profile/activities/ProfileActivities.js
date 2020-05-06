import React, { useState } from 'react'
import cx from 'classnames'
import PublicSignals from '../signals/PublicSignals'
import PublicInsights from '../insights/PublicInsights'
import PublicWatchlists from '../watchlists/PublicWatchlists'
import { useUserTemplates } from '../../../ducks/Studio/Template/gql/hooks'
import ProfileTemplates from '../templates/ProfileTemplates'
import styles from './ProfileActivities.module.scss'

const STEPS = {
  INSIGHTS: '#insights',
  SIGNALS: '#signals',
  WATCHLISTS: '#watchlists',
  CHART_LAYOUTS: '#chart-layouts'
}

const Counter = ({ value }) => {
  return <div className={styles.counter}>({value})</div>
}

const ProfileActivities = ({ profile }) => {
  const { id: profileId, insights, triggers, watchlists } = profile

  const [step, setStep] = useState(window.location.hash || STEPS.INSIGHTS)
  const [templates] = useUserTemplates(profileId)

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
          Insights <Counter value={insights.length} />
        </div>
        <div
          className={cx(
            styles.link,
            step === STEPS.WATCHLISTS && styles.active
          )}
          onClick={() => goTo(STEPS.WATCHLISTS)}
        >
          Watchlists <Counter value={watchlists.length} />
        </div>
        <div
          className={cx(styles.link, step === STEPS.SIGNALS && styles.active)}
          onClick={() => goTo(STEPS.SIGNALS)}
        >
          Signals <Counter value={triggers.length} />
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
        {step === STEPS.INSIGHTS && (
          <PublicInsights userId={profileId} data={insights} />
        )}
        {step === STEPS.SIGNALS && (
          <PublicSignals userId={profileId} data={triggers} />
        )}
        {step === STEPS.WATCHLISTS && (
          <PublicWatchlists userId={profileId} data={watchlists} />
        )}
        {step === STEPS.CHART_LAYOUTS && (
          <ProfileTemplates userId={profileId} data={templates} />
        )}
      </div>
    </div>
  )
}

export default ProfileActivities
