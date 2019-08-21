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
  target,
  name,
  trigger: Trigger = ProjectsSelectorTrigger,
  title = 'Select assets',
  isSingle = false
}) => {
  const [listItems, setListItems] = useState([])
  const checkedAssetsAsSet = new Set(listItems)

  useEffect(
    () => {
      if (listItems.length === 0) {
        const targetAssets = Array.isArray(target) ? target : [target]

        if (targetAssets.length > 0 && projects.length > 0) {
          const preSelected = projects.filter(({ slug: projectSlug }) =>
            targetAssets.some(
              ({ value, slug }) => value === projectSlug || slug === projectSlug
            )
          )
          setSelectedAssets(preSelected)
        }
      }

      if (
        Array.isArray(target) &&
        target.length === 0 &&
        listItems.length > 0
      ) {
        setSelectedAssets([])
      }
    },
    [target, projects]
  )

  const setSelectedAssets = selectedAssets => {
    const newItems =
      isSingle && selectedAssets.length > 0
        ? [selectedAssets[selectedAssets.length - 1]]
        : selectedAssets

    if (isSingle) {
      setListItems(newItems)
    } else if (listItems.length !== newItems.length) {
      setListItems(newItems)
    }

    setFieldValue && setFieldValue(name, newItems)
    onChange && onChange(newItems)
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
      title={title}
      trigger={
        <Trigger
          listItems={listItems}
          onSuggestionSelect={onSuggestionSelect}
        />
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

const ProjectsSelectorTrigger = ({ listItems, onSuggestionSelect }) => (
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
)

const AssetsListDescription = ({
  assets,
  label = 'Pick an asset(s)',
  onRemove
}) => {
  if (!assets || !assets.length) {
    return <div className={styles.label}>{label}</div>
  }

  return (
    <div className={styles.assetGroup}>
      {assets.map(asset => {
        const { id, name } = asset
        return (
          <span className={styles.asset} key={id}>
            <span className={styles.name}>{name}</span>
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
