import React from 'react'
import moment from 'moment'
import ReactTable from 'react-table'
import PanelBlock from './../../components/PanelBlock'
import { formatNumber } from './../../utils/formatting'
import SmoothDropdown from '../../components/SmoothDropdown/SmoothDropdown'
import WalletLink from '../../components/WalletLink/WalletLink'
import './DetailedTransactionsTable.css'

const TrxAddressCell = ({ value }) => <WalletLink {...value} />

const TrxHashAddressCell = ({ value }) => (
  <TrxAddressCell value={{ address: value, isTx: true }} />
)

const COLUMNS = [
  {
    id: 'time',
    Header: 'Time',
    accessor: 'datetime',
    minWidth: 100,
    maxWidth: 200,
    sortMethod: (a, b) => {
      return moment(a).isAfter(moment(b)) ? 1 : -1
    }
  },
  {
    Header: 'Value',
    accessor: 'trxValue',
    minWidth: 100,
    maxWidth: 150,
    sortable: false
  },
  {
    Header: 'From',
    accessor: 'fromAddress',
    Cell: TrxAddressCell,
    sortable: false
  },
  {
    Header: 'To',
    accessor: 'toAddress',
    Cell: TrxAddressCell,
    sortable: false
  },
  {
    Header: 'TxHash',
    accessor: 'trxHash',
    Cell: TrxHashAddressCell,
    sortable: false
  }
]

const DetailedTopTransactions = ({
  Project,
  show = 'ethTopTransactions',
  title = 'Top ETH Transactions'
}) => {
  const slug = (Project.project || {}).slug || ''
  const data = Project.project[show]
    ? Project.project[show]
      .slice(0, 10)
      .map(({ trxValue, trxHash, fromAddress, toAddress, datetime }) => ({
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
        datetime: moment(datetime).format('YYYY-MM-DD HH:mm:ss')
      }))
    : []
  return (
    <PanelBlock isLoading={Project.loading} title={title}>
      <SmoothDropdown verticalMotion>
        <ReactTable
          data={data}
          columns={COLUMNS}
          showPagination={false}
          minRows={2}
          className='DetailedEthTopTransactions'
          defaultSorted={[
            {
              id: 'time',
              desc: true
            }
          ]}
        />
      </SmoothDropdown>
    </PanelBlock>
  )
}

export default DetailedTopTransactions
