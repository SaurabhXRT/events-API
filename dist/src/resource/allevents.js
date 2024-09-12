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
import puppeteerExtra from 'puppeteer-extra';
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import chromium from "chrome-aws-lambda";
puppeteerExtra.use(StealthPlugin());
export var Allevents = /*#__PURE__*/ function() {
    "use strict";
    function Allevents() {
        _class_call_check(this, Allevents);
    }
    _create_class(Allevents, [
        {
            key: "scrapeAllevents",
            value: function scrapeAllevents(url) {
                var _this = this;
                return _async_to_generator(function() {
                    var browser, _, _tmp, page, events;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _ = puppeteerExtra.launch;
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
                                    _.apply(puppeteerExtra, [
                                        (_tmp.executablePath = _state.sent(), _tmp.headless = true, _tmp)
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
                                    _this.scrapAlleventsMainPage(page)
                                ];
                            case 5:
                                events = _state.sent();
                                return [
                                    4,
                                    page.close()
                                ];
                            case 6:
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
            key: "scrapAlleventsMainPage",
            value: function scrapAlleventsMainPage(page) {
                return _async_to_generator(function() {
                    var selectorExists, events;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    page.evaluate(function() {
                                        return document.querySelector(".event-card-parent") !== null;
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
                                    page.waitForSelector(".event-card-parent")
                                ];
                            case 2:
                                _state.sent();
                                return [
                                    4,
                                    page.click(".event-card-parent")
                                ];
                            case 3:
                                _state.sent();
                                return [
                                    4,
                                    page.evaluate(function() {
                                        var eventCards = document.querySelectorAll(".event-card");
                                        return Array.from(eventCards).map(function(card) {
                                            var _card_querySelector, _card_querySelector1, _card_querySelector2, _card_querySelector3, _card_querySelector4, _imageUrl_match, _card_querySelector5;
                                            var title = ((_card_querySelector = card.querySelector(".title a h3")) === null || _card_querySelector === void 0 ? void 0 : _card_querySelector.textContent.trim()) || "";
                                            var eventTime = ((_card_querySelector1 = card.querySelector(".meta-bottom .date")) === null || _card_querySelector1 === void 0 ? void 0 : _card_querySelector1.textContent.trim()) || "";
                                            var venue = ((_card_querySelector2 = card.querySelector(".subtitle")) === null || _card_querySelector2 === void 0 ? void 0 : _card_querySelector2.textContent.trim()) || "";
                                            var link = ((_card_querySelector3 = card.querySelector(".title a")) === null || _card_querySelector3 === void 0 ? void 0 : _card_querySelector3.href) || "";
                                            var imageUrl = (_card_querySelector4 = card.querySelector(".banner-cont")) === null || _card_querySelector4 === void 0 ? void 0 : _card_querySelector4.style.backgroundImage;
                                            imageUrl = imageUrl ? ((_imageUrl_match = imageUrl.match(/url\("(.+?)"\)/)) === null || _imageUrl_match === void 0 ? void 0 : _imageUrl_match[1]) || "" : "";
                                            var price = ((_card_querySelector5 = card.querySelector(".price-container .price")) === null || _card_querySelector5 === void 0 ? void 0 : _card_querySelector5.textContent.trim()) || "";
                                            return {
                                                title: title,
                                                venue: venue,
                                                price: price,
                                                imageUrl: imageUrl,
                                                eventTime: eventTime,
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
        }
    ]);
    return Allevents;
}();
