import React from 'react'
import PropTypes from 'prop-types'
import nprogress from 'nprogress'
import Icon from '@santiment-network/ui/Icon'
import {
  BLOCK_BUTTONS,
  INLINE_BUTTONS,
  Editor,
  createEditorState
} from 'medium-draft'
import CustomImageSideButton from './CustomImageSideButton'
import './Editor.scss'

INLINE_BUTTONS[0].label = <Icon type='text-bold' />
INLINE_BUTTONS[1].label = <Icon type='text-italic' />
INLINE_BUTTONS[2].label = <Icon type='text-underline' />
INLINE_BUTTONS[4].label = <Icon type='link' />

BLOCK_BUTTONS[1].label = <Icon type='quote' />
BLOCK_BUTTONS[2].label = <Icon type='bullet-list' />

BLOCK_BUTTONS.push({
  label: <Icon type='text-big' />,
  style: 'header-one',
  icon: 'header',
  description: 'Heading 1'
})
BLOCK_BUTTONS.push({
  label: <Icon type='text-small' />,
  style: 'header-two',
  icon: 'header',
  description: 'Heading 2'
})

class SanEditor extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    readOnly: PropTypes.bool
  }

  static defaultProps = {
    defaultEditorContent: undefined,
    onChange: () => {},
    readOnly: false
  }

  state = {
    editorState: createEditorState(this.props.defaultEditorContent)
  }

  onChange = editorState => {
    this.setState({ editorState }, () => this.props.onChange(editorState))
  }

  onImgLoad = state => {
    switch (state) {
      case 'start':
        return nprogress.start()
      case 'done':
      default:
        return nprogress.done()
    }
  }

  render () {
    const { editorState } = this.state
    const { placeholder = '', readOnly } = this.props
    return (
      <Editor
        editorEnabled={!readOnly}
        editorState={editorState}
        onChange={this.onChange}
        placeholder={placeholder}
        sideButtons={[
          {
            title: 'Image',
            component: CustomImageSideButton,
            props: {
              onImgLoad: this.onImgLoad
            }
          }
        ]}
        toolbarConfig={{
          block: [
            'blockquote',
            'unordered-list-item',
            'header-one',
            'header-two'
          ],
          inline: ['hyperlink', 'BOLD', 'UNDERLINE', 'ITALIC']
        }}
      />
    )
  }
}

export default SanEditor
