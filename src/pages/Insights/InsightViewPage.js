import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Helmet } from 'react-helmet'
import { convertToRaw } from 'draft-js'
import mediumDraftImporter from 'medium-draft/lib/importer'
import InsightViewPageImageModalWrapper from './InsightViewPageImageModalWrapper'
import InsightEditorTitle from '../../components/Insight/InsightEditor/InsightEditorTitle'
import InsightTags from '../../components/Insight/InsightTags'
import ProfileInfo from '../../components/Insight/ProfileInfo'
import Editor from '../../components/Editor/Editor'
import { getInsightContent } from './utils'
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
      <Helmet>
        <title>Community Insight: {title} - SANbase</title>
        <meta
          property='og:title'
          content={`Community Insight: ${title} - SANbase`}
        />
        <meta
          property='og:description'
          content={getInsightContent(text).slice(0, 140)}
        />
      </Helmet>
      <div className={styles.top}>
        <ProfileInfo
          className={styles.profile}
          name={<Link to={`/insights/users/${id}`}>{username}</Link>}
          status={moment(createdAt).format('MMM D, YYYY')}
        />
      </div>
      <InsightEditorTitle defaultValue={title} readOnly />
      <InsightViewPageImageModalWrapper>
        <Editor
          readOnly
          defaultEditorContent={convertToRaw(mediumDraftImporter(text))}
        />
      </InsightViewPageImageModalWrapper>
      <div className={styles.tags}>
        <InsightTags tags={tags} />
      </div>
    </Fragment>
  )
}

export default InsightViewPage
