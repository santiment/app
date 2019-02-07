import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'
import WalletLink from '../src/components/WalletLink/WalletLink'
import SmoothDropdown from '../src/components/SmoothDropdown/SmoothDropdown'

storiesOf('WalletLink', module)
  .addDecorator(StoryRouter())
  .add('Default', () => (
    <Fragment>
      <SmoothDropdown verticalOffset={0} verticalMotion>
        <WalletLink
          address='0x1f3df0b8390bb8e9e322972c5e75583e87608ec2'
          assets={['santiment', 'ethereum']}
        />
      </SmoothDropdown>
    </Fragment>
  )).add('Wallet is exchange', () => (
    <Fragment>
      <SmoothDropdown verticalOffset={0} verticalMotion>
        <WalletLink
          address='0x1f3df0b8390bb8e9e322972c5e75583e87608ec2'
          assets={['santiment', 'ethereum']}
          isExchange
        />
      </SmoothDropdown>
    </Fragment>
  )).add('Wallet is Tx (broken wallet address)', () => (
    <Fragment>
      <SmoothDropdown verticalOffset={0} verticalMotion>
        <WalletLink
          address='0x1f3df0asdfdsfb8390bb8e9e322972c5e75583e87608ec2'
          assets={['santiment', 'ethereum']}
          isTx
        />
      </SmoothDropdown>
    </Fragment>
  ))
