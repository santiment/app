import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { MockedProvider } from 'react-apollo/test-utils'
import store from './store'
import { action } from '@storybook/addon-actions'
import WidgetSonar from '../src/components/Widget/WidgetSonar'

storiesOf('WidgetSonar', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .addDecorator(story => <MockedProvider mocks={[]}>{story()}</MockedProvider>)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)

  .add('Default', () => (
    <div>
      <WidgetSonar />
    </div>
  ))
