import React from 'react'
import Section from './Section'
import Page from '../../ducks/Page'
import { useUser } from '../../stores/user'
import { DesktopOnly, MobileOnly } from '../../components/Responsive'
import StoriesList from '../../components/Stories/StoriesList'
import RecentlyWatched from '../../components/RecentlyWatched/RecentlyWatched'
import WatchlistCard, {
  WatchlistCards
} from '../../ducks/Watchlists/Cards/Card'
import FeaturedWatchlistCards from '../../ducks/Watchlists/Cards/Featured'
import { WatchlistEmptySection } from '../../ducks/Watchlists/Cards/MyWatchlist'
import {
  useUserWatchlists,
  useUserScreeners,
  useAddressWatchlists
} from '../../ducks/Watchlists/gql/queries'
import NewWatchlistCard from '../../ducks/Watchlists/Cards/NewCard'
import {
  newRenderQueue,
  withRenderQueueProvider,
  useRenderQueueItem
} from '../../ducks/renderQueue/sized'
import MobileAnonBanner from '../../ducks/Watchlists/Templates/Anon/WatchlistsAnon'
import InlineBanner from '../../components/banners/feature/InlineBanner'
import styles from './index.module.scss'

const LoginBanner = ({ isDesktop }) =>
  isDesktop ? (
    <InlineBanner
      title='Get ability to create your own watchlist when you login'
      description="Track selected assets in one place and check it's status"
      className={styles.banner}
    />
  ) : (
    <MobileAnonBanner isFullScreen wrapperClassName={styles.login} />
  )

const Card = props => {
  const { isRendered, onLoad } = useRenderQueueItem()

  return (
    <WatchlistCard
      {...props}
      skipMarketcap={!isRendered}
      onMarketcapLoad={onLoad}
    />
  )
}

const Cards = ({ type, path, watchlists, isAddress }) => (
  <>
    <WatchlistCards
      className={styles.card}
      Card={Card}
      watchlists={watchlists}
      path={path}
      isAddress={isAddress}
    />

    <DesktopOnly>
      <NewWatchlistCard type={type} isAddress={isAddress} />
    </DesktopOnly>
  </>
)

const MyWatchlists = ({ data, isDesktop }) => {
  const [watchlists, isLoading] = data
  const addressesWatchlists = useAddressWatchlists().watchlists

  const { isLoggedIn } = useUser()

  if (isLoading) return null

  const hasWatchlists = watchlists.length > 0

  return (
    <>
      <div className={styles.title}>My watchlists</div>

      {!hasWatchlists && (
        <WatchlistEmptySection
          wrapperClassName={styles.empty}
          className={styles.empty__img}
        />
      )}

      {hasWatchlists && (
        <>
          <div className={styles.block}>
            <div className={styles.assets}>Assets</div>
            <Section
              isGrid={isDesktop && isLoggedIn && data[0].length > 0}
              className={styles.innerSection}
            >
              <Cards watchlists={watchlists} path='/watchlist/projects/' />
            </Section>
          </div>

          <div className={styles.block}>
            <div className={styles.assets}>Addresses</div>
            <Section
              isGrid={isDesktop && isLoggedIn && data[0].length > 0}
              className={styles.innerSection}
            >
              <Cards
                watchlists={addressesWatchlists}
                isAddress
                path='/watchlist/addresses/'
              />
            </Section>
          </div>
        </>
      )}
    </>
  )
}

const MyScreeners = () => {
  const [watchlists, isLoading] = useUserScreeners()
  if (isLoading) return null

  return <Cards watchlists={watchlists} path='/screener/' type='screener' />
}

const Watchlists = ({ isDesktop }) => {
  const { isLoggedIn, loading } = useUser()
  const userWatchlistsData = useUserWatchlists()

  return (
    <Page
      className={styles.wrapper}
      title={isDesktop ? null : 'Watchlists'}
      isCentered
      isWithPadding={!isDesktop}
    >
      <MobileOnly>
        <StoriesList classes={styles} />
        <RecentlyWatched type='watchlists' />
      </MobileOnly>

      <DesktopOnly>
        <Section isGrid title='Explore watchlists'>
          <FeaturedWatchlistCards Card={Card} />
        </Section>
      </DesktopOnly>

      {isLoggedIn ? (
        <MyWatchlists data={userWatchlistsData} isDesktop={isDesktop} />
      ) : (
        loading || <LoginBanner isDesktop={isDesktop} />
      )}

      <Section isGrid={isDesktop} title='My screeners'>
        <MyScreeners />
      </Section>
    </Page>
  )
}

export default withRenderQueueProvider(Watchlists, newRenderQueue(4))
