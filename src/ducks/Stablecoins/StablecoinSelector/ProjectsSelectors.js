import React from 'react'
import cx from 'classnames'
import { createSkeletonElement, createSkeletonProvider } from '@trainline/react-skeletor'
import Icon from '@santiment-network/ui/Icon'
import ProjectSelectDialog from '../../Studio/Compare/ProjectSelectDialog'
import { ProjectIcon } from '../../../components/ProjectIcon/ProjectIcon'
import { useDialogState } from '../../../hooks/dialog'
import styles from './DashboardProjectsSelector.module.scss'

const H1 = createSkeletonElement('h1')

export const DashboardProjectInfo = createSkeletonProvider(
  {
    name: '_______',
  },
  ({ name }) => name === undefined,
  () => ({
    color: 'var(--mystic)',
    backgroundColor: 'var(--mystic)',
  }),
)(({ name, ticker, slug, description, logoUrl, darkLogoUrl, onClick, size = 40, classes = {} }) => (
  <div className={styles.selector} onClick={onClick}>
    <ProjectIcon size={size} slug={slug} logoUrl={logoUrl} darkLogoUrl={darkLogoUrl} />
    <div className={styles.project}>
      <div className={styles.project__top}>
        <H1 className={cx(styles.project__name, classes.project__name)}>
          {name} <span className={styles.project__ticker}>{ticker}</span>
        </H1>
        <div className={styles.project__arrows}>
          <Icon type='arrow-down' className={styles.project__arrow} />
        </div>
      </div>
      {description && <div className={styles.project__description}>{description}</div>}
    </div>
  </div>
))

export const DashboardProjectSelector = ({
  type,
  setAsset,
  asset,
  trigger,
  triggerProps,
  classes,
}) => {
  const { closeDialog, openDialog, isOpened } = useDialogState()

  return (
    <ProjectSelectDialog
      open={isOpened}
      activeSlug={asset.slug}
      onOpen={openDialog}
      onClose={closeDialog}
      onSelect={(asset) => {
        setAsset(asset)
        closeDialog()
      }}
      customTabs={type && [type]}
      showTabs={false}
      trigger={
        trigger || (
          <DashboardProjectInfo
            {...asset}
            {...triggerProps}
            onClick={openDialog}
            classes={classes}
          />
        )
      }
    />
  )
}

export const StablecoinsSelector = ({ ...rest }) => (
  <DashboardProjectSelector type={'Stablecoins'} {...rest} />
)
