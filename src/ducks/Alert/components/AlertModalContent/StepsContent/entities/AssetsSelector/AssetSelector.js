import React, { useCallback, useMemo, useState } from 'react'
import { useField } from 'formik'
import SearchProjects from '../../../../../../../components/Search/SearchProjects'
import NextStep from '../../NextStep/NextStep'
import StepTitle from '../../StepTitle/StepTitle'
import ProjectsList from './ProjectsList/ProjectsList'
import { useAssets } from '../../../../../../../hooks/project'
import { hasAssetById } from './utils'
import styles from './AssetSelector.module.scss'

const AssetSelector = ({
  selectorSettings: {
    setSelectedStep,
    selectedStep,
    visitedSteps,
    setVisitedSteps
  }
}) => {
  const [, , { setValue: setSlug }] = useField('settings.target.slug')
  const [, , { setValue: setMetric }] = useField('settings.metric')
  const [projects] = useAssets({
    shouldSkipLoggedInState: false
  })
  const [listItems, setListItems] = useState([])

  const checkedAssetsAsSet = useMemo(() => {
    return new Set(listItems)
  }, [listItems])

  const setSelectedAssets = useCallback(
    selected => {
      if (listItems.length !== selected.length) {
        setSlug(selected)
        setListItems(selected)

        if (selected.length === 0) {
          setSlug([])
          setListItems([])
        }

        setMetric('')
      }
    },
    [setListItems, listItems]
  )

  const toggleAsset = useCallback(
    ({ project, listItems: items, isAssetInList }) => {
      if (isAssetInList) {
        setSelectedAssets(items.filter(({ id }) => id !== project.id))
        setSlug(items.filter(({ id }) => id !== project.id))
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

  function handleNextClick () {
    setSelectedStep(selectedStep + 1)

    if (!visitedSteps.has(selectedStep + 1)) {
      setVisitedSteps(prev => [...prev, selectedStep + 1])
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <StepTitle
          iconType='assets'
          title='Select Asset'
          className={styles.title}
        />
        {listItems.length > 0 && (
          <NextStep label='Choose Metric' onClick={handleNextClick} />
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
    </div>
  )
}

export default AssetSelector
