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
    tags: [],
    createdAt: '2019-01-31T15:48:37.707Z'
  },
  {
    id: 2,
    user: 'Storybook',
    title: 'Small title',
    tags: [],
    createdAt: '2019-01-21T15:48:37.707Z'
  }
]

storiesOf('Insights', module)
  .add('Insight Card', () => <InsightCard />)
  .add('Ins', () => <Insights insights={insights} />)
