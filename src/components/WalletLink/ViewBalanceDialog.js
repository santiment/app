import React from 'react'
import { Link } from 'react-router-dom'
import Dialog from '@santiment-network/ui/Dialog'
import HistoricalBalancePage, {
  BalancePageTitle
} from '../../ducks/HistoricalBalance/page/HistoricalBalancePage'
import { formIntervalSettings } from '../../ducks/SANCharts/IntervalSelector'
import styles from './WalletLink.module.scss'
import dialogStyles from './ViewBalanceDialog.module.scss'

const CHART_SETTINGS = {
  ...formIntervalSettings('1w'),
  timeRange: '7d'
}

const SETTINGS = {}

const ViewBalanceDialog = ({ isDesktop, address, assets, trigger }) => {
  return (
    <Dialog
      title={<BalancePageTitle classes={dialogStyles} />}
      trigger={<div>{trigger || <BalancePageLink link='#' />}</div>}
      classes={dialogStyles}
    >
      <Dialog.ScrollContent>
        <HistoricalBalancePage
          classes={dialogStyles}
          isDesktop={isDesktop}
          address={address}
          assets={assets}
          showTitle={false}
          chartSettings={CHART_SETTINGS}
          settings={SETTINGS}
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
