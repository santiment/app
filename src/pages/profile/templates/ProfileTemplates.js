import React from 'react'
import TemplatesGrid from '../../../components/TemplatesGrid/TemplatesGrid'
import styles from './../ProfilePage.module.scss'

const ProfileTemplates = ({ data: templates }) => {
  if (!templates || templates.length === 0) {
    return null
  }

  return (
    <div className={styles.block}>
      <TemplatesGrid templates={templates} />
    </div>
  )
}

export default ProfileTemplates
