import React from 'react'
import { connect } from 'react-redux'
import { TEMPLATES } from './utils'
import Icon from '@santiment-network/ui/Icon'
import { getCurrentSanbaseSubscription } from '../../../utils/plans'
import { PRO } from '../../../components/Navbar/NavbarProfileDropdown'
import UpgradeBtn from '../../../components/UpgradeBtn/UpgradeBtn'
import {
  useFeaturedTemplates,
  useUserTemplates
} from '../../../ducks/Studio/Template/gql/hooks'
import PageLoader from '../../../components/Loader/PageLoader'
import NewLabel from '../../../components/NewLabel/NewLabel'
import NewTemplateCard from '../../../components/TemplatesGrid/NewTemplateCard'
import FeatureAnonBanner from '../../../components/Banner/FeatureAnonBanner'
import { prepareTemplateLink } from '../../../ducks/Studio/Template/utils'
import TemplateTitle from '../../../ducks/Studio/Template/TemplateDetailsDialog/TemplateTitle'
import AvatarWithName from '../../../components/AvatarWithName/AvatarWithName'
import styles from './PublicTemplates.module.scss'

const PublicTemplates = ({ isProSanbase, isFeatured, userId }) => {
  if (!(isFeatured || userId)) {
    return (
      <FeatureAnonBanner title='Get ability to create your own Chart Layout when you login' />
    )
  }

  const [templates, loading] = !isFeatured
    ? useUserTemplates(userId)
    : useFeaturedTemplates()

  if (loading) {
    return <PageLoader />
  }

  const defaultTemplates = userId ? [] : TEMPLATES
  const usingTemplates = templates.length > 0 ? templates : defaultTemplates

  return (
    <div className={styles.container}>
      {usingTemplates.map((template, index) => {
        const {
          link,
          title,
          description,
          isProRequired,
          insertedAt,
          user
        } = template
        const requirePro = isProRequired && !isProSanbase

        return requirePro ? null : (
          <div key={index} className={styles.template}>
            <div>
              <div className={styles.title}>
                {[
                  <NewLabel
                    date={insertedAt}
                    className={styles.new}
                    key='new'
                  />,
                  <TemplateTitle title={title} key='title' />
                ]}
              </div>

              <div className={styles.description}>{description}</div>
            </div>

            <AvatarWithName user={user} classes={styles} />
          </div>
        )
      })}

      <NewTemplateCard />
    </div>
  )
}

const mapStateToProps = ({ user: { data } }) => {
  const sanbaseSubscription = getCurrentSanbaseSubscription(data)

  const isProSanbase =
    sanbaseSubscription && sanbaseSubscription.plan
      ? sanbaseSubscription.plan.name === PRO
      : false

  return {
    isProSanbase
  }
}

export default connect(mapStateToProps)(PublicTemplates)
