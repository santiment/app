import React, { useMemo } from 'react'
import { compose } from 'redux'
import { Helmet } from 'react-helmet'
import ChartPage from '../Chart'
import withProject from '../Detailed/withProject'
import Breadcrumbs from '../profile/breadcrumbs/Breadcrumbs'
import { parseUrlV2 } from '../../ducks/Studio/url/parse'
import CtaJoinPopup from '../../components/CtaJoinPopup/CtaJoinPopup'
import styles from '../Detailed/Detailed.module.scss'
import URLExtension from './URLExtension'

const CRUMB = {
  label: 'Assets',
  to: '/assets'
}

const TopSlot = compose(withProject)(({ slug, project, loading }) =>
  project ? (
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
      <CtaJoinPopup />
    </>
  ) : null
)

export default ({ history }) => {
  const url = window.location.search
  const parsedUrl = useMemo(() => parseUrlV2(url), [url])

  const { settings = {} } = parsedUrl

  return (
    <ChartPage
      parsedUrl={parsedUrl}
      topSlot={<TopSlot slug={settings.slug} />}
      extensions={<URLExtension history={history} />}
    />
  )
}
