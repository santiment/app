import React from 'react'
import cx from 'classnames'
import SignalMasterModalForm from '../../Signals/signalModal/SignalMasterModalForm'
import {
  ETH_WALLET_AMOUNT_UP,
  ETH_WALLET_METRIC
} from '../../Signals/utils/constants'
import { mapToOption, mapToOptions } from '../../Signals/utils/utils'
import styles from './BalanceView.module.scss'

const BalanceChartHeader = ({
  title,
  address,
  assets,
  showAlertBtn = true,
  children,
  className
}) => {
  return (
    <div className={cx(styles.chartHeader, className)}>
      {title}
      {showAlertBtn && (
        <SignalMasterModalForm
          label='Generate an alert'
          enabled={!!address && (assets && assets.length > 0)}
          canRedirect={false}
          metaFormSettings={{
            target: {
              value: assets.length > 0 ? mapToOption(assets[0]) : undefined
            },
            metric: {
              value: { ...ETH_WALLET_METRIC }
            },
            type: {
              value: { ...ETH_WALLET_AMOUNT_UP }
            },
            ethAddress: mapToOptions(address)
          }}
          buttonParams={{
            variant: 'ghost',
            border: true
          }}
        />
      )}

      <div className={styles.chartParams}>{children}</div>
    </div>
  )
}

export default BalanceChartHeader
