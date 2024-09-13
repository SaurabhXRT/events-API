// import puppeteer from "puppeteer-extra";
// import StealthPlugin from "puppeteer-extra-plugin-stealth";
// puppeteer.use(StealthPlugin());
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
import chrome from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";
export var puppeteerService = /*#__PURE__*/ function() {
    "use strict";
    function puppeteerService() {
        _class_call_check(this, puppeteerService);
    }
    _create_class(puppeteerService, [
        {
            key: "puppeteerRun",
            value: function puppeteerRun(searchquery) {
                var _this = this;
                return _async_to_generator(function() {
                    var options, _tmp, browser, page, url, hrefs;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                options = {};
                                _tmp = {
                                    args: _to_consumable_array(chrome.args).concat([
                                        "--hide-scrollbars",
                                        "--disable-web-security"
                                    ]),
                                    defaultViewport: chrome.defaultViewport
                                };
                                return [
                                    4,
                                    chrome.executablePath
                                ];
                            case 1:
                                options = (_tmp.executablePath = _state.sent(), _tmp.headless = true, _tmp.ignoreHTTPSErrors = true, _tmp);
                                return [
                                    4,
                                    puppeteer.launch(options)
                                ];
                            case 2:
                                browser = _state.sent();
                                return [
                                    4,
                                    browser.newPage()
                                ];
                            case 3:
                                page = _state.sent();
                                console.log("Starting to search by: ".concat(searchquery));
                                url = "https://www.google.com/search?q=".concat(searchquery);
                                return [
                                    4,
                                    page.goto(url, {
                                        waitUntil: "networkidle2"
                                    })
                                ];
                            case 4:
                                _state.sent();
                                return [
                                    4,
                                    _this.ScanforLinks(page)
                                ];
                            case 5:
                                hrefs = _state.sent();
                                return [
                                    4,
                                    browser.close()
                                ];
                            case 6:
                                _state.sent();
                                return [
                                    2,
                                    hrefs
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "ScanforLinks",
            value: function ScanforLinks(page) {
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            page.evaluate(function() {
                                var anchors = Array.from(document.querySelectorAll("a"));
                                var hrefs = anchors.map(function(anchor) {
                                    return anchor.href;
                                }).filter(function(href) {
                                    return href.includes("http") && !href.includes("google");
                                });
                                console.log(hrefs);
                                return hrefs;
                            })
                        ];
                    });
                })();
            }
        }
    ]);
    return puppeteerService;
}();
