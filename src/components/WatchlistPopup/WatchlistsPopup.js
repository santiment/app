import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Button, Dialog } from '@santiment-network/ui'
import { ALL_WATCHLISTS_QUERY } from '../../queries/WatchlistGQL'
import {
  USER_ADD_ASSET_TO_LIST,
  USER_REMOVE_ASSET_FROM_LIST
} from './../../actions/types'
import { showNotification } from '../../actions/rootActions'
import WatchlistsAnon from './WatchlistsAnon'
import Watchlists from './Watchlists'
import styles from './WatchlistsPopup.module.scss'

const AddToListBtn = (
  <Button variant='fill' accent='positive' className={styles.btn}>
    Add to watchlists
  </Button>
)

export const hasAssetById = ({ id, listItems }) => {
  if (!id) return
  return listItems.some(({ id: projectId }) => projectId === id)
}

const WatchlistPopup = ({
  isLoggedIn,
  trigger = AddToListBtn,
  applyChanges,
  setNotification,
  projectId,
  lists = [],
  watchlistUi: { editableAssetsInList },
  ...props
}) => {
  const [changes, setChanges] = useState([])
  const [isShown, setIsShown] = useState(false)
  const [editableAssets, setEditableAssets] = useState(editableAssetsInList)

  const addChange = change => {
    const prevLength = changes.length
    const changesWithoutProjectAndList = changes.filter(
      ({ projectId, assetsListId }) =>
        projectId !== change.projectId || assetsListId !== change.assetsListId
    )
    const currLength = changesWithoutProjectAndList.length
    prevLength === currLength
      ? setChanges([...changes, change])
      : setChanges(changesWithoutProjectAndList)
  }

  const close = () => {
    setChanges([])
    setIsShown(false)
  }
  const open = () => setIsShown(true)

  const toggleAssetInList = ({ id: assetsListId, listItems, slug }) => {
    if (!projectId) return
    const isAssetInList = hasAssetById({
      listItems: lists.find(({ id }) => id === assetsListId).listItems,
      id: projectId
    })
    addChange({ projectId, assetsListId, listItems, slug, isAssetInList })
  }

  if (editableAssetsInList !== editableAssets) {
    setEditableAssets(editableAssetsInList)
    if (editableAssetsInList.length === 0) {
      const amount = changes.length
      if (amount !== 0) {
        setNotification(
          `${amount} watchlist${amount > 1 ? 's were' : ' was'} modified`
        )
      }
      close()
    }
  }

  const add = () => applyChanges(changes)

  return (
    <Dialog
      title='Add to watchlist'
      trigger={trigger}
      onOpen={open}
      onClose={close}
      open={isShown}
    >
      {isLoggedIn ? (
        <>
          <Dialog.ScrollContent withPadding>
            <Watchlists
              onWatchlistClick={watchlist => toggleAssetInList(watchlist)}
              lists={lists}
              projectId={projectId}
              {...props}
            />
          </Dialog.ScrollContent>
          <Dialog.Actions className={styles.actions}>
            <Dialog.Cancel
              border={false}
              accent='grey'
              onClick={close}
              type='cancel'
            >
              Cancel
            </Dialog.Cancel>
            <Dialog.Approve
              disabled={editableAssetsInList.length > 0 || changes.length === 0}
              type='submit'
              variant='flat'
              onClick={add}
            >
              {editableAssetsInList.length > 0 ? 'Adding...' : 'Add'}
            </Dialog.Approve>
          </Dialog.Actions>
        </>
      ) : (
        <WatchlistsAnon />
      )}
    </Dialog>
  )
}

const sortWatchlists = (
  { insertedAt: insertedList1 },
  { insertedAt: insertedList2 }
) => new Date(insertedList1) - new Date(insertedList2)

const mapStateToProps = ({ watchlistUi }) => ({ watchlistUi })

const mapDispatchToProps = dispatch => ({
  applyChanges: changes => {
    changes.map(({ projectId, assetsListId, listItems, slug, isAssetInList }) =>
      dispatch({
        type: isAssetInList
          ? USER_REMOVE_ASSET_FROM_LIST
          : USER_ADD_ASSET_TO_LIST,
        payload: { projectId, assetsListId, listItems, slug }
      })
    )
  },
  setNotification: message => dispatch(showNotification(message))
})

export default compose(
  graphql(ALL_WATCHLISTS_QUERY, {
    name: 'Watchlists',
    skip: ({ isLoggedIn }) => !isLoggedIn,
    options: () => ({ context: { isRetriable: true } }),
    props: ({ Watchlists: { fetchUserLists = [], loading = true } }) => ({
      lists: fetchUserLists.sort(sortWatchlists).map(list => ({
        ...list,
        listItems: list.listItems.map(assets => assets.project)
      })),
      isLoading: loading
    })
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(WatchlistPopup)
