import React from 'react'
import Section, { Title, Content } from './Section'
import Page from '../../ducks/Page'
import { useUser } from '../../stores/user'
import { DesktopOnly, MobileOnly } from '../../components/Responsive'
import StoriesList from '../../components/Stories/StoriesList'
import RecentlyWatched from '../../components/RecentlyWatched/RecentlyWatched'
import WatchlistCard from '../../ducks/Watchlists/Cards/ProjectCard'
import WatchlistAddressCard from '../../ducks/Watchlists/Cards/AddressCard'
import { WatchlistCards } from '../../ducks/Watchlists/Cards/Card'
import FeaturedWatchlistCards from '../../ducks/Watchlists/Cards/Featured'
import NewWatchlistCard from '../../ducks/Watchlists/Cards/NewCard'
import {
  newRenderQueue,
  withRenderQueueProvider,
  useRenderQueueItem,
} from '../../ducks/renderQueue/sized'
import MobileAnonBanner from '../../ducks/Watchlists/Templates/Anon/WatchlistsAnon'
import InlineBanner from '../../components/banners/feature/InlineBanner'
import { BLOCKCHAIN_ADDRESS, PROJECT, SCREENER } from '../../ducks/Watchlists/detector'
import EmptySection from './EmptySection'
import {
  useUserAddressWatchlists,
  useUserProjectWatchlists,
  useUserScreeners,
} from '../../ducks/Watchlists/gql/lists/hooks'
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

const QueuedProjectCard = (props) => {
  const { isRendered, onLoad } = useRenderQueueItem()

  return <WatchlistCard {...props} skipMarketcap={!isRendered} onMarketcapLoad={onLoad} />
}

const Cards = ({ watchlists, path, Card = QueuedProjectCard, type }) => (
  <>
    <WatchlistCards className={styles.card} Card={Card} watchlists={watchlists} path={path} />

    <DesktopOnly>
      <NewWatchlistCard type={type} />
    </DesktopOnly>
  </>
)

const MyWatchlists = ({ data, addressesData, isDesktop }) => {
  const [watchlists, isLoading] = data
  const [addressesWatchlists, addressesWatchlistsLoading] = addressesData

  if (isLoading && addressesWatchlistsLoading) return null

  if (watchlists.length === 0 && addressesWatchlists.length === 0) {
    return (
      <Content>
        <EmptySection wrapperClassName={styles.empty} className={styles.empty__img} />
      </Content>
    )
  }

  return (
    <>
      <h3 className={styles.subtitle}>Projects</h3>
      <Content isGrid={isDesktop} className={styles.projects}>
        <Cards watchlists={watchlists} type={PROJECT} />
      </Content>

      <Title>Addresses</Title>
      <Content isGrid={isDesktop}>
        <Cards
          Card={WatchlistAddressCard}
          watchlists={addressesWatchlists}
          type={BLOCKCHAIN_ADDRESS}
        />
      </Content>
    </>
  )
}

const MyScreeners = () => {
  const [watchlists, isLoading] = useUserScreeners()
  if (isLoading) return null

  return <Cards watchlists={watchlists} path='/screener/' type={SCREENER} />
}

const Watchlists = ({ isDesktop }) => {
  const { isLoggedIn, loading } = useUser()
  const userWatchlistsData = useUserProjectWatchlists()
  const userAddressesWatchlistsData = useUserAddressWatchlists()

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
          <FeaturedWatchlistCards Card={QueuedProjectCard} />
        </Section>
      </DesktopOnly>

      <Title>My watchlists</Title>
      {isLoggedIn ? (
        <MyWatchlists
          data={userWatchlistsData}
          addressesData={userAddressesWatchlistsData}
          isDesktop={isDesktop}
        />
      ) : (
        loading || (
          <Content>
            <LoginBanner isDesktop={isDesktop} />
          </Content>
        )
      )}

      <Section isGrid={isDesktop} title='My screeners'>
        <MyScreeners />
      </Section>
    </Page>
  )
}

export default withRenderQueueProvider(Watchlists, newRenderQueue(4))
