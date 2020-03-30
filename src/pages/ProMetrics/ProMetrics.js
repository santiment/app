import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './ProMetrics.module.scss'
import { TYPES } from './utils.js'
import UpgradeBtn from '../../components/UpgradeBtn/UpgradeBtn'
import ProMetric from './ProMetric/ProMetric'

const ProMetrics = () => {
  return (
    <div className='page'>
      <div className={styles.descriptions}>
        <div className={styles.crown}>
          <Icon type='crown' /> PRO Metrics
        </div>

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
          at the{' '}
          <span className={styles.highline}>
            list of perks we offer to our Pro subscribers
          </span>
          , and see all of the benefits that come with being an insider on our
          platform!
        </div>

        <UpgradeBtn
          loginRequired={false}
          variant='fill'
          className={styles.upgradeBtn}
        >
          Upgrade
        </UpgradeBtn>

        <div className={cx(styles.description, styles.oneOf)}>
          One of these perks is access to our Sansheets plugin and the various
          templates we have built with it. This article will give you an
          overview of these templates.
        </div>
      </div>

      {TYPES.map((metric, index) => {
        return <ProMetric metric={metric} key={index} />
      })}
    </div>
  )
}

export default ProMetrics
