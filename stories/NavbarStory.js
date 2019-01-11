import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'
import { Provider } from 'react-redux'
import { Panel } from '@santiment-network/ui'
import Navbar from './../src/components/Navbar/Navbar'
import NavbarProfileDropdown from './../src/components/Navbar/NavbarProfileDropdown'
import NavbarHelpDropdown from './../src/components/Navbar/NavbarHelpDropdown'
import NavbarLabsDropdown from './../src/components/Navbar/NavbarLabsDropdown'
import store from './store'

storiesOf('Navbar', module)
  .addDecorator(StoryRouter())
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)

  .add('Default', () => (
    <div>
      <Navbar />
      <br />
      {[
        '/sonar',
        '/assets',
        '/insights',
        '/labs/trends',
        '/reports',
        '/support',
        '/account'
      ].map(link => {
        return (
          <Fragment key={link}>
            On the '{link}' page
            <Navbar activeLink={link} />
            <br />
          </Fragment>
        )
      })}
    </div>
  ))
  .add('Profile Dropdown', () => (
    <div>
      <Panel>
        <NavbarProfileDropdown />
      </Panel>
      <br />
      Profile status and picture
      <Panel>
        <NavbarProfileDropdown
          status='active'
          picUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_iB-yPaTXvwWqWiLP3kuHf_WocZXm_uN2lhsNMvkN-BsMLZcDUQ'
        />
      </Panel>
      <br />
      On the '/account' page
      <Panel>
        <NavbarProfileDropdown activeLink='/account' />
      </Panel>
    </div>
  ))
  .add('Help Dropdown', () => (
    <div>
      <Panel>
        <NavbarHelpDropdown />
      </Panel>
      <br />
      On the '/support' page
      <Panel>
        <NavbarHelpDropdown activeLink='/support' />
      </Panel>
    </div>
  ))
  .add('Labs Dropdown', () => (
    <div>
      <Panel>
        <NavbarLabsDropdown />
      </Panel>
      <br />
      On the '/labs/trends' page
      <Panel>
        <NavbarLabsDropdown activeLink='/labs/trends' />
      </Panel>
    </div>
  ))
