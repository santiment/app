import React from 'react'
import { BlocksLoader } from './../ProfilePage'
import styles from './../ProfilePage.module.scss'

const PublicWatchlists = ({ data: { watchlists = [], loading } = {} } = {}) => {
  if (loading) {
    return <BlocksLoader />
  }

  if (!watchlists || watchlists.length === 0) {
    return null
  }

  return (
    <div className={styles.block}>
      <div className={styles.title}>Public watchlists ()</div>
      <div />
    </div>
  )
}

/*
* graphql(PUBLIC_TRIGGERS_FOR_USER_QUERY, {
  skip: ({ userId }) => {
    return !userId
  },
  options: props => {
    const { userId } = props
    return {
      fetchPolicy: 'cache-and-network',
      variabled: {
        userId: userId
      }
    }
  }
})(
*
* */
export default PublicWatchlists
