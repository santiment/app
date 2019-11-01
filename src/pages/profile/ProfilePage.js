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
  currentUser,
  profile,
  isLoading,
  isUserLoading,
  match: { params: { id } = {} } = {}
}) => {
  if (!profile || isUserLoading || isLoading) {
    return <PageLoader />
  }

  const {
    username,
    email,
    id: profileId,
    insights,
    triggers,
    watchlists
  } = profile

  function updateCache (cache, { data: { follow, unfollow } }) {
    const queryUserId = +profileId

    const getUserData = cache.readQuery({
      query: PUBLIC_USER_DATA_QUERY,
      variables: {
        userId: queryUserId
      }
    })

    const {
      getUser: { followers }
    } = getUserData
    const isInFollowers = followers.users.some(
      ({ id }) => +id === +currentUser.id
    )
    const { users } = followers

    if (isInFollowers) {
      const { id: followerId } = follow || unfollow
      followers.users = users.filter(({ id }) => +id !== +followerId)
    } else {
      users.push(follow)
      followers.users = [...users]
    }
    followers.count = followers.users.length

    cache.writeQuery({
      query: PUBLIC_USER_DATA_QUERY,
      variables: { userId: queryUserId },
      data: {
        ...getUserData
      }
    })
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

        <ProfileInfo profile={profile} updateCache={updateCache} />

        <PublicWatchlists userId={id} data={watchlists} />

        <PublicSignals userId={id} data={triggers} />

        <PublicInsights userId={id} data={insights} />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.data
})

const enhance = compose(
  connect(mapStateToProps),
  graphql(PUBLIC_USER_DATA_QUERY, {
    skip: ({ match: { params: { id } = {} } = {} }) => !id,
    options: ({ match: { params: { id } = {} } = {} }) => ({
      variables: {
        userId: +id
      }
    }),
    props: ({ data: { getUser, loading, error } }) => ({
      profile: getUser,
      isLoading: loading,
      isError: error
    })
  })
)

export default enhance(ProfilePage)
