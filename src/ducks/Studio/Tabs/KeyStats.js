import React from 'react'
import PanelWithHeader from '@santiment-network/ui/Panel/PanelWithHeader'
import EthSpentTable from '../../../components/EthSpentTable/EthSpentTable'
import withProject from '../../../pages/Detailed/withProject'
import GeneralInfoBlock from '../../../pages/Detailed/generalInfo/GeneralInfoBlock'
import FinancialsBlock from '../../../pages/Detailed/financialInfo/FinancialsBlock'
import DetailedTransactionsTable from '../../../pages/Detailed/transactionsInfo/DetailedTransactionsTable'
import UniswapHistoricalBalance from './UniswapHistoricalBalance/UniswapHistoricalBalance'
import styles from '../../../pages/Detailed/Detailed.module.scss'

const KeyStats = ({ slug, project, loading }) => {
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

        {slug === 'uniswap' && (
          <PanelWithHeader
            header='Uniswap: Token Distributor 0x090d4613473dee047c3f2706764f49e0821d256e'
            className={styles.info__card}
            contentClassName={styles.noPadding}
          >
            <UniswapHistoricalBalance />
          </PanelWithHeader>
        )}
      </div>

      {project.tokenTopTransactions && project.tokenTopTransactions.length > 0 && (
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
