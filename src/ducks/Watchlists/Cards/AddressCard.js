import React from 'react'
import Card from './Card'
import styles from './AddressCard.module.scss'

const AddressCard = (props) => {
  const { listItems } = props.watchlist

  const addressesCount = listItems.length

  return (
    <Card
      {...props}
      classes={styles}
      middleChildren={
        addressesCount ? (
          <>
            {addressesCount}
            <div className={styles.address}>address{addressesCount > 1 && 'es'}</div>
          </>
        ) : (
          <div className={styles.address}>No addresses</div>
        )
      }
    />
  )
}
AddressCard.defaultProps = {
  path: '/watchlist/addresses/',
}

export default AddressCard
