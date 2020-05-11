import React, { useState, useEffect } from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import Dialog from '@santiment-network/ui/Dialog'
import Search from '@santiment-network/ui/Search'
import Tabs from '@santiment-network/ui/Tabs'
import Icon from '@santiment-network/ui/Icon'
import Template from './Template'
import { usePublicProjectTemplates } from '../../gql/hooks'
import TemplateDetailsDialog from '../../TemplateDetailsDialog/TemplateDetailsDialog'
import { sortById } from '../../../../../utils/sortMethods'
import NoChartLayouts from '../../NoChartLayouts/NoChartLayouts'
import styles from './index.module.scss'

const TABS = {
  OWN: 'Your Chart Layout',
  PROJECT: 'Explore'
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
  projectId,
  ...props
}) => {
  const [filteredTemplates, setFilteredTemplates] = useState(templates)
  const [tab, setTab] = useState(TABS.OWN)
  const [searchTerm, setSearchTerm] = useState('')
  const [openedTemplate, setOpenedTemplate] = useState()

  const [
    projectTemplates = [],
    loadingProjectTemplates
  ] = usePublicProjectTemplates(projectId)

  function rerenderTemplates () {
    setFilteredTemplates(state => state.slice())
  }

  function onRename (template) {
    rerenderTemplates && rerenderTemplates()
    rerenderTemplate && rerenderTemplate(template)
  }

  function onDelete () {
    setOpenedTemplate()
  }

  const search = () => {
    const lowerCaseValue = searchTerm.toLowerCase()

    const templates = getUsageTemplates()

    setFilteredTemplates(
      lowerCaseValue
        ? templates.filter(({ title }) =>
          title.toLowerCase().includes(lowerCaseValue)
        )
        : templates
    )
  }

  useEffect(search, [tab, searchTerm, templates.length])

  function getUsageTemplates () {
    if (tab === TABS.PROJECT) {
      return projectTemplates.filter(
        ({ user: { id } }) => +id !== +currentUserId
      )
    } else {
      return templates
    }
  }

  return (
    <Dialog
      title={
        openedTemplate ? (
          <div onClick={() => setOpenedTemplate()} className={styles.header}>
            <Icon type='arrow-left-big' className={styles.headerIcon} />{' '}
            {openedTemplate.title}
          </div>
        ) : (
          'Load Chart Layout'
        )
      }
      classes={styles}
      {...props}
    >
      {!openedTemplate ? (
        <>
          {!loadingProjectTemplates && (
            <Tabs
              options={Object.values(TABS)}
              defaultSelectedIndex={tab}
              onSelect={tab => {
                setTab(tab)
              }}
              className={styles.tabs}
            />
          )}

          <div className={styles.search}>
            <Search
              placeholder='Search chart layout...'
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>

          <Dialog.ScrollContent className={styles.wrapper}>
            {filteredTemplates.length === 0 ? (
              <NoChartLayouts />
            ) : (
              filteredTemplates
                .sort(sortById)
                .map(template => (
                  <Template
                    key={template.id}
                    template={template}
                    selectedTemplate={selectedTemplate}
                    selectTemplate={selectTemplate}
                    rerenderTemplates={rerenderTemplates}
                    rerenderTemplate={rerenderTemplate}
                    onOpenTemplate={setOpenedTemplate}
                    onRename={onRename}
                  />
                ))
            )}
          </Dialog.ScrollContent>
        </>
      ) : (
        <TemplateDetailsDialog
          template={openedTemplate}
          onRename={onRename}
          onDelete={onDelete}
          isDialog={false}
          selectTemplate={selectTemplate}
        />
      )}
    </Dialog>
  )
}

const mapStateToProps = state => {
  return {
    currentUserId: state.user.data ? +state.user.data.id : null
  }
}

export default compose(connect(mapStateToProps))(LoadTemplate)
