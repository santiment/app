function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { ApolloLink, Observable } from 'apollo-link';
import { print } from 'graphql/language/printer';
import { getAPIUrl } from './../utils/utils';

const isObject = value => value !== null && typeof value === 'object';

const UploadLink = new ApolloLink((operation, forward) => {
  if (typeof FormData !== 'undefined' && isObject(operation.variables)) {
    const files = operation.variables.images;

    if (files && files.length > 0) {
      const {
        headers
      } = operation.getContext();
      const formData = new FormData();
      const filesData = Object.keys(files).filter(key => {
        return files[key].name;
      });
      formData.append('query', print(operation.query));
      let variables = {
        images: []
      };
      filesData.forEach(key => {
        variables['images'].push(files[key].name);
        formData.append(files[key].name, files[key]);
      });
      formData.append('variables', JSON.stringify(variables));
      return new Observable(observer => {
        fetch(`${getAPIUrl()}/graphql`, {
          method: 'POST',
          headers: _objectSpread({}, headers),
          body: formData,
          credentials: 'include'
        }).then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }

          return response.json();
        }).then(success => {
          observer.next(success);
          observer.complete();
        }).catch(error => {
          observer.next(error);
          observer.error(error);
        });
      });
    }
  }

  return forward(operation);
});
export default UploadLink;