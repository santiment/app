import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { convertToRaw } from 'draft-js'
import mediumDraftImporter from 'medium-draft/lib/importer'
import InsightEditorTitle from './InsightEditorTitle'
import InsightTags from '../../components/Insight/InsightTags'
import ProfileInfo from '../../components/Insight/ProfileInfo'
import Editor from './Editor'
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
          name={<Link to={`/insights-sonar/${id}`}>{username}</Link>}
          status={moment(createdAt).format('MMM D')}
        />
      </div>
      <InsightEditorTitle defaultValue={title} readOnly />
      <Editor
        readOnly
        defaultEditorContent={convertToRaw(mediumDraftImporter(text))}
      />
      <InsightTags tags={tags} />
    </Fragment>
  )
}

export default InsightViewPage
