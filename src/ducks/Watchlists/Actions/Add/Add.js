import React, { useState, useEffect } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import Loader from '@santiment-network/ui/Loader/Loader'
import NewWatchlist from '../New'
import NewBtn from '../New/NewBtn'
import { store } from '../../../../redux'
import { VisibilityIndicator } from '../../../../components/VisibilityIndicator'
import { showNotification } from '../../../../actions/rootActions'
import styles from './Add.module.scss'

const Watchlist = ({ watchlist, isActive, onClick }) => {
  const { name, isPublic } = watchlist
  return (
    <div className={styles.watchlist} onClick={() => onClick(watchlist)}>
      <Checkbox className={styles.checkbox} isActive={isActive} />
      {name}
      <VisibilityIndicator className={styles.publicity} isPublic={isPublic} />
    </div>
  )
}

const Watchlists = ({
  selections,
  onLoaded,
  onWatchlistClick,
  getWatchlists
}) => {
  const { watchlists, isLoading } = getWatchlists()

  useEffect(
    () => {
      if (!isLoading) onLoaded(watchlists)
    },
    [isLoading]
  )

  return (
    <>
      <div className={styles.watchlists}>
        {isLoading && <Loader className={styles.loader} />}
        {isLoading || watchlists.length
          ? watchlists.map(watchlist => (
            <Watchlist
              key={watchlist.id}
              watchlist={watchlist}
              isActive={selections.has(watchlist)}
              onClick={onWatchlistClick}
            />
          ))
          : "You don't have any watchlists yet."}
      </div>

      <NewWatchlist
        openOnSuccess={false}
        trigger={<NewBtn border disabled={isLoading} className={styles.new} />}
        lists={watchlists}
      />
    </>
  )
}

const SET = new Set()
const AddToWatchlistDialog = ({
  title = 'Add to watchlist',
  trigger,
  getWatchlists,
  checkIsWatchlistSelected,
  onChangesApply
}) => {
  const [isOpened, setIsOpened] = useState(false)
  const [initialSelections, setInitialSelections] = useState(SET)
  const [selections, setSelections] = useState(SET)
  const [isWithoutChanges, setIsWithoutChanges] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  function openDialog () {
    setIsOpened(true)
  }
  function closeDialog () {
    setIsOpened(false)
  }

  function onWatchlistsLoaded (watchlists) {
    const watchlistsSet = new Set(watchlists.filter(checkIsWatchlistSelected))
    setInitialSelections(watchlistsSet)
    setSelections(watchlistsSet)
  }

  function toggleWatchlist (watchlist) {
    const newSelections = new Set(selections)
    let isWithoutChanges = true

    if (newSelections.has(watchlist)) {
      newSelections.delete(watchlist)
    } else {
      newSelections.add(watchlist)
    }

    if (newSelections.size !== initialSelections.size) {
      isWithoutChanges = false
    } else {
      const newSelectionsArray = [...newSelections]
      for (let i = 0; i < newSelectionsArray.length; i++) {
        if (!initialSelections.has(newSelectionsArray[i])) {
          isWithoutChanges = false
          break
        }
      }
    }

    setIsWithoutChanges(isWithoutChanges)
    setSelections(newSelections)
  }

  function applyChanges () {
    const removedFromSet = new Set(initialSelections)
    const addedToSet = new Set(selections)

    removedFromSet.forEach(watchlist => {
      if (addedToSet.has(watchlist)) {
        addedToSet.delete(watchlist)
        removedFromSet.delete(watchlist)
      }
    })

    const amountModified = addedToSet.size + removedFromSet.size

    setIsLoading(true)
    onChangesApply([...addedToSet], [...removedFromSet]).then(() => {
      setIsLoading(false)
      setIsOpened(false)
      store.dispatch(
        showNotification(
          `${amountModified} watchlist${
            amountModified > 1 ? 's were' : ' was'
          } modified`
        )
      )
    })
  }

  return (
    <Dialog
      open={isOpened}
      title={title}
      trigger={trigger}
      onOpen={openDialog}
      onClose={closeDialog}
    >
      <Dialog.ScrollContent withPadding className={styles.wrapper}>
        <Watchlists
          selections={selections}
          getWatchlists={getWatchlists}
          onWatchlistClick={toggleWatchlist}
          onLoaded={onWatchlistsLoaded}
        />
      </Dialog.ScrollContent>
      <Dialog.Actions className={styles.actions}>
        <Dialog.Cancel onClick={closeDialog}>Cancel</Dialog.Cancel>
        <Dialog.Approve
          className={styles.approve}
          disabled={isLoading || isWithoutChanges}
          isLoading={isLoading}
          onClick={applyChanges}
        >
          Apply
        </Dialog.Approve>
      </Dialog.Actions>
    </Dialog>
  )
}

export default AddToWatchlistDialog
