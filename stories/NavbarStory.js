import React from 'react'
import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'
import Navbar from './../src/components/Navbar/Navbar'

storiesOf('Navbar', module)
  .addDecorator(StoryRouter())
  .add('Default', () => <Navbar />)
