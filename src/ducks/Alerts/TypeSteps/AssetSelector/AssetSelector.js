import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'

import AssetIcon from '../../../../components/Illustrations/AssetIcon'
import SearchProjects from '../../../../components/Search/SearchProjects'
import ProjectsList from './ProjectsList/ProjectsList'

import { useAssets } from '../../../../hooks/project'
import { hasAssetById } from './utils'
import {
  getNearestTypeByMetric,
  getNewDescription,
  getNewTitle,
  titleMetricValuesHeader
} from '../../../Signals/utils/utils'
import { PRICE_METRIC } from '../../../Signals/utils/constants'

import styles from './AssetSelector.module.scss'

function getLastWord (words) {
  const wordsArr = words.split(' ')
  return wordsArr[wordsArr.length - 1]
}

const AssetSelector = ({
  handleFormValueChange,
  handleStepClick,
  initialValues,
  values
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

      if (selected.length !== 0) {
        const type = getNearestTypeByMetric(PRICE_METRIC)
        handleFormValueChange({
          field: 'metric',
          value: PRICE_METRIC
        })
        handleFormValueChange({
          field: 'type',
          value: type
        })
        const subtitle = titleMetricValuesHeader(
          !!type.dependencies,
          {
            ...values,
            target: selected,
            metric: PRICE_METRIC,
            type
          },
          `of ${selected.map(item => item.name).join(', ')}`
        )
        handleFormValueChange({
          field: 'title',
          value: getNewTitle({
            ...values,
            target: selected,
            metric: PRICE_METRIC,
            type
          })
        })
        handleFormValueChange({
          field: 'description',
          value: getNewDescription({
            ...values,
            target: selected,
            metric: PRICE_METRIC,
            type
          })
        })
        handleFormValueChange({
          field: 'subtitle',
          value: subtitle
            ? {
                first: subtitle.titleLabel && getLastWord(subtitle.titleLabel),
                last: subtitle.titleDescription
              }
            : {}
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
