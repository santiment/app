import React from 'react'
import NoEntries from '../../../components/EmptySection/NoEntries'
import TemplatesGrid from '../../../components/TemplatesGrid/TemplatesGrid'
import styles from './../ProfilePage.module.scss'

const ProfileTemplates = ({ data: templates, isOwner }) => {
  if (!templates || templates.length === 0) {
    return (
      <NoEntries
        maxWidth='400px'
        title={isOwner && 'No Chart Layouts yet'}
        desc={
          isOwner
            ? " Use Charts to find divergences in Santiment's on-chain and social metrics to find ideal tops and bottoms"
            : "This user doesn't have any chart layouts yet"
        }
      >
        {isOwner && (
          <a href='/charts' className='btn-1 body-3'>
            Add Chart Layout
          </a>
        )}
      </NoEntries>
    )
  }

  return (
    <div className={styles.block}>
      <TemplatesGrid templates={templates} />
    </div>
  )
}

export default ProfileTemplates
