import React from 'react'
import TemplateContextMenu from '../../../ducks/Studio/Template/TemplateContextMenu/TemplateContextMenu'
import VideoModal from '../../../components/VideoModal/VideoModal'
import NewLabel from '../../../components/NewLabel/NewLabel'
import { prepareTemplateLink } from '../../../ducks/Studio/Template/utils'
import TemplateTitle from '../../../ducks/Studio/Template/TemplateDetailsDialog/TemplateTitle'
import AvatarWithName from '../../../components/AvatarWithName/AvatarWithName'
import styles from './PublicTemplates.module.scss'

const PUBLIC_YOUTUBE_IDS = {
  195: '0IT44B7DCso',
  197: '4zoC64C0q-A',
  200: 'Ek_D_QVszKE',
  202: 'ORqsG6AvNg8',
  203: '8sNUkR68nGA'
}

const PublicTemplateCard = ({ template, index }) => {
  const { link, title, description, insertedAt, user, id } = template
  const videoId = PUBLIC_YOUTUBE_IDS[id]

  return (
    <div className={styles.template}>
      <div className={styles.innerContainer}>
        {videoId && (
          <div className={styles.video}>
            <img
              alt='Chart layout'
              className={styles.preview}
              src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
            />
            <VideoModal videoId={videoId} />
          </div>
        )}

        <TemplateContextMenu template={template} classes={styles} />

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
              <TemplateTitle title={title} key='title' />
            </a>
          ]}
        </div>

        <div className={styles.description}>{description}</div>
      </div>

      <AvatarWithName user={user} classes={styles} />
    </div>
  )
}

export default PublicTemplateCard
