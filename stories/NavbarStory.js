import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'
import Navbar from './../src/components/Navbar/Navbar'
import NavbarProfileDropdown from './../src/components/Navbar/NavbarProfileDropdown'
import NavbarHelpDropdown from './../src/components/Navbar/NavbarHelpDropdown'
import NavbarLabsDropdown from './../src/components/Navbar/NavbarLabsDropdown'
import NavbarAssetsDropdown from './../src/components/Navbar/NavbarAssetsDropdown'
import { Provider } from 'react-redux'
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
      <NavbarProfileDropdown />
      <br />
      Profile status and picture
      <NavbarProfileDropdown
        status='active'
        picUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_iB-yPaTXvwWqWiLP3kuHf_WocZXm_uN2lhsNMvkN-BsMLZcDUQ'
      />
      <br />
      On the '/account' page
      <NavbarProfileDropdown activeLink='/account' />
    </div>
  ))
  .add('Help Dropdown', () => (
    <div>
      <NavbarHelpDropdown />
      <br />
      On the '/support' page
      <NavbarHelpDropdown activeLink='/support' />
    </div>
  ))
  .add('Labs Dropdown', () => (
    <div>
      <NavbarLabsDropdown />
      <br />
      On the '/labs/trends' page
      <NavbarLabsDropdown activeLink='/labs/trends' />
    </div>
  ))
  .add('Assets Dropdown', () => (
    <div>
      <NavbarAssetsDropdown />
    </div>
  ))
