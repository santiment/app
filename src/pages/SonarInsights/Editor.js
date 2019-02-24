import React from 'react'
import { Icon } from '@santiment-network/ui'
import {
  BLOCK_BUTTONS,
  INLINE_BUTTONS,
  Editor,
  createEditorState
} from 'medium-draft'
import mediumDraftImporter from 'medium-draft/lib/importer'
import mediumDraftExporter from 'medium-draft/lib/exporter'
import { sanitizeMediumDraftHtml } from './../../utils/utils'
import './Editor.scss'
import { convertToRaw } from 'draft-js'

INLINE_BUTTONS[0].label = <Icon type='text-bold' />
INLINE_BUTTONS[1].label = <Icon type='text-italic' />
INLINE_BUTTONS[2].label = <Icon type='text-underline' />
INLINE_BUTTONS[4].label = <Icon type='link' />

BLOCK_BUTTONS[1].label = <Icon type='quote' />
BLOCK_BUTTONS[2].label = <Icon type='bullet-list' />

class SanEditor extends React.Component {
  static defaultProps = {
    defaultText: '',
    onChange: () => {}
  }

  state = {
    editorState: createEditorState(
      convertToRaw(mediumDraftImporter(this.props.defaultText))
    )
  }

  onChange = editorState => {
    this.setState({ editorState }, () =>
      this.props.onChange(
        sanitizeMediumDraftHtml(
          mediumDraftExporter(editorState.getCurrentContent())
        )
      )
    )
  }

  refsEditor = React.createRef()

  componentDidMount () {
    this.refsEditor.current.focus()
  }

  render () {
    const { editorState } = this.state
    const { placeholder = '' } = this.props
    return (
      <Editor
        ref={this.refsEditor}
        editorState={editorState}
        onChange={this.onChange}
        placeholder={placeholder}
        toolbarConfig={{
          block: ['blockquote', 'unordered-list-item'],
          inline: ['hyperlink', 'BOLD', 'UNDERLINE', 'ITALIC']
        }}
      />
    )
  }
}

export default SanEditor
