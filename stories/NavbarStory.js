import React from 'react'
import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'
import Navbar from './../src/components/Navbar/Navbar'
import NavbarProfileDropdown from './../src/components/Navbar/NavbarProfileDropdown'
import NavbarHelpDropdown from './../src/components/Navbar/NavbarHelpDropdown'

storiesOf('Navbar', module)
  .addDecorator(StoryRouter())
  .add('Default', () => <Navbar />)
  .add('Profile Dropdown', () => <NavbarProfileDropdown />)
  .add('Help Dropdown', () => <NavbarHelpDropdown />)
