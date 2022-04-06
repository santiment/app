import React from 'react'
import Section from './Section'
import ChartLayouts from './Recents/ChartLayouts'
import { useFeaturedTemplates } from '../../../ducks/Studio/Template/gql/hooks'
import Conversations from '../Conversations/Conversations'
import { getRecentTemplates } from '../../../utils/recent'
import styles from './index.module.scss'

const LayoutsIcon = () => (
  <svg width='16' height='17' className={styles.sectionIcon}>
    <path
      fillRule='evenodd'
      d='M1 1.5a.5.5 0 1 0-1 0v14.7c0 .4.3.8.8.8h14.7a.5.5 0 1 0 0-1H1V1.5Zm14.5.7a.5.5 0 0 0-1-.4l-2.8 7-5.4-2.3a.5.5 0 0 0-.6.2l-3 6.3a.5.5 0 0 0 .9.4l2.8-5.8 5.4 2.3a.5.5 0 0 0 .7-.3l3-7.4Z'
    />
  </svg>
)

const ConversationsIcon = () => (
  <svg width='20' height='18' className={styles.sectionIcon}>
    <path
      fillRule='evenodd'
      d='M11 12.8c.1-.2.3-.2.6-.2h7.2l.2-.3v-11c0-.2-.1-.3-.3-.3H1.4c-.2 0-.3.1-.3.2v11.1c0 .1.1.3.3.3H5c.5 0 1 .4 1 1v3l5-3.8Zm-5 5c-.4.4-1 0-1-.4v-3.8H1.2C.7 13.6 0 13 0 12.3v-11C0 .5.6 0 1.3 0h17.4c.7 0 1.3.6 1.3 1.2v11.1c0 .7-.6 1.3-1.3 1.3h-7.1L6 17.9Z'
    />
  </svg>
)

const Aside = ({ className }) => {
  const layouts = getRecentTemplates()
  const [featuredLayouts = []] = useFeaturedTemplates()

  return (
    <aside className={className}>
      <Section
        title={`${layouts.length > 0 ? 'Recent' : 'Featured'} Chart Layouts`}
        Icon={LayoutsIcon}
      >
        <ChartLayouts ids={layouts.length > 0 ? layouts : featuredLayouts} />
      </Section>
      <Section title='Conversations' Icon={ConversationsIcon} className={styles.sticky}>
        <Conversations />
      </Section>
    </aside>
  )
}

export default Aside
