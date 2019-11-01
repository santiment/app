import React from 'react'
import { connect } from 'react-redux'
import PublicWatchlists from './watchlists/PublicWatchlists'
import PublicSignals from './signals/PublicSignals'
import PublicInsights from './insights/PublicInsights'
import Breadcrumbs from './breadcrumbs/Breadcrumbs'
import Loader from '@santiment-network/ui/Loader/Loader'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import PageLoader from '../../components/Loader/PageLoader'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import styles from './ProfilePage.module.scss'
import { PUBLIC_USER_DATA_QUERY } from '../../queries/ProfileGQL'
import { DesktopOnly, MobileOnly } from '../../components/Responsive'

const ProfilePage = ({
  profile = {},
  isLoading,
  isError,
  isUserLoading,
  match: { params: { id } = {} } = {}
}) => {
  const {
    username,
    email,
    id: profileId,
    insights,
    triggers,
    watchlists
  } = profile

  if (isUserLoading || isLoading) {
    return <PageLoader />
  }

  return (
    <div className='page'>
      <MobileOnly>
        <div className={styles.header}>
          <MobileHeader title='Profile' />
        </div>
      </MobileOnly>

      <div className={styles.page}>
        <DesktopOnly>
          <Breadcrumbs
            crumbs={[
              {
                label: 'User'
              },
              {
                label: username || email || profileId
              }
            ]}
          />
        </DesktopOnly>

        <PublicWatchlists userId={id} data={watchlists} />

        <PublicSignals userId={id} data={triggers} />

        <PublicInsights userId={id} data={insights} />
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

const enhance = compose(
  connect(mapStateToProps),
  graphql(PUBLIC_USER_DATA_QUERY, {
    skip: ({ match: { params: { id } = {} } = {} }) => {
      return !id
    },
    options: ({ match: { params: { id } = {} } = {} }) => {
      return {
        fetchPolicy: 'cache-and-network',
        variables: {
          userId: +id
        }
      }
    },
    props: ({ data: { getUser, loading, error } }) => {
      return {
        profile: getUser,
        isLoading: loading,
        isError: error
      }
    }
  })
)

export default enhance(ProfilePage)
