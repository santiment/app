import React from 'react'

import ShowIf from '../../../components/ShowIf'
import SignalMasterModalForm from '../../Signals/signalModal/SignalMasterModalForm'
import {
  ETH_WALLET_AMOUNT_UP,
  ETH_WALLET_METRIC
} from '../../Signals/utils/constants'
import styles from './BalanceView.module.scss'

const BalanceChartHeader = ({ address, assets, children }) => {
  return (
    <div className={styles.chartHeader}>
      <div className={styles.addTrigger}>
        <ShowIf beta>
          <SignalMasterModalForm
            label='Generate signal'
            enabled={address && assets && assets.length === 1}
            canRedirect={false}
            metaFormSettings={{
              target: {
                value: {
                  value: assets[0],
                  label: assets[0]
                }
              },
              metric: {
                value: { ...ETH_WALLET_METRIC }
              },
              type: {
                value: { ...ETH_WALLET_AMOUNT_UP }
              },
              ethAddress: address
            }}
            buttonParams={{
              variant: 'ghost',
              border: true
            }}
          />
        </ShowIf>
      </div>

      <div className={styles.chartParams}>{children}</div>
    </div>
  )
}

export default BalanceChartHeader
