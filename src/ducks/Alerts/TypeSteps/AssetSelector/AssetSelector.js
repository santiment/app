import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'

import AssetIcon from '../../../../components/Illustrations/AssetIcon'
import SearchProjects from '../../../../components/Search/SearchProjects'
import ProjectsList from './ProjectsList/ProjectsList'

import { useAssets } from '../../../../hooks/project'
import { hasAssetById } from './utils'

import styles from './AssetSelector.module.scss'

const AssetSelector = ({
  handleFormValueChange,
  handleStepClick,
  initialValues
}) => {
  const [projects] = useAssets({
    shouldSkipLoggedInState: false
  })

  const [listItems, setListItems] = useState([])

  useEffect(() => {
    setListItems(initialValues)
  }, [])

  const checkedAssetsAsSet = useMemo(() => {
    return new Set(listItems)
  }, [listItems])

  const setSelectedAssets = useCallback(
    selected => {
      if (listItems.length !== selected.length) {
        handleFormValueChange({
          field: 'target',
          value: selected
        })
        setListItems(selected)

        if (selected.length === 0) {
          handleFormValueChange({
            field: 'target',
            value: []
          })
        }

        handleFormValueChange({
          field: 'metric',
          value: {}
        })
      }
    },
    [setListItems, listItems]
  )

  const toggleAsset = useCallback(
    ({ project, listItems: items, isAssetInList }) => {
      if (isAssetInList) {
        setSelectedAssets(items.filter(({ id }) => id !== project.id))
        handleFormValueChange({
          field: 'target',
          value: items.filter(({ id }) => id !== project.id)
        })
      } else {
        setSelectedAssets([...items, project])
      }
    },
    [setSelectedAssets, listItems]
  )

  const onSuggestionSelect = useCallback(
    project => {
      if (project) {
        const target = project.item ? project.item : project
        toggleAsset({
          project: target,
          listItems,
          isAssetInList: hasAssetById({ listItems, id: target.id })
        })
      }
    },
    [toggleAsset, listItems]
  )

  const sortedProjects = useMemo(() => {
    return projects
      .slice()
      .sort(({ rank: a }, { rank: b }) => (a || Infinity) - (b || Infinity))
  }, [projects])

  const filteredProjects = useMemo(
    () =>
      projects.filter(
        project => !listItems.map(item => item.id).includes(project.id)
      ),
    [listItems, projects]
  )

  const allProjects = useMemo(() => {
    return [...listItems, ...filteredProjects]
  }, [filteredProjects])

  const sections = useMemo(() => {
    if (listItems.length > 0) {
      return [
        {
          title: 'Selected',
          data: listItems
        },
        {
          title: 'Assets',
          data: filteredProjects
        }
      ]
    } else {
      return [
        {
          title: 'Assets',
          data: filteredProjects
        }
      ]
    }
  }, [filteredProjects])

  return (
    <>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>
          <AssetIcon className={styles.icon} />
          Select Asset
        </div>
        {listItems.length > 0 && (
          <Button
            onClick={handleStepClick(1)}
            className={styles.submit}
            accent='positive'
          >
            Choose Metric
            <Icon className={styles.submitIcon} type='pointer-right' />
          </Button>
        )}
      </div>
      <SearchProjects
        noTrends
        searchIconPosition='left'
        className={styles.search}
        projects={sortedProjects}
        suggestionsProps={{ style: { zIndex: 50 } }}
        checkedAssets={checkedAssetsAsSet}
        onSuggestionSelect={onSuggestionSelect}
        inputProps={{ autoFocus: true, placeholder: 'Search for asset' }}
      />
      <ProjectsList
        isContained
        classes={styles}
        listItems={listItems}
        items={allProjects}
        onToggleProject={toggleAsset}
        sections={sections}
      />
    </>
  )
}

export default AssetSelector
