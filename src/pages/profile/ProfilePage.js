import React, { useMemo } from 'react'
import { Redirect } from 'react-router-dom'
import cx from 'classnames'
import { useQuery } from '@apollo/react-hooks'
import ProfileInfo, { ShareProfile } from './info/ProfileInfo'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import PageLoader from '../../components/Loader/PageLoader'
import {
  PUBLIC_USER_DATA_QUERY,
  updateCurrentUserFollowQueryCache,
  useOldUserFollowersFollowing
} from '../../queries/ProfileGQL'
import { MobileOnly } from '../../components/Responsive'
import { mapQSToState } from '../../utils/utils'
import ProfileActivities from './activities/ProfileActivities'
import { useUser } from '../../stores/user'
import styles from './ProfilePage.module.scss'

export const usePublicUserData = variables => {
  const query = useQuery(PUBLIC_USER_DATA_QUERY, {
    variables: { ...variables }
  })

  return useMemo(
    () => {
      const { data, loading, error } = query
      return { data: data ? data.getUser : undefined, loading, error }
    },
    [query]
  )
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

  const queryVars = useMemo(
    () => {
      const newProps = {
        ...props,
        currentUserId
      }

      return getQueryVariables(newProps)
    },
    [props, currentUserId]
  )

  const { loading: isLoading, data: profile } = usePublicUserData(queryVars)

  const { data: followData, loading } = useOldUserFollowersFollowing(queryVars)

  if (isUserLoading || isLoading || loading) {
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

      <ProfileInfo
        profile={profile}
        updateCache={updateCache}
        followData={followData}
      />

      <ProfileActivities profile={profile} />
    </div>
  )
}

const NoProfileData = () => {
  return "User does't exist"
}

export default ProfilePage
