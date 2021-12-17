import React from 'react'
import { Link } from 'react-router-dom'
import { NFTINFLUENCERS_ANCHOR } from '../../Navigation/anchors'
import { Section, Container } from '../index'
import { PATHS } from '../../../../paths'
import styles from './index.module.scss'

const NftInfluencers = () => {
  return (
    <Section
      title='NFT Influencers Trx'
      id={NFTINFLUENCERS_ANCHOR}
      className={styles.section}
    >
      <div className={styles.topLink}>
        Start researching{' '}
        <Link to={PATHS.NFT_INFLUENCERS_TRX} className={styles.link}>
          NFT Influencers Trx
        </Link>
      </div>

      <Container></Container>
    </Section>
  )
}

export default NftInfluencers
