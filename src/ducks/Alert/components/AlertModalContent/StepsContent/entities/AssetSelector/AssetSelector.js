import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useField } from 'formik'
import { InputWithIcon } from '@santiment-network/ui/Input'
import PageLoader from '../../../../../../../components/Loader/PageLoader'
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
  },
  isSocial,
  isWords
}) => {
  const [, { value }, { setValue: setSlug }] = useField(
    isWords ? 'settings.target.word' : 'settings.target.slug'
  )
  const [, , { setValue: setMetric }] = useField('settings.metric')
  const [, , { setValue: setTimeWindow }] = useField('settings.time_window')
  const [, , { setValue: setOperation }] = useField('settings.operation')
  const [projects, loading] = useAssets({
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

        if (!isSocial) {
          setMetric('')
          setTimeWindow('')
          setOperation({})
        }
      }
    },
    [setListItems, listItems, isWords]
  )

  const toggleAsset = useCallback(
    ({ project, listItems: items, isAssetInList }) => {
      if (isAssetInList) {
        const filteredAssets = items.filter(({ id }) => id !== project.id)
        const selectedAssets = filteredAssets.map(item => item.slug)

        setSelectedAssets(filteredAssets)
        setSlug(
          selectedAssets.length === 1 ? selectedAssets[0] : selectedAssets
        )
      } else {
        setSelectedAssets([...items, project])
      }
    },
    [setSelectedAssets, listItems]
  )

  const listItemsIds = useMemo(() => new Set(listItems.map(item => item.id)), [
    listItems
  ])

  const filteredProjects = useMemo(
    () =>
      projects.filter(
        project =>
          project.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 &&
          !listItemsIds.has(project.id)
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
          title: isWords ? 'Most popular' : 'Assets',
          data: filteredProjects
        }
      ]
    } else {
      return [
        {
          title: isWords ? 'Most popular' : 'Assets',
          data: filteredProjects
        }
      ]
    }
  }, [filteredProjects, isWords])

  function handleNextClick () {
    setSelectedStep(selectedStep + 1)

    if (!visitedSteps.has(selectedStep + 1)) {
      setVisitedSteps(prev => [...prev, selectedStep + 1])
    }
  }

  let children = (
    <>
      {!isSocial && !isWords && (
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
      )}
      <InputWithIcon
        type='text'
        icon='search-small'
        iconPosition='left'
        className={styles.search}
        placeholder={
          isWords ? 'Type a word or choose from bellow' : 'Search for asset'
        }
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ProjectsList
        isWords={isWords}
        isSocial={isSocial}
        classes={styles}
        listItems={listItems}
        listItemsIds={listItemsIds}
        items={allProjects}
        onToggleProject={toggleAsset}
        sections={sections}
        searchTerm={searchTerm}
      />
    </>
  )

  if (loading) {
    children = (
      <PageLoader
        containerClass={styles.loaderWrapper}
        className={styles.loader}
      />
    )
  }

  return <div className={styles.wrapper}>{children}</div>
}

export default AssetSelector
