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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/fbemitter/index.js":
/*!*****************************************!*\
  !*** ./node_modules/fbemitter/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * Copyright (c) 2014-present, Facebook, Inc.\n * All rights reserved.\n *\n * This source code is licensed under the BSD-style license found in the\n * LICENSE file in the root directory of this source tree. An additional grant\n * of patent rights can be found in the PATENTS file in the same directory.\n */\n\nvar fbemitter = {\n  EventEmitter: __webpack_require__(/*! ./lib/BaseEventEmitter */ \"./node_modules/fbemitter/lib/BaseEventEmitter.js\"),\n  EmitterSubscription : __webpack_require__(/*! ./lib/EmitterSubscription */ \"./node_modules/fbemitter/lib/EmitterSubscription.js\")\n};\n\nmodule.exports = fbemitter;\n\n\n//# sourceURL=webpack:///./node_modules/fbemitter/index.js?");

/***/ }),

/***/ "./node_modules/fbemitter/lib/BaseEventEmitter.js":
/*!********************************************************!*\
  !*** ./node_modules/fbemitter/lib/BaseEventEmitter.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2014-present, Facebook, Inc.\n * All rights reserved.\n *\n * This source code is licensed under the BSD-style license found in the\n * LICENSE file in the root directory of this source tree. An additional grant\n * of patent rights can be found in the PATENTS file in the same directory.\n *\n * @providesModule BaseEventEmitter\n * @typechecks\n */\n\n\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }\n\nvar EmitterSubscription = __webpack_require__(/*! ./EmitterSubscription */ \"./node_modules/fbemitter/lib/EmitterSubscription.js\");\nvar EventSubscriptionVendor = __webpack_require__(/*! ./EventSubscriptionVendor */ \"./node_modules/fbemitter/lib/EventSubscriptionVendor.js\");\n\nvar emptyFunction = __webpack_require__(/*! fbjs/lib/emptyFunction */ \"./node_modules/fbjs/lib/emptyFunction.js\");\nvar invariant = __webpack_require__(/*! fbjs/lib/invariant */ \"./node_modules/fbjs/lib/invariant.js\");\n\n/**\n * @class BaseEventEmitter\n * @description\n * An EventEmitter is responsible for managing a set of listeners and publishing\n * events to them when it is told that such events happened. In addition to the\n * data for the given event it also sends a event control object which allows\n * the listeners/handlers to prevent the default behavior of the given event.\n *\n * The emitter is designed to be generic enough to support all the different\n * contexts in which one might want to emit events. It is a simple multicast\n * mechanism on top of which extra functionality can be composed. For example, a\n * more advanced emitter may use an EventHolder and EventFactory.\n */\n\nvar BaseEventEmitter = (function () {\n  /**\n   * @constructor\n   */\n\n  function BaseEventEmitter() {\n    _classCallCheck(this, BaseEventEmitter);\n\n    this._subscriber = new EventSubscriptionVendor();\n    this._currentSubscription = null;\n  }\n\n  /**\n   * Adds a listener to be invoked when events of the specified type are\n   * emitted. An optional calling context may be provided. The data arguments\n   * emitted will be passed to the listener function.\n   *\n   * TODO: Annotate the listener arg's type. This is tricky because listeners\n   *       can be invoked with varargs.\n   *\n   * @param {string} eventType - Name of the event to listen to\n   * @param {function} listener - Function to invoke when the specified event is\n   *   emitted\n   * @param {*} context - Optional context object to use when invoking the\n   *   listener\n   */\n\n  BaseEventEmitter.prototype.addListener = function addListener(eventType, listener, context) {\n    return this._subscriber.addSubscription(eventType, new EmitterSubscription(this._subscriber, listener, context));\n  };\n\n  /**\n   * Similar to addListener, except that the listener is removed after it is\n   * invoked once.\n   *\n   * @param {string} eventType - Name of the event to listen to\n   * @param {function} listener - Function to invoke only once when the\n   *   specified event is emitted\n   * @param {*} context - Optional context object to use when invoking the\n   *   listener\n   */\n\n  BaseEventEmitter.prototype.once = function once(eventType, listener, context) {\n    var emitter = this;\n    return this.addListener(eventType, function () {\n      emitter.removeCurrentListener();\n      listener.apply(context, arguments);\n    });\n  };\n\n  /**\n   * Removes all of the registered listeners, including those registered as\n   * listener maps.\n   *\n   * @param {?string} eventType - Optional name of the event whose registered\n   *   listeners to remove\n   */\n\n  BaseEventEmitter.prototype.removeAllListeners = function removeAllListeners(eventType) {\n    this._subscriber.removeAllSubscriptions(eventType);\n  };\n\n  /**\n   * Provides an API that can be called during an eventing cycle to remove the\n   * last listener that was invoked. This allows a developer to provide an event\n   * object that can remove the listener (or listener map) during the\n   * invocation.\n   *\n   * If it is called when not inside of an emitting cycle it will throw.\n   *\n   * @throws {Error} When called not during an eventing cycle\n   *\n   * @example\n   *   var subscription = emitter.addListenerMap({\n   *     someEvent: function(data, event) {\n   *       console.log(data);\n   *       emitter.removeCurrentListener();\n   *     }\n   *   });\n   *\n   *   emitter.emit('someEvent', 'abc'); // logs 'abc'\n   *   emitter.emit('someEvent', 'def'); // does not log anything\n   */\n\n  BaseEventEmitter.prototype.removeCurrentListener = function removeCurrentListener() {\n    !!!this._currentSubscription ?  true ? invariant(false, 'Not in an emitting cycle; there is no current subscription') : undefined : undefined;\n    this._subscriber.removeSubscription(this._currentSubscription);\n  };\n\n  /**\n   * Returns an array of listeners that are currently registered for the given\n   * event.\n   *\n   * @param {string} eventType - Name of the event to query\n   * @return {array}\n   */\n\n  BaseEventEmitter.prototype.listeners = function listeners(eventType) /* TODO: Array<EventSubscription> */{\n    var subscriptions = this._subscriber.getSubscriptionsForType(eventType);\n    return subscriptions ? subscriptions.filter(emptyFunction.thatReturnsTrue).map(function (subscription) {\n      return subscription.listener;\n    }) : [];\n  };\n\n  /**\n   * Emits an event of the given type with the given data. All handlers of that\n   * particular type will be notified.\n   *\n   * @param {string} eventType - Name of the event to emit\n   * @param {*} Arbitrary arguments to be passed to each registered listener\n   *\n   * @example\n   *   emitter.addListener('someEvent', function(message) {\n   *     console.log(message);\n   *   });\n   *\n   *   emitter.emit('someEvent', 'abc'); // logs 'abc'\n   */\n\n  BaseEventEmitter.prototype.emit = function emit(eventType) {\n    var subscriptions = this._subscriber.getSubscriptionsForType(eventType);\n    if (subscriptions) {\n      var keys = Object.keys(subscriptions);\n      for (var ii = 0; ii < keys.length; ii++) {\n        var key = keys[ii];\n        var subscription = subscriptions[key];\n        // The subscription may have been removed during this event loop.\n        if (subscription) {\n          this._currentSubscription = subscription;\n          this.__emitToSubscription.apply(this, [subscription].concat(Array.prototype.slice.call(arguments)));\n        }\n      }\n      this._currentSubscription = null;\n    }\n  };\n\n  /**\n   * Provides a hook to override how the emitter emits an event to a specific\n   * subscription. This allows you to set up logging and error boundaries\n   * specific to your environment.\n   *\n   * @param {EmitterSubscription} subscription\n   * @param {string} eventType\n   * @param {*} Arbitrary arguments to be passed to each registered listener\n   */\n\n  BaseEventEmitter.prototype.__emitToSubscription = function __emitToSubscription(subscription, eventType) {\n    var args = Array.prototype.slice.call(arguments, 2);\n    subscription.listener.apply(subscription.context, args);\n  };\n\n  return BaseEventEmitter;\n})();\n\nmodule.exports = BaseEventEmitter;\n\n//# sourceURL=webpack:///./node_modules/fbemitter/lib/BaseEventEmitter.js?");

/***/ }),

/***/ "./node_modules/fbemitter/lib/EmitterSubscription.js":
/*!***********************************************************!*\
  !*** ./node_modules/fbemitter/lib/EmitterSubscription.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2014-present, Facebook, Inc.\n * All rights reserved.\n *\n * This source code is licensed under the BSD-style license found in the\n * LICENSE file in the root directory of this source tree. An additional grant\n * of patent rights can be found in the PATENTS file in the same directory.\n * \n * @providesModule EmitterSubscription\n * @typechecks\n */\n\n\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar EventSubscription = __webpack_require__(/*! ./EventSubscription */ \"./node_modules/fbemitter/lib/EventSubscription.js\");\n\n/**\n * EmitterSubscription represents a subscription with listener and context data.\n */\n\nvar EmitterSubscription = (function (_EventSubscription) {\n  _inherits(EmitterSubscription, _EventSubscription);\n\n  /**\n   * @param {EventSubscriptionVendor} subscriber - The subscriber that controls\n   *   this subscription\n   * @param {function} listener - Function to invoke when the specified event is\n   *   emitted\n   * @param {*} context - Optional context object to use when invoking the\n   *   listener\n   */\n\n  function EmitterSubscription(subscriber, listener, context) {\n    _classCallCheck(this, EmitterSubscription);\n\n    _EventSubscription.call(this, subscriber);\n    this.listener = listener;\n    this.context = context;\n  }\n\n  return EmitterSubscription;\n})(EventSubscription);\n\nmodule.exports = EmitterSubscription;\n\n//# sourceURL=webpack:///./node_modules/fbemitter/lib/EmitterSubscription.js?");

/***/ }),

/***/ "./node_modules/fbemitter/lib/EventSubscription.js":
/*!*********************************************************!*\
  !*** ./node_modules/fbemitter/lib/EventSubscription.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2014-present, Facebook, Inc.\n * All rights reserved.\n *\n * This source code is licensed under the BSD-style license found in the\n * LICENSE file in the root directory of this source tree. An additional grant\n * of patent rights can be found in the PATENTS file in the same directory.\n *\n * @providesModule EventSubscription\n * @typechecks\n */\n\n\n\n/**\n * EventSubscription represents a subscription to a particular event. It can\n * remove its own subscription.\n */\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }\n\nvar EventSubscription = (function () {\n\n  /**\n   * @param {EventSubscriptionVendor} subscriber the subscriber that controls\n   *   this subscription.\n   */\n\n  function EventSubscription(subscriber) {\n    _classCallCheck(this, EventSubscription);\n\n    this.subscriber = subscriber;\n  }\n\n  /**\n   * Removes this subscription from the subscriber that controls it.\n   */\n\n  EventSubscription.prototype.remove = function remove() {\n    if (this.subscriber) {\n      this.subscriber.removeSubscription(this);\n      this.subscriber = null;\n    }\n  };\n\n  return EventSubscription;\n})();\n\nmodule.exports = EventSubscription;\n\n//# sourceURL=webpack:///./node_modules/fbemitter/lib/EventSubscription.js?");

/***/ }),

/***/ "./node_modules/fbemitter/lib/EventSubscriptionVendor.js":
/*!***************************************************************!*\
  !*** ./node_modules/fbemitter/lib/EventSubscriptionVendor.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2014-present, Facebook, Inc.\n * All rights reserved.\n *\n * This source code is licensed under the BSD-style license found in the\n * LICENSE file in the root directory of this source tree. An additional grant\n * of patent rights can be found in the PATENTS file in the same directory.\n * \n * @providesModule EventSubscriptionVendor\n * @typechecks\n */\n\n\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }\n\nvar invariant = __webpack_require__(/*! fbjs/lib/invariant */ \"./node_modules/fbjs/lib/invariant.js\");\n\n/**\n * EventSubscriptionVendor stores a set of EventSubscriptions that are\n * subscribed to a particular event type.\n */\n\nvar EventSubscriptionVendor = (function () {\n  function EventSubscriptionVendor() {\n    _classCallCheck(this, EventSubscriptionVendor);\n\n    this._subscriptionsForType = {};\n    this._currentSubscription = null;\n  }\n\n  /**\n   * Adds a subscription keyed by an event type.\n   *\n   * @param {string} eventType\n   * @param {EventSubscription} subscription\n   */\n\n  EventSubscriptionVendor.prototype.addSubscription = function addSubscription(eventType, subscription) {\n    !(subscription.subscriber === this) ?  true ? invariant(false, 'The subscriber of the subscription is incorrectly set.') : undefined : undefined;\n    if (!this._subscriptionsForType[eventType]) {\n      this._subscriptionsForType[eventType] = [];\n    }\n    var key = this._subscriptionsForType[eventType].length;\n    this._subscriptionsForType[eventType].push(subscription);\n    subscription.eventType = eventType;\n    subscription.key = key;\n    return subscription;\n  };\n\n  /**\n   * Removes a bulk set of the subscriptions.\n   *\n   * @param {?string} eventType - Optional name of the event type whose\n   *   registered supscriptions to remove, if null remove all subscriptions.\n   */\n\n  EventSubscriptionVendor.prototype.removeAllSubscriptions = function removeAllSubscriptions(eventType) {\n    if (eventType === undefined) {\n      this._subscriptionsForType = {};\n    } else {\n      delete this._subscriptionsForType[eventType];\n    }\n  };\n\n  /**\n   * Removes a specific subscription. Instead of calling this function, call\n   * `subscription.remove()` directly.\n   *\n   * @param {object} subscription\n   */\n\n  EventSubscriptionVendor.prototype.removeSubscription = function removeSubscription(subscription) {\n    var eventType = subscription.eventType;\n    var key = subscription.key;\n\n    var subscriptionsForType = this._subscriptionsForType[eventType];\n    if (subscriptionsForType) {\n      delete subscriptionsForType[key];\n    }\n  };\n\n  /**\n   * Returns the array of subscriptions that are currently registered for the\n   * given event type.\n   *\n   * Note: This array can be potentially sparse as subscriptions are deleted\n   * from it when they are removed.\n   *\n   * TODO: This returns a nullable array. wat?\n   *\n   * @param {string} eventType\n   * @return {?array}\n   */\n\n  EventSubscriptionVendor.prototype.getSubscriptionsForType = function getSubscriptionsForType(eventType) {\n    return this._subscriptionsForType[eventType];\n  };\n\n  return EventSubscriptionVendor;\n})();\n\nmodule.exports = EventSubscriptionVendor;\n\n//# sourceURL=webpack:///./node_modules/fbemitter/lib/EventSubscriptionVendor.js?");

/***/ }),

/***/ "./node_modules/fbjs/lib/emptyFunction.js":
/*!************************************************!*\
  !*** ./node_modules/fbjs/lib/emptyFunction.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n *\n * \n */\n\nfunction makeEmptyFunction(arg) {\n  return function () {\n    return arg;\n  };\n}\n\n/**\n * This function accepts and discards inputs; it has no side effects. This is\n * primarily useful idiomatically for overridable function endpoints which\n * always need to be callable, since JS lacks a null-call idiom ala Cocoa.\n */\nvar emptyFunction = function emptyFunction() {};\n\nemptyFunction.thatReturns = makeEmptyFunction;\nemptyFunction.thatReturnsFalse = makeEmptyFunction(false);\nemptyFunction.thatReturnsTrue = makeEmptyFunction(true);\nemptyFunction.thatReturnsNull = makeEmptyFunction(null);\nemptyFunction.thatReturnsThis = function () {\n  return this;\n};\nemptyFunction.thatReturnsArgument = function (arg) {\n  return arg;\n};\n\nmodule.exports = emptyFunction;\n\n//# sourceURL=webpack:///./node_modules/fbjs/lib/emptyFunction.js?");

/***/ }),

/***/ "./node_modules/fbjs/lib/invariant.js":
/*!********************************************!*\
  !*** ./node_modules/fbjs/lib/invariant.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n *\n */\n\n\n\n/**\n * Use invariant() to assert state which your program assumes to be true.\n *\n * Provide sprintf-style format (only %s is supported) and arguments\n * to provide information about what broke and what you were\n * expecting.\n *\n * The invariant message will be stripped in production, but the invariant\n * will remain to ensure logic does not differ in production.\n */\n\nvar validateFormat = function validateFormat(format) {};\n\nif (true) {\n  validateFormat = function validateFormat(format) {\n    if (format === undefined) {\n      throw new Error('invariant requires an error message argument');\n    }\n  };\n}\n\nfunction invariant(condition, format, a, b, c, d, e, f) {\n  validateFormat(format);\n\n  if (!condition) {\n    var error;\n    if (format === undefined) {\n      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');\n    } else {\n      var args = [a, b, c, d, e, f];\n      var argIndex = 0;\n      error = new Error(format.replace(/%s/g, function () {\n        return args[argIndex++];\n      }));\n      error.name = 'Invariant Violation';\n    }\n\n    error.framesToPop = 1; // we don't care about invariant's own frame\n    throw error;\n  }\n}\n\nmodule.exports = invariant;\n\n//# sourceURL=webpack:///./node_modules/fbjs/lib/invariant.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _fbemitter = __webpack_require__(/*! fbemitter */ \"./node_modules/fbemitter/index.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar websocketUrl = 'ws://localhost:3001';\n\nvar PubSubClient = function () {\n  function PubSubClient() {\n    _classCallCheck(this, PubSubClient);\n\n    // status of client connection\n    this.emitter = new _fbemitter.EventEmitter();\n    this._connected = false;\n    this._ws = null;\n    this._queue = [];\n    this._id = null;\n\n    this._listeners = [];\n  }\n\n  /**\n   * Subscribe client to a topic\n   * @param topic\n   * @param cb\n   */\n\n\n  _createClass(PubSubClient, [{\n    key: 'subscribe',\n    value: function subscribe(topic, cb) {\n\n      var listener = this.emitter.addListener('subscribe_topic_' + topic, cb);\n      // add listener to array\n      this._listeners.push(listener);\n    }\n  }, {\n    key: 'publish',\n    value: function publish(topic, message) {\n\n      this.send({\n        action: 'publish',\n        payload: {\n          topic: topic,\n          message: message\n        }\n      });\n    }\n\n    /**\n     * Return client conneciton ID\n     */\n\n  }, {\n    key: 'id',\n    value: function id() {\n      return this._id;\n    }\n\n    /**\n     * Convert string to JSON\n     * @param message\n     * @returns {*}\n     */\n\n  }, {\n    key: 'stringToJson',\n    value: function stringToJson(message) {\n\n      try {\n        message = JSON.parse(message);\n      } catch (e) {\n        console.log(e);\n      }\n\n      return message;\n    }\n\n    /**\n     * Send a message to the server\n     * @param message\n     */\n\n  }, {\n    key: 'send',\n    value: function send(message) {\n\n      message = JSON.stringify(message);\n\n      if (this._connected === true) {\n        this._ws.send(message);\n      } else {\n        // let keep it in queue\n        this._queue.push({\n          type: 'message',\n          payload: message\n        });\n      }\n    }\n\n    /**\n     * Run Queue after connecting successful\n     */\n\n  }, {\n    key: 'runQueue',\n    value: function runQueue() {\n      var _this = this;\n\n      if (this._queue.length) {\n        this._queue.forEach(function (q, index) {\n          switch (q.type) {\n\n            case 'message':\n              _this.send(q.payload);\n\n              break;\n\n            default:\n\n              break;\n          }\n\n          // remove queue\n\n          delete _this._queue[index];\n        });\n      }\n    }\n\n    /**\n     * Begin connect to the server\n     * @param cb\n     */\n\n  }, {\n    key: 'connect',\n    value: function connect() {\n      var _this2 = this;\n\n      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};\n\n\n      var ws = new WebSocket(websocketUrl);\n      this._ws = ws;\n\n      ws.onopen = function () {\n\n        // change status of connected\n        _this2._connected = true;\n        // run queue\n        _this2.runQueue();\n        console.log('Connected to the server');\n        // this send to the server and asking for my connection info: {id: ....}\n        _this2.send({ action: 'me' });\n      };\n      // listen a message from the server\n      ws.onmessage = function (message) {\n\n        var jsonMessage = _this2.stringToJson(message.data);\n\n        var action = jsonMessage.action;\n        var payload = jsonMessage.payload;\n\n        switch (action) {\n\n          case 'me':\n\n            _this2._id = payload.id;\n\n            cb(null);\n\n            break;\n\n          case 'publish':\n\n            _this2.emitter.emit('subscribe_topic_' + payload.topic, payload.message);\n            // let emit this to subscribers\n            break;\n\n          default:\n\n            break;\n        }\n\n        console.log('Got server message: ', jsonMessage);\n      };\n      ws.onerror = function (err) {\n\n        console.log('unable connect to the server', err);\n        cb(err);\n      };\n    }\n\n    /**\n     * Disconnect client\n     */\n\n  }, {\n    key: 'disconnect',\n    value: function disconnect() {\n\n      if (this._listeners.length) {\n        this._listeners.forEach(function (listener) {\n\n          listener.remove();\n        });\n      }\n    }\n  }]);\n\n  return PubSubClient;\n}();\n\nexports.default = PubSubClient;\n\n\nvar subscribeCallback = function subscribeCallback(message) {\n\n  console.log('Subscribed message', message);\n};\nwindow.onload = function () {\n\n  console.log('Loaded');\n\n  var pubSub = new PubSubClient();\n\n  pubSub.connect(function (err) {\n    if (err) {\n      console.log(err);\n\n      return;\n    }\n\n    console.log('My Info:', pubSub.id());\n\n    // let subscribe a topic\n\n    pubSub.subscribe('abc', subscribeCallback);\n  });\n};\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/index.js */\"./src/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/index.js?");

/***/ })

/******/ });