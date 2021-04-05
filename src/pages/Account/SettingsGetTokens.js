import React from 'react'
import Settings from './Settings'
import BancorWidget from '../../components/BancorWidget/BancorWidget'
import bancorLogo from './../../assets/bancor.svg'
import styles from './AccountPage.module.scss'

const SettingsGetTokens = () => (
  <Settings id='get-tokens' header='Get tokens'>
    <Settings.Row
      style={{
        flexDirection: 'column',
        alignItems: 'flex-start',
        position: 'relative'
      }}
    >
      <span className={styles.getTokens}>Get SAN tokens</span>
      <img className={styles.bancorLogo} src={bancorLogo} alt='bancor_logo' />
      <BancorWidget className={styles.bancor} />
      <div className={styles.tokens__markets}>
        <a
          className={styles.tokens__market}
          href='https://kyberswap.com/swap/eth-san'
          rel='noopener noreferrer'
          target='_blank'
        >
          Kyber
        </a>
        <a
          className={styles.tokens__market}
          href='https://app.uniswap.org/#/swap?outputCurrency=0x7c5a0ce9267ed19b22f8cae653f198e3e8daf098'
          rel='noopener noreferrer'
          target='_blank'
        >
          Uniswap
        </a>
        <a
          className={styles.tokens__market}
          href='https://www.bitfinex.com/t/SANUSD'
          rel='noopener noreferrer'
          target='_blank'
        >
          Bitfinex
        </a>
        <a
          className={styles.tokens__market}
          href='https://1inch.exchange/#/ETH/SAN'
          rel='noopener noreferrer'
          target='_blank'
        >
          1inch
        </a>
      </div>
    </Settings.Row>
  </Settings>
)

export default SettingsGetTokens
