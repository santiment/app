import React from 'react'
import { compose } from 'redux'
import { Helmet } from 'react-helmet'
import ChartPage from '../Chart'
import withProject from '../Detailed/withProject'
import Breadcrumbs from '../profile/breadcrumbs/Breadcrumbs'
import { parseUrl } from '../../ducks/Studio/url'
import { Metric } from '../../ducks/dataHub/metrics'
import StoriesList from '../../components/Stories/StoriesList'
import CtaJoinPopup from '../../components/CtaJoinPopup/CtaJoinPopup'
import styles from '../Detailed/Detailed.module.scss'

const DEFAULT_METRICS = [Metric.price_usd]

const CRUMB = {
  label: 'Assets',
  to: '/assets'
}

const TopSlot = compose(withProject)(({ slug, project, loading }) => (
  <>
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
    <Breadcrumbs
      className={styles.breadcrumbs}
      crumbs={[CRUMB, { label: project.name, to: `/studio?slug=${slug}` }]}
    />
    <StoriesList classes={styles} showScrollBtns />
    <CtaJoinPopup />
  </>
))

export default ({ history, ...props }) => {
  const parsedUrl = parseUrl()

  function onSlugChange () {
    history.replace(`${window.location.pathname}${window.location.search}`)
  }

  return (
    <ChartPage
      parsedUrl={parsedUrl}
      topSlot={<TopSlot slug={parsedUrl.settings.slug} />}
      metrics={DEFAULT_METRICS}
      onSlugChange={onSlugChange}
      {...props}
    />
  )
}
