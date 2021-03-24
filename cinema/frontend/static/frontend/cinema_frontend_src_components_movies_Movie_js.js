/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkwcinema"] = self["webpackChunkwcinema"] || []).push([["cinema_frontend_src_components_movies_Movie_js"],{

/***/ "./cinema/frontend/src/components/movies/Movie.js":
/*!********************************************************!*\
  !*** ./cinema/frontend/src/components/movies/Movie.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ \"./node_modules/moment/moment.js\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n\nvar Movie = function Movie(_ref) {\n  var movie = _ref.movie,\n      detail = _ref.detail;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"card card-body mb-4\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"h3\", {\n    className: \"card-title mb-2\"\n  }, movie.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"card-text\"\n  }, movie.description, !movie.description && 'No description'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"list-group list-group-flush mt-3\"\n  }, movie.sessions.length !== 0 ? movie.sessions.map(function (session) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", {\n      key: session.id,\n      className: \"list-group-item list-group-item-action session-info\"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", null, moment__WEBPACK_IMPORTED_MODULE_1___default()(session.start).format('MMMM DD'), \" at \", moment__WEBPACK_IMPORTED_MODULE_1___default()(session.start).format('HH:mm')), !detail ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", {\n      className: \"outline-cyan\"\n    }, \"$\", session.price) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {\n      to: \"/\".concat(session.id, \"/buy_tickets\"),\n      className: \"btn btn-outline-primary\"\n    }, \"Book\"));\n  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", {\n    className: \"list-group-item\"\n  }, \"No sessions today\")), !detail && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {\n    className: \"btn btn-outline-info mt-3\",\n    to: \"/movie/\".concat(movie.name)\n  }, \"More\"));\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Movie);\n\n//# sourceURL=webpack://wcinema/./cinema/frontend/src/components/movies/Movie.js?");

/***/ })

}]);