import React, { useState, useEffect } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import SearchProjects from '../../../../../../components/Search/SearchProjects'
import { hasAssetById } from '../../../../../../components/WatchlistPopup/WatchlistsPopup'
import ProjectsList from './ProjectsList'
import Loader from '@santiment-network/ui/Loader/Loader'
import styles from './TriggerProjectsSelector.module.scss'

export const TriggerProjectsSelector = ({
  projects = [],
  setFieldValue,
  onChange,
  target,
  name,
  trigger: Trigger = ProjectsSelectorTrigger,
  title = 'Select assets',
  isSingle = false,
  isLoading = false
}) => {
  if (isLoading) {
    return <Loader className={styles.loader} />
  }

  const [listItems, setListItems] = useState([])
  const [opened, setOpened] = useState(false)
  const checkedAssetsAsSet = new Set(listItems)

  const closeDialog = () => {
    setOpened(false)
  }

  const openDialog = () => {
    setOpened(true)
  }

  useEffect(() => {
    function listenHotkey ({ target, ctrlKey, code }) {
      if (target === document.body && ctrlKey && code === 'KeyK') {
        openDialog()
      }
    }

    window.addEventListener('keypress', listenHotkey)
    return () => window.removeEventListener('keypress', listenHotkey)
  }, [])

  const validate = force => {
    const hasSelectedItems = listItems.length > 0
    if (force || !hasSelectedItems) {
      const targetAssets = Array.isArray(target) ? target : [target]

      if (targetAssets.length > 0 && projects.length > 0) {
        const preSelected = projects.filter(({ slug: projectSlug }) =>
          targetAssets.some(
            ({ value, slug }) => value === projectSlug || slug === projectSlug
          )
        )
        setSelectedAssets(preSelected)
      } else if (force) {
        setSelectedAssets([])
      }
    }

    if (!force) {
      const emptyTarget = Array.isArray(target) && target.length === 0
      if (emptyTarget && hasSelectedItems) {
        setSelectedAssets([])
      }
    }
  }

  useEffect(
    () => {
      validate()
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

    const isRemoving = newItems.length < listItems.length
    if (isSingle || isRemoving) {
      approve(newItems)
    }
  }

  const toggleAsset = ({ project, listItems: items, isAssetInList }) => {
    setSelectedAssets(
      isAssetInList
        ? items.filter(({ id }) => id !== project.id)
        : [...items, project]
    )
  }

  const cancel = () => {
    validate(true)
    setOpened(false)
  }

  const approve = selected => {
    setFieldValue && setFieldValue(name, selected)
    onChange && onChange(selected, closeDialog)
    closeDialog()
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
      open={opened}
      onClose={cancel}
      trigger={
        <div onClick={openDialog}>
          <Trigger
            listItems={listItems}
            onSuggestionSelect={onSuggestionSelect}
          />
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
          inputProps={{ autoFocus: true }}
          sorter={({ marketcapUsd: a }, { marketcapUsd: b }) => b - a}
        />
        <div className={styles.contentWrapper}>
          {isSingle || (
            <>
              <ProjectsList
                classes={styles}
                isContained={true}
                listItems={listItems}
                items={listItems}
                onToggleProject={toggleAsset}
              />
              <div className={styles.divider} />
            </>
          )}
          <ProjectsList
            classes={styles}
            listItems={listItems}
            items={projects}
            hideCheckboxes={isSingle}
            onToggleProject={toggleAsset}
          />
        </div>
      </Dialog.ScrollContent>
      {!isSingle && (
        <Dialog.Actions className={styles.actions}>
          <Dialog.Cancel border={false} accent='grey' onClick={cancel}>
            Cancel
          </Dialog.Cancel>
          <Dialog.Approve
            disabled={!listItems || listItems.length === 0}
            variant='flat'
            onClick={() => {
              approve(listItems)
            }}
            isLoading={isLoading}
          >
            Apply
          </Dialog.Approve>
        </Dialog.Actions>
      )}
    </Dialog>
  )
}

const ProjectsSelectorTrigger = ({ listItems, onSuggestionSelect }) => (
  <div>
    <div className={styles.assetsSelect}>
      <AssetsListDescription assets={listItems} onRemove={onSuggestionSelect} />
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
