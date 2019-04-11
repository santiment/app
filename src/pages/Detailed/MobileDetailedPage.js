import React from 'react'
import cx from 'classnames'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import { capitalizeStr } from './../../utils/utils'
import GetAsset from './GetAsset'
import styles from './MobileDetailedPage.module.scss'

const MobileDetailedPage = props => {
  const slug = props.match.params.slug
  return (
    <div className={cx('page', styles.wrapper)}>
      <GetAsset
        slug={slug}
        render={({ isLoading, slug, project }) => {
          if (isLoading) {
            return (
              <MobileHeader
                title={<Title slug={slug} />}
                goBack={props.history.goBack}
              />
            )
          }

          const { ticker, ...rest } = project
          console.log(ticker, slug, rest)
          return (
            <MobileHeader
              title={<Title slug={slug} ticker={ticker} />}
              goBack={props.history.goBack}
            />
          )
        }}
      />
    </div>
  )
}

const Title = ({ slug, ticker }) => (
  <>
    {capitalizeStr(slug)}{' '}
    {ticker && <span className={styles.ticker}>({ticker.toUpperCase()})</span>}
  </>
)

export default MobileDetailedPage
