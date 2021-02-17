import React from 'react'
import { Redirect } from 'react-router-dom'
import { HashLink as Link } from 'react-router-hash-link'
import Tabs from '@santiment-network/ui/Tabs'
import Button from '@santiment-network/ui/Button'
import { DesktopOnly, MobileOnly } from './../../components/Responsive'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import SettingsGeneral from './SettingsGeneral'
import SettingsConnections from './SettingsConnections'
import SettingsNotifications from './SettingsNotifications'
import SettingsGetTokens from './SettingsGetTokens'
import SettingsAPIKeys from './SettingsAPIKeys'
import SettingsSubscription from './SettingsSubscription'
import SettingsPlans from './SettingsPlans'
import SettingsAffiliate from './AffiliateSettings/SettingsAffiliate'
import { useUser } from '../../stores/user'
import styles from './AccountPage.module.scss'

export const ACCOUNT_PAGE_HASHES = {
  subscription: '#subscription',
  affiliate: '#affiliate'
}

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
      <Link className={styles.tab} to={ACCOUNT_PAGE_HASHES.affiliate}>
        Affiliate
      </Link>
    )
  },
  {
    index: 3,
    content: (
      <Link className={styles.tab} to='#connections'>
        Connections
      </Link>
    )
  },
  {
    index: 4,
    content: (
      <Link className={styles.tab} to='#notifications'>
        Alert notifications
      </Link>
    )
  },
  {
    index: 5,
    content: (
      <Link className={styles.tab} to='#get-tokens'>
        Get tokens
      </Link>
    )
  },
  {
    index: 6,
    content: (
      <Link className={styles.tab} to='#api-keys'>
        API keys
      </Link>
    )
  },
  {
    index: 7,
    hash: ACCOUNT_PAGE_HASHES.subscription,
    content: (
      <Link className={styles.tab} to={ACCOUNT_PAGE_HASHES.subscription}>
        Subscription
      </Link>
    )
  },
  {
    index: 8,
    content: (
      <Link className={styles.tab} to='#plans'>
        Plans
      </Link>
    )
  }
]

const AccountPage = ({ history, location }) => {
  const { loading, user } = useUser()

  if (loading) {
    return null
  }

  if (!user) {
    return <Redirect to='/login' />
  }

  const { hash } = location

  const selectedTab = tabs.find(({ hash: tabHash }) => tabHash === hash)
  const selectedIndex = selectedTab ? selectedTab.index : 1

  return (
    <div className={styles.wrapper + ' page'}>
      <DesktopOnly>
        <h2 className={styles.title}>Account settings</h2>
      </DesktopOnly>
      <MobileOnly>
        <MobileHeader title='Account settings' />
      </MobileOnly>
      <Tabs
        className={styles.tabs}
        options={tabs}
        defaultSelectedIndex={selectedIndex}
      />
      <div className={styles.container}>
        <SettingsGeneral {...user} />
        <SettingsAffiliate />
        <SettingsConnections />
        <SettingsNotifications />
        <SettingsGetTokens />
        <SettingsAPIKeys />
        <SettingsSubscription />
        <SettingsPlans />
      </div>
      <MobileOnly>
        <div className={styles.container}>
          <Button
            className={styles.logoutBtn}
            border
            variant='flat'
            accent='negative'
            onClick={() => history.push('/logout')}
          >
            Log out
          </Button>
        </div>
        <div className={styles.version}>
          ver. {process.env.REACT_APP_VERSION}
        </div>
      </MobileOnly>
    </div>
  )
}

export default AccountPage
