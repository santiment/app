import React from 'react'
import { compose } from 'redux'
import { Helmet } from 'react-helmet'
import ChartPage from '../Chart'
import withProject from '../Detailed/withProject'
import Breadcrumbs from '../profile/breadcrumbs/Breadcrumbs'
import { parseUrl } from '../../ducks/Studio/url'
import { parseUrlV2 } from '../../ducks/Studio2/url'
import { Metric } from '../../ducks/dataHub/metrics'
import CtaJoinPopup from '../../components/CtaJoinPopup/CtaJoinPopup'
import styles from '../Detailed/Detailed.module.scss'
/* import URLExtension from './URLExtension' */

import Studio2 from '../../ducks/Studio2'

const DEFAULT_METRICS = [Metric.price_usd]

const CRUMB = {
  label: 'Assets',
  to: '/assets',
}

const TopSlot = compose(withProject)(({ slug, project, loading }) =>
  project ? (
    <>
      <Helmet
        title={loading ? 'Sanbase...' : `${project.ticker} project page`}
        meta={[
          {
            property: 'og:title',
            content: `Project overview: ${project.name} - Sanbase`,
          },
          {
            property: 'og:description',
            content: `Financial, development, on-chain and social data for ${
              project.name
            }.`,
          },
        ]}
      />
      <Breadcrumbs
        className={styles.breadcrumbs}
        crumbs={[CRUMB, { label: project.name, to: `/studio?slug=${slug}` }]}
      />
      <CtaJoinPopup />
    </>
  ) : null,
)

export default ({ history, ...props }) => {
  /* const parsedUrl = parseUrl() */
  const parsedUrl = parseUrlV2()
  console.log(parseUrlV2())

  function onSlugChange() {
    history.replace(`${window.location.pathname}${window.location.search}`)
  }

  return (
    <Studio2
      parsedUrl={parsedUrl}
      topSlot={<TopSlot slug={parsedUrl.settings.slug} />}
      defaultWidgets={parsedUrl.widgets}
      //metrics={DEFAULT_METRICS}
      onSlugChange={onSlugChange}
      //Extension={URLExtension}
      {...props}
    />
  )

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
