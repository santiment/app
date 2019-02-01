import React from 'react'
import StoryRouter from 'storybook-react-router'
import { storiesOf } from '@storybook/react'
import InsightCard from './../src/components/Insight/InsightCard'
import Insights from './../src/components/Insight/Insights'

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
      id: 0
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
      id: 0
    },
    title: 'Very very very very very very very large title',
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

const stories = storiesOf('Insights', module)
stories.addDecorator(StoryRouter())
stories
  .add('Insight Card', () => <InsightCard {...insights[1]} />)
  .add('Insights Tab', () => <Insights insights={insights} />)
