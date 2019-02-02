import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'
import { Panel as BasicPanel } from '@santiment-network/ui'
import { AccountNotificationChannels } from './../src/pages/Account/AccountNotificationChannels'

const Panel = ({children}) => <BasicPanel>
  <div style={{padding: '1rem'}}>{children}</div>
</BasicPanel>

storiesOf('Account', module)
  .addDecorator(StoryRouter())
  .add('Notification Channels', () => (
    <div>
      Telegram is off
      <Panel>
        <AccountNotificationChannels />
      </Panel>
      <br />
      Telegram is on, but is not activated
      <Panel>
        <AccountNotificationChannels hasTelegramConnected />
      </Panel>
      <br />
      Telegram is on, and is activated
      <Panel>
        <AccountNotificationChannels hasTelegramConnected signalNotifyTelegram />
      </Panel>
      <br />
      Email is on, but is not activated
      <Panel>
        <AccountNotificationChannels hasEmail />
      </Panel>
      <br />
      Email is on, and is activated
      <Panel>
        <AccountNotificationChannels hasEmail signalNotifyEmail />
      </Panel>
      <br />
      Email is on, activated, Telegram is on, activated
      <Panel>
        <AccountNotificationChannels hasEmail signalNotifyEmail hasTelegramConnected signalNotifyTelegram />
      </Panel>
    </div>
  ))
