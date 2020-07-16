import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { Button, Toggle } from '@santiment-network/ui'
import * as qs from 'query-string'
import { compose } from 'recompose'
import { updateUserListGQL, fetchUserListsGQL } from './watchlistShareGQL'
import styles from './index.module.css'

const VisibilityToggle = ({
  isPublic,
  toggleWatchlistPublicity,
  watchlistId
}) => {
  const [isActive, setActive] = useState(!isPublic)
  return (
    <Button
      variant='ghost'
      onClick={() => {
        setActive(!isActive)
        toggleWatchlistPublicity({
          variables: { id: parseInt(watchlistId, 10), isPublic: !isPublic },
          update: cache => {
            const data = cache.readQuery({
              query: fetchUserListsGQL
            })
            const list = data.fetchUserLists.find(
              ({ id }) => id === watchlistId
            )
            list.isPublic = !isPublic
            cache.writeQuery({
              query: fetchUserListsGQL,
              data
            })
          }
        }).catch(error => {
          alert('Error in publicity query: ', error)
        })
      }}
      fluid
      className={styles.btn}
    >
      Private <Toggle isActive={isActive} />
    </Button>
  )
}

const enhance = compose(
  withRouter,
  graphql(updateUserListGQL, {
    name: 'toggleWatchlistPublicity'
  }),
  graphql(fetchUserListsGQL, {
    name: 'fetchUserLists',
    skip: ({ location: { search } }) => {
      const queryParams = qs.parse(search)
      return !(queryParams.name && queryParams.name.includes('@'))
    },
    props: ({ fetchUserLists, ownProps }) => {
      const { fetchUserLists: watchlists } = fetchUserLists
      const {
        location: { search }
      } = ownProps
      const parsedQS = qs.parse(search)

      if (!watchlists || !parsedQS.name) {
        return {}
      }
      const [, watchlistId] = parsedQS.name.split('@')
      const foundUserWatchlist = watchlists.find(
        watchlist => watchlist.id === watchlistId
      )

      if (!foundUserWatchlist) {
        return {}
      }

      return {
        isPublic: foundUserWatchlist.isPublic,
        watchlistId
      }
    }
  })
)

export default enhance(VisibilityToggle)
