import React from 'react'
import {storiesOf} from '@storybook/react'
import FeaturedInsightsHorizontal from "../src/components/FeaturedInsights/FeaturedInsightsHorizontal";
import FeaturedInsightsWithTitle from "../src/components/FeaturedInsights/FeaturedInsightsWithTitle";
import FeaturedInsightsScrollable from "../src/components/FeaturedInsights/FeaturedInsightsScrollable";

storiesOf('FeaturedInsights', module)
  .add('Horizontal', () => (
    <>
      <h2>Component for mobile and tablet</h2>
      <FeaturedInsightsHorizontal maxLines={3} multilineTextId="testHorizontal" />
    </>
  ))
  .add('Scrollable', () => (
    <>
      <h2>Component for flex container with scrollable Panel</h2>
      <FeaturedInsightsScrollable maxLines={2} multilineTextId="testScrollable" />
    </>
  ))
  .add('WithTitle', () => (
    <>
      <h2>Component for desktop and without scrollable</h2>
      <FeaturedInsightsWithTitle maxLines={2} multilineTextId="testWithTitle" />
    </>
  ))
