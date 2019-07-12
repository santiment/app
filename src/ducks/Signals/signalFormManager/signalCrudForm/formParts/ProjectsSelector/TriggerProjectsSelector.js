import React, { useState, useEffect } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import SearchProjects from '../../../../../../components/Search/SearchProjects'
import AssetsList from '../../../../../../components/WatchlistEdit/AssetsList'
import { hasAssetById } from '../../../../../../components/WatchlistPopup/WatchlistsPopup'
import styles from './TriggerProjectsSelector.module.scss'

export const TriggerProjectsSelector = ({
  projects = [],
  setFieldValue,
  metaFormSettings,
  values: { trendingWordsWithAssets, target },
  name
}) => {
  const [isOpen, setOpen] = useState(false)

  const [listItems, setListItems] = useState([])

  const toggleAsset = ({ project, listItems, isAssetInList }) => {
    setListItems(
      isAssetInList
        ? listItems.filter(({ id }) => id !== project.id)
        : [...listItems, project]
    )

    setFieldValue(name, listItems)
  }

  useEffect(() => {
    if (
      (!trendingWordsWithAssets || trendingWordsWithAssets.length === 0) &&
      target.length > 0 &&
      projects.length > 0
    ) {
      const preSelected = projects.filter(item => {
        return target.some(t => t.value === item.slug)
      })

      setListItems(preSelected)
      setFieldValue(name, preSelected)
    }
  })

  const close = () => {
    setOpen(false)
  }
  const open = () => setOpen(true)
  const applyChanges = () => {
    setFieldValue(name, listItems)
    close()
  }

  const checkedAssetsAsSet = new Set(listItems)

  return (
    <Dialog
      title='Select assets'
      trigger={
        <div className={styles.assetsSelect}>
          {<AssetsListDescription assets={listItems} />}
        </div>
      }
      onOpen={open}
      onClose={close}
      open={isOpen}
      showCloseBtn={true}
    >
      <Dialog.ScrollContent className={styles.wrapper}>
        <SearchProjects
          className={styles.search}
          projectsList={projects}
          suggestionsProps={{ style: { zIndex: 50 } }}
          checkedAssets={checkedAssetsAsSet}
          onSuggestionSelect={project =>
            toggleAsset({
              project,
              listItems,
              isAssetInList: hasAssetById({ listItems, id: project.id })
            })
          }
        />
        <div className={styles.contentWrapper}>
          <AssetsList
            height={200}
            classes={styles}
            isContained={true}
            items={listItems}
            listItems={listItems}
            onToggleProject={toggleAsset}
          />
          <div className={styles.divider} />
          <AssetsList
            height={200}
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
        <Dialog.Approve
          disabled={listItems.length === 0}
          variant='flat'
          onClick={applyChanges}
        >
          Apply
        </Dialog.Approve>
      </Dialog.Actions>
    </Dialog>
  )
}

const AssetsListDescription = ({ assets, label = 'Pick an asset(s)' }) => {
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
          </span>
        )
      })}
    </div>
  )
}
