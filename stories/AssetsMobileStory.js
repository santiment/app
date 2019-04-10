import React from 'react'
import StoryRouter from 'storybook-react-router'
import { storiesOf } from '@storybook/react'
import AssetCard from './../src/pages/assets/AssetCard'

const stories = storiesOf('Mobile', module)
stories.addDecorator(StoryRouter())
stories.add("Asset's card", () => (
  <div style={{ maxWidth: 320, background: 'white' }}>
    <AssetCard
      slug='bitcoin'
      name='bitcoin'
      ticker='btc'
      priceUsd={0}
      percentChange24h={0}
    />
    <AssetCard
      slug='bitcoin'
      name='bitcoin'
      ticker='btc'
      priceUsd={5200}
      marketcapUsd={10000000000}
      percentChange24h={7.5}
    />
  </div>
))

