"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var YelpApi = /*#__PURE__*/function () {
  function YelpApi() {
    _classCallCheck(this, YelpApi);

    _defineProperty(this, "API_URL_BASE", 'https://circuslabs.net/proxies/yelp-fusion-proxy/');

    _defineProperty(this, "API_KEY", 'YY1EZUlPao-rueU0HUgv42tKI3eBVx_pgjvCf9lgvJDI3zfdekygPyJ7YBumZQEmv_QE-2wkbKnzQdV4iNW8DnbGkg5y1dR6--sEdjEFpcEE-8Jm2v3eewFt9lAsX3Yx');
  }

  _createClass(YelpApi, [{
    key: "businessSearch",
    value: function businessSearch(parameters) {
      axios.get(this.API_URL_BASE, {
        params: _objectSpread({
          _ep: '/businesses/search'
        }, parameters),
        headers: {
          Authorization: "Bearer ".concat(this.API_KEY)
        }
      }).then(this.handleResponse).catch(this.handleError);
    }
  }, {
    key: "handleResponse",
    value: function handleResponse(response) {
      console.log('response', response);
      var event = new CustomEvent('got-results', {
        detail: response.data.businesses
      });
      document.querySelector('body').dispatchEvent(event);
    }
  }, {
    key: "handleError",
    value: function handleError(error) {
      console.log('error', error);
      var event = new CustomEvent('got-error', {
        detail: error
      });
      document.querySelector('body').dispatchEvent(event);
    }
  }]);

  return YelpApi;
}();
//# sourceMappingURL=yelp-api.js.map
