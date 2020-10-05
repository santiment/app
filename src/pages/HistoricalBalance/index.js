import React from 'react'
import cx from 'classnames'
import HistoricalBalance from '../../ducks/_HistoricalBalance'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import HelpPopup from '../../components/HelpPopup/HelpPopup'
import styles from './index.module.scss'

const MOBILE_CLASSES = {
  wrapper: styles.mobile__title
}

const Title = () => (
  <>
    Historical Balance
    <HelpPopup triggerClassName={styles.help}>
      Enter any ERC-20 wallet's address and choose up to 5 assets for a detailed
      breakdown of the wallet's balance over time.
    </HelpPopup>
  </>
)

const ResponsiveTitle = ({ isDesktop = true }) =>
  isDesktop ? (
    <h1 className={styles.title}>
      <Title></Title>
    </h1>
  ) : (
    <MobileHeader title={<Title />} classes={MOBILE_CLASSES} />
  )

const HistoricalBalancePage = ({ isDesktop }) => (
  <div className={'page'}>
    <ResponsiveTitle isDesktop={isDesktop} />
    <HistoricalBalance></HistoricalBalance>
  </div>
)

export default HistoricalBalancePage
