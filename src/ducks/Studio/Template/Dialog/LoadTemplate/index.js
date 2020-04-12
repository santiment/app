import React, { useState, useEffect } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import Search from '@santiment-network/ui/Search'
import Template from './Template'
import styles from './index.module.scss'

export default ({
  placeholder,
  buttonLabel,
  defaultValue,
  onFormSubmit,
  templates,
  selectTemplate,
  rerenderTemplate,
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
      templates.filter(({ title }) =>
        title.toLowerCase().includes(lowerCaseValue)
      )
    )
  }

  function rerenderTemplates () {
    setFilteredTemplates(state => state.slice())
  }

  return (
    <Dialog title='Load Template' {...props}>
      <div className={styles.search}>
        <Search placeholder='Search templates...' onChange={searchTemplate} />
      </div>

      <Dialog.ScrollContent className={styles.wrapper}>
        {templates.length === 0 || filteredTemplates.length === 0
          ? 'No templates found'
          : filteredTemplates.map(template => (
            <Template
              key={template.id}
              template={template}
              selectTemplate={selectTemplate}
              rerenderTemplates={rerenderTemplates}
              rerenderTemplate={rerenderTemplate}
            />
          ))}
      </Dialog.ScrollContent>
    </Dialog>
  )
}
