import React from 'react'
import { connect } from 'react-redux'

import TemplatesGrid from '../../../components/TemplatesGrid/TemplatesGrid'
import styles from './../ProfilePage.module.scss'
const ProfileTemplates = ({ data: templates, isAuthor }) => {
  if (!templates || templates.length === 0) {
    return null
  }

  return (
    <div className={styles.block}>
      <TemplatesGrid templates={templates} isAuthor={isAuthor} />
    </div>
  )
}

const mapStateToProps = ({ user }, { userId }) => ({
  isAuthor: user && user.data ? +user.data.id === +userId : undefined
})

export default connect(mapStateToProps)(ProfileTemplates)
