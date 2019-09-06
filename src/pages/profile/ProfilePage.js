import React from 'react'
import { Redirect } from 'react-router-dom'
import PublicWatchlists from './watchlists/PublicWatchlists'
import PublicSignals from './signals/PublicSignals'
import PublicInsights from './insights/PublicInsights'
import Breadcrumbs from './breadcrumbs/Breadcrumbs'
import Loader from '@santiment-network/ui/Loader/Loader'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import styles from './ProfilePage.module.scss'

const ProfilePage = ({
  profile = {},
  isDesktop,
  match: { params: { id } = {} } = {}
}) => {
  if (!id) {
    return <Redirect to='/' />
  }

  const { username } = profile

  return (
    <div className='page'>
      {!isDesktop && (
        <div className={styles.header}>
          <MobileHeader title='Profile' />
        </div>
      )}

      <div className={styles.page}>
        {isDesktop && (
          <Breadcrumbs
            crumbs={[
              {
                label: 'User'
              },
              {
                label: username || id
              }
            ]}
          />
        )}

        <PublicWatchlists userId={id} />

        <PublicSignals userId={id} />

        <PublicInsights userId={id} />
      </div>
    </div>
  )
}

export const BlocksLoader = () => (
  <div className={styles.loader}>
    <Loader />
  </div>
)

export default ProfilePage
