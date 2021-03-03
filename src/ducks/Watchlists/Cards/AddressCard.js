import React from 'react'
import Card from './Card'
import styles from './AddressCard.module.scss'

const AddressCard = props => {
  const { stats } = props.watchlist
  const { blockchainAddressesCount } = stats

  return (
    <Card
      {...props}
      classes={styles}
      middleChildren={
        blockchainAddressesCount ? (
          <>
            {blockchainAddressesCount}
            <div className={styles.address}>
              address{blockchainAddressesCount > 1 && 'es'}
            </div>
          </>
        ) : (
          <div className={styles.address}>No addresses</div>
        )
      }
    />
  )
}
AddressCard.defaultProps = {
  path: '/watchlist/addresses/'
}

export default AddressCard
