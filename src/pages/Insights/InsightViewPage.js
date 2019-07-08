import React, { Fragment, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { convertToRaw } from 'draft-js'
import mediumDraftImporter from 'medium-draft/lib/importer'
import InsightViewPageImageModalWrapper from './InsightViewPageImageModalWrapper'
import InsightEditorTitle from '../../components/Insight/InsightEditor/InsightEditorTitle'
import InsightTags from '../../components/Insight/InsightTags'
import InsightReactionButtons from './InsightReactionButtons'
import ProfileInfo from '../../components/Insight/ProfileInfo'
import Editor from '../../components/Editor/Editor'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import AnonBannerStaticExperiment from '../../components/Banner/AnonBanner/AnonBannerStaticExperiment'
import AnonBannerSticky from '../../components/Banner/AnonBannerSticky'
import { getInsightContent } from './utils'
import { getDateFormats } from '../../utils/dates'
import styles from './InsightViewPage.module.scss'

const stylesButtonsBottom = {
  wrapper: styles.wrapperBottom,
  like: styles.like
}

const stylesButtonsAside = {
  wrapper: styles.wrapperAside,
  like: styles.like
}

const InsightViewPage = ({
  id,
  user: { id: userId, username },
  title,
  text,
  tags,
  createdAt,
  votedAt,
  votes: { totalVotes },
  isDesktop,
  isLoggedIn
}) => {
  const { MMM, D, YYYY } = getDateFormats(new Date(createdAt))
  const bannerRef = useRef()
  const [isVoted, setIsVoted] = useState(!!votedAt)
  const [totalLikes, setTotalLikes] = useState(totalVotes)

  const changeLikes = () => {
    setTotalLikes(isVoted ? totalLikes - 1 : totalLikes + 1)
    setIsVoted(!isVoted)
  }

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
      {!isDesktop && (
        <MobileHeader title='All Insights' backRoute='/insights' />
      )}
      <div className={styles.wrapper}>
        <InsightReactionButtons
          totalVotes={totalLikes}
          id={id}
          isVoted={isVoted}
          classes={stylesButtonsAside}
          alignLike={'left'}
          onLikesClick={changeLikes}
        />
        <div className={styles.insightWrapper}>
          <ProfileInfo
            withPic
            className={styles.profile}
            name={<Link to={`/insights/users/${userId}`}>{username}</Link>}
            status={`${MMM} ${D}, ${YYYY}`}
          />
          <InsightEditorTitle defaultValue={title} readOnly />
          <InsightViewPageImageModalWrapper>
            <Editor
              readOnly
              defaultEditorContent={convertToRaw(mediumDraftImporter(text))}
            />
          </InsightViewPageImageModalWrapper>
          <div className={styles.tags}>
            <InsightTags isDesktop={isDesktop} tags={tags} />
          </div>
          <div className={styles.bottom}>
            <div className={styles.left}>
              <ProfileInfo
                withPic
                name={<Link to={`/insights/users/${userId}`}>{username}</Link>}
              />
            </div>
            <InsightReactionButtons
              totalVotes={totalLikes}
              id={id}
              isVoted={isVoted}
              classes={stylesButtonsBottom}
              onLikesClick={changeLikes}
            />
          </div>
        </div>
        {!isLoggedIn && (
          <>
            <AnonBannerStaticExperiment
              className={styles.banner}
              bannerRef={bannerRef}
            />
            <AnonBannerSticky bannerStaticRef={bannerRef} />
          </>
        )}
      </div>
    </Fragment>
  )
}

export default InsightViewPage
