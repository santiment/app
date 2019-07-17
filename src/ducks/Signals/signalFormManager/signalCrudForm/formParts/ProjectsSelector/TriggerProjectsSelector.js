import React, { useState, useEffect } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
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
  const [listItems, setListItems] = useState([])
  const checkedAssetsAsSet = new Set(listItems)

  useEffect(
    () => {
      if (!fieldValueList || fieldValueList.length === 0) {
        const targetAssets = Array.isArray(target) ? target : [target]

        if (targetAssets.length > 0 && projects.length > 0) {
          const preSelected = projects.filter(({ slug }) =>
            targetAssets.some(({ value }) => value === slug)
          )
          setSelectedAssets(preSelected)
        }
      }
    },
    [target]
  )

  const setSelectedAssets = selectedAssets => {
    listItems.length !== selectedAssets.length && setListItems(selectedAssets)
    setFieldValue(name, selectedAssets)
    onChange && onChange(selectedAssets)
  }

  const toggleAsset = ({ project, listItems: items, isAssetInList }) => {
    setSelectedAssets(
      isAssetInList
        ? items.filter(({ id }) => id !== project.id)
        : [...items, project]
    )
  }

  const onSuggestionSelect = project =>
    toggleAsset({
      project,
      listItems,
      isAssetInList: hasAssetById({ listItems, id: project.id })
    })

  return (
    <Dialog
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
            listItems={listItems}
            items={listItems}
            onToggleProject={toggleAsset}
          />
          <div className={styles.divider} />
          <ProjectsList
            classes={styles}
            listItems={listItems}
            items={projects}
            onToggleProject={toggleAsset}
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
        const { id, name, ticker } = asset
        return (
          <span className={styles.asset} key={id}>
            <span className={styles.name}>{name}</span>
            <span className={styles.ticker}>{ticker}</span>
            <Button
              type='button'
              className={styles.close}
              onClick={e => {
                e.stopPropagation()
                onRemove(asset)
              }}
            >
              <Icon type='close' className={styles.closeIcon} />
            </Button>
          </span>
        )
      })}
    </div>
  )
}
