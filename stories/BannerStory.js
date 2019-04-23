import React from 'react'
import {storiesOf} from '@storybook/react'
import {MockedProvider} from 'react-apollo/test-utils'
import configureStore from 'redux-mock-store'
import {EMAIL_LOGIN_MUTATION} from './../src/components/SubscriptionForm/loginGQL'
import AnonBannerSticky from "../src/components/Banner/AnonBannerSticky";
import StoryRouter from "storybook-react-router";
import {Provider} from "react-redux";

const query = EMAIL_LOGIN_MUTATION
const mocks = [{request: {query, variables: {}}, result: {}}]

const mockStore = configureStore([])
const initialState = {user: {token: 'any'}}
let store = mockStore(initialState)

storiesOf('Banner', module)
  .addDecorator(StoryRouter())
  .addDecorator(story => (
    <MockedProvider mocks={mocks}>{story()}</MockedProvider>
  ))
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)

  .add('Sticky subscription banner', () => (

    <div style={{
      width: '100%',
      height: '300vh',
      backgroundColor: '#1fc8db',
      backgroundImage: 'linear-gradient(5deg, #9fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)'
    }}>
      <AnonBannerSticky />
    </div>
  ))
