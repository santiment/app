import React from 'react'
import { compose } from 'redux'
import { Helmet } from 'react-helmet'
import PanelWithHeader from '@santiment-network/ui/Panel/PanelWithHeader'
import StudioPage from '../Studio'
import Breadcrumbs from '../profile/breadcrumbs/Breadcrumbs'
import StoriesList from '../../components/Stories/StoriesList'
import GeneralInfoBlock from './generalInfo/GeneralInfoBlock'
import FinancialsBlock from './financialInfo/FinancialsBlock'
import DetailedTransactionsTable from './transactionsInfo/DetailedTransactionsTable'
import { Metric } from '../../ducks/dataHub/metrics'
import EthSpentTable from '../../components/EthSpentTable/EthSpentTable'
import CtaJoinPopup from '../../components/CtaJoinPopup/CtaJoinPopup'
import withProject from './withProject'
import styles from './Detailed.module.scss'

const CRUMB = {
  label: 'Assets',
  to: '/assets'
}

const DEFAULT_METRICS = [
  Metric.price_usd,
  Metric.social_volume_total,
  Metric.age_destroyed
]

const TopSlot = ({ label }) => (
  <>
    <Breadcrumbs className={styles.breadcrumbs} crumbs={[CRUMB, { label }]} />
    <StoriesList classes={styles} showScrollBtns />
    <CtaJoinPopup />
  </>
)

const BottomSlot = compose(withProject)(
  ({ slug, project, isERC20, loading }) => (
    <div className={styles.bottom}>
      <Helmet
        // NOTE: Using props instead of the children because of the issue addresed here https://github.com/nfl/react-helmet/issues/373 [@vanguard | Feb 4, 2020]
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
            }. Get access to full historical data & advanced metrics for ${
              project.name
            } by upgrading to Sanbase Dashboards.
        `
          }
        ]}
      />

      {slug === 'ethereum' && (
        <div className={styles.spent}>
          <EthSpentTable />
        </div>
      )}

      <div className={styles.info}>
        <PanelWithHeader header='General Info' className={styles.info__card}>
          <GeneralInfoBlock {...project} />
        </PanelWithHeader>
        {project.fundsRaisedIcos && project.fundsRaisedIcos.length > 0 && (
          <PanelWithHeader header='Financials' className={styles.info__card}>
            <FinancialsBlock {...project} />
          </PanelWithHeader>
        )}
      </div>

      {isERC20 &&
        project.tokenTopTransactions &&
        project.tokenTopTransactions.length > 0 && (
          <>
            <div className={styles.info}>
              <DetailedTransactionsTable
                project={project}
                title='Top token transactions, 30d'
                show='tokenTopTransactions'
              />
            </div>
            <div className={styles.info}>
              <DetailedTransactionsTable project={project} />
            </div>
          </>
      )}
    </div>
  )
)

export default ({ match: { params }, history }) => {
  const { slug } = params

  function onSlugChange (slug) {
    history.replace(`/projects/${slug}`)
  }

  return (
    <StudioPage
      settings={{ slug }}
      topSlot={<TopSlot label={slug} />}
      bottomSlot={<BottomSlot slug={slug} />}
      onSlugChange={onSlugChange}
      classes={styles}
      metrics={DEFAULT_METRICS}
    />
  )
}
