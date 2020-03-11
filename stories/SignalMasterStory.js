import React from 'react'
import { storiesOf } from '@storybook/react'
import { Provider } from 'react-redux'
import { MockedProvider } from 'react-apollo/test-utils'
import { SignalMaster } from '../src/ducks/Signals/signalFormManager/signalMaster/SignalMaster'
import { ALL_PROJECTS_FOR_SEARCH_QUERY } from './../src/pages/Projects/allProjectsGQL'
import store from './store'

const mockedData = {
  allProjects: [0, 1, 2, 3, 4, 5, 6, 7, 8].map(index => ({
    __typename: 'Project',
    slug: 'Project' + index
  }))
}

const mocks = [
  { request: { allProjectsForSearchGQL: ALL_PROJECTS_FOR_SEARCH_QUERY, variables: {minVolume: 0} }, result: { data: mockedData } }
]

storiesOf('Sonar', module)
  .addDecorator(story => (
    <MockedProvider mocks={mocks}>{story()}</MockedProvider>
  ))
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('SignalMaster default', () => (
    <div>
      <SignalMaster />
    </div>
  ))
