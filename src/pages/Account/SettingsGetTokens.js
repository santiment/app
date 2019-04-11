import React from 'react'
import Settings from './Settings'
import BancorWidget from '../../components/BancorWidget/BancorWidget'
import styles from './AccountPage.module.scss'

const SettingsGetTokens = () => (
  <Settings id='get-tokens' header='Get tokens'>
    <Settings.Row style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
      Get SAN tokens
      <BancorWidget className={styles.bancor} />
      <div className={styles.tokens__markets}>
        <a
          className={styles.tokens__market}
          href='https://www.bitfinex.com/'
          rel='noopener noreferrer'
          target='_blank'
        >
          Bitfinex
        </a>
        <a
          className={styles.tokens__market}
          href='https://liqui.io/#/exchange/SAN_ETH'
          rel='noopener noreferrer'
          target='_blank'
        >
          Liqui
        </a>
        <a
          className={styles.tokens__market}
          href='https://www.okex.com/'
          rel='noopener noreferrer'
          target='_blank'
        >
          OKeX
        </a>
        <a
          className={styles.tokens__market}
          href='https://hitbtc.com/'
          rel='noopener noreferrer'
          target='_blank'
        >
          HitBTC
        </a>
      </div>
    </Settings.Row>
  </Settings>
)

export default SettingsGetTokens
