import React from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import { Tabs, Toggle, Label, Button, Selector } from '@santiment-network/ui'
import Settings from './Settings'
import BancorWidget from '../../components/BancorWidget/BancorWidget'
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
  }
]

const AccountPage = () => {
  return (
    <div className={styles.wrapper + ' page'}>
      <h2 className={styles.title}>Account settings</h2>
      <Tabs className={styles.tabs} options={tabs} defaultSelectedIndex={1} />

      <Settings id='general' header='General'>
        <Settings.Row>
          <div className={styles.setting__left}>
            <Label>Nickname</Label>
          </div>
          <Label accent='jungle-green'>Add your nickname</Label>
        </Settings.Row>
        <Settings.Row>
          <div className={styles.setting__left}>
            <Label>Email</Label>
          </div>
          <Label accent='jungle-green'>Add your email</Label>
        </Settings.Row>
        <Settings.Row>
          <div className={styles.setting__left}>
            <Label>Night mode</Label>
          </div>
          <Toggle />
        </Settings.Row>
        <Settings.Row>
          <div className={styles.setting__left}>
            <Label>Beta mode</Label>
          </div>
          <Toggle />
        </Settings.Row>
      </Settings>

      <Settings id='connections' header='Connections'>
        <Settings.Row>
          <div className={styles.setting__left}>
            <Label>Metamask</Label>
            <Label className={styles.setting__description} accent='waterloo'>
              You will get the ability to deposit tokens to your Sanbase
              account.
              <br />
              Please follow futher instructions.
            </Label>
          </div>
          <Button variant='fill' accent='positive'>
            Connect
          </Button>
        </Settings.Row>

        <Settings.Row>
          <div className={styles.setting__left}>
            <Label>Telegram</Label>
            <Label className={styles.setting__description} accent='waterloo'>
              You will get the ability to connect the bot and log in through
              Telegram.
              <br />
              Please do not use Telegram Web as it might not be able to link
              account correctly.
            </Label>
          </div>
          <Button variant='fill' accent='positive'>
            Connect
          </Button>
        </Settings.Row>

        <Settings.Row>
          <div className={styles.setting__left}>
            <Label>Email</Label>
            <Label className={styles.setting__description} accent='waterloo'>
              You will get the ability to receive notifications and log in
              through your email.
              <br />
              Don't forget to confirm your email address. Follow futher
              instructions.
            </Label>
          </div>
          <Button variant='fill' accent='positive'>
            Connect
          </Button>
        </Settings.Row>
      </Settings>

      <Settings id='notifications' header='Notifications'>
        <Settings.Row>
          <Label>Email notifications</Label>
          <div className={styles.setting__right_notifications}>
            <Label className={styles.signalInfo} accent='jungle-green'>
              Manage followed signals (15/25)
            </Label>
            <Toggle />
          </div>
        </Settings.Row>

        <Settings.Row>
          <Label>Telegram notifications</Label>

          <div className={styles.setting__right_notifications}>
            <Label className={styles.signalInfo} accent='jungle-green'>
              Manage followed signals (25/25)
            </Label>
            <Toggle />
          </div>
        </Settings.Row>

        <Settings.Row>
          <div className={styles.setting__left}>
            <Label>Digest</Label>
            <Label className={styles.setting__description} accent='waterloo'>
              Receive the best insights and signals on Sanbase
              <br />
              peersonalized based on your interests.
            </Label>
          </div>
          <Selector
            options={['Daily', 'Weekly', 'Off']}
            // onSelectOption={Selected}
            defaultSelected='Off'
          />
        </Settings.Row>
      </Settings>

      <Settings id='get-tokens' header='Get tokens'>
        <Settings.Row
          style={{ flexDirection: 'column', alignItems: 'flex-start' }}
        >
          Get SAN tokens
          <BancorWidget className={styles.bancor} />
          <div className={styles.tokens__markets}>
            <a
              className={styles.tokens__market}
              href='https://www.bitfinex.com/'
              rel='noopener noreferrer'
              target='_blank'
            >
              Bitfinex
            </a>
            <a
              className={styles.tokens__market}
              href='https://liqui.io/#/exchange/SAN_ETH'
              rel='noopener noreferrer'
              target='_blank'
            >
              Liqui
            </a>
            <a
              className={styles.tokens__market}
              href='https://www.okex.com/'
              rel='noopener noreferrer'
              target='_blank'
            >
              OKeX
            </a>
            <a
              className={styles.tokens__market}
              href='https://hitbtc.com/'
              rel='noopener noreferrer'
              target='_blank'
            >
              HitBTC
            </a>
          </div>
        </Settings.Row>
      </Settings>

      <Settings id='api-keys' header='API keys'>
        <Settings.Row>
          <div className={styles.setting__left}>
            <Label>API Keys</Label>
            <Label className={styles.setting__description} accent='waterloo'>
              The api key will give you access to the data that requires SAN
              token staking.
              <br />
              The api key can only be used to fetch data and not to execute
              graphql mutations.
            </Label>
          </div>
          <Button variant='fill' accent='positive'>
            Generate
          </Button>
        </Settings.Row>
      </Settings>
    </div>
  )
}

export default AccountPage
