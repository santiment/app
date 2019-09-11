import React from 'react'
import { connect } from 'react-redux'
import PublicWatchlists from './watchlists/PublicWatchlists'
import PublicSignals from './signals/PublicSignals'
import PublicInsights from './insights/PublicInsights'
import Breadcrumbs from './breadcrumbs/Breadcrumbs'
import Loader from '@santiment-network/ui/Loader/Loader'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import PageLoader from '../../components/Loader/PageLoader'
import styles from './ProfilePage.module.scss'

const ProfilePage = ({
  profile = {},
  isDesktop,
  isUserLoading,
  defaultUser,
  defaultUser: { id: defaultUserId, username: defaultUserName },
  match: { params: { id = defaultUserId } = {} } = {}
}) => {
  const { username = id } = profile

  const isCurentUser = defaultUserId === id

  if (isUserLoading) {
    return <PageLoader />
  }

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
                label: isCurentUser ? defaultUserName : username
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

const mapStateToProps = state => ({
  defaultUser: state.user.data
})

export default connect(mapStateToProps)(ProfilePage)
