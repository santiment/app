import React from 'react'
import styles from './Enterprise.module.scss'
import Button from '@santiment-network/ui/Button'

const PayWithCrypto = () => (
  <div className={styles.wrapper}>
    <div className={styles.left}>
      <div className={styles.title}>Pay with crypto</div>
      <div className={styles.description}>
        You can burn SAN tokens or pay by DAI/ETH
      </div>
      <Button
        variant='fill'
        accent='positive'
        onClick={() =>
          window.Intercom &&
          window.Intercom('showNewMessage', 'Hello, I want to pay by crypto.')
        }
      >
        Contact us
      </Button>
    </div>
  </div>
)

export default PayWithCrypto
