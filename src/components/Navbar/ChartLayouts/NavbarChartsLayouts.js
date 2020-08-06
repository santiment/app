import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import Loader from '@santiment-network/ui/Loader/Loader'
import { useUserTemplates } from '../../../ducks/Studio/Template/gql/hooks'
import { useUser } from '../../../stores/user'
import { ChartLayoutsAnon } from '../../../ducks/Watchlists/Templates/Anon/WatchlistsAnon'
import { VisibilityIndicator } from '../../VisibilityIndicator'
import { prepareTemplateLink } from '../../../ducks/Studio/Template/utils'
import styles from './NavbarChartsLayouts.module.scss'

const NavbarChartsLayouts = () => {
  const { isLoggedIn, loading: isLoggedInPending, user = {} } = useUser()

  const [templates, loading] = useUserTemplates(user ? user.id : null)
  const isLoading = loading || isLoggedInPending

  return isLoading ? (
    <Loader className={styles.loader} />
  ) : isLoggedIn ? (
    <>
      {templates.length === 0 ? (
        <EmptySection />
      ) : (
        <>
          <LayoutsList templates={templates} />
          <Button as={Link} to='/charts' border className={styles.createBtn}>
            Create chart layout
          </Button>
        </>
      )}
    </>
  ) : (
    <ChartLayoutsAnon className={styles.anon} />
  )
}

const LayoutsList = ({ templates, activeLink }) => (
  <div className={styles.wrapper}>
    <div className={styles.list}>
      {templates.map(template => {
        const link = prepareTemplateLink(template)

        const { title, id, isPublic } = template

        return (
          <Button
            fluid
            variant='ghost'
            key={id}
            as={Link}
            className={styles.item}
            to={link}
            isActive={activeLink === link}
          >
            <span className={styles.watchlistName}>{title}</span>
            <VisibilityIndicator isPublic={isPublic} />
          </Button>
        )
      })}
    </div>
  </div>
)

const EmptySection = () => (
  <div className={styles.emptyWrapper}>
    <span>
      <Link to='/charts' className={styles.createLink}>
        Create
      </Link>{' '}
      your own chart layout for
    </span>
    <span>quick token analysis</span>
  </div>
)

export default NavbarChartsLayouts
