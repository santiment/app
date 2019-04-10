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
import WithLikesMutation from '../../components/Like/WithLikesMutation'
import LikeBtn from '../../components/Like/LikeBtn'
import ShareModalTrigger from '../../components/Share/ShareModalTrigger'
import { getInsightContent } from './utils'
import styles from './InsightViewPage.module.scss'

const InsightViewPage = ({
  id,
  user: { id: userId, username },
  title,
  text,
  tags,
  createdAt,
  votedAt,
  votes: { totalVotes }
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
          name={<Link to={`/insights/users/${userId}`}>{username}</Link>}
          status={moment(createdAt).format('MMM D, YYYY')}
          withPic
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
      <div className={styles.bottom}>
        <div className={styles.left}>
          <ProfileInfo
            withPic
            name={<Link to={`/insights/users/${userId}`}>{username}</Link>}
          />
        </div>
        <div className={styles.right}>
          <WithLikesMutation>
            {mutateInsightById => (
              <LikeBtn
                likesNumber={totalVotes}
                liked={!!votedAt}
                onClick={mutateInsightById(id)}
                className={styles.like}
              />
            )}
          </WithLikesMutation>
          <ShareModalTrigger asIcon shareLink={window.location.href} />
        </div>
      </div>
    </Fragment>
  )
}

export default InsightViewPage
