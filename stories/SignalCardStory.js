import React from 'react'
import StoryRouter from 'storybook-react-router'
import { storiesOf } from '@storybook/react'
import SignalCard from './../src/components/SignalCard/SignalCard'

const insights = [
  {
    id: 0,
    user: {
      username: 'Storybook very very very long name',
      id: 0
    },
    title: 'Small title',
    tags: [],
    createdAt: new Date().toISOString(),
    votes: {
      totalVotes: 5
    }
  },
  {
    id: 1,
    user: {
      username: 'Storyboodnfgkjsdnfgkjnsdfgknsdfgkjnsdfkgjasdfasdfn',
      id: 1
    },
    title: 'Small title',
    tags: [{ name: 'btc' }, { name: 'eth' }],
    createdAt: new Date(Date.now() - 99000).toISOString(),
    votes: {
      totalVotes: 3
    }
  },
  {
    id: 2,
    user: {
      username: 'Storybook',
      id: 2
    },
    title:
      'Veryvery very very very very very very very very large large long long title asdhjfbasjdhbfkj abshsdbf kjabdhskj',
    tags: [
      { name: 'btc' },
      { name: 'eth' },
      { name: 'erm' },
      { name: 'et' },
      { name: 'very very long tag' },
      { name: 'long tags' }
    ],
    createdAt: new Date(Date.now() - 9950000).toISOString(),
    votes: {
      totalVotes: 4
    }
  }
]

const stories = storiesOf('SignalCard', module)
stories.addDecorator(StoryRouter())
stories.add('Signal Card', () => <SignalCard {...insights[2]} />)
