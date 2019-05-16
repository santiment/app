import React from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Button, ContextMenu, Panel } from '@santiment-network/ui'
import { WatchlistGQL } from './WatchlistGQL'
import Watchlists, { hasAssetById } from './Watchlists'
import ChooseWatchlists from './ChooseWatchlists'
import WatchlistsAnon from './WatchlistsAnon'
import * as actions from './../../actions/types'
import styles from './WatchlistsPopup.module.scss'

const AddToListBtn = (
  <Button variant='fill' accent='positive' className={styles.btn}>
    Add to watchlists
  </Button>
)

const WatchlistPopup = ({
  isNavigation = false,
  trigger = AddToListBtn,
  ...props
}) => {
  return isNavigation ? ( // NOTE(vanguard): i know this is ugly as hell, but we should refactor Watchlist + WatchlistPopup component logic first to make it better.
    props.isLoggedIn ? (
      <Watchlists isNavigation={isNavigation} {...props} />
    ) : (
      <WatchlistsAnon />
    )
  ) : (
    <ContextMenu position='bottom' align='center' trigger={trigger}>
      <Panel padding variant='modal'>
        {props.isLoggedIn ? (
          <ChooseWatchlists isNavigation={isNavigation} {...props} />
        ) : (
          <WatchlistsAnon />
        )}
      </Panel>
    </ContextMenu>
  )
}

const sortWatchlists = (
  { insertedAt: insertedAtList1 },
  { insertedAt: insertedAtList2 }
) => new Date(insertedAtList1) - new Date(insertedAtList2)

const mapStateToProps = ({ watchlistUi }) => ({ watchlistUi })

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleAssetInList: ({ projectId, assetsListId, listItems, slug }) => {
    if (!projectId) return
    const isAssetInList = hasAssetById({
      listItems: ownProps.lists.find(list => list.id === assetsListId)
        .listItems,
      id: projectId
    })

    if (isAssetInList) {
      return dispatch({
        type: actions.USER_REMOVE_ASSET_FROM_LIST,
        payload: { projectId, assetsListId, listItems, slug }
      })
    } else {
      return dispatch({
        type: actions.USER_ADD_ASSET_TO_LIST,
        payload: { projectId, assetsListId, listItems, slug }
      })
    }
  },
  createWatchlist: payload =>
    dispatch({
      type: actions.USER_ADD_NEW_ASSET_LIST,
      payload
    })
})

export default compose(
  graphql(WatchlistGQL, {
    name: 'Watchlists',
    skip: ({ isLoggedIn }) => !isLoggedIn,
    options: () => ({ context: { isRetriable: true } }),
    props: ({ Watchlists }) => {
      const { fetchUserLists = [], loading = true } = Watchlists
      return { lists: fetchUserLists.sort(sortWatchlists), isLoading: loading }
    }
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(WatchlistPopup)
