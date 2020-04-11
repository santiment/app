import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Dialog from '@santiment-network/ui/Dialog'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Search from '@santiment-network/ui/Search'
import Toggle from '@santiment-network/ui/Toggle'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel/Panel'
import Icon from '@santiment-network/ui/Icon'
import FormDialogRenameTemplate from './FormDialog/RenameTemplate'
import FormDialogDuplicateTemplate from './FormDialog/DuplicateTemplate'
import styles from './DialogLoadTemplate.module.scss'

const Option = props => (
  <Button {...props} fluid variant='ghost' className={styles.context__btn} />
)

const Template = ({ template }) => {
  const { title, metrics, project } = template
  const [isPublic, setIsPublic] = useState(template.isPublic)

  function toggleIsPublic () {
    setIsPublic(state => !state)
  }

  return (
    <div className={styles.template}>
      <div className={styles.left}>
        <div className={styles.title}>{title}</div>
        <div className={styles.info}>
          {project.name} | {metrics.length} metrics
        </div>
      </div>
      <div
        className={cx(styles.publicity, isPublic && styles.publicity_public)}
        onClick={toggleIsPublic}
      >
        <Icon type={isPublic ? 'eye' : 'lock-small'} className={styles.icon} />
      </div>

      <ContextMenu
        trigger={
          <Button variant='flat' className={cx(styles.menu)}>
            <Icon type='dots' />
          </Button>
        }
        passOpenStateAs='isActive'
        position='bottom'
        align='end'
      >
        <Panel variant='modal' className={styles.options}>
          <Option onClick={toggleIsPublic}>
            Public
            <Toggle isActive={isPublic} className={styles.toggle} />
          </Option>

          <FormDialogRenameTemplate trigger={<Option>Rename</Option>} />

          <FormDialogDuplicateTemplate trigger={<Option>Duplicate</Option>} />

          <Option>Delete</Option>
        </Panel>
      </ContextMenu>
    </div>
  )
}

const data = [
  {
    id: 0,
    title: 'Main',
    metrics: ['', '', ''],
    isPublic: false,
    project: {
      name: 'Ethereum'
    }
  },
  {
    id: 1,
    title: 'financial',
    metrics: [''],
    isPublic: true,
    project: {
      name: 'Ethereum'
    }
  },
  {
    id: 2,
    title: 'metrics',
    metrics: ['', ''],
    isPublic: false,
    project: {
      name: 'Ethereum'
    }
  },
  {
    id: 3,
    title: 'Main financial metrics',
    metrics: ['', '', ''],
    isPublic: false,
    project: {
      name: 'Ethereum'
    }
  },
  {
    id: 4,
    title: 'Main financial metrics',
    metrics: ['', '', ''],
    isPublic: false,
    project: {
      name: 'Ethereum'
    }
  }
]

export default ({
  placeholder,
  buttonLabel,
  defaultValue,
  onFormSubmit,
  templates = data,
  ...props
}) => {
  const [filteredTemplates, setFilteredTemplates] = useState(templates)

  useEffect(
    () => {
      setFilteredTemplates(templates)
    },
    [templates]
  )

  function searchTemplate (value) {
    const lowerCaseValue = value.toLowerCase()
    setFilteredTemplates(
      data.filter(({ title }) => title.toLowerCase().includes(lowerCaseValue))
    )
  }

  function onSubmit (e) {
    e.preventDefault()
    onFormSubmit(e.currentTarget.templateName.value)
  }

  return (
    <Dialog title='Load Template' {...props}>
      <div className={styles.search}>
        <Search placeholder='Search templates...' onChange={searchTemplate} />
      </div>

      <Dialog.ScrollContent className={styles.wrapper}>
        {filteredTemplates.map(template => (
          <Template key={template.id} template={template} />
        ))}
      </Dialog.ScrollContent>
    </Dialog>
  )
}
