import React from 'react';
import PropTypes from 'prop-types';
import nprogress from 'nprogress';
import Icon from '@santiment-network/ui/Icon';
import { BLOCK_BUTTONS, INLINE_BUTTONS, Editor, createEditorState } from 'medium-draft';
import CustomImageSideButton from './CustomImageSideButton';
import './Editor.scss';
INLINE_BUTTONS[0].label = /*#__PURE__*/React.createElement(Icon, {
  type: "text-bold"
});
INLINE_BUTTONS[1].label = /*#__PURE__*/React.createElement(Icon, {
  type: "text-italic"
});
INLINE_BUTTONS[2].label = /*#__PURE__*/React.createElement(Icon, {
  type: "text-underline"
});
INLINE_BUTTONS[4].label = /*#__PURE__*/React.createElement(Icon, {
  type: "link"
});
BLOCK_BUTTONS[1].label = /*#__PURE__*/React.createElement(Icon, {
  type: "quote"
});
BLOCK_BUTTONS[2].label = /*#__PURE__*/React.createElement(Icon, {
  type: "bullet-list"
});
BLOCK_BUTTONS.push({
  label: /*#__PURE__*/React.createElement(Icon, {
    type: "text-big"
  }),
  style: 'header-one',
  icon: 'header',
  description: 'Heading 1'
});
BLOCK_BUTTONS.push({
  label: /*#__PURE__*/React.createElement(Icon, {
    type: "text-small"
  }),
  style: 'header-two',
  icon: 'header',
  description: 'Heading 2'
});

class SanEditor extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      editorState: createEditorState(this.props.defaultEditorContent)
    };

    this.onChange = editorState => {
      this.setState({
        editorState
      }, () => this.props.onChange(editorState));
    };

    this.onImgLoad = state => {
      switch (state) {
        case 'start':
          return nprogress.start();

        case 'done':
        default:
          return nprogress.done();
      }
    };
  }

  render() {
    const {
      editorState
    } = this.state;
    const {
      placeholder = '',
      readOnly
    } = this.props;
    return /*#__PURE__*/React.createElement(Editor, {
      editorEnabled: !readOnly,
      editorState: editorState,
      onChange: this.onChange,
      placeholder: placeholder,
      sideButtons: [{
        title: 'Image',
        component: CustomImageSideButton,
        props: {
          onImgLoad: this.onImgLoad
        }
      }],
      toolbarConfig: {
        block: ['blockquote', 'unordered-list-item', 'header-one', 'header-two'],
        inline: ['hyperlink', 'BOLD', 'UNDERLINE', 'ITALIC']
      }
    });
  }

}

SanEditor.propTypes = {
  onChange: PropTypes.func,
  readOnly: PropTypes.bool
};
SanEditor.defaultProps = {
  defaultEditorContent: undefined,
  onChange: () => {},
  readOnly: false
};
export default SanEditor;