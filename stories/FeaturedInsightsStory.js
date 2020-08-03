import React from 'react'
import StoryRouter from 'storybook-react-router'
import {storiesOf} from '@storybook/react'
import {Provider} from 'react-redux'
import {MockedProvider} from 'react-apollo/test-utils'
import configureStore from 'redux-mock-store'
import {FEATURED_INSIGHTS_QUERY} from './../src/queries/InsightsGQL'
import FeaturedInsightsHorizontal from "../src/components/FeaturedInsights/FeaturedInsightsHorizontal";
import FeaturedInsightsWithTitle from "../src/components/FeaturedInsights/FeaturedInsightsWithTitle";

const title = 'How Stable Are Stablecoins? ';
const usernames = ['N', 'Nastya', 'Nastya Kharitonova', 'LooooooooooongNameAndSurname'];

const mockedData = {
  insights: [0, 1, 2, 3].map(index => ({
    "__typename": "Post",
    readyState: "published",
    id: index,
    title: title.repeat(index+1),
    createdAt: '2018-12-01T13:37:02.07080',
    publishedAt: '2018-12-01T13:37:02.07080',
    updatedAt: '2018-12-01T13:37:02.07080',
    tags: [],
    votedAt: null,
    votes: {"__typename": "Vote", "totalVotes": index},
    user: {"__typename": "PostAuthor", "id": index, "username": usernames[index]}
  }))
}

const query = FEATURED_INSIGHTS_QUERY
const mocks = [{request: {query}, result: {data: mockedData}}]

const mockStore = configureStore([])
const initialState = {user: {token: 'any'}}
let store = mockStore(initialState)

storiesOf('FeaturedInsights', module)
  .addDecorator(StoryRouter())
  .addDecorator(story => (
    <MockedProvider mocks={mocks}>{story()}</MockedProvider>
  ))
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('WithTitle', () => (
    <>
      <h2>Component for desktop and without scrollable Panel</h2>
      <div style={{width: '300px'}}>
        <FeaturedInsightsWithTitle maxLines={2} multilineTextId="testWithTitle" />
      </div>
    </>
  ))
  .add('Horizontal', () => (
    <>
      <h2>Component for mobile and tablet</h2>
      <p>Choose mobile/tablet device below</p>
        <FeaturedInsightsHorizontal maxLines={3} multilineTextId="testHorizontal" />
    </>
  ))
