import React from 'react'
import { Redirect } from 'react-router-dom'
import cx from 'classnames'
import { useQuery } from '@apollo/react-hooks'
import ProfileInfo, { ShareProfile } from './info/ProfileInfo'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import PageLoader from '../../components/Loader/PageLoader'
import { PUBLIC_USER_DATA_QUERY } from '../../queries/ProfileGQL'
import { MobileOnly } from '../../components/Responsive'
import { mapQSToState } from '../../utils/utils'
import ProfileActivities from './activities/ProfileActivities'
import { updateCurrentUserQueryCache } from './follow/FollowBtn'
import { useUser } from '../../stores/user'
import styles from './ProfilePage.module.scss'

export const usePublicUserData = variables => {
  const { data, loading, error } = useQuery(PUBLIC_USER_DATA_QUERY, {
    variables: variables
  })

  return { data: data ? data.getUser : undefined, loading, error }
}

const getQueryVariables = ({
  currentUserId,
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

  if (!variables.userId && !variables.username && currentUserId) {
    variables = { userId: currentUserId }
  }

  return variables
}

const ProfilePage = props => {
  const { user = {}, loading: isUserLoading, isLoggedIn } = useUser()
  const { history } = props

  const newProps = {
    ...props,
    currentUserId: user ? user.id : undefined
  }

  const { loading: isLoading, data: profile } = usePublicUserData(
    getQueryVariables(newProps)
  )

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
    const queryVariables = getQueryVariables(newProps)
    updateCurrentUserQueryCache(
      cache,
      queryData,
      queryVariables,
      user && +user.id
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

const NoProfileData = () => {
  return "User does't exist"
}

export default ProfilePage
