import React from 'react'
import { storiesOf } from '@storybook/react'
import InsightCard from './../src/components/Insight/InsightCard'
import Insights from './../src/components/Insight/Insights'

const insights = [
  {
    id: 0,
    user: 'Storybook',
    title: 'Small title',
    tags: [],
    createdAt: new Date().toISOString()
  },
  {
    id: 1,
    user: 'Storybook',
    title: 'Small title',
    tags: ['btc', 'eth'],
    createdAt: new Date(Date.now() - 99000).toISOString()
  },
  {
    id: 2,
    user: 'Storybook',
    title: 'Very very very very very very very large title',
    tags: [
      'alpha',
      'long test',
      'crypto market',
      'more tags',
      'more more more tags'
    ],
    createdAt: new Date(Date.now() - 9950000).toISOString()
  }
]

storiesOf('Insights', module)
  .add('Insight Card', () => <InsightCard />)
  .add('Ins', () => <Insights insights={insights} />)
