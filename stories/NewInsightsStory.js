import React from 'react'
import { storiesOf } from '@storybook/react'
import InsightCard from './../src/components/Insight/InsightCard'
import Insights from './../src/components/Insight/Insights'

storiesOf('Insights', module)
  .add('Insight Card', () => <InsightCard />)
  .add('Ins', () => <Insights />)
