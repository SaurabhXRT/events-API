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
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import chromium from 'chrome-aws-lambda';
puppeteer.use(StealthPlugin());
export var BookMyshow = /*#__PURE__*/ function() {
    "use strict";
    function BookMyshow() {
        _class_call_check(this, BookMyshow);
    }
    _create_class(BookMyshow, [
        {
            key: "scrapeBookMyShow",
            value: function scrapeBookMyShow(url) {
                var _this = this;
                return _async_to_generator(function() {
                    var browser, _, _tmp, page, events, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, event, details, err;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _ = puppeteer.launch;
                                _tmp = {
                                    args: chromium.args,
                                    defaultViewport: chromium.defaultViewport
                                };
                                return [
                                    4,
                                    chromium.executablePath
                                ];
                            case 1:
                                return [
                                    4,
                                    _.apply(puppeteer, [
                                        (_tmp.executablePath = _state.sent(), _tmp.headless = true, _tmp.ignoreDefaultArgs = [
                                            '--disable-extensions'
                                        ], _tmp)
                                    ])
                                ];
                            case 2:
                                browser = _state.sent();
                                return [
                                    4,
                                    browser.newPage()
                                ];
                            case 3:
                                page = _state.sent();
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
                                    _this.scrapeBookMyShowMainPage(page)
                                ];
                            case 5:
                                events = _state.sent();
                                _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                                _state.label = 6;
                            case 6:
                                _state.trys.push([
                                    6,
                                    11,
                                    12,
                                    13
                                ]);
                                _iterator = events[Symbol.iterator]();
                                _state.label = 7;
                            case 7:
                                if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                                    3,
                                    10
                                ];
                                event = _step.value;
                                if (!event.link) return [
                                    3,
                                    9
                                ];
                                return [
                                    4,
                                    _this.scrapeBookMyShowEventPage(browser, event.link)
                                ];
                            case 8:
                                details = _state.sent();
                                event.moreinformation = details.moreinformation;
                                event.eventTime = details.eventTime;
                                event.description = details.description;
                                _state.label = 9;
                            case 9:
                                _iteratorNormalCompletion = true;
                                return [
                                    3,
                                    7
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
                                return [
                                    4,
                                    page.close()
                                ];
                            case 14:
                                _state.sent();
                                return [
                                    2,
                                    events
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "scrapeBookMyShowMainPage",
            value: function scrapeBookMyShowMainPage(page) {
                return _async_to_generator(function() {
                    var selectorExists, events;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    page.evaluate(function() {
                                        return document.querySelector(".kLLnFs") !== null;
                                    })
                                ];
                            case 1:
                                selectorExists = _state.sent();
                                if (!selectorExists) {
                                    return [
                                        2,
                                        []
                                    ];
                                }
                                return [
                                    4,
                                    page.waitForSelector(".kLLnFs")
                                ];
                            case 2:
                                _state.sent();
                                return [
                                    4,
                                    page.click(".kLLnFs")
                                ];
                            case 3:
                                _state.sent();
                                return [
                                    4,
                                    page.evaluate(function() {
                                        var eventCards = document.querySelectorAll("a.commonStyles__LinkWrapper-sc-133848s-11");
                                        return Array.from(eventCards).map(function(card) {
                                            var _card_querySelector, _card_querySelector1, _typeElements_, _typeElements_1, _card_querySelector2;
                                            var title = ((_card_querySelector = card.querySelector(".dxpBCo")) === null || _card_querySelector === void 0 ? void 0 : _card_querySelector.textContent) || "";
                                            var venue = ((_card_querySelector1 = card.querySelector(".fUgjVu")) === null || _card_querySelector1 === void 0 ? void 0 : _card_querySelector1.textContent) || "";
                                            var typeElements = card.querySelectorAll(".dgMmMO");
                                            var type = ((_typeElements_ = typeElements[0]) === null || _typeElements_ === void 0 ? void 0 : _typeElements_.textContent) || "No type";
                                            var price = ((_typeElements_1 = typeElements[1]) === null || _typeElements_1 === void 0 ? void 0 : _typeElements_1.textContent) || "No price";
                                            var link = card.href || "";
                                            var imageUrl = ((_card_querySelector2 = card.querySelector("img")) === null || _card_querySelector2 === void 0 ? void 0 : _card_querySelector2.src) || "";
                                            console.log(link);
                                            console.log(card.outerHTML);
                                            return {
                                                title: title,
                                                venue: venue,
                                                type: type,
                                                price: price,
                                                imageUrl: imageUrl,
                                                link: link
                                            };
                                        });
                                    })
                                ];
                            case 4:
                                events = _state.sent();
                                return [
                                    2,
                                    events
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "scrapeBookMyShowEventPage",
            value: function scrapeBookMyShowEventPage(browser, eventLink) {
                return _async_to_generator(function() {
                    var page, eventDetails, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    6,
                                    ,
                                    7
                                ]);
                                return [
                                    4,
                                    browser.newPage()
                                ];
                            case 1:
                                page = _state.sent();
                                return [
                                    4,
                                    page.goto(eventLink, {
                                        waitUntil: "networkidle2"
                                    })
                                ];
                            case 2:
                                _state.sent();
                                return [
                                    4,
                                    page.waitForSelector(".df-aw")
                                ];
                            case 3:
                                _state.sent();
                                return [
                                    4,
                                    page.evaluate(function() {
                                        var _document_querySelector, _document_querySelector1, _document_querySelector2;
                                        var moreinformation = ((_document_querySelector = document.querySelector(".df-at")) === null || _document_querySelector === void 0 ? void 0 : _document_querySelector.textContent) || "No title";
                                        var eventTime = ((_document_querySelector1 = document.querySelector(".df-av")) === null || _document_querySelector1 === void 0 ? void 0 : _document_querySelector1.textContent) || "No time";
                                        var description = ((_document_querySelector2 = document.querySelector(".df-eo p")) === null || _document_querySelector2 === void 0 ? void 0 : _document_querySelector2.textContent) || "No description";
                                        return {
                                            moreinformation: moreinformation,
                                            eventTime: eventTime,
                                            description: description
                                        };
                                    })
                                ];
                            case 4:
                                eventDetails = _state.sent();
                                return [
                                    4,
                                    page.close()
                                ];
                            case 5:
                                _state.sent();
                                return [
                                    2,
                                    eventDetails
                                ];
                            case 6:
                                error = _state.sent();
                                console.error("Failed to scrape event page ".concat(eventLink, ": ").concat(error.message));
                                return [
                                    2,
                                    {
                                        error: error.message
                                    }
                                ];
                            case 7:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        }
    ]);
    return BookMyshow;
}();
