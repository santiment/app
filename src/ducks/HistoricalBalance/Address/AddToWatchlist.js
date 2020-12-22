import React, { useCallback } from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import AddToWatchlistDialog from '../../Watchlists/Actions/Add/Add'
import { useAddressWatchlists } from '../../Watchlists/gql/queries'
import { Infrastructure } from '../../../utils/address'
import styles from './index.module.scss'

const AddToWatchlist = ({ settings }) => {
  const { address, infrastructure } = settings
  const checkIsSelected = useCallback(
    ({ listItems }) =>
      listItems.some(
        ({ blockchainAddress }) => blockchainAddress.address === address
      ),
    [address]
  )

  return (
    <AddToWatchlistDialog
      trigger={
        <Button
          className={styles.btn}
          disabled={infrastructure !== Infrastructure.ETH}
        >
          <Icon type='copy' className={styles.btn__icon} />
          Add to Watchlist
        </Button>
      }
      getWatchlists={useAddressWatchlists}
      createWatchlist={console.log}
      checkIsWatchlistSelected={checkIsSelected}
      onChangesApply={console.log}
    />
  )
}

export default AddToWatchlist
