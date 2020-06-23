import React, { useMemo } from 'react'
import { compose } from 'redux'
import { Helmet } from 'react-helmet'
import ChartPage from '../Chart'
import withProject from '../Detailed/withProject'
import Breadcrumbs from '../profile/breadcrumbs/Breadcrumbs'
import { parseUrl } from '../../ducks/Studio/url'
import { DEFAULT_SETTINGS } from '../../ducks/Studio/defaults'
import { DEFAULT_WIDGETS } from '../../ducks/Studio2'
import { parseUrlV2 } from '../../ducks/Studio2/url'
import { Metric } from '../../ducks/dataHub/metrics'
import CtaJoinPopup from '../../components/CtaJoinPopup/CtaJoinPopup'
import styles from '../Detailed/Detailed.module.scss'
import URLExtension from './URLExtension'

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

export default ({ history }) => {
  const url = window.location.search
  const { widgets, settings, sidepanel } = useMemo(() => parseUrlV2(url), [url])
  console.log({ widgets, settings, sidepanel })

  return (
    <Studio2
      topSlot={<TopSlot slug={settings.slug} />}
      defaultSettings={{
        ...DEFAULT_SETTINGS,
        ...settings,
      }}
      defaultWidgets={widgets.length === 0 ? DEFAULT_WIDGETS : widgets}
      defaultSidepanel={sidepanel}
      extensions={<URLExtension history={history} />}
    />
  )
}
