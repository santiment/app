import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'
import { parse } from 'query-string'
import { updateShortUrl, buildChartShorthandPath } from './utils'
import { store } from '../../redux'
import { useUser } from '../../stores/user'
import { showNotification } from '../../actions/rootActions'
import { getShortUrl } from '../../components/Share/utils'
import { generateUrlV2 } from '../../ducks/Studio/url/generate'

const onShortUrlUpdateError = () =>
  store.dispatch(
    showNotification({
      title: 'Short URL update failed',
      variant: 'error'
    })
  )

const URLExtension = ({
  history,
  settings,
  widgets,
  sidepanel,
  shortUrlState,
  prevFullUrlRef,
  setSettings
}) => {
  const { slug, name, ticker } = settings
  const { isLoggedIn } = useUser()

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
      const serializedLayout = generateUrlV2({
        settings,
        widgets,
        sidepanel
      })
      const fullUrl = '/charts?' + serializedLayout

      if (fullUrl !== prevFullUrlRef.current) {
        const replaceHistory = () => history.replace(fullUrl)
        let [shortUrl, setShortUrl] = shortUrlState

        prevFullUrlRef.current = fullUrl

        if (!isLoggedIn) return replaceHistory()

        const shortUrlPromise = shortUrl
          ? updateShortUrl(shortUrl, fullUrl)
          : getShortUrl(fullUrl).then(newShortUrl => {
            shortUrl = newShortUrl
            setShortUrl(newShortUrl)
          })

        shortUrlPromise
          .then(() => history.replace(buildChartShorthandPath(shortUrl)))
          .catch(() => {
            replaceHistory()
            onShortUrlUpdateError()
          })
      }
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
