import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useField } from 'formik'
import { InputWithIcon } from '@santiment-network/ui/Input'
import PageLoader from '../../../../../../../components/Loader/PageLoader'
import NextStep from '../../NextStep/NextStep'
import StepTitle from '../../StepTitle/StepTitle'
import ProjectsList from './ProjectsList/ProjectsList'
import { useAssets } from '../../../../../../../hooks/project'
import { useTrendingWords } from '../../../../../../../components/Navbar/Search/TrendingWordsCategory'
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
  const trendingWords = useTrendingWords({ skip: !isWords })
  const [listItems, setListItems] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const words = useMemo(() => {
    return trendingWords.map(item => ({
      id: item.word,
      slug: item.word,
      name: item.word
    }))
  }, [trendingWords])

  useEffect(() => {
    if (value && value.length > 0) {
      let assets =
        typeof value === 'string'
          ? [
              projects.find(project => project.slug === value) ||
                words.find(item => item.slug === value) || {
                  id: value,
                  slug: value,
                  name: value
                }
            ]
          : value.map(
              item =>
                projects.find(project => project.slug === item) ||
                words.find(word => word.slug === value) || {
                  id: item,
                  slug: item,
                  name: item
                }
            )
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

  const filteredWords = useMemo(() => {
    if (!isWords) {
      return []
    }
    return words.filter(
      word =>
        word.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 &&
        !listItemsIds.has(word.id)
    )
  }, [listItems, words, searchTerm])

  const allProjects = useMemo(
    () => [...listItems, ...filteredWords, ...filteredProjects],
    [filteredProjects, filteredWords]
  )

  const sections = useMemo(() => {
    if (listItems.length > 0) {
      return [
        {
          title: 'Selected',
          data: listItems
        },
        {
          title: isWords ? 'Most popular' : 'Assets',
          data: isWords
            ? [...filteredWords, ...filteredProjects]
            : filteredProjects
        }
      ]
    } else {
      return [
        {
          title: isWords ? 'Most popular' : 'Assets',
          data: isWords
            ? [...filteredWords, ...filteredProjects]
            : filteredProjects
        }
      ]
    }
  }, [filteredProjects, filteredWords, isWords])

  function handleNextClick () {
    setSelectedStep(selectedStep + 1)

    if (!visitedSteps.has(selectedStep + 1)) {
      setVisitedSteps(prev => [...prev, selectedStep + 1])
    }
  }

  function handlePressEnter (e) {
    if (e.key === 'Enter' && isWords) {
      e.preventDefault()
      toggleAsset({
        project: {
          id: searchTerm,
          slug: searchTerm,
          name: searchTerm
        },
        listItems,
        isAssetInList: listItemsIds.has(searchTerm)
      })

      setSearchTerm('')
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
          isWords
            ? 'Type a word and press Enter or choose from bellow'
            : 'Search for asset'
        }
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onKeyPress={handlePressEnter}
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
