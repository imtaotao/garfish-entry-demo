var Garfish = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value2) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value: value2 }) : obj[key] = value2;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // ../../node_modules/.pnpm/eventemitter2@6.4.5/node_modules/eventemitter2/lib/eventemitter2.js
  var require_eventemitter2 = __commonJS({
    "../../node_modules/.pnpm/eventemitter2@6.4.5/node_modules/eventemitter2/lib/eventemitter2.js"(exports, module) {
      !function(undefined2) {
        var hasOwnProperty3 = Object.hasOwnProperty;
        var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
          return Object.prototype.toString.call(obj) === "[object Array]";
        };
        var defaultMaxListeners = 10;
        var nextTickSupported = typeof process == "object" && typeof process.nextTick == "function";
        var symbolsSupported = typeof Symbol === "function";
        var reflectSupported = typeof Reflect === "object";
        var setImmediateSupported = typeof setImmediate === "function";
        var _setImmediate = setImmediateSupported ? setImmediate : setTimeout;
        var ownKeys = symbolsSupported ? reflectSupported && typeof Reflect.ownKeys === "function" ? Reflect.ownKeys : function(obj) {
          var arr = Object.getOwnPropertyNames(obj);
          arr.push.apply(arr, Object.getOwnPropertySymbols(obj));
          return arr;
        } : Object.keys;
        function init() {
          this._events = {};
          if (this._conf) {
            configure.call(this, this._conf);
          }
        }
        function configure(conf) {
          if (conf) {
            this._conf = conf;
            conf.delimiter && (this.delimiter = conf.delimiter);
            if (conf.maxListeners !== undefined2) {
              this._maxListeners = conf.maxListeners;
            }
            conf.wildcard && (this.wildcard = conf.wildcard);
            conf.newListener && (this._newListener = conf.newListener);
            conf.removeListener && (this._removeListener = conf.removeListener);
            conf.verboseMemoryLeak && (this.verboseMemoryLeak = conf.verboseMemoryLeak);
            conf.ignoreErrors && (this.ignoreErrors = conf.ignoreErrors);
            if (this.wildcard) {
              this.listenerTree = {};
            }
          }
        }
        function logPossibleMemoryLeak(count, eventName) {
          var errorMsg = "(node) warning: possible EventEmitter memory leak detected. " + count + " listeners added. Use emitter.setMaxListeners() to increase limit.";
          if (this.verboseMemoryLeak) {
            errorMsg += " Event name: " + eventName + ".";
          }
          if (typeof process !== "undefined" && process.emitWarning) {
            var e = new Error(errorMsg);
            e.name = "MaxListenersExceededWarning";
            e.emitter = this;
            e.count = count;
            process.emitWarning(e);
          } else {
            console.error(errorMsg);
            if (console.trace) {
              console.trace();
            }
          }
        }
        var toArray = function(a, b, c) {
          var n = arguments.length;
          switch (n) {
            case 0:
              return [];
            case 1:
              return [a];
            case 2:
              return [a, b];
            case 3:
              return [a, b, c];
            default:
              var arr = new Array(n);
              while (n--) {
                arr[n] = arguments[n];
              }
              return arr;
          }
        };
        function toObject(keys, values) {
          var obj = {};
          var key;
          var len = keys.length;
          var valuesCount = values ? value.length : 0;
          for (var i = 0; i < len; i++) {
            key = keys[i];
            obj[key] = i < valuesCount ? values[i] : undefined2;
          }
          return obj;
        }
        function TargetObserver(emitter, target, options) {
          this._emitter = emitter;
          this._target = target;
          this._listeners = {};
          this._listenersCount = 0;
          var on, off;
          if (options.on || options.off) {
            on = options.on;
            off = options.off;
          }
          if (target.addEventListener) {
            on = target.addEventListener;
            off = target.removeEventListener;
          } else if (target.addListener) {
            on = target.addListener;
            off = target.removeListener;
          } else if (target.on) {
            on = target.on;
            off = target.off;
          }
          if (!on && !off) {
            throw Error("target does not implement any known event API");
          }
          if (typeof on !== "function") {
            throw TypeError("on method must be a function");
          }
          if (typeof off !== "function") {
            throw TypeError("off method must be a function");
          }
          this._on = on;
          this._off = off;
          var _observers = emitter._observers;
          if (_observers) {
            _observers.push(this);
          } else {
            emitter._observers = [this];
          }
        }
        Object.assign(TargetObserver.prototype, {
          subscribe: function(event, localEvent, reducer) {
            var observer = this;
            var target = this._target;
            var emitter = this._emitter;
            var listeners = this._listeners;
            var handler = function() {
              var args = toArray.apply(null, arguments);
              var eventObj = {
                data: args,
                name: localEvent,
                original: event
              };
              if (reducer) {
                var result = reducer.call(target, eventObj);
                if (result !== false) {
                  emitter.emit.apply(emitter, [eventObj.name].concat(args));
                }
                return;
              }
              emitter.emit.apply(emitter, [localEvent].concat(args));
            };
            if (listeners[event]) {
              throw Error("Event '" + event + "' is already listening");
            }
            this._listenersCount++;
            if (emitter._newListener && emitter._removeListener && !observer._onNewListener) {
              this._onNewListener = function(_event) {
                if (_event === localEvent && listeners[event] === null) {
                  listeners[event] = handler;
                  observer._on.call(target, event, handler);
                }
              };
              emitter.on("newListener", this._onNewListener);
              this._onRemoveListener = function(_event) {
                if (_event === localEvent && !emitter.hasListeners(_event) && listeners[event]) {
                  listeners[event] = null;
                  observer._off.call(target, event, handler);
                }
              };
              listeners[event] = null;
              emitter.on("removeListener", this._onRemoveListener);
            } else {
              listeners[event] = handler;
              observer._on.call(target, event, handler);
            }
          },
          unsubscribe: function(event) {
            var observer = this;
            var listeners = this._listeners;
            var emitter = this._emitter;
            var handler;
            var events;
            var off = this._off;
            var target = this._target;
            var i;
            if (event && typeof event !== "string") {
              throw TypeError("event must be a string");
            }
            function clearRefs() {
              if (observer._onNewListener) {
                emitter.off("newListener", observer._onNewListener);
                emitter.off("removeListener", observer._onRemoveListener);
                observer._onNewListener = null;
                observer._onRemoveListener = null;
              }
              var index = findTargetIndex.call(emitter, observer);
              emitter._observers.splice(index, 1);
            }
            if (event) {
              handler = listeners[event];
              if (!handler)
                return;
              off.call(target, event, handler);
              delete listeners[event];
              if (!--this._listenersCount) {
                clearRefs();
              }
            } else {
              events = ownKeys(listeners);
              i = events.length;
              while (i-- > 0) {
                event = events[i];
                off.call(target, event, listeners[event]);
              }
              this._listeners = {};
              this._listenersCount = 0;
              clearRefs();
            }
          }
        });
        function resolveOptions(options, schema, reducers, allowUnknown) {
          var computedOptions = Object.assign({}, schema);
          if (!options)
            return computedOptions;
          if (typeof options !== "object") {
            throw TypeError("options must be an object");
          }
          var keys = Object.keys(options);
          var length = keys.length;
          var option, value2;
          var reducer;
          function reject(reason) {
            throw Error('Invalid "' + option + '" option value' + (reason ? ". Reason: " + reason : ""));
          }
          for (var i = 0; i < length; i++) {
            option = keys[i];
            if (!allowUnknown && !hasOwnProperty3.call(schema, option)) {
              throw Error('Unknown "' + option + '" option');
            }
            value2 = options[option];
            if (value2 !== undefined2) {
              reducer = reducers[option];
              computedOptions[option] = reducer ? reducer(value2, reject) : value2;
            }
          }
          return computedOptions;
        }
        function constructorReducer(value2, reject) {
          if (typeof value2 !== "function" || !value2.hasOwnProperty("prototype")) {
            reject("value must be a constructor");
          }
          return value2;
        }
        function makeTypeReducer(types) {
          var message = "value must be type of " + types.join("|");
          var len = types.length;
          var firstType = types[0];
          var secondType = types[1];
          if (len === 1) {
            return function(v, reject) {
              if (typeof v === firstType) {
                return v;
              }
              reject(message);
            };
          }
          if (len === 2) {
            return function(v, reject) {
              var kind = typeof v;
              if (kind === firstType || kind === secondType)
                return v;
              reject(message);
            };
          }
          return function(v, reject) {
            var kind = typeof v;
            var i = len;
            while (i-- > 0) {
              if (kind === types[i])
                return v;
            }
            reject(message);
          };
        }
        var functionReducer = makeTypeReducer(["function"]);
        var objectFunctionReducer = makeTypeReducer(["object", "function"]);
        function makeCancelablePromise(Promise2, executor, options) {
          var isCancelable;
          var callbacks;
          var timer = 0;
          var subscriptionClosed;
          var promise = new Promise2(function(resolve, reject, onCancel) {
            options = resolveOptions(options, {
              timeout: 0,
              overload: false
            }, {
              timeout: function(value2, reject2) {
                value2 *= 1;
                if (typeof value2 !== "number" || value2 < 0 || !Number.isFinite(value2)) {
                  reject2("timeout must be a positive number");
                }
                return value2;
              }
            });
            isCancelable = !options.overload && typeof Promise2.prototype.cancel === "function" && typeof onCancel === "function";
            function cleanup() {
              if (callbacks) {
                callbacks = null;
              }
              if (timer) {
                clearTimeout(timer);
                timer = 0;
              }
            }
            var _resolve = function(value2) {
              cleanup();
              resolve(value2);
            };
            var _reject = function(err) {
              cleanup();
              reject(err);
            };
            if (isCancelable) {
              executor(_resolve, _reject, onCancel);
            } else {
              callbacks = [function(reason) {
                _reject(reason || Error("canceled"));
              }];
              executor(_resolve, _reject, function(cb) {
                if (subscriptionClosed) {
                  throw Error("Unable to subscribe on cancel event asynchronously");
                }
                if (typeof cb !== "function") {
                  throw TypeError("onCancel callback must be a function");
                }
                callbacks.push(cb);
              });
              subscriptionClosed = true;
            }
            if (options.timeout > 0) {
              timer = setTimeout(function() {
                var reason = Error("timeout");
                reason.code = "ETIMEDOUT";
                timer = 0;
                promise.cancel(reason);
                reject(reason);
              }, options.timeout);
            }
          });
          if (!isCancelable) {
            promise.cancel = function(reason) {
              if (!callbacks) {
                return;
              }
              var length = callbacks.length;
              for (var i = 1; i < length; i++) {
                callbacks[i](reason);
              }
              callbacks[0](reason);
              callbacks = null;
            };
          }
          return promise;
        }
        function findTargetIndex(observer) {
          var observers = this._observers;
          if (!observers) {
            return -1;
          }
          var len = observers.length;
          for (var i = 0; i < len; i++) {
            if (observers[i]._target === observer)
              return i;
          }
          return -1;
        }
        function searchListenerTree(handlers, type, tree, i, typeLength) {
          if (!tree) {
            return null;
          }
          if (i === 0) {
            var kind = typeof type;
            if (kind === "string") {
              var ns2, n, l = 0, j = 0, delimiter = this.delimiter, dl = delimiter.length;
              if ((n = type.indexOf(delimiter)) !== -1) {
                ns2 = new Array(5);
                do {
                  ns2[l++] = type.slice(j, n);
                  j = n + dl;
                } while ((n = type.indexOf(delimiter, j)) !== -1);
                ns2[l++] = type.slice(j);
                type = ns2;
                typeLength = l;
              } else {
                type = [type];
                typeLength = 1;
              }
            } else if (kind === "object") {
              typeLength = type.length;
            } else {
              type = [type];
              typeLength = 1;
            }
          }
          var listeners = null, branch, xTree, xxTree, isolatedBranch, endReached, currentType = type[i], nextType = type[i + 1], branches, _listeners;
          if (i === typeLength) {
            if (tree._listeners) {
              if (typeof tree._listeners === "function") {
                handlers && handlers.push(tree._listeners);
                listeners = [tree];
              } else {
                handlers && handlers.push.apply(handlers, tree._listeners);
                listeners = [tree];
              }
            }
          } else {
            if (currentType === "*") {
              branches = ownKeys(tree);
              n = branches.length;
              while (n-- > 0) {
                branch = branches[n];
                if (branch !== "_listeners") {
                  _listeners = searchListenerTree(handlers, type, tree[branch], i + 1, typeLength);
                  if (_listeners) {
                    if (listeners) {
                      listeners.push.apply(listeners, _listeners);
                    } else {
                      listeners = _listeners;
                    }
                  }
                }
              }
              return listeners;
            } else if (currentType === "**") {
              endReached = i + 1 === typeLength || i + 2 === typeLength && nextType === "*";
              if (endReached && tree._listeners) {
                listeners = searchListenerTree(handlers, type, tree, typeLength, typeLength);
              }
              branches = ownKeys(tree);
              n = branches.length;
              while (n-- > 0) {
                branch = branches[n];
                if (branch !== "_listeners") {
                  if (branch === "*" || branch === "**") {
                    if (tree[branch]._listeners && !endReached) {
                      _listeners = searchListenerTree(handlers, type, tree[branch], typeLength, typeLength);
                      if (_listeners) {
                        if (listeners) {
                          listeners.push.apply(listeners, _listeners);
                        } else {
                          listeners = _listeners;
                        }
                      }
                    }
                    _listeners = searchListenerTree(handlers, type, tree[branch], i, typeLength);
                  } else if (branch === nextType) {
                    _listeners = searchListenerTree(handlers, type, tree[branch], i + 2, typeLength);
                  } else {
                    _listeners = searchListenerTree(handlers, type, tree[branch], i, typeLength);
                  }
                  if (_listeners) {
                    if (listeners) {
                      listeners.push.apply(listeners, _listeners);
                    } else {
                      listeners = _listeners;
                    }
                  }
                }
              }
              return listeners;
            } else if (tree[currentType]) {
              listeners = searchListenerTree(handlers, type, tree[currentType], i + 1, typeLength);
            }
          }
          xTree = tree["*"];
          if (xTree) {
            searchListenerTree(handlers, type, xTree, i + 1, typeLength);
          }
          xxTree = tree["**"];
          if (xxTree) {
            if (i < typeLength) {
              if (xxTree._listeners) {
                searchListenerTree(handlers, type, xxTree, typeLength, typeLength);
              }
              branches = ownKeys(xxTree);
              n = branches.length;
              while (n-- > 0) {
                branch = branches[n];
                if (branch !== "_listeners") {
                  if (branch === nextType) {
                    searchListenerTree(handlers, type, xxTree[branch], i + 2, typeLength);
                  } else if (branch === currentType) {
                    searchListenerTree(handlers, type, xxTree[branch], i + 1, typeLength);
                  } else {
                    isolatedBranch = {};
                    isolatedBranch[branch] = xxTree[branch];
                    searchListenerTree(handlers, type, { "**": isolatedBranch }, i + 1, typeLength);
                  }
                }
              }
            } else if (xxTree._listeners) {
              searchListenerTree(handlers, type, xxTree, typeLength, typeLength);
            } else if (xxTree["*"] && xxTree["*"]._listeners) {
              searchListenerTree(handlers, type, xxTree["*"], typeLength, typeLength);
            }
          }
          return listeners;
        }
        function growListenerTree(type, listener, prepend) {
          var len = 0, j = 0, i, delimiter = this.delimiter, dl = delimiter.length, ns2;
          if (typeof type === "string") {
            if ((i = type.indexOf(delimiter)) !== -1) {
              ns2 = new Array(5);
              do {
                ns2[len++] = type.slice(j, i);
                j = i + dl;
              } while ((i = type.indexOf(delimiter, j)) !== -1);
              ns2[len++] = type.slice(j);
            } else {
              ns2 = [type];
              len = 1;
            }
          } else {
            ns2 = type;
            len = type.length;
          }
          if (len > 1) {
            for (i = 0; i + 1 < len; i++) {
              if (ns2[i] === "**" && ns2[i + 1] === "**") {
                return;
              }
            }
          }
          var tree = this.listenerTree, name;
          for (i = 0; i < len; i++) {
            name = ns2[i];
            tree = tree[name] || (tree[name] = {});
            if (i === len - 1) {
              if (!tree._listeners) {
                tree._listeners = listener;
              } else {
                if (typeof tree._listeners === "function") {
                  tree._listeners = [tree._listeners];
                }
                if (prepend) {
                  tree._listeners.unshift(listener);
                } else {
                  tree._listeners.push(listener);
                }
                if (!tree._listeners.warned && this._maxListeners > 0 && tree._listeners.length > this._maxListeners) {
                  tree._listeners.warned = true;
                  logPossibleMemoryLeak.call(this, tree._listeners.length, name);
                }
              }
              return true;
            }
          }
          return true;
        }
        function collectTreeEvents(tree, events, root, asArray) {
          var branches = ownKeys(tree);
          var i = branches.length;
          var branch, branchName, path;
          var hasListeners = tree["_listeners"];
          var isArrayPath;
          while (i-- > 0) {
            branchName = branches[i];
            branch = tree[branchName];
            if (branchName === "_listeners") {
              path = root;
            } else {
              path = root ? root.concat(branchName) : [branchName];
            }
            isArrayPath = asArray || typeof branchName === "symbol";
            hasListeners && events.push(isArrayPath ? path : path.join(this.delimiter));
            if (typeof branch === "object") {
              collectTreeEvents.call(this, branch, events, path, isArrayPath);
            }
          }
          return events;
        }
        function recursivelyGarbageCollect(root) {
          var keys = ownKeys(root);
          var i = keys.length;
          var obj, key, flag;
          while (i-- > 0) {
            key = keys[i];
            obj = root[key];
            if (obj) {
              flag = true;
              if (key !== "_listeners" && !recursivelyGarbageCollect(obj)) {
                delete root[key];
              }
            }
          }
          return flag;
        }
        function Listener(emitter, event, listener) {
          this.emitter = emitter;
          this.event = event;
          this.listener = listener;
        }
        Listener.prototype.off = function() {
          this.emitter.off(this.event, this.listener);
          return this;
        };
        function setupListener(event, listener, options) {
          if (options === true) {
            promisify = true;
          } else if (options === false) {
            async = true;
          } else {
            if (!options || typeof options !== "object") {
              throw TypeError("options should be an object or true");
            }
            var async = options.async;
            var promisify = options.promisify;
            var nextTick2 = options.nextTick;
            var objectify = options.objectify;
          }
          if (async || nextTick2 || promisify) {
            var _listener = listener;
            var _origin = listener._origin || listener;
            if (nextTick2 && !nextTickSupported) {
              throw Error("process.nextTick is not supported");
            }
            if (promisify === undefined2) {
              promisify = listener.constructor.name === "AsyncFunction";
            }
            listener = function() {
              var args = arguments;
              var context = this;
              var event2 = this.event;
              return promisify ? nextTick2 ? Promise.resolve() : new Promise(function(resolve) {
                _setImmediate(resolve);
              }).then(function() {
                context.event = event2;
                return _listener.apply(context, args);
              }) : (nextTick2 ? process.nextTick : _setImmediate)(function() {
                context.event = event2;
                _listener.apply(context, args);
              });
            };
            listener._async = true;
            listener._origin = _origin;
          }
          return [listener, objectify ? new Listener(this, event, listener) : this];
        }
        function EventEmitter(conf) {
          this._events = {};
          this._newListener = false;
          this._removeListener = false;
          this.verboseMemoryLeak = false;
          configure.call(this, conf);
        }
        EventEmitter.EventEmitter2 = EventEmitter;
        EventEmitter.prototype.listenTo = function(target, events, options) {
          if (typeof target !== "object") {
            throw TypeError("target musts be an object");
          }
          var emitter = this;
          options = resolveOptions(options, {
            on: undefined2,
            off: undefined2,
            reducers: undefined2
          }, {
            on: functionReducer,
            off: functionReducer,
            reducers: objectFunctionReducer
          });
          function listen2(events2) {
            if (typeof events2 !== "object") {
              throw TypeError("events must be an object");
            }
            var reducers = options.reducers;
            var index = findTargetIndex.call(emitter, target);
            var observer;
            if (index === -1) {
              observer = new TargetObserver(emitter, target, options);
            } else {
              observer = emitter._observers[index];
            }
            var keys = ownKeys(events2);
            var len = keys.length;
            var event;
            var isSingleReducer = typeof reducers === "function";
            for (var i = 0; i < len; i++) {
              event = keys[i];
              observer.subscribe(event, events2[event] || event, isSingleReducer ? reducers : reducers && reducers[event]);
            }
          }
          isArray(events) ? listen2(toObject(events)) : typeof events === "string" ? listen2(toObject(events.split(/\s+/))) : listen2(events);
          return this;
        };
        EventEmitter.prototype.stopListeningTo = function(target, event) {
          var observers = this._observers;
          if (!observers) {
            return false;
          }
          var i = observers.length;
          var observer;
          var matched = false;
          if (target && typeof target !== "object") {
            throw TypeError("target should be an object");
          }
          while (i-- > 0) {
            observer = observers[i];
            if (!target || observer._target === target) {
              observer.unsubscribe(event);
              matched = true;
            }
          }
          return matched;
        };
        EventEmitter.prototype.delimiter = ".";
        EventEmitter.prototype.setMaxListeners = function(n) {
          if (n !== undefined2) {
            this._maxListeners = n;
            if (!this._conf)
              this._conf = {};
            this._conf.maxListeners = n;
          }
        };
        EventEmitter.prototype.getMaxListeners = function() {
          return this._maxListeners;
        };
        EventEmitter.prototype.event = "";
        EventEmitter.prototype.once = function(event, fn, options) {
          return this._once(event, fn, false, options);
        };
        EventEmitter.prototype.prependOnceListener = function(event, fn, options) {
          return this._once(event, fn, true, options);
        };
        EventEmitter.prototype._once = function(event, fn, prepend, options) {
          return this._many(event, 1, fn, prepend, options);
        };
        EventEmitter.prototype.many = function(event, ttl, fn, options) {
          return this._many(event, ttl, fn, false, options);
        };
        EventEmitter.prototype.prependMany = function(event, ttl, fn, options) {
          return this._many(event, ttl, fn, true, options);
        };
        EventEmitter.prototype._many = function(event, ttl, fn, prepend, options) {
          var self = this;
          if (typeof fn !== "function") {
            throw new Error("many only accepts instances of Function");
          }
          function listener() {
            if (--ttl === 0) {
              self.off(event, listener);
            }
            return fn.apply(this, arguments);
          }
          listener._origin = fn;
          return this._on(event, listener, prepend, options);
        };
        EventEmitter.prototype.emit = function() {
          if (!this._events && !this._all) {
            return false;
          }
          this._events || init.call(this);
          var type = arguments[0], ns2, wildcard = this.wildcard;
          var args, l, i, j, containsSymbol;
          if (type === "newListener" && !this._newListener) {
            if (!this._events.newListener) {
              return false;
            }
          }
          if (wildcard) {
            ns2 = type;
            if (type !== "newListener" && type !== "removeListener") {
              if (typeof type === "object") {
                l = type.length;
                if (symbolsSupported) {
                  for (i = 0; i < l; i++) {
                    if (typeof type[i] === "symbol") {
                      containsSymbol = true;
                      break;
                    }
                  }
                }
                if (!containsSymbol) {
                  type = type.join(this.delimiter);
                }
              }
            }
          }
          var al = arguments.length;
          var handler;
          if (this._all && this._all.length) {
            handler = this._all.slice();
            for (i = 0, l = handler.length; i < l; i++) {
              this.event = type;
              switch (al) {
                case 1:
                  handler[i].call(this, type);
                  break;
                case 2:
                  handler[i].call(this, type, arguments[1]);
                  break;
                case 3:
                  handler[i].call(this, type, arguments[1], arguments[2]);
                  break;
                default:
                  handler[i].apply(this, arguments);
              }
            }
          }
          if (wildcard) {
            handler = [];
            searchListenerTree.call(this, handler, ns2, this.listenerTree, 0, l);
          } else {
            handler = this._events[type];
            if (typeof handler === "function") {
              this.event = type;
              switch (al) {
                case 1:
                  handler.call(this);
                  break;
                case 2:
                  handler.call(this, arguments[1]);
                  break;
                case 3:
                  handler.call(this, arguments[1], arguments[2]);
                  break;
                default:
                  args = new Array(al - 1);
                  for (j = 1; j < al; j++)
                    args[j - 1] = arguments[j];
                  handler.apply(this, args);
              }
              return true;
            } else if (handler) {
              handler = handler.slice();
            }
          }
          if (handler && handler.length) {
            if (al > 3) {
              args = new Array(al - 1);
              for (j = 1; j < al; j++)
                args[j - 1] = arguments[j];
            }
            for (i = 0, l = handler.length; i < l; i++) {
              this.event = type;
              switch (al) {
                case 1:
                  handler[i].call(this);
                  break;
                case 2:
                  handler[i].call(this, arguments[1]);
                  break;
                case 3:
                  handler[i].call(this, arguments[1], arguments[2]);
                  break;
                default:
                  handler[i].apply(this, args);
              }
            }
            return true;
          } else if (!this.ignoreErrors && !this._all && type === "error") {
            if (arguments[1] instanceof Error) {
              throw arguments[1];
            } else {
              throw new Error("Uncaught, unspecified 'error' event.");
            }
          }
          return !!this._all;
        };
        EventEmitter.prototype.emitAsync = function() {
          if (!this._events && !this._all) {
            return false;
          }
          this._events || init.call(this);
          var type = arguments[0], wildcard = this.wildcard, ns2, containsSymbol;
          var args, l, i, j;
          if (type === "newListener" && !this._newListener) {
            if (!this._events.newListener) {
              return Promise.resolve([false]);
            }
          }
          if (wildcard) {
            ns2 = type;
            if (type !== "newListener" && type !== "removeListener") {
              if (typeof type === "object") {
                l = type.length;
                if (symbolsSupported) {
                  for (i = 0; i < l; i++) {
                    if (typeof type[i] === "symbol") {
                      containsSymbol = true;
                      break;
                    }
                  }
                }
                if (!containsSymbol) {
                  type = type.join(this.delimiter);
                }
              }
            }
          }
          var promises = [];
          var al = arguments.length;
          var handler;
          if (this._all) {
            for (i = 0, l = this._all.length; i < l; i++) {
              this.event = type;
              switch (al) {
                case 1:
                  promises.push(this._all[i].call(this, type));
                  break;
                case 2:
                  promises.push(this._all[i].call(this, type, arguments[1]));
                  break;
                case 3:
                  promises.push(this._all[i].call(this, type, arguments[1], arguments[2]));
                  break;
                default:
                  promises.push(this._all[i].apply(this, arguments));
              }
            }
          }
          if (wildcard) {
            handler = [];
            searchListenerTree.call(this, handler, ns2, this.listenerTree, 0);
          } else {
            handler = this._events[type];
          }
          if (typeof handler === "function") {
            this.event = type;
            switch (al) {
              case 1:
                promises.push(handler.call(this));
                break;
              case 2:
                promises.push(handler.call(this, arguments[1]));
                break;
              case 3:
                promises.push(handler.call(this, arguments[1], arguments[2]));
                break;
              default:
                args = new Array(al - 1);
                for (j = 1; j < al; j++)
                  args[j - 1] = arguments[j];
                promises.push(handler.apply(this, args));
            }
          } else if (handler && handler.length) {
            handler = handler.slice();
            if (al > 3) {
              args = new Array(al - 1);
              for (j = 1; j < al; j++)
                args[j - 1] = arguments[j];
            }
            for (i = 0, l = handler.length; i < l; i++) {
              this.event = type;
              switch (al) {
                case 1:
                  promises.push(handler[i].call(this));
                  break;
                case 2:
                  promises.push(handler[i].call(this, arguments[1]));
                  break;
                case 3:
                  promises.push(handler[i].call(this, arguments[1], arguments[2]));
                  break;
                default:
                  promises.push(handler[i].apply(this, args));
              }
            }
          } else if (!this.ignoreErrors && !this._all && type === "error") {
            if (arguments[1] instanceof Error) {
              return Promise.reject(arguments[1]);
            } else {
              return Promise.reject("Uncaught, unspecified 'error' event.");
            }
          }
          return Promise.all(promises);
        };
        EventEmitter.prototype.on = function(type, listener, options) {
          return this._on(type, listener, false, options);
        };
        EventEmitter.prototype.prependListener = function(type, listener, options) {
          return this._on(type, listener, true, options);
        };
        EventEmitter.prototype.onAny = function(fn) {
          return this._onAny(fn, false);
        };
        EventEmitter.prototype.prependAny = function(fn) {
          return this._onAny(fn, true);
        };
        EventEmitter.prototype.addListener = EventEmitter.prototype.on;
        EventEmitter.prototype._onAny = function(fn, prepend) {
          if (typeof fn !== "function") {
            throw new Error("onAny only accepts instances of Function");
          }
          if (!this._all) {
            this._all = [];
          }
          if (prepend) {
            this._all.unshift(fn);
          } else {
            this._all.push(fn);
          }
          return this;
        };
        EventEmitter.prototype._on = function(type, listener, prepend, options) {
          if (typeof type === "function") {
            this._onAny(type, listener);
            return this;
          }
          if (typeof listener !== "function") {
            throw new Error("on only accepts instances of Function");
          }
          this._events || init.call(this);
          var returnValue = this, temp;
          if (options !== undefined2) {
            temp = setupListener.call(this, type, listener, options);
            listener = temp[0];
            returnValue = temp[1];
          }
          if (this._newListener) {
            this.emit("newListener", type, listener);
          }
          if (this.wildcard) {
            growListenerTree.call(this, type, listener, prepend);
            return returnValue;
          }
          if (!this._events[type]) {
            this._events[type] = listener;
          } else {
            if (typeof this._events[type] === "function") {
              this._events[type] = [this._events[type]];
            }
            if (prepend) {
              this._events[type].unshift(listener);
            } else {
              this._events[type].push(listener);
            }
            if (!this._events[type].warned && this._maxListeners > 0 && this._events[type].length > this._maxListeners) {
              this._events[type].warned = true;
              logPossibleMemoryLeak.call(this, this._events[type].length, type);
            }
          }
          return returnValue;
        };
        EventEmitter.prototype.off = function(type, listener) {
          if (typeof listener !== "function") {
            throw new Error("removeListener only takes instances of Function");
          }
          var handlers, leafs = [];
          if (this.wildcard) {
            var ns2 = typeof type === "string" ? type.split(this.delimiter) : type.slice();
            leafs = searchListenerTree.call(this, null, ns2, this.listenerTree, 0);
            if (!leafs)
              return this;
          } else {
            if (!this._events[type])
              return this;
            handlers = this._events[type];
            leafs.push({ _listeners: handlers });
          }
          for (var iLeaf = 0; iLeaf < leafs.length; iLeaf++) {
            var leaf = leafs[iLeaf];
            handlers = leaf._listeners;
            if (isArray(handlers)) {
              var position = -1;
              for (var i = 0, length = handlers.length; i < length; i++) {
                if (handlers[i] === listener || handlers[i].listener && handlers[i].listener === listener || handlers[i]._origin && handlers[i]._origin === listener) {
                  position = i;
                  break;
                }
              }
              if (position < 0) {
                continue;
              }
              if (this.wildcard) {
                leaf._listeners.splice(position, 1);
              } else {
                this._events[type].splice(position, 1);
              }
              if (handlers.length === 0) {
                if (this.wildcard) {
                  delete leaf._listeners;
                } else {
                  delete this._events[type];
                }
              }
              if (this._removeListener)
                this.emit("removeListener", type, listener);
              return this;
            } else if (handlers === listener || handlers.listener && handlers.listener === listener || handlers._origin && handlers._origin === listener) {
              if (this.wildcard) {
                delete leaf._listeners;
              } else {
                delete this._events[type];
              }
              if (this._removeListener)
                this.emit("removeListener", type, listener);
            }
          }
          this.listenerTree && recursivelyGarbageCollect(this.listenerTree);
          return this;
        };
        EventEmitter.prototype.offAny = function(fn) {
          var i = 0, l = 0, fns;
          if (fn && this._all && this._all.length > 0) {
            fns = this._all;
            for (i = 0, l = fns.length; i < l; i++) {
              if (fn === fns[i]) {
                fns.splice(i, 1);
                if (this._removeListener)
                  this.emit("removeListenerAny", fn);
                return this;
              }
            }
          } else {
            fns = this._all;
            if (this._removeListener) {
              for (i = 0, l = fns.length; i < l; i++)
                this.emit("removeListenerAny", fns[i]);
            }
            this._all = [];
          }
          return this;
        };
        EventEmitter.prototype.removeListener = EventEmitter.prototype.off;
        EventEmitter.prototype.removeAllListeners = function(type) {
          if (type === undefined2) {
            !this._events || init.call(this);
            return this;
          }
          if (this.wildcard) {
            var leafs = searchListenerTree.call(this, null, type, this.listenerTree, 0), leaf, i;
            if (!leafs)
              return this;
            for (i = 0; i < leafs.length; i++) {
              leaf = leafs[i];
              leaf._listeners = null;
            }
            this.listenerTree && recursivelyGarbageCollect(this.listenerTree);
          } else if (this._events) {
            this._events[type] = null;
          }
          return this;
        };
        EventEmitter.prototype.listeners = function(type) {
          var _events = this._events;
          var keys, listeners, allListeners;
          var i;
          var listenerTree;
          if (type === undefined2) {
            if (this.wildcard) {
              throw Error("event name required for wildcard emitter");
            }
            if (!_events) {
              return [];
            }
            keys = ownKeys(_events);
            i = keys.length;
            allListeners = [];
            while (i-- > 0) {
              listeners = _events[keys[i]];
              if (typeof listeners === "function") {
                allListeners.push(listeners);
              } else {
                allListeners.push.apply(allListeners, listeners);
              }
            }
            return allListeners;
          } else {
            if (this.wildcard) {
              listenerTree = this.listenerTree;
              if (!listenerTree)
                return [];
              var handlers = [];
              var ns2 = typeof type === "string" ? type.split(this.delimiter) : type.slice();
              searchListenerTree.call(this, handlers, ns2, listenerTree, 0);
              return handlers;
            }
            if (!_events) {
              return [];
            }
            listeners = _events[type];
            if (!listeners) {
              return [];
            }
            return typeof listeners === "function" ? [listeners] : listeners;
          }
        };
        EventEmitter.prototype.eventNames = function(nsAsArray) {
          var _events = this._events;
          return this.wildcard ? collectTreeEvents.call(this, this.listenerTree, [], null, nsAsArray) : _events ? ownKeys(_events) : [];
        };
        EventEmitter.prototype.listenerCount = function(type) {
          return this.listeners(type).length;
        };
        EventEmitter.prototype.hasListeners = function(type) {
          if (this.wildcard) {
            var handlers = [];
            var ns2 = typeof type === "string" ? type.split(this.delimiter) : type.slice();
            searchListenerTree.call(this, handlers, ns2, this.listenerTree, 0);
            return handlers.length > 0;
          }
          var _events = this._events;
          var _all = this._all;
          return !!(_all && _all.length || _events && (type === undefined2 ? ownKeys(_events).length : _events[type]));
        };
        EventEmitter.prototype.listenersAny = function() {
          if (this._all) {
            return this._all;
          } else {
            return [];
          }
        };
        EventEmitter.prototype.waitFor = function(event, options) {
          var self = this;
          var type = typeof options;
          if (type === "number") {
            options = { timeout: options };
          } else if (type === "function") {
            options = { filter: options };
          }
          options = resolveOptions(options, {
            timeout: 0,
            filter: undefined2,
            handleError: false,
            Promise,
            overload: false
          }, {
            filter: functionReducer,
            Promise: constructorReducer
          });
          return makeCancelablePromise(options.Promise, function(resolve, reject, onCancel) {
            function listener() {
              var filter = options.filter;
              if (filter && !filter.apply(self, arguments)) {
                return;
              }
              self.off(event, listener);
              if (options.handleError) {
                var err = arguments[0];
                err ? reject(err) : resolve(toArray.apply(null, arguments).slice(1));
              } else {
                resolve(toArray.apply(null, arguments));
              }
            }
            onCancel(function() {
              self.off(event, listener);
            });
            self._on(event, listener, false);
          }, {
            timeout: options.timeout,
            overload: options.overload
          });
        };
        function once(emitter, name, options) {
          options = resolveOptions(options, {
            Promise,
            timeout: 0,
            overload: false
          }, {
            Promise: constructorReducer
          });
          var _Promise = options.Promise;
          return makeCancelablePromise(_Promise, function(resolve, reject, onCancel) {
            var handler;
            if (typeof emitter.addEventListener === "function") {
              handler = function() {
                resolve(toArray.apply(null, arguments));
              };
              onCancel(function() {
                emitter.removeEventListener(name, handler);
              });
              emitter.addEventListener(name, handler, { once: true });
              return;
            }
            var eventListener = function() {
              errorListener && emitter.removeListener("error", errorListener);
              resolve(toArray.apply(null, arguments));
            };
            var errorListener;
            if (name !== "error") {
              errorListener = function(err) {
                emitter.removeListener(name, eventListener);
                reject(err);
              };
              emitter.once("error", errorListener);
            }
            onCancel(function() {
              errorListener && emitter.removeListener("error", errorListener);
              emitter.removeListener(name, eventListener);
            });
            emitter.once(name, eventListener);
          }, {
            timeout: options.timeout,
            overload: options.overload
          });
        }
        var prototype = EventEmitter.prototype;
        Object.defineProperties(EventEmitter, {
          defaultMaxListeners: {
            get: function() {
              return prototype._maxListeners;
            },
            set: function(n) {
              if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
                throw TypeError("n must be a non-negative number");
              }
              prototype._maxListeners = n;
            },
            enumerable: true
          },
          once: {
            value: once,
            writable: true,
            configurable: true
          }
        });
        Object.defineProperties(prototype, {
          _maxListeners: {
            value: defaultMaxListeners,
            writable: true,
            configurable: true
          },
          _observers: { value: null, writable: true, configurable: true }
        });
        if (typeof define === "function" && define.amd) {
          define(function() {
            return EventEmitter;
          });
        } else if (typeof exports === "object") {
          module.exports = EventEmitter;
        } else {
          var _global = new Function("", "return this")();
          _global.EventEmitter2 = EventEmitter;
        }
      }();
    }
  });

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    Garfish: () => Garfish,
    default: () => src_default
  });

  // ../core/src/garfish.ts
  var import_eventemitter2 = __toModule(require_eventemitter2());

  // ../utils/src/utils.ts
  var objectToString = Object.prototype.toString;
  var noop = () => {
  };
  function createKey() {
    return Math.random().toString(36).substr(2, 8);
  }
  function isObject(val) {
    return val && typeof val === "object";
  }
  function isPlainObject(val) {
    return objectToString.call(val) === "[object Object]";
  }
  function isPromise(obj) {
    return isObject(obj) && typeof obj.then === "function";
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  }
  function def(obj, key, value2) {
    Object.defineProperty(obj, key, {
      get: () => value2,
      set: (val) => {
        if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
          if (val !== value2) {
            error(`Try to modify a read-only property ${key}`);
          }
        }
      },
      configurable: (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) ? true : false
    });
  }
  function makeMap(list) {
    const map = Object.create(null);
    for (let i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return (val) => map[val];
  }
  function inBrowser() {
    return typeof window !== "undefined";
  }
  var warnPrefix = "[Garfish warning]";
  var processError = (error2, fn) => {
    try {
      if (typeof error2 === "string") {
        error2 = `${warnPrefix}: ${error2}

`;
        fn(error2, true);
      } else if (error2 instanceof Error) {
        if (!error2.message.startsWith(warnPrefix)) {
          error2.message = `${warnPrefix}: ${error2.message}`;
        }
        fn(error2, false);
      }
    } catch {
      fn(error2, typeof error2 === "string");
    }
  };
  function warn(msg) {
    processError(msg, (e, isString) => {
      const warnMsg = isString ? e : e.message;
      if (false) {
        callTestCallback(warn, warnMsg);
        return;
      }
      console.warn(warnMsg);
    });
  }
  function error(error2) {
    processError(error2, (e, isString) => {
      if (isString) {
        throw new Error(e);
      } else {
        throw e;
      }
    });
  }
  function validURL(str) {
    const pattern = new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i");
    return !!pattern.test(str);
  }
  function internFunc(internalizeString) {
    const temporaryOb = {};
    temporaryOb[internalizeString] = true;
    return Object.keys(temporaryOb)[0];
  }
  function evalWithEnv(code, params, context) {
    const keys = Object.keys(params);
    const nativeWindow = (0, eval)("window;");
    const randomValKey = "__garfish__exec_temporary__";
    const values = keys.map((k) => `window.${randomValKey}.${k}`);
    const contextKey = "__garfish_exec_temporary_context__";
    try {
      nativeWindow[randomValKey] = params;
      nativeWindow[contextKey] = context;
      const evalInfo = [
        `;(function(${keys.join(",")}){`,
        `
}).call(window.${contextKey},${values.join(",")});`
      ];
      const internalizeString = internFunc(evalInfo[0] + code + evalInfo[1]);
      (0, eval)(internalizeString);
    } catch (e) {
      throw e;
    } finally {
      delete nativeWindow[randomValKey];
      delete nativeWindow[contextKey];
    }
  }
  function safeWrapper(callback) {
    try {
      callback();
    } catch (e) {
      (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn(e);
    }
  }
  function nextTick(cb) {
    Promise.resolve().then(cb);
  }
  function assert(condition, msg) {
    if (!condition) {
      error(msg || "unknow reason");
    }
  }
  function toBoolean(val) {
    if (val === "")
      return true;
    if (val === "false")
      return false;
    return Boolean(val);
  }
  function remove(list, el) {
    if (Array.isArray(list)) {
      const i = list.indexOf(el);
      if (i > -1) {
        list.splice(i, 1);
        return true;
      }
      return false;
    } else {
      if (list.has(el)) {
        list.delete(el);
        return true;
      }
      return false;
    }
  }
  function unique(list) {
    const res = [];
    for (let i = 0, len = list.length; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        if (list[i] === list[j]) {
          j = ++i;
        }
      }
      res.push(list[i]);
    }
    return false ? res.sort() : res;
  }
  function isPrimitive(val) {
    return val === null || typeof val === "string" || typeof val === "number" || typeof val === "bigint" || typeof val === "symbol" || typeof val === "boolean" || typeof val === "undefined";
  }
  function deepMerge(o, n, dp) {
    const leftRecord = new WeakMap();
    const rightRecord = new WeakMap();
    const valueRecord = new WeakMap();
    const isArray = Array.isArray;
    const isAllRefs = (a, b) => {
      if (leftRecord.has(a) || rightRecord.has(a)) {
        return leftRecord.has(b) || rightRecord.has(b);
      }
    };
    const clone = (v) => {
      if (isPrimitive(v) || typeof v === "function") {
        return v;
      } else if (valueRecord.has(v)) {
        return valueRecord.get(v);
      } else if (leftRecord.has(v)) {
        return leftRecord.get(v);
      } else if (rightRecord.has(v)) {
        return rightRecord.get(v);
      } else if (isArray(v)) {
        if (dp)
          v = unique(v);
        const arr = [];
        valueRecord.set(v, arr);
        for (let i = 0, len = v.length; i < len; i++) {
          arr[i] = clone(v[i]);
        }
        return arr;
      } else if (typeof v === "object") {
        const obj = {};
        valueRecord.set(v, obj);
        const keys = Reflect.ownKeys(v);
        keys.forEach((key) => obj[key] = clone(v[key]));
        return obj;
      }
    };
    const setValue = (r, k) => {
      if (r.has(k)) {
        return r.get(k);
      } else {
        const val = clone(k);
        if (!isPrimitive(val) && typeof val !== "function") {
          r.set(k, val);
        }
        return val;
      }
    };
    const mergeObject = (l, r) => {
      const res = {};
      const leftKeys = Reflect.ownKeys(l);
      const rightKeys = Reflect.ownKeys(r);
      leftRecord.set(l, res);
      rightRecord.set(r, res);
      leftKeys.forEach((key) => {
        const lv = l[key];
        const rv = r[key];
        if (hasOwn(r, key)) {
          if (isArray(lv) && isArray(rv)) {
            const item = clone([].concat(lv, rv));
            res[key] = dp ? unique(item) : item;
          } else if (isPlainObject(lv) && isPlainObject(rv)) {
            res[key] = isAllRefs(lv, rv) ? leftRecord.get(lv) : mergeObject(lv, rv);
          } else {
            res[key] = setValue(rightRecord, rv);
          }
        } else {
          res[key] = setValue(leftRecord, lv);
        }
      });
      rightKeys.forEach((key) => {
        if (hasOwn(res, key))
          return;
        res[key] = setValue(rightRecord, r[key]);
      });
      return res;
    };
    return mergeObject(o, n);
  }
  function isAbsolute(url) {
    if (!/^[a-zA-Z]:\\/.test(url)) {
      if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url)) {
        return true;
      }
    }
    return false;
  }
  function transformUrl(resolvePath, curPath) {
    const baseUrl = new URL(resolvePath, location.href);
    const realPath = new URL(curPath, baseUrl.href);
    return realPath.href;
  }
  function toWsProtocol(url) {
    const data = new URL(url);
    if (data.protocol.startsWith("http")) {
      data.protocol = data.protocol === "https:" ? "wss:" : "ws:";
      return data.toString();
    }
    return url;
  }
  function findTarget(el, selectors) {
    for (const s of selectors) {
      const target = el.querySelector(s);
      if (target)
        return target;
    }
    return el;
  }
  function setDocCurrentScript(target, code, define2, url, async) {
    if (!target)
      return noop;
    const el = document.createElement("script");
    if (async) {
      el.setAttribute("async", "true");
    }
    if (url) {
      el.setAttribute("src", url);
    } else if (code) {
      el.textContent = code;
    }
    const set2 = (val) => {
      try {
        if (define2) {
          Object.defineProperty(target, "currentScript", {
            value: val,
            writable: true,
            configurable: true
          });
        } else {
          target.currentScript = val;
        }
      } catch (e) {
        if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
          warn(e);
        }
      }
    };
    set2(el);
    return () => set2(null);
  }
  function _extends(d, b) {
    Object.setPrototypeOf(d, b);
    function fNOP() {
      this.constructor = d;
    }
    if (b === null) {
      d.prototype = Object.create(b);
    } else {
      if (b.prototype)
        fNOP.prototype = b.prototype;
      d.prototype = new fNOP();
    }
  }

  // ../utils/src/sentry.ts
  var sourceListTags = [
    "link",
    "style",
    "script",
    "img",
    "video",
    "audio"
  ];
  var sourceNode = makeMap(sourceListTags);

  // ../utils/src/domApis.ts
  var xChar = 120;
  var colonChar = 58;
  var ns = "http://www.w3.org/2000/svg";
  var xlinkNS = "http://www.w3.org/1999/xlink";
  var xmlNS = "http://www.w3.org/XML/1998/namespace";
  var SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
  var isSVG = makeMap(SVG_TAGS.split(","));
  function attributesString(attributes) {
    if (!attributes || attributes.length === 0)
      return "";
    return attributes.reduce((total, { key, value: value2 }) => {
      return total + (value2 ? `${key}="${value2}" ` : key);
    }, "");
  }
  var DOMApis = class {
    constructor(cusDocument) {
      this.document = cusDocument || document;
    }
    isText(node) {
      return node && node.type === "text";
    }
    isNode(node) {
      return node && node.type === "element";
    }
    isCommentNode(node) {
      return node && node.type === "comment";
    }
    isCssLinkNode(node) {
      if (this.isNode(node) && node.tagName === "link") {
        return !!node.attributes.find(({ key, value: value2 }) => key === "rel" && value2 === "stylesheet");
      }
      return false;
    }
    isIconLinkNode(node) {
      if (this.isNode(node) && node.tagName === "link") {
        return !!node.attributes.find(({ key, value: value2 }) => key === "rel" && value2 === "icon");
      }
      return false;
    }
    isPrefetchJsLinkNode(node) {
      if (!this.isNode(node) || node.tagName !== "link")
        return false;
      let hasRelAttr, hasAsAttr;
      for (const { key, value: value2 } of node.attributes) {
        if (key === "rel") {
          hasRelAttr = true;
          if (value2 !== "preload" && value2 !== "prefetch") {
            return false;
          }
        } else if (key === "as") {
          hasAsAttr = true;
          if (value2 !== "script")
            return false;
        }
      }
      return Boolean(hasRelAttr && hasAsAttr);
    }
    isRemoteModule(node) {
      if (!this.isNode(node) || node.tagName !== "meta")
        return false;
      let hasNameAttr, hasSrcAttr;
      for (const { key, value: value2 } of node.attributes) {
        if (key === "name") {
          hasNameAttr = true;
          if (value2 !== "garfish-remote-module") {
            return false;
          }
        } else if (key === "src") {
          hasSrcAttr = true;
          if (typeof value2 === "undefined" || value2 === "") {
            return false;
          }
        }
      }
      return Boolean(hasNameAttr && hasSrcAttr);
    }
    removeElement(el) {
      const parentNode = el && el.parentNode;
      if (parentNode) {
        parentNode.removeChild(el);
      }
    }
    createElement(node) {
      const { tagName, attributes } = node;
      const el = isSVG(tagName) ? this.document.createElementNS(ns, tagName) : this.document.createElement(tagName);
      this.applyAttributes(el, attributes);
      return el;
    }
    createTextNode(node) {
      return this.document.createTextNode(node.content);
    }
    createStyleNode(content) {
      const el = this.document.createElement("style");
      content && (el.textContent = content);
      this.applyAttributes(el, [{ key: "type", value: "text/css" }]);
      return el;
    }
    createLinkCommentNode(node) {
      if (this.isNode(node)) {
        const ps = attributesString(node.attributes);
        return `<link ${ps.slice(0, -1)}></link>`;
      } else {
        node = node ? `src="${node}" ` : "";
        return this.document.createComment(`<link ${node}execute by garfish(dynamic)></link>`);
      }
    }
    createScriptCommentNode(node) {
      if (this.isNode(node)) {
        const { attributes, children } = node;
        const ps = attributesString(attributes);
        const code = (children == null ? void 0 : children[0]) ? children[0].content : "";
        return this.document.createComment(`<script ${ps} execute by garfish>${code}<\/script>`);
      } else {
        const { src, code } = node;
        const url = src ? `src="${src}" ` : "";
        return this.document.createComment(`<script ${url}execute by garfish(dynamic)>${code}<\/script>`);
      }
    }
    applyAttributes(el, attributes) {
      if (!attributes || attributes.length === 0)
        return;
      for (const { key, value: value2 } of attributes) {
        if (value2 === null) {
          el.setAttribute(key, "");
        } else if (typeof value2 === "string") {
          if (key.charCodeAt(0) !== xChar) {
            el.setAttribute(key, value2);
          } else if (key.charCodeAt(3) === colonChar) {
            el.setAttributeNS(xmlNS, key, value2);
          } else if (key.charCodeAt(5) === colonChar) {
            el.setAttributeNS(xlinkNS, key, value2);
          } else {
            el.setAttribute(key, value2);
          }
        }
      }
    }
  };

  // ../utils/src/garfish.ts
  var __LOADER_FLAG__ = Symbol.for("__LOADER_FLAG__");
  var __GARFISH_FLAG__ = Symbol.for("__GARFISH_FLAG__");
  var __MockHtml__ = "__garfishmockhtml__";
  var __MockBody__ = "__garfishmockbody__";
  var __MockHead__ = "__garfishmockhead__";
  var __REMOVE_NODE__ = "__garfishremovenode__";

  // ../utils/src/mimeType.ts
  function parseContentType(input) {
    input = input == null ? void 0 : input.trim();
    if (!input)
      return null;
    let idx = 0;
    let type = "";
    let subType = "";
    while (idx < input.length && input[idx] !== "/") {
      type += input[idx];
      idx++;
    }
    if (type.length === 0 || idx >= input.length) {
      return null;
    }
    idx++;
    while (idx < input.length && input[idx] !== ";") {
      subType += input[idx];
      idx++;
    }
    subType = subType.replace(/[ \t\n\r]+$/, "");
    if (subType.length === 0)
      return null;
    return {
      type: type.toLocaleLowerCase(),
      subtype: subType.toLocaleLowerCase()
    };
  }
  function isCss(mt) {
    return mt ? mt.type === "text" && mt.subtype === "css" : false;
  }
  function isHtml(mt) {
    return mt ? mt.type === "text" && mt.subtype === "html" : false;
  }
  function isJs(mt) {
    const { type, subtype } = mt || {};
    switch (type) {
      case "text": {
        switch (subtype) {
          case "ecmascript":
          case "javascript":
          case "javascript1.0":
          case "javascript1.1":
          case "javascript1.2":
          case "javascript1.3":
          case "javascript1.4":
          case "javascript1.5":
          case "jscript":
          case "livescript":
          case "x-ecmascript":
          case "x-javascript": {
            return true;
          }
          default: {
            return false;
          }
        }
      }
      case "application": {
        switch (subtype) {
          case "ecmascript":
          case "javascript":
          case "x-ecmascript":
          case "x-javascript": {
            return true;
          }
          default: {
            return false;
          }
        }
      }
      default: {
        return false;
      }
    }
  }
  function isJsonp(mt, src) {
    const callbackRegExp = /callback/;
    try {
      const search = new URL(src).search;
      const { type, subtype } = mt || {};
      if (type === "application" && subtype === "json" && callbackRegExp.test(search)) {
        return true;
      }
    } catch {
      return false;
    }
    return false;
  }

  // ../utils/src/dispatchEvents.ts
  var reactEvents = [
    "onAbort",
    "onAnimationCancel",
    "onAnimationEnd",
    "onAnimationIteration",
    "onAuxClick",
    "onBlur",
    "onChange",
    "onClick",
    "onClose",
    "onContextMenu",
    "onDoubleClick",
    "onError",
    "onFocus",
    "onGotPointerCapture",
    "onInput",
    "onKeyDown",
    "onKeyPress",
    "onKeyUp",
    "onLoad",
    "onLoadEnd",
    "onLoadStart",
    "onLostPointerCapture",
    "onMouseDown",
    "onMouseMove",
    "onMouseOut",
    "onMouseOver",
    "onMouseUp",
    "onPointerCancel",
    "onPointerDown",
    "onPointerEnter",
    "onPointerLeave",
    "onPointerMove",
    "onPointerOut",
    "onPointerOver",
    "onPointerUp",
    "onReset",
    "onResize",
    "onScroll",
    "onSelect",
    "onSelectionChange",
    "onSelectStart",
    "onSubmit",
    "onTouchCancel",
    "onTouchMove",
    "onTouchStart",
    "onTouchEnd",
    "onTransitionCancel",
    "onTransitionEnd",
    "onDrag",
    "onDragEnd",
    "onDragEnter",
    "onDragExit",
    "onDragLeave",
    "onDragOver",
    "onDragStart",
    "onDrop",
    "onFocusOut"
  ];
  var divergentNativeEvents = {
    onDoubleClick: "dblclick"
  };
  var mimickedReactEvents = {
    onInput: "onChange",
    onFocusOut: "onBlur",
    onSelectionChange: "onSelect"
  };
  function dispatchEvents(shadowRoot) {
    const removeEventListeners = [];
    reactEvents.forEach(function(reactEventName) {
      const nativeEventName = getNativeEventName(reactEventName);
      function retargetEvent(event) {
        const path = event.path || event.composedPath && event.composedPath() || composedPath(event.target);
        for (let i = 0; i < path.length; i++) {
          const el = path[i];
          let props = null;
          const reactComponent = findReactComponent(el);
          const eventHandlers = findReactEventHandlers(el);
          if (!eventHandlers) {
            props = findReactProps(reactComponent);
          } else {
            props = eventHandlers;
          }
          if (reactComponent && props) {
            dispatchEvent(event, reactEventName, props);
          }
          if (reactComponent && props && mimickedReactEvents[reactEventName]) {
            dispatchEvent(event, mimickedReactEvents[reactEventName], props);
          }
          if (event.cancelBubble) {
            break;
          }
          if (el === shadowRoot) {
            break;
          }
        }
      }
      shadowRoot.addEventListener(nativeEventName, retargetEvent, false);
      removeEventListeners.push(function() {
        shadowRoot.removeEventListener(nativeEventName, retargetEvent, false);
      });
    });
    return function() {
      removeEventListeners.forEach(function(removeEventListener) {
        removeEventListener();
      });
    };
  }
  function findReactEventHandlers(item) {
    return findReactProperty(item, "__reactEventHandlers");
  }
  function findReactComponent(item) {
    return findReactProperty(item, "_reactInternal");
  }
  function findReactProperty(item, propertyPrefix) {
    for (const key in item) {
      if (hasOwn(item, key) && key.indexOf(propertyPrefix) !== -1) {
        return item[key];
      }
    }
  }
  function findReactProps(component) {
    if (!component)
      return void 0;
    if (component.memoizedProps)
      return component.memoizedProps;
    if (component._currentElement && component._currentElement.props)
      return component._currentElement.props;
  }
  function dispatchEvent(event, eventType, componentProps) {
    event.persist = function() {
      event.isPersistent = () => true;
    };
    if (componentProps[eventType]) {
      componentProps[eventType](event);
    }
  }
  function getNativeEventName(reactEventName) {
    if (divergentNativeEvents[reactEventName]) {
      return divergentNativeEvents[reactEventName];
    }
    return reactEventName.replace(/^on/, "").toLowerCase();
  }
  function composedPath(el) {
    const path = [];
    while (el) {
      path.push(el);
      if (el.tagName === "HTML") {
        path.push(document);
        path.push(window);
        return path;
      }
      el = el.parentElement;
    }
  }

  // ../utils/src/container.ts
  function asyncNodeAttribute(from, to) {
    const MutationObserver2 = window.MutationObserver;
    const observer = new MutationObserver2((mutations) => {
      mutations.forEach(({ type, target, attributeName }) => {
        var _a;
        if (target) {
          const tag = (_a = target.nodeName) == null ? void 0 : _a.toLowerCase();
          if (type === "attributes" && attributeName === "style" && (target === from || tag === "body")) {
            const style = target == null ? void 0 : target.getAttribute("style");
            if (style) {
              to.setAttribute("style", style);
            }
          }
        }
      });
    });
    observer.observe(from, { attributes: true, subtree: true });
  }
  function createAppContainer(appInfo) {
    const name = appInfo.name;
    const htmlNode = document.createElement("div");
    const appContainer = document.createElement("div");
    if (appInfo.sandbox && appInfo.sandbox.strictIsolation) {
      const root = appContainer.attachShadow({ mode: "open" });
      root.appendChild(htmlNode);
      asyncNodeAttribute(htmlNode, document.body);
      dispatchEvents(root);
    } else {
      htmlNode.setAttribute(__MockHtml__, "");
      appContainer.id = `garfish_app_for_${name}_${createKey()}`;
      appContainer.appendChild(htmlNode);
    }
    return {
      htmlNode,
      appContainer
    };
  }
  async function getRenderNode(domGetter) {
    assert(domGetter, `Invalid domGetter:
 ${domGetter}.`);
    let appWrapperNode = domGetter;
    if (typeof domGetter === "string") {
      appWrapperNode = document.querySelector(domGetter);
    } else if (typeof domGetter === "function") {
      appWrapperNode = await domGetter();
    } else if (typeof domGetter === "object") {
      appWrapperNode = domGetter;
    }
    assert(appWrapperNode, `Invalid domGetter: ${domGetter}`);
    return appWrapperNode;
  }

  // ../utils/src/templateParse.ts
  var ElementType;
  (function(ElementType2) {
    ElementType2[ElementType2["TEXT"] = 3] = "TEXT";
    ElementType2[ElementType2["COMMENT"] = 8] = "COMMENT";
    ElementType2[ElementType2["ELEMENT"] = 1] = "ELEMENT";
  })(ElementType || (ElementType = {}));
  function Attributes({ name, value: value2 }) {
    this.key = name;
    this.value = value2;
  }
  var generateAttributes = (el) => {
    const list = [];
    const attrs = el.attributes;
    const len = attrs.length;
    if (len > 0) {
      if (len === 1) {
        list[0] = new Attributes(attrs[0]);
      } else if (len === 2) {
        list[0] = new Attributes(attrs[0]);
        list[1] = new Attributes(attrs[1]);
      } else {
        for (let i = 0; i < len; i++) {
          list[i] = new Attributes(attrs[i]);
        }
      }
    }
    return list;
  };
  var createElement = (el, filter) => {
    switch (el.nodeType) {
      case 3:
        return {
          type: "text",
          content: el.textContent
        };
      case 8:
        return {
          type: "comment",
          content: el.textContent
        };
      case 1:
        return filter({
          type: "element",
          tagName: el.tagName.toLowerCase(),
          attributes: generateAttributes(el),
          children: Array.from(el.childNodes).map((node) => {
            return createElement(node, filter);
          })
        });
      default:
        error(`Invalid node type "${el.nodeType}"`);
    }
  };
  function templateParse(code, tags) {
    let astTree = [];
    const htmlNode = document.createElement("html");
    const collectionEls = {};
    const filter = (el) => {
      if (tags.includes(el.tagName)) {
        collectionEls[el.tagName].push(el);
      }
      return el;
    };
    htmlNode.innerHTML = code;
    for (const tag of tags) {
      collectionEls[tag] = [];
    }
    astTree = Array.from(htmlNode.childNodes).map((node) => {
      return createElement(node, filter);
    });
    return [astTree, collectionEls];
  }

  // ../hooks/src/syncHook.ts
  var SyncHook = class {
    constructor(type) {
      this.type = "";
      this.listeners = new Set();
      if (type)
        this.type = type;
    }
    on(fn) {
      if (typeof fn === "function") {
        this.listeners.add(fn);
      } else if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
        warn('Invalid parameter in "Hook".');
      }
    }
    once(fn) {
      const self = this;
      this.on(function wrapper(...args) {
        self.remove(wrapper);
        return fn.apply(null, args);
      });
    }
    emit(...data) {
      if (this.listeners.size > 0) {
        this.listeners.forEach((fn) => fn.apply(null, data));
      }
    }
    remove(fn) {
      return this.listeners.delete(fn);
    }
    removeAll() {
      this.listeners.clear();
    }
  };

  // ../hooks/src/asyncHook.ts
  var AsyncHook = class extends SyncHook {
    emit(...data) {
      let result;
      const ls = Array.from(this.listeners);
      if (ls.length > 0) {
        let i = 0;
        const call = (prev) => {
          if (prev === false) {
            return false;
          } else if (i < ls.length) {
            return Promise.resolve(ls[i++].apply(null, data)).then(call);
          }
        };
        result = call();
      }
      return Promise.resolve(result);
    }
  };

  // ../hooks/src/pluginSystem.ts
  var PluginSystem = class {
    constructor(lifecycle) {
      this.registerPlugins = {};
      this.lifecycle = lifecycle;
      this.lifecycleKeys = Object.keys(lifecycle);
    }
    usePlugin(plugin) {
      assert(isPlainObject(plugin), "Invalid plugin configuration.");
      const pluginName = plugin.name;
      assert(pluginName, "Plugin must provide a name.");
      if (!this.registerPlugins[pluginName]) {
        this.registerPlugins[pluginName] = plugin;
        for (const key in this.lifecycle) {
          const pluginLife = plugin[key];
          if (pluginLife) {
            this.lifecycle[key].on(pluginLife);
          }
        }
      } else if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
        warn(`Repeat to register plugin hooks "${pluginName}".`);
      }
    }
    removePlugin(pluginName) {
      assert(pluginName, "Must provide a name.");
      const plugin = this.registerPlugins[pluginName];
      assert(plugin, `plugin "${pluginName}" is not registered.`);
      for (const key in plugin) {
        this.lifecycle[key].remove(plugin[key]);
      }
    }
  };

  // ../hooks/src/syncWaterfallHook.ts
  var SyncWaterfallHook = class extends SyncHook {
    constructor(type) {
      super();
      this.onerror = error;
      this.type = type;
    }
    emit(result) {
      for (const fn of this.listeners) {
        try {
          let illegalResult = false;
          const tempResult = fn(result);
          for (const key in result) {
            if (!(key in tempResult)) {
              illegalResult = true;
              this.onerror(`The "${this.type}" type has a plugin return value error.`);
              break;
            }
          }
          if (!illegalResult) {
            result = tempResult;
          }
        } catch (e) {
          (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn(e);
          this.onerror(e);
        }
      }
      return result;
    }
  };

  // ../loader/src/managers/style.ts
  var MATCH_CSS_URL = /url\(['"]?([^\)]+?)['"]?\)/g;
  var StyleManager = class {
    constructor(styleCode, url) {
      this.depsStack = new Set();
      this.url = url || null;
      this.styleCode = styleCode;
    }
    correctPath(baseUrl) {
      const { url, styleCode } = this;
      if (!baseUrl)
        baseUrl = url;
      if (baseUrl && typeof styleCode === "string") {
        this.styleCode = styleCode.replace(MATCH_CSS_URL, (k1, k2) => {
          if (isAbsolute(k2))
            return k1;
          return `url("${transformUrl(baseUrl, k2)}")`;
        });
      }
    }
    setScope(_scope) {
    }
    setDep(node) {
      this.depsStack.add(node);
    }
    isSameOrigin(node) {
      return this.depsStack.has(node);
    }
    renderAsStyleElement(extraCode = "") {
      const node = document.createElement("style");
      node.setAttribute("type", "text/css");
      node.textContent = extraCode + (this.styleCode ? this.styleCode : "/**empty style**/");
      return node;
    }
    clone() {
      const cloned = new this.constructor();
      cloned.url = this.url;
      cloned.styleCode = this.styleCode;
      cloned.depsStack = new Set(this.depsStack);
      return cloned;
    }
  };

  // ../loader/src/managers/module.ts
  var ModuleManager = class {
    constructor(moduleCode, url) {
      this.alias = null;
      this.url = url || null;
      this.moduleCode = moduleCode;
    }
    setAlias(name) {
      if (name && typeof name === "string") {
        this.alias = name;
      }
    }
    clone() {
      const cloned = new this.constructor();
      cloned.url = this.url;
      cloned.alias = this.alias;
      cloned.moduleCode = this.moduleCode;
      return cloned;
    }
  };

  // ../loader/src/managers/template.ts
  var TemplateManager = class {
    constructor(template, url) {
      this.DOMApis = new DOMApis();
      this.astTree = [];
      this.pretreatmentStore = {};
      this.url = url || null;
      if (template) {
        const [astTree, collectionEls] = templateParse(template, [
          "meta",
          "link",
          "style",
          "script"
        ]);
        this.astTree = astTree;
        this.pretreatmentStore = collectionEls;
      }
    }
    getNodesByTagName(...tags) {
      let counter = 0;
      const collection = {};
      for (const tag of tags) {
        if (this.pretreatmentStore[tag]) {
          counter++;
          collection[tag] = this.pretreatmentStore[tag];
        } else {
          this.pretreatmentStore[tag] = collection[tag] = [];
        }
      }
      if (counter !== tags.length) {
        const traverse = (node) => {
          if (node.type !== "element")
            return;
          if (tags.indexOf(node.tagName) > -1) {
            collection[node.tagName].push(node);
          }
          for (const child of node.children)
            traverse(child);
        };
        for (const node of this.astTree)
          traverse(node);
      }
      return collection;
    }
    createElements(renderer, parent) {
      const elements = [];
      const traverse = (node, parentEl) => {
        let el = null;
        if (this.DOMApis.isCommentNode(node)) {
        } else if (this.DOMApis.isText(node)) {
          el = this.DOMApis.createTextNode(node);
          parentEl && parentEl.appendChild(el);
        } else if (this.DOMApis.isNode(node)) {
          const { tagName, children } = node;
          if (renderer[tagName]) {
            el = renderer[tagName](node);
          } else {
            el = this.DOMApis.createElement(node);
          }
          if (parentEl && el)
            parentEl.appendChild(el);
          if (el) {
            const { nodeType, _ignoreChildNodes } = el;
            if (!_ignoreChildNodes && nodeType !== 8 && nodeType !== 10) {
              for (const child of children) {
                traverse(child, el);
              }
            }
          }
        }
        return el;
      };
      for (const node of this.astTree) {
        if (this.DOMApis.isNode(node) && node.tagName !== "!doctype") {
          const el = traverse(node, parent);
          el && elements.push(el);
        }
      }
      return elements;
    }
    toResolveUrl(node, type, baseUrl) {
      var _a;
      const src = (_a = node.attributes) == null ? void 0 : _a.find(({ key }) => key === type);
      if (src) {
        src.value = transformUrl(baseUrl, src.value);
      }
    }
    ignoreChildNodesCreation(node) {
      if (node) {
        node._ignoreChildNodes = true;
      }
      return node;
    }
    findAllMetaNodes() {
      return this.getNodesByTagName("meta").meta;
    }
    findAllLinkNodes() {
      return this.getNodesByTagName("link").link;
    }
    findAllJsNodes() {
      return this.getNodesByTagName("script").script;
    }
    findAttributeValue(node, type) {
      var _a, _b;
      return (_b = (_a = node.attributes) == null ? void 0 : _a.find(({ key }) => key === type)) == null ? void 0 : _b.value;
    }
    cloneNode(node) {
      return deepMerge(node, {});
    }
    clone() {
      const cloned = new this.constructor();
      cloned.url = this.url;
      cloned.astTree = this.astTree;
      cloned.pretreatmentStore = this.pretreatmentStore;
      cloned.DOMApis = new DOMApis(this.DOMApis.document);
      return cloned;
    }
  };

  // ../loader/src/managers/javascript.ts
  var JavaScriptManager = class {
    constructor(scriptCode, url) {
      this.depsStack = new Set();
      this.mimeType = "";
      this.async = false;
      this.url = url || null;
      this.scriptCode = scriptCode;
    }
    isModule() {
      return this.mimeType === "module";
    }
    isInlineScript() {
      return Boolean(!this.url);
    }
    setMimeType(mimeType) {
      this.mimeType = mimeType || "";
    }
    setAsyncAttribute(val) {
      this.async = Boolean(val);
    }
    setDep(node) {
      this.depsStack.add(node);
    }
    isSameOrigin(node) {
      return this.depsStack.has(node);
    }
    clone() {
      const cloned = new this.constructor();
      cloned.url = this.url;
      cloned.async = this.async;
      cloned.mimeType = this.mimeType;
      cloned.scriptCode = this.scriptCode;
      cloned.depsStack = new Set(this.depsStack);
      return cloned;
    }
  };

  // ../loader/src/utils.ts
  async function request(url, config) {
    const result = await fetch(url, config || {});
    if (result.status >= 400) {
      error(`"${url}" load failed with status "${result.status}"`);
    }
    const code = await result.text();
    const type = result.headers.get("content-type");
    const mimeType = parseContentType(type);
    return { code, result, mimeType };
  }
  function copyResult(result) {
    if (result.resourceManager) {
      result.resourceManager = result.resourceManager.clone();
    }
    return result;
  }
  function mergeConfig(loader, url) {
    const extra = loader.requestConfig;
    const config = typeof extra === "function" ? extra(url) : extra;
    return __spreadValues({ mode: "cors" }, config);
  }
  function calculateObjectSize(obj) {
    let size = 0;
    const valueSet = new WeakSet();
    const add = (val) => {
      if (isPrimitive(val)) {
        size += new Blob([val]).size;
      } else if (isPlainObject(val)) {
        if (!valueSet.has(val)) {
          valueSet.add(val);
          for (const key in val)
            add(val[key]);
        }
      } else if (Array.isArray(val)) {
        if (!valueSet.has(val)) {
          valueSet.add(val);
          val.forEach(add);
        }
      } else {
        size += new Blob([val]).size;
      }
    };
    add(obj);
    return size;
  }

  // ../loader/src/appCache.ts
  var cachedDataSet = new WeakSet();
  var FileTypes;
  (function(FileTypes2) {
    FileTypes2["js"] = "js";
    FileTypes2["css"] = "css";
    FileTypes2["module"] = "module";
    FileTypes2["template"] = "template";
  })(FileTypes || (FileTypes = {}));
  var MAX_SIZE = 1024 * 1024 * 15;
  var DEFAULT_POLL = Symbol("__defaultBufferPoll__");
  var FILE_TYPES = [
    FileTypes.js,
    FileTypes.css,
    FileTypes.module,
    FileTypes.template,
    DEFAULT_POLL
  ];
  var AppCacheContainer = class {
    constructor(maxSize = MAX_SIZE) {
      this.totalSize = 0;
      this.recorder = {};
      this.maxSize = maxSize;
      FILE_TYPES.forEach((key) => {
        this.recorder[key] = 0;
        this[key] = new Map();
      });
    }
    bufferPool(type) {
      return this[type];
    }
    has(url) {
      return FILE_TYPES.some((key) => this[key].has(url));
    }
    get(url) {
      for (const key of FILE_TYPES) {
        if (this[key].has(url)) {
          return this[key].get(url);
        }
      }
    }
    set(url, data, type) {
      const curSize = cachedDataSet.has(data) ? 0 : calculateObjectSize(data);
      const totalSize = this.totalSize + curSize;
      if (totalSize < this.maxSize) {
        let bar = type;
        let bufferPool = this.bufferPool(type);
        if (!bufferPool) {
          bar = DEFAULT_POLL;
          bufferPool = this.bufferPool(DEFAULT_POLL);
        }
        bufferPool.set(url, data);
        this.totalSize = totalSize;
        this.recorder[bar] += curSize;
        return true;
      }
      return false;
    }
    clear(type) {
      if (typeof type === "string") {
        const cacheBox = this.bufferPool(type);
        if (cacheBox && cacheBox instanceof Map) {
          const size = this.recorder[type];
          this.totalSize -= size;
          this.recorder[type] = 0;
          cacheBox.clear();
        }
      } else {
        FILE_TYPES.forEach((key) => {
          this[key].clear();
          this.recorder[key] = 0;
        });
        this.totalSize = 0;
      }
    }
  };

  // ../loader/src/index.ts
  var Loader = class {
    constructor(options) {
      this.personalId = __LOADER_FLAG__;
      this.StyleManager = StyleManager;
      this.ModuleManager = ModuleManager;
      this.TemplateManager = TemplateManager;
      this.JavaScriptManager = JavaScriptManager;
      this.hooks = new PluginSystem({
        error: new SyncHook(),
        loaded: new SyncWaterfallHook("loaded"),
        clear: new SyncWaterfallHook("clear"),
        beforeLoad: new SyncWaterfallHook("beforeLoad")
      });
      this.options = options || {};
      this.loadingList = Object.create(null);
      this.cacheStore = Object.create(null);
    }
    clear(scope, fileType) {
      const appCacheContainer = this.cacheStore[scope];
      if (appCacheContainer) {
        appCacheContainer.clear(fileType);
        this.hooks.lifecycle.clear.emit({ scope, fileType });
      }
    }
    clearAll(fileType) {
      for (const scope in this.cacheStore) {
        this.clear(scope, fileType);
      }
    }
    loadModule(url) {
      return this.load("modules", url, true);
    }
    load(scope, url, isModule2 = false) {
      const { options, loadingList, cacheStore } = this;
      if (loadingList[url]) {
        return loadingList[url];
      }
      let appCacheContainer = cacheStore[scope];
      if (!appCacheContainer) {
        appCacheContainer = cacheStore[scope] = new AppCacheContainer(options.maxSize);
      }
      if (appCacheContainer.has(url)) {
        return Promise.resolve(copyResult(appCacheContainer.get(url)));
      } else {
        for (const key in cacheStore) {
          const container = cacheStore[key];
          if (container !== appCacheContainer) {
            if (container.has(url)) {
              const result = container.get(url);
              cachedDataSet.add(result);
              appCacheContainer.set(url, result, result.fileType);
              return Promise.resolve(copyResult(result));
            }
          }
        }
      }
      const requestConfig = mergeConfig(this, url);
      const resOpts = this.hooks.lifecycle.beforeLoad.emit({
        url,
        requestConfig
      });
      loadingList[url] = request(resOpts.url, resOpts.requestConfig).then(({ code, mimeType, result }) => {
        let managerCtor, fileType;
        if (isModule2) {
          fileType = FileTypes.module;
          managerCtor = ModuleManager;
        } else if (isHtml(mimeType) || /\.html$/.test(result.url)) {
          fileType = FileTypes.template;
          managerCtor = TemplateManager;
        } else if (isJs(mimeType) || /\.js$/.test(result.url) || isJsonp(mimeType, result.url)) {
          fileType = FileTypes.js;
          managerCtor = JavaScriptManager;
        } else if (isCss(mimeType) || /\.css$/.test(result.url)) {
          fileType = FileTypes.css;
          managerCtor = StyleManager;
        }
        const resourceManager = managerCtor ? new managerCtor(code, result.url) : null;
        const data = this.hooks.lifecycle.loaded.emit({
          result,
          value: {
            url,
            resourceManager,
            fileType: fileType || "",
            code: resourceManager ? "" : code
          }
        });
        appCacheContainer.set(url, data.value, fileType);
        return copyResult(data.value);
      }).catch((e) => {
        (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn(e);
        this.hooks.lifecycle.error.emit(e);
        throw e;
      }).finally(() => {
        loadingList[url] = null;
      });
      return loadingList[url];
    }
  };

  // ../core/src/lifecycle.ts
  function globalLifecycle() {
    return new PluginSystem({
      beforeBootstrap: new SyncHook(),
      bootstrap: new SyncHook(),
      beforeRegisterApp: new SyncHook(),
      registerApp: new SyncHook(),
      beforeLoad: new AsyncHook(),
      afterLoad: new SyncHook(),
      errorLoadApp: new SyncHook()
    });
  }
  function appLifecycle() {
    return new PluginSystem({
      beforeEval: new SyncHook(),
      afterEval: new SyncHook(),
      beforeMount: new SyncHook(),
      afterMount: new SyncHook(),
      errorMountApp: new SyncHook(),
      beforeUnmount: new SyncHook(),
      afterUnmount: new SyncHook(),
      errorUnmountApp: new SyncHook(),
      errorExecCode: new SyncHook()
    });
  }

  // ../core/src/config.ts
  var appConfigList = [
    "name",
    "entry",
    "activeWhen",
    "basename",
    "domGetter",
    "props",
    "sandbox",
    "cache",
    "nested",
    "noCheckProvider",
    "protectVariable",
    "customLoader",
    ...appLifecycle().lifecycleKeys
  ];
  var invalidNestedAttrs = [
    "sandbox",
    "autoRefreshApp",
    "disableStatistics",
    "disablePreloadApp"
  ];
  var filterNestedConfig = (garfish, config, id2) => {
    if (config.nested) {
      invalidNestedAttrs.forEach((key) => {
        if (key in config) {
          delete config[key];
          warn(`Nested scene does not support the configuration "${key}".`);
        }
      });
    }
    garfish.hooks.lifecycleKeys.forEach((key) => {
      const fn = config[key];
      const canCall = (info) => info.nested = id2;
      const isInfo = (info) => isPlainObject(info) && hasOwn(info, "name") && hasOwn(info, "entry");
      if (typeof fn === "function") {
        config[key] = function(...args) {
          const info = args.find(isInfo);
          if (!info)
            return fn.apply(this, args);
          if (canCall(info))
            return fn.apply(this, args);
        };
      }
    });
    return config;
  };
  var deepMergeConfig = (globalConfig, localConfig) => {
    const globalProps = globalConfig.props;
    const localProps = localConfig.props;
    if (globalProps || localProps) {
      globalConfig = __spreadValues({}, globalConfig);
      localConfig = __spreadValues({}, localConfig);
      delete globalConfig.props;
      delete localConfig.props;
    }
    const result = deepMerge(globalConfig, localConfig);
    if (globalProps)
      result.props = __spreadValues({}, globalProps);
    if (localProps)
      result.props = __spreadValues(__spreadValues({}, result.props || {}), localProps);
    return result;
  };
  var getAppConfig = (globalConfig, localConfig) => {
    const mergeConfig2 = deepMergeConfig(globalConfig, localConfig);
    Object.keys(mergeConfig2).forEach((key) => {
      if (!appConfigList.includes(key) || typeof mergeConfig2[key] === "undefined") {
        delete mergeConfig2[key];
      }
    });
    return mergeConfig2;
  };
  var generateAppOptions = (appName, garfish, appOptionsOrUrl = {}) => {
    let appInfo = garfish.appInfos[appName];
    if (typeof appOptionsOrUrl === "string") {
      if (appInfo) {
        appInfo = __spreadProps(__spreadValues({}, appInfo), {
          entry: appOptionsOrUrl
        });
      } else {
        appInfo = {
          name: appName,
          basename: "/",
          entry: appOptionsOrUrl
        };
      }
    }
    if (isObject(appOptionsOrUrl)) {
      appInfo = getAppConfig(appInfo || {}, appOptionsOrUrl);
    }
    appInfo = getAppConfig(garfish.options, appInfo || {});
    appInfo.name = appName;
    assert(appInfo.entry, `Can't load unexpected child app "${appName}", Please provide the entry parameters or registered in advance of the app.`);
    return appInfo;
  };
  var createDefaultOptions = (nested = false) => {
    const config = {
      appID: "",
      apps: [],
      autoRefreshApp: true,
      disableStatistics: false,
      disablePreloadApp: false,
      basename: "/",
      props: {},
      domGetter: () => document.createElement("div"),
      sandbox: {
        snapshot: false,
        disableWith: false,
        strictIsolation: false
      },
      beforeLoad: () => {
      },
      afterLoad: () => {
      },
      errorLoadApp: (e) => error(e),
      onNotMatchRouter: () => {
      },
      beforeEval: () => {
      },
      afterEval: () => {
      },
      beforeMount: () => {
      },
      afterMount: () => {
      },
      beforeUnmount: () => {
      },
      afterUnmount: () => {
      },
      errorMountApp: (e) => error(e),
      errorUnmountApp: (e) => error(e),
      customLoader: null
    };
    if (nested) {
      invalidNestedAttrs.forEach((key) => delete config[key]);
    }
    return config;
  };

  // ../core/src/module/app.ts
  var appId = 0;
  var __GARFISH_EXPORTS__ = "__GARFISH_EXPORTS__";
  var __GARFISH_GLOBAL_ENV__ = "__GARFISH_GLOBAL_ENV__";
  var App = class {
    constructor(context, appInfo, entryManager, resources, isHtmlMode, customLoader) {
      this.appId = appId++;
      this.display = false;
      this.mounted = false;
      this.esModule = false;
      this.strictIsolation = false;
      this.global = window;
      this.customExports = {};
      this.sourceList = [];
      this.active = false;
      this.mounting = false;
      this.unmounting = false;
      this.context = context;
      this.appInfo = appInfo;
      this.name = appInfo.name;
      this.resources = resources;
      this.isHtmlMode = isHtmlMode;
      this.entryManager = entryManager;
      this.appInfo.appId = this.appId;
      this.globalEnvVariables = {
        currentApp: this,
        loader: context.loader,
        externals: context.externals,
        remoteModulesCode: resources.modules
      };
      this.cjsModules = {
        exports: {},
        module: null,
        [__GARFISH_EXPORTS__]: this.customExports,
        [__GARFISH_GLOBAL_ENV__]: this.globalEnvVariables,
        require: (key) => {
          return this.global[key] || context.externals[key] || window[key];
        }
      };
      this.cjsModules.module = this.cjsModules;
      this.customLoader = customLoader;
      this.hooks = appLifecycle();
      this.hooks.usePlugin(__spreadProps(__spreadValues({}, appInfo), {
        name: `${appInfo.name}-lifecycle`
      }));
      const nodes = entryManager.getNodesByTagName(...sourceListTags);
      for (const key in nodes) {
        nodes[key].forEach((node) => {
          const url = entryManager.findAttributeValue(node, "href") || entryManager.findAttributeValue(node, "src");
          if (url) {
            this.sourceList.push({
              tagName: node.tagName,
              url: transformUrl(entryManager.url, url)
            });
          }
        });
      }
      this.sourceList.push({ tagName: "html", url: this.appInfo.entry });
    }
    get rootElement() {
      return findTarget(this.htmlNode, ["body", `div[${__MockBody__}]`]);
    }
    getProvider() {
      return this.provider ? Promise.resolve(this.provider) : this.checkAndGetProvider();
    }
    execScript(code, env, url, options) {
      env = __spreadValues(__spreadValues({}, env || {}), this.getExecScriptEnv(options == null ? void 0 : options.noEntry));
      const args = [this.appInfo, code, env, url, options];
      this.hooks.lifecycle.beforeEval.emit(...args);
      try {
        this.runCode(code, env, url, options);
      } catch (e) {
        this.hooks.lifecycle.errorExecCode.emit(e, ...args);
        throw e;
      }
      this.hooks.lifecycle.afterEval.emit(...args);
    }
    runCode(code, env, url, options) {
      const revertCurrentScript = setDocCurrentScript(this.global.document, code, true, url, options == null ? void 0 : options.async);
      code += url ? `
//# sourceURL=${url}
` : "";
      if (!hasOwn(env, "window")) {
        env = __spreadProps(__spreadValues({}, env), {
          window: this.global
        });
      }
      evalWithEnv(`;${code}`, env, this.global);
      revertCurrentScript();
    }
    async show() {
      this.active = true;
      const { display, mounted, provider } = this;
      if (display)
        return false;
      if (!mounted) {
        (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn('Need to call the "app.mount()" method first.');
        return false;
      }
      this.hooks.lifecycle.beforeMount.emit(this.appInfo, this, true);
      await this.addContainer();
      this.callRender(provider, false);
      this.display = true;
      this.context.activeApps.push(this);
      this.hooks.lifecycle.afterMount.emit(this.appInfo, this, true);
      return true;
    }
    hide() {
      this.active = false;
      const { display, mounted, provider } = this;
      if (!display)
        return false;
      if (!mounted) {
        (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn('Need to call the "app.mount()" method first.');
        return false;
      }
      this.hooks.lifecycle.beforeUnmount.emit(this.appInfo, this, true);
      this.callDestroy(provider, false);
      this.display = false;
      remove(this.context.activeApps, this);
      this.hooks.lifecycle.afterUnmount.emit(this.appInfo, this, true);
      return true;
    }
    async mount() {
      if (!this.canMount())
        return false;
      this.hooks.lifecycle.beforeMount.emit(this.appInfo, this, false);
      this.active = true;
      this.mounting = true;
      try {
        const asyncJsProcess = await this.compileAndRenderContainer();
        const provider = await this.getProvider();
        if (!this.stopMountAndClearEffect())
          return false;
        this.callRender(provider, true);
        this.display = true;
        this.mounted = true;
        this.context.activeApps.push(this);
        this.hooks.lifecycle.afterMount.emit(this.appInfo, this, false);
        await asyncJsProcess;
        if (!this.stopMountAndClearEffect())
          return false;
      } catch (e) {
        this.entryManager.DOMApis.removeElement(this.appContainer);
        this.hooks.lifecycle.errorMountApp.emit(e, this.appInfo);
        return false;
      } finally {
        this.mounting = false;
      }
      return true;
    }
    unmount() {
      this.active = false;
      if (!this.mounted || !this.appContainer) {
        return false;
      }
      if (this.unmounting) {
        (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn(`The ${this.name} app unmounting.`);
        return false;
      }
      this.unmounting = true;
      this.hooks.lifecycle.beforeUnmount.emit(this.appInfo, this, false);
      try {
        this.callDestroy(this.provider, true);
        this.display = false;
        this.mounted = false;
        this.provider = null;
        this.customExports = {};
        this.cjsModules.exports = {};
        remove(this.context.activeApps, this);
        this.hooks.lifecycle.afterUnmount.emit(this.appInfo, this, false);
      } catch (e) {
        remove(this.context.activeApps, this);
        this.entryManager.DOMApis.removeElement(this.appContainer);
        this.hooks.lifecycle.errorUnmountApp.emit(e, this.appInfo);
        return false;
      } finally {
        this.unmounting = false;
      }
      return true;
    }
    getExecScriptEnv(noEntry) {
      if (this.esModule)
        return {};
      if (noEntry) {
        return {
          require: this.cjsModules.require,
          [__GARFISH_EXPORTS__]: this.customExports,
          [__GARFISH_GLOBAL_ENV__]: this.globalEnvVariables
        };
      }
      return this.cjsModules;
    }
    async compileAndRenderContainer() {
      await this.renderTemplate();
      return new Promise((resolve) => {
        setTimeout(() => {
          if (this.stopMountAndClearEffect()) {
            for (const jsManager of this.resources.js) {
              if (jsManager.async) {
                try {
                  this.execScript(jsManager.scriptCode, {}, jsManager.url || this.appInfo.entry, {
                    async: false,
                    noEntry: true
                  });
                } catch (e) {
                  this.hooks.lifecycle.errorMountApp.emit(e, this.appInfo);
                }
              }
            }
          }
          resolve();
        });
      });
    }
    canMount() {
      if (this.mounting) {
        (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn(`The ${this.appInfo.name} app mounting.`);
        return false;
      }
      if (this.mounted) {
        (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn(`The ${this.appInfo.name} app already mounted.`);
        return false;
      }
      if (this.unmounting) {
        (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn(`The ${this.appInfo.name} app is unmounting can't Perform application rendering.`);
        return false;
      }
      return true;
    }
    stopMountAndClearEffect() {
      if (!this.active) {
        if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
          warn(`The app "${this.name}" rendering process has been blocked.`);
        }
        this.mounting = false;
        if (this.appContainer) {
          this.entryManager.DOMApis.removeElement(this.appContainer);
        }
        return false;
      }
      return true;
    }
    callRender(provider, isMount) {
      const { appInfo, rootElement } = this;
      if (provider && provider.render) {
        provider.render({
          dom: rootElement,
          basename: appInfo.basename,
          appRenderInfo: { isMount }
        });
      }
    }
    callDestroy(provider, isUnmount) {
      const { rootElement, appContainer } = this;
      if (provider && provider.destroy) {
        provider.destroy({
          dom: rootElement,
          appRenderInfo: { isUnmount }
        });
      }
      this.entryManager.DOMApis.removeElement(appContainer);
    }
    async addContainer() {
      const wrapperNode = await getRenderNode(this.appInfo.domGetter);
      if (typeof wrapperNode.appendChild === "function") {
        wrapperNode.appendChild(this.appContainer);
      }
    }
    async renderTemplate() {
      const { appInfo, entryManager, resources } = this;
      const { url: baseUrl, DOMApis: DOMApis2 } = entryManager;
      const { htmlNode, appContainer } = createAppContainer(appInfo);
      this.htmlNode = htmlNode;
      this.appContainer = appContainer;
      await this.addContainer();
      const customRenderer = {
        meta: () => null,
        img: (node) => {
          entryManager.toResolveUrl(node, "src", baseUrl);
          return DOMApis2.createElement(node);
        },
        video: (node) => {
          entryManager.toResolveUrl(node, "src", baseUrl);
          return DOMApis2.createElement(node);
        },
        audio: (node) => {
          entryManager.toResolveUrl(node, "src", baseUrl);
          return DOMApis2.createElement(node);
        },
        body: (node) => {
          if (!this.strictIsolation) {
            node = entryManager.cloneNode(node);
            node.tagName = "div";
            node.attributes.push({
              key: __MockBody__,
              value: null
            });
          }
          return DOMApis2.createElement(node);
        },
        head: (node) => {
          if (!this.strictIsolation) {
            node = entryManager.cloneNode(node);
            node.tagName = "div";
            node.attributes.push({
              key: __MockHead__,
              value: null
            });
          }
          return DOMApis2.createElement(node);
        },
        script: (node) => {
          const mimeType = entryManager.findAttributeValue(node, "type");
          if (mimeType) {
            if (!isJs(parseContentType(mimeType))) {
              return DOMApis2.createElement(node);
            }
          }
          const jsManager = resources.js.find((manager) => {
            return !manager.async ? manager.isSameOrigin(node) : false;
          });
          if (jsManager) {
            if (jsManager.isModule()) {
              warn('Garfish does not support "esmodule" at the moment,if you use "vite", please switch to other build tools.');
              return DOMApis2.createElement(node);
            }
            const { url, scriptCode } = jsManager;
            this.execScript(scriptCode, {}, url || this.appInfo.entry, {
              async: false,
              noEntry: toBoolean(entryManager.findAttributeValue(node, "no-entry"))
            });
          } else if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
            const async = entryManager.findAttributeValue(node, "async");
            if (typeof async === "undefined" || async === "false") {
              const tipInfo = JSON.stringify(node, null, 2);
              warn(`Current js node cannot be found, the resource may not exist.

 ${tipInfo}`);
            }
          }
          return DOMApis2.createScriptCommentNode(node);
        },
        style: (node) => {
          const text = node.children[0];
          if (text) {
            const styleManager = new StyleManager(text.content);
            styleManager.correctPath(baseUrl);
            return entryManager.ignoreChildNodesCreation(styleManager.renderAsStyleElement());
          }
          return DOMApis2.createElement(node);
        },
        link: (node) => {
          if (DOMApis2.isCssLinkNode(node)) {
            const styleManager = this.resources.link.find((manager) => manager.isSameOrigin(node));
            if (styleManager) {
              return styleManager.renderAsStyleElement((typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) ? `
/*${DOMApis2.createLinkCommentNode(node)}*/
` : "");
            }
          }
          return DOMApis2.isPrefetchJsLinkNode(node) ? DOMApis2.createScriptCommentNode(node) : DOMApis2.isIconLinkNode(node) ? null : DOMApis2.createElement(node);
        }
      };
      entryManager.createElements(customRenderer, htmlNode);
    }
    async checkAndGetProvider() {
      const { appInfo, rootElement, cjsModules, customExports } = this;
      const { props, basename } = appInfo;
      let provider = null;
      if (cjsModules.exports) {
        if (isPromise(cjsModules.exports))
          cjsModules.exports = await cjsModules.exports;
        if (cjsModules.exports.provider)
          provider = cjsModules.exports.provider;
      }
      if (customExports.provider) {
        provider = customExports.provider;
      }
      if (typeof provider === "function") {
        provider = await provider(__spreadValues(__spreadValues({
          basename,
          dom: rootElement
        }, props || {}), appInfo.props || {}));
      } else if (isPromise(provider)) {
        provider = await provider;
      }
      if (!isObject(provider) && typeof provider !== "function") {
        warn(` Invalid module content: ${appInfo.name}, you should return both render and destroy functions in provider function.`);
      }
      const hookRes = await (this.customLoader && this.customLoader(provider, appInfo, basename));
      if (hookRes) {
        const { mount, unmount } = hookRes || {};
        if (typeof mount === "function" && typeof unmount === "function") {
          mount._custom = true;
          unmount._custom = true;
          provider.render = mount;
          provider.destroy = unmount;
        }
      }
      if (!appInfo.noCheckProvider) {
        assert(provider, `"provider" is "${provider}".`);
        assert("render" in provider, '"render" is required in provider.');
        assert("destroy" in provider, '"destroy" is required in provider.');
      }
      this.provider = provider;
      return provider;
    }
  };

  // ../core/src/module/resource.ts
  function fetchStaticResources(appName, loader, entryManager) {
    const isAsync = (val) => typeof val !== "undefined" && val !== "false";
    const jsNodes = Promise.all(entryManager.findAllJsNodes().map((node) => {
      const src = entryManager.findAttributeValue(node, "src");
      const type = entryManager.findAttributeValue(node, "type");
      if (src) {
        const fetchUrl = transformUrl(entryManager.url, src);
        const async = entryManager.findAttributeValue(node, "async");
        return loader.load(appName, fetchUrl).then(({ resourceManager: jsManager }) => {
          jsManager.setDep(node);
          jsManager.setMimeType(type);
          jsManager.setAsyncAttribute(isAsync(async));
          return jsManager;
        }).catch(() => null);
      } else if (node.children.length > 0) {
        const code = node.children[0].content;
        if (code) {
          const jsManager = new JavaScriptManager(code, "");
          jsManager.setDep(node);
          jsManager.setMimeType(type);
          return jsManager;
        }
      }
    }).filter(Boolean));
    const linkNodes = Promise.all(entryManager.findAllLinkNodes().map((node) => {
      if (!entryManager.DOMApis.isCssLinkNode(node))
        return;
      const href = entryManager.findAttributeValue(node, "href");
      if (href) {
        const fetchUrl = transformUrl(entryManager.url, href);
        return loader.load(appName, fetchUrl).then(({ resourceManager: styleManager }) => {
          styleManager.setDep(node);
          styleManager.correctPath();
          return styleManager;
        }).catch(() => null);
      }
    }).filter(Boolean));
    const metaNodes = Promise.all(entryManager.findAllMetaNodes().map((node) => {
      if (!entryManager.DOMApis.isRemoteModule(node))
        return;
      const async = entryManager.findAttributeValue(node, "async");
      const alias = entryManager.findAttributeValue(node, "alias");
      if (!isAsync(async)) {
        const src = entryManager.findAttributeValue(node, "src");
        return loader.loadModule(src).then(({ resourceManager: moduleManager }) => {
          moduleManager.setAlias(alias);
          return moduleManager;
        }).catch(() => null);
      } else if (alias) {
        warn(`Asynchronous loading module, the alias "${alias}" is invalid.`);
      }
    }).filter(Boolean));
    return Promise.all([jsNodes, linkNodes, metaNodes]).then((ls) => ls.map((ns2) => ns2.filter(Boolean)));
  }
  async function processAppResources(loader, appInfo) {
    let isHtmlMode, fakeEntryManager;
    const resources = { js: [], link: [], modules: [] };
    const { resourceManager: entryManager } = await loader.load(appInfo.name, transformUrl(location.href, appInfo.entry));
    if (entryManager instanceof TemplateManager) {
      isHtmlMode = true;
      const [js, link, modules] = await fetchStaticResources(appInfo.name, loader, entryManager);
      resources.js = js;
      resources.link = link;
      resources.modules = modules;
    } else if (entryManager instanceof JavaScriptManager) {
      isHtmlMode = false;
      const mockTemplateCode = `<script src="${entryManager.url}"><\/script>`;
      fakeEntryManager = new TemplateManager(mockTemplateCode, entryManager.url);
      entryManager.setDep(fakeEntryManager.findAllJsNodes()[0]);
      resources.js = [entryManager];
    } else {
      error(`Entrance wrong type of resource of "${appInfo.name}".`);
    }
    return [fakeEntryManager || entryManager, resources, isHtmlMode];
  }

  // ../core/src/plugins/fixHMR.ts
  function GarfishHMRPlugin() {
    let hasInit = false;
    let isHotUpdate = false;
    return function(Garfish2) {
      return {
        name: "fix-hmr",
        version: "1.0.17",
        bootstrap() {
          if (hasInit)
            return;
          hasInit = true;
          const webpackHotUpdate = window.webpackHotUpdate;
          if (typeof webpackHotUpdate === "function") {
            window.webpackHotUpdate = function() {
              isHotUpdate = true;
              return webpackHotUpdate.apply(this, arguments);
            };
            const observer = new MutationObserver(() => {
              if (!isHotUpdate)
                return;
              isHotUpdate = false;
              Garfish2.activeApps.forEach((app) => {
                if (app.mounted) {
                  app.display && app.hide();
                  app.show();
                }
              });
            });
            observer.observe(document.documentElement, {
              subtree: true,
              childList: true,
              attributes: true
            });
          }
        }
      };
    };
  }

  // ../core/src/plugins/lifecycle.ts
  function GarfishOptionsLife(options, name) {
    return function() {
      return __spreadValues({
        name,
        version: "1.0.17"
      }, options);
    };
  }

  // ../core/src/plugins/preload.ts
  var storageKey = "__garfishPreloadApp__";
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  var isSlowNetwork = () => navigator.connection ? navigator.connection.saveData || /(2|3)g/.test(navigator.connection.effectiveType) : false;
  var idleCallback = window.requestIdleCallback || window.requestAnimationFrame;
  var requestIdleCallback = typeof idleCallback !== "function" ? window.setTimeout : idleCallback;
  var requestQueue = {
    fx: [],
    init: true,
    lock: false,
    add(fn) {
      this.fx.push(fn);
      if (this.init) {
        this.lock = false;
        this.init = false;
        this.next();
      }
    },
    next() {
      if (!this.lock) {
        this.lock = true;
        if (this.fx.length === 0) {
          this.init = true;
        }
        const fn = this.fx.shift();
        if (fn) {
          fn(() => {
            this.lock = false;
            this.next();
          });
        }
      }
    }
  };
  function safeLoad(loader, appName, url, isModule2, callback) {
    requestQueue.add((next) => {
      const throwWarn = (e) => {
        next();
        if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
          warn(e);
          warn(`Preload failed. "${url}"`);
        }
      };
      const success = ({ resourceManager }) => {
        callback && callback(resourceManager);
        setTimeout(next, 500);
      };
      requestIdleCallback(() => {
        try {
          if (isModule2) {
            loader.loadModule(url).then(success, throwWarn);
          } else {
            loader.load(appName, url).then(success, throwWarn);
          }
        } catch (e) {
          throwWarn(e);
        }
      });
    });
  }
  function loadAppResource(loader, info) {
    false;
    const fetchUrl = transformUrl(location.href, info.entry);
    safeLoad(loader, info.name, fetchUrl, false, (manager) => {
      requestIdleCallback(() => {
        if (manager instanceof TemplateManager) {
          const baseUrl = manager.url;
          const jsNodes = manager.findAllJsNodes();
          const linkNodes = manager.findAllLinkNodes();
          const metaNodes = manager.findAllMetaNodes();
          if (jsNodes) {
            jsNodes.forEach((node) => {
              const src = manager.findAttributeValue(node, "src");
              src && safeLoad(loader, info.name, transformUrl(baseUrl, src), false);
            });
          }
          if (linkNodes) {
            linkNodes.forEach((node) => {
              if (manager.DOMApis.isCssLinkNode(node)) {
                const href = manager.findAttributeValue(node, "href");
                href && safeLoad(loader, info.name, transformUrl(baseUrl, href), false);
              }
            });
          }
          if (metaNodes) {
            metaNodes.forEach((node) => {
              if (manager.DOMApis.isRemoteModule(node)) {
                const src = manager.findAttributeValue(node, "src");
                if (isAbsolute(src)) {
                  safeLoad(loader, info.name, src, true);
                } else {
                  warn(`The loading of the remote module must be an absolute path. "${src}"`);
                }
              }
            });
          }
        }
      });
    });
  }
  function getRanking() {
    const str = localStorage.getItem(storageKey);
    if (str) {
      const data = JSON.parse(str);
      return data.sort((a, b) => b.count - a.count);
    }
    return [];
  }
  function setRanking(appName) {
    const str = localStorage.getItem(storageKey);
    const newCurrent = { appName, count: 1 };
    if (!str) {
      localStorage.setItem(storageKey, JSON.stringify([newCurrent]));
    } else {
      const data = JSON.parse(str);
      const current = data.find((app) => app.appName === appName);
      current ? current.count++ : data.push(newCurrent);
      localStorage.setItem(storageKey, JSON.stringify(data));
    }
  }
  var loadedMap = Object.create(null);
  function GarfishPreloadPlugin() {
    return function(Garfish2) {
      return {
        name: "preload",
        version: "1.0.17",
        beforeLoad(appInfo) {
          setRanking(appInfo.name);
          return Promise.resolve(true);
        },
        registerApp(appInfos) {
          setTimeout(() => {
            if (isMobile || isSlowNetwork())
              return;
            const ranking = getRanking();
            for (const { appName } of ranking) {
              if (appInfos[appName] && !loadedMap[appName]) {
                loadedMap[appName] = true;
                loadAppResource(Garfish2.loader, appInfos[appName]);
              }
            }
            for (const key in appInfos) {
              if (!loadedMap[key]) {
                loadAppResource(Garfish2.loader, appInfos[key]);
              }
            }
          }, false ? 0 : 5e3);
        }
      };
    };
  }

  // ../core/src/plugins/performance/subAppObserver.ts
  var SubAppObserver = class {
    constructor(options) {
      this.observer = new MutationObserver(this._mutationObserverCallback.bind(this));
      this.subAppBeforeLoadTime = 0;
      this.subAppBeforeMountTime = 0;
      this.subAppStartPageShowTime = 0;
      this.subAppPageShowTime = 0;
      this.entry = "";
      this.observeTimer = 0;
      this.dataTimer = 0;
      this.domQuerySelector = options.subAppRootSelector;
      this.config = { attributes: true, childList: true, subtree: true };
      this.targetSubscriber = [];
      this.timeLag = options.domObserverMaxTime || 3e3;
      this.reportTimeLag = options.waitSubAppNotifyMaxTime || 1e4;
      this.isRecordFinish = false;
      this.cbEntryList = [];
      this.isStartShowFlag = true;
      this.isCallBackFinish = false;
      this.isSubAppNotifyFinish = false;
      this.finishAction = "";
      this.performanceData = {
        resourceLoadTime: 0,
        blankScreenTime: 0,
        firstScreenTime: 0,
        isFirstRender: true,
        entry: "",
        action: ""
      };
    }
    subscribePerformanceData(callback) {
      try {
        this.targetSubscriber.push(callback);
      } catch (e) {
        warn(e);
      }
    }
    subscribePerformanceDataOnce(callback) {
      try {
        const wrapCallback = (performanceData) => {
          callback(performanceData);
          this.unsubscribePerformanceData(wrapCallback);
        };
        this.targetSubscriber.push(wrapCallback);
      } catch (e) {
        warn(e);
      }
    }
    unsubscribePerformanceData(callback) {
      try {
        this.targetSubscriber = this.targetSubscriber.filter((sub) => sub === callback);
      } catch (e) {
        warn(e);
      }
    }
    subAppBeforeLoad(entry) {
      this.entry = entry;
      this.isRecordFinish = false;
      this.isSubAppNotifyFinish = false;
      this.subAppBeforeLoadTime = performance.now();
      this.isCallBackFinish = false;
      this._handleSubscribeCallback(false);
    }
    subAppBeforeMount() {
      this.subAppBeforeMountTime = performance.now();
      this._subAppStartObserver();
    }
    subAppUnmount() {
      if (!this.isRecordFinish) {
        this._subAppEndObserver("subAppUnmount");
      }
      this._handleSubscribeCallback(true);
    }
    afterRenderNotify() {
      if (!this.isRecordFinish) {
        this._subAppEndObserver("SubAppRenderNotify");
      } else if (!this.isSubAppNotifyFinish) {
        this.isSubAppNotifyFinish = true;
        this.isRecordFinish = true;
        this.finishAction = "SubAppRenderNotify";
        this._subAppPerformanceDataHandle();
      }
    }
    _mutationObserverCallback() {
      if (this.isStartShowFlag) {
        this.subAppStartPageShowTime = performance.now();
        this.isStartShowFlag = false;
      }
      clearTimeout(this.observeTimer);
      this.observeTimer = setTimeout(() => {
        clearTimeout(this.observeTimer);
        if (!this.isRecordFinish) {
          this._subAppEndObserver("MutationObserver");
        }
      }, this.timeLag);
    }
    _subAppEndObserver(finishAction) {
      this.isRecordFinish = true;
      this.finishAction = finishAction;
      this.subAppPageShowTime = performance.now();
      this.observer.disconnect();
      this._subAppPerformanceDataHandle();
      this.isStartShowFlag = true;
    }
    _subAppStartObserver() {
      try {
        const targetNode = typeof this.domQuerySelector === "string" ? document.querySelector(this.domQuerySelector) : this.domQuerySelector;
        this.observer.observe(targetNode, this.config);
        this._subAppClickEventObserver(targetNode);
      } catch (e) {
        warn(e);
      }
    }
    _subAppPerformanceDataHandle() {
      const timeDifference = this.finishAction === "MutationObserver" ? this.timeLag : 0;
      this.performanceData = {
        resourceLoadTime: this.subAppBeforeMountTime - this.subAppBeforeLoadTime,
        blankScreenTime: this.subAppStartPageShowTime - this.subAppBeforeLoadTime,
        firstScreenTime: this.subAppPageShowTime - this.subAppBeforeLoadTime - timeDifference,
        isFirstRender: this.cbEntryList.indexOf(this.entry) === -1,
        entry: this.entry,
        action: this.finishAction
      };
    }
    _subAppClickEventObserver(targetNode) {
      const eventCallback = () => {
        clearTimeout(this.observeTimer);
        if (!this.isRecordFinish) {
          this._subAppEndObserver("UserEvent");
        }
      };
      targetNode.addEventListener("click", eventCallback);
      targetNode.addEventListener("keyup", eventCallback);
      targetNode.addEventListener("keydown", eventCallback);
      targetNode.addEventListener("keypress", eventCallback);
    }
    _handleCallback() {
      try {
        this.isCallBackFinish = true;
        this.targetSubscriber.forEach((callback) => {
          const {
            firstScreenTime,
            blankScreenTime,
            resourceLoadTime,
            action,
            entry
          } = this.performanceData;
          if (firstScreenTime > 0 && blankScreenTime > 0 && resourceLoadTime > 0 && action && entry) {
            if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
              console.warn("SUCCESS: ", this.performanceData);
            }
            this.cbEntryList.push(this.entry);
            callback(this.performanceData);
          } else if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
            console.warn("ERROR: ", this.performanceData);
          }
        });
      } catch (e) {
        warn(e);
      }
    }
    _handleSubscribeCallback(isImmediately) {
      try {
        clearTimeout(this.dataTimer);
        if (isImmediately && !this.isCallBackFinish) {
          this._handleCallback();
        } else {
          this.dataTimer = setTimeout(() => {
            this._handleCallback();
          }, this.reportTimeLag);
        }
      } catch (e) {
        warn(e);
      }
    }
  };

  // ../core/src/plugins/performance/index.ts
  function GarfishPerformance() {
    return function() {
      const subAppMap = {};
      return {
        name: "performance",
        async beforeLoad(appInfo) {
          if (!subAppMap[appInfo.name]) {
            let appDomGetter = appInfo.domGetter;
            if (typeof appInfo.domGetter === "function") {
              appDomGetter = await appInfo.domGetter();
            }
            subAppMap[appInfo.name] = new SubAppObserver({
              subAppRootSelector: appDomGetter
            });
          }
          subAppMap[appInfo.name].subAppBeforeLoad(appInfo.entry);
          return true;
        },
        afterLoad(appInfo, appInstance) {
          if (appInstance) {
            appInstance.appPerformance = subAppMap[appInfo.name];
          }
        },
        beforeMount(appInfo) {
          subAppMap[appInfo.name].subAppBeforeMount(appInfo.entry);
        },
        beforeUnmount(appInfo) {
          subAppMap[appInfo.name].subAppUnmount(appInfo.entry);
        }
      };
    };
  }

  // ../core/src/garfish.ts
  var numberOfNesting = 0;
  var DEFAULT_PROPS = new WeakMap();
  var HOOKS_API = { SyncHook, AsyncHook };
  var Garfish = class extends import_eventemitter2.EventEmitter2 {
    constructor(options) {
      super();
      this.running = false;
      this.version = "1.0.17";
      this.flag = __GARFISH_FLAG__;
      this.loader = new Loader();
      this.hooks = globalLifecycle();
      this.channel = new import_eventemitter2.EventEmitter2();
      this.options = createDefaultOptions();
      this.externals = {};
      this.activeApps = [];
      this.plugins = {};
      this.cacheApps = {};
      this.appInfos = {};
      this.nestedSwitch = false;
      this.loading = {};
      var _a;
      this.setOptions(options);
      DEFAULT_PROPS.set(this, {});
      (_a = this.options.plugins) == null ? void 0 : _a.forEach((plugin) => this.usePlugin(plugin));
    }
    get props() {
      return this.options && this.options.props || DEFAULT_PROPS.get(this);
    }
    setOptions(options) {
      assert(!this.running, "Garfish is running, can`t set options");
      if (isPlainObject(options)) {
        this.options = deepMergeConfig(this.options, options);
      }
      return this;
    }
    createPluginSystem(callback) {
      const hooks = callback(HOOKS_API);
      return new PluginSystem(hooks);
    }
    usePlugin(plugin, ...args) {
      if (!this.nestedSwitch) {
        assert(!this.running, "Cannot register plugin after Garfish is started.");
      }
      assert(typeof plugin === "function", "Plugin must be a function.");
      args.unshift(this);
      const pluginConfig = plugin.apply(null, args);
      assert(pluginConfig.name, "The plugin must have a name.");
      if (!this.plugins[pluginConfig.name]) {
        this.plugins[pluginConfig.name] = pluginConfig;
        this.hooks.usePlugin(pluginConfig);
      } else if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
        warn("Please do not register the plugin repeatedly.");
      }
      return this;
    }
    run(options = {}) {
      var _a, _b;
      if (this.running) {
        if (options.nested) {
          numberOfNesting++;
          const mainOptions = createDefaultOptions(true);
          options = deepMergeConfig(mainOptions, options);
          options = filterNestedConfig(this, options, numberOfNesting);
          this.nestedSwitch = true;
          (_a = options.plugins) == null ? void 0 : _a.forEach((plugin) => this.usePlugin(plugin));
          this.usePlugin(GarfishOptionsLife(options, `nested-lifecycle-${numberOfNesting}`));
          this.nestedSwitch = false;
          if (options.apps) {
            this.registerApp(options.apps.map((appInfo) => {
              const appConf = deepMergeConfig(options, appInfo);
              appConf.nested = numberOfNesting;
              appConf.sandbox = this.options.sandbox;
              return appConf;
            }));
          }
        } else if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
          warn("Garfish is already running now, Cannot run Garfish repeatedly.");
        }
        return this;
      }
      this.setOptions(options);
      this.usePlugin(GarfishHMRPlugin());
      this.usePlugin(GarfishPerformance());
      if (!this.options.disablePreloadApp) {
        this.usePlugin(GarfishPreloadPlugin());
      }
      (_b = options.plugins) == null ? void 0 : _b.forEach((plugin) => this.usePlugin(plugin, this));
      this.usePlugin(GarfishOptionsLife(this.options, "global-lifecycle"));
      this.hooks.lifecycle.beforeBootstrap.emit(this.options);
      this.running = true;
      this.registerApp(this.options.apps || []);
      this.hooks.lifecycle.bootstrap.emit(this.options);
      return this;
    }
    registerApp(list) {
      const currentAdds = {};
      this.hooks.lifecycle.beforeRegisterApp.emit(list);
      if (!Array.isArray(list))
        list = [list];
      for (const appInfo of list) {
        assert(appInfo.name, "Miss app.name.");
        if (!this.appInfos[appInfo.name]) {
          assert(appInfo.entry, `${appInfo.name} application entry is not url: ${appInfo.entry}`);
          currentAdds[appInfo.name] = appInfo;
          this.appInfos[appInfo.name] = appInfo;
        } else if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
          warn(`The "${appInfo.name}" app is already registered.`);
        }
      }
      this.hooks.lifecycle.registerApp.emit(currentAdds);
      return this;
    }
    setExternal(nameOrExtObj, value2) {
      assert(nameOrExtObj, "Invalid parameter.");
      if (typeof nameOrExtObj === "object") {
        for (const key in nameOrExtObj) {
          if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
            this.externals[key] && warn(`The "${key}" will be overwritten in external.`);
          }
          this.externals[key] = nameOrExtObj[key];
        }
      } else {
        this.externals[nameOrExtObj] = value2;
      }
      return this;
    }
    async loadApp(appName, optionsOrUrl) {
      assert(appName, "Miss appName.");
      const appInfo = generateAppOptions(appName, this, optionsOrUrl);
      const asyncLoadProcess = async () => {
        const stop = await this.hooks.lifecycle.beforeLoad.emit(appInfo);
        if (stop === false) {
          warn(`Load ${appName} application is terminated by beforeLoad.`);
          return null;
        }
        let appInstance = null;
        const cacheApp = this.cacheApps[appName];
        if (appInfo.cache && cacheApp) {
          appInstance = cacheApp;
          this.loading[appName] = null;
        } else {
          try {
            const [manager, resources, isHtmlMode] = await processAppResources(this.loader, appInfo);
            appInstance = new App(this, appInfo, manager, resources, isHtmlMode, appInfo.customLoader);
            for (const key in this.plugins) {
              appInstance.hooks.usePlugin(this.plugins[key]);
            }
            if (appInfo.cache) {
              this.cacheApps[appName] = appInstance;
            }
          } catch (e) {
            (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn(e);
            this.hooks.lifecycle.errorLoadApp.emit(e, appInfo);
          } finally {
            this.loading[appName] = null;
          }
        }
        this.hooks.lifecycle.afterLoad.emit(appInfo, appInstance);
        return appInstance;
      };
      if (!this.loading[appName]) {
        this.loading[appName] = asyncLoadProcess();
      }
      return this.loading[appName];
    }
  };

  // ../router/src/utils/urlUt.ts
  function parseQuery(query = "") {
    const res = {};
    if (query) {
      query.slice(1).split("&").map((item) => {
        const pairs = item.split("=");
        res[pairs[0]] = pairs;
      });
    }
    return res;
  }
  function getPath(basename = "/", pathname) {
    if (basename === "/" || basename === "") {
      return pathname || location.pathname;
    } else {
      return (pathname || location.pathname).replace(new RegExp(`^/?${basename}`), "");
    }
  }
  function getAppRootPath(appInfo) {
    const path = getPath(appInfo.basename, location.pathname);
    let appRootPath = appInfo.basename === "/" ? "" : appInfo.basename;
    if (typeof appInfo.activeWhen === "string") {
      appRootPath += appInfo.activeWhen;
    } else {
      appRootPath += path.split("").reduce((pre, next) => {
        if (typeof appInfo.activeWhen === "function" && !appInfo.activeWhen(pre))
          return pre + next;
        return pre;
      }, "");
    }
    return appRootPath;
  }

  // ../router/src/utils/index.ts
  async function asyncForEach(arr, callback) {
    const length = arr.length;
    let k = 0;
    while (k < length) {
      const kValue = arr[k];
      await callback(kValue, k, arr);
      k++;
    }
  }
  function toMiddleWare(to, from, cb) {
    return new Promise((resolve, reject) => {
      try {
        cb(to, from, resolve);
      } catch (err) {
        reject(err);
      }
    });
  }
  function createEvent(type) {
    let e;
    if (navigator.userAgent.indexOf("MSIE") !== -1 || navigator.appVersion.indexOf("Trident/") > 0) {
      e = document.createEvent("UIEvents");
      e.initUIEvent(type.toLowerCase(), true, false, window, 0);
    } else {
      e = new Event(type.toLowerCase());
    }
    return e;
  }

  // ../router/src/config.ts
  var __GARFISH_ROUTER_UPDATE_FLAG__ = "__GARFISH_ROUTER_UPDATE_FLAG__";
  var __GARFISH_ROUTER_FLAG__ = "__GARFISH_ROUTER_FLAG__";
  var __GARFISH_BEFORE_ROUTER_EVENT__ = "garfish:before-routing-event";
  var RouterConfig = {
    basename: "",
    current: {
      fullPath: "/",
      path: "/",
      matched: [],
      query: {},
      state: {}
    },
    apps: [],
    beforeEach: (to, from, next) => next(),
    afterEach: (to, from, next) => next(),
    active: () => Promise.resolve(),
    deactive: () => Promise.resolve(),
    routerChange: () => {
    },
    autoRefreshApp: true
  };
  function set(field, value2) {
    RouterConfig[field] = value2;
  }
  function setRouterConfig(options) {
    Object.assign(RouterConfig, options);
  }

  // ../router/src/utils/customEvent.ts
  var NativeCustomEvent = typeof global !== "undefined" ? global == null ? void 0 : global.CustomEvent : null;
  function useNative() {
    try {
      const p = new NativeCustomEvent("cat", { detail: { foo: "bar" } });
      return p.type === "cat" && p.detail.foo === "bar";
    } catch (e) {
    }
    return false;
  }
  var CustomEvent;
  if (NativeCustomEvent && useNative()) {
    CustomEvent = NativeCustomEvent;
  } else if (typeof document !== "undefined" && typeof document.createEvent === "function") {
    CustomEvent = function(type, params) {
      params = params || { bubbles: false, cancelable: false, detail: null };
      const evt = document.createEvent("CustomEvent");
      evt.initCustomEvent(type, params.bubbles || false, params.cancelable || false, params.detail || null);
      return evt;
    };
  } else {
    CustomEvent = function(type, params) {
      const e = document.createEventObject();
      e.type = type;
      if (params) {
        e.bubbles = Boolean(params.bubbles);
        e.cancelable = Boolean(params.cancelable);
        e.detail = params.detail;
      } else {
        e.bubbles = false;
        e.cancelable = false;
        e.detail = void 0;
      }
      return e;
    };
  }
  var customEvent_default = CustomEvent;

  // ../router/src/utils/navEvent.ts
  function createPopStateEvent(state, originalMethodName) {
    let evt;
    try {
      evt = new PopStateEvent("popstate", { state });
    } catch (err) {
      evt = document.createEvent("PopStateEvent");
      evt.initPopStateEvent("popstate", false, false, state);
    }
    evt.garfish = true;
    evt.garfishTrigger = originalMethodName;
    return evt;
  }
  var callCapturedEventListeners = (type) => {
    const eventArguments = createPopStateEvent(window.history.state, type);
    window.dispatchEvent(eventArguments);
  };
  var handlerParams = function(path, query, basename) {
    if (!path || typeof path !== "string")
      return "";
    let url = path;
    if (url[0] !== "/")
      url = "/" + url;
    if (Object.prototype.toString.call(query) === "[object Object]") {
      const qs = Object.keys(query).map((key) => `${key}=${query[key]}`).join("&");
      url += qs ? "?" + qs : "";
    }
    if (basename !== "/")
      url = basename + url;
    if (url[0] !== "/")
      url = "/" + url;
    return url;
  };
  var push = ({
    path,
    query,
    basename
  }) => {
    if (!basename)
      basename = RouterConfig.basename || "/";
    let url = null;
    if (validURL(path)) {
      url = /(^https?:)|(^\/\/)/.test(path) ? path : `//${path}`;
    } else {
      url = handlerParams(path, query, basename);
    }
    history.pushState(__spreadValues({ [__GARFISH_ROUTER_UPDATE_FLAG__]: true }, history.state), "", url);
  };
  var replace = ({
    path,
    query,
    basename
  }) => {
    if (!basename)
      basename = RouterConfig.basename || "/";
    let url = null;
    if (validURL(path)) {
      url = /^(https?:)(\/\/)/.test(path) ? path : `//${path}`;
    } else {
      url = handlerParams(path, query, basename);
    }
    history.replaceState(__spreadValues({ [__GARFISH_ROUTER_UPDATE_FLAG__]: true }, history.state), "", url);
  };

  // ../router/src/linkTo.ts
  var hasActive = (activeWhen, path) => {
    if (typeof activeWhen === "string") {
      if (activeWhen[0] !== "/")
        activeWhen = `/${activeWhen}`;
      if (activeWhen === "/" && path === activeWhen)
        return true;
      const activeWhenArr = activeWhen.split("/");
      const pathArr = path.split("/");
      let flag = true;
      activeWhenArr.forEach((pathItem, index) => {
        if (pathItem && pathItem !== pathArr[index]) {
          flag = false;
        }
      });
      return flag;
    } else {
      return activeWhen(path);
    }
  };
  var linkTo = async ({
    toRouterInfo,
    fromRouterInfo,
    eventType
  }) => {
    const {
      current,
      apps,
      deactive,
      active,
      notMatch,
      beforeEach: beforeEach2,
      afterEach: afterEach2,
      autoRefreshApp
    } = RouterConfig;
    const deactiveApps = current.matched.filter((appInfo) => !hasActive(appInfo.activeWhen, getPath(appInfo.basename, location.pathname)));
    const activeApps = apps.filter((appInfo) => {
      return hasActive(appInfo.activeWhen, getPath(appInfo.basename, location.pathname));
    });
    const needToActive = activeApps.filter(({ name }) => {
      return !current.matched.some(({ name: cName }) => name === cName);
    });
    const to = __spreadProps(__spreadValues({}, toRouterInfo), {
      matched: needToActive
    });
    const from = __spreadProps(__spreadValues({}, fromRouterInfo), {
      matched: deactiveApps
    });
    await toMiddleWare(to, from, beforeEach2);
    if (current.matched.length > 0) {
      await asyncForEach(deactiveApps, async (appInfo) => await deactive(appInfo, getPath(appInfo.basename, location.pathname)));
    }
    setRouterConfig({
      current: {
        path: location.pathname,
        fullPath: location.pathname,
        matched: activeApps,
        state: history.state,
        query: parseQuery(location.search)
      }
    });
    const curState = window.history.state || {};
    if (eventType !== "popstate" && (curState[__GARFISH_ROUTER_UPDATE_FLAG__] || autoRefreshApp)) {
      callCapturedEventListeners(eventType);
    }
    await asyncForEach(needToActive, async (appInfo) => {
      const appRootPath = getAppRootPath(appInfo);
      await active(appInfo, appRootPath);
    });
    if (activeApps.length === 0 && notMatch)
      notMatch(location.pathname);
    await toMiddleWare(to, from, afterEach2);
  };

  // ../router/src/agentRouter.ts
  var normalAgent = () => {
    const addRouterListener = function() {
      window.addEventListener(__GARFISH_BEFORE_ROUTER_EVENT__, function(env) {
        RouterConfig.routerChange && RouterConfig.routerChange(location.pathname);
        linkTo(env.detail);
      });
    };
    if (!window[__GARFISH_ROUTER_FLAG__]) {
      const rewrite = function(type) {
        const hapi = history[type];
        return function() {
          const urlBefore = window.location.pathname + window.location.hash;
          const stateBefore = history == null ? void 0 : history.state;
          const res = hapi.apply(this, arguments);
          const urlAfter = window.location.pathname + window.location.hash;
          const stateAfter = history == null ? void 0 : history.state;
          const e = createEvent(type);
          e.arguments = arguments;
          if (urlBefore !== urlAfter || stateBefore !== stateAfter) {
            if (history.state && history.state === "object")
              delete history.state[__GARFISH_ROUTER_UPDATE_FLAG__];
            window.dispatchEvent(new customEvent_default(__GARFISH_BEFORE_ROUTER_EVENT__, {
              detail: {
                toRouterInfo: {
                  fullPath: urlAfter,
                  query: parseQuery(location.search),
                  path: urlAfter,
                  state: stateAfter
                },
                fromRouterInfo: {
                  fullPath: urlBefore,
                  query: parseQuery(location.search),
                  path: urlBefore,
                  state: stateBefore
                },
                eventType: type
              }
            }));
          }
          return res;
        };
      };
      history.pushState = rewrite("pushState");
      history.replaceState = rewrite("replaceState");
      window.addEventListener("popstate", function(event) {
        if (event && typeof event === "object" && event.garfish)
          return;
        if (history.state && history.state === "object")
          delete history.state[__GARFISH_ROUTER_UPDATE_FLAG__];
        window.dispatchEvent(new customEvent_default(__GARFISH_BEFORE_ROUTER_EVENT__, {
          detail: {
            toRouterInfo: {
              fullPath: location.pathname,
              query: parseQuery(location.search),
              path: location.pathname
            },
            fromRouterInfo: {
              fullPath: RouterConfig.current.fullPath,
              path: RouterConfig.current.path,
              query: RouterConfig.current.query
            },
            eventType: "popstate"
          }
        }));
      }, false);
      window[__GARFISH_ROUTER_FLAG__] = true;
    }
    addRouterListener();
  };
  var initRedirect = () => {
    linkTo({
      toRouterInfo: {
        fullPath: location.pathname,
        path: location.pathname,
        query: parseQuery(location.search),
        state: history.state
      },
      fromRouterInfo: {
        fullPath: "/",
        path: "/",
        query: {},
        state: {}
      },
      eventType: "pushState"
    });
  };
  var listen = () => {
    normalAgent();
    initRedirect();
  };

  // ../router/src/context.ts
  var beforeEach = (hook) => {
    set("beforeEach", hook);
  };
  var afterEach = (hook) => {
    set("afterEach", hook);
  };
  var routerChange = (hook) => {
    set("routerChange", hook);
  };
  var registerRouter = (Apps) => {
    const unregisterApps = Apps.filter((app) => !RouterConfig.apps.some((item) => app.name === item.name));
    set("apps", RouterConfig.apps.concat(unregisterApps));
  };
  var listenRouterAndReDirect = ({
    apps,
    basename,
    autoRefreshApp,
    active,
    deactive,
    notMatch
  }) => {
    registerRouter(apps);
    setRouterConfig({
      basename,
      autoRefreshApp,
      active,
      deactive,
      notMatch
    });
    listen();
  };
  var Router = {
    push,
    replace,
    beforeEach,
    afterEach,
    registerRouter,
    routerChange,
    listenRouterAndReDirect,
    setRouterConfig,
    routerConfig: RouterConfig
  };
  var context_default = Router;

  // ../router/src/index.ts
  function GarfishRouter(_args) {
    return function(Garfish2) {
      Garfish2.apps = {};
      Garfish2.router = context_default;
      return {
        name: "router",
        version: "1.0.17",
        bootstrap(options) {
          let activeApp = null;
          const unmounts = {};
          const { basename } = options;
          const { autoRefreshApp = true, onNotMatchRouter = () => null } = Garfish2.options;
          async function active(appInfo, rootPath) {
            const { name, cache = true, active: active2 } = appInfo;
            if (active2)
              return active2(appInfo, rootPath);
            appInfo.rootPath = rootPath;
            const currentApp = activeApp = createKey();
            const app = await Garfish2.loadApp(appInfo.name, {
              basename: rootPath,
              entry: appInfo.entry,
              cache: true,
              domGetter: appInfo.domGetter
            });
            const call = (app2, isRender) => {
              if (!app2)
                return;
              const isDes = cache && app2.mounted;
              const fn = isRender ? app2[isDes ? "show" : "mount"] : app2[isDes ? "hide" : "unmount"];
              return fn.call(app2);
            };
            Garfish2.apps[name] = app;
            unmounts[name] = () => call(app, false);
            if (currentApp === activeApp) {
              await call(app, true);
            }
          }
          async function deactive(appInfo, rootPath) {
            activeApp = null;
            const { name, deactive: deactive2 } = appInfo;
            if (deactive2)
              return deactive2(appInfo, rootPath);
            const unmount = unmounts[name];
            unmount && unmount();
            delete Garfish2.apps[name];
            const needToDeleteApps = context_default.routerConfig.apps.filter((app) => {
              if (appInfo.rootPath === app.basename)
                return true;
            });
            if (needToDeleteApps.length > 0) {
              needToDeleteApps.forEach((app) => {
                delete Garfish2.appInfos[app.name];
                delete Garfish2.cacheApps[app.name];
              });
              context_default.setRouterConfig({
                apps: context_default.routerConfig.apps.filter((app) => {
                  return !needToDeleteApps.some((needDelete) => app.name === needDelete.name);
                })
              });
            }
          }
          const apps = Object.values(Garfish2.appInfos);
          const appList = apps.filter((app) => {
            if (!app.basename)
              app.basename = basename;
            return !!app.activeWhen;
          });
          const listenOptions = {
            basename,
            active,
            deactive,
            autoRefreshApp,
            notMatch: onNotMatchRouter,
            apps: appList
          };
          listenRouterAndReDirect(listenOptions);
        },
        registerApp(appInfos) {
          const appList = Object.values(appInfos);
          context_default.registerRouter(appList.filter((app) => !!app.activeWhen));
          if (!Garfish2.running)
            return;
          initRedirect();
        }
      };
    };
  }

  // ../browser-vm/src/symbolTypes.ts
  var GARFISH_NAMESPACE_PREFIX = "__Garfish__";
  var GARFISH_OPTIMIZE_NAME = "__garfish_optimize__";
  var __proxyNode__ = Symbol.for("garfish.proxyNode");
  var __domWrapper__ = Symbol.for("garfish.domWrapper");
  var __windowBind__ = Symbol.for("garfish.windowBind");
  var __sandboxMap__ = Symbol.for("garfish.sandboxMap");
  var __documentBind__ = Symbol.for("garfish.documentBind");
  var __garfishGlobal__ = Symbol.for("garfish.globalObject");
  var __elementSandboxTag__ = Symbol.for("garfish.elementSandboxTag");

  // ../browser-vm/src/utils.ts
  var esGlobalMethods = "eval,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Array,ArrayBuffer,BigInt,BigInt64Array,BigUint64Array,Boolean,DataView,Date,Error,EvalError,FinalizationRegistry,Float32Array,Float64Array,Function,Int8Array,Int16Array,Int32Array,Map,Number,Object,Promise,Proxy,RangeError,ReferenceError,RegExp,Set,SharedArrayBuffer,String,Symbol,SyntaxError,TypeError,Uint8Array,Uint8ClampedArray,Uint16Array,Uint32Array,URIError,WeakMap,WeakRef,WeakSet,Atomics,JSON,Math,Reflect".split(",");
  var isEsGlobalMethods = makeMap(esGlobalMethods);
  var optimizeMethods = [...esGlobalMethods].filter((v) => v !== "eval");
  var sandboxList = new Map();
  if (!window[__sandboxMap__]) {
    window[__sandboxMap__] = sandboxList;
  } else {
    sandboxList = window[__sandboxMap__];
  }
  var sandboxMap = {
    sandboxMap: sandboxList,
    get(element) {
      if (!element)
        return;
      const sandboxId = element[__elementSandboxTag__];
      if (typeof sandboxId !== "number")
        return;
      return this.sandboxMap.get(sandboxId);
    },
    setElementTag(element, sandbox) {
      if (!element)
        return;
      element[__elementSandboxTag__] = sandbox.id;
    },
    set(sandbox) {
      if (this.sandboxMap.get(sandbox.id))
        return;
      this.sandboxMap.set(sandbox.id, sandbox);
    },
    del(sandbox) {
      this.sandboxMap.delete(sandbox.id);
    }
  };
  function handlerParams2(args) {
    args = Array.isArray(args) ? args : Array.from(args);
    return args.map((v) => {
      return v && v[__proxyNode__] ? v[__proxyNode__] : v;
    });
  }
  function rootElm(sandbox) {
    const container = sandbox && sandbox.options.el;
    return container && container();
  }
  function createFakeObject(target, filter, isWritable) {
    const fakeObject = {};
    const propertyMap = {};
    const storageBox = Object.create(null);
    const propertyNames = Object.getOwnPropertyNames(target);
    const def2 = (p) => {
      const descriptor = Object.getOwnPropertyDescriptor(target, p);
      if (descriptor == null ? void 0 : descriptor.configurable) {
        const hasGetter = hasOwn(descriptor, "get");
        const hasSetter = hasOwn(descriptor, "set");
        const canWritable = typeof isWritable === "function" && isWritable(p);
        if (hasGetter) {
          descriptor.get = () => hasOwn(storageBox, p) ? storageBox[p] : target[p];
        }
        if (hasSetter) {
          descriptor.set = (val) => {
            storageBox[p] = val;
            return true;
          };
        }
        if (canWritable) {
          if (descriptor.writable === false) {
            descriptor.writable = true;
          } else if (hasGetter) {
            descriptor.set = (val) => {
              storageBox[p] = val;
              return true;
            };
          }
        }
        Object.defineProperty(fakeObject, p, Object.freeze(descriptor));
      }
    };
    propertyNames.forEach((p) => {
      propertyMap[p] = true;
      typeof filter === "function" ? !filter(p) && def2(p) : def2(p);
    });
    for (const prop in target) {
      !propertyMap[prop] && def2(prop);
    }
    return fakeObject;
  }
  var setting = true;
  function microTaskHtmlProxyDocument(proxyDocument) {
    const html = document.children[0];
    if (html && html.parentNode !== proxyDocument) {
      Object.defineProperty(html, "parentNode", {
        value: proxyDocument,
        configurable: true
      });
      if (setting) {
        setting = false;
        nextTick(() => {
          setting = true;
          Object.defineProperty(html, "parentNode", {
            value: document,
            configurable: true
          });
        });
      }
    }
  }

  // ../browser-vm/src/proxyInterceptor/shared.ts
  function isDataDescriptor(desc) {
    if (desc === void 0)
      return false;
    return "value" in desc || "writable" in desc;
  }
  function isAccessorDescriptor(desc) {
    if (desc === void 0)
      return false;
    return "get" in desc || "set" in desc;
  }
  function verifyGetterDescriptor(target, p, newValue) {
    const desc = Object.getOwnPropertyDescriptor(target, p);
    if (desc !== void 0 && desc.configurable === false) {
      if (isDataDescriptor(desc) && desc.writable === false) {
        if (!Object.is(newValue, desc.value)) {
          if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
            warn(`property "${String(p)}" is non-configurable and non-writable.`);
          }
          return 1;
        }
      } else if (isAccessorDescriptor(desc) && desc.get === void 0) {
        return 2;
      }
    }
    return 0;
  }
  function verifySetter(proxyTarget, target, p, val, receiver) {
    const verifyResult = verifySetterDescriptor(proxyTarget ? proxyTarget : receiver || target, p, val);
    let result;
    if (verifyResult > 0) {
      if (verifyResult === 1 || verifyResult === 2)
        result = false;
      if (verifyResult === 3)
        result = true;
    }
    return result;
  }
  function verifySetterDescriptor(target, p, newValue) {
    const desc = Object.getOwnPropertyDescriptor(target, p);
    if (desc !== void 0 && desc.configurable === false) {
      if (isDataDescriptor(desc) && desc.writable === false) {
        if (!Object.is(newValue, desc.value)) {
          if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
            warn(`property "${String(p)}" is non-configurable and non-writable.`);
          }
          return 1;
        } else {
          return 3;
        }
      } else if (isAccessorDescriptor(desc) && desc.set === void 0) {
        return 2;
      }
    }
    return 0;
  }
  function isConstructor(fn) {
    const fp = fn.prototype;
    const hasConstructor = fp && fp.constructor === fn && Object.getOwnPropertyNames(fp).length > 1;
    const functionStr = !hasConstructor && fn.toString();
    return hasConstructor || /^function\s+[A-Z]/.test(functionStr) || /^class\b/.test(functionStr);
  }
  var buildInProps = makeMap([
    "length",
    "caller",
    "callee",
    "arguments",
    "prototype",
    Symbol.hasInstance
  ]);
  function transferProps(o, n) {
    for (const key of Reflect.ownKeys(o)) {
      if (buildInProps(key))
        continue;
      const desc = Object.getOwnPropertyDescriptor(n, key);
      if (desc && desc.writable) {
        n[key] = o[key];
      }
    }
  }
  function bind(fn, context) {
    const fNOP = function() {
    };
    function bound() {
      const args = handlerParams2(arguments);
      if (this instanceof bound) {
        const obj = new fn(...args);
        Object.setPrototypeOf(obj, bound.prototype);
        return obj;
      } else {
        return fn.apply(context, args);
      }
    }
    bound.$native = fn;
    transferProps(fn, bound);
    if (fn.prototype) {
      fNOP.prototype = fn.prototype;
    }
    bound.prototype = new fNOP();
    if (Symbol.hasInstance) {
      Object.defineProperty(bound, Symbol.hasInstance, {
        configurable: true,
        value(instance) {
          const op = fn.prototype;
          return isObject(op) || typeof op === "function" ? instance instanceof fn : false;
        }
      });
    }
    return bound;
  }

  // ../browser-vm/src/modules/history.ts
  var passedKey = makeMap(["scrollRestoration"]);
  function historyModule() {
    const proto = Object.getPrototypeOf(window.history) || History.prototype;
    const fakeHistory = Object.create(proto);
    const proxyHistory = new Proxy(fakeHistory, {
      get(target, p) {
        const value2 = hasOwn(target, p) ? target[p] : window.history[p];
        return typeof value2 === "function" ? value2.bind(window.history) : value2;
      },
      set(target, p, value2, receiver) {
        const isPassKey = typeof p === "string" && passedKey(p);
        const verifySetterResult = verifySetter(isPassKey ? history : null, target, p, value2, receiver);
        if (verifySetterResult !== void 0) {
          return verifySetterResult;
        } else {
          return isPassKey ? Reflect.set(history, p, value2) : Reflect.set(target, p, value2, receiver);
        }
      },
      getPrototypeOf() {
        return fakeHistory;
      }
    });
    const fakeHistoryCtor = function History2() {
      throw new TypeError("Illegal constructor");
    };
    fakeHistoryCtor.prototype = fakeHistory;
    fakeHistoryCtor.prototype.constructor = fakeHistoryCtor;
    return {
      override: {
        history: proxyHistory,
        History: fakeHistoryCtor
      }
    };
  }

  // ../browser-vm/src/modules/network.ts
  function networkModule(sandbox) {
    const baseUrl = sandbox.options.baseUrl;
    const wsSet = new Set();
    const xhrSet = new Set();
    const fetchSet = new Set();
    const needFix = (url) => baseUrl && typeof url === "string" && !isAbsolute(url);
    class fakeXMLHttpRequest extends XMLHttpRequest {
      constructor() {
        super();
        xhrSet.add(this);
      }
      open() {
        if (arguments[3] === false) {
          xhrSet.delete(this);
        }
        if (needFix(arguments[1])) {
          arguments[1] = transformUrl(baseUrl, arguments[1]);
        }
        return super.open.apply(this, arguments);
      }
      abort() {
        xhrSet.delete(this);
        return super.abort.apply(this, arguments);
      }
    }
    class fakeWebSocket extends WebSocket {
      constructor(url, protocols) {
        if (needFix(url)) {
          const baseWsUrl = toWsProtocol(baseUrl);
          url = transformUrl(baseWsUrl, arguments[1]);
        }
        super(url, protocols);
        wsSet.add(this);
      }
      close() {
        wsSet.delete(this);
        return super.close.apply(this, arguments);
      }
    }
    const fakeFetch = (input, options = {}) => {
      if (needFix(input)) {
        input = transformUrl(baseUrl, input);
      }
      let controller;
      if (!hasOwn(options, "signal") && window.AbortController) {
        controller = new window.AbortController();
        fetchSet.add(controller);
        options.signal = controller.signal;
      }
      return controller ? window.fetch(input, options).finally(() => fetchSet.delete(controller)) : window.fetch(input, options);
    };
    return {
      override: {
        fetch: window.fetch ? fakeFetch : void 0,
        WebSocket: fakeWebSocket,
        XMLHttpRequest: fakeXMLHttpRequest
      },
      recover() {
        wsSet.forEach((ws) => ws.close());
        xhrSet.forEach((xhr) => xhr.abort());
        fetchSet.forEach((ctor) => ctor.abort());
        wsSet.clear();
        xhrSet.clear();
        fetchSet.clear();
      }
    };
  }

  // ../browser-vm/src/proxyInterceptor/document.ts
  var passedKey2 = makeMap(["title", "cookie"]);
  var queryFunctions = makeMap([
    "querySelector",
    "querySelectorAll",
    "getElementById",
    "getElementsByTagName",
    "getElementsByTagNameNS",
    "getElementsByClassName"
  ]);
  function createGetter(sandbox) {
    return (target, p, receiver) => {
      if (p === "activeElement") {
        return Reflect.get(document, p);
      }
      const rootNode = rootElm(sandbox);
      const strictIsolation = sandbox.options.strictIsolation;
      const value2 = hasOwn(target, p) ? Reflect.get(target, p, receiver) : Reflect.get(document, p);
      if (rootNode) {
        if (p === "createElement") {
          return function(tagName, options) {
            const el = value2.call(document, tagName, options);
            if (isObject(el)) {
              sandboxMap.setElementTag(el, sandbox);
              if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
                el.__SANDBOX__ = true;
              }
            }
            return el;
          };
        } else if (p === "head") {
          return findTarget(rootNode, ["head", `div[${__MockHead__}]`]) || value2;
        }
        if (strictIsolation) {
          if (p === "body") {
            return findTarget(rootNode, ["body", `div[${__MockBody__}]`]);
          } else if (queryFunctions(p)) {
            return p === "getElementById" ? (id2) => rootNode.querySelector(`#${id2}`) : rootNode[p].bind(rootNode);
          }
        }
      }
      if (typeof value2 === "function") {
        let newValue = hasOwn(value2, __documentBind__) ? value2[__documentBind__] : null;
        if (!newValue)
          newValue = bind(value2, document);
        const verifyResult = verifyGetterDescriptor(target, p, newValue);
        if (verifyResult > 0) {
          if (verifyResult === 1)
            return value2;
          if (verifyResult === 2)
            return void 0;
        }
        value2[__documentBind__] = newValue;
        return newValue;
      }
      return value2;
    };
  }
  function createSetter(sandbox) {
    return (target, p, value2, receiver) => {
      const rootNode = rootElm(sandbox);
      const verifyResult = verifySetterDescriptor(typeof p === "string" && passedKey2(p) ? document : receiver || target, p, value2);
      if (verifyResult > 0) {
        if (verifyResult === 1 || verifyResult === 2)
          return false;
        if (verifyResult === 3)
          return true;
      }
      if (p === "onselectstart") {
        if (rootNode) {
          return Reflect.set(rootNode, p, value2);
        } else {
          return Reflect.set(document, p, value2);
        }
      }
      return typeof p === "string" && passedKey2(p) ? Reflect.set(document, p, value2) : Reflect.set(target, p, value2, receiver);
    };
  }
  function createDefineProperty() {
    return (target, p, descriptor) => {
      return passedKey2(p) ? Reflect.defineProperty(document, p, descriptor) : Reflect.defineProperty(target, p, descriptor);
    };
  }
  function createHas() {
    return (target, p) => {
      if (p === "activeElement")
        return Reflect.has(document, p);
      return hasOwn(target, p) || Reflect.has(document, p);
    };
  }

  // ../browser-vm/src/modules/document.ts
  var rawDocumentCtor = Document;
  var rawHTMLDocumentCtor = HTMLDocument;
  var documentModule = (sandbox) => {
    let proxyDocument = {};
    const getter = createGetter(sandbox);
    const fakeDocument = createFakeObject(document);
    const fakeHTMLDocument = Object.create(fakeDocument);
    const fakeDocumentProto = new Proxy(fakeDocument, {
      get: (...args) => {
        microTaskHtmlProxyDocument(proxyDocument);
        return getter(...args);
      },
      has: createHas()
    });
    const fakeHTMLDocumentProto = Object.create(fakeDocumentProto);
    const fakeDocumentCtor = function Document2() {
      if (!(this instanceof fakeDocumentCtor)) {
        throw new TypeError("Failed to construct 'Document': Please use the 'new' operator.");
      }
      const docInstance = new rawDocumentCtor();
      Object.setPrototypeOf(docInstance, fakeDocument);
      return docInstance;
    };
    const fakeHTMLDocumentCtor = function HTMLDocument2() {
      if (!(this instanceof fakeHTMLDocumentCtor)) {
        throw new TypeError("Failed to construct 'HTMLDocument': Please use the 'new' operator.");
      }
      const docInstance = new rawHTMLDocumentCtor();
      Object.setPrototypeOf(docInstance, fakeHTMLDocument);
      return docInstance;
    };
    fakeDocumentCtor.prototype = fakeDocumentProto;
    fakeDocumentCtor.prototype.constructor = fakeDocumentCtor;
    fakeHTMLDocumentCtor.prototype = fakeHTMLDocumentProto;
    fakeHTMLDocumentCtor.prototype.constructor = fakeHTMLDocumentCtor;
    if (Symbol.hasInstance) {
      const getHasInstanceCheckFn = (fakeProto, fakeDocument2) => {
        return (value2) => {
          let proto = value2;
          if (proto === document)
            return true;
          while (proto = Object.getPrototypeOf(proto)) {
            if (proto === fakeProto) {
              return true;
            }
          }
          const cloned = function() {
          };
          cloned.prototype = fakeDocument2;
          return value2 instanceof cloned;
        };
      };
      Object.defineProperty(fakeDocumentCtor, Symbol.hasInstance, {
        configurable: true,
        value: getHasInstanceCheckFn(fakeDocumentProto, fakeDocument)
      });
      Object.defineProperty(fakeHTMLDocumentCtor, Symbol.hasInstance, {
        configurable: true,
        value: getHasInstanceCheckFn(fakeHTMLDocumentProto, fakeHTMLDocument)
      });
    }
    proxyDocument = new Proxy(Object.create(fakeHTMLDocumentProto, {
      currentScript: {
        value: null,
        writable: true
      },
      [__proxyNode__]: {
        writable: false,
        configurable: false,
        value: document
      }
    }), {
      set: createSetter(sandbox),
      defineProperty: createDefineProperty()
    });
    return {
      override: {
        document: proxyDocument,
        Document: fakeDocumentCtor,
        HTMLDocument: fakeHTMLDocumentCtor
      }
    };
  };

  // ../browser-vm/src/modules/uiEvent.ts
  _extends(MouseEventPatch, MouseEvent);
  function MouseEventPatch(typeArg, mouseEventInit) {
    if (mouseEventInit && objectToString.call(mouseEventInit.view) === "[object Window]") {
      mouseEventInit.view = window;
    }
    return new MouseEvent(typeArg, mouseEventInit);
  }
  function UiEventOverride() {
    class MouseEventPatch2 extends MouseEvent {
      constructor(typeArg, mouseEventInit) {
        if (mouseEventInit && objectToString.call(mouseEventInit.view) === "[object Window]") {
          mouseEventInit.view = window;
        }
        super(typeArg, mouseEventInit);
      }
    }
    return {
      override: {
        MouseEvent: MouseEventPatch2
      }
    };
  }

  // ../browser-vm/src/modules/storage.ts
  var CusStorage = class {
    constructor(namespace, rawStorage) {
      this.rawStorage = rawStorage;
      this.namespace = namespace;
      this.prefix = `${GARFISH_NAMESPACE_PREFIX}${namespace}__`;
    }
    get length() {
      return this.getKeys().length;
    }
    getKeys() {
      return Object.keys(this.rawStorage).filter((key) => key.startsWith(this.prefix));
    }
    key(n) {
      const key = this.getKeys()[n];
      return key ? key.substring(this.prefix.length) : null;
    }
    getItem(keyName) {
      return this.rawStorage.getItem(`${this.prefix + keyName}`);
    }
    setItem(keyName, keyValue) {
      this.rawStorage.setItem(`${this.prefix + keyName}`, keyValue);
    }
    removeItem(keyName) {
      this.rawStorage.removeItem(`${this.prefix + keyName}`);
    }
    clear() {
      this.getKeys().forEach((key) => {
        this.rawStorage.removeItem(key);
      });
    }
  };
  function localStorageModule(sandbox) {
    const namespace = sandbox.options.namespace;
    return {
      override: {
        localStorage: new CusStorage(namespace, localStorage),
        sessionStorage: new CusStorage(namespace, sessionStorage)
      }
    };
  }

  // ../browser-vm/src/modules/eventListener.ts
  function listenerModule(_sandbox) {
    const listeners = new Map();
    const rawAddEventListener2 = window.addEventListener;
    const rawRemoveEventListener2 = window.removeEventListener;
    function addListener(type, listener, options) {
      const curListeners = listeners.get(type) || [];
      listeners.set(type, [...curListeners, listener]);
      rawAddEventListener2.call(this, type, listener, options);
    }
    function removeListener(type, listener, options) {
      const curListeners = listeners.get(type) || [];
      const idx = curListeners.indexOf(listener);
      if (idx !== -1) {
        curListeners.splice(idx, 1);
      }
      listeners.set(type, [...curListeners]);
      rawRemoveEventListener2.call(this, type, listener, options);
    }
    const recover = () => {
      listeners.forEach((listener, key) => {
        listener.forEach((fn) => {
          rawRemoveEventListener2.call(window, key, fn);
        });
      });
      listeners.clear();
    };
    return {
      recover,
      override: {
        addEventListener: addListener.bind(window),
        removeEventListener: removeListener.bind(window)
      },
      created(global2) {
        const fakeDocument = global2.document;
        if (fakeDocument) {
          fakeDocument.addEventListener = addListener.bind(document);
          fakeDocument.removeEventListener = removeListener.bind(document);
        }
      }
    };
  }

  // ../browser-vm/src/modules/timer.ts
  var rawSetTimeout = window.setTimeout;
  var rawClearTimeout = window.clearTimeout;
  var rawSetInterval = window.setInterval;
  var rawClearInterval = window.clearInterval;
  var timeoutModule = () => {
    const timeout = new Set();
    const setTimeout2 = (handler, ms, ...args) => {
      const timeoutId = rawSetTimeout(handler, ms, ...args);
      timeout.add(timeoutId);
      return timeoutId;
    };
    const clearTimeout2 = (timeoutId) => {
      timeout.delete(timeoutId);
      rawClearTimeout(timeoutId);
    };
    const recover = () => {
      timeout.forEach((timeoutId) => {
        rawClearTimeout(timeoutId);
      });
    };
    return {
      recover,
      override: {
        setTimeout: setTimeout2,
        clearTimeout: clearTimeout2
      }
    };
  };
  var intervalModule = () => {
    const timeout = new Set();
    const setInterval = (callback, ms, ...args) => {
      const intervalId = rawSetInterval(callback, ms, ...args);
      timeout.add(intervalId);
      return intervalId;
    };
    const clearInterval = (intervalId) => {
      timeout.delete(intervalId);
      rawClearInterval(intervalId);
    };
    const recover = () => {
      timeout.forEach((intervalId) => {
        rawClearInterval(intervalId);
      });
    };
    return {
      recover,
      override: {
        setInterval,
        clearInterval
      }
    };
  };

  // ../browser-vm/src/dynamicNode/processParams.ts
  function injectHandlerParams() {
    if (window.MutationObserver) {
      const rawObserver = window.MutationObserver.prototype.observe;
      MutationObserver.prototype.observe = function() {
        return rawObserver.apply(this, handlerParams2(arguments));
      };
    }
    const desc = Object.getOwnPropertyDescriptor(window.Document.prototype, "activeElement");
    const rawActiveEl = desc && desc.get;
    if (rawActiveEl) {
      Object.defineProperty(window.Document.prototype, "activeElement", {
        get(...args) {
          return rawActiveEl.apply(handlerParams2([this])[0], handlerParams2(args));
        }
      });
    }
  }

  // ../browser-vm/src/dynamicNode/processor.ts
  var isInsertMethod = makeMap(["insertBefore", "insertAdjacentElement"]);
  var rawElementMethods = Object.create(null);
  var DynamicNodeProcessor = class {
    constructor(el, sandbox, methodName) {
      this.nativeAppend = rawElementMethods["appendChild"];
      this.nativeRemove = rawElementMethods["removeChild"];
      this.el = el;
      this.sandbox = sandbox;
      this.methodName = methodName;
      this.rootElement = rootElm(sandbox) || document;
      this.DOMApis = new DOMApis(sandbox.global.document);
      this.tagName = el.tagName ? el.tagName.toLowerCase() : "";
    }
    is(tag) {
      return this.tagName === tag;
    }
    fixResourceNodeUrl() {
      var _a;
      const baseUrl = this.sandbox.options.baseUrl;
      if (baseUrl) {
        const src = this.el.getAttribute("src");
        const href = this.el.getAttribute("href");
        src && (this.el.src = transformUrl(baseUrl, src));
        href && (this.el.href = transformUrl(baseUrl, href));
        const url = this.el.src || this.el.href;
        url && ((_a = this.sandbox.options) == null ? void 0 : _a.sourceList.push({
          tagName: this.el.tagName,
          url
        }));
      }
    }
    dispatchEvent(type, errInfo) {
      setTimeout(() => {
        const isError = type === "error";
        let event;
        if (isError) {
          event = new ErrorEvent(type, __spreadProps(__spreadValues({}, errInfo), {
            message: errInfo.error.message
          }));
        } else {
          event = new Event(type);
        }
        event.__byGarfish__ = true;
        Object.defineProperty(event, "target", { value: this.el });
        this.el.dispatchEvent(event);
        isError && window.dispatchEvent(event);
      });
    }
    addDynamicLinkNode(callback) {
      const { href, type } = this.el;
      if (!type || isCss(parseContentType(type))) {
        if (href) {
          const { baseUrl, namespace = "" } = this.sandbox.options;
          const fetchUrl = baseUrl ? transformUrl(baseUrl, href) : href;
          this.sandbox.loader.load(namespace, fetchUrl).then(({ resourceManager: styleManager }) => {
            this.dispatchEvent("load");
            styleManager.correctPath();
            callback(styleManager.renderAsStyleElement());
          }).catch((e) => {
            (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn(e);
            this.dispatchEvent("error", {
              error: e,
              filename: fetchUrl
            });
          });
        }
      } else {
        if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
          warn(`Invalid resource type "${type}", "${href}"`);
        }
      }
      const linkCommentNode = this.DOMApis.createLinkCommentNode(href);
      this.el[__REMOVE_NODE__] = () => this.DOMApis.removeElement(linkCommentNode);
      return linkCommentNode;
    }
    addDynamicScriptNode() {
      const { src, type } = this.el;
      const mimeType = parseContentType(type);
      const code = this.el.textContent || this.el.text || "";
      if (!type || isJs(mimeType) || isJsonp(mimeType, src)) {
        const { baseUrl, namespace = "" } = this.sandbox.options;
        if (src) {
          const fetchUrl = baseUrl ? transformUrl(baseUrl, src) : src;
          this.sandbox.loader.load(namespace, fetchUrl).then(({ resourceManager: { url, scriptCode } }) => {
            setTimeout(() => {
              this.dispatchEvent("load");
              this.sandbox.execScript(scriptCode, {}, url, { noEntry: true });
            });
          }).catch((e) => {
            (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn(e);
            this.dispatchEvent("error", {
              error: e,
              filename: fetchUrl
            });
          });
        } else if (code) {
          this.sandbox.execScript(code, {}, baseUrl, { noEntry: true });
        }
        const scriptCommentNode = this.DOMApis.createScriptCommentNode({
          src,
          code
        });
        this.el[__REMOVE_NODE__] = () => this.DOMApis.removeElement(scriptCommentNode);
        return scriptCommentNode;
      } else {
        if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
          warn(type === "module" ? `Does not support "esm" module script in sandbox. "${src}"` : `Invalid resource type "${type}", "${src}"`);
        }
      }
      return this.el;
    }
    monitorChangesOfLinkNode() {
      if (this.el.modifyFlag)
        return;
      const mutator = new MutationObserver((mutations) => {
        var _a;
        if (this.el.modifyFlag)
          return;
        for (const { type, attributeName } of mutations) {
          if (type === "attributes") {
            if (attributeName === "rel" || attributeName === "stylesheet") {
              if (this.el.modifyFlag)
                return;
              if (this.el.rel === "stylesheet" && this.el.href) {
                this.el.disabled = this.el.modifyFlag = true;
                const commentNode = this.addDynamicLinkNode((styleNode) => {
                  var _a2;
                  (_a2 = commentNode.parentNode) == null ? void 0 : _a2.replaceChild(styleNode, commentNode);
                });
                (_a = this.el.parentNode) == null ? void 0 : _a.replaceChild(commentNode, this.el);
              }
            }
          }
        }
      });
      mutator.observe(this.el, { attributes: true });
    }
    findParentNodeInApp(parentNode, defaultInsert) {
      if (parentNode === document.body) {
        return findTarget(this.rootElement, [
          "body",
          `div[${__MockBody__}]`
        ]);
      } else if (parentNode === document.head) {
        return findTarget(this.rootElement, [
          "head",
          `div[${__MockHead__}]`
        ]);
      }
      if (this.rootElement.contains(parentNode) || !document.contains(parentNode)) {
        return parentNode;
      }
      if (defaultInsert === "head") {
        return findTarget(this.rootElement, [
          "head",
          `div[${__MockHead__}]`
        ]);
      } else if (defaultInsert === "body") {
        return findTarget(this.rootElement, [
          "body",
          `div[${__MockBody__}]`
        ]);
      }
      return parentNode;
    }
    append(context, args, originProcess) {
      var _a;
      let convertedNode;
      let parentNode = context;
      const { baseUrl } = this.sandbox.options;
      if (sourceListTags.includes(this.tagName)) {
        this.fixResourceNodeUrl();
      }
      if (this.is("script")) {
        parentNode = this.findParentNodeInApp(context, "body");
        convertedNode = this.addDynamicScriptNode();
      } else if (this.is("style")) {
        parentNode = this.findParentNodeInApp(context, "head");
        if (baseUrl) {
          const manager = new StyleManager(this.el.textContent);
          manager.correctPath(baseUrl);
          this.el.textContent = manager.styleCode;
        }
        convertedNode = this.el;
      } else if (this.is("link")) {
        parentNode = this.findParentNodeInApp(context, "head");
        if (this.el.rel === "stylesheet" && this.el.href) {
          convertedNode = this.addDynamicLinkNode((styleNode) => this.nativeAppend.call(parentNode, styleNode));
        } else {
          convertedNode = this.el;
          this.monitorChangesOfLinkNode();
        }
      }
      if (!this.rootElement.contains(parentNode)) {
        if (parentNode !== this.rootElement) {
          this.sandbox.deferClearEffects.add(() => {
            this.DOMApis.removeElement(this.el);
          });
        }
      }
      if (this.is("iframe") && typeof this.el.onload === "function") {
        const { el, sandbox } = this;
        const originOnload = el.onload;
        el.onload = function() {
          def(el.contentWindow, "parent", sandbox.global);
          return originOnload.apply(this, arguments);
        };
      }
      if (convertedNode) {
        if (isInsertMethod(this.methodName) && this.rootElement.contains(context) && ((_a = args[1]) == null ? void 0 : _a.parentNode) === context) {
          return originProcess();
        }
        this.sandbox.hooks.lifecycle.appendNode.emit(parentNode, this.el, convertedNode, this.tagName);
        return this.nativeAppend.call(parentNode, convertedNode);
      }
      return originProcess();
    }
    removeChild(context, originProcess) {
      if (typeof this.el[__REMOVE_NODE__] === "function") {
        this.el[__REMOVE_NODE__]();
        return this.el;
      }
      if (this.is("style") || this.is("link") || this.is("script")) {
        const parentNode = this.findParentNodeInApp(context, this.is("script") ? "body" : "head");
        if (this.el.parentNode === parentNode)
          return this.nativeRemove.call(parentNode, this.el);
      }
      return originProcess();
    }
  };

  // ../browser-vm/src/dynamicNode/index.ts
  var mountElementMethods = [
    "append",
    "appendChild",
    "insertBefore",
    "insertAdjacentElement"
  ];
  var removeChildElementMethods = ["removeChild"];
  function injector(current, methodName) {
    return function() {
      var _a;
      const el = methodName === "insertAdjacentElement" ? arguments[1] : arguments[0];
      const sandbox = el && sandboxMap.get(el);
      const originProcess = () => current.apply(this, arguments);
      if (((_a = this == null ? void 0 : this.tagName) == null ? void 0 : _a.toLowerCase()) === "style") {
        const baseUrl = sandbox && sandbox.options.baseUrl;
        if (baseUrl) {
          const manager = new StyleManager(el.textContent);
          manager.correctPath(baseUrl);
          this.textContent = manager.styleCode;
          return originProcess();
        }
      }
      if (sandbox) {
        const processor = new DynamicNodeProcessor(el, sandbox, methodName);
        return processor.append(this, arguments, originProcess);
      } else {
        return originProcess();
      }
    };
  }
  function injectorRemoveChild(current, methodName) {
    return function() {
      const el = arguments[0];
      const sandbox = el && sandboxMap.get(el);
      const originProcess = () => {
        return current.apply(this, arguments);
      };
      if (sandbox) {
        const processor = new DynamicNodeProcessor(el, sandbox, methodName);
        return processor.removeChild(this, originProcess);
      } else {
        return originProcess();
      }
    };
  }
  function makeElInjector() {
    if (makeElInjector.hasInject)
      return;
    makeElInjector.hasInject = true;
    if (typeof window.Element === "function") {
      const rewrite = (methods, builder) => {
        for (const name of methods) {
          const fn = window.Element.prototype[name];
          if (typeof fn !== "function" || fn[__domWrapper__]) {
            continue;
          }
          rawElementMethods[name] = fn;
          const wrapper = builder(fn, name);
          wrapper[__domWrapper__] = true;
          window.Element.prototype[name] = wrapper;
        }
      };
      rewrite(mountElementMethods, injector);
      rewrite(removeChildElementMethods, injectorRemoveChild);
    }
    injectHandlerParams();
  }

  // ../browser-vm/src/lifecycle.ts
  function sandboxLifecycle() {
    return new PluginSystem({
      closed: new SyncHook(),
      stared: new SyncHook(),
      appendNode: new SyncHook(),
      beforeClearEffect: new SyncHook(),
      afterClearEffect: new SyncHook(),
      beforeInvoke: new SyncHook(),
      afterInvoke: new SyncHook(),
      invokeError: new SyncHook()
    });
  }

  // ../browser-vm/src/proxyInterceptor/global.ts
  function createGetter2(sandbox) {
    return (target, p, receiver) => {
      if (p === Symbol.unscopables)
        return void 0;
      let value2;
      const { overrideList } = sandbox.replaceGlobalVariables;
      if (sandbox.isProtectVariable(p)) {
        return Reflect.get(window, p);
      } else if (sandbox.isInsulationVariable(p)) {
        value2 = Reflect.get(target, p, receiver);
      } else {
        value2 = hasOwn(target, p) ? Reflect.get(target, p, receiver) : Reflect.get(window, p);
      }
      if (typeof value2 === "function") {
        if (isEsGlobalMethods(p) || hasOwn(overrideList, p) || isConstructor(value2) || sandbox.isExternalGlobalVariable.has(p)) {
          return value2;
        }
      } else {
        return value2;
      }
      const newValue = hasOwn(value2, __windowBind__) ? value2[__windowBind__] : bind(value2, window);
      const verifyResult = verifyGetterDescriptor(target, p, newValue);
      if (verifyResult > 0) {
        if (verifyResult === 1)
          return value2;
        if (verifyResult === 2)
          return void 0;
      }
      value2[__windowBind__] = newValue;
      return newValue;
    };
  }
  function createSetter2(sandbox) {
    return (target, p, value2, receiver) => {
      const verifyResult = verifySetterDescriptor(sandbox.isProtectVariable(p) ? window : receiver ? receiver : target, p, value2);
      if (verifyResult > 0) {
        if (verifyResult === 1 || verifyResult === 2)
          return false;
        if (verifyResult === 3)
          return true;
      }
      if (sandbox.isProtectVariable(p)) {
        return Reflect.set(window, p, value2);
      } else {
        const success = Reflect.set(target, p, value2, receiver);
        if (success) {
          if (sandbox.initComplete) {
            sandbox.isExternalGlobalVariable.add(p);
          }
          if (sandbox.global) {
            const methods = sandbox.global[`${GARFISH_OPTIMIZE_NAME}Methods`];
            if (Array.isArray(methods)) {
              if (methods.includes(p)) {
                const updateStack = sandbox.global[`${GARFISH_OPTIMIZE_NAME}UpdateStack`];
                updateStack.forEach((fn) => fn(p, value2));
              }
            }
          }
        }
        return success;
      }
    };
  }
  function createDefineProperty2(sandbox) {
    return (target, p, descriptor) => {
      if (sandbox.isProtectVariable(p)) {
        return Reflect.defineProperty(window, p, descriptor);
      } else {
        const success = Reflect.defineProperty(target, p, descriptor);
        if (sandbox.initComplete && success) {
          sandbox.isExternalGlobalVariable.add(p);
        }
        return success;
      }
    };
  }
  function createDeleteProperty(sandbox) {
    return (target, p) => {
      if (hasOwn(target, p)) {
        delete target[p];
        if (sandbox.initComplete && sandbox.isExternalGlobalVariable.has(p)) {
          sandbox.isExternalGlobalVariable.delete(p);
        }
      } else if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
        if (hasOwn(window, p) && sandbox.isProtectVariable(p)) {
          warn(`The "${String(p)}" is global protect variable."`);
        }
      }
      return true;
    };
  }
  function createHas2(sandbox) {
    return (_target, p) => {
      if (sandbox.isProtectVariable(p))
        return false;
      return true;
    };
  }

  // ../browser-vm/src/sandbox.ts
  var id = 0;
  var defaultModules = [
    networkModule,
    timeoutModule,
    intervalModule,
    historyModule,
    documentModule,
    listenerModule,
    UiEventOverride,
    localStorageModule
  ];
  var isModule = (module) => {
    return isObject(module) ? module[__garfishGlobal__] !== void 0 : false;
  };
  var addProxyWindowType = (module, parentModule) => {
    if (!isModule(module)) {
      module[__garfishGlobal__] = parentModule;
    }
    return module;
  };
  var Sandbox = class {
    constructor(options) {
      this.id = id++;
      this.type = "vm";
      this.closed = true;
      this.initComplete = false;
      this.version = "1.0.17";
      this.hooks = sandboxLifecycle();
      this.deferClearEffects = new Set();
      this.isExternalGlobalVariable = new Set();
      this.optimizeCode = "";
      const defaultOptions = {
        baseUrl: "",
        namespace: "",
        modules: [],
        sourceList: [],
        disableWith: false,
        openSandbox: true,
        strictIsolation: false,
        el: () => null,
        protectVariable: () => [],
        insulationVariable: () => []
      };
      this.options = isPlainObject(options) ? deepMerge(defaultOptions, options) : defaultOptions;
      options.sourceList && (this.options.sourceList = options.sourceList);
      const { loaderOptions, protectVariable, insulationVariable } = this.options;
      this.loader = new Loader(loaderOptions);
      this.isProtectVariable = makeMap((protectVariable == null ? void 0 : protectVariable()) || []);
      this.isInsulationVariable = makeMap((insulationVariable == null ? void 0 : insulationVariable()) || []);
      this.replaceGlobalVariables = {
        createdList: [],
        prepareList: [],
        recoverList: [],
        overrideList: {}
      };
      makeElInjector();
      this.start();
    }
    start() {
      this.closed = false;
      this.replaceGlobalVariables = this.getModuleData();
      const { createdList, overrideList } = this.replaceGlobalVariables;
      this.global = this.createProxyWindow(Object.keys(overrideList));
      if (overrideList) {
        for (const key in overrideList) {
          this.global[key] = overrideList[key];
        }
      }
      if (createdList) {
        createdList.forEach((fn) => fn(this.global));
      }
      if (!this.options.disableWith) {
        this.optimizeCode = this.optimizeGlobalMethod();
      }
      this.initComplete = true;
      this.hooks.lifecycle.stared.emit(this.global);
    }
    close() {
      if (this.closed)
        return;
      this.clearEffects();
      this.closed = true;
      this.global = null;
      this.optimizeCode = "";
      this.initComplete = false;
      this.deferClearEffects.clear();
      this.isExternalGlobalVariable.clear();
      this.replaceGlobalVariables.createdList = [];
      this.replaceGlobalVariables.prepareList = [];
      this.replaceGlobalVariables.recoverList = [];
      this.replaceGlobalVariables.overrideList = [];
      this.hooks.lifecycle.closed.emit();
    }
    reset() {
      this.close();
      this.start();
    }
    createProxyWindow(moduleKeys = []) {
      const fakeWindow = createFakeObject(window, this.isInsulationVariable, makeMap(moduleKeys));
      const baseHandlers = {
        get: createGetter2(this),
        set: createSetter2(this),
        defineProperty: createDefineProperty2(this),
        deleteProperty: createDeleteProperty(this)
      };
      const parentHandlers = __spreadProps(__spreadValues({}, baseHandlers), {
        has: createHas2(this)
      });
      const proxy = new Proxy(fakeWindow, parentHandlers);
      const subProxy = new Proxy(fakeWindow, baseHandlers);
      proxy.self = subProxy;
      proxy.window = subProxy;
      proxy.globalThis = subProxy;
      proxy.unstable_sandbox = this;
      safeWrapper(() => {
        proxy.top = window.top === window ? subProxy : window.top;
        proxy.parent = window.parent === window ? subProxy : window.parent;
      });
      addProxyWindowType(proxy, window);
      return proxy;
    }
    getModuleData() {
      const recoverList = [];
      const createdList = [];
      const prepareList = [];
      const overrideList = {};
      const { modules, openSandbox } = this.options;
      const allModules = openSandbox ? defaultModules.concat(modules) : modules;
      for (const module of allModules) {
        if (typeof module === "function") {
          const { recover, override, created, prepare } = module(this) || {};
          if (recover)
            recoverList.push(recover);
          if (created)
            createdList.push(created);
          if (prepare)
            prepareList.push(prepare);
          if (override) {
            for (const key in override) {
              if ((typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && overrideList[key]) {
                warn(`"${key}" global variables are overwritten.`);
              }
              overrideList[key] = override[key];
            }
          }
        }
      }
      return { recoverList, createdList, overrideList, prepareList };
    }
    clearEffects() {
      this.hooks.lifecycle.beforeClearEffect.emit();
      this.replaceGlobalVariables.recoverList.forEach((fn) => fn && fn());
      this.deferClearEffects.forEach((fn) => fn && fn());
      this.hooks.lifecycle.afterClearEffect.emit();
    }
    optimizeGlobalMethod() {
      let code = "";
      const methods = optimizeMethods.filter((p) => {
        return p && !this.isProtectVariable(p) && hasOwn(this.global, p);
      });
      if (methods.length === 0)
        return code;
      code = methods.reduce((prevCode, name) => {
        return `${prevCode} let ${name} = window.${name};`;
      }, code);
      this.global[`${GARFISH_OPTIMIZE_NAME}Methods`] = methods;
      this.global[`${GARFISH_OPTIMIZE_NAME}UpdateStack`] = [];
      code += `window.${GARFISH_OPTIMIZE_NAME}UpdateStack.push(function(k,v){eval(k+"=v")});`;
      return code;
    }
    execScript(code, env = {}, url = "", options) {
      const { async } = options || {};
      const { disableWith, openSandbox } = this.options;
      const { prepareList, overrideList } = this.replaceGlobalVariables;
      this.hooks.lifecycle.beforeInvoke.emit(url, env, options);
      if (prepareList) {
        prepareList.forEach((fn) => fn && fn());
      }
      const revertCurrentScript = setDocCurrentScript(this.global.document, code, false, url, async);
      try {
        code += `
${url ? `//# sourceURL=${url}
` : ""}`;
        code = !disableWith ? `with(window) {;${this.optimizeCode + code}}` : code;
        if (openSandbox) {
          evalWithEnv(code, __spreadValues(__spreadValues({
            window: this.global
          }, overrideList), env), this.global);
        } else {
          evalWithEnv(code, env, window);
        }
      } catch (e) {
        this.hooks.lifecycle.invokeError.emit(e, url, env, options);
        if (typeof this.global.onerror === "function") {
          const source = url || this.options.baseUrl;
          const message = e instanceof Error ? e.message : String(e);
          safeWrapper(() => {
            this.global.onerror.call(this.global, message, source, null, null, e);
          });
        }
        throw e;
      } finally {
        revertCurrentScript();
      }
      this.hooks.lifecycle.afterInvoke.emit(url, env, options);
    }
    static getNativeWindow() {
      let module = window;
      while (isModule(module)) {
        module = module[__garfishGlobal__];
      }
      return module;
    }
    static canSupport() {
      let support = true;
      if (!window.Proxy || !Array.prototype.includes || !String.prototype.includes) {
        support = false;
      }
      if (support) {
        try {
          new Function("let a = 666;");
        } catch {
          support = false;
        }
      }
      if (!support) {
        warn('The current environment does not support "vm sandbox",Please use the "snapshot sandbox" instead.');
      }
      return support;
    }
  };

  // ../browser-vm/src/pluginify.ts
  var specialExternalVariables = [
    "onerror",
    "webpackjsonp",
    "__REACT_ERROR_OVERLAY_GLOBAL_HOOK__",
    (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) ? "webpackHotUpdate" : ""
  ];
  function compatibleOldModule(modules) {
    if (isPlainObject(modules)) {
      (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn('"vm sandbox" modules should be an array');
      const list = [];
      for (const key in modules) {
        list.push(modules[key]);
      }
      modules = list;
    }
    return modules;
  }
  function rewriteAppAndSandbox(Garfish2, app, sandbox) {
    const originExecScript = sandbox.execScript;
    sandboxMap.set(sandbox);
    sandbox.loader = Garfish2.loader;
    sandbox.execScript = (code, env, url, options) => {
      return originExecScript.call(sandbox, code, __spreadValues(__spreadValues({}, env), app.getExecScriptEnv(options == null ? void 0 : options.noEntry)), url, options);
    };
    app.vmSandbox = sandbox;
    app.global = sandbox.global;
    app.strictIsolation = sandbox.options.strictIsolation;
    app.runCode = function() {
      return originExecScript.apply(sandbox, arguments);
    };
    if (app.entryManager.DOMApis) {
      app.entryManager.DOMApis.document = sandbox.global.document;
    }
  }
  function createOptions(Garfish2) {
    const canSupport = Sandbox.canSupport();
    const options = {
      name: "browser-vm",
      version: "1.0.17",
      afterLoad(appInfo, appInstance) {
        var _a;
        if (!canSupport || !appInstance || appInfo.sandbox === false || appInfo.sandbox.open === false || appInfo.sandbox.snapshot) {
          return;
        }
        if (appInstance.vmSandbox)
          return;
        rewriteAppAndSandbox(Garfish2, appInstance, new Sandbox({
          openSandbox: true,
          namespace: appInfo.name,
          sourceList: appInstance.sourceList,
          baseUrl: appInstance.entryManager.url,
          strictIsolation: (_a = appInfo.sandbox) == null ? void 0 : _a.strictIsolation,
          modules: compatibleOldModule(appInfo.sandbox.modules),
          el: () => appInstance.htmlNode,
          insulationVariable: () => {
            return [
              ...specialExternalVariables,
              ...appInfo.insulationVariable || []
            ].filter(Boolean);
          },
          protectVariable: () => {
            return [
              ...appInfo.protectVariable || [],
              ...appInstance && Object.keys(appInstance.getExecScriptEnv(false) || {})
            ].filter(Boolean);
          }
        }));
      },
      afterUnmount(appInfo, appInstance, isCacheMode) {
        if (!appInstance.vmSandbox || isCacheMode)
          return;
        appInstance.vmSandbox.reset();
      },
      afterMount(appInfo, appInstance) {
        if (!appInstance.vmSandbox)
          return;
        appInstance.vmSandbox.execScript(`
        if (typeof window.onload === 'function') {
          window.onload.call(window);
        }
      `);
      }
    };
    return options;
  }
  function GarfishBrowserVm() {
    return function(Garfish2) {
      Garfish2.getGlobalObject = function() {
        return Sandbox.getNativeWindow();
      };
      Garfish2.setGlobalValue = function(key, value2) {
        return this.getGlobalObject()[key] = value2;
      };
      Garfish2.clearEscapeEffect = function(key, value2) {
        const global2 = this.getGlobalObject();
        if (key in global2) {
          global2[key] = value2;
        }
      };
      return createOptions(Garfish2);
    };
  }

  // ../browser-snapshot/src/patchers/event.ts
  var rawAddEventListener;
  var rawRemoveEventListener;
  var PatchEvent = class {
    constructor() {
      this.listenerMap = new Map();
    }
    activate() {
      this.listenerMap.forEach((listeners, type) => [...listeners].forEach((listener) => window.addEventListener(type, listener)));
      if (!rawAddEventListener || !rawRemoveEventListener) {
        rawAddEventListener = window.addEventListener;
        rawRemoveEventListener = window.removeEventListener;
      }
      window.addEventListener = (type, listener, options) => {
        const listeners = this.listenerMap.get(type) || [];
        this.listenerMap.set(type, [...listeners, listener]);
        return rawAddEventListener.call(window, type, listener, options);
      };
      window.removeEventListener = (type, listener, options) => {
        const storedTypeListeners = this.listenerMap.get(type);
        if (storedTypeListeners && storedTypeListeners.length && storedTypeListeners.indexOf(listener) !== -1) {
          storedTypeListeners.splice(storedTypeListeners.indexOf(listener), 1);
        }
        return rawRemoveEventListener.call(window, type, listener, options);
      };
    }
    deactivate() {
      this.listenerMap.forEach((listeners, type) => [...listeners].forEach((listener) => window.removeEventListener(type, listener)));
      window.removeEventListener = rawRemoveEventListener;
      window.addEventListener = rawAddEventListener;
    }
  };

  // ../browser-snapshot/src/patchers/interceptor.ts
  var Snapshot = class {
    constructor(arrDoms) {
      this.arrDoms = arrDoms;
      this.arrDoms = arrDoms;
    }
    static take(target = document.head) {
      let list;
      if (target.childNodes) {
        list = Array.prototype.slice.call(target.childNodes);
      } else {
        list = Array.prototype.slice.call(target);
      }
      return new Snapshot(list);
    }
    diff(s) {
      if (!s) {
        return {
          created: new Snapshot([]),
          removed: new Snapshot([])
        };
      }
      return {
        created: new Snapshot(this.arrDoms.filter((d) => s.arrDoms.indexOf(d) === -1)),
        removed: new Snapshot(s.arrDoms.filter((d) => this.arrDoms.indexOf(d) === -1))
      };
    }
  };
  var Interceptor = class {
    constructor(dom = document.head) {
      this.dom = dom;
      this.dom = dom;
    }
    add(createdOrSnapshot, removed) {
      let created;
      if (!removed) {
        const diff = Snapshot.take(this.dom).diff(createdOrSnapshot);
        created = diff.created;
        removed = diff.removed;
      } else {
        created = createdOrSnapshot;
      }
      created.arrDoms.reduce((prev, val) => {
        prev.appendChild(val);
        return prev;
      }, this.dom);
      removed.arrDoms.reduce((prev, val) => {
        prev.removeChild(val);
        return prev;
      }, this.dom);
    }
    remove(createdOrSnapshot, removed) {
      let created;
      if (!removed) {
        const diff = Snapshot.take(this.dom).diff(createdOrSnapshot);
        created = diff.created;
        removed = diff.removed;
      } else {
        created = createdOrSnapshot;
      }
      created.arrDoms.reduce((prev, val) => {
        prev.removeChild(val);
        return prev;
      }, this.dom);
      removed.arrDoms.reduce((prev, val) => {
        prev.appendChild(val);
        return prev;
      }, this.dom);
    }
  };

  // ../browser-snapshot/src/patchers/style.ts
  var PatchStyle = class {
    constructor() {
      this.headInterceptor = new Interceptor(document.head);
    }
    activate() {
      this.domSnapshotBefore = Snapshot.take();
      if (this.domSnapshotMutated)
        this.headInterceptor.add(this.domSnapshotMutated.created, this.domSnapshotMutated.removed);
    }
    deactivate() {
      const domSnapshot = Snapshot.take();
      this.domSnapshotMutated = domSnapshot.diff(this.domSnapshotBefore);
      if (!this.domSnapshotMutated)
        return;
      this.headInterceptor.remove(this.domSnapshotMutated.created, this.domSnapshotMutated.removed);
    }
    formateCtx(arrDoms) {
      const effectMap = {
        style: [],
        script: [],
        other: []
      };
      arrDoms.forEach((dom) => {
        let type = "other";
        if (/css/.test(dom.type))
          type = "style";
        if (/javascript/.test(dom.type))
          type = "script";
        effectMap[type].push({
          src: dom.src,
          outerHTML: dom.outerHTML,
          content: dom.innerText
        });
      });
      return effectMap;
    }
  };

  // ../browser-snapshot/src/patchers/history.ts
  var rawPushState;
  var rawReplaceState;
  var PatchHistory = class {
    activate() {
      if (!rawPushState || !rawReplaceState) {
        rawPushState = window.history.pushState;
        rawReplaceState = window.history.replaceState;
      }
    }
    deactivate() {
      window.history.pushState = rawPushState;
      window.history.replaceState = rawReplaceState;
    }
  };

  // ../browser-snapshot/src/patchers/interval.ts
  var rawInterval = window.setInterval;
  var rawClearInterval2 = window.clearInterval;
  var PatchInterval = class {
    constructor() {
      this.intervals = [];
    }
    activate() {
      window.setInterval = (handler, timeout, ...args) => {
        const intervalId = rawInterval(handler, timeout, ...args);
        this.intervals = [...this.intervals, intervalId];
        return intervalId;
      };
      window.clearInterval = (intervalId) => {
        this.intervals = this.intervals.filter((id2) => id2 !== intervalId);
        return rawClearInterval2(intervalId);
      };
    }
    deactivate(_clearEffects) {
      if (_clearEffects) {
        this.intervals.forEach((id2) => window.clearInterval(id2));
      }
      window.setInterval = rawInterval;
      window.clearInterval = rawClearInterval2;
    }
  };

  // ../browser-snapshot/src/patchers/variable.ts
  var hasOwnProperty2 = Object.prototype.hasOwnProperty;
  function hasOwn2(obj, key) {
    return hasOwnProperty2.call(obj, key);
  }
  var PatchGlobalVal = class {
    constructor(targetToProtect = typeof window !== "undefined" ? window : globalThis, protectVariable = []) {
      this.targetToProtect = targetToProtect;
      this.protectVariable = protectVariable;
      this.snapshotOriginal = new Map();
      this.snapshotMutated = new Map();
      this.whiteList = [
        "location",
        "addEventListener",
        "removeEventListener",
        "webpackJsonp"
      ];
      this.targetToProtect = targetToProtect;
      this.protectVariable = protectVariable;
      this.whiteList = [...this.whiteList, ...protectVariable];
    }
    safeIterator(fn) {
      for (const i in this.targetToProtect) {
        if (this.whiteList.indexOf(i) !== -1) {
          continue;
        }
        const prop = Object.getOwnPropertyDescriptor(this.targetToProtect, i);
        if (!prop || !prop.writable) {
          continue;
        }
        if (hasOwn2(this.targetToProtect, i)) {
          fn(i);
        }
      }
    }
    activate() {
      this.safeIterator((i) => {
        this.snapshotOriginal.set(i, this.targetToProtect[i]);
      });
      this.snapshotMutated.forEach((val, mutateKey) => {
        this.targetToProtect[mutateKey] = this.snapshotMutated.get(mutateKey);
      });
    }
    deactivate() {
      const deleteMap = {};
      const updateMap = {};
      const addMap = {};
      this.safeIterator((normalKey) => {
        if (this.snapshotOriginal.get(normalKey) !== this.targetToProtect[normalKey]) {
          this.snapshotMutated.set(normalKey, this.targetToProtect[normalKey]);
          this.targetToProtect[normalKey] = this.snapshotOriginal.get(normalKey);
          if (this.targetToProtect[normalKey] === void 0) {
            addMap[normalKey] = this.snapshotMutated.get(normalKey);
          } else {
            updateMap[normalKey] = this.snapshotMutated.get(normalKey);
          }
        }
        this.snapshotOriginal.delete(normalKey);
      });
      this.snapshotOriginal.forEach((val, deleteKey) => {
        this.snapshotMutated.set(deleteKey, this.targetToProtect[deleteKey]);
        this.targetToProtect[deleteKey] = this.snapshotOriginal.get(deleteKey);
        deleteMap[deleteKey] = this.targetToProtect[deleteKey];
      });
    }
  };

  // ../browser-snapshot/src/patchers/webpackjsonp.ts
  var PatchWebpackJsonp = class {
    activate() {
      this.preWebpackJsonp = window.webpackJsonp;
      window.webpackJsonp = this.currentWebpackJsonp;
    }
    deactivate() {
      this.currentWebpackJsonp = window.webpackJsonp;
      window.webpackJsonp = this.preWebpackJsonp;
    }
  };

  // ../browser-snapshot/src/sandbox.ts
  var Sandbox2 = class {
    constructor(name, protectVariable = [], targetToProtect = typeof window !== "undefined" ? window : globalThis, isInBrowser = typeof window === "undefined" ? false : true) {
      this.name = name;
      this.protectVariable = protectVariable;
      this.targetToProtect = targetToProtect;
      this.isInBrowser = isInBrowser;
      this.type = "snapshot";
      this.isRunning = false;
      this.patchList = [];
      this.name = name;
      this.isInBrowser = isInBrowser;
      this.patchList.push(new PatchGlobalVal(targetToProtect, protectVariable));
      if (this.isInBrowser) {
        this.patchList = [
          ...this.patchList,
          new PatchStyle(),
          new PatchEvent(),
          new PatchHistory(),
          new PatchInterval(),
          new PatchWebpackJsonp()
        ];
      }
    }
    activate() {
      if (this.isRunning)
        return;
      this.patchList.forEach((patch) => {
        patch.activate();
      });
      this.isRunning = true;
    }
    deactivate(clearEffects = true) {
      if (!this.isRunning)
        return;
      [...this.patchList].reverse().forEach((patch) => {
        patch.deactivate(clearEffects);
      });
      this.isRunning = false;
    }
  };

  // ../browser-snapshot/src/index.ts
  function GarfishBrowserSnapshot(op) {
    return function(Garfish2) {
      const config = op || { open: true };
      const options = {
        openBrowser: false,
        version: "1.0.17",
        name: "browser-snapshot",
        afterLoad(appInfo, appInstance) {
          var _a;
          const sandboxConfig = appInfo.sandbox || ((_a = Garfish2 == null ? void 0 : Garfish2.options) == null ? void 0 : _a.sandbox);
          if (sandboxConfig === false || sandboxConfig.open === false || (sandboxConfig == null ? void 0 : sandboxConfig.snapshot) === false) {
            config.open = false;
          }
          if (sandboxConfig) {
            config.protectVariable = [
              ...(Garfish2 == null ? void 0 : Garfish2.options.protectVariable) || [],
              ...appInfo.protectVariable || []
            ];
          }
          options.openBrowser = config.open;
          if (!config.open)
            return;
          if (appInstance) {
            if (appInstance.snapshotSandbox)
              return;
            const sandbox = new Sandbox2(appInfo.name, config.protectVariable);
            appInstance.snapshotSandbox = sandbox;
          }
        },
        beforeMount(appInfo, appInstance) {
          if (!appInstance.snapshotSandbox)
            return;
          appInstance.snapshotSandbox.activate();
        },
        afterUnmount(appInfo, appInstance) {
          if (!appInstance.snapshotSandbox)
            return;
          appInstance.snapshotSandbox.deactivate();
        }
      };
      return options;
    };
  }

  // src/index.ts
  function createContext() {
    let fresh = false;
    if (inBrowser() && window["__GARFISH__"] && window["Garfish"]) {
      return window["Garfish"];
    }
    const GarfishInstance = new Garfish({
      plugins: [GarfishRouter(), GarfishBrowserVm(), GarfishBrowserSnapshot()]
    });
    const set2 = (namespace, val = GarfishInstance) => {
      if (hasOwn(window, namespace)) {
        if (!(window[namespace] && window[namespace].flag === __GARFISH_FLAG__)) {
          const next = () => {
            fresh = true;
            if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
              warn(`"Window.${namespace}" will be overwritten by "garfish".`);
            }
          };
          const desc = Object.getOwnPropertyDescriptor(window, namespace);
          if (desc) {
            if (desc.configurable) {
              def(window, namespace, val);
              next();
            } else if (desc.writable) {
              window[namespace] = val;
              next();
            }
          }
        }
      } else {
        fresh = true;
        def(window, namespace, val);
      }
    };
    if (inBrowser()) {
      set2("Garfish");
      def(window, "__GARFISH__", true);
    }
    if (fresh) {
      if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
        if (window["Garfish"].version !== "1.0.17") {
          warn('The "garfish version" used by the main and sub-applications is inconsistent.');
        }
      }
    }
    return GarfishInstance;
  }
  var src_default = createContext();
  return src_exports;
})();
/*!
 * EventEmitter2
 * https://github.com/hij1nx/EventEmitter2
 *
 * Copyright (c) 2013 hij1nx
 * Licensed under the MIT license.
 */
