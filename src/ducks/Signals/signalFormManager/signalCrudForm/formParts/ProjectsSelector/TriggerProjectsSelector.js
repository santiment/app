import React, { useState, useEffect } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import Icon from '@santiment-network/ui/Icon'
import SearchProjects from '../../../../../../components/Search/SearchProjects'
import AssetsList from '../../../../../../components/WatchlistEdit/AssetsList'
import { hasAssetById } from '../../../../../../components/WatchlistPopup/WatchlistsPopup'
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
  const applyChanges = () => {
    selected(listItems)
    close()
  }
  const onSuggestionSelect = project =>
    toggleAsset({
      project,
      listItems,
      isAssetInList: hasAssetById({ listItems, id: project.id })
    })

  const checkedAssetsAsSet = new Set(listItems)

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
      onOpen={open}
      onClose={close}
      open={isOpen}
      showCloseBtn={true}
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
          <AssetsList
            classes={styles}
            isContained={true}
            items={listItems}
            listItems={listItems}
            onToggleProject={toggleAsset}
          />
          <div className={styles.divider} />
          <AssetsList
            classes={styles}
            items={projects}
            listItems={listItems}
            onToggleProject={toggleAsset}
          />
        </div>
      </Dialog.ScrollContent>
      <Dialog.Actions className={styles.actions}>
        <Dialog.Cancel border={false} accent='grey' onClick={close}>
          Cancel
        </Dialog.Cancel>
        <Dialog.Approve variant='flat' onClick={applyChanges}>
          Apply
        </Dialog.Approve>
      </Dialog.Actions>
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
