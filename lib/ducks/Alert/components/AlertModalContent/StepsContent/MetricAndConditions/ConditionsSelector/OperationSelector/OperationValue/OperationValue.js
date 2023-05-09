import React from 'react';
import { components } from 'react-select';
import { formatOptionLabel } from '../utils';

const OperationValue = props => /*#__PURE__*/React.createElement(components.SingleValue, props, formatOptionLabel(props.data));

export default OperationValue;