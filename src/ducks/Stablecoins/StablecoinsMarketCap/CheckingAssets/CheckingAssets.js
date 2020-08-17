import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import { CHECKING_STABLECOINS } from '../utils'
import ProjectIcon from '../../../../components/ProjectIcon/ProjectIcon'
import styles from './CheckingAssets.module.scss'

const AssetButton = ({ children, loading, isDisabled, ...rest }) => {
  return (
    <Button
      border
      loading={loading}
      className={cx(styles.assetBtn, isDisabled && styles.disabled)}
      {...rest}
    >
      {children}
    </Button>
  )
}

const CheckingAssets = ({ loadings, disabledAssets, toggleDisabled }) => {
  return (
    <div className={styles.container}>
      {CHECKING_STABLECOINS.map(({ label, slug, color }) => {
        return (
          <AssetButton
            key={label}
            loading={loadings}
            onClick={() => {
              if (disabledAssets[slug]) {
                delete disabledAssets[slug]
              } else {
                disabledAssets[slug] = true
              }

              toggleDisabled({ ...disabledAssets })
            }}
            isDisabled={disabledAssets[slug]}
          >
            <div className={cx(styles.btnInner, styles.icon)}>
              <svg
                width='14'
                height='10'
                viewBox='0 0 14 10'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M11 5C11 7.20914 9.20914 9 7 9C4.79086 9 3 7.20914 3 5M11 5C11 2.79086 9.20914 1 7 1C4.79086 1 3 2.79086 3 5M11 5H13M3 5H1'
                  stroke={color}
                  strokeWidth='1.2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>

            <div className={styles.divider} />

            <ProjectIcon size={18} slug={slug} className={styles.projectIcon} />

            <div className={styles.btnInner}>{label}</div>
          </AssetButton>
        )
      })}
    </div>
  )
}

export default CheckingAssets
