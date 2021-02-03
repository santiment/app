import React, { useMemo, useState, useEffect } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import Input from '@santiment-network/ui/Input'
import Button from '@santiment-network/ui/Button'
import { useDialogState } from '../../../../../hooks/dialog'
import { updateWatchlistShort } from '../../../gql/mutations'
import EditableList, { rowAddressRenderer } from '../EditableList'
import { hasAddress } from '../../../utils'
import { getAddressInfrastructure } from '../../../../../utils/address'
import styles from './EditAddresses.module.scss'

const updateWatchlist = ({ id, listItems }) =>
  updateWatchlistShort({ id: +id, listItems })

export const NOT_VALID_ADDRESS = 'Not supported address'

const extractAddress = ({ blockchainAddress }) => blockchainAddress

const mapAddressToAPIType = ({ address, infrastructure }) => {
  return {
    blockchainAddress: {
      address,
      infrastructure: infrastructure || getAddressInfrastructure(address)
    }
  }
}

const EditAddresses = ({ trigger, watchlist }) => {
  const { id, name } = watchlist

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
    debugger
    setItems(
      isInList
        ? listItems.filter(a => a.address !== item.address)
        : [item, ...listItems]
    )
  }

  function onAdd () {
    const newItem = {
      address: currentAddress,
      infrastructure: getAddressInfrastructure(currentAddress)
    }

    toggle({
      item: newItem,
      isInList: hasAddress(items, newItem),
      listItems: items
    })
  }

  const onInputChangeDebounced = ({ target: { value } }) => {
    const isValid = getAddressInfrastructure(value)
    if (isValid && !items.find(x => x === value)) {
      setCurrentValue(value)
    }

    setError(!value || !isValid)
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
              errorText={error && NOT_VALID_ADDRESS}
              isError={!!error}
            />
          </div>

          <Button
            variant='fill'
            className={styles.addBtn}
            accent='positive'
            disabled={error}
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
