import React from 'react';
import { useTheme } from '../../stores/ui/theme';

const HeaderImage = () => {
  const {
    isNightMode
  } = useTheme();
  return isNightMode ? /*#__PURE__*/React.createElement("svg", {
    width: "420",
    height: "186",
    viewBox: "0 0 420 186",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 0H416V186H0V0Z",
    fill: "#1A1D2F"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M112 29C109.791 29 108 30.7909 108 33V125C108 127.209 109.791 129 112 129H138V62C138 57.5817 141.582 54 146 54H275V33C275 30.7909 273.209 29 271 29H112Z",
    fill: "#8A6A56"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M142 62C142 59.7909 143.791 58 146 58H305C307.209 58 309 59.7909 309 62V154C309 156.209 307.209 158 305 158H146C143.791 158 142 156.209 142 154V62Z",
    fill: "#8A6A56"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M151 86C151 83.7909 152.791 82 155 82H297C299.209 82 301 83.7909 301 86V146C301 148.209 299.209 150 297 150H155C152.791 150 151 148.209 151 146V86Z",
    fill: "#382F2E"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M277 71.5C277 73.433 275.433 75 273.5 75C271.567 75 270 73.433 270 71.5C270 69.567 271.567 68 273.5 68C275.433 68 277 69.567 277 71.5Z",
    fill: "#382F2E"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M289 71.5C289 73.433 287.433 75 285.5 75C283.567 75 282 73.433 282 71.5C282 69.567 283.567 68 285.5 68C287.433 68 289 69.567 289 71.5Z",
    fill: "#382F2E"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M301 71.5C301 73.433 299.433 75 297.5 75C295.567 75 294 73.433 294 71.5C294 69.567 295.567 68 297.5 68C299.433 68 301 69.567 301 71.5Z",
    fill: "#382F2E"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M249 97C249 94.7909 250.791 93 253 93H275C277.209 93 279 94.7909 279 97V136C279 138.209 277.209 140 275 140H253C250.791 140 249 138.209 249 136V97Z",
    fill: "#8A6A56"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M210 109C210 106.791 211.791 105 214 105H236C238.209 105 240 106.791 240 109V136C240 138.209 238.209 140 236 140H214C211.791 140 210 138.209 210 136V109Z",
    fill: "#8A6A56"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M172 124C172 121.791 173.791 120 176 120H198C200.209 120 202 121.791 202 124V136C202 138.209 200.209 140 198 140H176C173.791 140 172 138.209 172 136V124Z",
    fill: "#8A6A56"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "416",
    height: "186",
    viewBox: "0 0 416 186",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 0H416V186H0V0Z",
    fill: "#FBFCFE"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M108 33C108 30.7909 109.791 29 112 29H271C273.209 29 275 30.7909 275 33V125C275 127.209 273.209 129 271 129H112C109.791 129 108 127.209 108 125V33Z",
    fill: "#FFF3E4"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M112 29C109.791 29 108 30.7909 108 33V125C108 127.209 109.791 129 112 129H138V62C138 57.5817 141.582 54 146 54H275V33C275 30.7909 273.209 29 271 29H112Z",
    fill: "#FFD49C"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M142 62C142 59.7909 143.791 58 146 58H305C307.209 58 309 59.7909 309 62V154C309 156.209 307.209 158 305 158H146C143.791 158 142 156.209 142 154V62Z",
    fill: "#FFD49C"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M151 86C151 83.7909 152.791 82 155 82H297C299.209 82 301 83.7909 301 86V146C301 148.209 299.209 150 297 150H155C152.791 150 151 148.209 151 146V86Z",
    fill: "#FFF3E4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M277 71.5C277 73.433 275.433 75 273.5 75C271.567 75 270 73.433 270 71.5C270 69.567 271.567 68 273.5 68C275.433 68 277 69.567 277 71.5Z",
    fill: "#FFF3E4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M289 71.5C289 73.433 287.433 75 285.5 75C283.567 75 282 73.433 282 71.5C282 69.567 283.567 68 285.5 68C287.433 68 289 69.567 289 71.5Z",
    fill: "#FFF3E4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M301 71.5C301 73.433 299.433 75 297.5 75C295.567 75 294 73.433 294 71.5C294 69.567 295.567 68 297.5 68C299.433 68 301 69.567 301 71.5Z",
    fill: "#FFF3E4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M249 97C249 94.7909 250.791 93 253 93H275C277.209 93 279 94.7909 279 97V136C279 138.209 277.209 140 275 140H253C250.791 140 249 138.209 249 136V97Z",
    fill: "#FFD49C"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M210 109C210 106.791 211.791 105 214 105H236C238.209 105 240 106.791 240 109V136C240 138.209 238.209 140 236 140H214C211.791 140 210 138.209 210 136V109Z",
    fill: "#FFD49C"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M172 124C172 121.791 173.791 120 176 120H198C200.209 120 202 121.791 202 124V136C202 138.209 200.209 140 198 140H176C173.791 140 172 138.209 172 136V124Z",
    fill: "#FFD49C"
  }));
};

export default HeaderImage;