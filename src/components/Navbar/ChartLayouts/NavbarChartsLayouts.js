import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import Loader from '@santiment-network/ui/Loader/Loader'
import { useUserTemplates } from '../../../ducks/Studio/Template/gql/hooks'
import { useUser } from '../../../stores/user'
import { ChartLayoutsAnon } from '../../../ducks/Watchlists/Templates/Anon/WatchlistsAnon'
import { VisibilityIndicator } from '../../VisibilityIndicator'
import { prepareTemplateLink } from '../../../ducks/Studio/Template/utils'
import LayoutsEmptySection from './LayoutEmptySection'
import CreateLayoutLink from './CreateLayoutLink'
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
        <LayoutsEmptySection />
      ) : (
        <>
          <LayoutsList templates={templates} />
          <CreateLayoutLink />
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
            <span>{title}</span>
            <VisibilityIndicator isPublic={isPublic} />
          </Button>
        )
      })}
    </div>
  </div>
)

export default NavbarChartsLayouts
