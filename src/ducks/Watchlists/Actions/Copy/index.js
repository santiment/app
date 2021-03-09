import React, { useState } from 'react'
import { connect } from 'react-redux'
import Dialog from '@santiment-network/ui/Dialog'
import Label from '@santiment-network/ui/Label'
import { USER_EDIT_ASSETS_IN_LIST } from '../../../../actions/types'
import { sortByAsDates } from '../../../../utils/sortMethods'
import { showNotification } from '../../../../actions/rootActions'
import Watchlists from '../../Templates/Watchlists'
import AssetsList from './AssetsList'
import { useUser } from '../../../../stores/user/index'
import LoginPopup from '../../../../components/banners/feature/PopupBanner'
import SearchProjects from '../../../../components/Search/SearchProjects'
import { useProjectWatchlists } from '../../gql/lists/hooks'
import styles from './index.module.scss'

const WatchlistCopyPopup = ({
  assets = [],
  trigger,
  watchlistUi: { editableWatchlists },
  id: currentId,
  sendChanges,
  setNotification
}) => {
  const { isLoggedIn } = useUser()

  const [watchlists] = useProjectWatchlists()
  const [isShown, setIsShown] = useState(false)
  const [isEditing, setEditing] = useState(false)
  const [warning, setWarning] = useState(false)
  const [assetsToCopy, setAssetsToCopy] = useState(new Set())
  const [watchlistsToCopy, setWatchlistsToCopy] = useState(new Set())
  const [editWatchlistState, setEditWatchlistState] = useState(
    editableWatchlists
  )

  if (!isLoggedIn) return <LoginPopup>{trigger}</LoginPopup>

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
      const assetInList = listItems.some(itemId => itemId === id)
      return !assetInList
    })

    return remainingAssets
  }

  let lists = watchlists
    .filter(({ id }) => id !== currentId)
    .sort(sortByAsDates('insertedAt'))
    .reverse()
    .map(({ listItems, ...rest }) => ({
      ...rest,
      listItems: normalizeListItems(listItems)
    }))

  if (editableWatchlists.length !== editWatchlistState.length) {
    setEditWatchlistState(editableWatchlists)
    if (editableWatchlists.length === 0 && isShown) {
      setNotification({
        description: 'Copying completed successfully',
        title: 'Success',
        variant: 'success'
      })
      close()
    }
  }

  const checkEditingState = (assets, watchlists) => {
    if (assets.size === 0 || watchlists.size === 0) {
      if (isEditing) setEditing(false)
      if (warning) setWarning(false)
    } else if (assets.size > 0 && watchlists.size > 0) {
      const hasWatchlistWithoutSelectedAssets = [...watchlists].some(
        assetsListId => {
          const remainingAssets = checkRemainingAssets(assetsListId, assets)
          return remainingAssets.length > 0
        }
      )
      if (hasWatchlistWithoutSelectedAssets !== isEditing) {
        setEditing(hasWatchlistWithoutSelectedAssets)
      }
      if (!hasWatchlistWithoutSelectedAssets && !warning) setWarning(true)
      if (hasWatchlistWithoutSelectedAssets && warning) setWarning(false)
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
        const list = lists.find(({ id }) => assetsListId === id)
        sendChanges({
          assetsListId,
          currentId,
          listItems: [...list.listItems, ...remainingAssets].map(id => ({
            id
          }))
        })
      }
    })
  }

  return (
    <Dialog
      title={`Copy assets to watchlist${watchlistsToCopy.size > 1 ? 's' : ''}`}
      trigger={trigger}
      onOpen={open}
      onClose={close}
      open={isShown}
    >
      <Dialog.ScrollContent className={styles.wrapper}>
        <div className={styles.assetsWrapper}>
          <SearchProjects
            noTrends
            projects={assets}
            checkedAssets={assetsToCopy}
            isCopyingAssets={true}
            className={styles.search}
            onSuggestionSelect={({ item: { id } }) => onAssetClick(id)}
          />
          <AssetsList
            items={assets}
            selectedItems={assetsToCopy}
            onToggleAsset={onAssetClick}
            classes={{ list: styles.wrapperList, asset: styles.asset }}
          />
        </div>
        <div className={styles.watchlistsWrapper}>
          <Label accent='waterloo' className={styles.heading}>
            Watchlists
          </Label>
          <Watchlists
            onWatchlistClick={onWatchlistClick}
            className={styles.wrapperList}
            classes={{ list: styles.watchlists }}
            lists={lists}
          />
        </div>
      </Dialog.ScrollContent>
      {warning && (
        <div className={styles.warning}>
          All selected watchlists already contained all selected assets
        </div>
      )}
      <Dialog.Actions className={styles.actions}>
        <Dialog.Cancel onClick={close}>Cancel</Dialog.Cancel>
        <Dialog.Approve
          disabled={editWatchlistState.length > 0 || !isEditing}
          isLoading={editWatchlistState.length > 0}
          onClick={applyChanges}
          className={styles.approve}
        >
          Apply
        </Dialog.Approve>
      </Dialog.Actions>
    </Dialog>
  )
}

const mapStateToProps = state => ({
  watchlistUi: state.watchlistUi,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WatchlistCopyPopup)
