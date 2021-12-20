import React, { forwardRef } from 'react'
import cx from 'classnames'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import Label from '@santiment-network/ui/Label'
import { ProjectIcon } from '../../../../../../../../../components/ProjectIcon/ProjectIcon'
import { formatTokensCount } from '../../../../../../../../../utils/formatting'
import styles from '../ProjectsList.module.scss'

const ProjectListItem = forwardRef(
  (
    {
      style,
      isSelectedItem,
      isLast,
      onToggleProject,
      item,
      listItems,
      isAssetInList,
      hideCheckboxes,
      isContained,
      slug,
      logoUrl,
      name,
      balance,
      ticker
    },
    ref
  ) => (
    <div
      ref={ref}
      style={style}
      className={cx(isSelectedItem && styles.selectedItem)}
    >
      <div
        className={cx(styles.project, !isLast && styles.projectPadding)}
        onClick={() => {
          onToggleProject({
            project: item,
            listItems,
            isAssetInList
          })
        }}
      >
        {!hideCheckboxes && (
          <Checkbox
            isActive={isAssetInList}
            disabled={isContained ? false : isAssetInList}
          />
        )}
        <div
          className={cx(
            styles.asset,
            !isContained && isAssetInList && styles.disabled
          )}
        >
          <ProjectIcon
            className={styles.icon}
            size={16}
            slug={slug}
            logoUrl={logoUrl}
          />
          <span className={styles.name}>{name}</span>
          <Label accent='waterloo'>
            (
            {balance >= 0 && (
              <Label className={styles.balance}>
                {formatTokensCount(balance)}
              </Label>
            )}
            {ticker})
          </Label>
        </div>
      </div>
    </div>
  )
)

export default ProjectListItem
