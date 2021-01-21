import React from 'react'
import BloomberImg from './bloomberg.svg'
import ForbesImg from './forbes.svg'
import CoindeskImg from './coindesk.svg'
import CoinTelegraphImg from './cointelegraph.svg'
import CryptoBrImg from './crypto-briefing.svg'
import BitcoinImg from './bitcoin.svg'
import styles from './Companies.module.scss'

const Companies = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.line} />
        <div className={styles.title}>As referenced in major publications</div>
      </div>

      <div className={styles.list}>
        <img alt='bloomberg' src={BloomberImg} />
        <img alt='forbes' src={ForbesImg} />
        <img alt='coindesk' src={CoindeskImg} />
        <img alt='cointelegraph' src={CoinTelegraphImg} />
        <img alt='cryptobriefing' src={CryptoBrImg} />
        <img alt='bitcoin' src={BitcoinImg} />
      </div>
    </div>
  )
}

export default Companies
