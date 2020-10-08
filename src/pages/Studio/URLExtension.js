import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'
import { parse } from 'query-string'
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

const URLExtension = ({
  history,
  settings,
  widgets,
  sidepanel,
  setSettings
}) => {
  const { slug } = settings

  // NOTE: This version of withRouter does not trigger rerender on location change (it depends on the root component rerender [@vanguard | Oct 8, 2020]
  useEffect(
    () =>
      history.listen(({ search }) => {
        const searchSlug = parse(search).slug
        if (searchSlug && searchSlug !== slug) {
          setSettings(settings => ({ ...settings, slug: searchSlug }))
        }
      }),
    [slug]
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

  return <Head slug={slug} />
}

export default withRouter(URLExtension)
