function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
export const UPLOAD_IMG_QUERY = gql`
  mutation ($images: [Upload!]!) {
    uploadImage(images: $images) {
      contentHash
      fileName
      imageUrl
      hashAlgorithm
    }
  }
`;
export const extractUploadedImageUrl = data => {
  const [first] = data;

  if (first) {
    const {
      data: {
        uploadImage
      }
    } = first;
    const [image] = uploadImage;

    if (image) {
      const {
        imageUrl
      } = image;
      return imageUrl;
    }
  }
};

const ImageUploadTrigger = props => /*#__PURE__*/React.createElement("input", _extends({
  type: "file",
  required: true
}, props));

export default graphql(UPLOAD_IMG_QUERY)(({
  mutate,
  trigger: El = ImageUploadTrigger,
  onUploaded,
  className
}) => {
  const onChange = ({
    target: {
      validity,
      files
    }
  }) => {
    validity.valid && mutate({
      variables: {
        images: files
      }
    }).then((...rest) => {
      onUploaded && onUploaded(rest);
    });
  };

  return /*#__PURE__*/React.createElement(El, {
    onChange: onChange,
    className: className
  });
});