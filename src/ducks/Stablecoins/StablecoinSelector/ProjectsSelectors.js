import React from 'react'
import {
  createSkeletonElement,
  createSkeletonProvider
} from '@trainline/react-skeletor'
import Icon from '@santiment-network/ui/Icon'
import ProjectSelectDialog from '../../Studio/Compare/ProjectSelectDialog'
import { ProjectIcon } from '../../../components/ProjectIcon/ProjectIcon'
import { useDialogState } from '../../../hooks/dialog'
import styles from './DashboardProjectsSelector.module.scss'

const H1 = createSkeletonElement('h1')

export const DashboardProjectInfo = createSkeletonProvider(
  {
    name: '_______'
  },
  ({ name }) => name === undefined,
  () => ({
    color: 'var(--mystic)',
    backgroundColor: 'var(--mystic)'
  })
)(({ name, ticker, slug, description, logoUrl, darkLogoUrl, onClick }) => (
  <div className={styles.selector} onClick={onClick}>
    <ProjectIcon
      size={40}
      slug={slug}
      logoUrl={logoUrl}
      darkLogoUrl={darkLogoUrl}
    />
    <div className={styles.project}>
      <div className={styles.project__top}>
        <H1 className={styles.project__name}>
          {name} <span className={styles.project__ticker}>{ticker}</span>
        </H1>
        <div className={styles.project__arrows}>
          <Icon type='arrow-down' className={styles.project__arrow} />
        </div>
      </div>
      {description && (
        <div className={styles.project__description}>{description}</div>
      )}
    </div>
  </div>
))

const DashboardProjectSelector = ({ type, setAsset, asset }) => {
  const { closeDialog, openDialog, isOpened } = useDialogState()

  return (
    <ProjectSelectDialog
      open={isOpened}
      activeSlug={asset.slug}
      onOpen={openDialog}
      onClose={closeDialog}
      onSelect={asset => {
        setAsset(asset)
        closeDialog()
      }}
      customTabs={[type]}
      showTabs={false}
      trigger={<DashboardProjectInfo {...asset} onClick={openDialog} />}
    />
  )
}

export const StablecoinsSelector = ({ ...rest }) => (
  <DashboardProjectSelector type={'Stablecoins'} {...rest} />
)

export const ERC20Selector = ({ ...rest }) => (
  <DashboardProjectSelector type={'ERC20'} {...rest} />
)
