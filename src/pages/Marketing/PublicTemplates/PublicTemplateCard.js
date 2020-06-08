import React, { useState } from 'react'
import cx from 'classnames'
import TemplateContextMenu from '../../../ducks/Studio/Template/TemplateContextMenu/TemplateContextMenu'
import VideoModal from '../../../components/VideoModal/VideoModal'
import NewLabel from '../../../components/NewLabel/NewLabel'
import { prepareTemplateLink } from '../../../ducks/Studio/Template/utils'
import AvatarWithName from '../../../components/AvatarWithName/AvatarWithName'
import styles from './PublicTemplates.module.scss'

const PUBLIC_YOUTUBE_IDS = {
  195: '0IT44B7DCso',
  197: '4zoC64C0q-A',
  200: 'ORqsG6AvNg8',
  202: 'Ek_D_QVszKE',
  203: '8sNUkR68nGA'
}

const PublicTemplateCard = ({ template }) => {
  const {
    link,
    title,
    description,
    insertedAt,
    user,
    id,
    options = {}
  } = template
  const { youtube_id } = options || {}
  const videoId = youtube_id || PUBLIC_YOUTUBE_IDS[id]

  if (template.options) {
    template.options.youtube_id = videoId
  }

  const [isActive, setIsActive] = useState(false)

  return (
    <div
      className={styles.template}
      onMouseLeave={() => setIsActive(false)}
      onMouseOver={() => setIsActive(true)}
    >
      {videoId && <VideoModal videoId={videoId} />}

      {isActive && <TemplateContextMenu template={template} classes={styles} />}

      <div className={cx(styles.innerPadding, !videoId && styles.withoutVideo)}>
        <div className={styles.innerContainer}>
          <div className={styles.title}>
            {[
              <NewLabel date={insertedAt} className={styles.new} key='new' />,
              <a
                className={styles.title}
                target='_blank'
                rel='noopener noreferrer'
                key='link'
                href={link || prepareTemplateLink(template)}
              >
                {title}
              </a>
            ]}
          </div>

          <div className={styles.description}>{description}</div>
        </div>

        <AvatarWithName user={user} classes={styles} />
      </div>
    </div>
  )
}

export default PublicTemplateCard
