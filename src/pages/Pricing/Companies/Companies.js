import React from 'react'
import CryptoBrImg from './cb.png'
import ForbesImg from './forbes.png'
import BitcoinImg from './bitcoin.png'
import Newyorker from './new-yorker.png'
import CoindeskImg from './coindesk.png'
import BloomberImg from './bloomberg.png'
import CoinTelegraphImg from './cointelegraph.png'
import styles from './Companies.module.scss'

const Companies = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.line} />
        <div className={styles.title}>As referenced in major publications</div>
      </div>

      <div className={styles.list}>
        <div className={styles.row}>
          <img alt='bloomberg' src={BloomberImg} width='260' />
          <img alt='forbes' src={ForbesImg} width='176' />
          <img alt='coindesk' src={CoindeskImg} width='226' />
        </div>
        <div className={styles.row}>
          <img alt='cointelegraph' src={CoinTelegraphImg} width='258' />
          <img alt='cryptobriefing' src={CryptoBrImg} width='163' />
          <img alt='newyorker' src={Newyorker} width='195' />
          <img alt='bitcoin' src={BitcoinImg} width='255' />
        </div>
      </div>
    </div>
  )
}

export default Companies
