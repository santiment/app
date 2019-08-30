import React from 'react'
import { Link } from 'react-router-dom'
import Dialog from '@santiment-network/ui/Dialog'
import HistoricalBalancePage, {
  BalancePageTitle
} from '../../ducks/HistoricalBalance/page/HistoricalBalancePage'
import styles from './WalletLink.module.scss'
import dialogStyles from './ViewBalanceDialog.module.scss'

const ViewBalanceDialog = ({ isDesktop, address, assets }) => {
  return (
    <Dialog
      title={<BalancePageTitle classes={styles} />}
      trigger={
        <div>
          <BalancePageLink link='#' />
        </div>
      }
      classes={dialogStyles}
    >
      <Dialog.ScrollContent>
        <HistoricalBalancePage
          classes={dialogStyles}
          isDesktop={isDesktop}
          address={address}
          assets={assets}
          showTitle={false}
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

/*
*
>
* */

export default ViewBalanceDialog
