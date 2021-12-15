import React, { useCallback, useMemo } from 'react'
import MetricButton from '../../../../../../../../Studio/Sidebar/Button'
import ExpansionItem from '../../../../../../../../../components/ExpansionItem/ExpansionItem'
import { NO_GROUP } from '../../constants'
import styles from './MetricCategory.module.scss'

const buttonProps = {
  tooltipPosition: 'top',
  btnClassName: styles.button,
  addIconClassName: styles.addIcon
}

const MetricCategory = ({ category, metricsList, project, onSelect }) => {
  const categoryKeys = useMemo(() => Object.keys(metricsList[category]), [
    metricsList,
    category
  ])
  const metrics = metricsList[category]

  const renderMetrics = useCallback(
    categories =>
      categories.map(({ item, subitems }) => {
        const children = (
          <MetricButton
            project={project}
            item={item}
            label={item.label}
            btnProps={buttonProps}
            onClick={() => onSelect(item)}
          />
        )

        if (subitems.length > 0) {
          return (
            <div key={item.key}>
              {children}
              <div className={styles.subitemsWrapper}>
                {subitems.map(subitem => (
                  <MetricButton
                    key={subitem.key}
                    project={project}
                    item={subitem}
                    label={subitem.label}
                    btnProps={buttonProps}
                    onClick={() => onSelect(subitem)}
                  />
                ))}
              </div>
            </div>
          )
        }

        return <div key={item.key}>{children}</div>
      }),
    [project]
  )

  const renderCategories = useCallback(
    () =>
      categoryKeys.map(categoryTitle => {
        if (categoryTitle === NO_GROUP) {
          return renderMetrics(metrics[categoryTitle])
        }

        return (
          <div key={categoryTitle}>
            <div className={styles.categoryTitle}>{categoryTitle}</div>
            {renderMetrics(metrics[categoryTitle])}
          </div>
        )
      }),
    [categoryKeys, metrics]
  )

  return (
    <ExpansionItem
      title={category}
      classes={{
        expansion: styles.expansionContainer,
        title: styles.expansionTitle,
        opened: styles.expansionOpened,
        arrow: styles.expansionIcon
      }}
      iconType='arrow-down'
    >
      <div className={styles.wrapper}>{renderCategories()}</div>
    </ExpansionItem>
  )
}

export default MetricCategory
