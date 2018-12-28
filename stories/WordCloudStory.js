import React from 'react'
import { storiesOf } from '@storybook/react'
import WordCloud from './../src/components/WordCloud/WordCloud'
import ColorModeComparison from './ColorModeComparison'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from '../src/reducers/rootReducers'

const store = createStore(reducers, {}, composeWithDevTools())

storiesOf('WordCloud', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('Simple', () => (
    <div>
      <ColorModeComparison>
        <WordCloud />
      </ColorModeComparison>
    </div>
  ))
  .add('With Trends', () => (
    <div>
      <ColorModeComparison>
        <WordCloud />
      </ColorModeComparison>
    </div>
  ))
