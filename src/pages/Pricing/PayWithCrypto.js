import React from 'react'
import styles from './Enterprise.module.scss'
import Button from '@santiment-network/ui/Button'

const PayWithCrypto = () => (
  <div className={styles.wrapper}>
    <div className={styles.left}>
      <div className={styles.title}>Pay with crypto</div>
      <div className={styles.description}>
        You can burn SAN tokens or pay by DAI/ETH
        <Button
          variant='ghost'
          accent='positive'
          as='a'
          rel='noopener noreferrer'
          target='_blank'
          href='https://academy.santiment.net/products-and-plans/how-to-pay-with-crypto/'
        >
          Learn more
        </Button>
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
