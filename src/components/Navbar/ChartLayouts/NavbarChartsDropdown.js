import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Panel from '@santiment-network/ui/Panel/Panel'
import Button from '@santiment-network/ui/Button'
import { useFeaturedTemplates } from '../../../ducks/Studio/Template/gql/hooks'
import { getTemplateSharePath as prepareTemplateLink } from '../../../ducks/Studio/Template/utils'
import { getRecentTemplates } from '../../../utils/recent'
import { useRecentTemplates } from '../../../hooks/recents'
import NavbarChartsLayouts, { getLayoutsStyles } from './NavbarChartsLayouts'
import NewLabel from '../../NewLabel/NewLabel'
import styles from './NavbarChartsDropdown.module.scss'

const DASHBOARDS = [
  {
    name: 'ETH Token Trading Analysis',
    to: '/eth-analysis',
    createdAt: '2021-02-16T00:00:00Z'
  },
  {
    name: 'Ethereum 2.0 Staking Analytics',
    to: '/eth2',
    createdAt: '2021-01-20T00:00:00Z'
  },
  {
    name: 'Stablecoins',
    to: '/stablecoins',
    createdAt: '2020-10-01T00:00:00Z'
  },
  {
    name: 'Uniswap Protocol',
    to: '/uniswap-protocol',
    createdAt: '2020-11-01T00:00:00Z'
  },
  {
    name: 'Decentralized Exchanges',
    to: '/decentralized-exchanges',
    createdAt: '2020-11-03T00:00:00Z'
  },
  {
    name: 'Bitcoin Locked on Ethereum',
    to: '/bitcoin-locked-on-ethereum',
    createdAt: '2020-11-04T00:00:00Z'
  }
]

const NavbarChartsDropdown = ({ activeLink }) => {
  const [layouts = []] = useFeaturedTemplates()
  const templateIDs = getRecentTemplates()
  const [recentTemplates] = useRecentTemplates(templateIDs)

  return (
    <Panel>
      <div className={styles.wrapper}>
        <div className={cx(styles.block, styles.list)}>
          <h3 className={styles.title}>Dashboards</h3>

          <div className={styles.listWrapper}>
            {DASHBOARDS.map(({ to, name, createdAt }) => {
              const link = to

              return (
                <Button
                  fluid
                  variant='ghost'
                  key={name}
                  as={Link}
                  to={link}
                  isActive={link === activeLink}
                  className={styles.btn}
                >
                  {[
                    <NewLabel
                      className={styles.new}
                      date={createdAt}
                      limitDays={14}
                      key='new'
                    />,
                    name
                  ]}
                </Button>
              )
            })}
          </div>
        </div>
        <div className={styles.block}>
          <h3 className={styles.title}>Explore chart layouts</h3>
          <div className={styles.listWrapper}>
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
          {recentTemplates && recentTemplates.length > 0 && (
            <>
              <h3 className={styles.title}>Recently viewed chart layouts</h3>
              <div
                className={styles.listWrapper}
                style={getLayoutsStyles(
                  recentTemplates,
                  recentTemplates.length
                )}
              >
                <div className={styles.recentList}>
                  {recentTemplates.map((template, idx) => {
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
