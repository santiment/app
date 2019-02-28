import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { convertToRaw } from 'draft-js'
import mediumDraftImporter from 'medium-draft/lib/importer'
import InsightEditorTitle from './InsightEditor/InsightEditorTitle'
import InsightTags from '../../components/Insight/InsightTags'
import ProfileInfo from '../../components/Insight/ProfileInfo'
import Editor from './Editor/Editor'
import styles from './InsightViewPage.module.scss'

const InsightViewPage = ({
  user: { id, username },
  title,
  text,
  tags,
  createdAt
}) => {
  return (
    <Fragment>
      <div className={styles.top}>
        <ProfileInfo
          className={styles.profile}
          name={<Link to={`/insights/users/${id}`}>{username}</Link>}
          status={moment(createdAt).format('MMM D, YYYY')}
        />
      </div>
      <InsightEditorTitle defaultValue={title} readOnly />
      <Editor
        readOnly
        defaultEditorContent={convertToRaw(mediumDraftImporter(text))}
      />
      <div className={styles.tags}>
        <InsightTags tags={tags} />
      </div>
    </Fragment>
  )
}

export default InsightViewPage
