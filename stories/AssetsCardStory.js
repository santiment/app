import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'
import AssetsCard from '../src/pages/assets/AssetsCard'

storiesOf('AssetsCard', module)
  .addDecorator(StoryRouter())
  .add('Default', () => (
    <AssetsCard
      slug='santiment'
      name='Santiment'
      ticker='SAN'
      priceUsd={0.52}
      percentChange24h={12}
    />
  )).add('without Icon', () => (
    <AssetsCard
      slug='aksdjfh'
      name='aksdjfh'
    />
  ))
