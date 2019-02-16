import React from 'react'
import StoryRouter from 'storybook-react-router'
import { storiesOf } from '@storybook/react'
import SignalCard from './../src/components/SignalCard/SignalCard'
import ColorModeComparison from './ColorModeComparison'

const signals = [
  {
    id: 0,
    title: 'Small title',
    description:
      'Subscribe to this signal to track the activity of selected address based on the Ethereum',
    author: 'Santiment team',
    subscriptionsNumber: 900,
    isPublic: true,
    isPublished: true
  },
  {
    id: 1,
    title: 'Small title',
    description: 'Small description'
  },
  {
    id: 2,
    title:
      'Veryvery very very very very very very very very large large long long title asdhjfbasjdhbfkj abshsdbf kjabdhskj',
    description: 'Small description'
  }
]

const stories = storiesOf('SignalCard', module)
stories.addDecorator(StoryRouter())
stories.add('Signal Card', () => (
  <ColorModeComparison>
    <SignalCard {...signals[0]} author={undefined} />
  </ColorModeComparison>
))
stories.add('Signal Card With Subscription', () => (
  <ColorModeComparison>
    Default
    <SignalCard isSubscribed {...signals[0]} />
    <br />
    By user (public)
    <SignalCard isSubscribed {...signals[0]} username='Santiment team' />
    <br />
    By user (private)
    <SignalCard
      isSubscribed
      {...signals[0]}
      isPublic={false}
      username='Santiment team'
    />
    <br />
    By user (Awaiting posting)
    <SignalCard isSubscribed {...signals[0]} isPublished={false} />
    <br />
  </ColorModeComparison>
))
