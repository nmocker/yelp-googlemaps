"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GoogleApi = /*#__PURE__*/function () {
  // note here which instance variables I'm using
  function GoogleApi() {
    var _this = this;

    _classCallCheck(this, GoogleApi);

    _defineProperty(this, "myMap", null);

    _defineProperty(this, "myInfoWindow", null);

    _defineProperty(this, "markers", []);

    _defineProperty(this, "handlePlaceSearch", function (theEvent) {
      console.log('got a place search request', theEvent);
      var service = new google.maps.places.PlacesService(_this.myMap);
      var details = theEvent.detail;
      var request = {
        query: details['query'],
        bounds: _this.myMap.getBounds() // location: details['location'],
        // radius: 10000

      };
      service.textSearch(request, function (results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          console.log('got results', results); // clear any previous markers

          _this.clearMarkers();

          var newEvent = new CustomEvent('place-results', {
            detail: results
          });
          document.dispatchEvent(newEvent);

          var _iterator = _createForOfIteratorHelper(results),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var place = _step.value;
              var geo = place.geometry.location;
              var title = place.name;
              var content = "<h2>".concat(place.name, "</h2>") + "<h2>".concat(place.formatted_address, "</h2>") + "<h2>".concat(place.rating, " \u2B50</h2>");

              _this.addMarker(geo, {
                title: title,
                content: content
              });
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      });
    });

    console.log('GoogleApi()');
    this.setupListeners();
  }

  _createClass(GoogleApi, [{
    key: "setupListeners",
    value: function setupListeners() {
      document.addEventListener('place-search', this.handlePlaceSearch);
    }
  }, {
    key: "clearMarkers",
    value: function clearMarkers() {
      this.markers.forEach(function (marker) {
        marker.setMap(null);
      });
      this.markers = [];
    }
  }, {
    key: "setup",
    value: function setup() {
      console.log('setting up a map');
      var mbStadium = {
        lat: 33.7555,
        lng: -84.4010
      };
      this.myMap = new google.maps.Map(document.getElementById('my-map'), {
        center: mbStadium,
        zoom: 15
      });
      this.myInfoWindow = new google.maps.InfoWindow({
        content: '',
        maxWidth: 200
      });
      this.addMarker(mbStadium, {
        title: "Mercedes-Benz Stadium",
        content: '<h2>Mercedes-Benz Stadium</h2>'
      });
    } // info will be an object with various bits of info

  }, {
    key: "addMarker",
    value: function addMarker(position, info) {
      var _this2 = this;

      var marker = new google.maps.Marker({
        map: this.myMap,
        position: position,
        title: info['title']
      });
      this.markers.push(marker);
      marker.addListener('click', function () {
        _this2.myInfoWindow.setContent(info['content']);

        _this2.myInfoWindow.open(_this2.myMap, marker);
      });
    }
  }]);

  return GoogleApi;
}();
//# sourceMappingURL=google-api.js.map
