import React, { useState } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import Button from '@santiment-network/ui/Button'
import Dialog from '@santiment-network/ui/Dialog'
import TemplateContextMenu from '../TemplateContextMenu/TemplateContextMenu'
import UseTemplateBtn from '../UseTemplateBtn/UseTemplateBtn'
import { usePublicTemplates } from '../Dialog/LoadTemplate/Template'
import { useDeleteTemplate } from '../gql/hooks'
import TemplateStatus, {
  TemplateStatusToggle
} from '../TemplateStatus/TemplateStatus'
import TemplateInfo from './TemplateInfo'
import TemplateTitle from './TemplateTitle'
import externalStyles from '../Dialog/LoadTemplate/Template.module.scss'
import styles from './TemplateDetailsDialog.module.scss'

export const TemplateInfoTrigger = ({ onClick, classes = {}, ...rest }) => (
  <Button
    {...rest}
    onClick={e => {
      e.stopPropagation()
      onClick(e)
    }}
    variant='flat'
    className={cx(externalStyles.menu, styles.trigger, classes.trigger)}
  >
    See details
  </Button>
)

const TemplateDetailsDialog = ({
  template,
  isAuthor,
  isDialog = true,
  onRename,
  onDelete,
  selectTemplate
}) => {
  const [deleteTemplate] = useDeleteTemplate()
  const { isPublic, toggleIsPublic } = usePublicTemplates(template)

  const [isOpen, setOpen] = useState(false)
  const [isMenuOpened, setIsMenuOpened] = useState(false)

  function onDeleteHandler (template) {
    deleteTemplate(template, onDelete)
  }

  function openMenu (e) {
    e.stopPropagation()

    setIsMenuOpened(true)
  }

  function closeMenu () {
    setIsMenuOpened(false)
  }

  const El = isDialog ? Dialog : 'div'

  return (
    <El
      open={isOpen}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      title={isDialog && <TemplateTitle title={template.title} />}
      classes={styles}
      trigger={<TemplateInfoTrigger />}
      className={cx(styles.template)}
    >
      <div className={styles.container}>
        <div className={styles.actions}>
          {!isAuthor && (
            <UseTemplateBtn
              template={template}
              onClick={() => {
                selectTemplate(template)
              }}
            />
          )}

          <TemplateContextMenu
            template={template}
            isMenuOpened={isMenuOpened}
            closeMenu={closeMenu}
            openMenu={openMenu}
            onDelete={onDeleteHandler}
            onRename={data => {
              setOpen(false)
              onRename(data)
            }}
            isAuthor={isAuthor}
            classes={styles}
          />

          {isAuthor ? (
            <TemplateStatusToggle
              isPublic={isPublic}
              classes={styles}
              toggleIsPublic={toggleIsPublic}
            />
          ) : (
            <TemplateStatus
              isAuthor={isAuthor}
              isPublic={isPublic}
              classes={styles}
            />
          )}
        </div>

        <TemplateInfo template={template} as='div' />
      </div>
    </El>
  )
}

const mapStateToProps = ({ user }, { template: { user: { id } = {} } }) => ({
  isAuthor: user && user.data && +user.data.id === +id
})

export default connect(mapStateToProps)(TemplateDetailsDialog)
