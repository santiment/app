import React, { useMemo } from 'react'
import URLExtension from './URLExtension'
import HistoricalBalance from '../../ducks/_HistoricalBalance'
import { parseUrl } from '../../ducks/_HistoricalBalance/url'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import HelpPopup from '../../components/HelpPopup/HelpPopup'
import styles from './index.module.scss'

const MOBILE_CLASSES = {
  wrapper: styles.mobile__title,
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

const HistoricalBalancePage = ({ history, isDesktop }) => {
  const { settings, chartAssets, priceAssets } = useMemo(
    () => parseUrl(window.location.search),
    [],
  )

  return (
    <div className={'page'}>
      <ResponsiveTitle isDesktop={isDesktop} />
      <HistoricalBalance
        defaultSettings={settings}
        defaultChartAssets={chartAssets}
        defaultPriceAssets={priceAssets}
      >
        <URLExtension history={history}></URLExtension>
      </HistoricalBalance>
    </div>
  )
}

export default HistoricalBalancePage
