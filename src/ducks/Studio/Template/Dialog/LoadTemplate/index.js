import React, { useState, useEffect } from 'react'
import { compose } from 'recompose'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Dialog from '@santiment-network/ui/Dialog'
import Search from '@santiment-network/ui/Search'
import Tabs from '@santiment-network/ui/Tabs'
import Icon from '@santiment-network/ui/Icon'
import Template, { openTemplate } from './Template'
import {
  useFeaturedTemplates,
  usePublicProjectTemplates
} from '../../gql/hooks'
import TemplateDetailsDialog from '../../TemplateDetailsDialog/TemplateDetailsDialog'
import { sortById } from '../../../../../utils/sortMethods'
import NoChartLayouts from '../../NoChartLayouts/NoChartLayouts'
import { prepareTemplateLink } from '../../utils'
import styles from './index.module.scss'

const TABS = {
  PROJECT: 'Explore',
  OWN: 'My library'
}

const LoadTemplate = ({
  placeholder,
  onFormSubmit,
  templates,
  selectedTemplate,
  selectTemplate,
  rerenderTemplate,
  currentUserId,
  projectId,
  redirect,
  isFeatured = false,
  asProject,
  asLink,
  ...props
}) => {
  const [filteredTemplates, setFilteredTemplates] = useState(templates)
  const [tab, setTab] = useState(TABS.PROJECT)
  const [searchTerm, setSearchTerm] = useState('')
  const [openedTemplate, setOpenedTemplate] = useState()

  const search = () => {
    const lowerCaseValue = searchTerm.toLowerCase()

    const templates = getUsageTemplates()

    const filtered = lowerCaseValue
      ? templates.filter(({ title }) =>
        title.toLowerCase().includes(lowerCaseValue)
      )
      : templates
    setFilteredTemplates(filtered)
  }

  const [projectTemplates = [], loadingProjectTemplates] = isFeatured
    ? useFeaturedTemplates()
    : usePublicProjectTemplates(projectId)

  useEffect(
    () => {
      search()
    },
    [templates, projectTemplates]
  )

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
              classes={styles}
              disabledClassName={styles.disabledTab}
            />
          )}

          <div className={styles.search}>
            <Search
              className={styles.searchInput}
              placeholder='Search chart layout...'
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>

          <Dialog.ScrollContent className={styles.wrapper}>
            {filteredTemplates.length === 0 ? (
              <NoChartLayouts />
            ) : (
              filteredTemplates.sort(sortById).map(template => (
                <Template
                  key={template.id}
                  template={template}
                  selectedTemplate={selectedTemplate}
                  selectTemplate={template => {
                    template && redirect(prepareTemplateLink(template))
                    selectTemplate && selectTemplate(template)
                  }}
                  rerenderTemplates={rerenderTemplates}
                  rerenderTemplate={rerenderTemplate}
                  onOpenTemplate={setOpenedTemplate}
                  onRename={onRename}
                  asProject={asProject}
                  asLink={asLink}
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
          selectTemplate={data => {
            selectTemplate
              ? selectTemplate(data)
              : openTemplate({ redirect, template: data, asProject })
          }}
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
const mapDispatchToProps = dispatch => ({
  redirect: (path = '/') => {
    dispatch(push(path))
  }
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LoadTemplate)
