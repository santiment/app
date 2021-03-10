import React from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import { Infrastructure } from '../../../utils/address'
import AddToWatchlistDialog from '../../Watchlists/Actions/Add/Add'
import { useAddressWatchlists } from '../../Watchlists/gql/lists/hooks'
import { updateWatchlistShort } from '../../Watchlists/gql/list/mutations'
import styles from './index.module.scss'

const updateWatchlist = ({ id, listItems }) =>
  updateWatchlistShort({ id: +id, listItems })

const AddToWatchlist = ({ address, infrastructure }) => {
  function checkIsListItemTheAddress ({ blockchainAddress }) {
    return blockchainAddress.address === address
  }

  function checkIsSelected ({ listItems }) {
    return listItems.some(checkIsListItemTheAddress)
  }

  function onChangesApply (addToWatchlists, removeFromWatchlists) {
    const newListItem = {
      blockchainAddress: {
        address,
        infrastructure,
        __typename: 'BlockchainAddress'
      },
      __typename: 'ListItem'
    }

    removeFromWatchlists.forEach(({ listItems }) =>
      listItems.splice(listItems.findIndex(checkIsListItemTheAddress), 1)
    )

    addToWatchlists.forEach(({ listItems }) => listItems.push(newListItem))

    return Promise.all(
      addToWatchlists.concat(removeFromWatchlists).map(updateWatchlist)
    )
  }

  return (
    <AddToWatchlistDialog
      trigger={
        <Button
          className={styles.btn}
          disabled={infrastructure !== Infrastructure.ETH}
        >
          <Icon type='copy' className={styles.btn__icon} />
          Add to watchlist
        </Button>
      }
      getWatchlists={useAddressWatchlists}
      checkIsWatchlistSelected={checkIsSelected}
      onChangesApply={onChangesApply}
    />
  )
}

export default AddToWatchlist
