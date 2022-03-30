import React, { useEffect, useMemo } from 'react'
import Dialogs from 'webkit/ui/Dialog/Dialogs.svelte'
import URLExtension from './URLExtension'
import Page from '../../ducks/Page'
import HistoricalBalance from '../../ducks/HistoricalBalance'
import { parseUrl } from '../../ducks/HistoricalBalance/url'
import HelpPopup from '../../components/HelpPopup/HelpPopup'

const Help = () => (
  <HelpPopup>
    Enter any ERC-20 or BTC wallet's address and choose up to 5 assets for a
    detailed breakdown of the wallet's balance over time.
  </HelpPopup>
)

export const Title = () => (
  <>
    <span style={{ marginRight: '6px' }}>Historical balance</span>
    <Help />
  </>
)

const HistoricalBalancePage = ({ history, isDesktop }) => {
  const { settings, chartAssets, priceAssets, isLog } = useMemo(
    () => parseUrl(window.location.search),
    []
  )

  useEffect(() => {
    const svelte = new Dialogs({ target: document.body })
    return () => svelte.$destroy()
  }, [])

  return (
    <Page title='Historical Balance' actions={<Help />}>
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
