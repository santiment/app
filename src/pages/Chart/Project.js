import React from 'react'
import { compose } from 'redux'
import PanelWithHeader from '@santiment-network/ui/Panel/PanelWithHeader'
import StudioPage from './New'
import Breadcrumbs from '../profile/breadcrumbs/Breadcrumbs'
import News from '../../components/News/News'
import StoriesList from '../../components/Stories/StoriesList'
import GeneralInfoBlock from '../Detailed/generalInfo/GeneralInfoBlock'
import FinancialsBlock from '../Detailed/financialInfo/FinancialsBlock'
import DetailedTransactionsTable from '../Detailed/transactionsInfo/DetailedTransactionsTable'
import EthSpent from '../EthSpent'
import withNews from './withNews'
import withProject from './withProject'
import styles from './Project.module.scss'

const CRUMB = {
  label: 'Assets',
  to: '/assets'
}

const TopSlot = ({ label }) => (
  <>
    <Breadcrumbs className={styles.breadcrumbs} crumbs={[CRUMB, { label }]} />
    <StoriesList classes={styles} />
  </>
)

const BottomSlot = compose(
  withNews,
  withProject
)(({ slug, project, isERC20, news = [], isLoadingNews }) => (
  <div className={styles.bottom}>
    {slug === 'ethereum' && (
      <div className={styles.spent}>
        <EthSpent />
      </div>
    )}

    <div className={styles.info}>
      <PanelWithHeader header='General Info' className={styles.info__card}>
        <GeneralInfoBlock {...project} />
      </PanelWithHeader>
      <PanelWithHeader header='Financials' className={styles.info__card}>
        <FinancialsBlock {...project} />
      </PanelWithHeader>
    </div>

    {!isLoadingNews && news.length > 0 && (
      <div className={styles.newsWrapper}>
        <h4 className={styles.newsTitle}>News</h4>
        <News data={news} />
      </div>
    )}

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
))

export default ({ match: { params }, history, ...props }) => {
  const { slug } = params

  function onSlugChange (slug) {
    history.replace(`/projects/${slug}`)
  }

  return (
    <StudioPage
      settings={{ slug }}
      topSlot={<TopSlot label={slug} />}
      bottomSlot={<BottomSlot isNewsEnabled slug={slug} />}
      onSlugChange={onSlugChange}
    />
  )
}
