import React, { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import Dialog from '@santiment-network/ui/Dialog';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import Loader from '@santiment-network/ui/Loader/Loader';
import getCroppedImg from './utils';
import ImageUpload, { extractUploadedImageUrl } from '../../../../components/ImageUpload';
import styles from './ImageEditor.module.css';
const MAX_ZOOM = 2;
const MIN_ZOOM = 1;
const STEP_ZOOM = 0.05;

const OnStepChange = ({
  onClick,
  className
}) => {
  return /*#__PURE__*/React.createElement(Icon, {
    type: "picture",
    className: className,
    onClick: onClick
  });
};

const ImageEditor = ({
  imageUrl,
  children,
  className,
  onChange,
  setOpen,
  onChangeUrl,
  isOpen,
  title,
  withRemoveButton = false,
  saving
}) => {
  const [crop, setCrop] = useState({
    x: 0,
    y: 0
  });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onZoomChange = value => setZoom(Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, value)));

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  useEffect(() => {
    setZoom(MIN_ZOOM);
  }, [imageUrl]);
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels, rotation);
      onChange(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  const onUploaded = data => {
    const url = extractUploadedImageUrl(data);

    if (url) {
      onChangeUrl && onChangeUrl(url, false);
    }
  };

  return /*#__PURE__*/React.createElement(Dialog, {
    title: title,
    classes: styles,
    open: isOpen,
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
    trigger: /*#__PURE__*/React.createElement("div", {
      className: className
    }, children)
  }, /*#__PURE__*/React.createElement(Dialog.ScrollContent, {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.img
  }, imageUrl && /*#__PURE__*/React.createElement(Cropper, {
    image: imageUrl,
    crop: crop,
    rotation: rotation,
    zoom: zoom,
    aspect: 1,
    cropShape: "round",
    showGrid: false,
    onCropChange: setCrop,
    onRotationChange: setRotation,
    onCropComplete: onCropComplete,
    onZoomChange: onZoomChange
  }), !imageUrl && /*#__PURE__*/React.createElement("div", {
    className: styles.round
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.actions
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.sliderContainer
  }, !saving && imageUrl && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(OnStepChange, {
    onClick: () => onZoomChange(zoom - STEP_ZOOM),
    className: styles.zoomMin
  }), /*#__PURE__*/React.createElement("input", {
    type: "range",
    step: STEP_ZOOM,
    min: MIN_ZOOM,
    max: MAX_ZOOM,
    value: zoom,
    onChange: event => onZoomChange(event.target.value),
    className: styles.slider
  }), /*#__PURE__*/React.createElement(OnStepChange, {
    onClick: () => onZoomChange(zoom + STEP_ZOOM),
    className: styles.zoomMax
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles.btns
  }, saving ? /*#__PURE__*/React.createElement(Loader, null) : /*#__PURE__*/React.createElement(React.Fragment, null, withRemoveButton && /*#__PURE__*/React.createElement(Button, {
    variant: "flat",
    accent: "negative",
    disabled: !imageUrl,
    className: styles.cropBtn,
    onClick: () => onChangeUrl('', false)
  }, "Remove"), /*#__PURE__*/React.createElement(Button, {
    border: true,
    className: styles.addBtn
  }, /*#__PURE__*/React.createElement(ImageUpload, {
    className: styles.fileLoader,
    onUploaded: onUploaded
  }), "Upload"), imageUrl && /*#__PURE__*/React.createElement(Button, {
    variant: "fill",
    accent: "positive",
    disabled: !imageUrl,
    className: styles.cropBtn,
    onClick: showCroppedImage
  }, "Update"))))));
};

export default ImageEditor;