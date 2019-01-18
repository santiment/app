import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import SocialVolumeWidget, {
  UnwrappedSocialVolumeWidget
} from '../src/components/SocialVolumeWidget/SocialVolumeWidget'
import HypedWordsBlock from '../src/components/Trends/HypedWordsBlock'
import store from './store'

const defaultData = [
  {
    datetime: '2018-11-27T00:00:00Z',
    mentionsCount: 2716
  },
  {
    datetime: '2018-11-28T00:00:00Z',
    mentionsCount: 3751
  },
  {
    datetime: '2018-11-29T00:00:00Z',
    mentionsCount: 2296
  },
  {
    datetime: '2018-11-30T00:00:00Z',
    mentionsCount: 1895
  },
  {
    datetime: '2018-12-01T00:00:00Z',
    mentionsCount: 1546
  },
  {
    datetime: '2018-12-02T00:00:00Z',
    mentionsCount: 1321
  },
  {
    datetime: '2018-12-03T00:00:00Z',
    mentionsCount: 1804
  },
  {
    datetime: '2018-12-04T00:00:00Z',
    mentionsCount: 1946
  },
  {
    datetime: '2018-12-05T00:00:00Z',
    mentionsCount: 2159
  },
  {
    datetime: '2018-12-06T00:00:00Z',
    mentionsCount: 2846
  },
  {
    datetime: '2018-12-07T00:00:00Z',
    mentionsCount: 4369
  },
  {
    datetime: '2018-12-08T00:00:00Z',
    mentionsCount: 2373
  },
  {
    datetime: '2018-12-09T00:00:00Z',
    mentionsCount: 2075
  },
  {
    datetime: '2018-12-10T00:00:00Z',
    mentionsCount: 2307
  },
  {
    datetime: '2018-12-11T00:00:00Z',
    mentionsCount: 1965
  },
  {
    datetime: '2018-12-12T00:00:00Z',
    mentionsCount: 1343
  },
  {
    datetime: '2018-12-13T00:00:00Z',
    mentionsCount: 1907
  },
  {
    datetime: '2018-12-14T00:00:00Z',
    mentionsCount: 2351
  },
  {
    datetime: '2018-12-15T00:00:00Z',
    mentionsCount: 1640
  },
  {
    datetime: '2018-12-16T00:00:00Z',
    mentionsCount: 1248
  },
  {
    datetime: '2018-12-17T00:00:00Z',
    mentionsCount: 2246
  },
  {
    datetime: '2018-12-18T00:00:00Z',
    mentionsCount: 1790
  },
  {
    datetime: '2018-12-19T00:00:00Z',
    mentionsCount: 2214
  },
  {
    datetime: '2018-12-20T00:00:00Z',
    mentionsCount: 2066
  },
  {
    datetime: '2018-12-21T00:00:00Z',
    mentionsCount: 1697
  },
  {
    datetime: '2018-12-22T00:00:00Z',
    mentionsCount: 1442
  },
  {
    datetime: '2018-12-23T00:00:00Z',
    mentionsCount: 1435
  },
  {
    datetime: '2018-12-24T00:00:00Z',
    mentionsCount: 1519
  },
  {
    datetime: '2018-12-25T00:00:00Z',
    mentionsCount: 1670
  }
]

storiesOf('SocialVolumeWidget', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('With data', () => (
    <div>
      <UnwrappedSocialVolumeWidget
        requestTotalSocialVolume={() => {}}
        slug='test'
        data={defaultData}
      />
    </div>
  ))
  .add('Loading', () => (
    <div>
      <UnwrappedSocialVolumeWidget
        requestTotalSocialVolume={() => {}}
        isLoading
      />
    </div>
  ))
  .add('Error', () => (
    <div>
      <UnwrappedSocialVolumeWidget requestTotalSocialVolume={() => {}} error />
    </div>
  ))
  .add('Empty', () => (
    <div>
      <UnwrappedSocialVolumeWidget
        requestTotalSocialVolume={() => {}}
        data={[]}
      />
    </div>
  ))
  .add('Total Social Volume', () => (
    <div>
      <SocialVolumeWidget />
    </div>
  ))
  .add('With Trends', () => (
    <div>
      <HypedWordsBlock
        trends={[{ word: 'bitcoin', score: 5 }, { word: 'eth', score: 4 }]}
      />
      <SocialVolumeWidget />
    </div>
  ))
