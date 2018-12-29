import React from 'react'
import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'
import Navbar from './../src/components/Navbar/Navbar'
import NavbarProfileDropdown from './../src/components/Navbar/NavbarProfileDropdown'
import Toggle from './../src/components/Navbar/Toggle'

let isActive = false

storiesOf('Navbar', module)
  .addDecorator(StoryRouter())
  .add('Default', () => <Navbar />)
  .add('Profile Dropdown', () => <NavbarProfileDropdown />)
  
