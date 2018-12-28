import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import WordCloud from './../src/components/WordCloud/WordCloud'
import HypedWordsBlock from '../src/components/Trends/HypedWordsBlock'
import store from './store'

const defaultWords = [
  { word: 'word', score: 74 },
  { word: 'context', score: 74 },
  { word: 'cloud', score: 73 },
  { word: 'money', score: 72 },
  { word: 'crypto', score: 46 },
  { word: 'bank', score: 25 },
  { word: 'block', score: 7 },
  { word: 'project', score: 6 },
  { word: 'ico', score: 5 },
  { word: 'hidden', score: 4 },
  { word: 'blockchain', score: 3 },
  { word: 'coins', score: 2 },
  { word: 'stable', score: 1 },
  { word: 'nodes', score: 0 },
  { word: 'liquidity', score: 5 }
]

storiesOf('WordCloud', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('Default', () => (
    <div>
      <WordCloud cloud={defaultWords} />
    </div>
  ))
  .add('With Trends', () => (
    <div>
      <HypedWordsBlock
        trends={[{ word: 'bitcoin', score: 5 }, { word: 'eth', score: 4 }]}
      />
      <WordCloud />
    </div>
  ))
