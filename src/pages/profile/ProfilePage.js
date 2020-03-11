import React from 'react'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import cx from 'classnames'
import ProfileInfo, { ShareProfile } from './info/ProfileInfo'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import PageLoader from '../../components/Loader/PageLoader'
import { PUBLIC_USER_DATA_QUERY } from '../../queries/ProfileGQL'
import { MobileOnly } from '../../components/Responsive'
import { mapQSToState } from '../../utils/utils'
import ProfileActivities from './activities/ProfileActivities'
import { updateCurrentUserQueryCache } from './follow/FollowBtn'
import styles from './ProfilePage.module.scss'

const getQueryVariables = ({
  currentUser,
  location,
  match: { params: { id } = {} } = {}
}) => {
  let variables
  if (id) {
    variables = { userId: id }
  } else {
    const { username } = mapQSToState({ location })
    variables = {
      username
    }
  }

  if (!variables.userId && !variables.username && currentUser.id) {
    variables = { userId: currentUser.id }
  }

  return variables
}

const ProfilePage = props => {
  const {
    currentUser,
    profile,
    isLoading,
    isLoggedIn,
    isUserLoading,
    history
  } = props

  if (isUserLoading || isLoading) {
    return <PageLoader />
  }

  if (!profile) {
    if (isLoggedIn) {
      return (
        <div className={cx('page', styles.page)}>
          <NoProfileData />
        </div>
      )
    } else {
      return <Redirect to='/login' />
    }
  }

  function updateCache (cache, queryData) {
    const queryVariables = getQueryVariables(props)
    updateCurrentUserQueryCache(
      cache,
      queryData,
      queryVariables,
      +currentUser.id
    )
  }

  return (
    <div className={cx('page', styles.page)}>
      <MobileOnly>
        <div className={styles.header}>
          <MobileHeader
            rightActions={<ShareProfile />}
            showBack={true}
            goBack={history.goBack}
            classes={styles}
          />
        </div>
      </MobileOnly>

      <ProfileInfo profile={profile} updateCache={updateCache} />

      <ProfileActivities profile={profile} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.data
  }
}

const enhance = compose(
  connect(mapStateToProps),
  graphql(PUBLIC_USER_DATA_QUERY, {
    options: props => ({
      variables: getQueryVariables(props)
    }),
    props: ({ data: { getUser, loading, error } }) => ({
      profile: getUser,
      isLoading: loading,
      isError: error
    })
  })
)

const NoProfileData = () => {
  return "User does't exist"
}

export default enhance(ProfilePage)
