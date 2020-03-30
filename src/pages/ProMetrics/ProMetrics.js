import React from 'react'
import styles from './ProMetrics.module.scss'
import UpgradeBtn from '../../components/UpgradeBtn/UpgradeBtn'

const ProMetrics = () => {
  return (
    <div class='page'>
      <div className={styles.descriptions}>
        <div className={styles.perksTitle}>
          The Perks of Being a Pro Subscriber on Sanbase
        </div>

        <div className={styles.description}>
          As most of you know, Sanbase is a free to use platform to do research
          and study on-chain and behavioral analytics on the crypto markets.
        </div>

        <div className={styles.description}>
          However, there is a paid version, known as “Pro”, that unlocks many
          doors and models that our free users are unable to access. Take a look
          at the list of perks we offer to our Pro subscribers, and see all of
          the benefits that come with being an insider on our platform!
        </div>

        <div className={styles.description}>
          One of these perks is access to our Sansheets plugin and the various
          templates we have built with it. This article will give you an
          overview of these templates.
        </div>

        <UpgradeBtn
          loginRequired={false}
          variant='fill'
          className={styles.upgradeBtn}
        >
          Upgrade
        </UpgradeBtn>
      </div>
    </div>
  )
}

export default ProMetrics
