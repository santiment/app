import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'
import { parse } from 'query-string'
import { generateUrlV2 } from '../../ducks/Studio/url/generate'

const URLExtension = ({
  history,
  settings,
  widgets,
  sidepanel,
  setSettings
}) => {
  const { slug, name, ticker } = settings

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

  return (
    <Helmet
      title={ticker ? `${ticker} project page` : 'Sanbase...'}
      meta={[
        {
          property: 'og:title',
          content: `Project overview: ${name} - Sanbase`
        },
        {
          property: 'og:description',
          content: `Financial, development, on-chain and social data for ${name}.`
        }
      ]}
    />
  )
}

export default withRouter(URLExtension)
