import React, { useState, useMemo, useEffect } from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import Category from '../Category'
import Group from '../Group'
import MetricButton from '../Button'
import { NO_GROUP } from '../utils'
import { rebuildDescriptions } from '../../../dataHub/metrics/descriptions'
import {
  useFavoriteMetrics,
  mutateFavoriteMetrics
} from '../../../../stores/user/metrics'
import styles from '../Button/index.module.scss'

const convertMetricToSidebarItem = item => ({ item })

const SortableItem = SortableElement(props => <MetricButton {...props} />)

const SortableList = SortableContainer(props => (
  <Group {...props} Button={SortableItem} />
))

const SortableGroup = ({ onDragEnd, onDragStart, ...props }) => (
  <SortableList
    {...props}
    axis='y'
    distance={10}
    helperClass={styles.dragged}
    onSortStart={onDragStart}
    onSortEnd={onDragEnd}
  />
)

const MetricSelector = ({
  categories = {},
  availableMetrics,
  setIsDraggingMetric,
  ...props
}) => {
  const { Submetrics } = props
  const { favoriteMetrics } = useFavoriteMetrics()
  const [favorites, setFavorites] = useState(favoriteMetrics)

  const favoritesGroup = useMemo(
    () => ({ [NO_GROUP]: favorites.map(convertMetricToSidebarItem) }),
    [favorites]
  )

  useEffect(() => setFavorites(favoriteMetrics), [favoriteMetrics])

  useEffect(
    () => {
      rebuildDescriptions(Submetrics)
    },
    [Submetrics]
  )

  function onDragEnd ({ oldIndex, newIndex }) {
    const newFavoriteMetrics = favoriteMetrics.slice()
    newFavoriteMetrics.splice(oldIndex, 1)
    newFavoriteMetrics.splice(newIndex, 0, favoriteMetrics[oldIndex])

    mutateFavoriteMetrics(newFavoriteMetrics)
    setFavorites(newFavoriteMetrics)
    setIsDraggingMetric(false)
  }

  return (
    <>
      {favoriteMetrics.length ? (
        <Category
          title='Favorites'
          groups={favoritesGroup}
          {...props}
          GroupNode={SortableGroup}
          onDragEnd={onDragEnd}
          onDragStart={() => setIsDraggingMetric(true)}
        />
      ) : null}

      {Object.keys(categories).map(key => (
        <Category key={key} title={key} groups={categories[key]} {...props} />
      ))}
    </>
  )
}

export default MetricSelector
