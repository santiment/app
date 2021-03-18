import React, { useState, useEffect, useMemo } from 'react'
import cx from 'classnames'
import Input from '@santiment-network/ui/Input'
import Labels from './Labels'
import Actions from './Actions'
import AssetsDistribution from './AssetsDistribution'
import CurrentBalance from './CurrentBalance'
import Setting from '../Setting'
import {
  Infrastructure,
  getAddressInfrastructure
} from '../../../utils/address'
import { useAddressNote } from '../hooks'
import { DesktopOnly } from '../../../components/Responsive'
import HelpPopup from '../../../components/HelpPopup/HelpPopup'
import stylesTooltip from '../../../components/HelpPopup/HelpPopup.module.scss'
import styles from './index.module.scss'

export const AddressSetting = ({
  className,
  settings,
  walletAssets,
  chartAssets,
  isError,
  onAddressChange
}) => {
  const { address } = settings
  const [value, setValue] = useState(address)
  const note = useAddressNote(settings)
  const infrastructure = useMemo(() => getAddressInfrastructure(value), [value])

  useEffect(
    () => {
      if (address !== value) {
        setValue(address)
      }
    },
    [address]
  )

  useEffect(
    () => {
      if (value === settings.address || !infrastructure) return

      const timer = setTimeout(() => onAddressChange(value), 250)
      return () => clearTimeout(timer)
    },
    [value]
  )

  function onChange ({ target: { value } }) {
    setValue(value)
  }

  return (
    <div className={cx(styles.wrapper, className)}>
      <Setting title='Wallet address'>
        <div className={styles.top}>
          <Input
            autoComplete='off'
            value={value}
            isError={isError || !infrastructure}
            onChange={onChange}
          />
          {note && (
            <HelpPopup triggerClassName={styles.note}>
              <h4 className={stylesTooltip.title}>Note</h4>
              {note}
            </HelpPopup>
          )}
          <div className={styles.bottom}>
            <Labels settings={settings} />
            {value && infrastructure === Infrastructure.ETH && (
              <a
                href={`https://etherscan.io/address/${value}`}
                target='_blank'
                rel='noopener noreferrer'
                className={styles.etherscan}
              >
                Open Etherscan
              </a>
            )}
          </div>
        </div>
      </Setting>

      <Actions
        address={address}
        infrastructure={infrastructure}
        assets={chartAssets}
      />

      <DesktopOnly>
        <div className={styles.widgets}>
          <AssetsDistribution
            walletAssets={walletAssets}
            className={styles.widget}
          />
          <CurrentBalance
            walletAssets={walletAssets}
            className={styles.widget}
          />
        </div>
      </DesktopOnly>
    </div>
  )
}

export default AddressSetting
