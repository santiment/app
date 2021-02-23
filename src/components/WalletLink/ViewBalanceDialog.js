import React from 'react'
import { Link } from 'react-router-dom'
import Dialog from '@santiment-network/ui/Dialog'
import { Title } from '../../pages/HistoricalBalance'
import HistoricalBalance from '../../ducks/HistoricalBalance'
import { assetConvertor } from '../../ducks/HistoricalBalance/url'
import { formIntervalSettings } from '../../ducks/SANCharts/IntervalSelector'
import styles from './WalletLink.module.scss'
import dialogStyles from './ViewBalanceDialog.module.scss'

const SETTINGS = {
  ...formIntervalSettings('7d'),
  timeRange: '7d'
}

const ViewBalanceDialog = ({ address, assets, trigger, priceMetrics }) => {
  return (
    <Dialog
      title={
        <div className={dialogStyles.title}>
          <Title />
        </div>
      }
      trigger={<div>{trigger || <BalancePageLink link='#' />}</div>}
      classes={dialogStyles}
    >
      <Dialog.ScrollContent className={dialogStyles.content}>
        <HistoricalBalance
          defaultPriceMetrics={priceMetrics}
          defaultChartAssets={assets.map(assetConvertor)}
          defaultSettings={{
            ...SETTINGS,
            address
          }}
        />
      </Dialog.ScrollContent>
    </Dialog>
  )
}

const BalancePageLink = ({ link }) => {
  return (
    <Link to={link} className={styles.link}>
      Show historical balance
    </Link>
  )
}

export default ViewBalanceDialog
