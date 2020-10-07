import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import withProject from '../Detailed/withProject'
import { generateUrlV2 } from '../../ducks/Studio/url/generate'

const Head = withProject(({ project, loading }) => (
  <Helmet
    title={loading ? 'Sanbase...' : `${project.ticker} project page`}
    meta={[
      {
        property: 'og:title',
        content: `Project overview: ${project.name} - Sanbase`
      },
      {
        property: 'og:description',
        content: `Financial, development, on-chain and social data for ${
          project.name
        }.`
      }
    ]}
  />
))

const URLExtension = ({ history, settings, widgets, sidepanel }) => {
  useEffect(
    () => {
      history.replace(`${window.location.pathname}${window.location.search}`)
    },
    [settings.slug]
  )

  useEffect(
    () => {
      history.replace(
        `${window.location.pathname}?${generateUrlV2({
          settings,
          widgets,
          sidepanel
        })}`
      )
    },
    [settings, widgets, sidepanel]
  )

  return <Head slug={settings.slug} />
}

export default URLExtension
