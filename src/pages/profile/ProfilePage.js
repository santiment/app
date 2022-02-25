import React, { useMemo } from 'react'
import { Redirect } from 'react-router-dom'
import cx from 'classnames'
import { useQuery } from '@apollo/react-hooks'
import ProfileInfo, { ShareProfile } from './info/ProfileInfo'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import PageLoader from '../../components/Loader/PageLoader'
import ProfileActivities from './activities/ProfileActivities'
import {
  PUBLIC_USER_DATA_QUERY,
  PUBLIC_CURRENT_USER_DATA_QUERY,
  updateCurrentUserFollowQueryCache,
  useOldUserFollowersFollowing
} from '../../queries/ProfileGQL'
import { MobileOnly } from '../../components/Responsive'
import { mapQSToState } from '../../utils/utils'
import { useUser } from '../../stores/user'
import styles from './ProfilePage.module.scss'

export const usePublicUserData = (variables, currentUserId) => {
  const isCurrentUser = variables.userId === currentUserId
  const QUERY = isCurrentUser
    ? PUBLIC_CURRENT_USER_DATA_QUERY
    : PUBLIC_USER_DATA_QUERY
  const QUERY_FIELD = isCurrentUser ? 'currentUser' : 'getUser'
  const query = useQuery(
    QUERY,
    !isCurrentUser && {
      variables: { ...variables }
    }
  )

  return useMemo(() => {
    const { data, loading, error } = query
    return { data: data ? data[QUERY_FIELD] : undefined, loading, error }
  }, [query])
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

  const currentUserId = user ? user.id : undefined

  const queryVars = useMemo(() => {
    const newProps = {
      ...props,
      currentUserId
    }

    return getQueryVariables(newProps)
  }, [props, currentUserId])

  const { loading: isLoading, data: profile } = usePublicUserData(
    queryVars,
    currentUserId
  )

  const { data: followData } = useOldUserFollowersFollowing(queryVars)

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
    updateCurrentUserFollowQueryCache(
      cache,
      queryData,
      queryVars,
      user && +user.id,
      undefined,
      currentUserId
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
      {followData && (
        <ProfileInfo
          profile={profile}
          updateCache={updateCache}
          followData={followData}
        />
      )}
      <ProfileActivities profileId={profile.id} currentUserId={currentUserId} />
    </div>
  )
}

const NoProfileData = () => {
  return "User does't exist"
}

export default ProfilePage
