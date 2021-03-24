import React, { useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { Dialog, Label } from '@santiment-network/ui'
import { showNotification } from '../../../../actions/rootActions'
import { USER_EDIT_ASSETS_IN_LIST } from '../../../../actions/types'
import { ALL_PROJECTS_FOR_SEARCH_QUERY } from '../../gql/allProjectsGQL'
import EditableList from './EditableList'
import { hasAssetById } from '../../utils'
import { useIsAuthor } from '../../gql/list/hooks'
import SearchProjects from '../../../../components/Search/SearchProjects'
import styles from './EditAssets.module.scss'

const WatchlistEdit = ({
  assets,
  trigger,
  name,
  watchlistUi: { editableWatchlists },
  data: { allProjects },
  id,
  sendChanges,
  watchlist,
  setNotification
}) => {
  const { isAuthor } = useIsAuthor(watchlist)
  const [isShown, setIsShown] = useState(false)
  const [isEditing, setEditing] = useState(false)
  const [listItems, setListItems] = useState(assets)
  const [editWatchlistState, setEditWatchlistState] = useState(
    editableWatchlists
  )

  const close = () => {
    setEditing(false)
    setIsShown(false)
  }

  const open = () => setIsShown(true)

  const applyChanges = () => {
    sendChanges({ listItems, assetsListId: id })
  }

  const toggleAsset = ({ project, listItems, isAssetInList }) => {
    if (!isEditing) setEditing(true)
    setListItems(
      isAssetInList
        ? listItems.filter(({ id }) => id !== project.id)
        : [...listItems, project]
    )
  }

  if (editableWatchlists.length !== editWatchlistState.length) {
    setEditWatchlistState(editableWatchlists)
    if (editableWatchlists.length === 0 && isShown) {
      setNotification(`"${name}" was modified`)
      close()
    }
  }

  if (!isEditing && assets !== listItems) setListItems(assets)

  if (!isAuthor) {
    return null
  }

  return (
    <Dialog
      title={`Edit "${name}"`}
      trigger={trigger}
      onOpen={open}
      onClose={close}
      open={isShown}
    >
      <Dialog.ScrollContent className={styles.wrapper}>
        <SearchProjects
          noTrends
          watchlistItems={listItems}
          isEditingWatchlist={true}
          className={styles.search}
          onSuggestionSelect={({ item: project }) =>
            toggleAsset({
              project,
              listItems,
              isAssetInList: hasAssetById({ listItems, id: project.id })
            })
          }
        />
        <div className={styles.contentWrapper}>
          <Label accent='waterloo' className={styles.heading}>
            Contained in watchlist
          </Label>
          <EditableList
            isContained={true}
            items={listItems}
            assetsListId={id}
            listItems={listItems}
            onToggle={toggleAsset}
          />
          <Label accent='waterloo' className={styles.heading}>
            Add more assets
          </Label>
          <EditableList
            items={allProjects}
            assetsListId={id}
            listItems={listItems}
            onToggle={toggleAsset}
          />
        </div>
      </Dialog.ScrollContent>
      <Dialog.Actions className={styles.actions}>
        <Dialog.Cancel onClick={close}>Cancel</Dialog.Cancel>
        <Dialog.Approve
          disabled={editWatchlistState.length > 0 || !isEditing}
          onClick={applyChanges}
          isLoading={editWatchlistState.length > 0}
          className={styles.approve}
        >
          Apply
        </Dialog.Approve>
      </Dialog.Actions>
    </Dialog>
  )
}

const mapStateToProps = ({ watchlistUi }) => ({ watchlistUi })

const mapDispatchToProps = dispatch => ({
  sendChanges: ({ assetsListId, listItems }) =>
    dispatch({
      type: USER_EDIT_ASSETS_IN_LIST,
      payload: { assetsListId, listItems, currentId: assetsListId }
    }),
  setNotification: message => dispatch(showNotification(message))
})

export default compose(
  graphql(ALL_PROJECTS_FOR_SEARCH_QUERY, {
    options: () => ({
      context: { isRetriable: true },
      variables: { minVolume: 0 }
    })
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(WatchlistEdit)
