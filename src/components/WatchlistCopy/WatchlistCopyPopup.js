import React, { useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import Dialog from '@santiment-network/ui/Dialog'
import Label from '@santiment-network/ui/Label'
import { ALL_WATCHLISTS_QUERY } from '../../queries/WatchlistGQL'
import { USER_EDIT_ASSETS_IN_LIST } from '../../actions/types'
import { sortByAsDates } from '../../utils/sortMethods'
import { checkIsLoggedIn } from '../../pages/UserSelectors'
import { showNotification } from '../../actions/rootActions'
import Watchlists from '../WatchlistPopup/Watchlists'
import AssetsList from './AssetsList'
import SearchProjects from '../Search/SearchProjects'
import styles from './WatchlistCopyPopup.module.scss'

const WatchlistCopyPopup = ({
  assets = [],
  data = {},
  trigger,
  isLoggedIn,
  watchlistUi: { editableWatchlists },
  id: currentId,
  sendChanges,
  setNotification
}) => {
  if (!isLoggedIn) return null

  const [isShown, setIsShown] = useState(false)
  const [isEditing, setEditing] = useState(false)
  const [assetsToCopy, setAssetsToCopy] = useState(new Set())
  const [watchlistsToCopy, setWatchlistsToCopy] = useState(new Set())
  const [editWatchlistState, setEditWatchlistState] = useState(
    editableWatchlists
  )

  const close = () => {
    setWatchlistsToCopy(new Set())
    setAssetsToCopy(new Set())
    setEditing(false)
    setIsShown(false)
  }

  const open = () => setIsShown(true)

  const normalizeListItems = items => items.map(({ project: { id } }) => id)

  const checkRemainingAssets = (listId, assets) => {
    const list = lists.find(({ id }) => listId === id)
    const listItems = list ? list.listItems : []

    const remainingAssets = [...assets].filter(id => {
      const assetInList = listItems.find(itemId => itemId === id)
      return !assetInList
    })

    return remainingAssets
  }

  const { fetchUserLists = [] } = data
  let lists = fetchUserLists
    .filter(({ id }) => id !== currentId)
    .sort(sortByAsDates('insertedAt'))
    .reverse()
    .map(({ listItems, ...rest }) => ({
      ...rest,
      listItems: normalizeListItems(listItems)
    }))

  if (editableWatchlists.length !== editWatchlistState.length) {
    setEditWatchlistState(editableWatchlists)
    if (editableWatchlists.length === 0) {
      setNotification(
        `${watchlistsToCopy.size} watchlist${
          watchlistsToCopy.size > 1 ? 's were' : ' was'
        } modified`
      )
      close()
    }
  }

  const checkEditingState = (assets, watchlists) => {
    if ((assets.size === 0 || watchlists.size === 0) && isEditing) {
      setEditing(false)
    } else if (assets.size && watchlists.size > 0) {
      const hasWatchlistWithoutSelectedAssets = [...watchlists].some(
        assetsListId => {
          const remainingAssets = checkRemainingAssets(assetsListId, assets)
          return remainingAssets.length > 0
        }
      )
      if (hasWatchlistWithoutSelectedAssets !== isEditing) {
        setEditing(hasWatchlistWithoutSelectedAssets)
      }
    }
  }

  const toggleItem = (list, id) => {
    const listCopy = new Set([...list])

    if (listCopy.has(id)) listCopy.delete(id)
    else listCopy.add(id)

    return listCopy
  }

  const onAssetClick = id => {
    const assets = toggleItem(assetsToCopy, id)
    setAssetsToCopy(assets)
    checkEditingState(assets, watchlistsToCopy)
  }

  const onWatchlistClick = ({ id }) => {
    const watchlists = toggleItem(watchlistsToCopy, id)
    setWatchlistsToCopy(watchlists)
    checkEditingState(assetsToCopy, watchlists)
  }

  const applyChanges = () => {
    watchlistsToCopy.forEach(assetsListId => {
      const remainingAssets = checkRemainingAssets(assetsListId, assetsToCopy)
      if (remainingAssets.length > 0) {
        sendChanges({
          assetsListId,
          currentId,
          listItems: remainingAssets.map(id => ({ id }))
        })
      }
    })
  }

  return (
    <Dialog
      title={`Copy assets to watchlist(-s)`}
      trigger={trigger}
      onOpen={open}
      onClose={close}
      open={isShown}
      showCloseBtn={false}
    >
      <Dialog.ScrollContent className={styles.wrapper}>
        <SearchProjects
          projectsList={assets}
          checkedAssets={assetsToCopy}
          isCopyingAssets={true}
          className={styles.search}
          onSuggestionSelect={({ id }) => onAssetClick(id)}
        />
        <AssetsList
          items={assets}
          selectedItems={assetsToCopy}
          onToggleAsset={onAssetClick}
        />
        <div className={styles.contentWrapper}>
          <Label accent='waterloo' className={styles.heading}>
            Watchlists
          </Label>
          <Watchlists onWatchlistClick={onWatchlistClick} lists={lists} />
        </div>
      </Dialog.ScrollContent>
      <Dialog.Actions className={styles.actions}>
        <Dialog.Cancel border={false} accent='grey' onClick={close}>
          Cancel
        </Dialog.Cancel>
        <Dialog.Approve
          disabled={editWatchlistState.length > 0 || !isEditing}
          variant='flat'
          isLoading={editWatchlistState.length > 0}
          onClick={applyChanges}
        >
          Apply
        </Dialog.Approve>
      </Dialog.Actions>
    </Dialog>
  )
}

const mapStateToProps = state => ({
  watchlistUi: state.watchlistUi,
  isLoggedIn: checkIsLoggedIn(state),
  assets: state.projects.items
})

const mapDispatchToProps = dispatch => ({
  sendChanges: ({ assetsListId, listItems, currentId }) =>
    dispatch({
      type: USER_EDIT_ASSETS_IN_LIST,
      payload: { assetsListId, listItems, currentId }
    }),
  setNotification: message => dispatch(showNotification(message))
})

export default compose(
  graphql(ALL_WATCHLISTS_QUERY, {
    options: () => ({ context: { isRetriable: true } })
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(WatchlistCopyPopup)
