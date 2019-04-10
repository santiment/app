import React from 'react'
import StoryRouter from 'storybook-react-router'
import { storiesOf } from '@storybook/react'
import AssetCard from './../src/pages/assets/AssetCard'
import { Label } from '@santiment-network/ui'
import MobileHeader from './../src/components/MobileHeader/MobileHeader'

const rightActions = (
  <Label
    accent='persimmon'
    variant='fill'>
    any right action
  </Label>
)

const stories = storiesOf('Mobile', module)
stories.addDecorator(StoryRouter())
stories.add("Header", () => (
  <>
    <div style={{ maxWidth: 320, background: 'white' }}>
      <MobileHeader title='Assets Overview' />
    </div>
    <br />
    <div style={{ maxWidth: 320, background: 'white' }}>
      <MobileHeader title='All assets' backRoute='/assets' />
    </div>
    <br />
    <div style={{ maxWidth: 320, background: 'white' }}>
      <MobileHeader title='All assets' backRoute='/assets' rightActions={rightActions} />
    </div>
  </>
))

