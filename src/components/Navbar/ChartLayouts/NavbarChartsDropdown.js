import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Panel from '@santiment-network/ui/Panel/Panel'
import Button from '@santiment-network/ui/Button'
import { useFeaturedTemplates } from '../../../ducks/Studio/Template/gql/hooks'
import { prepareTemplateLink } from '../../../ducks/Studio/Template/utils'
import NavbarChartsLayouts from './NavbarChartsLayouts'
import styles from './NavbarChartsDropdown.module.scss'

const NavbarChartsDropdown = ({ activeLink }) => {
  const [layouts = []] = useFeaturedTemplates()

  return (
    <Panel>
      <div className={styles.wrapper}>
        <div className={styles.block}>
          <h3 className={styles.title}>Explore Chart Layouts</h3>
          <div className={styles.scroll}>
            {layouts.map(template => {
              const link = prepareTemplateLink(template)

              const { title, id } = template

              return (
                <Button
                  fluid
                  variant='ghost'
                  key={id}
                  as={Link}
                  to={link}
                  isActive={link === activeLink}
                  className={styles.btn}
                >
                  {title}
                </Button>
              )
            })}
          </div>
        </div>
        <div className={cx(styles.block, styles.list)}>
          <h3 className={styles.title}>My Chart Layouts</h3>
          <NavbarChartsLayouts />
        </div>
      </div>
    </Panel>
  )
}

export default NavbarChartsDropdown
