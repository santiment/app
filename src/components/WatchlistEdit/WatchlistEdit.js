import React, { useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { AutoSizer, List } from 'react-virtualized'
import { Button, Dialog, Icon, Label } from '@santiment-network/ui'
import { showNotification } from '../../actions/rootActions'
import { USER_EDIT_ASSETS_IN_LIST } from '../../actions/types'
import { allProjectsForSearchGQL } from '../../pages/Projects/allProjectsGQL'
import { hasAssetById } from '../WatchlistPopup/WatchlistsPopup'
import SearchProjects from '../Search/SearchProjects'
import styles from './WatchlistEdit.module.scss'

const WatchlistEdit = ({
  assets,
  trigger,
  name,
  watchlistUi: { isEditWatchlist },
  data: { allProjects },
  id,
  sendChanges,
  setNotification
}) => {
  const [isShown, setIsShown] = useState(false)
  const [isEditing, setEditing] = useState(false)
  const [listItems, setListItems] = useState(assets)
  const [editWatchlistState, setEditWatchlistState] = useState(isEditWatchlist)

  const close = () => {
    setEditing(false)
    setIsShown(false)
  }

  const open = () => setIsShown(true)

  const applyChanges = () => sendChanges({ listItems, assetsListId: id })

  const toggleAsset = ({ project, listItems, isAssetInList }) => {
    if (!isEditing) setEditing(true)
    setListItems(
      isAssetInList
        ? listItems.filter(({ id }) => id !== project.id)
        : [...listItems, project]
    )
  }

  if (isEditWatchlist !== editWatchlistState) {
    setEditWatchlistState(isEditWatchlist)
    if (!isEditWatchlist) {
      setNotification('Watchlist was modified')
      close()
    }
  }

  if (!isEditing && assets !== listItems) setListItems(assets)

  return (
    <Dialog
      title={`Edit "${name}"`}
      trigger={trigger}
      onOpen={open}
      onClose={close}
      open={isShown}
      showCloseBtn={false}
    >
      <Dialog.ScrollContent className={styles.wrapper}>
        <SearchProjects
          watchlistItems={listItems}
          isEditingWatchlist={true}
          className={styles.search}
          onSuggestionSelect={project =>
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
          <AssetsList
            isContained={true}
            items={listItems}
            assetsListId={id}
            listItems={listItems}
            onToggleProject={toggleAsset}
          />
          <Label accent='waterloo' className={styles.heading}>
            Add more assets
          </Label>
          <AssetsList
            items={allProjects}
            assetsListId={id}
            listItems={listItems}
            onToggleProject={toggleAsset}
          />
        </div>
      </Dialog.ScrollContent>
      <Dialog.Actions className={styles.actions}>
        <Dialog.Cancel border={false} accent='grey' onClick={close}>
          Cancel
        </Dialog.Cancel>
        <Dialog.Approve
          disabled={editWatchlistState || !isEditing}
          variant='flat'
          onClick={applyChanges}
        >
          {editWatchlistState ? 'Applying...' : 'Apply'}
        </Dialog.Approve>
      </Dialog.Actions>
    </Dialog>
  )
}

const ROW_HEIGHT = 32

const AssetsList = ({ items, listItems, isContained, onToggleProject }) => {
  const rowRenderer = ({ key, index, style }) => {
    const { name, ticker, id } = items[index]
    const isAssetInList = hasAssetById({ listItems, id })
    return (
      <div key={key} className={styles.project} style={style}>
        <div>
          <Label className={styles.name}>{name}</Label>
          <Label accent='waterloo'>({ticker})</Label>
        </div>
        <Button
          className={styles.actionBtn}
          accent={isContained ? 'grey' : 'positive'}
          disabled={isContained ? false : isAssetInList}
          onClick={() =>
            onToggleProject({
              project: items[index],
              listItems,
              isAssetInList
            })
          }
        >
          <Icon type={isContained ? 'remove' : 'plus-round'} />
        </Button>
      </div>
    )
  }

  const wrapperStyles = {
    height: items.length > 4 ? '145px' : `${32 * items.length}px`,
    paddingRight: items.length > 4 ? '0' : `5px`
  }

  return (
    <div style={wrapperStyles} className={styles.wrapperList}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowHeight={ROW_HEIGHT}
            rowCount={items.length}
            overscanRowCount={5}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    </div>
  )
}

const mapStateToProps = ({ watchlistUi }) => ({ watchlistUi })

const mapDispatchToProps = dispatch => ({
  sendChanges: ({ assetsListId, listItems }) =>
    dispatch({
      type: USER_EDIT_ASSETS_IN_LIST,
      payload: { assetsListId, listItems }
    }),
  setNotification: message => dispatch(showNotification(message))
})

export default compose(
  graphql(allProjectsForSearchGQL, {
    options: () => ({ context: { isRetriable: true } })
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(WatchlistEdit)
