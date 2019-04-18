import React from 'react'
import StoryRouter from 'storybook-react-router'
import {storiesOf} from '@storybook/react'
import { Provider } from 'react-redux'
import { MockedProvider } from 'react-apollo/test-utils'
import configureStore from 'redux-mock-store'
import { FEATURED_INSIGHTS_QUERY } from './../src/queries/InsightsGQL'
import FeaturedInsightsHorizontal from "../src/components/FeaturedInsights/FeaturedInsightsHorizontal";
import FeaturedInsightsWithTitle from "../src/components/FeaturedInsights/FeaturedInsightsWithTitle";
import FeaturedInsightsScrollable from "../src/components/FeaturedInsights/FeaturedInsightsScrollable";
const mockedData = {
  insights: [0, 1].map(index => ({
    "__typename": "Post",
    readyState: "published",
    id: index,
    title: 'ANy',
    createdAt: '2018-12-01T13:37:02.07080',
    publishedAt: '2018-12-01T13:37:02.07080',
    updatedAt: '2018-12-01T13:37:02.07080',
    tags: [],
    votedAt: null,
    votes:{"__typename":"Vote","totalVotes":0},
    user:{"__typename":"PostAuthor","id":"2","username":"Iurii"}
  }))
}

const query = FEATURED_INSIGHTS_QUERY

const mocks = [{ request: { query }, result: { data: mockedData } }]

const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount))

const mockStore = configureStore([])
const initialState = { user: { token: 'any' } }
let store = mockStore(initialState)

storiesOf('FeaturedInsights', module)
  .addDecorator(StoryRouter())
  .addDecorator(story => (
    <MockedProvider mocks={mocks}>{story()}</MockedProvider>
  ))
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('Horizontal', () => (
    <>
      <h2>Component for mobile and tablet</h2>
      <FeaturedInsightsHorizontal maxLines={3} multilineTextId="testHorizontal" />
    </>
  ))
  //.add('Scrollable', () => (
    //<>
      //<h2>Component for flex container with scrollable Panel</h2>
      //<FeaturedInsightsScrollable client={() => {}} maxLines={2} multilineTextId="testScrollable" />
    //</>
  //))
  //.add('WithTitle', () => (
    //<>
      //<h2>Component for desktop and without scrollable</h2>
      //<FeaturedInsightsWithTitle client={() => {}} maxLines={2} multilineTextId="testWithTitle" />
    //</>
  //))
