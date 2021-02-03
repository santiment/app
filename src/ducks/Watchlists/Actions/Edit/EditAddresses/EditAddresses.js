import React, { useMemo, useState, useEffect } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import Input from '@santiment-network/ui/Input'
import { useDialogState } from '../../../../../hooks/dialog'
import { updateWatchlistShort } from '../../../gql/mutations'
import { isEthStrictAddress } from '../../../../../utils/utils'
import EditableList, { rowAddressRenderer } from '../EditableList'
import { hasAddress } from '../../../utils'
import styles from './EditAddresses.module.scss'

const updateWatchlist = ({ id, listItems }) =>
  updateWatchlistShort({ id: +id, listItems })

export const NOT_VALID_ADDRESS = 'Not valid ETH address'

const extractAddress = ({ blockchainAddress }) =>
  blockchainAddress && blockchainAddress.address

const mapAddressToAPIType = (address, infrastructure = 'ETH') => {
  return {
    blockchainAddress: {
      address,
      infrastructure
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
      isInList ? listItems.filter(a => a !== item) : [item, ...listItems]
    )
  }

  const onInputChangeDebounced = ({ target: { value } }) => {
    const isValid = isEthStrictAddress(value)
    if (isValid && !items.find(x => x === value)) {
      toggle({
        item: value,
        isInList: hasAddress(items, value),
        listItems: items
      })

      setError(false)
    }

    if (value && !isValid) {
      setError(true)
    }
  }

  console.log('error', error)

  return (
    <Dialog
      title={`Add addresses to "${name}"`}
      trigger={trigger}
      onOpen={openDialog}
      onClose={closeDialog}
      open={isOpened}
    >
      <Dialog.ScrollContent className={styles.wrapper}>
        <Input
          autoFocus
          className={styles.input}
          placeholder='Enter your email'
          onChange={onInputChangeDebounced}
          errorText={NOT_VALID_ADDRESS}
          isError={!!error}
        />

        <div className={styles.contentWrapper}>
          <EditableList
            isContained={true}
            items={items}
            assetsListId={id}
            listItems={items}
            onToggle={toggle}
            rowRenderer={rowAddressRenderer}
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
