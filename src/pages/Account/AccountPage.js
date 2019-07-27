import React from 'react'
import { Redirect } from 'react-router-dom'
import { HashLink as Link } from 'react-router-hash-link'
import { Tabs } from '@santiment-network/ui'
import { DesktopOnly, MobileOnly } from './../../components/Responsive'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import SettingsGeneral from './SettingsGeneral'
import SettingsConnections from './SettingsConnections'
import SettingsNotifications from './SettingsNotifications'
import SettingsGetTokens from './SettingsGetTokens'
import SettingsAPIKeys from './SettingsAPIKeys'
import SettingsPlans from './SettingsPlans'
import styles from './AccountPage.module.scss'

const tabs = [
  {
    index: 1,
    content: (
      <Link className={styles.tab} to='#general'>
        General
      </Link>
    )
  },
  {
    index: 2,
    content: (
      <Link className={styles.tab} to='#connections'>
        Connections
      </Link>
    )
  },
  {
    index: 3,
    content: (
      <Link className={styles.tab} to='#notifications'>
        Notifications
      </Link>
    )
  },
  {
    index: 4,
    content: (
      <Link className={styles.tab} to='#get-tokens'>
        Get tokens
      </Link>
    )
  },
  {
    index: 5,
    content: (
      <Link className={styles.tab} to='#api-keys'>
        API keys
      </Link>
    )
  },
  {
    index: 6,
    content: (
      <Link className={styles.tab} to='#plans'>
        Plans
      </Link>
    )
  }
]

const AccountPage = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Redirect to='/' />
  }
  return (
    <div className={styles.wrapper + ' page'}>
      <DesktopOnly>
        <h2 className={styles.title}>Account settings</h2>
      </DesktopOnly>
      <MobileOnly>
        <MobileHeader title='Account settings' />
      </MobileOnly>
      <Tabs className={styles.tabs} options={tabs} defaultSelectedIndex={1} />
      <SettingsGeneral />
      <SettingsConnections />
      <SettingsNotifications />
      <SettingsGetTokens />
      <SettingsAPIKeys />
      <SettingsPlans />
    </div>
  )
}

export default AccountPage
