import React, { useMemo, useState, useEffect } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import Input from '@santiment-network/ui/Input'
import Button from '@santiment-network/ui/Button'
import { useDialogState } from '../../../../../hooks/dialog'
import EditableList, { rowAddressRenderer } from '../EditableList'
import { hasAddress } from '../../../utils'
import {
  getAddressInfrastructure,
  Infrastructure
} from '../../../../../utils/address'
import { useIsAuthor } from '../../../gql/list/hooks'
import { updateWatchlistShort } from '../../../gql/list/mutations'
import { useAddressNote } from '../../../../HistoricalBalance/hooks'
import styles from './EditAddresses.module.scss'

const updateWatchlist = ({ id, listItems }) =>
  updateWatchlistShort({ id: +id, listItems })

export const NOT_VALID_ADDRESS = 'Not supported ETH address'
export const ALREADY_ADDED_ADDRESS = 'This address is already in this watchlist'

const extractAddress = ({ blockchainAddress }) => blockchainAddress

const mapAddressToAPIType = ({ address, infrastructure, notes }) => {
  return {
    blockchainAddress: {
      address,
      infrastructure: infrastructure || getAddressInfrastructure(address),
      notes
    }
  }
}

const EditAddresses = ({ trigger, watchlist }) => {
  const { id, name } = watchlist
  const { isAuthor } = useIsAuthor(watchlist)

  const listItems = useMemo(
    () => {
      return watchlist.listItems.map(extractAddress)
    },
    [watchlist]
  )

  const { isOpened, openDialog, closeDialog } = useDialogState()

  const [items, setItems] = useState(listItems)
  const [error, setError] = useState(false)
  const [currentAddress, setCurrentValue] = useState('')
  const infrastructure = getAddressInfrastructure(currentAddress)
  const notes = useAddressNote({ address: currentAddress, infrastructure })

  useEffect(
    () => {
      setItems(listItems)
    },
    [listItems]
  )

  function apply () {
    updateWatchlist({
      id,
      listItems: items.map(a => mapAddressToAPIType(a))
    }).then(() => {
      closeDialog()
    })
  }

  const toggle = ({ item, listItems, isInList }) => {
    setItems(
      isInList
        ? listItems.filter(a => a.address !== item.address)
        : [item, ...listItems]
    )
  }

  function onAdd () {
    const newItem = {
      notes,
      infrastructure,
      address: currentAddress
    }

    toggle({
      item: newItem,
      isInList: hasAddress(items, newItem),
      listItems: items
    })
  }

  function isAdded (address) {
    return watchlist.listItems.some(
      item =>
        item.blockchainAddress && item.blockchainAddress.address === address
    )
  }

  const onInputChangeDebounced = ({ target: { value } }) => {
    const infrastructure = getAddressInfrastructure(value)

    const valid =
      infrastructure && infrastructure === Infrastructure.ETH && !isAdded(value)

    setCurrentValue(value)

    setError(!value || !valid)
  }

  const errorText = useMemo(
    () => {
      if (!error) {
        return
      }

      if (isAdded(currentAddress)) {
        return ALREADY_ADDED_ADDRESS
      }

      return NOT_VALID_ADDRESS
    },
    [error, currentAddress]
  )

  if (!isAuthor) {
    return null
  }

  return (
    <Dialog
      title={`Add addresses to "${name}"`}
      trigger={trigger}
      onOpen={openDialog}
      onClose={closeDialog}
      open={isOpened}
    >
      <Dialog.ScrollContent className={styles.wrapper}>
        <div className={styles.search}>
          <div className={styles.inputContainer}>
            <Input
              autoFocus
              className={styles.input}
              placeholder='Wallet address'
              onChange={onInputChangeDebounced}
              errorText={errorText}
              isError={!!error}
            />
          </div>

          <Button
            variant='fill'
            className={styles.addBtn}
            accent='positive'
            disabled={error || errorText}
            onClick={onAdd}
          >
            Add
          </Button>
        </div>

        <div className={styles.contentWrapper}>
          <EditableList
            isContained={true}
            items={items}
            assetsListId={id}
            listItems={items}
            onToggle={toggle}
            rowRenderer={rowAddressRenderer}
            height={320}
            rowHeight={64}
          />
        </div>
      </Dialog.ScrollContent>

      <Dialog.Actions className={styles.actions}>
        <Dialog.Cancel onClick={closeDialog}>Cancel</Dialog.Cancel>
        <Dialog.Approve
          onClick={apply}
          className={styles.approve}
          disabled={items.length === 0}
        >
          Apply
        </Dialog.Approve>
      </Dialog.Actions>
    </Dialog>
  )
}

export default EditAddresses
