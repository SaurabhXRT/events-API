function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
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
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
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
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
import { puppeteerService } from "./puppeteerService.js";
//import logger from "../logger/logger.js";
import { BookMyshow } from "../resource/bookmyshow.js";
import { InsiderIN } from "../resource/insider.in.js";
import { Allevents } from "../resource/allevents.js";
import { isBookMyShowUrl, isInsiderInUrl, isAlleventsUrl } from "../helpers/urlHelpers.js";
var service = new puppeteerService();
var bookmyshowservice = new BookMyshow();
var insiderinservice = new InsiderIN();
var alleventsservice = new Allevents();
export var SearchService = /*#__PURE__*/ function() {
    "use strict";
    function SearchService() {
        _class_call_check(this, SearchService);
    }
    _create_class(SearchService, [
        {
            key: "searchService",
            value: function searchService(query) {
                return _async_to_generator(function() {
                    var response, results, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, url, _results, events, _results1, events1, _results2, events2, err, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    14,
                                    ,
                                    15
                                ]);
                                return [
                                    4,
                                    service.puppeteerRun(query)
                                ];
                            case 1:
                                response = _state.sent();
                                if (response.length == 0) {
                                    return [
                                        2,
                                        "no result found"
                                    ];
                                }
                                results = [];
                                _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                                _state.label = 2;
                            case 2:
                                _state.trys.push([
                                    2,
                                    11,
                                    12,
                                    13
                                ]);
                                _iterator = response[Symbol.iterator]();
                                _state.label = 3;
                            case 3:
                                if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                                    3,
                                    10
                                ];
                                url = _step.value;
                                if (!isBookMyShowUrl(url)) return [
                                    3,
                                    5
                                ];
                                console.log("Processing BookMyShow URL: ".concat(url));
                                return [
                                    4,
                                    bookmyshowservice.scrapeBookMyShow(url)
                                ];
                            case 4:
                                events = _state.sent();
                                (_results = results).push.apply(_results, _to_consumable_array(events));
                                return [
                                    3,
                                    9
                                ];
                            case 5:
                                if (!isInsiderInUrl(url)) return [
                                    3,
                                    7
                                ];
                                console.log("Processing InsiderIN URL: ".concat(url));
                                return [
                                    4,
                                    insiderinservice.scrapeInsiderIn(url)
                                ];
                            case 6:
                                events1 = _state.sent();
                                (_results1 = results).push.apply(_results1, _to_consumable_array(events1));
                                return [
                                    3,
                                    9
                                ];
                            case 7:
                                if (!isAlleventsUrl(url)) return [
                                    3,
                                    9
                                ];
                                console.log("Processing Allevents URL: ".concat(url));
                                return [
                                    4,
                                    alleventsservice.scrapeAllevents(url)
                                ];
                            case 8:
                                events2 = _state.sent();
                                (_results2 = results).push.apply(_results2, _to_consumable_array(events2));
                                _state.label = 9;
                            case 9:
                                _iteratorNormalCompletion = true;
                                return [
                                    3,
                                    3
                                ];
                            case 10:
                                return [
                                    3,
                                    13
                                ];
                            case 11:
                                err = _state.sent();
                                _didIteratorError = true;
                                _iteratorError = err;
                                return [
                                    3,
                                    13
                                ];
                            case 12:
                                try {
                                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                                        _iterator.return();
                                    }
                                } finally{
                                    if (_didIteratorError) {
                                        throw _iteratorError;
                                    }
                                }
                                return [
                                    7
                                ];
                            case 13:
                                //console.log(results);
                                return [
                                    2,
                                    results
                                ];
                            case 14:
                                error = _state.sent();
                                console.log(error);
                                throw new Error("error while getting events data");
                            case 15:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        }
    ]);
    return SearchService;
}();
