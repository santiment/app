import React from 'react'
import NoEntries from '../../../components/EmptySection/NoEntries'
import TemplatesGrid from '../../../components/TemplatesGrid/TemplatesGrid'
import styles from './../ProfilePage.module.scss'

const ProfileTemplates = ({ data: templates, isOwner }) => {
  if (!templates || templates.length === 0) {
    return (
      <NoEntries
        title={isOwner && 'No Chart Layouts yet'}
        desc={!isOwner && "This user doesn't have any chart layouts yet"}
      />
    )
  }

  return (
    <div className={styles.block}>
      <TemplatesGrid templates={templates} />
    </div>
  )
}

export default ProfileTemplates
