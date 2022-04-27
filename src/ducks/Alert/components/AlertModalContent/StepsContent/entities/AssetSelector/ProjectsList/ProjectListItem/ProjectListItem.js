import React, { forwardRef } from 'react'
import cx from 'classnames'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import Label from '@santiment-network/ui/Label'
import { ProjectIcon } from '../../../../../../../../../components/ProjectIcon/ProjectIcon'
import styles from '../ProjectsList.module.scss'

const ProjectListItem = forwardRef(
  (
    {
      style,
      isSelectedItem,
      onToggleProject,
      item,
      listItems,
      isAssetInList,
      slug,
      logoUrl,
      name,
      ticker,
      isWords,
      isNightMode,
    },
    ref,
  ) => (
    <div ref={ref} style={style} className={cx(isSelectedItem && styles.selectedItem)}>
      <div
        className={styles.project}
        onClick={() => {
          onToggleProject({
            project: item,
            listItems,
            isAssetInList,
          })
        }}
      >
        <Checkbox isActive={isAssetInList} />
        <div className={styles.asset}>
          {!isWords && (
            <ProjectIcon
              className={styles.icon}
              size={16}
              slug={slug}
              logoUrl={logoUrl}
              isNightMode={isNightMode}
            />
          )}
          <span className={styles.name}>{isWords ? slug : name}</span>
          {!isWords && (
            <Label accent='waterloo' className={styles.label}>
              ({ticker})
            </Label>
          )}
        </div>
      </div>
    </div>
  ),
)

export default ProjectListItem
