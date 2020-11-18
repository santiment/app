import React from 'react'
import Button from '@santiment-network/ui/Button'
import tokensSvg from './tokens.svg'
import styles from './PayWithCrypto.module.scss'

const PayWithCrypto = () => (
  <div className={styles.wrapper}>
    <img src={tokensSvg} className={styles.tokensImg} alt='Tokens' />
    <div className={styles.info}>
      <div className={styles.title}>Pay with crypto</div>
      <a
        className={styles.description}
        rel='noopener noreferrer'
        target='_blank'
        href='https://academy.santiment.net/products-and-plans/how-to-pay-with-crypto/'
      >
        Burn SAN tokens or pay with DAI / ETH
      </a>
      <Button
        variant='ghost'
        className={styles.contactBtn}
        onClick={() =>
          window.Intercom &&
          window.Intercom('showNewMessage', 'Hello, I want to pay by crypto.')
        }
      >
        Contact sales
      </Button>
    </div>
  </div>
)

export default PayWithCrypto
