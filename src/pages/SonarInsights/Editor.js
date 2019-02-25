import React from 'react'
import { Icon } from '@santiment-network/ui'
import {
  BLOCK_BUTTONS,
  INLINE_BUTTONS,
  Editor,
  createEditorState
} from 'medium-draft'
import './Editor.scss'

INLINE_BUTTONS[0].label = <Icon type='text-bold' />
INLINE_BUTTONS[1].label = <Icon type='text-italic' />
INLINE_BUTTONS[2].label = <Icon type='text-underline' />
INLINE_BUTTONS[4].label = <Icon type='link' />

BLOCK_BUTTONS[1].label = <Icon type='quote' />
BLOCK_BUTTONS[2].label = <Icon type='bullet-list' />

class SanEditor extends React.Component {
  static defaultProps = {
    defaultValue: '',
    onChange: () => {},
    readOnly: false
  }

  state = {
    editorState: createEditorState(this.props.defaultEditorState)
  }

  onChange = editorState => {
    this.setState({ editorState }, () => this.props.onChange(editorState))
  }

  refsEditor = React.createRef()

  componentDidMount () {
    this.refsEditor.current.focus()
  }

  render () {
    const { editorState } = this.state
    const { placeholder = '', readOnly } = this.props
    return (
      <Editor
        editorEnabled={!readOnly}
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
