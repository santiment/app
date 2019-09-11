import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import SignalCardsGrid from '../../../components/SignalCard/SignalCardsGrid'
import { BlocksLoader } from './../ProfilePage'
import styles from './../ProfilePage.module.scss'

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

const PublicSignals = ({
  data: { publicTriggersForUser: signals, loading }
}) => {
  if (loading) {
    return <BlocksLoader />
  }

  return (
    <div className={styles.block}>
      <div className={styles.title}>Public signals ({signals.length})</div>
      <div>
        <SignalCardsGrid signals={signals.map(({ trigger }) => trigger)} />
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
      variables: {
        userId: userId
      }
    }
  }
})(PublicSignals)
