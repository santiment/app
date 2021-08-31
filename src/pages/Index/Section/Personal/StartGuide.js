import React, { useState, useMemo } from 'react'
import gql from 'graphql-tag'
import cx from 'classnames'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import { Row as BaseRow } from '../index'
import { PROJECT } from '../../../../ducks/Watchlists/detector'
import NewWatchlist from '../../../../ducks/Watchlists/Actions/New'
import Accordion from '../../Accordion'
import QuickStartTitle from './QuickStartTitle/QuickStartTitle'
import WebinarWidget from './Cabinet/WebinarWidget/WebinarWidget'
import WebinarWidgetTitle from './Cabinet/WebinarWidget/WebinarWidgetTitle'
import styles from './index.module.scss'

const LS_ARTICLE_IS_READ = 'LS_ARTICLE_IS_READ'
const FETCH_POLICY = {
  fetchPolicy: 'cache-and-network'
}
export const USER_QUERY = gql`
  {
    currentUser {
      id
      email
      username
      settings {
        hasTelegramConnected
      }
      chartConfigurations {
        id
      }
      watchlists {
        id
      }
    }
  }
`

const DEFAULT_STATS = {
  loginHref: '/login'
}

const setArticleIsRead = tab => localStorage.setItem(LS_ARTICLE_IS_READ, '+')
const getArticleIsRead = tab => !!localStorage.getItem(LS_ARTICLE_IS_READ)

function useIsArticleRead () {
  const [isArticleRead, setIsArticleRead] = useState(getArticleIsRead)

  return {
    isArticleRead,
    readArticle: () => setIsArticleRead(true) || setArticleIsRead()
  }
}

function useUserStats () {
  const { data } = useQuery(USER_QUERY, FETCH_POLICY)

  return useMemo(
    () => {
      if (!data || !data.currentUser) return DEFAULT_STATS

      const {
        email,
        username,
        settings,
        watchlists,
        chartConfigurations
      } = data.currentUser

      return {
        personalInfo: !!(email && username),
        telegram: settings.hasTelegramConnected,
        watchlists: !!watchlists.length,
        charts: !!chartConfigurations.length
      }
    },
    [data]
  )
}

const Row = ({ title, isActive, onClick, ...props }) => (
  <BaseRow
    {...props}
    className={cx(styles.row, isActive && styles.row__active)}
    onClick={isActive ? undefined : onClick}
  >
    <div className={cx(styles.status, isActive && styles.status_active)}>
      <Icon type='checkmark' className={styles.checkmark} />
    </div>
    {title}
    <Icon type='arrow-right-big' className={styles.arrow} />
  </BaseRow>
)

const c = v => (v ? 1 : 0)

const StartGuide = () => {
  const {
    personalInfo,
    telegram,
    watchlists,
    charts,
    loginHref
  } = useUserStats()
  const { isArticleRead, readArticle } = useIsArticleRead()

  const currentCount =
    c(isArticleRead) + c(personalInfo) + c(telegram) + c(charts) + c(watchlists)

  return (
    <>
      <Accordion
        title={<QuickStartTitle max={5} currentCount={currentCount} />}
        showArrow={false}
        classes={styles}
      >
        <Row
          title='Getting started for traders'
          href='https://academy.santiment.net/for-traders/'
          target='_blank'
          As='a'
          isActive={isArticleRead}
          onClick={readArticle}
        />

        <Row
          title='Fill out your profile with personal information'
          to='/account'
          As={Link}
          isActive={personalInfo}
        />
        <Row
          title='Connect with Telegram'
          to='/account'
          As={Link}
          isActive={telegram}
        />
        <Row
          title='Create your first Chart Layout'
          to={loginHref || '/studio'}
          As={loginHref && Link}
          isActive={charts}
        />
        <NewWatchlist
          type={PROJECT}
          trigger={
            <Row
              title='Create your first Watchlist'
              to={loginHref}
              As={loginHref && Link}
              isActive={watchlists}
            />
          }
        />
      </Accordion>
      <Accordion
        title={<WebinarWidgetTitle />}
        showArrow={false}
        classes={{ accordionContent: styles.webinarsAccordionContent }}
      >
        <WebinarWidget />
      </Accordion>
    </>
  )
}

export default StartGuide
