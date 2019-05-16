import React from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Button, ContextMenu, Panel } from '@santiment-network/ui'
import { WatchlistGQL } from './WatchlistGQL'
import {
  USER_ADD_ASSET_TO_LIST,
  USER_ADD_NEW_ASSET_LIST,
  USER_REMOVE_ASSET_FROM_LIST
} from './../../actions/types'
import ChooseWatchlists from './ChooseWatchlists'
import WatchlistsAnon from './WatchlistsAnon'
import styles from './WatchlistsPopup.module.scss'

const AddToListBtn = (
  <Button variant='fill' accent='positive' className={styles.btn}>
    Add to watchlists
  </Button>
)

export const hasAssetById = ({ id, listItems }) =>
  listItems.some(({ project }) => project.id === id)

const WatchlistPopup = ({ isLoggedIn, trigger = AddToListBtn, ...props }) => (
  <ContextMenu position='bottom' align='center' trigger={trigger}>
    <Panel padding variant='modal'>
      {isLoggedIn ? <ChooseWatchlists {...props} /> : <WatchlistsAnon />}
    </Panel>
  </ContextMenu>
)

const sortWatchlists = (
  { insertedAt: insertedList1 },
  { insertedAt: insertedList2 }
) => new Date(insertedList1) - new Date(insertedList2)

const mapStateToProps = ({ watchlistUi }) => ({ watchlistUi })

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleAssetInList: ({ projectId, assetsListId, listItems, slug }) => {
    if (!projectId) return
    const isAssetInList = hasAssetById({
      listItems: ownProps.lists.find(({ id }) => id === assetsListId).listItems,
      id: projectId
    })

    return dispatch({
      type: isAssetInList
        ? USER_REMOVE_ASSET_FROM_LIST
        : USER_ADD_ASSET_TO_LIST,
      payload: { projectId, assetsListId, listItems, slug }
    })
  },
  createWatchlist: payload =>
    dispatch({ type: USER_ADD_NEW_ASSET_LIST, payload })
})

export default compose(
  graphql(WatchlistGQL, {
    name: 'Watchlists',
    skip: ({ isLoggedIn }) => !isLoggedIn,
    options: () => ({ context: { isRetriable: true } }),
    props: ({ Watchlists: { fetchUserLists = [], loading = true } }) => ({
      lists: fetchUserLists.sort(sortWatchlists),
      isLoading: loading
    })
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(WatchlistPopup)
