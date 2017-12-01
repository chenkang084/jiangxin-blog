webpackJsonp([1],{

/***/ 459:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = {
  namespace: "users2",
  state: {
    list: [],
    total: null,
    page: null
  },
  reducers: {
    save: function save(state, _ref) {
      var _ref$payload = _ref.payload,
          list = _ref$payload.data,
          total = _ref$payload.total,
          page = _ref$payload.page;

      return _extends({}, state, { list: list, total: total, page: page });
    }
  },
  effects: {},
  subscriptions: {
    setup: function setup(_ref2) {
      var dispatch = _ref2.dispatch,
          history = _ref2.history;

      return history.listen(function (_ref3) {
        var pathname = _ref3.pathname,
            query = _ref3.query;

        if (pathname === "/users") {
          dispatch({ type: "fetch", payload: query });
        }
      });
    }
  }
};

/***/ })

});
//# sourceMappingURL=1.ed5b10b2.bundle.js.map