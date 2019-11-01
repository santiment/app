import React from 'react'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import PublicWatchlists from './watchlists/PublicWatchlists'
import PublicSignals from './signals/PublicSignals'
import PublicInsights from './insights/PublicInsights'
import Breadcrumbs from './breadcrumbs/Breadcrumbs'
import ProfileInfo from './info/ProfileInfo'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import PageLoader from '../../components/Loader/PageLoader'
import { PUBLIC_USER_DATA_QUERY } from '../../queries/ProfileGQL'
import { DesktopOnly, MobileOnly } from '../../components/Responsive'
import styles from './ProfilePage.module.scss'

const ProfilePage = ({
  profile = {},
  isLoading,
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

  console.log(profile)

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

        <ProfileInfo profile={profile} />

        <PublicWatchlists userId={id} data={watchlists} />

        <PublicSignals userId={id} data={triggers} />

        <PublicInsights userId={id} data={insights} />
      </div>
    </div>
  )
}

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
