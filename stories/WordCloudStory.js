import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import WordCloud from './../src/components/WordCloud/WordCloud'
import HypedWordsBlock from '../src/components/Trends/HypedWordsBlock'
import store from './store'

storiesOf('WordCloud', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('Default', () => (
    <div>
      <WordCloud />
    </div>
  ))
  .add('With Trends', () => (
    <div>
      <HypedWordsBlock />
      <WordCloud />
    </div>
  ))
