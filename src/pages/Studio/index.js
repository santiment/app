import React from 'react'
import ChartPage from '../Chart'
import Breadcrumbs from '../profile/breadcrumbs/Breadcrumbs'
import { parseUrl } from '../../ducks/Studio/url'
import { Metric } from '../../ducks/dataHub/metrics'
import StoriesList from '../../components/Stories/StoriesList'
import CtaJoinPopup from '../../components/CtaJoinPopup/CtaJoinPopup'
import styles from '../Detailed/Detailed.module.scss'

const DEFAULT_METRICS = [
  Metric.price_usd,
  Metric.social_volume_total,
  Metric.age_destroyed
]

const CRUMB = {
  label: 'Assets',
  to: '/assets'
}

const TopSlot = ({ label }) => (
  <>
    <Breadcrumbs className={styles.breadcrumbs} crumbs={[CRUMB, { label }]} />
    <StoriesList classes={styles} showScrollBtns />
    <CtaJoinPopup />
  </>
)

export default ({ history, ...props }) => {
  const parsedUrl = parseUrl()

  function onSlugChange () {
    history.replace(`/studio${window.location.search}`)
  }

  parseUrl()

  return (
    <ChartPage
      parsedUrl={parsedUrl}
      topSlot={<TopSlot label={parsedUrl.settings.slug} />}
      metrics={DEFAULT_METRICS}
      onSlugChange={onSlugChange}
      {...props}
    />
  )
}
