import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Panel from '@santiment-network/ui/Panel/Panel'
import Button from '@santiment-network/ui/Button'
import { useFeaturedTemplates } from '../../../ducks/Studio/Template/gql/hooks'
import { prepareTemplateLink } from '../../../ducks/Studio/Template/utils'
import { getRecentTemplates } from '../../../utils/recent'
import NavbarChartsLayouts from './NavbarChartsLayouts'
import styles from './NavbarChartsDropdown.module.scss'

const NavbarChartsDropdown = ({ activeLink }) => {
  const [layouts = []] = useFeaturedTemplates()
  const templateIDs = getRecentTemplates()

  return (
    <Panel>
      <div className={styles.wrapper}>
        <div className={styles.block}>
          <h3 className={styles.title}>Explore chart layouts</h3>
          <div className={styles.featuredWrapper}>
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
        </div>
        <div className={cx(styles.block, styles.list)}>
          {templateIDs && templateIDs.length > 0 && (
            <>
              <h3 className={styles.title}>Recent watched chart layouts</h3>
              <div
                className={styles.listWrapper}
                style={{
                  minHeight:
                    templateIDs.length > 3
                      ? '100px'
                      : `${32 * templateIDs.length}px`
                }}
              >
                <div className={styles.recentList}>
                  {templateIDs.map((id, idx) => {
                    // const link = prepareTemplateLink(template)

                    // const { title, id } = template

                    return (
                      <Button
                        fluid
                        variant='ghost'
                        key={idx}
                        as={Link}
                        // to={link}
                        // isActive={link === activeLink}
                        className={styles.btn}
                      >
                        {id}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </>
          )}
          <h3 className={styles.title}>My chart layouts</h3>
          <NavbarChartsLayouts recentTemplatesNumber={templateIDs.length} />
        </div>
      </div>
    </Panel>
  )
}

export default NavbarChartsDropdown
