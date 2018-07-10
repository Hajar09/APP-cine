require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mongoose__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cors__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_cors__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_volleyball__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_volleyball___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_volleyball__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__routes_cine__ = __webpack_require__(6);


 //pb header

const port = process.env.PORT || 5679;

//
const app = __WEBPACK_IMPORTED_MODULE_0_express___default()();
//
//config mongoose
__WEBPACK_IMPORTED_MODULE_1_mongoose___default.a.connect('mongodb://localhost:27017/cine_db');
var db = __WEBPACK_IMPORTED_MODULE_1_mongoose___default.a.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log(`[MongoDB] connected`);
});
//
app.use(__WEBPACK_IMPORTED_MODULE_3_volleyball___default.a);
app.use(__WEBPACK_IMPORTED_MODULE_2_cors___default()());
app.use('/cine', __WEBPACK_IMPORTED_MODULE_4__routes_cine__["a" /* default */]);

app.listen(port, () => {
  console.log(`[Express] running on port : ${port}`);
});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("volleyball");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_Movie__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_multer__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_multer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_multer__);




//config multer
const storage = __WEBPACK_IMPORTED_MODULE_2_multer___default.a.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public');
  },
  filename: function (req, file, cb) {
    cb(null, file.filename + '-' + Date.now());
  }
});

const upload = __WEBPACK_IMPORTED_MODULE_2_multer___default()({ storage: storage });

const cineRouter = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();

cineRouter.post('/add', upload.single('img'), (req, res) => {
  const newMovie = new __WEBPACK_IMPORTED_MODULE_1__models_Movie__["a" /* default */](req.body);
  newMovie.img = req.file.filename;
  newMovie.save((err, movie) => {
    if (err) return console.log(err);
    res.redirect("http://localhost:3000/");
  });
});

cineRouter.get('/', (req, res) => {
  __WEBPACK_IMPORTED_MODULE_1__models_Movie__["a" /* default */].find({}, (err, films) => {
    if (err) res.send(err);
    res.json(films);
  });
});

cineRouter.get('/:id', (req, res) => {
  //c'est un paramètre id: l'id qu'on rentre ici doit correspondre à celui qu'on find dans notre base de données
  __WEBPACK_IMPORTED_MODULE_1__models_Movie__["a" /* default */].find({ _id: req.params.id }, (err, movie) => {
    if (err) res.send(err);
    res.json(movie);
  });
});

cineRouter.post('/:id', (req, res) => {
  //une sorte de put (car il marche pas avec un formulaire html)
  __WEBPACK_IMPORTED_MODULE_1__models_Movie__["a" /* default */].findOneAndUpdate({ _id: req.params.id }, req.body, (err, movie) => {
    if (err) res.send(err);
    res.json(movie);
  });
});

cineRouter.delete('/:id', (req, res) => {
  __WEBPACK_IMPORTED_MODULE_1__models_Movie__["a" /* default */].delete({ _id: req.params.id }, (err, movie) => {
    if (err) res.send(err);
    res.json({ message: "y'a plus" });
  });
});

/* harmony default export */ __webpack_exports__["a"] = (cineRouter);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);

const Schema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema;

const movieSchema = new Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  actors: { type: Array, required: true },
  kind: { type: String, required: true },
  img: { type: String, required: true }
});

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model("Movie", movieSchema));

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map