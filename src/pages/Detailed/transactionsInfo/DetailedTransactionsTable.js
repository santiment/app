import React from 'react'
import ReactTable from 'react-table'
import PanelWithHeader from '@santiment-network/ui/Panel/PanelWithHeader'
import { formatNumber } from '../../../utils/formatting'
import { getDateFormats, getTimeFormats } from '../../../utils/dates'
import SmoothDropdown from '../../../components/SmoothDropdown/SmoothDropdown'
import { columns } from './columns'
import styles from './DetailedTransactionsTable.module.scss'

const DetailedTopTransactions = ({
  Project,
  show = 'ethTopTransactions',
  title = 'Top ETH transactions'
}) => {
  const slug = (Project.project || {}).slug || ''
  const data = Project.project[show]
    ? Project.project[show]
      .slice(0, 10)
      .map(({ trxValue, trxHash, fromAddress, toAddress, datetime }) => {
        const targetDate = new Date(datetime)
        const { YYYY, MM, DD } = getDateFormats(targetDate)
        const { HH, mm, ss } = getTimeFormats(targetDate)

        return {
          trxHash,
          fromAddress: {
            ...fromAddress,
            assets: [slug, 'ethereum']
          },
          toAddress: {
            ...toAddress,
            assets: [slug, 'ethereum']
          },
          trxValue: formatNumber(trxValue),
          datetime: `${YYYY}-${MM}-${DD} ${HH}:${mm}:${ss}`
        }
      })
    : []
  return (
    <PanelWithHeader
      header={title}
      className={styles.wrapper}
      contentClassName={styles.panel}
      headerClassName={styles.header}
    >
      <SmoothDropdown verticalMotion>
        <ReactTable
          data={data}
          columns={columns}
          showPagination={false}
          resizable={false}
          minRows={1}
          className={styles.transactionsTable}
          defaultSorted={[
            {
              id: 'time',
              desc: true
            }
          ]}
        />
      </SmoothDropdown>
    </PanelWithHeader>
  )
}

export default DetailedTopTransactions
