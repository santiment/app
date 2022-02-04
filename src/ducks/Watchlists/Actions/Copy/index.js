import React, { useState } from 'react'
import { connect } from 'react-redux'
import Dialog from '@santiment-network/ui/Dialog'
import { USER_EDIT_ASSETS_IN_LIST } from '../../../../actions/types'
import { sortByAsDates } from '../../../../utils/sortMethods'
import { showNotification } from '../../../../actions/rootActions'
import Watchlists from '../../Templates/Watchlists'
import AssetsList from './AssetsList'
import { useUser } from '../../../../stores/user/index'
import LoginPopup from '../../../../components/banners/feature/PopupBanner'
import { useUserWatchlists } from '../../gql/lists/hooks'
import { BLOCKCHAIN_ADDRESS } from '../../detector'
import { mapAddressToAPIType } from '../../../../ducks/Watchlists/utils'
import { useAddWatchlistItems } from '../../../../ducks/Watchlists/Widgets/Table/CompareInfo/Actions/hooks'
import styles from './index.module.scss'

const WatchlistCopyPopup = ({
  assets = [],
  trigger,
  watchlistUi: { editableWatchlists },
  id: currentId,
  sendChanges,
  setNotification,
  checkedAssets = new Set(),
  type
}) => {
  const { isLoggedIn } = useUser()
  const [watchlists, isWatchlistsLoading] = useUserWatchlists(type)
  const [isShown, setIsShown] = useState(false)
  const [isEditing, setEditing] = useState(false)
  const [warning, setWarning] = useState(false)
  const [assetsToCopy, setAssetsToCopy] = useState()
  const [watchlistsToCopy, setWatchlistsToCopy] = useState(new Set())
  const [editWatchlistState, setEditWatchlistState] = useState(
    editableWatchlists
  )
  const { addWatchlistItems } = useAddWatchlistItems()

  if (!isLoggedIn) return <LoginPopup>{trigger}</LoginPopup>

  const close = () => {
    setWatchlistsToCopy(new Set())
    setAssetsToCopy(new Set())
    setEditing(false)
    setIsShown(false)
    window.dispatchEvent(
      new CustomEvent('panelVisibilityChange', { detail: 'show' })
    )
  }

  const open = () => {
    setIsShown(true)
    setAssetsToCopy(checkedAssets)
    window.dispatchEvent(
      new CustomEvent('panelVisibilityChange', { detail: 'hide' })
    )
  }

  const normalizeListItems = items =>
    items ? items.map(({ project: { id } }) => id) : []

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
        const changes = {
          assetsListId,
          currentId,
          listItems: [...list.listItems, ...remainingAssets].map(id => ({
            id
          }))
        }
        if (type === BLOCKCHAIN_ADDRESS) {
          const listItems = assets
            .filter(asset =>
              remainingAssets.includes(asset.blockchainAddress.address)
            )
            .map(({ blockchainAddress }) =>
              mapAddressToAPIType(blockchainAddress)
            )
          addWatchlistItems({
            variables: {
              id: +assetsListId,
              listItems
            }
          }).then(() => {
            setNotification({
              description: 'Copying completed successfully',
              title: 'Success',
              variant: 'success'
            })
            close()
          })
        } else {
          sendChanges(changes)
        }
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
          <AssetsList
            items={assets}
            selectedItems={assetsToCopy}
            onToggleAsset={onAssetClick}
            classes={{ list: styles.wrapperList, asset: styles.asset }}
            withSearch
            type={type}
          />
        </div>
        <div className={styles.watchlistsWrapper}>
          <div className={styles.header}>Choose watchlist below</div>
          <Watchlists
            onWatchlistClick={onWatchlistClick}
            className={styles.wrapperList}
            classes={{ list: styles.watchlists }}
            lists={lists}
            withNewButton={false}
            loading={isWatchlistsLoading}
          />
        </div>
      </Dialog.ScrollContent>
      {warning && (
        <div className={styles.warning}>
          All selected watchlists already contained all selected assets
        </div>
      )}
      <Dialog.Actions className={styles.actions}>
        <Dialog.Approve
          disabled={editWatchlistState.length > 0 || !isEditing}
          isLoading={editWatchlistState.length > 0}
          onClick={applyChanges}
          className={styles.approve}
        >
          Copy assets
        </Dialog.Approve>
        <Dialog.Cancel onClick={close}>Cancel</Dialog.Cancel>
      </Dialog.Actions>
    </Dialog>
  )
}

const mapStateToProps = state => ({
  watchlistUi: state.watchlistUi
})

const mapDispatchToProps = dispatch => ({
  sendChanges: ({ assetsListId, listItems, currentId }) =>
    dispatch({
      type: USER_EDIT_ASSETS_IN_LIST,
      payload: { assetsListId, listItems, currentId }
    }),
  setNotification: message => dispatch(showNotification(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistCopyPopup)
