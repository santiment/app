import React, { useMemo } from 'react'
import cx from 'classnames'
import URLExtension from './URLExtension'
import { useUser } from '../../stores/user'
import Page from '../../ducks/Page'
import HistoricalBalance from '../../ducks/HistoricalBalance'
import { parseUrl } from '../../ducks/HistoricalBalance/url'
import HelpPopup from '../../components/HelpPopup/HelpPopup'
import PageLoader from '../../components/Loader/PageLoader'
import { LoginWarning } from '../../components/banners/feature/PopupBanner'
import styles from './index.module.scss'

const Help = () => (
  <HelpPopup>
    Enter any ERC-20 or BTC wallet's address and choose up to 5 assets for a detailed breakdown of
    the wallet's balance over time.
  </HelpPopup>
)

export const Title = () => (
  <>
    <span style={{ marginRight: '6px' }}>Historical balance</span>
    <Help />
  </>
)

const HistoricalBalancePage = ({ history }) => {
  const { loading, isLoggedIn } = useUser()
  const { settings, chartAssets, priceAssets, isLog } = useMemo(
    () => parseUrl(isLoggedIn ? window.location.search : ''),
    [isLoggedIn],
  )

  if (loading) {
    return <PageLoader />
  }

  return (
    <Page title='Historical Balance' actions={<Help />}>
      {isLoggedIn ? null : (
        <div className={cx(styles.bg, 'row hv-center')}>
          <LoginWarning className={cx(styles.login, 'border')} />
        </div>
      )}

      <HistoricalBalance
        defaultSettings={settings}
        defaultChartAssets={chartAssets}
        defaultPriceAssets={priceAssets}
        defaultIsLog={isLog}
      >
        <URLExtension history={history} />
      </HistoricalBalance>
    </Page>
  )
}

export default HistoricalBalancePage
