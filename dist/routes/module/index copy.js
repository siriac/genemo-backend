"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _moment = _interopRequireDefault(require("moment"));
var _module = require("../../dto/module.dto");
var _data = require("../../dto/data.dto");
var _activitie_duration = require("../../dto/activitie_duration.dto");
var _errors = require("../../lib/errors");
var _validations = require("../../middlewares/validations");
var _module2 = require("../../models/module");
var _data2 = require("../../models/data");
var _standBy = require("../../models/standBy");
var _running2 = require("../../models/running");
var _activities = require("../../models/activities");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var router = (0, _express.Router)();
var lastDate = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(id) {
    var lastData;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _data2.Data.find({
            idModule: id
          }).sort({
            createdAt: -1
          }).limit(1);
        case 2:
          lastData = _context.sent;
          return _context.abrupt("return", lastData);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function lastDate(_x) {
    return _ref.apply(this, arguments);
  };
}();
router.put("/:stationName", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
    var data, date1, _req$body, body, _req$params, stationName, position, batterie, fuel, phase1, phase2, date, duration, idRunning, action, module, recentDate, st, running, d1, d2, formatted, dft, df, d, minutToSubstrat, _st;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          date1 = new Date();
          _req$body = req.body, body = _req$body === void 0 ? {} : _req$body;
          console.log(req.body);
          _req$params = req.params, stationName = _req$params.stationName, position = _req$params.position;
          batterie = body.batterie, fuel = body.fuel, phase1 = body.phase1, phase2 = body.phase2, date = body.date, duration = body.duration, idRunning = body.idRunning, action = body.action;
          _context2.next = 8;
          return _module2.Module.findOne({
            stationName: stationName
          }).exec();
        case 8:
          module = _context2.sent;
          if (!module) {
            _context2.next = 57;
            break;
          }
          /**
           * mettre à jour standBy
           */
          console.log(action === "repos");
          if (!(action === "repos")) {
            _context2.next = 32;
            break;
          }
          console.log("je suis dans repos");
          //recherche de la donnnée la plus récente d'un module
          _context2.next = 15;
          return _standBy.StandBy.find({
            stationName: stationName
          }).sort({
            date_fin: -1
          }).limit(1);
        case 15:
          recentDate = _context2.sent;
          if (!(recentDate.length > 0 && (0, _moment["default"])(date1).diff((0, _moment["default"])(recentDate[0].date_fin), 'hours') < 1)) {
            _context2.next = 25;
            break;
          }
          console.log(recentDate[0].date_fin);
          console.log((0, _moment["default"])(recentDate[0].date_fin));
          console.log((0, _moment["default"])(date1));
          // on fait la mise à jour en inserant les données dans la tableau des infos
          _context2.next = 22;
          return _standBy.StandBy.findOneAndUpdate({
            _id: recentDate[0]._id
          }, {
            $push: {
              infos: body
            }
          }, {
            "new": true
          });
        case 22:
          data = _context2.sent;
          _context2.next = 30;
          break;
        case 25:
          st = (0, _moment["default"])(date);
          st.set('second', 0).set('minutes', 0);
          _context2.next = 29;
          return _standBy.StandBy.create({
            idModule: module._id.toString(),
            date_debut: st,
            date_fin: st.add(1, 'hours'),
            infos: [body]
          });
        case 29:
          data = _context2.sent;
        case 30:
          _context2.next = 55;
          break;
        case 32:
          if (!(action === "arret")) {
            _context2.next = 55;
            break;
          }
          _context2.next = 35;
          return _running2.Running.findById(idRunning);
        case 35:
          running = _context2.sent;
          if (!running) {
            _context2.next = 55;
            break;
          }
          //dr for duration running
          d1 = _moment["default"].duration(running.duree);
          d2 = _moment["default"].duration(duration);
          console.log(d1);
          console.log("------------");
          console.log(d2);
          d1.add(d2);
          console.log(d1);
          console.log("------------");
          formatted = _moment["default"].utc(d1.asMilliseconds()).format("HH:mm:ss");
          console.log('The formatted time is:', formatted); // "00:35:50"
          _context2.next = 49;
          return _running2.Running.findByIdAndUpdate(running._id, {
            duree: formatted
          }, {
            "new": true
          });
        case 49:
          d1 = _moment["default"].duration(module.duree_temporaire);
          dft = d1.add(d2)._data;
          d1 = _moment["default"].duration(module.duree_fonctionnement_format);
          df = d1.add(d2);
          _context2.next = 55;
          return _module2.Module.findByIdAndUpdate(module._id, {
            duree_temporaire_format: dft,
            duree_fonctionnement: df
          });
        case 55:
          _context2.next = 68;
          break;
        case 57:
          _context2.next = 59;
          return _module2.Module.create({
            stationName: stationName,
            position: position
          });
        case 59:
          module = module = _context2.sent;
          d = new Date();
          minutToSubstrat = (0, _moment["default"])(d).minutes();
          _st = (0, _moment["default"])(d).subtract(minutToSubstrat, 'minutes');
          _st.set('second', 0);
          data = {
            idModule: module._id.toString(),
            date_debut: _st,
            date_fin: _st.add(1, 'hours'),
            infos: [body]
          };
          _context2.next = 67;
          return _standBy.StandBy.create(data);
        case 67:
          data = _context2.sent;
        case 68:
          res.status(200).json({
            status: "Ok",
            idModule: module._id.toString()
          });
          _context2.next = 74;
          break;
        case 71:
          _context2.prev = 71;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);
        case 74:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 71]]);
  }));
  return function (_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post("/:stationName", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res, next) {
    var _running, _running$_id, stationName, _req$body2, body, running, module, err;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          stationName = req.params.stationName;
          _req$body2 = req.body, body = _req$body2 === void 0 ? {} : _req$body2;
          running = {};
          _context3.next = 6;
          return _module2.Module.findOne({
            stationName: stationName
          }).exec();
        case 6:
          module = _context3.sent;
          if (!module) {
            _context3.next = 13;
            break;
          }
          _context3.next = 10;
          return _running2.Running.create(body);
        case 10:
          running = _context3.sent;
          _context3.next = 16;
          break;
        case 13:
          err = new Error("Module introuvable avec cet Id");
          err.status = 404;
          throw err;
        case 16:
          res.status(200).send({
            status: "Ok",
            idRunning: (_running = running) === null || _running === void 0 ? void 0 : (_running$_id = _running._id) === null || _running$_id === void 0 ? void 0 : _running$_id.toString(),
            idModule: module._id.toString()
          });
          _context3.next = 22;
          break;
        case 19:
          _context3.prev = 19;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);
        case 22:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 19]]);
  }));
  return function (_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}());
router.get("/", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res, next) {
    var _req$query, _req$query$page, page, _req$query$limit, limit, _req$query$name, name, _yield$Promise$all, _yield$Promise$all2, modules, count, activitieWithOperatingTime;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$query = req.query, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 10 : _req$query$limit, _req$query$name = _req$query.name, name = _req$query$name === void 0 ? '' : _req$query$name;
          _context5.next = 4;
          return Promise.all([_module2.Module.find({
            stationName: {
              $regex: name,
              $options: 'i'
            },
            isDeleted: false
          }).skip((page - 1) * limit).limit(limit).sort({
            createdAt: -1
          }), _module2.Module.count({
            stationName: {
              $regex: name,
              $options: 'i'
            },
            isDeleted: false
          })]);
        case 4:
          _yield$Promise$all = _context5.sent;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
          modules = _yield$Promise$all2[0];
          count = _yield$Promise$all2[1];
          _context5.next = 10;
          return Promise.all(modules.map( /*#__PURE__*/function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(m) {
              var result, ld;
              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    result = _objectSpread(_objectSpread({}, m._doc), {}, {
                      duree_fonctionnement_format: _moment["default"].duration(m.duree_fonctionnement)._data
                    });
                    _context4.next = 3;
                    return lastDate(m._id.toString());
                  case 3:
                    ld = _context4.sent;
                    if (ld.length > 0) {
                      result.lastData = {
                        data: ld[0].infos[ld[0].infos.length - 1],
                        date_debut: ld[0].date_debut,
                        date_fin: ld[0].date_fin
                      };
                    } else {
                      result.lastData = {};
                    }
                    return _context4.abrupt("return", result);
                  case 6:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4);
            }));
            return function (_x11) {
              return _ref5.apply(this, arguments);
            };
          }())
          /*modules.map((m) => ({
            ...m._doc,
            duree_fonctionnement: moment.duration(m.duree_fonctionnement)._data,
            //lastData:lastDate(m._id.toString()).length
          }))*/);
        case 10:
          activitieWithOperatingTime = _context5.sent;
          //console.log(activitieWithOperatingTime);
          /*let m=modules.map(m=>({
          Y:parseInt(moment.duration(m.duree_fonctionnement).asYears()),
          M:parseInt(moment.duration(m.duree_fonctionnement).asMonths()),
          d:parseInt(moment.duration(m.duree_fonctionnement).asDays()),
          h:parseInt(moment.duration(m.duree_fonctionnement).asHours()),
          mi:parseInt(moment.duration(m.duree_fonctionnement).asMinutes()),
          s:parseInt(moment.duration(m.duree_fonctionnement).asSeconds())
          }));
          console.log(m[0].Y._data);*/
          res.json((0, _module.getModuleResponseDTO)(activitieWithOperatingTime, page, limit, count));
          _context5.next = 17;
          break;
        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);
        case 17:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 14]]);
  }));
  return function (_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}());
router.get("/:id", _validations.validateObjectId, /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res, next) {
    var id, lastInfo, result, module, lastData, info;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.params.id;
          lastInfo = {};
          result = {};
          _context6.next = 6;
          return _module2.Module.findOne({
            _id: id
          });
        case 6:
          module = _context6.sent;
          if (module) {
            _context6.next = 9;
            break;
          }
          throw new _errors.NotFoundError("Id Not Found");
        case 9:
          _context6.next = 11;
          return _data2.Data.find({
            idModule: id
          }).sort({
            createdAt: -1
          }).limit(1);
        case 11:
          lastData = _context6.sent;
          if (lastData.length > 0) {
            lastInfo = lastData[0];
            lastInfo = {
              data: lastInfo.infos[lastInfo.infos.length - 1],
              date_debut: lastInfo.date_debut,
              date_fin: lastInfo.date_fin
            };
          }
          module.duree_fonctionnement = _moment["default"].duration(module.duree_fonctionnement)._data;
          //console.log(moment.duration(module.duree_fonctionnement)._data);
          // const info = getDataResponseDTO(data, page, limit, count);
          info = (0, _module.getModuleByIdResponseDTO)(module);
          result = _objectSpread(_objectSpread({}, info), {}, {
            lastInfo: lastInfo
          });
          res.json(result);
          //res.json(getModuleByIdResponseDTO(module));
          _context6.next = 22;
          break;
        case 19:
          _context6.prev = 19;
          _context6.t0 = _context6["catch"](0);
          next(_context6.t0);
        case 22:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 19]]);
  }));
  return function (_x12, _x13, _x14) {
    return _ref6.apply(this, arguments);
  };
}());
router.post("/", /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res, next) {
    var module;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _module2.Module.create({
            //idImei: req.body.idImei,
            stationName: req.body.stationName,
            position: req.body.position
          });
        case 3:
          module = _context7.sent;
          res.json((0, _module.getCreateModuleResponseDTO)(module));
          _context7.next = 10;
          break;
        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          next(_context7.t0);
        case 10:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 7]]);
  }));
  return function (_x15, _x16, _x17) {
    return _ref7.apply(this, arguments);
  };
}());
router["delete"]("/:id", _validations.validateObjectId, /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res, next) {
    var deleted;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _module2.Module.findByIdAndRemove(req.params.id);
        case 3:
          deleted = _context8.sent;
          if (deleted) {
            _context8.next = 6;
            break;
          }
          throw new _errors.NotFoundError("No module deleted");
        case 6:
          res.json((0, _module.getDeleteModuleResponseDTO)(deleted));
          _context8.next = 12;
          break;
        case 9:
          _context8.prev = 9;
          _context8.t0 = _context8["catch"](0);
          next(_context8.t0);
        case 12:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 9]]);
  }));
  return function (_x18, _x19, _x20) {
    return _ref8.apply(this, arguments);
  };
}());
router.patch("/:id", _validations.validateObjectId, /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res, next) {
    var toUpdate, activity, _req$body3, stationName, position, action, date, idModule, recentActivity, err, heure_arret, heure_demarrage, dureeFonctTemporaire, _err, updated;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          toUpdate = {};
          activity = {};
          _req$body3 = req.body, stationName = _req$body3.stationName, position = _req$body3.position, action = _req$body3.action, date = _req$body3.date;
          idModule = req.params.id;
          if (!(action && date)) {
            _context9.next = 41;
            break;
          }
          _context9.next = 8;
          return _activities.Activities.find({
            idModule: idModule
          }).sort({
            date_demarrage: -1
          }).limit(1);
        case 8:
          recentActivity = _context9.sent;
          _context9.t0 = action;
          _context9.next = _context9.t0 === "START" ? 12 : _context9.t0 === "STOP" ? 23 : 40;
          break;
        case 12:
          if (!(recentActivity.length > 0 && recentActivity[0].date_arret || recentActivity.length === 0)) {
            _context9.next = 19;
            break;
          }
          _context9.next = 15;
          return _activities.Activities.create({
            idModule: idModule,
            date_demarrage: date
          });
        case 15:
          activity = _context9.sent;
          toUpdate.etat = true;
          _context9.next = 22;
          break;
        case 19:
          err = new Error("Impossible de demarrer un module qui n'a pas encore été arrété");
          err.status = 500;
          throw err;
        case 22:
          return _context9.abrupt("break", 41);
        case 23:
          console.log(recentActivity);
          if (!(recentActivity.length > 0 && !recentActivity[0].date_arret)) {
            _context9.next = 36;
            break;
          }
          //calcul de la difference pour avoir la durée temporaire
          heure_arret = (0, _moment["default"])(date);
          heure_demarrage = (0, _moment["default"])(recentActivity[0].date_demarrage);
          dureeFonctTemporaire = heure_arret.diff(heure_demarrage); //en milliseconde
          // on fait la mise à jour en inserant les données dans la tableau des infos
          _context9.next = 30;
          return _activities.Activities.findOneAndUpdate({
            _id: recentActivity[0]._id
          }, {
            date_arret: date,
            duration: dureeFonctTemporaire
          }, {
            "new": true
          });
        case 30:
          activity = _context9.sent;
          toUpdate.etat = false; //on signale que le groupe est en arret
          _context9.next = 34;
          return _module2.Module.findByIdAndUpdate(idModule, {
            $inc: {
              duree_fonctionnement: dureeFonctTemporaire
            }
          }, {
            "new": true
          });
        case 34:
          _context9.next = 39;
          break;
        case 36:
          _err = new Error("Impossible d'arreter un module non demarré");
          _err.status = 500;
          throw _err;
        case 39:
          return _context9.abrupt("break", 41);
        case 40:
          console.log("Choix incorrect de l'action");
        case 41:
          if (stationName) toUpdate.stationName = stationName;
          if (position) toUpdate.position = position;
          _context9.next = 45;
          return _module2.Module.findOneAndUpdate({
            _id: req.params.id,
            isDeleted: false
          }, toUpdate, {
            "new": true
          });
        case 45:
          updated = _context9.sent;
          if (updated) {
            _context9.next = 48;
            break;
          }
          throw new _errors.NotFoundError("No module updated");
        case 48:
          res.json((0, _module.getUpdateModuleResponseDTO)(updated));
          _context9.next = 54;
          break;
        case 51:
          _context9.prev = 51;
          _context9.t1 = _context9["catch"](0);
          next(_context9.t1);
        case 54:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 51]]);
  }));
  return function (_x21, _x22, _x23) {
    return _ref9.apply(this, arguments);
  };
}());
router.get("/:idModule/data", /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res, next) {
    var _req$params2, params, idModule, _req$query2, _req$query2$page, page, _req$query2$limit, limit, from, at, last, query, module, _yield$Promise$all3, _yield$Promise$all4, data, count;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _req$params2 = req.params, params = _req$params2 === void 0 ? {} : _req$params2;
          idModule = params.idModule;
          _req$query2 = req.query, _req$query2$page = _req$query2.page, page = _req$query2$page === void 0 ? 1 : _req$query2$page, _req$query2$limit = _req$query2.limit, limit = _req$query2$limit === void 0 ? 10 : _req$query2$limit, from = _req$query2.from, at = _req$query2.at, last = _req$query2.last;
          query = {};
          if (from && at) {
            query.date_debut = {
              $gte: new Date(from)
            };
            query.date_fin = {
              $lte: new Date(at)
            };
          } else {
            if (from && !at) {
              query.date_debut = {
                $gte: new Date(from)
              };
            } else {
              if (!from && at) {
                query.date_debut = new Date(at); //"2023-04-18T12:00:21.074+00:00"
              }
            }
          }

          query.idModule = idModule;
          /*console.log(query);
          var date2 = moment("2014-01-16");
          console.log(date2);*/
          /**
          * db.posts.find({ //query today up to tonight
          created_on: {
              $gte: new Date(2012, 7, 14), 
              $lt: new Date(2012, 7, 15)
          }
          })
          */
          //je recherche d'abord sur le module existe
          _context10.next = 9;
          return _module2.Module.findById(idModule);
        case 9:
          module = _context10.sent;
          if (module) {
            _context10.next = 12;
            break;
          }
          throw new _errors.NotFoundError("id module introuvable");
        case 12:
          _context10.next = 14;
          return Promise.all([_data2.Data.find(query).skip((page - 1) * limit).limit(limit).sort({
            createdAt: -1
          }), _data2.Data.count({
            idModule: idModule,
            date_debut: {
              $gte: from
            },
            date_fin: {
              $lte: at
            }
          })]);
        case 14:
          _yield$Promise$all3 = _context10.sent;
          _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 2);
          data = _yield$Promise$all4[0];
          count = _yield$Promise$all4[1];
          res.json((0, _data.getDataResponseDTO)(data, page, limit, count));
          _context10.next = 24;
          break;
        case 21:
          _context10.prev = 21;
          _context10.t0 = _context10["catch"](0);
          next(_context10.t0);
        case 24:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 21]]);
  }));
  return function (_x24, _x25, _x26) {
    return _ref10.apply(this, arguments);
  };
}());
router.get("/:idModule/activities", /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res, next) {
    var _req$query3, _req$query3$page, page, _req$query3$limit, limit, dateStarting, dateStoping, idModule, module, _yield$Promise$all5, _yield$Promise$all6, activitiesWithOperatingTime, count;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _req$query3 = req.query, _req$query3$page = _req$query3.page, page = _req$query3$page === void 0 ? 1 : _req$query3$page, _req$query3$limit = _req$query3.limit, limit = _req$query3$limit === void 0 ? 10 : _req$query3$limit, dateStarting = _req$query3.dateStarting, dateStoping = _req$query3.dateStoping;
          _context11.prev = 1;
          idModule = req.params.idModule;
          _context11.next = 5;
          return _module2.Module.findOne({
            _id: idModule
          });
        case 5:
          module = _context11.sent;
          if (module) {
            _context11.next = 8;
            break;
          }
          throw new _errors.NotFoundError("Id Not Found");
        case 8:
          _context11.next = 10;
          return Promise.all([_activities.Activities.find({
            idModule: idModule,
            date_demarrage: {
              $gte: new Date(dateStarting)
            },
            date_arret: {
              $lte: new Date(dateStoping)
            }
          }).skip((page - 1) * limit).limit(limit), _activities.Activities.count({
            idModule: idModule,
            date_demarrage: {
              $gte: new Date(dateStoping)
            },
            date_arret: {
              $lte: new Date(dateStoping)
            }
          })]);
        case 10:
          _yield$Promise$all5 = _context11.sent;
          _yield$Promise$all6 = _slicedToArray(_yield$Promise$all5, 2);
          activitiesWithOperatingTime = _yield$Promise$all6[0];
          count = _yield$Promise$all6[1];
          res.json((0, _activitie_duration.getActivitiesResponseDTO)(activitiesWithOperatingTime, page, limit, count));
          _context11.next = 20;
          break;
        case 17:
          _context11.prev = 17;
          _context11.t0 = _context11["catch"](1);
          next(_context11.t0);
        case 20:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[1, 17]]);
  }));
  return function (_x27, _x28, _x29) {
    return _ref11.apply(this, arguments);
  };
}());
router.get('/search', /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res, next) {
    var _req$query4, _req$query4$page, page, _req$query4$limit, limit, name, _yield$Promise$all7, _yield$Promise$all8, modules, count, activitieWithOperatingTime;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _req$query4 = req.query, _req$query4$page = _req$query4.page, page = _req$query4$page === void 0 ? 1 : _req$query4$page, _req$query4$limit = _req$query4.limit, limit = _req$query4$limit === void 0 ? 10 : _req$query4$limit, name = _req$query4.name;
          console.log(name);
          _context13.next = 5;
          return Promise.all([
          //Module.find({ $text: {$search: name},isDeleted: false }){"$regex": "Arm"}
          _module2.Module.find({
            stationName: {
              $regex: '',
              $options: 'i'
            },
            isDeleted: false
          }).skip((page - 1) * limit).limit(limit), _module2.Module.count({
            stationName: {
              $regex: name,
              $options: 'i'
            },
            isDeleted: false
          })]);
        case 5:
          _yield$Promise$all7 = _context13.sent;
          _yield$Promise$all8 = _slicedToArray(_yield$Promise$all7, 2);
          modules = _yield$Promise$all8[0];
          count = _yield$Promise$all8[1];
          _context13.next = 11;
          return Promise.all(modules.map( /*#__PURE__*/function () {
            var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(m) {
              var result, ld;
              return _regeneratorRuntime().wrap(function _callee12$(_context12) {
                while (1) switch (_context12.prev = _context12.next) {
                  case 0:
                    result = _objectSpread(_objectSpread({}, m._doc), {}, {
                      duree_fonctionnement_format: _moment["default"].duration(m.duree_fonctionnement)._data
                    });
                    _context12.next = 3;
                    return lastDate(m._id.toString());
                  case 3:
                    ld = _context12.sent;
                    if (ld.length > 0) {
                      result.lastData = {
                        data: ld[0].infos[ld[0].infos.length - 1],
                        date_debut: ld[0].date_debut,
                        date_fin: ld[0].date_fin
                      };
                    } else {
                      result.lastData = {};
                    }
                    return _context12.abrupt("return", result);
                  case 6:
                  case "end":
                    return _context12.stop();
                }
              }, _callee12);
            }));
            return function (_x33) {
              return _ref13.apply(this, arguments);
            };
          }()));
        case 11:
          activitieWithOperatingTime = _context13.sent;
          res.json((0, _module.getModuleResponseDTO)(activitieWithOperatingTime, page, limit, count));
          _context13.next = 18;
          break;
        case 15:
          _context13.prev = 15;
          _context13.t0 = _context13["catch"](0);
          next(_context13.t0);
        case 18:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 15]]);
  }));
  return function (_x30, _x31, _x32) {
    return _ref12.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;