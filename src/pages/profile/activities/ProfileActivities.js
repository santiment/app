import React, { useState } from 'react'
import cx from 'classnames'
import PublicSignals from '../signals/PublicSignals'
import PublicInsights from '../insights/PublicInsights'
import PublicWatchlists from '../watchlists/PublicWatchlists'
import { useUserTemplates } from '../../../ducks/Studio/Template/gql/hooks'
import ProfileTemplates from '../templates/ProfileTemplates'
import ProjectCard from '../../../ducks/Watchlists/Cards/ProjectCard'
import AddressCard from '../../../ducks/Watchlists/Cards/AddressCard'
import { PROJECT, BLOCKCHAIN_ADDRESS, SCREENER } from '../../../ducks/Watchlists/detector'
import LoaderImage from '../../../components/Loader/PageLoader'
import { checkIsNotScreener, checkIsScreener } from '../../../ducks/Screener/utils'
import { useProfileActivities } from '../../../queries/ProfileGQL'
import { useUser } from '../../../stores/user'
import styles from './ProfileActivities.module.scss'

const ARRAY = []
const STEPS = {
  INSIGHTS: '#insights',
  SIGNALS: '#signals',
  WATCHLISTS: '#watchlists',
  ADDRESSES_WATCHLISTS: '#addresses-watchlists',
  SCREENERS: '#screeners',
  CHART_LAYOUTS: '#chart-layouts',
}

const Counter = ({ value }) => {
  return <div className={styles.counter}>({value})</div>
}

const ProfileActivities = ({ profileId, currentUserId }) => {
  const [step, setStep] = useState(window.location.hash || STEPS.INSIGHTS)
  const [templates] = useUserTemplates(profileId)
  const { data, loading } = useProfileActivities(profileId, currentUserId)
  const { isLoggedIn, user } = useUser()
  const isOwner = isLoggedIn && user && user.id === profileId
  const hasData = !loading && data
  const {
    insightsCount = { totalCount: 0 },
    triggers = ARRAY,
    watchlists = ARRAY,
    addressesWatchlists = ARRAY,
  } = data || {}
  const screeners = watchlists.filter(checkIsScreener)
  const projectWatchlists = watchlists.filter(checkIsNotScreener)
  const goTo = (val) => {
    if (loading) return
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
          Insights <Counter value={hasData ? insightsCount.totalCount : 0} />
        </div>
        <div
          className={cx(styles.link, step === STEPS.WATCHLISTS && styles.active)}
          onClick={() => goTo(STEPS.WATCHLISTS)}
        >
          Watchlists <Counter value={hasData ? projectWatchlists.length : 0} />
        </div>
        <div
          className={cx(styles.link, step === STEPS.ADDRESSES_WATCHLISTS && styles.active)}
          onClick={() => goTo(STEPS.ADDRESSES_WATCHLISTS)}
        >
          Addresses Watchlists <Counter value={hasData ? addressesWatchlists.length : 0} />
        </div>
        <div
          className={cx(styles.link, step === STEPS.SCREENERS && styles.active)}
          onClick={() => goTo(STEPS.SCREENERS)}
        >
          Screeners <Counter value={hasData ? screeners.length : 0} />
        </div>
        <div
          className={cx(styles.link, step === STEPS.SIGNALS && styles.active)}
          onClick={() => goTo(STEPS.SIGNALS)}
        >
          Alerts <Counter value={hasData ? triggers.length : 0} />
        </div>
        <div
          className={cx(styles.link, step === STEPS.CHART_LAYOUTS && styles.active)}
          onClick={() => goTo(STEPS.CHART_LAYOUTS)}
        >
          Chart Layouts <Counter value={hasData ? templates.length : 0} />
        </div>
      </div>
      <div className={styles.right}>
        {loading && <LoaderImage className={styles.loader} />}
        {hasData && (
          <>
            {step === STEPS.INSIGHTS && <PublicInsights userId={profileId} isOwner={isOwner} />}
            {step === STEPS.WATCHLISTS && (
              <PublicWatchlists
                watchlists={projectWatchlists}
                Card={ProjectCard}
                type={PROJECT}
                isOwner={isOwner}
              />
            )}
            {step === STEPS.ADDRESSES_WATCHLISTS && (
              <PublicWatchlists
                watchlists={addressesWatchlists}
                Card={AddressCard}
                type={BLOCKCHAIN_ADDRESS}
                isOwner={isOwner}
              />
            )}
            {step === STEPS.SCREENERS && (
              <PublicWatchlists
                watchlists={screeners}
                path='/screener/'
                Card={ProjectCard}
                type={SCREENER}
                isOwner={isOwner}
              />
            )}
            {step === STEPS.SIGNALS && (
              <PublicSignals userId={profileId} isOwner={isOwner} data={triggers} />
            )}
            {step === STEPS.CHART_LAYOUTS && (
              <ProfileTemplates userId={profileId} isOwner={isOwner} data={templates} />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ProfileActivities
