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
import gql from 'graphql-tag'
import styles from './ProfilePage.module.scss'

const ProfilePage = ({
  profile = {},
  isDesktop,
  isUserLoading,
  defaultUser: { id: defaultUserId, username: defaultUserName },
  match: { params: { id = defaultUserId } = {} } = {}
}) => {
  const { username = id } = profile

  const isCurentUser = defaultUserId === id

  console.log(profile)

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

const PUBLIC_USER_DATA_QUERY = gql`
  query getUser($userId: ID) {
    getUser(selector: { id: $userId }) {
      id
      email
      username
      watchlists {
        id
      }
      followers {
        count
        users {
          id
          email
        }
      }
      insights {
        id
      }
      triggers {
        id
      }
    }
  }
`

const enhance = compose(
  connect(mapStateToProps),
  graphql(PUBLIC_USER_DATA_QUERY, {
    name: 'profile',
    skip: ({ userId }) => {
      return !userId
    },
    options: props => {
      const { userId } = props
      return {
        fetchPolicy: 'cache-and-network',
        variables: {
          userId: +userId
        }
      }
    }
  })
)

export default enhance(ProfilePage)
