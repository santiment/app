import React, { useState, useEffect } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import Icon from '@santiment-network/ui/Icon'
import SearchProjects from '../../../../../../components/Search/SearchProjects'
import { hasAssetById } from '../../../../../../components/WatchlistPopup/WatchlistsPopup'
import ProjectsList from './ProjectsList'
import styles from './TriggerProjectsSelector.module.scss'

export const TriggerProjectsSelector = ({
  projects = [],
  setFieldValue,
  onChange,
  fieldValueList,
  values: { target = [] },
  name
}) => {
  const [isOpen, setOpen] = useState(false)

  const [listItems, setListItems] = useState([])

  const toggleAsset = ({ project, listItems, isAssetInList }) => {
    selected(
      isAssetInList
        ? listItems.filter(({ id }) => id !== project.id)
        : [...listItems, project]
    )
  }

  const selected = selectedAssets => {
    listItems.length !== selectedAssets.length && setListItems(selectedAssets)
    setFieldValue(name, selectedAssets)
    onChange && onChange(selectedAssets)
  }

  useEffect(
    () => {
      if (!fieldValueList || fieldValueList.length === 0) {
        const targetAssets = Array.isArray(target) ? target : [target]

        if (targetAssets.length > 0 && projects.length > 0) {
          const preSelected = projects.filter(item => {
            return targetAssets.some(t => t.value === item.slug)
          })

          selected(preSelected)
        }
      }
    },
    [target]
  )

  const close = () => {
    setOpen(false)
  }
  const open = () => setOpen(true)

  const onSuggestionSelect = project =>
    toggleAsset({
      project,
      listItems,
      isAssetInList: hasAssetById({ listItems, id: project.id })
    })

  const checkedAssetsAsSet = new Set(listItems)

  return (
    <Dialog
      showCloseBtn={false}
      title='Select assets'
      trigger={
        <div>
          <div className={styles.assetsSelect}>
            {
              <AssetsListDescription
                assets={listItems}
                onRemove={onSuggestionSelect}
              />
            }
          </div>
          {listItems.length === 0 && (
            <div className='error error-message'>Please, pick an asset(s)</div>
          )}
        </div>
      }
      onOpen={open}
      onClose={close}
      open={isOpen}
    >
      <Dialog.ScrollContent className={styles.wrapper}>
        <SearchProjects
          searchIconPosition='left'
          className={styles.search}
          projectsList={projects}
          suggestionsProps={{ style: { zIndex: 50 } }}
          checkedAssets={checkedAssetsAsSet}
          onSuggestionSelect={onSuggestionSelect}
        />
        <div className={styles.contentWrapper}>
          <ProjectsList
            classes={styles}
            isContained={true}
            items={listItems}
            onToggleProject={project => {
              toggleAsset({
                project,
                listItems,
                isAssetInList: true
              })
            }}
          />
          <div className={styles.divider} />
          <ProjectsList
            classes={styles}
            items={projects}
            onToggleProject={project => {
              toggleAsset({
                project,
                listItems,
                isAssetInList: false
              })
            }}
          />
        </div>
      </Dialog.ScrollContent>
    </Dialog>
  )
}

const AssetsListDescription = ({
  assets,
  label = 'Pick an asset(s)',
  onRemove
}) => {
  if (!assets || !assets.length) {
    return label
  }

  return (
    <div className={styles.assetGroup}>
      {assets.map(asset => {
        return (
          <span className={styles.asset} key={asset.id}>
            <span className={styles.name}>{asset.name}</span>
            <span className={styles.ticker}>{asset.ticker}</span>
            <Icon
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                onRemove(asset)
              }}
              type='close'
              className={styles.closeIcon}
            />
          </span>
        )
      })}
    </div>
  )
}
