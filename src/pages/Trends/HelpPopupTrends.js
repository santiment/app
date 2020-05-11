import React from 'react'
import HelpPopup from './../../components/HelpPopup/HelpPopup'
import styles from './../../components/HelpPopup/HelpPopup.module.scss'

const HelpPopupTrends = () => (
  <HelpPopup>
    <h4 className={styles.title}>
      Specify your search results with these modifiers:
    </h4>
    <ul className={styles.list}>
      <li className={styles.item}>
        <code>btc moon</code> will search for the exact phrase
      </li>
      <li className={styles.item}>
        <code>btc AND moon</code> will search for comments including both{' '}
        <code>btc</code> and <code>moon</code>
      </li>
      <li className={styles.item}>
        <code>btc OR moon</code> will search for comments including either{' '}
        <code>btc</code> or <code>moon</code>
      </li>
      <li className={styles.item}>
        You can also combine modifiers by using brackets:
        <br />
        <code>(btc OR bitcoin) AND moon</code>
      </li>
    </ul>
  </HelpPopup>
)

export default HelpPopupTrends
