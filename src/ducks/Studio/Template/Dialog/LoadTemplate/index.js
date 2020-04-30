import React, { useState, useEffect } from 'react'
import {compose} from "recompose";
import {connect} from "react-redux";
import Dialog from '@santiment-network/ui/Dialog'
import Search from '@santiment-network/ui/Search'
import Template from './Template'
import {usePublicProjectTemplates} from "../../gql/hooks";
import Tabs from "@santiment-network/ui/Tabs";
import styles from './index.module.scss'

const TABS = {
  OWN: 'Your library',
  PROJECT: 'Public'
}

const LoadTemplate = ({
  placeholder,
  buttonLabel,
  defaultValue,
  onFormSubmit,
  templates,
  selectedTemplate,
  selectTemplate,
  rerenderTemplate,
  currentUserId,
  ...props
}) => {
  const [filteredTemplates, setFilteredTemplates] = useState(templates)
  const [tab, setTab] = useState(TABS.OWN)
  const [searchTerm, setSearchTerm] = useState('')

  const {project: {id}} = selectedTemplate
  const [projectTemplates] = usePublicProjectTemplates(id)

  const search = () => {
    const lowerCaseValue = searchTerm.toLowerCase()

    const templates = getUsageTemplates();

    setFilteredTemplates(
      templates.filter(({ title }) =>
        title.toLowerCase().includes(lowerCaseValue)
      )
    )
  }

  useEffect(
    () => {
      setFilteredTemplates(templates)
    },
    [templates]
  )

  useEffect(() => {
    search()
  }, [tab])

  useEffect(() => {
    search()
  }, [searchTerm])

  function getUsageTemplates() {
    if(tab === TABS.PROJECT){
      return projectTemplates.filter(({user: {id}}) => +id !== currentUserId)
    } else {
      return templates
    }
  }

  function rerenderTemplates () {
    setFilteredTemplates(state => state.slice())
  }

  return (
    <Dialog title='Load Chart Layout' {...props}>
      <Tabs
        options={Object.values(TABS)}
        defaultSelectedIndex={tab}
        onSelect={(tab) => {
          setTab(tab)
        }}
        className={styles.tabs}
      />

      <div className={styles.search}>
        <Search placeholder='Search chart layout...' value={searchTerm} onChange={setSearchTerm} />
      </div>

      <Dialog.ScrollContent className={styles.wrapper}>
        {templates.length === 0 || filteredTemplates.length === 0
          ? 'No chart layouts found'
          : filteredTemplates.map(template => (
            <Template
              key={template.id}
              template={template}
              selectedTemplate={selectedTemplate}
              selectTemplate={selectTemplate}
              rerenderTemplates={rerenderTemplates}
              rerenderTemplate={rerenderTemplate}
            />
          ))}
      </Dialog.ScrollContent>
    </Dialog>
  )
}

const mapStateToProps = state => {
  return {
    currentUserId: state.user.data ? +state.user.data.id : null
  }
}

export default compose(
  connect(mapStateToProps),
)(LoadTemplate)
