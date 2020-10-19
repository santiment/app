import React from 'react'
import {
  createSkeletonElement,
  createSkeletonProvider
} from '@trainline/react-skeletor'
import Icon from '@santiment-network/ui/Icon'
import ProjectSelectDialog from '../../Studio/Compare/ProjectSelectDialog'
import { ProjectIcon } from '../../../components/ProjectIcon/ProjectIcon'
import styles from './StablecoinSelector.module.scss'
import { useDialogState } from '../../../hooks/dialog'

const H1 = createSkeletonElement('h1')

const ProjectInfo = createSkeletonProvider(
  {
    name: '_______'
  },
  ({ name }) => name === undefined,
  () => ({
    color: 'var(--mystic)',
    backgroundColor: 'var(--mystic)'
  })
)(({ name, ticker, slug, logoUrl, darkLogoUrl, onClick }) => (
  <div className={styles.selector} onClick={onClick}>
    <div className={styles.projectIcon}>
      <ProjectIcon
        size={20}
        slug={slug}
        logoUrl={logoUrl}
        darkLogoUrl={darkLogoUrl}
      />
    </div>
    <div className={styles.project}>
      <div className={styles.project__top}>
        <H1 className={styles.project__name}>
          {name}
          <span className={styles.ticker}>{ticker}</span>
        </H1>
        <div className={styles.project__arrows}>
          <Icon type='arrow-down' className={styles.project__arrow} />
        </div>
      </div>
    </div>
  </div>
))

const StablecoinSelector = ({ setAsset, asset }) => {
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
      customTabs={['Stablecoins']}
      showTabs={false}
      trigger={<ProjectInfo {...asset} onClick={openDialog} />}
    />
  )
}

export default StablecoinSelector
