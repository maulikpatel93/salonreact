'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var momentUtl = require('moment-utl');
var jQuery = _interopDefault(require('jquery'));
var feather = _interopDefault(require('feather-icons'));
require('bootstrap');
var moment = _interopDefault(require('moment'));
require('moment-timezone');

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 *
 */

/**
 * @type {Function}
 */
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
/**
 * Function implementing "Object.is" behaviour.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 *
 * @param {*} x The first value to compare.
 * @param {*} y The second value to compare.
 * @return {boolean} A boolean indicating whether or not the two arguments are the same value.
 */

function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return x !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}
/**
 * Checks whether a prop of an object equals in the other object (shallow comparison).
 *
 * @param {Object} objA The first object.
 * @param {Object} objB The second object.
 * @param {string} prop The name of the property.
 * @return {boolean} True if the value of "prop" in "objA" is shallowly equal to the value of "prop" in "objB".
 */

function objectPropEqual(objA, objB, prop) {
  return hasOwnProperty$1.call(objB, prop) && is(objA[prop], objB[prop]);
}
/**
 * Performs equality by iterating through keys on an object and returning "false"
 * when any key has values which are not strictly equal between the arguments.
 * Returns "true" when the values of all keys are strictly equal.
 *
 * @see https://stackoverflow.com/questions/22266826/how-can-i-do-a-shallow-comparison-of-the-properties-of-two-objects-with-javascri#answer-37636728
 *
 * @param {*} objA First object.
 * @param {*} objB Second object.
 * @return {boolean}
 */

function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  } // Test for A's keys different from B.


  for (let i = 0; i < keysA.length; i++) {
    const prop = keysA[i];

    if (!objectPropEqual(objA, objB, prop)) {
      return false;
    }
  }

  return true;
}

/**
 * Core utility functions.
 */

/**
 * Optional configuration with useful properties.
 *
 * @type {Object}
 */

const config = {
  uniqueIdPrefix: "",
  elementUniqueIdPrefix: "",
  checkNetworkURI: null
};
/**
 * Tests if an object is empty.
 *
 * @param {Object} obj The object to test.
 * @return {boolean} "true" if the given object is empty (does not have own properties), "false" otherwise.
 */

function isObjectEmpty(obj) {
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }

  return true;
}
/**
 * @type {string}
 */

const objPrototypeToString = Object.prototype.toString.call({});
/**
 * Tests if a variable is an object.
 *
 * @param {*} obj The variable to test.
 * @return {boolean} "true" if "obj" is indeed an object, "false" otherwise.
 */

const isObject = function (obj) {
  return objPrototypeToString === Object.prototype.toString.call(obj);
};
/**
 * Tests if a variable is a plain object (i.e. "{}", an object literal).
 *
 * @param {*} obj The variable to test.
 * @return {boolean} "true" if "obj" is a plain object, "false" otherwise.
 */

const isPlainObject = obj => {
  return obj !== null && typeof obj === "object" && obj.constructor === Object && isObject(obj);
};
/**
 * Tests to see whether something is an array or not.
 *
 * @param {*} something A variable to check whether it is an array or not.
 * @return {boolean} True if the parameter passed in is an array, false otherwise.
 */

function isArray(something) {
  return Object.prototype.toString.call(something) === Object.prototype.toString.call([]);
}
/**
 * Returns a reference to the global object.
 *
 * @return {Window|global} The global object (this function is cross-platform aware).
 */

function getGlobalObject() {
  return typeof global !== "undefined" ? global : window;
}
/**
 * @type {string}
 */

const JSUtlUniqueIdCounterProp = "JSUtlUniqueIdCounterLEzKKl87QCDxwVH";
/**
 * Generates a unique ID which can be used as an "id" attribute.
 *
 * @param {string|undefined} [uniqueIdPrefix] Local unique ID prefix which overrides the prefix
 *                                            set on the "config" configuration object.
 * @return {string} The unique ID.
 */

function uniqueId(uniqueIdPrefix = void 0) {
  const globalObject = getGlobalObject();
  globalObject[JSUtlUniqueIdCounterProp] = globalObject[JSUtlUniqueIdCounterProp] || 0;
  globalObject[JSUtlUniqueIdCounterProp]++;
  const uniqueIdCounter = globalObject[JSUtlUniqueIdCounterProp];
  const uniqueId = (uniqueIdPrefix || config.uniqueIdPrefix) + uniqueIdCounter;
  return uniqueId;
}
/**
 * Deep object extension implementation.
 * Nothing is returned, but the destination object will be modified and merged with the source object
 * so that properties of the source object which are objects will recursively merge with the corresponding
 * destination property while the other properties with all the other types will replace the properties of the
 * destination object.
 * Note that this method should not be used for inheritance via the Prototypal Combination Inheritance pattern.
 * Also, this method doesn't perform a deep object cloning, it just extends the destinationObject by adding properties
 * it doesn't have in a deep way.
 *
 * @param {Object} destinationObject The destination object which will be modified and merged with the source object.
 * @param {Object} sourceObject The source object which will be used to extend the destination object.
 * @param {Object} [options] An object containing the options for the extension.
 *                           The currently available options are:
 *
 *                               - extendsArrays (boolean: false): Whether or not to extend nested arrays too (defaults to false);
 *
 * @return {undefined}
 */

function deepObjectExtend(destinationObject, sourceObject, options = {}) {
  for (const property in sourceObject) {
    if (sourceObject[property] && isPlainObject(sourceObject[property])) {
      destinationObject[property] = destinationObject[property] || {};
      deepObjectExtend(destinationObject[property], sourceObject[property], options);
    } else if (options.extendArrays && sourceObject[property] && isArray(sourceObject[property])) {
      destinationObject[property] = destinationObject[property] || [];
      deepObjectExtend(destinationObject[property], sourceObject[property], options);
    } else {
      destinationObject[property] = sourceObject[property];
    }
  }
}
/**
 * Extends a destination object with the provided source objects.
 *
 * @param {Object} destinationObj The destination object.
 * @param {...Object|Array} sourceObjects The source objects. If the last argument is an array containing one single truthy element,
 *                                        it will be treated as an options parameter and its single first truthy element will be treated as object
 *                                        containing the options for the extension.
 *                                        The currently available options are:
 *
 *                                            - extendsArrays (boolean: false): Whether or not to extend nested arrays too (defaults to false);
 *
 * @return {Object} The destination object "destinationObj" given as parameter after extension.
 */

function extend(destinationObj, ...sourceObjects) {
  let options = {};

  if (sourceObjects.length) {
    const last = sourceObjects.pop();

    if (isArray(last) && last.length === 1 && isPlainObject(last[0])) {
      options = last[0];
    } else {
      sourceObjects.push(last);
    }
  }

  for (const sourceObject of sourceObjects) {
    deepObjectExtend(destinationObj, sourceObject, options);
  }

  return destinationObj;
}
/**
 * Returns a shallow object diff, returning an object with two keys "objA" and "objB",
 * each containing an object with all the properties of one of the two objects which are not within
 * the other object, respectively.
 * If a property is on both objects but each object has a different value for that same property
 * (using shallow equality comparison), the returned property will be set on both objects with their
 * respective values.
 *
 * @param {Object} objA First object.
 * @param {Object} objB Second object.
 * @return {Object} An object containing the shallow diff, with two keys "objA" and "objB".
 */

function shallowObjectDiff(objA, objB) {
  const diff = {
    objA: {},
    objB: {}
  };

  if (shallowEqual(objA, objB)) {
    return diff;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  for (let i = 0; i < keysA.length; i++) {
    const prop = keysA[i];

    if (!objectPropEqual(objA, objB, prop)) {
      diff.objA[prop] = objA[prop];

      if (hasOwnProperty.call(objB, prop)) {
        diff.objB[prop] = objB[prop];
      }
    }
  }

  for (let i = 0; i < keysB.length; i++) {
    const prop = keysB[i];

    if (!objectPropEqual(objB, objA, prop)) {
      diff.objB[prop] = objB[prop];

      if (hasOwnProperty.call(objA, prop)) {
        diff.objA[prop] = objA[prop];
      }
    }
  }

  return diff;
}
//# sourceMappingURL=index.js.map

/**
 * @type {string}
 */

const JSUtlCurryPlaceholderProp = "JSUtlCurryPlaceholderPropRPecoyYmCYqZ2lE";
/**
 * Curry function placeholder.
 *
 * @type {Object}
 */

const _ = {
  [JSUtlCurryPlaceholderProp]: true
};
/**
 * @type {string}
 */

const JSUtlProceedCallingFnProp = "JSUtlProceedCallingFnPropRBmGaAgOCgftF9t";
/**
 * Return value of "onFnCall" to call the curried function and return its value.
 *
 * @type {Object}
 */

const proceedCallingFn = {
  [JSUtlProceedCallingFnProp]: true
};
/**
 * Curries a function.
 *
 * @see https://medium.com/@kj_huang/implementation-of-lodash-curry-function-8b1024d71e3b
 *
 * @param {Function} fn A function to curry in order to return the curried version of the function.
 * @param {Object} [obj] An optional object with further properties to tweak the currying behaviour
 *                       and execute code while collecting the arguments of the curried function.
 * @param {number|undefined} [obj.arity] The arity of the function, i.e. its number of arguments.
 *                                       If omitted, "fn.length" will be used.
 * @param {Function|undefined} [obj.onEffectiveArgAdded] An optional callback to execute whenever a new effective argument
 *                                                       (not a placeholder) is added to the curried function.
 *                                                       The callback will receive an object with the following properties as argument:
 *
 *                                                           - addedArg: The effective argument added;
 *                                                           - args: An array with all the previously arguments collected so far
 *                                                                   without considering "addedArg";
 *                                                           - fn: The function "fn";
 *                                                           - curriedFn: The current curried function;
 *
 *                                                       The return value of the function is ignored.
 * @param {Function|undefined} [obj.onPlaceholder] An optional callback to execute whenever a new placeholder is added to the curried function.
 *                                                 The callback will receive an object with the following properties as argument:
 *
 *                                                     - args: An array with all the previously arguments collected so far
 *                                                             without considering "addedArg";
 *                                                     - fn: The function "fn";
 *                                                     - curriedFn: The current curried function;
 *
 *                                                 The return value of the function is ignored.
 * @param {Function|undefined} [obj.onFnCall] An optional callback to execute just before calling the "fn" function
 *                                            (i.e. when the "fn" function is ready to be called and all its arguments have been collected).
 *
 *                                            The callback will receive an object with the following properties as argument:
 *
 *                                                - args: The array of the effective arguments of the "fn" function;
 *                                                - fn: The function "fn" which was initially passed to "curry";
 *                                                - curriedFn: The current curried function;
 *
 *                                            This way, the code of the callback may decide what to do and may even call the function on its own
 *                                            and prevent the call from the caller side (i.e. within the "curry" function).
 *
 *                                            The callback must explicitly tell "curry" to call the function by returing "proceedCallingFn".
 *                                            If the callback returns any other value, then "fn" will not be called in "curry" and the return value
 *                                            of this callback will be returned.
 * @param {Function|undefined} [obj.onCurriedFnFirstCall] An optional callback to execute only the first time when the first curried function returned by "curry"
 *                                                        is invoked for the very first time with the very first argument or arguments.
 *
 *                                                        The callback will receive an object with the following properties as argument:
 *
 *                                                            - addedArgs: The arguments provided by the caller;
 *                                                            - fn: The "fn" function;
 *                                                            - curriedFn: The current curried function;
 *
 * @param {Function|undefined} [obj.onNewCurriedFn] An optional callback to execute initially and each time a new curried function is going to be returned.
 *
 *                                                  The callback will an object with the following properties as argument:
 *
 *                                                      - curriedFn: The current curried function (same as "newCurriedFn" when this callback is invoked
 *                                                                   for the very first time);
 *                                                      - newCurriedFn: The new curried function (will be the same as "curriedFn" when this callback is invoked
 *                                                                      for the very first time);
 *
 *
 * @return {Function} The curried version of the function.
 */

const curry = (fn, {
  arity = void 0,
  onEffectiveArgAdded = void 0,
  onPlaceholder = void 0,
  onFnCall = void 0,
  onCurriedFnFirstCall = void 0,
  onNewCurriedFn = void 0
} = {}) => {
  let curriedFnFirstCall = true;
  const expectedNumberOfArgs = typeof arity !== "undefined" ? arity : fn.length;
  const nextParameterIndex = 0;
  const placeholdersIndices = [];

  const curriedInner = (expectedNumberOfArgs, nextParameterIndex, placeholdersIndices, ...args) => function curriedFn(...addedArgs) {
    let newExpectedNumberOfArgs = expectedNumberOfArgs;
    let newNextParameterIndex = nextParameterIndex;
    let newPlaceholdersIndices = null;
    let argsRequiredChange = false;
    curriedFnFirstCall && (onCurriedFnFirstCall && onCurriedFnFirstCall({
      addedArgs,
      fn,
      curriedFn
    }) || true) && (curriedFnFirstCall = false);
    let numberOfConsumablePlaceholders = placeholdersIndices.length;

    for (const addedArg of addedArgs) {
      !argsRequiredChange && (args = [...args]);
      argsRequiredChange = true; // "addedArg" may be either a placeholder or an effective argument.

      const isPlaceholder = addedArg ? addedArg[JSUtlCurryPlaceholderProp] === _[JSUtlCurryPlaceholderProp] : false;

      if (numberOfConsumablePlaceholders > 0 && !isPlaceholder) {
        // Argument is an effective argument consuming a previously set placeholder.
        onEffectiveArgAdded && onEffectiveArgAdded({
          addedArg,
          args,
          fn,
          curriedFn
        });
        let argIndex;

        if (newPlaceholdersIndices === null) {
          const [firstIndex, ...rest] = placeholdersIndices;
          argIndex = firstIndex;
          newPlaceholdersIndices = rest;
        } else {
          argIndex = newPlaceholdersIndices.shift();
        }

        args[argIndex] = addedArg;
        numberOfConsumablePlaceholders--;
        newExpectedNumberOfArgs--;
      } else {
        if (isPlaceholder) {
          // Argument is a new placeholder.
          if (newPlaceholdersIndices === null) {
            newPlaceholdersIndices = placeholdersIndices.concat(newNextParameterIndex);
          } else {
            newPlaceholdersIndices.push(newNextParameterIndex);
          }

          onPlaceholder && onPlaceholder({
            args,
            fn,
            curriedFn
          });
        } else {
          // Argument is an effective argument.
          newExpectedNumberOfArgs--;
          onEffectiveArgAdded && onEffectiveArgAdded({
            addedArg,
            args,
            fn,
            curriedFn
          });
        }

        args[newNextParameterIndex] = addedArg;
        newNextParameterIndex++;
      }
    } // eslint-disable-next-line @typescript-eslint/no-use-before-define


    return curried.call(null, curriedFn, newExpectedNumberOfArgs, newNextParameterIndex, newPlaceholdersIndices === null ? [...placeholdersIndices] : newPlaceholdersIndices, ...args);
  };

  const curried = (curriedFn, expectedNumberOfArgs, nextParameterIndex, placeholdersIndices, ...args) => {
    if (expectedNumberOfArgs <= 0) {
      if (onFnCall) {
        const shouldCallCurriedFn = onFnCall({
          args,
          fn,
          curriedFn
        });

        if (shouldCallCurriedFn && shouldCallCurriedFn[JSUtlProceedCallingFnProp] === proceedCallingFn[JSUtlProceedCallingFnProp]) {
          return fn(...args);
        } else {
          return shouldCallCurriedFn;
        }
      } else {
        return fn(...args);
      }
    } else {
      const newCurried = curriedInner(expectedNumberOfArgs, nextParameterIndex, placeholdersIndices, ...args);
      onNewCurriedFn && onNewCurriedFn({
        curriedFn,
        newCurriedFn: newCurried
      });
      return newCurried;
    }
  };

  const newCurried = curriedInner(expectedNumberOfArgs, nextParameterIndex, placeholdersIndices);
  onNewCurriedFn && onNewCurriedFn({
    curriedFn: newCurried,
    newCurriedFn: newCurried
  });
  return newCurried;
};

/*
 * Copyright (c) 2021 Anton Bagdatyev (Tonix)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * Escapes special characters for a JS regex.
 *
 * @see https://stackoverflow.com/questions/3115150/how-to-escape-regular-expression-special-characters-using-javascript#answer-9310752
 *
 * @param {string} text The string to escape.
 * @return {string} The same string with special regex characters escaped.
 */

function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
/**
 * Trim characters from the beginning and end of a string.
 *
 * @param {string} str The string.
 * @param {string} characterMask Character mask.
 * @param {Object} options Options.
 * @param {Object.boolean} options.shouldTrimLeft "true" to trim left (defaults to "true" if omitted).
 * @param {Object.boolean} options.shouldTrimRight "true" to trim right (defaults to "true" if omitted).
 * @return {string} The trimmed string.
 */

function trimCharacterMask(str, characterMask, options = {}) {
  if (typeof characterMask === "undefined") {
    characterMask = " ";
  }

  const escapedCharacterMask = escapeRegExp(characterMask);
  const shouldTrimLeft = typeof options.shouldTrimLeft === "undefined" || options.shouldTrimLeft;
  const shouldTrimRight = typeof options.shouldTrimRight === "undefined" || options.shouldTrimRight;
  const regexParts = [];

  if (shouldTrimLeft) {
    regexParts[regexParts.length] = "^[" + escapedCharacterMask + "]+";
  }

  if (shouldTrimRight) {
    regexParts[regexParts.length] = "[" + escapedCharacterMask + "]+$";
  }

  const regex = new RegExp(regexParts.join("|"), "gm");
  return str.replace(regex, "");
}
/**
 * Alias of "trimCharacterMask".
 * Trim characters from the beginning and end of a string.
 *
 * @param {string} str The string.
 * @param {string} characterMask Character mask.
 * @return {string} The trimmed string.
 */

function trim(str, characterMask) {
  return trimCharacterMask(str, characterMask);
}
/**
 * Trim characters from the end of a string.
 *
 * @param {string} str The string.
 * @param {string} characterMask Character mask.
 * @return {string} The right-trimmed string.
 */

function trimRight(str, characterMask) {
  return trimCharacterMask(str, characterMask, {
    shouldTrimLeft: false,
    shouldTrimRight: true
  });
}
//# sourceMappingURL=string.js.map

/**
 * React JS utility functions.
 */

/**
 * Returns a class name string.
 *
 * @param {*} componentClassName Default class name of a component (a string) or a falsy value which evaluates to an empty string.
 * @param {...*} classNames Additional, optional list of strings of class names or falsy values to ignore.
 * @return {string} The class name string.
 */

function classNames(componentClassName) {
  for (var _len = arguments.length, classNames = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    classNames[_key - 1] = arguments[_key];
  }

  return classNames.reduce(function (componentClassName, className) {
    return trim("".concat(componentClassName || "", " ").concat(className || ""));
  }, componentClassName);
}
//# sourceMappingURL=utils.js.map

/*
 * Copyright (c) 2021 Anton Bagdatyev (Tonix)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * Hook to use the previous value of a value.
 *
 * @param {*} value The new value.
 * @return {*} The previous value, or, initially, "undefined".
 */

function usePrevious(value) {
  var ref = React.useRef(void 0);
  React.useEffect(function () {
    ref.current = value;
  });
  return ref.current;
}

/*
 * Copyright (c) 2021 Anton Bagdatyev (Tonix)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * Returns a ref for a callback.
 *
 * Useful e.g. when using callbacks within a callback of "useEffect" hook
 * which should not interfere with the deps array of the hook and yet having
 * a reference to the up-to-date callback within the "useEffect" hook's callback
 * through the "current" property.
 *
 * @see https://github.com/donavon/use-event-listener/issues/27
 *
 * @param {Function} callback A callback.
 * @return {Object} A ref for the given callback.
 *                  The returned ref could and should be passed as a dep to the dependencies array
 *                  of a hook using it because React guarantees that the returned object will persist
 *                  for the full lifetime of the component.
 * @return {Object.current} The up-to-date callback.
 */

function useCallbackRef(callback) {
  var callbackRef = React.useRef(callback);
  React.useEffect(function () {
    callbackRef.current = callback;
  }, [callback]);
  return callbackRef;
}

/*
 * Copyright (c) 2021 Anton Bagdatyev (Tonix)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * Hook to execute a callback on unmount.
 *
 * @param {Function} fn The callback to execute.
 * @return {undefined}
 */

function useUnmountEffect(fn) {
  var fnRef = useCallbackRef(fn);
  React.useEffect(function () {
    return function () {
      return fnRef.current();
    };
  }, [fnRef]);
}

function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1(); }

function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit$1(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }
/**
 * Hook to easily create interchangeable factories switching them
 * in a declarative way based on the given runtime parameters.
 *
 * @param {Function} tuplesFn A function returning an array of tuples, each tuple being an array of two elements:
 *
 *                                - testCondition: A boolean value or a function returning a boolean value
 *                                                 which, if "true", instructs this hook to return the "factory" factory
 *                                                 bound to this "testCondition".
 *                                                 Note that the first "factory" for which "testCondition" is truthy
 *                                                 will be returned and further tuples will be ignored;
 *
 *                                - factory: Anything. The value to return if "testCondition" is a truthy value
 *                                           or a function returning a truthy value.
 *
 *                            The last element of the returned tuples MAY not be a tuple array with two elements,
 *                            and in such case it will be treated as the default factory value to return if none
 *                            of the test conditions of the previous factories are satisfied.
 *                            If the last tuple is not a default value and none of the test conditions of the previous
 *                            factories are satisfied as well as for the factory of last tuple, then "undefined"
 *                            will be returned by this hook.
 * @param {Array|undefined} [deps] Dependencies array to use.
 * @return {*} The first factory value for which the test is truthy or returns a truthy value, a default factory value,
 *             or "undefined".
 */

function useFactory(tuplesFn) {
  var deps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : void 0;
  var tuples = React.useMemo(tuplesFn, deps || []); // "testConditionFn" is pure and does never change.

  var testConditionFn = React.useCallback(function (testCondition) {
    return Boolean(typeof testCondition === "function" ? testCondition() : testCondition);
  }, []);
  var factoryValue = React.useMemo(function () {
    var i = 0; // Loop through all the tuples except the last one (handled after this loop).

    for (; i < tuples.length - 1; i++) {
      var tuple = tuples[i];

      var _tuple = _slicedToArray$1(tuple, 2),
          testCondition = _tuple[0],
          _factoryValue = _tuple[1];

      if (testConditionFn(testCondition)) {
        // Test condition for factory value is satisfied.
        return _factoryValue;
      }
    }

    var lastTuple = tuples[i];

    if (isArray(lastTuple) && lastTuple.length === 2) {
      var _lastTuple = _slicedToArray$1(lastTuple, 2),
          _testCondition = _lastTuple[0],
          _factoryValue2 = _lastTuple[1];

      if (testConditionFn(_testCondition)) {
        // Test condition for last factory value is satisfied.
        return _factoryValue2;
      } // No default and no factory value satisfying a test condition.


      return void 0;
    } else {
      // Default factory value.
      return lastTuple;
    }
  }, [testConditionFn, tuples]);
  return factoryValue;
}
//# sourceMappingURL=useFactory.js.map

/*
 * Copyright (c) 2021 Anton Bagdatyev (Tonix)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * Hook to use the previous given value if the currently given value is shallowly equal to the previous one.
 *
 * @param {*} value A value.
 * @return {*} The given value the very first time or the previous value if the given
 *             value is shallowly equal to the previous given value.
 */

function useShallowEqualMemo(value) {
  var ref = React.useRef({
    init: true,
    value: value
  });
  var ret = React.useMemo(function () {
    if (ref.current.init) {
      ref.current.init = false;
      ref.current.value = value;
      return value;
    }

    if (shallowEqual(value, ref.current.value)) {
      return ref.current.value;
    } else {
      ref.current.value = value;
      return value;
    }
  }, [value]);
  return ret;
}

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$2(arr); }

function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
/**
 * Hook to extend an object with an array of source objects.
 *
 * @param {Object|Function} destination Destination object or a function returning a destination object.
 * @param {Array} deps An array which defines the dependecies of the hook as well the source objects
 *                     to use to extend the destination object.
 *                     If the nth element of this array is an object, it will always be used as a source object
 *                     when extending the destination object "destination", as well as used as a dep.
 *                     If the nth element of this array is not an object, it will only be used as a dep.
 * @param {Object} [extendOptions] The options for the extension.
 *                                 See the "extend" function of the js-utl package (https://github.com/tonix-tuft/js-utl)
 *                                 for the available options.
 * @return {Object} The extended destination object.
 */

function useExtend(destination, deps) {
  var extendOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var obj = React.useMemo(typeof destination === "function" ? destination : function () {
    return destination;
  }, deps);
  extendOptions = useShallowEqualMemo(extendOptions);

  var extendFn = function extendFn() {
    return extend.apply(void 0, [obj].concat(_toConsumableArray(deps.filter(isPlainObject)), [[extendOptions]]));
  };

  var finalObj = React.useMemo(extendFn, [].concat(_toConsumableArray(deps), [extendOptions]));
  return finalObj;
}
//# sourceMappingURL=useExtend.js.map

/*
 * Copyright (c) 2021 Anton Bagdatyev (Tonix)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * Hook to tell if the current rendering is due to an update or not.
 *
 * @return {boolean} True if the current rendering is due to an update, false otherwise.
 */

function useIsUpdate() {
  return !!usePrevious(true);
}

/*
 * Copyright (c) 2021 Anton Bagdatyev (Tonix)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * Hook to use a cumulative shallow diff of a value.
 *
 * @param {*} value A value.
 * @return {*} The given value, initially.
 *
 *             The previous value if the given value is equal to the previous one and both
 *             are not objects.
 *
 *             If the previous value and the given value are both objects,
 *             then this hook will only return an object containing the diff between the two
 *             accumulating the new keys and their corresponding values.
 *             In this last case, if the resulting object containing the diff is empty
 *             (meaning there's no diff) or if the diff is shallowly equal
 *             to the previous one, then the previous diff object will be returned
 *             if a diff was performed at least once previously, otherwise the previous value
 *             will be returned, meaning that there wasn't a diff before yet
 *             (useful for the array of dependencies of other hooks like "useEffect" and "useMemo").
 */

function useCumulativeShallowDiff(value) {
  var valueDiffRef = React.useRef({
    value: value,
    diff: {},
    werePreviousAndCurrentObjectsDiffedAndThereWasADiff: false
  });
  var isUpdate = useIsUpdate();
  value = React.useMemo(function () {
    var previousValue = valueDiffRef.current.value;

    if (!isUpdate) {
      return previousValue;
    }

    if (isPlainObject(previousValue) && isPlainObject(value)) {
      var previousDiff = valueDiffRef.current.diff;
      var diff = shallowObjectDiff(previousValue, value);
      var newDiff = diff.objB;

      if (isObjectEmpty(newDiff) || shallowEqual(previousDiff, newDiff)) {
        return valueDiffRef.current.werePreviousAndCurrentObjectsDiffedAndThereWasADiff ? previousDiff : previousValue;
      } else {
        valueDiffRef.current.werePreviousAndCurrentObjectsDiffedAndThereWasADiff = true;
        valueDiffRef.current.value = extend({}, previousValue, newDiff);
        valueDiffRef.current.diff = newDiff;
        return newDiff;
      }
    } else {
      valueDiffRef.current.werePreviousAndCurrentObjectsDiffedAndThereWasADiff = false;
      valueDiffRef.current.diff = {};

      if (shallowEqual(previousValue, value)) {
        return previousValue;
      }

      valueDiffRef.current.value = value;
      return value;
    }
  }, [isUpdate, value]);
  return value;
}

/*
 * Copyright (c) 2021 Anton Bagdatyev (Tonix)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * @type {string}
 */

var uniqueKeyPrefix = "react-js-utl-ellViKYMFK-";
/**
 * Hook returning a unique key.
 *
 * @param {*} [dep] An optional dep which, if set and when changed, will force the regeneration of a new key.
 * @return {string} A unique key.
 */

function useUniqueKey() {
  var dep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : void 0;
  var key = React.useMemo(function () {
    return uniqueId("".concat(trimRight("".concat(uniqueKeyPrefix).concat(typeof dep === "string" ? dep : "", "-"), "-"), "-"));
  }, [dep]);
  return key;
}

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright (c) 2021 Anton Bagdatyev (Tonix)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * @type {string}
 */
var primitiveProp = "react-js-utl-primitive-rFOxpeMOVTDJMxE";
/**
 * Marks a function as a react-js-utl primitive.
 *
 * @param {Function} primitive A function to mark as a primitive.
 * @param {string} primitiveKey A unique key identifying the primitive.
 * @return {undefined}
 */

function primitive(primitive, primitiveKey) {
  primitive[primitiveProp] = _objectSpread(_objectSpread({}, primitive[primitiveProp] || {}), {}, _defineProperty$1({}, primitiveKey, true));
}

/*
 * Copyright (c) 2021 Anton Bagdatyev (Tonix)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * @type {string}
 */

var primitiveKey = "visitor-GanIjeOSkQd2ZgV";
/**
 * Visitor primitive.
 *
 * @param {*} key The key to visit.
 * @param {Function} visit The visitor's function to execute when visiting some data at the given key.
 */

function visitor(key, _visit) {
  var visitor = {
    key: key,
    visit: function visit() {
      return _visit.apply(void 0, arguments);
    }
  };
  primitive(visitor, primitiveKey);
  return visitor;
}

var curriedVisitor = curry(visitor);
curriedVisitor[primitiveProp] = primitiveKey;

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var regenerator = runtime_1;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var asyncToGenerator = _asyncToGenerator;

/*
 * Copyright (c) 2020 Anton Bagdatyev (Tonix)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * Returns a ref for a callback.
 *
 * Useful e.g. when using callbacks within a callback of "useEffect" hook
 * which should not interfere with the deps array of the hook and yet having
 * a reference to the up-to-date callback within the "useEffect" hook's callback
 * through the "current" property.
 *
 * @see https://github.com/donavon/use-event-listener/issues/27
 *
 * @param {Function} callback A callback.
 * @return {Object} A ref for the given callback.
 *                  The returned ref could and should be passed as a dep to the dependencies array
 *                  of a hook using it because React guarantees that the returned object will persist
 *                  for the full lifetime of the component.
 * @return {Object.current} The up-to-date callback.
 */

function useCallbackRef$1(callback) {
  var callbackRef = React.useRef(callback);
  React.useEffect(function () {
    callbackRef.current = callback;
  }, [callback]);
  return callbackRef;
}

/*
 * Copyright (c) 2020 Anton Bagdatyev (Tonix)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * @type {string}
 */

const objPrototypeToString$1 = Object.prototype.toString.call({});

/**
 * Hook to use an asynchronously loaded moment locale.
 *
 * @param {string|*} locale The locale to load. Check out the "moment/locale/" directory in "node_modules"
 *                          for builtin available locales.
 *                          If a value which is not a string is passed as parameter, it will be treated as an unknown locale
 *                          and the "obj.callback" callback will be executed with a "normalizedLocale" parameter
 *                          set to the Moment's default locale (USA's English, i.e. "en").
 * @param {Object} obj An object with further parameters.
 * @param {(locale: string) => *} obj.callback The callback to execute once the locale has been loaded.
 *                                             Note that the callback will be re-executed only
 *                                             when the given locale parameter changes from the previous one.
 * @param {undefined|(normalizedLocale: string, locale: string) => *} [unknownLocaleCallback] A callback called with the Moment's default locale (USA's English, i.e. "en")
 *                                                                                            if the given locale is unknown as its first parameter and the given locale as the second parameter.
 *                                                                                            See the "unknownLocaleCallback" parameter of the "importLocale" function of the "moment-utl" package.
 * @param {undefined|(e: Error, locale: string) => *} [obj.errorCallback] An optional callback to execute when the locale
 *                                                                        cannot be loaded (e.g. Moment locale chunk file not found or network error).
 * @return {undefined}
 */

function useLocale(locale, _ref) {
  var callback = _ref.callback,
      _ref$unknownLocaleCal = _ref.unknownLocaleCallback,
      unknownLocaleCallback = _ref$unknownLocaleCal === void 0 ? void 0 : _ref$unknownLocaleCal,
      _ref$errorCallback = _ref.errorCallback,
      errorCallback = _ref$errorCallback === void 0 ? void 0 : _ref$errorCallback;
  var callbackRef = useCallbackRef$1(callback);
  var unknownLocaleCallbackRef = useCallbackRef$1(unknownLocaleCallback);
  var errorCallbackRef = useCallbackRef$1(errorCallback);
  React.useEffect(function () {
    asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
      var normalizedLocale, errorCallbackIsFunction;
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return momentUtl.importLocale(locale, unknownLocaleCallbackRef.current);

            case 3:
              normalizedLocale = _context.sent;
              callbackRef.current(normalizedLocale);
              _context.next = 12;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              errorCallbackIsFunction = typeof errorCallbackRef.current === "function";
              /**
               * @see https://overreacted.io/how-does-the-development-mode-work/
               */

              if (process.env.NODE_ENV !== "production") {
                if (!errorCallbackIsFunction) {
                  // eslint-disable-next-line no-console
                  console.error("react-moment-hooks - useLocale hook - An error was thrown and an error callback was not provided: ".concat(_context.t0));
                }
              }

              errorCallbackIsFunction && errorCallbackRef.current(_context.t0, locale);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }))();
  }, [locale, callbackRef, unknownLocaleCallbackRef, errorCallbackRef]);
}
//# sourceMappingURL=index.es.js.map

/*
 * Copyright (c) 2021 Anton Bagdatyev (Tonix)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * Gets a picker jQuery object for the given ID.
 *
 * @param {string} id The ID.
 * @return {jQuery} The jQuery object.
 */

function getPicker(id) {
  return jQuery("#".concat(id));
}

var updateFactory = {
  setOptions: function setOptions(id) {
    return function (options) {
      options = _objectSpread2({}, options); // On update, locale is updated differently,
      // because it may not have been loaded yet.
      // The "useLocale" hook will take care of setting the locale.

      delete options.locale;
      var $picker = getPicker(id);
      Object.keys(options).map(function (key) {
        return $picker.datetimepicker(key, options[key]);
      });
    };
  },
  setLocale: function setLocale(id) {
    return function (locale) {
      return getPicker(id).datetimepicker("locale", locale);
    };
  }
};
var initFactory = {
  setOptions: function setOptions(id) {
    return function (options) {
      return jQuery("#".concat(id)).datetimepicker(_objectSpread2({}, options));
    };
  },
  setLocale: function setLocale() {
    return function () {
      return void 0;
    };
  } // Nothing to do here when mounting.

};

/**
 * @type {Object}
 */

var yesIconProps = {
  "data-target-input": "nearest"
};

var propsWithId = function propsWithId(id) {
  return {
    id: id
  };
};

var objIdentity = function objIdentity() {
  return {};
};

var noOpFn = function noOpFn() {};

var noIconTypeFactory = {
  icon: function icon() {
    return null;
  },
  handle: noOpFn
};
var fontAwesomeIconTypeFactory = {
  icon: function icon(_ref) {
    var iconClassName = _ref.iconClassName;
    return /*#__PURE__*/React__default.createElement("i", {
      className: "fa ".concat(iconClassName)
    });
  },
  handle: noOpFn
};
var featherIconTypeFactory = {
  icon: function icon() {
    return null;
  },
  handle: function handle(_ref2) {
    var iconContainerId = _ref2.iconContainerId,
        icon = _ref2.icon;
    var element = document.getElementById(iconContainerId);

    if (element) {
      var featherIcon = feather.icons[icon] || feather.icons.calendar;
      element.innerHTML = featherIcon.toSvg();
    }
  }
};
var yesIconFactory = {
  divProps: function divProps(id) {
    return _objectSpread2(_objectSpread2({
      key: "".concat(id, "_1")
    }, yesIconProps), propsWithId(id));
  },
  inputProps: objIdentity,
  inputGroupAppend: function inputGroupAppend(id) {
    return function (_ref3) {
      var iconClassName = _ref3.iconClassName,
          iconTypeFactory = _ref3.iconTypeFactory,
          iconContainerId = _ref3.iconContainerId;
      return /*#__PURE__*/React__default.createElement("div", {
        key: "".concat(id, "_2"),
        className: "input-group-append",
        "data-target": "#".concat(id),
        "data-toggle": "datetimepicker"
      }, /*#__PURE__*/React__default.createElement("div", {
        className: "input-group-text",
        id: iconContainerId
      }, iconTypeFactory.icon({
        iconClassName: iconClassName
      })));
    };
  },
  divClassName: "input-group"
};
var noIconFactory = {
  divProps: objIdentity,
  inputProps: propsWithId,
  inputGroupAppend: function inputGroupAppend() {
    return function () {
      return false;
    };
  },
  divClassName: false
};

/*!@preserve
 * Tempus Dominus Bootstrap4 v5.37.0 ()
 * Copyright 2016-2020 Jonathan Peterson and contributors
 * Licensed under MIT (https://github.com/tempusdominus/bootstrap-3/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Tempus Dominus Bootstrap4\'s requires jQuery. jQuery must be included before Tempus Dominus Bootstrap4\'s JavaScript.');
}

+function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.');
  if ((version[0] < 2 && version[1] < 9) || (version[0] === 1 && version[1] === 9 && version[2] < 1) || (version[0] >= 4)) {
    throw new Error('Tempus Dominus Bootstrap4\'s requires at least jQuery v3.0.0 but less than v4.0.0');
  }
}(jQuery);


if (typeof moment === 'undefined') {
  throw new Error('Tempus Dominus Bootstrap4\'s requires moment.js. Moment.js must be included before Tempus Dominus Bootstrap4\'s JavaScript.');
}

var version = moment.version.split('.');
if ((version[0] <= 2 && version[1] < 17) || (version[0] >= 3)) {
  throw new Error('Tempus Dominus Bootstrap4\'s requires at least moment.js v2.17.0 but less than v3.0.0');
}

+function () {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// ReSharper disable once InconsistentNaming
var DateTimePicker = function ($, moment) {
  function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  function isValidDate(date) {
    return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
  }

  function isValidDateTimeStr(str) {
    return isValidDate(new Date(str));
  } // ReSharper disable InconsistentNaming


  var trim = function trim(str) {
    return str.replace(/(^\s+)|(\s+$)/g, '');
  },
      NAME = 'datetimepicker',
      DATA_KEY = "" + NAME,
      EVENT_KEY = "." + DATA_KEY,
      DATA_API_KEY = '.data-api',
      Selector = {
    DATA_TOGGLE: "[data-toggle=\"" + DATA_KEY + "\"]"
  },
      ClassName = {
    INPUT: NAME + "-input"
  },
      Event = {
    CHANGE: "change" + EVENT_KEY,
    BLUR: "blur" + EVENT_KEY,
    KEYUP: "keyup" + EVENT_KEY,
    KEYDOWN: "keydown" + EVENT_KEY,
    FOCUS: "focus" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
    //emitted
    UPDATE: "update" + EVENT_KEY,
    ERROR: "error" + EVENT_KEY,
    HIDE: "hide" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY
  },
      DatePickerModes = [{
    CLASS_NAME: 'days',
    NAV_FUNCTION: 'M',
    NAV_STEP: 1
  }, {
    CLASS_NAME: 'months',
    NAV_FUNCTION: 'y',
    NAV_STEP: 1
  }, {
    CLASS_NAME: 'years',
    NAV_FUNCTION: 'y',
    NAV_STEP: 10
  }, {
    CLASS_NAME: 'decades',
    NAV_FUNCTION: 'y',
    NAV_STEP: 100
  }],
      KeyMap = {
    'up': 38,
    38: 'up',
    'down': 40,
    40: 'down',
    'left': 37,
    37: 'left',
    'right': 39,
    39: 'right',
    'tab': 9,
    9: 'tab',
    'escape': 27,
    27: 'escape',
    'enter': 13,
    13: 'enter',
    'pageUp': 33,
    33: 'pageUp',
    'pageDown': 34,
    34: 'pageDown',
    'shift': 16,
    16: 'shift',
    'control': 17,
    17: 'control',
    'space': 32,
    32: 'space',
    't': 84,
    84: 't',
    'delete': 46,
    46: 'delete'
  },
      ViewModes = ['times', 'days', 'months', 'years', 'decades'],
      keyState = {},
      keyPressHandled = {},
      optionsSortMap = {
    timeZone: -39,
    format: -38,
    dayViewHeaderFormat: -37,
    extraFormats: -36,
    stepping: -35,
    minDate: -34,
    maxDate: -33,
    useCurrent: -32,
    collapse: -31,
    locale: -30,
    defaultDate: -29,
    disabledDates: -28,
    enabledDates: -27,
    icons: -26,
    tooltips: -25,
    useStrict: -24,
    sideBySide: -23,
    daysOfWeekDisabled: -22,
    calendarWeeks: -21,
    viewMode: -20,
    toolbarPlacement: -19,
    buttons: -18,
    widgetPositioning: -17,
    widgetParent: -16,
    ignoreReadonly: -15,
    keepOpen: -14,
    focusOnShow: -13,
    inline: -12,
    keepInvalid: -11,
    keyBinds: -10,
    debug: -9,
    allowInputToggle: -8,
    disabledTimeIntervals: -7,
    disabledHours: -6,
    enabledHours: -5,
    viewDate: -4,
    allowMultidate: -3,
    multidateSeparator: -2,
    updateOnlyThroughDateOption: -1,
    date: 1
  },
      defaultFeatherIcons = {
    time: 'clock',
    date: 'calendar',
    up: 'arrow-up',
    down: 'arrow-down',
    previous: 'arrow-left',
    next: 'arrow-right',
    today: 'arrow-down-circle',
    clear: 'trash-2',
    close: 'x'
  };

  function optionsSortFn(optionKeyA, optionKeyB) {
    if (optionsSortMap[optionKeyA] && optionsSortMap[optionKeyB]) {
      if (optionsSortMap[optionKeyA] < 0 && optionsSortMap[optionKeyB] < 0) {
        return Math.abs(optionsSortMap[optionKeyB]) - Math.abs(optionsSortMap[optionKeyA]);
      } else if (optionsSortMap[optionKeyA] < 0) {
        return -1;
      } else if (optionsSortMap[optionKeyB] < 0) {
        return 1;
      }

      return optionsSortMap[optionKeyA] - optionsSortMap[optionKeyB];
    } else if (optionsSortMap[optionKeyA]) {
      return optionsSortMap[optionKeyA];
    } else if (optionsSortMap[optionKeyB]) {
      return optionsSortMap[optionKeyB];
    }

    return 0;
  }

  var Default = {
    timeZone: '',
    format: false,
    dayViewHeaderFormat: 'MMMM YYYY',
    extraFormats: false,
    stepping: 1,
    minDate: false,
    maxDate: false,
    useCurrent: true,
    collapse: true,
    locale: moment.locale(),
    defaultDate: false,
    disabledDates: false,
    enabledDates: false,
    icons: {
      type: 'class',
      time: 'fa fa-clock-o',
      date: 'fa fa-calendar',
      up: 'fa fa-arrow-up',
      down: 'fa fa-arrow-down',
      previous: 'fa fa-chevron-left',
      next: 'fa fa-chevron-right',
      today: 'fa fa-calendar-check-o',
      clear: 'fa fa-trash',
      close: 'fa fa-times'
    },
    tooltips: {
      today: 'Go to today',
      clear: 'Clear selection',
      close: 'Close the picker',
      selectMonth: 'Select Month',
      prevMonth: 'Previous Month',
      nextMonth: 'Next Month',
      selectYear: 'Select Year',
      prevYear: 'Previous Year',
      nextYear: 'Next Year',
      selectDecade: 'Select Decade',
      prevDecade: 'Previous Decade',
      nextDecade: 'Next Decade',
      prevCentury: 'Previous Century',
      nextCentury: 'Next Century',
      pickHour: 'Pick Hour',
      incrementHour: 'Increment Hour',
      decrementHour: 'Decrement Hour',
      pickMinute: 'Pick Minute',
      incrementMinute: 'Increment Minute',
      decrementMinute: 'Decrement Minute',
      pickSecond: 'Pick Second',
      incrementSecond: 'Increment Second',
      decrementSecond: 'Decrement Second',
      togglePeriod: 'Toggle Period',
      selectTime: 'Select Time',
      selectDate: 'Select Date'
    },
    useStrict: false,
    sideBySide: false,
    daysOfWeekDisabled: false,
    calendarWeeks: false,
    viewMode: 'days',
    toolbarPlacement: 'default',
    buttons: {
      showToday: false,
      showClear: false,
      showClose: false
    },
    widgetPositioning: {
      horizontal: 'auto',
      vertical: 'auto'
    },
    widgetParent: null,
    readonly: false,
    ignoreReadonly: false,
    keepOpen: false,
    focusOnShow: true,
    inline: false,
    keepInvalid: false,
    keyBinds: {
      up: function up() {
        if (!this.widget) {
          return false;
        }

        var d = this._dates[0] || this.getMoment();

        if (this.widget.find('.datepicker').is(':visible')) {
          this.date(d.clone().subtract(7, 'd'));
        } else {
          this.date(d.clone().add(this.stepping(), 'm'));
        }

        return true;
      },
      down: function down() {
        if (!this.widget) {
          this.show();
          return false;
        }

        var d = this._dates[0] || this.getMoment();

        if (this.widget.find('.datepicker').is(':visible')) {
          this.date(d.clone().add(7, 'd'));
        } else {
          this.date(d.clone().subtract(this.stepping(), 'm'));
        }

        return true;
      },
      'control up': function controlUp() {
        if (!this.widget) {
          return false;
        }

        var d = this._dates[0] || this.getMoment();

        if (this.widget.find('.datepicker').is(':visible')) {
          this.date(d.clone().subtract(1, 'y'));
        } else {
          this.date(d.clone().add(1, 'h'));
        }

        return true;
      },
      'control down': function controlDown() {
        if (!this.widget) {
          return false;
        }

        var d = this._dates[0] || this.getMoment();

        if (this.widget.find('.datepicker').is(':visible')) {
          this.date(d.clone().add(1, 'y'));
        } else {
          this.date(d.clone().subtract(1, 'h'));
        }

        return true;
      },
      left: function left() {
        if (!this.widget) {
          return false;
        }

        var d = this._dates[0] || this.getMoment();

        if (this.widget.find('.datepicker').is(':visible')) {
          this.date(d.clone().subtract(1, 'd'));
        }

        return true;
      },
      right: function right() {
        if (!this.widget) {
          return false;
        }

        var d = this._dates[0] || this.getMoment();

        if (this.widget.find('.datepicker').is(':visible')) {
          this.date(d.clone().add(1, 'd'));
        }

        return true;
      },
      pageUp: function pageUp() {
        if (!this.widget) {
          return false;
        }

        var d = this._dates[0] || this.getMoment();

        if (this.widget.find('.datepicker').is(':visible')) {
          this.date(d.clone().subtract(1, 'M'));
        }

        return true;
      },
      pageDown: function pageDown() {
        if (!this.widget) {
          return false;
        }

        var d = this._dates[0] || this.getMoment();

        if (this.widget.find('.datepicker').is(':visible')) {
          this.date(d.clone().add(1, 'M'));
        }

        return true;
      },
      enter: function enter() {
        if (!this.widget) {
          return false;
        }

        this.hide();
        return true;
      },
      escape: function escape() {
        if (!this.widget) {
          return false;
        }

        this.hide();
        return true;
      },
      'control space': function controlSpace() {
        if (!this.widget) {
          return false;
        }

        if (this.widget.find('.timepicker').is(':visible')) {
          this.widget.find('.btn[data-action="togglePeriod"]').click();
        }

        return true;
      },
      t: function t() {
        if (!this.widget) {
          return false;
        }

        this.date(this.getMoment());
        return true;
      },
      'delete': function _delete() {
        if (!this.widget) {
          return false;
        }

        this.clear();
        return true;
      }
    },
    debug: false,
    allowInputToggle: false,
    disabledTimeIntervals: false,
    disabledHours: false,
    enabledHours: false,
    viewDate: false,
    allowMultidate: false,
    multidateSeparator: ', ',
    updateOnlyThroughDateOption: false,
    promptTimeOnDateChange: false,
    promptTimeOnDateChangeTransitionDelay: 200
  }; // ReSharper restore InconsistentNaming
  // ReSharper disable once DeclarationHides
  // ReSharper disable once InconsistentNaming

  var DateTimePicker = /*#__PURE__*/function () {
    /** @namespace eData.dateOptions */

    /** @namespace moment.tz */
    function DateTimePicker(element, options) {
      this._options = this._getOptions(options);
      this._element = element;
      this._dates = [];
      this._datesFormatted = [];
      this._viewDate = null;
      this.unset = true;
      this.component = false;
      this.widget = false;
      this.use24Hours = null;
      this.actualFormat = null;
      this.parseFormats = null;
      this.currentViewMode = null;
      this.MinViewModeNumber = 0;
      this.isInitFormatting = false;
      this.isInit = false;
      this.isDateUpdateThroughDateOptionFromClientCode = false;
      this.hasInitDate = false;
      this.initDate = void 0;
      this._notifyChangeEventContext = void 0;
      this._currentPromptTimeTimeout = null;

      this._int();
    }
    /**
     * @return {string}
     */


    var _proto = DateTimePicker.prototype;

    //private
    _proto._int = function _int() {
      this.isInit = true;

      var targetInput = this._element.data('target-input');

      if (this._element.is('input')) {
        this.input = this._element;
      } else if (targetInput !== undefined) {
        if (targetInput === 'nearest') {
          this.input = this._element.find('input');
        } else {
          this.input = $(targetInput);
        }
      }

      this._dates = [];
      this._dates[0] = this.getMoment();
      this._viewDate = this.getMoment().clone();
      $.extend(true, this._options, this._dataToOptions());
      this.hasInitDate = false;
      this.initDate = void 0;
      this.options(this._options);
      this.isInitFormatting = true;

      this._initFormatting();

      this.isInitFormatting = false;

      if (this.input !== undefined && this.input.is('input') && this.input.val().trim().length !== 0) {
        this._setValue(this._parseInputDate(this.input.val().trim()), 0);
      } else if (this._options.defaultDate && this.input !== undefined && this.input.attr('placeholder') === undefined) {
        this._setValue(this._options.defaultDate, 0);
      }

      if (this.hasInitDate) {
        this.date(this.initDate);
      }

      if (this._options.inline) {
        this.show();
      }

      this.isInit = false;
    };

    _proto._update = function _update() {
      if (!this.widget) {
        return;
      }

      this._fillDate();

      this._fillTime();
    };

    _proto._setValue = function _setValue(targetMoment, index) {
      var noIndex = typeof index === 'undefined',
          isClear = !targetMoment && noIndex,
          isDateUpdateThroughDateOptionFromClientCode = this.isDateUpdateThroughDateOptionFromClientCode,
          isNotAllowedProgrammaticUpdate = !this.isInit && this._options.updateOnlyThroughDateOption && !isDateUpdateThroughDateOptionFromClientCode;
      var outpValue = '',
          isInvalid = false,
          oldDate = this.unset ? null : this._dates[index];

      if (!oldDate && !this.unset && noIndex && isClear) {
        oldDate = this._dates[this._dates.length - 1];
      } // case of calling setValue(null or false)


      if (!targetMoment) {
        if (isNotAllowedProgrammaticUpdate) {
          this._notifyEvent({
            type: DateTimePicker.Event.CHANGE,
            date: targetMoment,
            oldDate: oldDate,
            isClear: isClear,
            isInvalid: isInvalid,
            isDateUpdateThroughDateOptionFromClientCode: isDateUpdateThroughDateOptionFromClientCode,
            isInit: this.isInit
          });

          return;
        }

        if (!this._options.allowMultidate || this._dates.length === 1 || isClear) {
          this.unset = true;
          this._dates = [];
          this._datesFormatted = [];
        } else {
          outpValue = "" + this._element.data('date') + this._options.multidateSeparator;
          outpValue = oldDate && outpValue.replace("" + oldDate.format(this.actualFormat) + this._options.multidateSeparator, '').replace("" + this._options.multidateSeparator + this._options.multidateSeparator, '').replace(new RegExp(escapeRegExp(this._options.multidateSeparator) + "\\s*$"), '') || '';

          this._dates.splice(index, 1);

          this._datesFormatted.splice(index, 1);
        }

        outpValue = trim(outpValue);

        if (this.input !== undefined) {
          this.input.val(outpValue);
          this.input.trigger('input');
        }

        this._element.data('date', outpValue);

        this._notifyEvent({
          type: DateTimePicker.Event.CHANGE,
          date: false,
          oldDate: oldDate,
          isClear: isClear,
          isInvalid: isInvalid,
          isDateUpdateThroughDateOptionFromClientCode: isDateUpdateThroughDateOptionFromClientCode,
          isInit: this.isInit
        });

        this._update();

        return;
      }

      targetMoment = targetMoment.clone().locale(this._options.locale);

      if (this._hasTimeZone()) {
        targetMoment.tz(this._options.timeZone);
      }

      if (this._options.stepping !== 1) {
        targetMoment.minutes(Math.round(targetMoment.minutes() / this._options.stepping) * this._options.stepping).seconds(0);
      }

      if (this._isValid(targetMoment)) {
        if (isNotAllowedProgrammaticUpdate) {
          this._notifyEvent({
            type: DateTimePicker.Event.CHANGE,
            date: targetMoment.clone(),
            oldDate: oldDate,
            isClear: isClear,
            isInvalid: isInvalid,
            isDateUpdateThroughDateOptionFromClientCode: isDateUpdateThroughDateOptionFromClientCode,
            isInit: this.isInit
          });

          return;
        }

        this._dates[index] = targetMoment;
        this._datesFormatted[index] = targetMoment.format('YYYY-MM-DD');
        this._viewDate = targetMoment.clone();

        if (this._options.allowMultidate && this._dates.length > 1) {
          for (var i = 0; i < this._dates.length; i++) {
            outpValue += "" + this._dates[i].format(this.actualFormat) + this._options.multidateSeparator;
          }

          outpValue = outpValue.replace(new RegExp(this._options.multidateSeparator + "\\s*$"), '');
        } else {
          outpValue = this._dates[index].format(this.actualFormat);
        }

        outpValue = trim(outpValue);

        if (this.input !== undefined) {
          this.input.val(outpValue);
          this.input.trigger('input');
        }

        this._element.data('date', outpValue);

        this.unset = false;

        this._update();

        this._notifyEvent({
          type: DateTimePicker.Event.CHANGE,
          date: this._dates[index].clone(),
          oldDate: oldDate,
          isClear: isClear,
          isInvalid: isInvalid,
          isDateUpdateThroughDateOptionFromClientCode: isDateUpdateThroughDateOptionFromClientCode,
          isInit: this.isInit
        });
      } else {
        isInvalid = true;

        if (!this._options.keepInvalid) {
          if (this.input !== undefined) {
            this.input.val("" + (this.unset ? '' : this._dates[index].format(this.actualFormat)));
            this.input.trigger('input');
          }
        } else {
          this._notifyEvent({
            type: DateTimePicker.Event.CHANGE,
            date: targetMoment,
            oldDate: oldDate,
            isClear: isClear,
            isInvalid: isInvalid,
            isDateUpdateThroughDateOptionFromClientCode: isDateUpdateThroughDateOptionFromClientCode,
            isInit: this.isInit
          });
        }

        this._notifyEvent({
          type: DateTimePicker.Event.ERROR,
          date: targetMoment,
          oldDate: oldDate
        });
      }
    };

    _proto._change = function _change(e) {
      var val = $(e.target).val().trim(),
          parsedDate = val ? this._parseInputDate(val) : null;

      this._setValue(parsedDate, 0);

      e.stopImmediatePropagation();
      return false;
    } //noinspection JSMethodCanBeStatic
    ;

    _proto._getOptions = function _getOptions(options) {
      options = $.extend(true, {}, Default, options && options.icons && options.icons.type === 'feather' ? {
        icons: defaultFeatherIcons
      } : {}, options);
      return options;
    };

    _proto._hasTimeZone = function _hasTimeZone() {
      return moment.tz !== undefined && this._options.timeZone !== undefined && this._options.timeZone !== null && this._options.timeZone !== '';
    };

    _proto._isEnabled = function _isEnabled(granularity) {
      if (typeof granularity !== 'string' || granularity.length > 1) {
        throw new TypeError('isEnabled expects a single character string parameter');
      }

      switch (granularity) {
        case 'y':
          return this.actualFormat.indexOf('Y') !== -1;

        case 'M':
          return this.actualFormat.indexOf('M') !== -1;

        case 'd':
          return this.actualFormat.toLowerCase().indexOf('d') !== -1;

        case 'h':
        case 'H':
          return this.actualFormat.toLowerCase().indexOf('h') !== -1;

        case 'm':
          return this.actualFormat.indexOf('m') !== -1;

        case 's':
          return this.actualFormat.indexOf('s') !== -1;

        case 'a':
        case 'A':
          return this.actualFormat.toLowerCase().indexOf('a') !== -1;

        default:
          return false;
      }
    };

    _proto._hasTime = function _hasTime() {
      return this._isEnabled('h') || this._isEnabled('m') || this._isEnabled('s');
    };

    _proto._hasDate = function _hasDate() {
      return this._isEnabled('y') || this._isEnabled('M') || this._isEnabled('d');
    };

    _proto._dataToOptions = function _dataToOptions() {
      var eData = this._element.data();

      var dataOptions = {};

      if (eData.dateOptions && eData.dateOptions instanceof Object) {
        dataOptions = $.extend(true, dataOptions, eData.dateOptions);
      }

      $.each(this._options, function (key) {
        var attributeName = "date" + key.charAt(0).toUpperCase() + key.slice(1); //todo data api key

        if (eData[attributeName] !== undefined) {
          dataOptions[key] = eData[attributeName];
        } else {
          delete dataOptions[key];
        }
      });
      return dataOptions;
    };

    _proto._format = function _format() {
      return this._options.format || 'YYYY-MM-DD HH:mm';
    };

    _proto._areSameDates = function _areSameDates(a, b) {
      var format = this._format();

      return a && b && (a.isSame(b) || moment(a.format(format), format).isSame(moment(b.format(format), format)));
    };

    _proto._notifyEvent = function _notifyEvent(e) {
      if (e.type === DateTimePicker.Event.CHANGE) {
        this._notifyChangeEventContext = this._notifyChangeEventContext || 0;
        this._notifyChangeEventContext++;

        if (e.date && this._areSameDates(e.date, e.oldDate) || !e.isClear && !e.date && !e.oldDate || this._notifyChangeEventContext > 1) {
          this._notifyChangeEventContext = void 0;
          return;
        }

        this._handlePromptTimeIfNeeded(e);
      }

      this._element.trigger(e);

      this._notifyChangeEventContext = void 0;
    };

    _proto._handlePromptTimeIfNeeded = function _handlePromptTimeIfNeeded(e) {
      if (this._options.promptTimeOnDateChange) {
        if (!e.oldDate && this._options.useCurrent) {
          // First time ever. If useCurrent option is set to true (default), do nothing
          // because the first date is selected automatically.
          return;
        } else if (e.oldDate && e.date && (e.oldDate.format('YYYY-MM-DD') === e.date.format('YYYY-MM-DD') || e.oldDate.format('YYYY-MM-DD') !== e.date.format('YYYY-MM-DD') && e.oldDate.format('HH:mm:ss') !== e.date.format('HH:mm:ss'))) {
          // Date didn't change (time did) or date changed because time did.
          return;
        }

        var that = this;
        clearTimeout(this._currentPromptTimeTimeout);
        this._currentPromptTimeTimeout = setTimeout(function () {
          if (that.widget) {
            that.widget.find('[data-action="togglePicker"]').click();
          }
        }, this._options.promptTimeOnDateChangeTransitionDelay);
      }
    };

    _proto._viewUpdate = function _viewUpdate(e) {
      if (e === 'y') {
        e = 'YYYY';
      }

      this._notifyEvent({
        type: DateTimePicker.Event.UPDATE,
        change: e,
        viewDate: this._viewDate.clone()
      });
    };

    _proto._showMode = function _showMode(dir) {
      if (!this.widget) {
        return;
      }

      if (dir) {
        this.currentViewMode = Math.max(this.MinViewModeNumber, Math.min(3, this.currentViewMode + dir));
      }

      this.widget.find('.datepicker > div').hide().filter(".datepicker-" + DatePickerModes[this.currentViewMode].CLASS_NAME).show();
    };

    _proto._isInDisabledDates = function _isInDisabledDates(testDate) {
      return this._options.disabledDates[testDate.format('YYYY-MM-DD')] === true;
    };

    _proto._isInEnabledDates = function _isInEnabledDates(testDate) {
      return this._options.enabledDates[testDate.format('YYYY-MM-DD')] === true;
    };

    _proto._isInDisabledHours = function _isInDisabledHours(testDate) {
      return this._options.disabledHours[testDate.format('H')] === true;
    };

    _proto._isInEnabledHours = function _isInEnabledHours(testDate) {
      return this._options.enabledHours[testDate.format('H')] === true;
    };

    _proto._isValid = function _isValid(targetMoment, granularity) {
      if (!targetMoment || !targetMoment.isValid()) {
        return false;
      }

      if (this._options.disabledDates && granularity === 'd' && this._isInDisabledDates(targetMoment)) {
        return false;
      }

      if (this._options.enabledDates && granularity === 'd' && !this._isInEnabledDates(targetMoment)) {
        return false;
      }

      if (this._options.minDate && targetMoment.isBefore(this._options.minDate, granularity)) {
        return false;
      }

      if (this._options.maxDate && targetMoment.isAfter(this._options.maxDate, granularity)) {
        return false;
      }

      if (this._options.daysOfWeekDisabled && granularity === 'd' && this._options.daysOfWeekDisabled.indexOf(targetMoment.day()) !== -1) {
        return false;
      }

      if (this._options.disabledHours && (granularity === 'h' || granularity === 'm' || granularity === 's') && this._isInDisabledHours(targetMoment)) {
        return false;
      }

      if (this._options.enabledHours && (granularity === 'h' || granularity === 'm' || granularity === 's') && !this._isInEnabledHours(targetMoment)) {
        return false;
      }

      if (this._options.disabledTimeIntervals && (granularity === 'h' || granularity === 'm' || granularity === 's')) {
        var found = false;
        $.each(this._options.disabledTimeIntervals, function () {
          if (targetMoment.isBetween(this[0], this[1])) {
            found = true;
            return false;
          }
        });

        if (found) {
          return false;
        }
      }

      return true;
    };

    _proto._parseInputDate = function _parseInputDate(inputDate, _temp) {
      var _ref = _temp === void 0 ? {} : _temp,
          _ref$isPickerShow = _ref.isPickerShow,
          isPickerShow = _ref$isPickerShow === void 0 ? false : _ref$isPickerShow;

      if (this._options.parseInputDate === undefined || isPickerShow) {
        if (!moment.isMoment(inputDate)) {
          inputDate = this.getMoment(inputDate);
        }
      } else {
        inputDate = this._options.parseInputDate(inputDate);
      } //inputDate.locale(this.options.locale);


      return inputDate;
    };

    _proto._keydown = function _keydown(e) {
      var handler = null,
          index,
          index2,
          keyBindKeys,
          allModifiersPressed;
      var pressedKeys = [],
          pressedModifiers = {},
          currentKey = e.which,
          pressed = 'p';
      keyState[currentKey] = pressed;

      for (index in keyState) {
        if (keyState.hasOwnProperty(index) && keyState[index] === pressed) {
          pressedKeys.push(index);

          if (parseInt(index, 10) !== currentKey) {
            pressedModifiers[index] = true;
          }
        }
      }

      for (index in this._options.keyBinds) {
        if (this._options.keyBinds.hasOwnProperty(index) && typeof this._options.keyBinds[index] === 'function') {
          keyBindKeys = index.split(' ');

          if (keyBindKeys.length === pressedKeys.length && KeyMap[currentKey] === keyBindKeys[keyBindKeys.length - 1]) {
            allModifiersPressed = true;

            for (index2 = keyBindKeys.length - 2; index2 >= 0; index2--) {
              if (!(KeyMap[keyBindKeys[index2]] in pressedModifiers)) {
                allModifiersPressed = false;
                break;
              }
            }

            if (allModifiersPressed) {
              handler = this._options.keyBinds[index];
              break;
            }
          }
        }
      }

      if (handler) {
        if (handler.call(this)) {
          e.stopPropagation();
          e.preventDefault();
        }
      }
    } //noinspection JSMethodCanBeStatic,SpellCheckingInspection
    ;

    _proto._keyup = function _keyup(e) {
      keyState[e.which] = 'r';

      if (keyPressHandled[e.which]) {
        keyPressHandled[e.which] = false;
        e.stopPropagation();
        e.preventDefault();
      }
    };

    _proto._indexGivenDates = function _indexGivenDates(givenDatesArray) {
      // Store given enabledDates and disabledDates as keys.
      // This way we can check their existence in O(1) time instead of looping through whole array.
      // (for example: options.enabledDates['2014-02-27'] === true)
      var givenDatesIndexed = {},
          self = this;
      $.each(givenDatesArray, function () {
        var dDate = self._parseInputDate(this);

        if (dDate.isValid()) {
          givenDatesIndexed[dDate.format('YYYY-MM-DD')] = true;
        }
      });
      return Object.keys(givenDatesIndexed).length ? givenDatesIndexed : false;
    };

    _proto._indexGivenHours = function _indexGivenHours(givenHoursArray) {
      // Store given enabledHours and disabledHours as keys.
      // This way we can check their existence in O(1) time instead of looping through whole array.
      // (for example: options.enabledHours['2014-02-27'] === true)
      var givenHoursIndexed = {};
      $.each(givenHoursArray, function () {
        givenHoursIndexed[this] = true;
      });
      return Object.keys(givenHoursIndexed).length ? givenHoursIndexed : false;
    };

    _proto._initFormatting = function _initFormatting() {
      var format = this._options.format || 'L LT',
          self = this;
      this.actualFormat = format.replace(/(\[[^\[]*])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function (formatInput) {
        return (self.isInitFormatting && self._options.date === null ? self.getMoment() : self._dates[0]).localeData().longDateFormat(formatInput) || formatInput; //todo taking the first date should be ok
      });
      this.parseFormats = this._options.extraFormats ? this._options.extraFormats.slice() : [];

      if (this.parseFormats.indexOf(format) < 0 && this.parseFormats.indexOf(this.actualFormat) < 0) {
        this.parseFormats.push(this.actualFormat);
      }

      this.use24Hours = this.actualFormat.toLowerCase().indexOf('a') < 1 && this.actualFormat.replace(/\[.*?]/g, '').indexOf('h') < 1;

      if (this._isEnabled('y')) {
        this.MinViewModeNumber = 2;
      }

      if (this._isEnabled('M')) {
        this.MinViewModeNumber = 1;
      }

      if (this._isEnabled('d')) {
        this.MinViewModeNumber = 0;
      }

      this.currentViewMode = Math.max(this.MinViewModeNumber, this.currentViewMode);

      if (!this.unset) {
        this._setValue(this._dates[0], 0);
      }
    };

    _proto._getLastPickedDate = function _getLastPickedDate() {
      var lastPickedDate = this._dates[this._getLastPickedDateIndex()];

      if (!lastPickedDate && this._options.allowMultidate) {
        lastPickedDate = moment(new Date());
      }

      return lastPickedDate;
    };

    _proto._getLastPickedDateIndex = function _getLastPickedDateIndex() {
      return this._dates.length - 1;
    } //public
    ;

    _proto.getMoment = function getMoment(d) {
      var returnMoment;

      if (d === undefined || d === null) {
        // TODO: Should this use format?
        returnMoment = moment().clone().locale(this._options.locale);
      } else if (this._hasTimeZone()) {
        // There is a string to parse and a default time zone
        // parse with the tz function which takes a default time zone if it is not in the format string
        returnMoment = moment.tz(d, this.parseFormats, this._options.locale, this._options.useStrict, this._options.timeZone);
      } else {
        returnMoment = moment(d, this.parseFormats, this._options.locale, this._options.useStrict);
      }

      if (this._hasTimeZone()) {
        returnMoment.tz(this._options.timeZone);
      }

      return returnMoment;
    };

    _proto.toggle = function toggle() {
      return this.widget ? this.hide() : this.show();
    };

    _proto.readonly = function readonly(_readonly) {
      if (arguments.length === 0) {
        return this._options.readonly;
      }

      if (typeof _readonly !== 'boolean') {
        throw new TypeError('readonly() expects a boolean parameter');
      }

      this._options.readonly = _readonly;

      if (this.input !== undefined) {
        this.input.prop('readonly', this._options.readonly);
      }

      if (this.widget) {
        this.hide();
        this.show();
      }
    };

    _proto.ignoreReadonly = function ignoreReadonly(_ignoreReadonly) {
      if (arguments.length === 0) {
        return this._options.ignoreReadonly;
      }

      if (typeof _ignoreReadonly !== 'boolean') {
        throw new TypeError('ignoreReadonly() expects a boolean parameter');
      }

      this._options.ignoreReadonly = _ignoreReadonly;
    };

    _proto.options = function options(newOptions) {
      if (arguments.length === 0) {
        return $.extend(true, {}, this._options);
      }

      if (!(newOptions instanceof Object)) {
        throw new TypeError('options() this.options parameter should be an object');
      }

      $.extend(true, this._options, newOptions);
      var self = this,
          optionsKeys = Object.keys(this._options).sort(optionsSortFn);
      $.each(optionsKeys, function (i, key) {
        var value = self._options[key];

        if (self[key] !== undefined) {
          if (self.isInit && key === 'date') {
            self.hasInitDate = true;
            self.initDate = value;
            return;
          }

          self[key](value);
        }
      });
    };

    _proto.date = function date(newDate, index) {
      index = index || 0;

      if (arguments.length === 0) {
        if (this.unset) {
          return null;
        }

        if (this._options.allowMultidate) {
          return this._dates.join(this._options.multidateSeparator);
        } else {
          return this._dates[index].clone();
        }
      }

      if (newDate !== null && typeof newDate !== 'string' && !moment.isMoment(newDate) && !(newDate instanceof Date)) {
        throw new TypeError('date() parameter must be one of [null, string, moment or Date]');
      }

      if (typeof newDate === 'string' && isValidDateTimeStr(newDate)) {
        newDate = new Date(newDate);
      }

      this._setValue(newDate === null ? null : this._parseInputDate(newDate), index);
    };

    _proto.updateOnlyThroughDateOption = function updateOnlyThroughDateOption(_updateOnlyThroughDateOption) {
      if (typeof _updateOnlyThroughDateOption !== 'boolean') {
        throw new TypeError('updateOnlyThroughDateOption() expects a boolean parameter');
      }

      this._options.updateOnlyThroughDateOption = _updateOnlyThroughDateOption;
    };

    _proto.format = function format(newFormat) {
      if (arguments.length === 0) {
        return this._options.format;
      }

      if (typeof newFormat !== 'string' && (typeof newFormat !== 'boolean' || newFormat !== false)) {
        throw new TypeError("format() expects a string or boolean:false parameter " + newFormat);
      }

      this._options.format = newFormat;

      if (this.actualFormat) {
        this._initFormatting(); // reinitialize formatting

      }
    };

    _proto.timeZone = function timeZone(newZone) {
      if (arguments.length === 0) {
        return this._options.timeZone;
      }

      if (typeof newZone !== 'string') {
        throw new TypeError('newZone() expects a string parameter');
      }

      this._options.timeZone = newZone;
    };

    _proto.dayViewHeaderFormat = function dayViewHeaderFormat(newFormat) {
      if (arguments.length === 0) {
        return this._options.dayViewHeaderFormat;
      }

      if (typeof newFormat !== 'string') {
        throw new TypeError('dayViewHeaderFormat() expects a string parameter');
      }

      this._options.dayViewHeaderFormat = newFormat;
    };

    _proto.extraFormats = function extraFormats(formats) {
      if (arguments.length === 0) {
        return this._options.extraFormats;
      }

      if (formats !== false && !(formats instanceof Array)) {
        throw new TypeError('extraFormats() expects an array or false parameter');
      }

      this._options.extraFormats = formats;

      if (this.parseFormats) {
        this._initFormatting(); // reinit formatting

      }
    };

    _proto.disabledDates = function disabledDates(dates) {
      if (arguments.length === 0) {
        return this._options.disabledDates ? $.extend({}, this._options.disabledDates) : this._options.disabledDates;
      }

      if (!dates) {
        this._options.disabledDates = false;

        this._update();

        return true;
      }

      if (!(dates instanceof Array)) {
        throw new TypeError('disabledDates() expects an array parameter');
      }

      this._options.disabledDates = this._indexGivenDates(dates);
      this._options.enabledDates = false;

      this._update();
    };

    _proto.enabledDates = function enabledDates(dates) {
      if (arguments.length === 0) {
        return this._options.enabledDates ? $.extend({}, this._options.enabledDates) : this._options.enabledDates;
      }

      if (!dates) {
        this._options.enabledDates = false;

        this._update();

        return true;
      }

      if (!(dates instanceof Array)) {
        throw new TypeError('enabledDates() expects an array parameter');
      }

      this._options.enabledDates = this._indexGivenDates(dates);
      this._options.disabledDates = false;

      this._update();
    };

    _proto.daysOfWeekDisabled = function daysOfWeekDisabled(_daysOfWeekDisabled) {
      if (arguments.length === 0) {
        return this._options.daysOfWeekDisabled.splice(0);
      }

      if (typeof _daysOfWeekDisabled === 'boolean' && !_daysOfWeekDisabled) {
        this._options.daysOfWeekDisabled = false;

        this._update();

        return true;
      }

      if (!(_daysOfWeekDisabled instanceof Array)) {
        throw new TypeError('daysOfWeekDisabled() expects an array parameter');
      }

      this._options.daysOfWeekDisabled = _daysOfWeekDisabled.reduce(function (previousValue, currentValue) {
        currentValue = parseInt(currentValue, 10);

        if (currentValue > 6 || currentValue < 0 || isNaN(currentValue)) {
          return previousValue;
        }

        if (previousValue.indexOf(currentValue) === -1) {
          previousValue.push(currentValue);
        }

        return previousValue;
      }, []).sort();

      if (this._options.useCurrent && !this._options.keepInvalid) {
        for (var i = 0; i < this._dates.length; i++) {
          var tries = 0;

          while (!this._isValid(this._dates[i], 'd')) {
            this._dates[i].add(1, 'd');

            if (tries === 31) {
              throw 'Tried 31 times to find a valid date';
            }

            tries++;
          }

          this._setValue(this._dates[i], i);
        }
      }

      this._update();
    };

    _proto.maxDate = function maxDate(_maxDate) {
      if (arguments.length === 0) {
        return this._options.maxDate ? this._options.maxDate.clone() : this._options.maxDate;
      }

      if (typeof _maxDate === 'boolean' && _maxDate === false) {
        this._options.maxDate = false;

        this._update();

        return true;
      }

      if (typeof _maxDate === 'string') {
        if (_maxDate === 'now' || _maxDate === 'moment') {
          _maxDate = this.getMoment();
        }
      }

      var parsedDate = this._parseInputDate(_maxDate);

      if (!parsedDate.isValid()) {
        throw new TypeError("maxDate() Could not parse date parameter: " + _maxDate);
      }

      if (this._options.minDate && parsedDate.isBefore(this._options.minDate)) {
        throw new TypeError("maxDate() date parameter is before this.options.minDate: " + parsedDate.format(this.actualFormat));
      }

      this._options.maxDate = parsedDate;

      for (var i = 0; i < this._dates.length; i++) {
        if (this._options.useCurrent && !this._options.keepInvalid && this._dates[i].isAfter(_maxDate)) {
          this._setValue(this._options.maxDate, i);
        }
      }

      if (this._viewDate.isAfter(parsedDate)) {
        this._viewDate = parsedDate.clone().subtract(this._options.stepping, 'm');
      }

      this._update();
    };

    _proto.minDate = function minDate(_minDate) {
      if (arguments.length === 0) {
        return this._options.minDate ? this._options.minDate.clone() : this._options.minDate;
      }

      if (typeof _minDate === 'boolean' && _minDate === false) {
        this._options.minDate = false;

        this._update();

        return true;
      }

      if (typeof _minDate === 'string') {
        if (_minDate === 'now' || _minDate === 'moment') {
          _minDate = this.getMoment();
        }
      }

      var parsedDate = this._parseInputDate(_minDate);

      if (!parsedDate.isValid()) {
        throw new TypeError("minDate() Could not parse date parameter: " + _minDate);
      }

      if (this._options.maxDate && parsedDate.isAfter(this._options.maxDate)) {
        throw new TypeError("minDate() date parameter is after this.options.maxDate: " + parsedDate.format(this.actualFormat));
      }

      this._options.minDate = parsedDate;

      for (var i = 0; i < this._dates.length; i++) {
        if (this._options.useCurrent && !this._options.keepInvalid && this._dates[i].isBefore(_minDate)) {
          this._setValue(this._options.minDate, i);
        }
      }

      if (this._viewDate.isBefore(parsedDate)) {
        this._viewDate = parsedDate.clone().add(this._options.stepping, 'm');
      }

      this._update();
    };

    _proto.defaultDate = function defaultDate(_defaultDate) {
      if (arguments.length === 0) {
        return this._options.defaultDate ? this._options.defaultDate.clone() : this._options.defaultDate;
      }

      if (!_defaultDate) {
        this._options.defaultDate = false;
        return true;
      }

      if (typeof _defaultDate === 'string') {
        if (_defaultDate === 'now' || _defaultDate === 'moment') {
          _defaultDate = this.getMoment();
        } else {
          _defaultDate = this.getMoment(_defaultDate);
        }
      }

      var parsedDate = this._parseInputDate(_defaultDate);

      if (!parsedDate.isValid()) {
        throw new TypeError("defaultDate() Could not parse date parameter: " + _defaultDate);
      }

      if (!this._isValid(parsedDate)) {
        throw new TypeError('defaultDate() date passed is invalid according to component setup validations');
      }

      this._options.defaultDate = parsedDate;

      if (this._options.defaultDate && this._options.inline || this.input !== undefined && this.input.val().trim() === '') {
        this._setValue(this._options.defaultDate, 0);
      }
    };

    _proto.locale = function locale(_locale) {
      if (arguments.length === 0) {
        return this._options.locale;
      }

      if (!moment.localeData(_locale)) {
        throw new TypeError("locale() locale " + _locale + " is not loaded from moment locales!");
      }

      this._options.locale = _locale;

      for (var i = 0; i < this._dates.length; i++) {
        this._dates[i].locale(this._options.locale);
      }

      this._viewDate.locale(this._options.locale);

      if (this.actualFormat) {
        this._initFormatting(); // reinitialize formatting

      }

      if (this.widget) {
        this.hide();
        this.show();
      }
    };

    _proto.stepping = function stepping(_stepping) {
      if (arguments.length === 0) {
        return this._options.stepping;
      }

      _stepping = parseInt(_stepping, 10);

      if (isNaN(_stepping) || _stepping < 1) {
        _stepping = 1;
      }

      this._options.stepping = _stepping;
    };

    _proto.useCurrent = function useCurrent(_useCurrent) {
      var useCurrentOptions = ['year', 'month', 'day', 'hour', 'minute'];

      if (arguments.length === 0) {
        return this._options.useCurrent;
      }

      if (typeof _useCurrent !== 'boolean' && typeof _useCurrent !== 'string') {
        throw new TypeError('useCurrent() expects a boolean or string parameter');
      }

      if (typeof _useCurrent === 'string' && useCurrentOptions.indexOf(_useCurrent.toLowerCase()) === -1) {
        throw new TypeError("useCurrent() expects a string parameter of " + useCurrentOptions.join(', '));
      }

      this._options.useCurrent = _useCurrent;
    };

    _proto.collapse = function collapse(_collapse) {
      if (arguments.length === 0) {
        return this._options.collapse;
      }

      if (typeof _collapse !== 'boolean') {
        throw new TypeError('collapse() expects a boolean parameter');
      }

      if (this._options.collapse === _collapse) {
        return true;
      }

      this._options.collapse = _collapse;

      if (this.widget) {
        this.hide();
        this.show();
      }
    };

    _proto.icons = function icons(_icons) {
      if (arguments.length === 0) {
        return $.extend({}, this._options.icons);
      }

      if (!(_icons instanceof Object)) {
        throw new TypeError('icons() expects parameter to be an Object');
      }

      $.extend(this._options.icons, _icons);

      if (this.widget) {
        this.hide();
        this.show();
      }
    };

    _proto.tooltips = function tooltips(_tooltips) {
      if (arguments.length === 0) {
        return $.extend({}, this._options.tooltips);
      }

      if (!(_tooltips instanceof Object)) {
        throw new TypeError('tooltips() expects parameter to be an Object');
      }

      $.extend(this._options.tooltips, _tooltips);

      if (this.widget) {
        this.hide();
        this.show();
      }
    };

    _proto.useStrict = function useStrict(_useStrict) {
      if (arguments.length === 0) {
        return this._options.useStrict;
      }

      if (typeof _useStrict !== 'boolean') {
        throw new TypeError('useStrict() expects a boolean parameter');
      }

      this._options.useStrict = _useStrict;
    };

    _proto.sideBySide = function sideBySide(_sideBySide) {
      if (arguments.length === 0) {
        return this._options.sideBySide;
      }

      if (typeof _sideBySide !== 'boolean') {
        throw new TypeError('sideBySide() expects a boolean parameter');
      }

      this._options.sideBySide = _sideBySide;

      if (this.widget) {
        this.hide();
        this.show();
      }
    };

    _proto.viewMode = function viewMode(_viewMode) {
      if (arguments.length === 0) {
        return this._options.viewMode;
      }

      if (typeof _viewMode !== 'string') {
        throw new TypeError('viewMode() expects a string parameter');
      }

      if (DateTimePicker.ViewModes.indexOf(_viewMode) === -1) {
        throw new TypeError("viewMode() parameter must be one of (" + DateTimePicker.ViewModes.join(', ') + ") value");
      }

      this._options.viewMode = _viewMode;
      this.currentViewMode = Math.max(DateTimePicker.ViewModes.indexOf(_viewMode) - 1, this.MinViewModeNumber);

      this._showMode();
    };

    _proto.calendarWeeks = function calendarWeeks(_calendarWeeks) {
      if (arguments.length === 0) {
        return this._options.calendarWeeks;
      }

      if (typeof _calendarWeeks !== 'boolean') {
        throw new TypeError('calendarWeeks() expects parameter to be a boolean value');
      }

      this._options.calendarWeeks = _calendarWeeks;

      this._update();
    };

    _proto.buttons = function buttons(_buttons) {
      if (arguments.length === 0) {
        return $.extend({}, this._options.buttons);
      }

      if (!(_buttons instanceof Object)) {
        throw new TypeError('buttons() expects parameter to be an Object');
      }

      $.extend(this._options.buttons, _buttons);

      if (typeof this._options.buttons.showToday !== 'boolean') {
        throw new TypeError('buttons.showToday expects a boolean parameter');
      }

      if (typeof this._options.buttons.showClear !== 'boolean') {
        throw new TypeError('buttons.showClear expects a boolean parameter');
      }

      if (typeof this._options.buttons.showClose !== 'boolean') {
        throw new TypeError('buttons.showClose expects a boolean parameter');
      }

      if (this.widget) {
        this.hide();
        this.show();
      }
    };

    _proto.keepOpen = function keepOpen(_keepOpen) {
      if (arguments.length === 0) {
        return this._options.keepOpen;
      }

      if (typeof _keepOpen !== 'boolean') {
        throw new TypeError('keepOpen() expects a boolean parameter');
      }

      this._options.keepOpen = _keepOpen;
    };

    _proto.focusOnShow = function focusOnShow(_focusOnShow) {
      if (arguments.length === 0) {
        return this._options.focusOnShow;
      }

      if (typeof _focusOnShow !== 'boolean') {
        throw new TypeError('focusOnShow() expects a boolean parameter');
      }

      this._options.focusOnShow = _focusOnShow;
    };

    _proto.inline = function inline(_inline) {
      if (arguments.length === 0) {
        return this._options.inline;
      }

      if (typeof _inline !== 'boolean') {
        throw new TypeError('inline() expects a boolean parameter');
      }

      this._options.inline = _inline;
    };

    _proto.clear = function clear() {
      this._setValue(null); //todo

    };

    _proto.keyBinds = function keyBinds(_keyBinds) {
      if (arguments.length === 0) {
        return this._options.keyBinds;
      }

      this._options.keyBinds = _keyBinds;
    };

    _proto.debug = function debug(_debug) {
      if (typeof _debug !== 'boolean') {
        throw new TypeError('debug() expects a boolean parameter');
      }

      this._options.debug = _debug;
    };

    _proto.allowInputToggle = function allowInputToggle(_allowInputToggle) {
      if (arguments.length === 0) {
        return this._options.allowInputToggle;
      }

      if (typeof _allowInputToggle !== 'boolean') {
        throw new TypeError('allowInputToggle() expects a boolean parameter');
      }

      this._options.allowInputToggle = _allowInputToggle;
    };

    _proto.keepInvalid = function keepInvalid(_keepInvalid) {
      if (arguments.length === 0) {
        return this._options.keepInvalid;
      }

      if (typeof _keepInvalid !== 'boolean') {
        throw new TypeError('keepInvalid() expects a boolean parameter');
      }

      this._options.keepInvalid = _keepInvalid;
    };

    _proto.datepickerInput = function datepickerInput(_datepickerInput) {
      if (arguments.length === 0) {
        return this._options.datepickerInput;
      }

      if (typeof _datepickerInput !== 'string') {
        throw new TypeError('datepickerInput() expects a string parameter');
      }

      this._options.datepickerInput = _datepickerInput;
    };

    _proto.parseInputDate = function parseInputDate(_parseInputDate2) {
      if (arguments.length === 0) {
        return this._options.parseInputDate;
      }

      if (typeof _parseInputDate2 !== 'function') {
        throw new TypeError('parseInputDate() should be as function');
      }

      this._options.parseInputDate = _parseInputDate2;
    };

    _proto.disabledTimeIntervals = function disabledTimeIntervals(_disabledTimeIntervals) {
      if (arguments.length === 0) {
        return this._options.disabledTimeIntervals ? $.extend({}, this._options.disabledTimeIntervals) : this._options.disabledTimeIntervals;
      }

      if (!_disabledTimeIntervals) {
        this._options.disabledTimeIntervals = false;

        this._update();

        return true;
      }

      if (!(_disabledTimeIntervals instanceof Array)) {
        throw new TypeError('disabledTimeIntervals() expects an array parameter');
      }

      this._options.disabledTimeIntervals = _disabledTimeIntervals;

      this._update();
    };

    _proto.disabledHours = function disabledHours(hours) {
      if (arguments.length === 0) {
        return this._options.disabledHours ? $.extend({}, this._options.disabledHours) : this._options.disabledHours;
      }

      if (!hours) {
        this._options.disabledHours = false;

        this._update();

        return true;
      }

      if (!(hours instanceof Array)) {
        throw new TypeError('disabledHours() expects an array parameter');
      }

      this._options.disabledHours = this._indexGivenHours(hours);
      this._options.enabledHours = false;

      if (this._options.useCurrent && !this._options.keepInvalid) {
        for (var i = 0; i < this._dates.length; i++) {
          var tries = 0;

          while (!this._isValid(this._dates[i], 'h')) {
            this._dates[i].add(1, 'h');

            if (tries === 24) {
              throw 'Tried 24 times to find a valid date';
            }

            tries++;
          }

          this._setValue(this._dates[i], i);
        }
      }

      this._update();
    };

    _proto.enabledHours = function enabledHours(hours) {
      if (arguments.length === 0) {
        return this._options.enabledHours ? $.extend({}, this._options.enabledHours) : this._options.enabledHours;
      }

      if (!hours) {
        this._options.enabledHours = false;

        this._update();

        return true;
      }

      if (!(hours instanceof Array)) {
        throw new TypeError('enabledHours() expects an array parameter');
      }

      this._options.enabledHours = this._indexGivenHours(hours);
      this._options.disabledHours = false;

      if (this._options.useCurrent && !this._options.keepInvalid) {
        for (var i = 0; i < this._dates.length; i++) {
          var tries = 0;

          while (!this._isValid(this._dates[i], 'h')) {
            this._dates[i].add(1, 'h');

            if (tries === 24) {
              throw 'Tried 24 times to find a valid date';
            }

            tries++;
          }

          this._setValue(this._dates[i], i);
        }
      }

      this._update();
    };

    _proto.viewDate = function viewDate(newDate) {
      if (arguments.length === 0) {
        return this._viewDate.clone();
      }

      if (!newDate) {
        this._viewDate = (this._dates[0] || this.getMoment()).clone();
        return true;
      }

      if (typeof newDate !== 'string' && !moment.isMoment(newDate) && !(newDate instanceof Date)) {
        throw new TypeError('viewDate() parameter must be one of [string, moment or Date]');
      }

      this._viewDate = this._parseInputDate(newDate);

      this._update();

      this._viewUpdate(DatePickerModes[this.currentViewMode] && DatePickerModes[this.currentViewMode].NAV_FUNCTION);
    };

    _proto._fillDate = function _fillDate() {};

    _proto._useFeatherIcons = function _useFeatherIcons() {
      return this._options.icons.type === 'feather';
    };

    _proto.allowMultidate = function allowMultidate(_allowMultidate) {
      if (typeof _allowMultidate !== 'boolean') {
        throw new TypeError('allowMultidate() expects a boolean parameter');
      }

      this._options.allowMultidate = _allowMultidate;
    };

    _proto.multidateSeparator = function multidateSeparator(_multidateSeparator) {
      if (arguments.length === 0) {
        return this._options.multidateSeparator;
      }

      if (typeof _multidateSeparator !== 'string') {
        throw new TypeError('multidateSeparator expects a string parameter');
      }

      this._options.multidateSeparator = _multidateSeparator;
    };

    _createClass(DateTimePicker, null, [{
      key: "NAME",
      get: function get() {
        return NAME;
      }
      /**
       * @return {string}
       */

    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY;
      }
      /**
       * @return {string}
       */

    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY;
      }
      /**
       * @return {string}
       */

    }, {
      key: "DATA_API_KEY",
      get: function get() {
        return DATA_API_KEY;
      }
    }, {
      key: "DatePickerModes",
      get: function get() {
        return DatePickerModes;
      }
    }, {
      key: "ViewModes",
      get: function get() {
        return ViewModes;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event;
      }
    }, {
      key: "Selector",
      get: function get() {
        return Selector;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      },
      set: function set(value) {
        Default = value;
      }
    }, {
      key: "ClassName",
      get: function get() {
        return ClassName;
      }
    }]);

    return DateTimePicker;
  }();

  return DateTimePicker;
}(jQuery, moment); //noinspection JSUnusedGlobalSymbols

/* global DateTimePicker */

/* global feather */


var TempusDominusBootstrap4 = function ($) {
  // eslint-disable-line no-unused-vars
  // ReSharper disable once InconsistentNaming
  var JQUERY_NO_CONFLICT = $.fn[DateTimePicker.NAME],
      verticalModes = ['top', 'bottom', 'auto'],
      horizontalModes = ['left', 'right', 'auto'],
      toolbarPlacements = ['default', 'top', 'bottom'],
      getSelectorFromElement = function getSelectorFromElement($element) {
    var selector = $element.data('target'),
        $selector;

    if (!selector) {
      selector = $element.attr('href') || '';
      selector = /^#[a-z]/i.test(selector) ? selector : null;
    }

    $selector = $(selector);

    if ($selector.length === 0) {
      return $element;
    }

    if (!$selector.data(DateTimePicker.DATA_KEY)) {
      $.extend({}, $selector.data(), $(this).data());
    }

    return $selector;
  }; // ReSharper disable once InconsistentNaming


  var TempusDominusBootstrap4 = /*#__PURE__*/function (_DateTimePicker) {
    _inheritsLoose(TempusDominusBootstrap4, _DateTimePicker);

    function TempusDominusBootstrap4(element, options) {
      var _this;

      _this = _DateTimePicker.call(this, element, options) || this;

      _this._init();

      return _this;
    }

    var _proto2 = TempusDominusBootstrap4.prototype;

    _proto2._init = function _init() {
      if (this._element.hasClass('input-group')) {
        var datepickerButton = this._element.find('.datepickerbutton');

        if (datepickerButton.length === 0) {
          this.component = this._element.find('[data-toggle="datetimepicker"]');
        } else {
          this.component = datepickerButton;
        }
      }
    };

    _proto2._iconTag = function _iconTag(iconName) {
      if (typeof feather !== 'undefined' && this._useFeatherIcons() && feather.icons[iconName]) {
        return $('<span>').html(feather.icons[iconName].toSvg());
      } else {
        return $('<span>').addClass(iconName);
      }
    };

    _proto2._getDatePickerTemplate = function _getDatePickerTemplate() {
      var headTemplate = $('<thead>').append($('<tr>').append($('<th>').addClass('prev').attr('data-action', 'previous').append(this._iconTag(this._options.icons.previous))).append($('<th>').addClass('picker-switch').attr('data-action', 'pickerSwitch').attr('colspan', "" + (this._options.calendarWeeks ? '6' : '5'))).append($('<th>').addClass('next').attr('data-action', 'next').append(this._iconTag(this._options.icons.next)))),
          contTemplate = $('<tbody>').append($('<tr>').append($('<td>').attr('colspan', "" + (this._options.calendarWeeks ? '8' : '7'))));
      return [$('<div>').addClass('datepicker-days').append($('<table>').addClass('table table-sm').append(headTemplate).append($('<tbody>'))), $('<div>').addClass('datepicker-months').append($('<table>').addClass('table-condensed').append(headTemplate.clone()).append(contTemplate.clone())), $('<div>').addClass('datepicker-years').append($('<table>').addClass('table-condensed').append(headTemplate.clone()).append(contTemplate.clone())), $('<div>').addClass('datepicker-decades').append($('<table>').addClass('table-condensed').append(headTemplate.clone()).append(contTemplate.clone()))];
    };

    _proto2._getTimePickerMainTemplate = function _getTimePickerMainTemplate() {
      var topRow = $('<tr>'),
          middleRow = $('<tr>'),
          bottomRow = $('<tr>');

      if (this._isEnabled('h')) {
        topRow.append($('<td>').append($('<a>').attr({
          href: '#',
          tabindex: '-1',
          'title': this._options.tooltips.incrementHour
        }).addClass('btn').attr('data-action', 'incrementHours').append(this._iconTag(this._options.icons.up))));
        middleRow.append($('<td>').append($('<span>').addClass('timepicker-hour').attr({
          'data-time-component': 'hours',
          'title': this._options.tooltips.pickHour
        }).attr('data-action', 'showHours')));
        bottomRow.append($('<td>').append($('<a>').attr({
          href: '#',
          tabindex: '-1',
          'title': this._options.tooltips.decrementHour
        }).addClass('btn').attr('data-action', 'decrementHours').append(this._iconTag(this._options.icons.down))));
      }

      if (this._isEnabled('m')) {
        if (this._isEnabled('h')) {
          topRow.append($('<td>').addClass('separator'));
          middleRow.append($('<td>').addClass('separator').html(':'));
          bottomRow.append($('<td>').addClass('separator'));
        }

        topRow.append($('<td>').append($('<a>').attr({
          href: '#',
          tabindex: '-1',
          'title': this._options.tooltips.incrementMinute
        }).addClass('btn').attr('data-action', 'incrementMinutes').append(this._iconTag(this._options.icons.up))));
        middleRow.append($('<td>').append($('<span>').addClass('timepicker-minute').attr({
          'data-time-component': 'minutes',
          'title': this._options.tooltips.pickMinute
        }).attr('data-action', 'showMinutes')));
        bottomRow.append($('<td>').append($('<a>').attr({
          href: '#',
          tabindex: '-1',
          'title': this._options.tooltips.decrementMinute
        }).addClass('btn').attr('data-action', 'decrementMinutes').append(this._iconTag(this._options.icons.down))));
      }

      if (this._isEnabled('s')) {
        if (this._isEnabled('m')) {
          topRow.append($('<td>').addClass('separator'));
          middleRow.append($('<td>').addClass('separator').html(':'));
          bottomRow.append($('<td>').addClass('separator'));
        }

        topRow.append($('<td>').append($('<a>').attr({
          href: '#',
          tabindex: '-1',
          'title': this._options.tooltips.incrementSecond
        }).addClass('btn').attr('data-action', 'incrementSeconds').append(this._iconTag(this._options.icons.up))));
        middleRow.append($('<td>').append($('<span>').addClass('timepicker-second').attr({
          'data-time-component': 'seconds',
          'title': this._options.tooltips.pickSecond
        }).attr('data-action', 'showSeconds')));
        bottomRow.append($('<td>').append($('<a>').attr({
          href: '#',
          tabindex: '-1',
          'title': this._options.tooltips.decrementSecond
        }).addClass('btn').attr('data-action', 'decrementSeconds').append(this._iconTag(this._options.icons.down))));
      }

      if (!this.use24Hours) {
        topRow.append($('<td>').addClass('separator'));
        middleRow.append($('<td>').append($('<button>').addClass('btn btn-primary').attr({
          'data-action': 'togglePeriod',
          tabindex: '-1',
          'title': this._options.tooltips.togglePeriod
        })));
        bottomRow.append($('<td>').addClass('separator'));
      }

      return $('<div>').addClass('timepicker-picker').append($('<table>').addClass('table-condensed').append([topRow, middleRow, bottomRow]));
    };

    _proto2._getTimePickerTemplate = function _getTimePickerTemplate() {
      var hoursView = $('<div>').addClass('timepicker-hours').append($('<table>').addClass('table-condensed')),
          minutesView = $('<div>').addClass('timepicker-minutes').append($('<table>').addClass('table-condensed')),
          secondsView = $('<div>').addClass('timepicker-seconds').append($('<table>').addClass('table-condensed')),
          ret = [this._getTimePickerMainTemplate()];

      if (this._isEnabled('h')) {
        ret.push(hoursView);
      }

      if (this._isEnabled('m')) {
        ret.push(minutesView);
      }

      if (this._isEnabled('s')) {
        ret.push(secondsView);
      }

      return ret;
    };

    _proto2._getToolbar = function _getToolbar() {
      var row = [];

      if (this._options.buttons.showToday) {
        row.push($('<td>').append($('<a>').attr({
          href: '#',
          tabindex: '-1',
          'data-action': 'today',
          'title': this._options.tooltips.today
        }).append(this._iconTag(this._options.icons.today))));
      }

      if (!this._options.sideBySide && this._options.collapse && this._hasDate() && this._hasTime()) {
        var title, icon;

        if (this._options.viewMode === 'times') {
          title = this._options.tooltips.selectDate;
          icon = this._options.icons.date;
        } else {
          title = this._options.tooltips.selectTime;
          icon = this._options.icons.time;
        }

        row.push($('<td>').append($('<a>').attr({
          href: '#',
          tabindex: '-1',
          'data-action': 'togglePicker',
          'title': title
        }).append(this._iconTag(icon))));
      }

      if (this._options.buttons.showClear) {
        row.push($('<td>').append($('<a>').attr({
          href: '#',
          tabindex: '-1',
          'data-action': 'clear',
          'title': this._options.tooltips.clear
        }).append(this._iconTag(this._options.icons.clear))));
      }

      if (this._options.buttons.showClose) {
        row.push($('<td>').append($('<a>').attr({
          href: '#',
          tabindex: '-1',
          'data-action': 'close',
          'title': this._options.tooltips.close
        }).append(this._iconTag(this._options.icons.close))));
      }

      return row.length === 0 ? '' : $('<table>').addClass('table-condensed').append($('<tbody>').append($('<tr>').append(row)));
    };

    _proto2._getTemplate = function _getTemplate() {
      var template = $('<div>').addClass(("bootstrap-datetimepicker-widget dropdown-menu " + (this._options.calendarWeeks ? 'tempusdominus-bootstrap-datetimepicker-widget-with-calendar-weeks' : '') + " " + ((this._useFeatherIcons() ? 'tempusdominus-bootstrap-datetimepicker-widget-with-feather-icons' : '') + " ")).trim()),
          dateView = $('<div>').addClass('datepicker').append(this._getDatePickerTemplate()),
          timeView = $('<div>').addClass('timepicker').append(this._getTimePickerTemplate()),
          content = $('<ul>').addClass('list-unstyled'),
          toolbar = $('<li>').addClass(("picker-switch" + (this._options.collapse ? ' accordion-toggle' : '') + " " + ("" + (this._useFeatherIcons() ? 'picker-switch-with-feathers-icons' : ''))).trim()).append(this._getToolbar());

      if (this._options.inline) {
        template.removeClass('dropdown-menu');
      }

      if (this.use24Hours) {
        template.addClass('usetwentyfour');
      }

      if (this.input !== undefined && this.input.prop('readonly') || this._options.readonly) {
        template.addClass('bootstrap-datetimepicker-widget-readonly');
      }

      if (this._isEnabled('s') && !this.use24Hours) {
        template.addClass('wider');
      }

      if (this._options.sideBySide && this._hasDate() && this._hasTime()) {
        template.addClass('timepicker-sbs');

        if (this._options.toolbarPlacement === 'top') {
          template.append(toolbar);
        }

        template.append($('<div>').addClass('row').append(dateView.addClass('col-md-6')).append(timeView.addClass('col-md-6')));

        if (this._options.toolbarPlacement === 'bottom' || this._options.toolbarPlacement === 'default') {
          template.append(toolbar);
        }

        return template;
      }

      if (this._options.toolbarPlacement === 'top') {
        content.append(toolbar);
      }

      if (this._hasDate()) {
        content.append($('<li>').addClass(this._options.collapse && this._hasTime() ? 'collapse' : '').addClass(this._options.collapse && this._hasTime() && this._options.viewMode === 'times' ? '' : 'show').append(dateView));
      }

      if (this._options.toolbarPlacement === 'default') {
        content.append(toolbar);
      }

      if (this._hasTime()) {
        content.append($('<li>').addClass(this._options.collapse && this._hasDate() ? 'collapse' : '').addClass(this._options.collapse && this._hasDate() && this._options.viewMode === 'times' ? 'show' : '').append(timeView));
      }

      if (this._options.toolbarPlacement === 'bottom') {
        content.append(toolbar);
      }

      return template.append(content);
    };

    _proto2._place = function _place(e) {
      var self = e && e.data && e.data.picker || this,
          vertical = self._options.widgetPositioning.vertical,
          horizontal = self._options.widgetPositioning.horizontal,
          parent;
      var position = (self.component && self.component.length ? self.component : self._element).position(),
          offset = (self.component && self.component.length ? self.component : self._element).offset();

      if (self._options.widgetParent) {
        parent = self._options.widgetParent.append(self.widget);
      } else if (self._element.is('input')) {
        parent = self._element.after(self.widget).parent();
      } else if (self._options.inline) {
        parent = self._element.append(self.widget);
        return;
      } else {
        parent = self._element;

        self._element.children().first().after(self.widget);
      } // Top and bottom logic


      if (vertical === 'auto') {
        //noinspection JSValidateTypes
        if (offset.top + self.widget.height() * 1.5 >= $(window).height() + $(window).scrollTop() && self.widget.height() + self._element.outerHeight() < offset.top) {
          vertical = 'top';
        } else {
          vertical = 'bottom';
        }
      } // Left and right logic


      if (horizontal === 'auto') {
        if (parent.width() < offset.left + self.widget.outerWidth() / 2 && offset.left + self.widget.outerWidth() > $(window).width()) {
          horizontal = 'right';
        } else {
          horizontal = 'left';
        }
      }

      if (vertical === 'top') {
        self.widget.addClass('top').removeClass('bottom');
      } else {
        self.widget.addClass('bottom').removeClass('top');
      }

      if (horizontal === 'right') {
        self.widget.addClass('float-right');
      } else {
        self.widget.removeClass('float-right');
      } // find the first parent element that has a relative css positioning


      if (parent.css('position') !== 'relative') {
        parent = parent.parents().filter(function () {
          return $(this).css('position') === 'relative';
        }).first();
      }

      if (parent.length === 0) {
        throw new Error('datetimepicker component should be placed within a relative positioned container');
      }

      self.widget.css({
        top: vertical === 'top' ? 'auto' : position.top + self._element.outerHeight() + 'px',
        bottom: vertical === 'top' ? parent.outerHeight() - (parent === self._element ? 0 : position.top) + 'px' : 'auto',
        left: horizontal === 'left' ? (parent === self._element ? 0 : position.left) + 'px' : 'auto',
        right: horizontal === 'left' ? 'auto' : parent.outerWidth() - self._element.outerWidth() - (parent === self._element ? 0 : position.left) + 'px'
      });
    };

    _proto2._fillDow = function _fillDow() {
      var row = $('<tr>'),
          currentDate = this._viewDate.clone().startOf('w').startOf('d');

      if (this._options.calendarWeeks === true) {
        row.append($('<th>').addClass('cw').text('#'));
      }

      while (currentDate.isBefore(this._viewDate.clone().endOf('w'))) {
        row.append($('<th>').addClass('dow').text(currentDate.format('dd')));
        currentDate.add(1, 'd');
      }

      this.widget.find('.datepicker-days thead').append(row);
    };

    _proto2._fillMonths = function _fillMonths() {
      var spans = [],
          monthsShort = this._viewDate.clone().startOf('y').startOf('d');

      while (monthsShort.isSame(this._viewDate, 'y')) {
        spans.push($('<span>').attr('data-action', 'selectMonth').addClass('month').text(monthsShort.format('MMM')));
        monthsShort.add(1, 'M');
      }

      this.widget.find('.datepicker-months td').empty().append(spans);
    };

    _proto2._updateMonths = function _updateMonths() {
      var monthsView = this.widget.find('.datepicker-months'),
          monthsViewHeader = monthsView.find('th'),
          months = monthsView.find('tbody').find('span'),
          self = this,
          lastPickedDate = this._getLastPickedDate();

      monthsViewHeader.eq(0).find('span').attr('title', this._options.tooltips.prevYear);
      monthsViewHeader.eq(1).attr('title', this._options.tooltips.selectYear);
      monthsViewHeader.eq(2).find('span').attr('title', this._options.tooltips.nextYear);
      monthsView.find('.disabled').removeClass('disabled');

      if (!this._isValid(this._viewDate.clone().subtract(1, 'y'), 'y')) {
        monthsViewHeader.eq(0).addClass('disabled');
      }

      monthsViewHeader.eq(1).text(this._viewDate.year());

      if (!this._isValid(this._viewDate.clone().add(1, 'y'), 'y')) {
        monthsViewHeader.eq(2).addClass('disabled');
      }

      months.removeClass('active');

      if (lastPickedDate && lastPickedDate.isSame(this._viewDate, 'y') && !this.unset) {
        months.eq(lastPickedDate.month()).addClass('active');
      }

      months.each(function (index) {
        if (!self._isValid(self._viewDate.clone().month(index), 'M')) {
          $(this).addClass('disabled');
        }
      });
    };

    _proto2._getStartEndYear = function _getStartEndYear(factor, year) {
      var step = factor / 10,
          startYear = Math.floor(year / factor) * factor,
          endYear = startYear + step * 9,
          focusValue = Math.floor(year / step) * step;
      return [startYear, endYear, focusValue];
    };

    _proto2._updateYears = function _updateYears() {
      var yearsView = this.widget.find('.datepicker-years'),
          yearsViewHeader = yearsView.find('th'),
          yearCaps = this._getStartEndYear(10, this._viewDate.year()),
          startYear = this._viewDate.clone().year(yearCaps[0]),
          endYear = this._viewDate.clone().year(yearCaps[1]);

      var html = '';
      yearsViewHeader.eq(0).find('span').attr('title', this._options.tooltips.prevDecade);
      yearsViewHeader.eq(1).attr('title', this._options.tooltips.selectDecade);
      yearsViewHeader.eq(2).find('span').attr('title', this._options.tooltips.nextDecade);
      yearsView.find('.disabled').removeClass('disabled');

      if (this._options.minDate && this._options.minDate.isAfter(startYear, 'y')) {
        yearsViewHeader.eq(0).addClass('disabled');
      }

      yearsViewHeader.eq(1).text(startYear.year() + "-" + endYear.year());

      if (this._options.maxDate && this._options.maxDate.isBefore(endYear, 'y')) {
        yearsViewHeader.eq(2).addClass('disabled');
      }

      html += "<span data-action=\"selectYear\" class=\"year old" + (!this._isValid(startYear, 'y') ? ' disabled' : '') + "\">" + (startYear.year() - 1) + "</span>";

      while (!startYear.isAfter(endYear, 'y')) {
        html += "<span data-action=\"selectYear\" class=\"year" + (startYear.isSame(this._getLastPickedDate(), 'y') && !this.unset ? ' active' : '') + (!this._isValid(startYear, 'y') ? ' disabled' : '') + "\">" + startYear.year() + "</span>";
        startYear.add(1, 'y');
      }

      html += "<span data-action=\"selectYear\" class=\"year old" + (!this._isValid(startYear, 'y') ? ' disabled' : '') + "\">" + startYear.year() + "</span>";
      yearsView.find('td').html(html);
    };

    _proto2._updateDecades = function _updateDecades() {
      var decadesView = this.widget.find('.datepicker-decades'),
          decadesViewHeader = decadesView.find('th'),
          yearCaps = this._getStartEndYear(100, this._viewDate.year()),
          startDecade = this._viewDate.clone().year(yearCaps[0]),
          endDecade = this._viewDate.clone().year(yearCaps[1]),
          lastPickedDate = this._getLastPickedDate();

      var minDateDecade = false,
          maxDateDecade = false,
          endDecadeYear,
          html = '';
      decadesViewHeader.eq(0).find('span').attr('title', this._options.tooltips.prevCentury);
      decadesViewHeader.eq(2).find('span').attr('title', this._options.tooltips.nextCentury);
      decadesView.find('.disabled').removeClass('disabled');

      if (startDecade.year() === 0 || this._options.minDate && this._options.minDate.isAfter(startDecade, 'y')) {
        decadesViewHeader.eq(0).addClass('disabled');
      }

      decadesViewHeader.eq(1).text(startDecade.year() + "-" + endDecade.year());

      if (this._options.maxDate && this._options.maxDate.isBefore(endDecade, 'y')) {
        decadesViewHeader.eq(2).addClass('disabled');
      }

      if (startDecade.year() - 10 < 0) {
        html += '<span>&nbsp;</span>';
      } else {
        html += "<span data-action=\"selectDecade\" class=\"decade old\" data-selection=\"" + (startDecade.year() + 6) + "\">" + (startDecade.year() - 10) + "</span>";
      }

      while (!startDecade.isAfter(endDecade, 'y')) {
        endDecadeYear = startDecade.year() + 11;
        minDateDecade = this._options.minDate && this._options.minDate.isAfter(startDecade, 'y') && this._options.minDate.year() <= endDecadeYear;
        maxDateDecade = this._options.maxDate && this._options.maxDate.isAfter(startDecade, 'y') && this._options.maxDate.year() <= endDecadeYear;
        html += "<span data-action=\"selectDecade\" class=\"decade" + (lastPickedDate && lastPickedDate.isAfter(startDecade) && lastPickedDate.year() <= endDecadeYear ? ' active' : '') + (!this._isValid(startDecade, 'y') && !minDateDecade && !maxDateDecade ? ' disabled' : '') + "\" data-selection=\"" + (startDecade.year() + 6) + "\">" + startDecade.year() + "</span>";
        startDecade.add(10, 'y');
      }

      html += "<span data-action=\"selectDecade\" class=\"decade old\" data-selection=\"" + (startDecade.year() + 6) + "\">" + startDecade.year() + "</span>";
      decadesView.find('td').html(html);
    };

    _proto2._fillDate = function _fillDate() {
      _DateTimePicker.prototype._fillDate.call(this);

      var daysView = this.widget.find('.datepicker-days'),
          daysViewHeader = daysView.find('th'),
          html = [];
      var currentDate, row, clsName, i;

      if (!this._hasDate()) {
        return;
      }

      daysViewHeader.eq(0).find('span').attr('title', this._options.tooltips.prevMonth);
      daysViewHeader.eq(1).attr('title', this._options.tooltips.selectMonth);
      daysViewHeader.eq(2).find('span').attr('title', this._options.tooltips.nextMonth);
      daysView.find('.disabled').removeClass('disabled');
      daysViewHeader.eq(1).text(this._viewDate.format(this._options.dayViewHeaderFormat));

      if (!this._isValid(this._viewDate.clone().subtract(1, 'M'), 'M')) {
        daysViewHeader.eq(0).addClass('disabled');
      }

      if (!this._isValid(this._viewDate.clone().add(1, 'M'), 'M')) {
        daysViewHeader.eq(2).addClass('disabled');
      }

      currentDate = this._viewDate.clone().startOf('M').startOf('w').startOf('d');

      for (i = 0; i < 42; i++) {
        //always display 42 days (should show 6 weeks)
        if (currentDate.weekday() === 0) {
          row = $('<tr>');

          if (this._options.calendarWeeks) {
            row.append("<td class=\"cw\">" + currentDate.week() + "</td>");
          }

          html.push(row);
        }

        clsName = '';

        if (currentDate.isBefore(this._viewDate, 'M')) {
          clsName += ' old';
        }

        if (currentDate.isAfter(this._viewDate, 'M')) {
          clsName += ' new';
        }

        if (this._options.allowMultidate) {
          var index = this._datesFormatted.indexOf(currentDate.format('YYYY-MM-DD'));

          if (index !== -1) {
            if (currentDate.isSame(this._datesFormatted[index], 'd') && !this.unset) {
              clsName += ' active';
            }
          }
        } else {
          if (currentDate.isSame(this._getLastPickedDate(), 'd') && !this.unset) {
            clsName += ' active';
          }
        }

        if (!this._isValid(currentDate, 'd')) {
          clsName += ' disabled';
        }

        if (currentDate.isSame(this.getMoment(), 'd')) {
          clsName += ' today';
        }

        if (currentDate.day() === 0 || currentDate.day() === 6) {
          clsName += ' weekend';
        }

        row.append("<td data-action=\"selectDay\" data-day=\"" + currentDate.format('L') + "\" class=\"day" + clsName + "\">" + currentDate.date() + "</td>");
        currentDate.add(1, 'd');
      }

      $('body').addClass('tempusdominus-bootstrap-datetimepicker-widget-day-click');
      $('body').append('<div class="tempusdominus-bootstrap-datetimepicker-widget-day-click-glass-panel"></div>');
      daysView.find('tbody').empty().append(html);
      $('body').find('.tempusdominus-bootstrap-datetimepicker-widget-day-click-glass-panel').remove();
      $('body').removeClass('tempusdominus-bootstrap-datetimepicker-widget-day-click');

      this._updateMonths();

      this._updateYears();

      this._updateDecades();
    };

    _proto2._fillHours = function _fillHours() {
      var table = this.widget.find('.timepicker-hours table'),
          currentHour = this._viewDate.clone().startOf('d'),
          html = [];

      var row = $('<tr>');

      if (this._viewDate.hour() > 11 && !this.use24Hours) {
        currentHour.hour(12);
      }

      while (currentHour.isSame(this._viewDate, 'd') && (this.use24Hours || this._viewDate.hour() < 12 && currentHour.hour() < 12 || this._viewDate.hour() > 11)) {
        if (currentHour.hour() % 4 === 0) {
          row = $('<tr>');
          html.push(row);
        }

        row.append("<td data-action=\"selectHour\" class=\"hour" + (!this._isValid(currentHour, 'h') ? ' disabled' : '') + "\">" + currentHour.format(this.use24Hours ? 'HH' : 'hh') + "</td>");
        currentHour.add(1, 'h');
      }

      table.empty().append(html);
    };

    _proto2._fillMinutes = function _fillMinutes() {
      var table = this.widget.find('.timepicker-minutes table'),
          currentMinute = this._viewDate.clone().startOf('h'),
          html = [],
          step = this._options.stepping === 1 ? 5 : this._options.stepping;

      var row = $('<tr>');

      while (this._viewDate.isSame(currentMinute, 'h')) {
        if (currentMinute.minute() % (step * 4) === 0) {
          row = $('<tr>');
          html.push(row);
        }

        row.append("<td data-action=\"selectMinute\" class=\"minute" + (!this._isValid(currentMinute, 'm') ? ' disabled' : '') + "\">" + currentMinute.format('mm') + "</td>");
        currentMinute.add(step, 'm');
      }

      table.empty().append(html);
    };

    _proto2._fillSeconds = function _fillSeconds() {
      var table = this.widget.find('.timepicker-seconds table'),
          currentSecond = this._viewDate.clone().startOf('m'),
          html = [];

      var row = $('<tr>');

      while (this._viewDate.isSame(currentSecond, 'm')) {
        if (currentSecond.second() % 20 === 0) {
          row = $('<tr>');
          html.push(row);
        }

        row.append("<td data-action=\"selectSecond\" class=\"second" + (!this._isValid(currentSecond, 's') ? ' disabled' : '') + "\">" + currentSecond.format('ss') + "</td>");
        currentSecond.add(5, 's');
      }

      table.empty().append(html);
    };

    _proto2._fillTime = function _fillTime() {
      var toggle, newDate;

      var timeComponents = this.widget.find('.timepicker span[data-time-component]'),
          lastPickedDate = this._getLastPickedDate();

      if (!this.use24Hours) {
        toggle = this.widget.find('.timepicker [data-action=togglePeriod]');
        newDate = lastPickedDate ? lastPickedDate.clone().add(lastPickedDate.hours() >= 12 ? -12 : 12, 'h') : void 0;
        lastPickedDate && toggle.text(lastPickedDate.format('A'));

        if (this._isValid(newDate, 'h')) {
          toggle.removeClass('disabled');
        } else {
          toggle.addClass('disabled');
        }
      }

      lastPickedDate && timeComponents.filter('[data-time-component=hours]').text(lastPickedDate.format("" + (this.use24Hours ? 'HH' : 'hh')));
      lastPickedDate && timeComponents.filter('[data-time-component=minutes]').text(lastPickedDate.format('mm'));
      lastPickedDate && timeComponents.filter('[data-time-component=seconds]').text(lastPickedDate.format('ss'));

      this._fillHours();

      this._fillMinutes();

      this._fillSeconds();
    };

    _proto2._doAction = function _doAction(e, action) {
      var lastPicked = this._getLastPickedDate();

      if ($(e.currentTarget).is('.disabled')) {
        return false;
      }

      action = action || $(e.currentTarget).data('action');

      switch (action) {
        case 'next':
          {
            var navFnc = DateTimePicker.DatePickerModes[this.currentViewMode].NAV_FUNCTION;

            this._viewDate.add(DateTimePicker.DatePickerModes[this.currentViewMode].NAV_STEP, navFnc);

            this._fillDate();

            this._viewUpdate(navFnc);

            break;
          }

        case 'previous':
          {
            var _navFnc = DateTimePicker.DatePickerModes[this.currentViewMode].NAV_FUNCTION;

            this._viewDate.subtract(DateTimePicker.DatePickerModes[this.currentViewMode].NAV_STEP, _navFnc);

            this._fillDate();

            this._viewUpdate(_navFnc);

            break;
          }

        case 'pickerSwitch':
          this._showMode(1);

          break;

        case 'selectMonth':
          {
            var month = $(e.target).closest('tbody').find('span').index($(e.target));

            this._viewDate.month(month);

            if (this.currentViewMode === this.MinViewModeNumber) {
              this._setValue(lastPicked.clone().year(this._viewDate.year()).month(this._viewDate.month()), this._getLastPickedDateIndex());

              if (!this._options.inline) {
                this.hide();
              }
            } else {
              this._showMode(-1);

              this._fillDate();
            }

            this._viewUpdate('M');

            break;
          }

        case 'selectYear':
          {
            var year = parseInt($(e.target).text(), 10) || 0;

            this._viewDate.year(year);

            if (this.currentViewMode === this.MinViewModeNumber) {
              this._setValue(lastPicked.clone().year(this._viewDate.year()), this._getLastPickedDateIndex());

              if (!this._options.inline) {
                this.hide();
              }
            } else {
              this._showMode(-1);

              this._fillDate();
            }

            this._viewUpdate('YYYY');

            break;
          }

        case 'selectDecade':
          {
            var _year = parseInt($(e.target).data('selection'), 10) || 0;

            this._viewDate.year(_year);

            if (this.currentViewMode === this.MinViewModeNumber) {
              this._setValue(lastPicked.clone().year(this._viewDate.year()), this._getLastPickedDateIndex());

              if (!this._options.inline) {
                this.hide();
              }
            } else {
              this._showMode(-1);

              this._fillDate();
            }

            this._viewUpdate('YYYY');

            break;
          }

        case 'selectDay':
          {
            var day = this._viewDate.clone();

            if ($(e.target).is('.old')) {
              day.subtract(1, 'M');
            }

            if ($(e.target).is('.new')) {
              day.add(1, 'M');
            }

            var selectDate = day.date(parseInt($(e.target).text(), 10)),
                index = 0;

            if (this._options.allowMultidate) {
              index = this._datesFormatted.indexOf(selectDate.format('YYYY-MM-DD'));

              if (index !== -1) {
                this._setValue(null, index); //deselect multidate

              } else {
                this._setValue(selectDate, this._getLastPickedDateIndex() + 1);
              }
            } else {
              this._setValue(selectDate, this._getLastPickedDateIndex());
            }

            if (!this._hasTime() && !this._options.keepOpen && !this._options.inline && !this._options.allowMultidate) {
              this.hide();
            }

            break;
          }

        case 'incrementHours':
          {
            if (!lastPicked) {
              break;
            }

            var newDate = lastPicked.clone().add(1, 'h');

            if (this._isValid(newDate, 'h')) {
              if (this._getLastPickedDateIndex() < 0) {
                this.date(newDate);
              }

              this._setValue(newDate, this._getLastPickedDateIndex());
            }

            break;
          }

        case 'incrementMinutes':
          {
            if (!lastPicked) {
              break;
            }

            var _newDate = lastPicked.clone().add(this._options.stepping, 'm');

            if (this._isValid(_newDate, 'm')) {
              if (this._getLastPickedDateIndex() < 0) {
                this.date(_newDate);
              }

              this._setValue(_newDate, this._getLastPickedDateIndex());
            }

            break;
          }

        case 'incrementSeconds':
          {
            if (!lastPicked) {
              break;
            }

            var _newDate2 = lastPicked.clone().add(1, 's');

            if (this._isValid(_newDate2, 's')) {
              if (this._getLastPickedDateIndex() < 0) {
                this.date(_newDate2);
              }

              this._setValue(_newDate2, this._getLastPickedDateIndex());
            }

            break;
          }

        case 'decrementHours':
          {
            if (!lastPicked) {
              break;
            }

            var _newDate3 = lastPicked.clone().subtract(1, 'h');

            if (this._isValid(_newDate3, 'h')) {
              if (this._getLastPickedDateIndex() < 0) {
                this.date(_newDate3);
              }

              this._setValue(_newDate3, this._getLastPickedDateIndex());
            }

            break;
          }

        case 'decrementMinutes':
          {
            if (!lastPicked) {
              break;
            }

            var _newDate4 = lastPicked.clone().subtract(this._options.stepping, 'm');

            if (this._isValid(_newDate4, 'm')) {
              if (this._getLastPickedDateIndex() < 0) {
                this.date(_newDate4);
              }

              this._setValue(_newDate4, this._getLastPickedDateIndex());
            }

            break;
          }

        case 'decrementSeconds':
          {
            if (!lastPicked) {
              break;
            }

            var _newDate5 = lastPicked.clone().subtract(1, 's');

            if (this._isValid(_newDate5, 's')) {
              if (this._getLastPickedDateIndex() < 0) {
                this.date(_newDate5);
              }

              this._setValue(_newDate5, this._getLastPickedDateIndex());
            }

            break;
          }

        case 'togglePeriod':
          {
            this._setValue(lastPicked.clone().add(lastPicked.hours() >= 12 ? -12 : 12, 'h'), this._getLastPickedDateIndex());

            break;
          }

        case 'togglePicker':
          {
            var $this = $(e.target),
                $link = $this.closest('a'),
                $parent = $this.closest('ul'),
                expanded = $parent.find('.show'),
                closed = $parent.find('.collapse:not(.show)'),
                $span = $this.is('span') ? $this : $this.find('span');
            var collapseData, inactiveIcon, iconTest;

            if (expanded && expanded.length) {
              collapseData = expanded.data('collapse');

              if (collapseData && collapseData.transitioning) {
                return true;
              }

              if (expanded.collapse) {
                // if collapse plugin is available through bootstrap.js then use it
                expanded.collapse('hide');
                closed.collapse('show');
              } else {
                // otherwise just toggle in class on the two views
                expanded.removeClass('show');
                closed.addClass('show');
              }

              if (this._useFeatherIcons()) {
                $link.toggleClass(this._options.icons.time + ' ' + this._options.icons.date);
                inactiveIcon = $link.hasClass(this._options.icons.time) ? this._options.icons.date : this._options.icons.time;
                $link.html(this._iconTag(inactiveIcon));
              } else {
                $span.toggleClass(this._options.icons.time + ' ' + this._options.icons.date);
              }

              if (this._useFeatherIcons()) {
                iconTest = $link.hasClass(this._options.icons.date);
              } else {
                iconTest = $span.hasClass(this._options.icons.date);
              }

              if (iconTest) {
                $link.attr('title', this._options.tooltips.selectDate);
              } else {
                $link.attr('title', this._options.tooltips.selectTime);
              }
            }
          }
          break;

        case 'showPicker':
          this.widget.find('.timepicker > div:not(.timepicker-picker)').hide();
          this.widget.find('.timepicker .timepicker-picker').show();
          break;

        case 'showHours':
          this.widget.find('.timepicker .timepicker-picker').hide();
          this.widget.find('.timepicker .timepicker-hours').show();
          break;

        case 'showMinutes':
          this.widget.find('.timepicker .timepicker-picker').hide();
          this.widget.find('.timepicker .timepicker-minutes').show();
          break;

        case 'showSeconds':
          this.widget.find('.timepicker .timepicker-picker').hide();
          this.widget.find('.timepicker .timepicker-seconds').show();
          break;

        case 'selectHour':
          {
            var hour = parseInt($(e.target).text(), 10);

            if (!this.use24Hours) {
              if (lastPicked.hours() >= 12) {
                if (hour !== 12) {
                  hour += 12;
                }
              } else {
                if (hour === 12) {
                  hour = 0;
                }
              }
            }

            this._setValue(lastPicked.clone().hours(hour), this._getLastPickedDateIndex());

            if (!this._isEnabled('a') && !this._isEnabled('m') && !this._options.keepOpen && !this._options.inline) {
              this.hide();
            } else {
              this._doAction(e, 'showPicker');
            }

            break;
          }

        case 'selectMinute':
          this._setValue(lastPicked.clone().minutes(parseInt($(e.target).text(), 10)), this._getLastPickedDateIndex());

          if (!this._isEnabled('a') && !this._isEnabled('s') && !this._options.keepOpen && !this._options.inline) {
            this.hide();
          } else {
            this._doAction(e, 'showPicker');
          }

          break;

        case 'selectSecond':
          this._setValue(lastPicked.clone().seconds(parseInt($(e.target).text(), 10)), this._getLastPickedDateIndex());

          if (!this._isEnabled('a') && !this._options.keepOpen && !this._options.inline) {
            this.hide();
          } else {
            this._doAction(e, 'showPicker');
          }

          break;

        case 'clear':
          this.clear();
          break;

        case 'close':
          this.hide();
          break;

        case 'today':
          {
            var todaysDate = this.getMoment();

            if (this._isValid(todaysDate, 'd')) {
              this._setValue(todaysDate, this._getLastPickedDateIndex());
            }

            break;
          }
      }

      return false;
    } //public
    ;

    _proto2.hide = function hide() {
      var transitioning = false;

      if (!this.widget) {
        return;
      } // Ignore event if in the middle of a picker transition


      this.widget.find('.collapse').each(function () {
        var collapseData = $(this).data('collapse');

        if (collapseData && collapseData.transitioning) {
          transitioning = true;
          return false;
        }

        return true;
      });

      if (transitioning) {
        return;
      }

      if (this.component && this.component.hasClass('btn')) {
        this.component.toggleClass('active');
      }

      this.widget.hide();
      $(window).off('resize', this._place);
      this.widget.off('click', '[data-action]');
      this.widget.off('mousedown', false);
      this.widget.remove();
      this.widget = false;

      if (this.input !== undefined && this.input.val() !== undefined && this.input.val().trim().length !== 0) {
        this._setValue(this._parseInputDate(this.input.val().trim(), {
          isPickerShow: false
        }), 0);
      }

      var lastPickedDate = this._getLastPickedDate();

      this._notifyEvent({
        type: DateTimePicker.Event.HIDE,
        date: this.unset ? null : lastPickedDate ? lastPickedDate.clone() : void 0
      });

      if (this.input !== undefined) {
        this.input.blur();
      }

      this._viewDate = lastPickedDate ? lastPickedDate.clone() : this.getMoment();
    };

    _proto2.show = function show() {
      var currentMoment,
          shouldUseCurrentIfUnset = false;
      var useCurrentGranularity = {
        'year': function year(m) {
          return m.month(0).date(1).hours(0).seconds(0).minutes(0);
        },
        'month': function month(m) {
          return m.date(1).hours(0).seconds(0).minutes(0);
        },
        'day': function day(m) {
          return m.hours(0).seconds(0).minutes(0);
        },
        'hour': function hour(m) {
          return m.seconds(0).minutes(0);
        },
        'minute': function minute(m) {
          return m.seconds(0);
        }
      };

      if (this.input !== undefined) {
        if (this.input.prop('disabled') || !this._options.ignoreReadonly && this.input.prop('readonly') || this.widget) {
          return;
        }

        if (this.input.val() !== undefined && this.input.val().trim().length !== 0) {
          this._setValue(this._parseInputDate(this.input.val().trim(), {
            isPickerShow: true
          }), 0);
        } else {
          shouldUseCurrentIfUnset = true;
        }
      } else {
        shouldUseCurrentIfUnset = true;
      }

      if (shouldUseCurrentIfUnset && this.unset && this._options.useCurrent) {
        currentMoment = this.getMoment();

        if (typeof this._options.useCurrent === 'string') {
          currentMoment = useCurrentGranularity[this._options.useCurrent](currentMoment);
        }

        this._setValue(currentMoment, 0);
      }

      this.widget = this._getTemplate();

      this._fillDow();

      this._fillMonths();

      this.widget.find('.timepicker-hours').hide();
      this.widget.find('.timepicker-minutes').hide();
      this.widget.find('.timepicker-seconds').hide();

      this._update();

      this._showMode();

      $(window).on('resize', {
        picker: this
      }, this._place);
      this.widget.on('click', '[data-action]', $.proxy(this._doAction, this)); // this handles clicks on the widget

      this.widget.on('mousedown', false);

      if (this.component && this.component.hasClass('btn')) {
        this.component.toggleClass('active');
      }

      this._place();

      this.widget.show();

      if (this.input !== undefined && this._options.focusOnShow && !this.input.is(':focus')) {
        this.input.focus();
      }

      this._notifyEvent({
        type: DateTimePicker.Event.SHOW
      });
    };

    _proto2.destroy = function destroy() {
      this.hide(); //todo doc off?

      this._element.removeData(DateTimePicker.DATA_KEY);

      this._element.removeData('date');
    };

    _proto2.disable = function disable() {
      this.hide();

      if (this.component && this.component.hasClass('btn')) {
        this.component.addClass('disabled');
      }

      if (this.input !== undefined) {
        this.input.prop('disabled', true); //todo disable this/comp if input is null
      }
    };

    _proto2.enable = function enable() {
      if (this.component && this.component.hasClass('btn')) {
        this.component.removeClass('disabled');
      }

      if (this.input !== undefined) {
        this.input.prop('disabled', false); //todo enable comp/this if input is null
      }
    };

    _proto2.toolbarPlacement = function toolbarPlacement(_toolbarPlacement) {
      if (arguments.length === 0) {
        return this._options.toolbarPlacement;
      }

      if (typeof _toolbarPlacement !== 'string') {
        throw new TypeError('toolbarPlacement() expects a string parameter');
      }

      if (toolbarPlacements.indexOf(_toolbarPlacement) === -1) {
        throw new TypeError("toolbarPlacement() parameter must be one of (" + toolbarPlacements.join(', ') + ") value");
      }

      this._options.toolbarPlacement = _toolbarPlacement;

      if (this.widget) {
        this.hide();
        this.show();
      }
    };

    _proto2.widgetPositioning = function widgetPositioning(_widgetPositioning) {
      if (arguments.length === 0) {
        return $.extend({}, this._options.widgetPositioning);
      }

      if ({}.toString.call(_widgetPositioning) !== '[object Object]') {
        throw new TypeError('widgetPositioning() expects an object variable');
      }

      if (_widgetPositioning.horizontal) {
        if (typeof _widgetPositioning.horizontal !== 'string') {
          throw new TypeError('widgetPositioning() horizontal variable must be a string');
        }

        _widgetPositioning.horizontal = _widgetPositioning.horizontal.toLowerCase();

        if (horizontalModes.indexOf(_widgetPositioning.horizontal) === -1) {
          throw new TypeError("widgetPositioning() expects horizontal parameter to be one of (" + horizontalModes.join(', ') + ")");
        }

        this._options.widgetPositioning.horizontal = _widgetPositioning.horizontal;
      }

      if (_widgetPositioning.vertical) {
        if (typeof _widgetPositioning.vertical !== 'string') {
          throw new TypeError('widgetPositioning() vertical variable must be a string');
        }

        _widgetPositioning.vertical = _widgetPositioning.vertical.toLowerCase();

        if (verticalModes.indexOf(_widgetPositioning.vertical) === -1) {
          throw new TypeError("widgetPositioning() expects vertical parameter to be one of (" + verticalModes.join(', ') + ")");
        }

        this._options.widgetPositioning.vertical = _widgetPositioning.vertical;
      }

      this._update();
    };

    _proto2.widgetParent = function widgetParent(_widgetParent) {
      if (arguments.length === 0) {
        return this._options.widgetParent;
      }

      if (typeof _widgetParent === 'string') {
        _widgetParent = $(_widgetParent);
      }

      if (_widgetParent !== null && typeof _widgetParent !== 'string' && !(_widgetParent instanceof $)) {
        throw new TypeError('widgetParent() expects a string or a jQuery object parameter');
      }

      this._options.widgetParent = _widgetParent;

      if (this.widget) {
        this.hide();
        this.show();
      }
    };

    _proto2.setMultiDate = function setMultiDate(multiDateArray) {
      var dateFormat = this._options.format;
      this.clear();

      for (var index = 0; index < multiDateArray.length; index++) {
        var date = moment(multiDateArray[index], dateFormat);

        this._setValue(date, index);
      }
    } //static
    ;

    TempusDominusBootstrap4._jQueryHandleThis = function _jQueryHandleThis(me, option, argument) {
      var data = $(me).data(DateTimePicker.DATA_KEY);

      if (typeof option === 'object') {
        $.extend({}, DateTimePicker.Default, option);
      }

      if (!data) {
        data = new TempusDominusBootstrap4($(me), option);
        $(me).data(DateTimePicker.DATA_KEY, data);
      }

      if (typeof option === 'string') {
        if (data[option] === undefined) {
          throw new Error("No method named \"" + option + "\"");
        }

        if (argument === undefined) {
          return data[option]();
        } else {
          if (option === 'date') {
            data.isDateUpdateThroughDateOptionFromClientCode = true;
          }

          var ret = data[option](argument);
          data.isDateUpdateThroughDateOptionFromClientCode = false;
          return ret;
        }
      }
    };

    TempusDominusBootstrap4._jQueryInterface = function _jQueryInterface(option, argument) {
      if (this.length === 1) {
        return TempusDominusBootstrap4._jQueryHandleThis(this[0], option, argument);
      }

      return this.each(function () {
        TempusDominusBootstrap4._jQueryHandleThis(this, option, argument);
      });
    };

    return TempusDominusBootstrap4;
  }(DateTimePicker);
  /**
  * ------------------------------------------------------------------------
  * jQuery
  * ------------------------------------------------------------------------
  */


  $(document).on(DateTimePicker.Event.CLICK_DATA_API, DateTimePicker.Selector.DATA_TOGGLE, function () {
    var $originalTarget = $(this),
        $target = getSelectorFromElement($originalTarget),
        config = $target.data(DateTimePicker.DATA_KEY);

    if ($target.length === 0) {
      return;
    }

    if (config._options.allowInputToggle && $originalTarget.is('input[data-toggle="datetimepicker"]')) {
      return;
    }

    TempusDominusBootstrap4._jQueryInterface.call($target, 'toggle');
  }).on(DateTimePicker.Event.CHANGE, "." + DateTimePicker.ClassName.INPUT, function (event) {
    var $target = getSelectorFromElement($(this));

    if ($target.length === 0 || event.isInit) {
      return;
    }

    TempusDominusBootstrap4._jQueryInterface.call($target, '_change', event);
  }).on(DateTimePicker.Event.BLUR, "." + DateTimePicker.ClassName.INPUT, function (event) {
    var $target = getSelectorFromElement($(this)),
        config = $target.data(DateTimePicker.DATA_KEY);

    if ($target.length === 0) {
      return;
    }

    if (config._options.debug || window.debug) {
      return;
    }

    TempusDominusBootstrap4._jQueryInterface.call($target, 'hide', event);
  }).on(DateTimePicker.Event.KEYDOWN, "." + DateTimePicker.ClassName.INPUT, function (event) {
    var $target = getSelectorFromElement($(this));

    if ($target.length === 0) {
      return;
    }

    TempusDominusBootstrap4._jQueryInterface.call($target, '_keydown', event);
  }).on(DateTimePicker.Event.KEYUP, "." + DateTimePicker.ClassName.INPUT, function (event) {
    var $target = getSelectorFromElement($(this));

    if ($target.length === 0) {
      return;
    }

    TempusDominusBootstrap4._jQueryInterface.call($target, '_keyup', event);
  }).on(DateTimePicker.Event.FOCUS, "." + DateTimePicker.ClassName.INPUT, function (event) {
    var $target = getSelectorFromElement($(this)),
        config = $target.data(DateTimePicker.DATA_KEY);

    if ($target.length === 0) {
      return;
    }

    if (!config._options.allowInputToggle) {
      return;
    }

    TempusDominusBootstrap4._jQueryInterface.call($target, 'show', event);
  });
  $.fn[DateTimePicker.NAME] = TempusDominusBootstrap4._jQueryInterface;
  $.fn[DateTimePicker.NAME].Constructor = TempusDominusBootstrap4;

  $.fn[DateTimePicker.NAME].noConflict = function () {
    $.fn[DateTimePicker.NAME] = JQUERY_NO_CONFLICT;
    return TempusDominusBootstrap4._jQueryInterface;
  };

  return TempusDominusBootstrap4;
}(jQuery);

}();

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".styles_dateTimePicker__2NFfQ {\n  display: block;\n  position: relative; }\n  .styles_dateTimePicker__2NFfQ .styles_dateTimePickerInputGroup__2urdc {\n    position: relative; }\n";
var styles = {"dateTimePicker":"styles_dateTimePicker__2NFfQ","dateTimePickerInputGroup":"styles_dateTimePickerInputGroup__2urdc"};
styleInject(css_248z);

/*
 * Copyright (c) 2021 Anton Bagdatyev (Tonix)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * Destroys a picker.
 *
 * @param {string} id The ID of the picker to destroy.
 * @return {undefined}
 */

function destroy(id) {
  getPicker(id).datetimepicker("destroy");
}

var noInlineFactory = {
  div: function div(_ref) {
    var id = _ref.id,
        iconFactory = _ref.iconFactory,
        autocomplete = _ref.autocomplete,
        iconClassName = _ref.iconClassName,
        readOnly = _ref.readOnly,
        iconTypeFactory = _ref.iconTypeFactory,
        iconContainerId = _ref.iconContainerId;
    return /*#__PURE__*/React__default.createElement("div", _extends({
      className: classNames(styles.dateTimePickerInputGroup, iconFactory.divClassName, "date")
    }, iconFactory.divProps(id)), /*#__PURE__*/React__default.createElement("input", _extends({
      key: "".concat(id, "_3"),
      type: "text",
      className: "form-control datetimepicker-input",
      "data-toggle": "datetimepicker",
      "data-target": "#".concat(id),
      autoComplete: autocomplete,
      readOnly: readOnly ? true : void 0
    }, iconFactory.inputProps(id))), iconFactory.inputGroupAppend(id)({
      iconClassName: iconClassName,
      iconTypeFactory: iconTypeFactory,
      iconContainerId: iconContainerId
    }));
  }
};
var yesInlineFactory = {
  div: function div(_ref2) {
    var id = _ref2.id;
    return /*#__PURE__*/React__default.createElement("div", {
      id: id
    });
  }
};

/**
 * @type {Object}
 */

var eventsMap = {
  onHide: "hide.datetimepicker",
  onShow: "show.datetimepicker",
  onChange: "change.datetimepicker",
  onError: "error.datetimepicker",
  onUpdate: "update.datetimepicker"
};
function turnOnEventListeners(id, eventListenersTuples) {
  var $picker = getPicker(id);

  var _iterator = _createForOfIteratorHelper(eventListenersTuples),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          eventListenerName = _step$value[0],
          eventListener = _step$value[1];

      var event = eventsMap[eventListenerName];
      $picker.on(event, eventListener);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
function turnOffEventListeners(id) {
  var $picker = getPicker(id);
  Object.keys(eventsMap).map(function (eventListenerName) {
    return $picker.off(eventsMap[eventListenerName]);
  });
}

var _excluded = ["className", "autocomplete", "iconClassName", "icon", "noIcon", "pickerRef", "showOnInputFocus", "readOnly", "showPickerIfReadOnly", "onHide", "onShow", "onChange", "onError", "onUpdate", "callback"];

var DateTimePicker = function DateTimePicker() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? void 0 : _ref$className,
      _ref$autocomplete = _ref.autocomplete,
      autocomplete = _ref$autocomplete === void 0 ? "off" : _ref$autocomplete,
      _ref$iconClassName = _ref.iconClassName,
      iconClassName = _ref$iconClassName === void 0 ? "fa-calendar" : _ref$iconClassName,
      _ref$icon = _ref.icon,
      icon = _ref$icon === void 0 ? "calendar" : _ref$icon,
      _ref$noIcon = _ref.noIcon,
      noIcon = _ref$noIcon === void 0 ? false : _ref$noIcon,
      _ref$pickerRef = _ref.pickerRef,
      pickerRef = _ref$pickerRef === void 0 ? void 0 : _ref$pickerRef,
      _ref$showOnInputFocus = _ref.showOnInputFocus,
      showOnInputFocus = _ref$showOnInputFocus === void 0 ? true : _ref$showOnInputFocus,
      _ref$readOnly = _ref.readOnly,
      readOnly = _ref$readOnly === void 0 ? false : _ref$readOnly,
      _ref$showPickerIfRead = _ref.showPickerIfReadOnly,
      showPickerIfReadOnly = _ref$showPickerIfRead === void 0 ? false : _ref$showPickerIfRead,
      _ref$onHide = _ref.onHide,
      onHide = _ref$onHide === void 0 ? function () {} : _ref$onHide,
      _ref$onShow = _ref.onShow,
      onShow = _ref$onShow === void 0 ? function () {} : _ref$onShow,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
      _ref$onError = _ref.onError,
      onError = _ref$onError === void 0 ? function () {} : _ref$onError,
      _ref$onUpdate = _ref.onUpdate,
      onUpdate = _ref$onUpdate === void 0 ? function () {} : _ref$onUpdate,
      _ref$callback = _ref.callback,
      callback = _ref$callback === void 0 ? function () {} : _ref$callback,
      options = _objectWithoutProperties(_ref, _excluded);

  var _options = options,
      inline = _options.inline,
      locale = _options.locale;
  var isFirstRenderEver = !useIsUpdate();
  var id = useUniqueKey(noIcon);
  var prevId = usePrevious(id);
  var iconContainerId = useUniqueKey();
  var prevLocale = usePrevious(locale);
  var isNewInit = typeof prevId === "undefined" || id !== prevId;
  var localeDidChange = locale !== prevLocale;
  var widgetParentId = useUniqueKey();
  var momentLocaleRef = React.useRef();
  var isControlledComponent = Object.prototype.hasOwnProperty.call(options, "date");
  var isControlledComponentRef = React.useRef();
  isControlledComponentRef.current = isControlledComponent;
  var optionsInvariantsMemo = useShallowEqualMemo({
    allowInputToggle: showOnInputFocus,
    updateOnlyThroughDateOption: isControlledComponent,
    readonly: readOnly,
    ignoreReadonly: showPickerIfReadOnly
  });
  options = useExtend(function () {
    return {
      widgetParent: "#".concat(widgetParentId),
      useCurrent: typeof options.useCurrent !== "undefined" ? options.useCurrent : typeof options.viewDate === "undefined" || options.viewDate === false
    };
  }, [options, optionsInvariantsMemo]);
  var onHideRef = useCallbackRef(onHide);
  var onShowRef = useCallbackRef(onShow);
  var onChangeRef = useCallbackRef(function (e) {
    if (isControlledComponentRef.current && (e.isDateUpdateThroughDateOptionFromClientCode || e.isInit)) {
      return;
    }

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    onChange.apply(void 0, [e].concat(args));
  });
  var onErrorRef = useCallbackRef(onError);
  var onUpdateRef = useCallbackRef(onUpdate);
  var callbackRef = useCallbackRef(callback);
  var allOptions = options;
  options = useCumulativeShallowDiff(options);

  if (isNewInit) {
    options = allOptions;
  }

  var initUpdateFactory = useFactory(function () {
    return [[isNewInit, initFactory], updateFactory];
  }, [isNewInit]);
  var iconFactory = useFactory(function () {
    return [[noIcon, noIconFactory], yesIconFactory];
  }, [noIcon]);
  var iconType = options.icons ? options.icons.type : void 0;
  var iconTypeFactory = useFactory(function () {
    return [[noIcon, noIconTypeFactory], [function () {
      return iconType === "feather";
    }, featherIconTypeFactory], fontAwesomeIconTypeFactory];
  }, [iconType, noIcon]);
  var inlineFactory = useFactory(function () {
    return [[inline, yesInlineFactory], noInlineFactory];
  }, [inline]);
  React.useEffect(function () {
    pickerRef && (pickerRef.current = getPicker(id));
  }, [id, pickerRef]);
  useLocale(locale, {
    callback: function callback(momentLocale) {
      momentLocaleRef.current = momentLocale;

      if (!isNewInit) {
        initUpdateFactory.setLocale(momentLocaleRef.current);
      } else {
        initUpdateFactory.setOptions(id)(_objectSpread2(_objectSpread2({}, options), {}, {
          locale: momentLocaleRef.current
        }));
      }

      callbackRef.current();
    }
  });
  React.useEffect(function () {
    if (!isNewInit || !isFirstRenderEver && !localeDidChange) {
      // Only if the locale didn't change, then init the picker
      // (otherwise it will be initialized once the locale gets loaded, cause the locale changed)
      initUpdateFactory.setOptions(id)(options);
    }

    if (!isFirstRenderEver && !localeDidChange) {
      callbackRef.current();
    }
  }, [isNewInit, isFirstRenderEver, localeDidChange, initUpdateFactory, id, options, callbackRef]);
  React.useEffect(function () {
    iconTypeFactory.handle({
      iconContainerId: iconContainerId,
      icon: icon
    });
  }, [iconTypeFactory, iconContainerId, icon]);
  React.useEffect(function () {
    turnOnEventListeners(id, [["onHide", onHideRef.current], ["onShow", onShowRef.current], ["onChange", onChangeRef.current], ["onError", onErrorRef.current], ["onUpdate", onUpdateRef.current]]);
  }, [id, onHideRef, onShowRef, onChangeRef, onErrorRef, onUpdateRef]);
  React.useMemo(function () {
    if (isNewInit && typeof prevId !== "undefined") {
      turnOffEventListeners(prevId);
      destroy(prevId);
    }
  }, [isNewInit, prevId]);
  useUnmountEffect(function () {
    turnOffEventListeners(id);
    destroy(id);
  });
  return /*#__PURE__*/React__default.createElement("div", {
    className: classNames(styles.dateTimePicker, className)
  }, inlineFactory.div({
    id: id,
    iconFactory: iconFactory,
    autocomplete: autocomplete,
    iconClassName: iconClassName,
    readOnly: readOnly,
    iconTypeFactory: iconTypeFactory,
    iconContainerId: iconContainerId
  }), /*#__PURE__*/React__default.createElement("div", {
    id: widgetParentId
  }));
};

DateTimePicker.displayName = "DateTimePicker";

var DatePicker = function DatePicker() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      props = _extends({}, _ref);

  return /*#__PURE__*/React__default.createElement(DateTimePicker, _extends({
    format: "L"
  }, props));
};

DatePicker.displayName = "DatePicker";

var TimePicker = function TimePicker() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      props = _extends({}, _ref);

  return /*#__PURE__*/React__default.createElement(DateTimePicker, _extends({
    format: "LT",
    iconClassName: "fa-clock-o"
  }, props));
};

TimePicker.displayName = "TimePicker";

var MonthPicker = function MonthPicker() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      props = _extends({}, _ref);

  return /*#__PURE__*/React__default.createElement(DateTimePicker, _extends({
    viewMode: "months",
    format: "MM/YYYY"
  }, props));
};

MonthPicker.displayName = "MonthPicker";

var InlineDateTimePicker = function InlineDateTimePicker() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      props = _extends({}, _ref);

  return /*#__PURE__*/React__default.createElement(DateTimePicker, _extends({
    inline: true
  }, props));
};

InlineDateTimePicker.displayName = "InlineDateTimePicker";

var InlineDatePicker = function InlineDatePicker() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      props = _extends({}, _ref);

  return /*#__PURE__*/React__default.createElement(DatePicker, _extends({
    inline: true
  }, props));
};

InlineDatePicker.displayName = "InlineDatePicker";

var InlineTimePicker = function InlineTimePicker() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      props = _extends({}, _ref);

  return /*#__PURE__*/React__default.createElement(TimePicker, _extends({
    inline: true
  }, props));
};

InlineTimePicker.displayName = "InlineTimePicker";

var InlineMonthPicker = function InlineMonthPicker() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      props = _extends({}, _ref);

  return /*#__PURE__*/React__default.createElement(MonthPicker, _extends({
    inline: true
  }, props));
};

InlineMonthPicker.displayName = "InlineMonthPicker";

exports.DatePicker = DatePicker;
exports.DateTimePicker = DateTimePicker;
exports.InlineDatePicker = InlineDatePicker;
exports.InlineDateTimePicker = InlineDateTimePicker;
exports.InlineMonthPicker = InlineMonthPicker;
exports.InlineTimePicker = InlineTimePicker;
exports.MonthPicker = MonthPicker;
exports.TimePicker = TimePicker;
//# sourceMappingURL=index.js.map
