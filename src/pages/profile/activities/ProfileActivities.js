import React, { useState } from 'react'
import cx from 'classnames'
import PublicSignals from '../signals/PublicSignals'
import PublicInsights from '../insights/PublicInsights'
import PublicWatchlists from '../watchlists/PublicWatchlists'
import { useUserTemplates } from '../../../ducks/Studio/Template/gql/hooks'
import ProfileTemplates from '../templates/ProfileTemplates'
import styles from './ProfileActivities.module.scss'

const STEPS = {
  INSIGHTS: 1,
  SIGNALS: 2,
  WATCHLISTS: 3,
  TEMPLATES: 4
}

const Counter = ({ value }) => {
  return <div className={styles.counter}>({value})</div>
}

const ProfileActivities = ({ profile }) => {
  const { id: profileId, insights, triggers, watchlists } = profile

  const [step, setStep] = useState(STEPS.INSIGHTS)

  const [templates] = useUserTemplates(profileId)

  console.log(templates)

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div
          className={cx(styles.link, step === STEPS.INSIGHTS && styles.active)}
          onClick={() => setStep(STEPS.INSIGHTS)}
        >
          Insights <Counter value={insights.length} />
        </div>
        <div
          className={cx(
            styles.link,
            step === STEPS.WATCHLISTS && styles.active
          )}
          onClick={() => setStep(STEPS.WATCHLISTS)}
        >
          Watchlists <Counter value={watchlists.length} />
        </div>
        <div
          className={cx(styles.link, step === STEPS.SIGNALS && styles.active)}
          onClick={() => setStep(STEPS.SIGNALS)}
        >
          Signals <Counter value={triggers.length} />
        </div>
        <div
          className={cx(styles.link, step === STEPS.TEMPLATES && styles.active)}
          onClick={() => setStep(STEPS.TEMPLATES)}
        >
          Templates <Counter value={templates.length} />
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
        {step === STEPS.TEMPLATES && (
          <ProfileTemplates userId={profileId} data={templates} />
        )}
      </div>
    </div>
  )
}

export default ProfileActivities
