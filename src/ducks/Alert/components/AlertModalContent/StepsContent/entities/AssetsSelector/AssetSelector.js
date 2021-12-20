import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useField } from 'formik'
import { InputWithIcon } from '@santiment-network/ui/Input'
import NextStep from '../../NextStep/NextStep'
import StepTitle from '../../StepTitle/StepTitle'
import ProjectsList from './ProjectsList/ProjectsList'
import { useAssets } from '../../../../../../../hooks/project'
import styles from './AssetSelector.module.scss'

const AssetSelector = ({
  selectorSettings: {
    setSelectedStep,
    selectedStep,
    visitedSteps,
    setVisitedSteps
  }
}) => {
  const [, { value }, { setValue: setSlug }] = useField('settings.target.slug')
  const [, , { setValue: setMetric }] = useField('settings.metric')
  const [projects] = useAssets({
    shouldSkipLoggedInState: false
  })
  const [listItems, setListItems] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (value && value.length > 0) {
      const assets =
        typeof value === 'string'
          ? [projects.find(project => project.slug === value)]
          : value.map(item => projects.find(project => project.slug === item))
      setListItems([...assets])
    }
  }, [])

  const setSelectedAssets = useCallback(
    selected => {
      if (listItems.length !== selected.length) {
        const selectedAssets = selected.map(item => item.slug)
        setSlug(
          selectedAssets.length === 1 ? selectedAssets[0] : selectedAssets
        )
        setListItems(selected)

        if (selected.length === 0) {
          setSlug('')
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
        const selectedAssets = items
          .filter(({ id }) => id !== project.id)
          .map(item => item.slug)

        setSelectedAssets(items.filter(({ id }) => id !== project.id))
        setSlug(
          selectedAssets.length === 1 ? selectedAssets[0] : selectedAssets
        )
      } else {
        setSelectedAssets([...items, project])
      }
    },
    [setSelectedAssets, listItems]
  )

  const filteredProjects = useMemo(
    () =>
      projects.filter(
        project =>
          project.name.toLowerCase().indexOf(searchTerm) !== -1 &&
          !listItems.map(item => item.id).includes(project.id)
      ),
    [listItems, projects, searchTerm]
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
  }, [filteredProjects, listItems])

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
      <InputWithIcon
        type='text'
        icon='search-small'
        iconPosition='left'
        className={styles.search}
        placeholder='Search for asset'
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
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
