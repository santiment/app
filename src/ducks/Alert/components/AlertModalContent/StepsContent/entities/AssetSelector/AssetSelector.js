import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useField } from 'formik'
import cx from 'classnames'
import Search from '@santiment-network/ui/Search'
import ProjectsSelectTabs from '../../../../../../Studio/Compare/ProjectSelectTabs'
import NextStep from '../../NextStep/NextStep'
import StepTitle from '../../StepTitle/StepTitle'
import ProjectsList from './ProjectsList/ProjectsList'
import { useTrendingWords } from '../../../../../../TrendsTable/hooks'
import styles from './AssetSelector.module.scss'
import { PROJECTS_QUERY, useProjects } from '../../../../../../../stores/projects'

const AssetSelector = ({
  selectorSettings: { setSelectedStep, selectedStep, visitedSteps, setVisitedSteps },
  isSocial,
  isWords,
}) => {
  const [, { value }, { setValue: setSlug }] = useField(
    isWords ? 'settings.target.word' : 'settings.target.slug',
  )
  const [, , { setValue: setMetric }] = useField('settings.metric')
  const [, , { setValue: setTimeWindow }] = useField('settings.time_window')
  const [, , { setValue: setOperation }] = useField('settings.operation')
  const { projects: allFetchedProjects } = useProjects(PROJECTS_QUERY, {
    skip: !isWords,
  })
  const [projects, setProjects] = useState([])
  const { trendingWords } = useTrendingWords({
    from: 'utc_now-7d',
    to: 'utc_now',
    interval: '1h',
  })
  const [listItems, setListItems] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const words = useMemo(() => {
    return trendingWords.map((item) => ({
      id: item.word,
      slug: item.word,
      name: item.word,
    }))
  }, [trendingWords])

  useEffect(() => {
    if (isWords) {
      setProjects(allFetchedProjects)
    }
  }, [isWords, allFetchedProjects])

  useEffect(() => {
    if (value && value.length > 0 && projects && projects.length > 0) {
      const wordAsset = words.find((item) => item.slug === value) || {
        id: value,
        slug: value,
        name: value,
      }

      let assets =
        typeof value === 'string'
          ? [
              isWords
                ? projects.find((project) => project.slug === value) || wordAsset
                : projects.find((project) => project.slug === value),
            ]
          : value.map((item) => {
              const wordAssetItem = words.find((word) => word.slug === value) || {
                id: item,
                slug: item,
                name: item,
              }

              return isWords
                ? projects.find((project) => project.slug === item) || wordAssetItem
                : projects.find((project) => project.slug === item)
            })
      setListItems([...assets])
    }
  }, [projects, words])

  const setSelectedAssets = useCallback(
    (selected) => {
      if (listItems.length !== selected.length) {
        if (selected.length === 0) {
          setSlug('')
          setListItems([])
        } else {
          const selectedAssets = selected.map((item) => item.slug)
          setSlug(selectedAssets.length === 1 ? selectedAssets[0] : selectedAssets)
          setListItems(selected)
        }

        if (!isSocial) {
          setMetric('')
          setTimeWindow('')
          setOperation({})
        }
      }
    },
    [setListItems, listItems, isWords],
  )

  const toggleAsset = useCallback(
    ({ project, listItems: items, isAssetInList }) => {
      if (isAssetInList) {
        const filteredAssets = items.filter(({ id }) => id !== project.id)
        setSelectedAssets(filteredAssets)
      } else {
        setSelectedAssets([...items, project])
      }
    },
    [setSelectedAssets, listItems],
  )

  const listItemsIds = useMemo(() => new Set(listItems.map((item) => item.id)), [listItems])

  const filteredProjects = useMemo(
    () =>
      projects.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !listItemsIds.has(project.id),
      ),
    [listItems, projects, searchTerm],
  )

  const filteredWords = useMemo(() => {
    if (!isWords) {
      return []
    }
    return words.filter(
      (word) =>
        word.name.toLowerCase().includes(searchTerm.toLowerCase()) && !listItemsIds.has(word.id),
    )
  }, [listItems, words, searchTerm])

<<<<<<< HEAD
  const allProjects = useMemo(() => [...listItems, ...filteredWords, ...filteredProjects], [
    filteredProjects,
    filteredWords,
  ])
=======
  const allProjects = useMemo(
    () => [...listItems, ...filteredWords, ...filteredProjects],
    [filteredProjects, filteredWords],
  )
>>>>>>> master

  const filteredListItems = useMemo(
    () => listItems.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [searchTerm, listItems],
  )

  const sections = useMemo(() => {
    if (filteredListItems.length > 0) {
      return [
        {
          title: 'Selected',
          data: filteredListItems,
        },
        {
          title: isWords ? 'Most popular' : 'Assets',
          data: isWords ? [...filteredWords, ...filteredProjects] : filteredProjects,
        },
      ]
    } else {
      return [
        {
          title: isWords ? 'Most popular' : 'Assets',
          data: isWords ? [...filteredWords, ...filteredProjects] : filteredProjects,
        },
      ]
    }
  }, [filteredProjects, filteredWords, filteredListItems, isWords])

  function handleNextClick() {
    setSelectedStep(selectedStep + 1)

    if (!visitedSteps.has(selectedStep + 1)) {
      setVisitedSteps((prev) => [...prev, selectedStep + 1])
    }
  }

  function handlePressEnter(e) {
    if (e.key === 'Enter' && isWords) {
      e.preventDefault()
      toggleAsset({
        project: {
          id: searchTerm,
          slug: searchTerm,
          name: searchTerm,
        },
        listItems,
        isAssetInList: listItemsIds.has(searchTerm),
      })

      setSearchTerm('')
    }
  }

  function onTabSelect(projects, isLoading) {
    if (!projects || isLoading) {
      return
    }
    setSelectedAssets([])
    setProjects(projects)
  }

  let children = (
    <>
      {!isSocial && !isWords && (
        <div className={styles.titleWrapper}>
          <StepTitle title='Select Asset' className={styles.title} />
          {listItems.length > 0 && <NextStep label='Choose Metric' onClick={handleNextClick} />}
        </div>
      )}
      <Search
        type='text'
        className={cx(styles.search, isWords && styles.searchWithWords)}
        placeholder={
          isWords ? 'Type a word and press Enter or choose from bellow' : 'Search for asset'
        }
        value={searchTerm}
        onChange={(value) => setSearchTerm(value)}
        onKeyPress={handlePressEnter}
      />
      {!isWords && <ProjectsSelectTabs onSelect={onTabSelect} className={styles.tabs} />}
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

  return <div className={styles.wrapper}>{children}</div>
}

export default AssetSelector
