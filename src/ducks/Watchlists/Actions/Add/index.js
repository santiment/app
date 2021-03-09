import React, { useState } from 'react'
import { connect } from 'react-redux'
import Dialog from '@santiment-network/ui/Dialog'
import Button from '@santiment-network/ui/Button'
import {
  USER_ADD_ASSET_TO_LIST,
  USER_REMOVE_ASSET_FROM_LIST
} from '../../../../actions/types'
import { showNotification } from '../../../../actions/rootActions'
import Watchlists from '../../Templates/Watchlists'
import { hasAssetById } from '../../utils'
import LoginPopup from '../../../../components/banners/feature/PopupBanner'
import { useUserWatchlists } from '../../gql/hooks'
import { useUser } from '../../../../stores/user'
import styles from './index.module.scss'

const AddToListBtn = (
  <Button variant='fill' accent='positive' className={styles.btn}>
    Add to watchlists
  </Button>
)

const WatchlistPopup = ({
  trigger = AddToListBtn,
  applyChanges,
  setNotification,
  projectId,
  watchlistUi: { editableAssetsInList },
  dialogProps,
  ...props
}) => {
  const [changes, setChanges] = useState([])
  const [isShown, setIsShown] = useState(false)
  const [editableAssets, setEditableAssets] = useState(editableAssetsInList)
  const [watchlists = []] = useUserWatchlists()
  const { isLoggedIn } = useUser()

  if (!isLoggedIn) {
    return <LoginPopup>{trigger}</LoginPopup>
  }

  const lists = watchlists.sort(sortWatchlists).map(list => ({
    ...list,
    listItems: list.listItems.map(assets => assets.project)
  }))

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
      {...dialogProps}
    >
      <Dialog.ScrollContent withPadding className={styles.wrapper}>
        <Watchlists
          onWatchlistClick={watchlist => toggleAssetInList(watchlist)}
          lists={lists}
          projectId={projectId}
          {...props}
        />
      </Dialog.ScrollContent>
      <Dialog.Actions className={styles.actions}>
        <Dialog.Cancel onClick={close} type='cancel'>
          Cancel
        </Dialog.Cancel>
        <Dialog.Approve
          disabled={editableAssetsInList.length > 0 || changes.length === 0}
          isLoading={editableAssetsInList.length > 0}
          type='submit'
          onClick={add}
          className={styles.approve}
        >
          Apply
        </Dialog.Approve>
      </Dialog.Actions>
    </Dialog>
  )
}

const sortWatchlists = (
  { insertedAt: insertedList1 },
  { insertedAt: insertedList2 }
) => new Date(insertedList1) - new Date(insertedList2)

const mapStateToProps = state => ({
  watchlistUi: state.watchlistUi
})

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WatchlistPopup)
