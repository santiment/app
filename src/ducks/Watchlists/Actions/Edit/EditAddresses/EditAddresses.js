import React, { useMemo, useState, useEffect } from 'react'
import { Creatable } from 'react-select'
import Dialog from '@santiment-network/ui/Dialog'
import Select from '@santiment-network/ui/Search/Select/Select'
import { useDialogState } from '../../../../../hooks/dialog'
import { updateWatchlistShort } from '../../../gql/mutations'
import { isEthStrictAddress } from '../../../../../utils/utils'
import EditableList, { rowAddressRenderer } from '../EditableList'
import styles from './EditAddresses.module.scss'
import { hasAddress } from '../../../utils'

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

  return (
    <Dialog
      title={`Add addresses to "${name}"`}
      trigger={trigger}
      onOpen={openDialog}
      onClose={closeDialog}
      open={isOpened}
    >
      <Dialog.ScrollContent className={styles.wrapper}>
        <Select
          clearable={true}
          selectComponent={Creatable}
          multi={false}
          classNamePrefix='react-select'
          minimumInput={1}
          onChange={({ value }) => {
            const isValid = isEthStrictAddress(value)

            if (isValid && !items.find(x => x === value)) {
              toggle({
                item: value,
                isInList: hasAddress(items, value),
                listItems: items
              })
            }
          }}
          notificationText={NOT_VALID_ADDRESS}
          placeholder={'Wallet address'}
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
