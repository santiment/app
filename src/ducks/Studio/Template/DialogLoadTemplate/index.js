import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Dialog from '@santiment-network/ui/Dialog'
import Search from '@santiment-network/ui/Search'
import Panel from '@santiment-network/ui/Panel/Panel'
import Template from './Template'

import styles from './index.module.scss'

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
  selectTemplate,
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
          <Template
            key={template.id}
            template={template}
            selectTemplate={selectTemplate}
          />
        ))}
      </Dialog.ScrollContent>
    </Dialog>
  )
}
