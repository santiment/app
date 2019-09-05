import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Loader from '@santiment-network/ui/Loader/Loader'
import SignalCardsGrid from '../../../components/SignalCard/SignalCardsGrid'
import styles from './PublicSignals.module.scss'

const PUBLIC_TRIGGERS_FOR_USER_QUERY = gql`
  query publicTriggersForUser($userId: ID!) {
    publicTriggersForUser(userId: $userId) {
      trigger {
        id
        isActive
        isPublic
        isRepeating
        title
        description
      }
      userId
      __typename
    }
  }
`

const PublicSignals = ({ data: { publicTriggersForUser, loading } }) => {
  if (loading) {
    return (
      <div className={styles.loader}>
        <Loader />
      </div>
    )
  }

  return (
    <div>
      <div className={styles.title}>
        Public signals ({publicTriggersForUser.length})
      </div>
      <div>
        <SignalCardsGrid
          signals={publicTriggersForUser.map(({ trigger }) => trigger)}
        />
      </div>
    </div>
  )
}

export default graphql(PUBLIC_TRIGGERS_FOR_USER_QUERY, {
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
})(PublicSignals)
