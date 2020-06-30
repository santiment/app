import React from 'react'
import PanelWithHeader from '@santiment-network/ui/Panel/PanelWithHeader'
import EthSpentTable from '../../../components/EthSpentTable/EthSpentTable'
import withProject from '../../../pages/Detailed/withProject'
import GeneralInfoBlock from '../../../pages/Detailed/generalInfo/GeneralInfoBlock'
import FinancialsBlock from '../../../pages/Detailed/financialInfo/FinancialsBlock'
import DetailedTransactionsTable from '../../../pages/Detailed/transactionsInfo/DetailedTransactionsTable'
import styles from '../../../pages/Detailed/Detailed.module.scss'

const KeyStats = ({ slug, project, isERC20, loading }) => {
  return (
    <>
      {slug === 'ethereum' && (
        <div className={styles.spent}>
          <EthSpentTable />
        </div>
      )}

      <div className={styles.info}>
        <PanelWithHeader header='General Info' className={styles.info__card}>
          <GeneralInfoBlock {...project} loading={loading} />
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
    </>
  )
}

export default withProject(KeyStats)
