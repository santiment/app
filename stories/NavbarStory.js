import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'
import Navbar from './../src/components/Navbar/Navbar'
import NavbarProfileDropdown from './../src/components/Navbar/NavbarProfileDropdown'
import NavbarHelpDropdown from './../src/components/Navbar/NavbarHelpDropdown'

storiesOf('Navbar', module)
  .addDecorator(StoryRouter())
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
