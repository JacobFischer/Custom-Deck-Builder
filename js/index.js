webpackJsonp([0],{

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(179));
__export(__webpack_require__(75));
__export(__webpack_require__(180));
__export(__webpack_require__(76));
function cloneExceptEmpty() {
    var result = {};

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var arg = _step.value;

            for (var key in arg) {
                if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key] !== "") {
                    result[key] = arg[key];
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return result;
}
exports.cloneExceptEmpty = cloneExceptEmpty;
function clone() {
    var _Object$assign;

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    return (_Object$assign = Object.assign).call.apply(_Object$assign, [Object, {}].concat(args));
}
exports.clone = clone;

/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./background-cost.png": 193,
	"./background-vp-negative.png": 194,
	"./background-vp-normal.png": 195,
	"./crisis.png": 196,
	"./equipment.png": 197,
	"./hero.png": 198,
	"./location.png": 199,
	"./oversized-super-hero.png": 200,
	"./oversized-super-villain.png": 201,
	"./starter.png": 202,
	"./super-hero.png": 203,
	"./super-power.png": 204,
	"./super-villain.png": 205,
	"./villain.png": 206,
	"./vp-variable.png": 207,
	"./weakness.png": 208
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 158;

/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(176));

/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(191);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(15)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var styles = {
    defaults: {
        defaults: {
            dropShadow: false,
            fill: "#000000",
            fontFamily: "CompactaBT",
            fontSize: 32,
            lineJoin: "round"
        },
        cost: {
            fill: "#000000",
            fontFamily: "CompactaBdBT",
            fontSize: 91.67,
            fontWeight: "bold",
            letterSpacing: 0.06,
            padding: 100,
            stroke: "#646569",
            strokeThickness: 18
        },
        name: {
            dropShadow: true,
            dropShadowAngle: 60 * Math.PI / 180,
            dropShadowBlur: 0,
            dropShadowColor: "#000000",
            dropShadowDistance: 12,
            fill: "#ffffff",
            fontSize: 83.333,
            letterSpacing: -0.9,
            padding: 100
        },
        subtype: {
            fontSize: 33.333,
            letterSpacing: 1.375
        },
        type: {
            fill: "#ffffff",
            fontSize: 66.667,
            letterSpacing: 2.75,
            padding: 100
        },
        text: {
            fill: "#000000",
            fontFamily: "TradeGothic",
            fontSize: 38,
            letterSpacing: -0.84,
            padding: 0
        },
        vp: {
            fill: "#000000",
            fontSize: 48.75,
            padding: 100,
            stroke: "#fcb041",
            strokeThickness: 6
        },
        copyright: {
            fill: "#000000",
            fontFamily: "TradeGothic",
            fontSize: 21,
            letterSpacing: -0.20
        },
        legal: {
            fill: "#ffffff",
            fontFamily: "TradeGothic",
            fontSize: 21.5,
            letterSpacing: -0.20
        },
        set: {
            fontFamily: "CompactaBT",
            fontSize: 30,
            letterSpacing: 1,
            padding: 100
        }
    },
    oversized: {
        copyright: {
            fill: "#ffffff",
            fontSize: 21.5
        },
        name: {
            fill: "#ffc70e",
            fontSize: 108.33,
            letterSpacing: 1
        },
        set: {
            fontSize: 22
        },
        subtype: {
            dropShadow: true,
            dropShadowAngle: 60 * Math.PI / 180,
            dropShadowBlur: 0,
            dropShadowColor: "#000000",
            dropShadowDistance: 6,
            fill: "#ffc70e",
            fontSize: 60
        },
        text: {
            fill: "#ffffff"
        }
    },
    Equipment: {
        type: {
            fill: "#000000"
        }
    },
    Hero: {
        name: {
            fill: "#00a5e3"
        }
    },
    SuperPower: {
        name: {
            fill: "#f77d27"
        },
        type: {
            fill: "#000000"
        }
    },
    Villain: {
        name: {
            fill: "#ed2122"
        }
    },
    Location: {
        name: {
            fill: "#ea078c"
        }
    },
    Starter: {
        name: {
            fill: "#fff200"
        },
        type: {
            fill: "#000000"
        }
    },
    Weakness: {
        name: {
            fill: "#8dc73f"
        },
        type: {
            fill: "#000000"
        }
    }
};
function getStyle(type, part) {
    var oversized = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var style = Object.assign({}, styles.defaults.defaults);
    if (part === "subtype") {
        Object.assign(style, styles.defaults.type);
    }
    if (styles.defaults[part]) {
        Object.assign(style, styles.defaults[part]);
    }
    type = type.replace(" ", "");
    if (styles[type]) {
        if (part === "subtype") {
            Object.assign(style, styles[type].type);
        }
        if (styles[type][part]) {
            Object.assign(style, styles[type][part]);
        }
    }
    if (oversized && styles.oversized[part]) {
        Object.assign(style, styles.oversized[part]);
    }
    return new PIXI.TextStyle(style);
}
exports.getStyle = getStyle;

/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(10);
var card_styles_1 = __webpack_require__(162);
exports.CARD_MAX_WIDTH = 900;
exports.CARD_MAX_HEIGHT = 1200;

var Card = function () {
    function Card(args) {
        _classCallCheck(this, Card);

        this.pxWidth = exports.CARD_MAX_WIDTH;
        this.pxHeight = exports.CARD_MAX_HEIGHT;
        this.name = "Card Name";
        this.type = "Starter";
        this.variant = false;
        this.oversized = false;
        this.typePrefix = "";
        this.victoryPoints = 1;
        this.cost = 1;
        this.text = "";
        this.imageURL = "";
        this.logoURL = "";
        this.logoScale = 1;
        this.copyright = String(new Date().getFullYear());
        this.legal = "";
        this.subtype = "";
        this.set = "";
        this.setTextColor = "#cccccc";
        this.setBackgroundColor = "#333333";
        this.preferredTextSize = 0;
        this.alsoBold = [];
        this.roundCorners = true;
        if (args) {
            this.setFrom(args);
        }
    }

    _createClass(Card, [{
        key: "setFrom",
        value: function setFrom(args) {
            args = Object.assign({}, args);
            args.victoryPoints = args.victoryPoints || args.vp || args.VP || args.vP || 0;
            for (var key in args) {
                if (Object.prototype.hasOwnProperty.call(this, key)) {
                    this[key] = args[key];
                }
            }
            if (this.type === "Super Hero") {
                this.type = "Hero";
                this.oversized = true;
            } else if (this.type === "Super Villain") {
                this.type = "Villain";
                this.oversized = true;
            }
            var isHeroOrVillain = this.type === "Hero" || this.type === "Villain";
            if (this.oversized && !isHeroOrVillain) {
                this.oversized = false;
            }
            if (this.oversized) {
                this.pxWidth = exports.CARD_MAX_WIDTH;
                this.pxHeight = exports.CARD_MAX_HEIGHT;
            } else {
                this.pxWidth = 750;
                this.pxHeight = 1050;
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _1.loadTextures([_this.imageURL, _this.logoURL], function () {
                    _this.renderSync();
                    resolve(_this.container);
                });
            });
        }
    }, {
        key: "renderSync",
        value: function renderSync() {
            if (this.container) {
                this.container.removeChild(this.container);
            }
            this.container = new PIXI.Container();
            this.renderImage();
            this.renderBackground();
            this.renderLogo();
            this.renderCost();
            this.renderVP();
            this.renderName();
            this.renderType();
            this.renderSubType();
            this.renderText();
            var copyright = this.renderCopyright();
            var set = this.renderSet(copyright);
            this.renderLegal(set, copyright);
            this.renderRoundedCorners();
            return this.container;
        }
    }, {
        key: "toString",
        value: function toString() {
            return "Card " + this.name;
        }
    }, {
        key: "formatText",
        value: function formatText() {
            var formattedText = this.text;
            formattedText = _1.surroundText(formattedText, /\+(.*?)\ Power/g, "[b]", "[/b]");
            formattedText = _1.surroundText(formattedText, /(\d)\ Power/g, "[b]", "[/b]");
            formattedText = _1.surroundText(formattedText, /\(([^)]+)\)/g, "[i]", "[/i]");
            formattedText = _1.surroundText(formattedText, /(Stack)\ Ongoing/g, "[b]", "[/b]");
            var boldKeywords = Card.autoBoldKeywords.concat([this.name]).concat(this.alsoBold);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = boldKeywords[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var toBold = _step.value;

                    formattedText = _1.replaceAll(formattedText, toBold, "[b]" + toBold + "[/b]");
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return formattedText;
        }
    }, {
        key: "getStyle",
        value: function getStyle(part) {
            return card_styles_1.getStyle(this.type, part, this.oversized);
        }
    }, {
        key: "renderImage",
        value: function renderImage() {
            if (!this.imageURL) {
                return;
            }
            var imageMaxWidth = 750;
            var imageMaxHeight = 523;
            var imageTop = 117;
            if (this.oversized) {
                imageMaxWidth = 900;
                imageMaxHeight = 741;
                imageTop = 216;
            }
            var backgroundImage = _1.newSprite(this.imageURL, this.container);
            backgroundImage.position.x = imageMaxWidth / 2;
            backgroundImage.position.y = imageTop + imageMaxHeight / 2;
            var backgroundBounds = backgroundImage.getBounds();
            var scale = Math.max(imageMaxWidth / backgroundBounds.width, imageMaxHeight / backgroundBounds.height);
            backgroundBounds = backgroundImage.getLocalBounds();
            backgroundImage.scale.set(scale, scale);
            backgroundImage.pivot.x = backgroundBounds.width / 2;
            backgroundImage.pivot.y = backgroundBounds.height / 2;
            var backgroundImageMask = new PIXI.Graphics();
            backgroundImageMask.beginFill(0);
            backgroundImageMask.drawRect(0, imageTop, imageMaxWidth, imageMaxHeight);
            backgroundImageMask.endFill();
            this.container.addChild(backgroundImageMask);
            backgroundImage.mask = backgroundImageMask;
        }
    }, {
        key: "renderBackground",
        value: function renderBackground() {
            if (!this.type) {
                return;
            }
            var backgroundType = this.type;
            if (this.variant || this.oversized) {
                if (this.type === "Hero" || this.type === "Villain") {
                    backgroundType = "Super-" + this.type;
                }
            }
            if (this.oversized) {
                backgroundType = "Oversized-" + backgroundType;
            }
            _1.newSprite(backgroundType.replace(" ", "-").toLowerCase(), this.container);
            if (this.variant && !this.oversized) {
                var graphics = new PIXI.Graphics();
                graphics.beginFill(0x000000);
                graphics.drawRect(0, 719, 750, 224);
                graphics.endFill();
                this.container.addChild(graphics);
            }
        }
    }, {
        key: "renderLogo",
        value: function renderLogo() {
            if (!this.logoURL) {
                return;
            }
            var maxLogoWidth = 175;
            var maxLogoHeight = 175;
            var logoSprite = _1.newSprite(this.logoURL, this.container);
            var bounds = logoSprite.getBounds();
            var scale = 1;
            if (bounds.width > maxLogoWidth) {
                scale = Math.min(scale, maxLogoWidth / bounds.width);
            }
            if (bounds.height > maxLogoHeight) {
                scale = Math.min(scale, maxLogoHeight / bounds.height);
            }
            if (this.logoScale) {
                scale *= this.logoScale;
            }
            var x = 714;
            var y = 26;
            if (this.oversized) {
                x = exports.CARD_MAX_WIDTH - 40;
                y = 25;
            }
            bounds = logoSprite.getLocalBounds();
            logoSprite.scale.set(scale, scale);
            logoSprite.pivot.x = bounds.width;
            logoSprite.position.set(x, y);
        }
    }, {
        key: "renderName",
        value: function renderName() {
            var x = 45;
            var y = 48;
            if (this.oversized) {
                x = 53;
                y = 55;
            }
            var cardName = new PIXI.Text(this.name.toUpperCase(), this.getStyle("name"));
            cardName.position.set(x, y);
            cardName.scale.y *= 0.75;
            cardName.scale.x *= 0.96;
            cardName.skew.x = -0.265;
            this.container.addChild(cardName);
        }
    }, {
        key: "renderType",
        value: function renderType() {
            if (this.oversized || this.type === "Weakness") {
                return;
            }
            var text = this.type.toUpperCase();
            if (this.typePrefix) {
                text = this.typePrefix + " " + text;
            }
            var cardTypeText = new PIXI.Text(text, this.getStyle("type"));
            cardTypeText.x = 45;
            cardTypeText.y = 666;
            cardTypeText.scale.y *= 0.75;
            cardTypeText.scale.x *= 0.96;
            cardTypeText.skew.x = -0.265;
            this.container.addChild(cardTypeText);
        }
    }, {
        key: "renderSubType",
        value: function renderSubType() {
            if (!this.subtype) {
                return;
            }
            var x = 710;
            var y = 700;
            if (this.oversized) {
                x = 900 - 39;
                y = 950;
            }
            var subtypeText = new PIXI.Text(this.subtype.toUpperCase(), this.getStyle("subtype"));
            subtypeText.scale.y *= 0.75;
            subtypeText.scale.x *= 0.96;
            subtypeText.skew.x = -0.265;
            subtypeText.pivot.set(subtypeText.width, subtypeText.height);
            subtypeText.position.set(x, y);
            this.container.addChild(subtypeText);
        }
    }, {
        key: "renderCost",
        value: function renderCost() {
            if (this.oversized) {
                return;
            }
            _1.newSprite("background-cost", this.container);
            var cardCostBackStyle = this.getStyle("cost");
            var cardCostBackText = new PIXI.Text(String(this.cost), cardCostBackStyle);
            cardCostBackText.pivot.x = cardCostBackText.width / 2;
            cardCostBackText.pivot.y = cardCostBackText.height / 2;
            cardCostBackText.position.set(641, 958);
            this.container.addChild(cardCostBackText);
            var cardCostFrontStyle = cardCostBackStyle.clone();
            cardCostFrontStyle.stroke = "#ffffff";
            cardCostFrontStyle.strokeThickness = 10;
            var cardCostFrontText = new PIXI.Text(String(this.cost), cardCostFrontStyle);
            cardCostFrontText.pivot.x = cardCostFrontText.width / 2;
            cardCostFrontText.pivot.y = cardCostFrontText.height / 2;
            cardCostFrontText.position.set(641, 958);
            this.container.addChild(cardCostFrontText);
        }
    }, {
        key: "renderVP",
        value: function renderVP() {
            if (this.oversized) {
                return;
            }
            var vpSign = this.victoryPoints < 0 ? "negative" : "normal";
            _1.newSprite("background-vp-" + vpSign, this.container);
            if (this.victoryPoints === "*") {
                _1.newSprite("vp-variable", this.container);
            } else {
                var scalar = 2;
                var vpStyle = this.getStyle("vp");
                if (this.victoryPoints < 0) {
                    vpStyle.stroke = "#9dcd4e";
                }
                vpStyle.fontSize = Number(vpStyle.fontSize) * scalar;
                vpStyle.strokeThickness = Number(vpStyle.strokeThickness) * scalar;
                var vps = String(Math.abs(this.victoryPoints));
                var vpText = new PIXI.Text(vps, vpStyle);
                vpText.scale.y *= 0.75 / scalar;
                vpText.scale.x *= 1 / scalar;
                var bounds = vpText.getLocalBounds();
                vpText.pivot.set(bounds.width / 2, bounds.height / 2);
                vpText.position.set(88, 982);
                this.container.addChild(vpText);
            }
        }
    }, {
        key: "renderText",
        value: function renderText() {
            var formattedText = this.formatText();
            formattedText = _1.replaceAll(formattedText, "[b]", _1.wrapStyledTextCharacters.boldStart);
            formattedText = _1.replaceAll(formattedText, "[/b]", _1.wrapStyledTextCharacters.boldEnd);
            formattedText = _1.replaceAll(formattedText, "[i]", _1.wrapStyledTextCharacters.italicStart);
            formattedText = _1.replaceAll(formattedText, "[/i]", _1.wrapStyledTextCharacters.italicEnd);
            var vpCircle = new PIXI.Circle(603, 215, 78 + 5);
            var collisions = [];
            var maxWidth = 750;
            var maxHeight = 172;
            var x = 39;
            var y = 731;
            if (this.oversized) {
                y = 974;
                maxWidth = 900;
                maxHeight = 161 - 14 * 2;
            } else {
                collisions.push(vpCircle);
            }
            var style = this.getStyle("text");
            if (this.variant && !this.oversized) {
                style.fill = "#ffffff";
            }
            if (this.preferredTextSize > 0) {
                style.fontSize = this.preferredTextSize;
            }
            var textContainer = _1.autoSizeAndWrapStyledText(formattedText, maxWidth - x * 2, maxHeight, style, 1, collisions, this.oversized, this.oversized);
            textContainer.position.set(x, y);
            this.container.addChild(textContainer);
        }
    }, {
        key: "renderSet",
        value: function renderSet(copyright) {
            if (!this.set) {
                return;
            }
            var style = this.getStyle("set");
            style.fill = this.setTextColor || "#ffffff";
            var set = new PIXI.Text(this.set.toUpperCase(), style);
            set.scale.y *= 0.75;
            set.pivot.set(set.width, set.height);
            if (this.oversized) {
                set.position.x = copyright.x - copyright.width - 16;
                set.position.y = 1171 - set.height;
            } else {
                set.position.set(550, 934);
            }
            var xPad = 4;
            var topPad = 3;
            var bottomPad = 4;
            var backgroundColor = this.setBackgroundColor || "#000000";
            var graphics = new PIXI.Graphics();
            graphics.beginFill(parseInt(backgroundColor.replace(/^#/, ""), 16));
            graphics.drawRoundedRect(set.x - set.width - xPad, set.y - set.height - topPad, set.width + xPad * 2, set.height + bottomPad * 2, 8);
            graphics.endFill();
            this.container.addChild(graphics);
            this.container.addChild(set);
            return set;
        }
    }, {
        key: "renderCopyright",
        value: function renderCopyright() {
            var maxWidth = 332;
            var x = 223;
            var y = 941;
            if (this.oversized) {
                maxWidth = 182;
                x = 900 - 37;
                y = 1136;
            }
            var style = this.getStyle("copyright");
            if (this.variant && !this.oversized) {
                style.fill = "#ffffff";
            }
            var copyright = _1.wrapStyledText("\xA9" + this.copyright, maxWidth, style);
            if (this.oversized) {
                copyright.pivot.x = copyright.width;
            } else {
                copyright.pivot.y = copyright.height;
            }
            copyright.position.set(x, y);
            this.container.addChild(copyright);
            return copyright;
        }
    }, {
        key: "renderLegal",
        value: function renderLegal(set, copyright) {
            var maxWidth = 332;
            var x = 223;
            var y = 954;
            var style = this.getStyle("legal");
            var legal = void 0;
            if (this.oversized) {
                maxWidth = 824;
                x = 37;
                y = 1136;
                if (set) {
                    maxWidth -= set.width + 16;
                }
                if (copyright) {
                    maxWidth -= copyright.width + 16;
                }
                legal = _1.autoSizeAndWrapStyledText(this.legal, maxWidth, Number(style.fontSize) * 2, style, 0.25);
            } else {
                legal = _1.wrapStyledText(this.legal, maxWidth, this.getStyle("legal"));
            }
            if (legal) {
                legal.position.set(x, y);
                this.container.addChild(legal);
            }
        }
    }, {
        key: "renderRoundedCorners",
        value: function renderRoundedCorners() {
            if (!this.roundCorners) {
                return;
            }
            var borderRadius = this.oversized ? 45 : 37;
            var bleedMask = new PIXI.Graphics();
            bleedMask.beginFill(0, 1);
            bleedMask.drawRoundedRect(0, 0, this.pxWidth, this.pxHeight, borderRadius);
            bleedMask.endFill();
            this.container.addChild(bleedMask);
            this.container.mask = bleedMask;
        }
    }]);

    return Card;
}();

Card.autoBoldKeywords = ["+Power", ":", "Attacked", "Attack", "Defense", "Ongoing", "Weakness"];
exports.Card = Card;

/***/ }),

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var csvParse = __webpack_require__(192);
var events_1 = __webpack_require__(22);
var JSZip = __webpack_require__(250);
var PIXI = __webpack_require__(64);
var initialize_1 = __webpack_require__(71);
var _1 = __webpack_require__(10);
var card_1 = __webpack_require__(73);
var readmeText = __webpack_require__(381);
var MAX_TEXTURE_LENGTH = 4096;

var DeckBuilder = function (_events_1$EventEmitte) {
    _inherits(DeckBuilder, _events_1$EventEmitte);

    function DeckBuilder() {
        var maxWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
        var maxHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 7;

        _classCallCheck(this, DeckBuilder);

        var _this = _possibleConstructorReturn(this, (DeckBuilder.__proto__ || Object.getPrototypeOf(DeckBuilder)).call(this));

        _this.maxWidth = maxWidth;
        _this.maxHeight = maxHeight;
        return _this;
    }

    _createClass(DeckBuilder, [{
        key: "buildCards",
        value: function buildCards(csvText) {
            var _this2 = this;

            this.csvText = csvText;
            return new Promise(function (resolve, reject) {
                _this2.parse(csvText).then(function (cards) {
                    var oversizedCards = cards.filter(function (card) {
                        return card.oversized;
                    });
                    var normalCards = cards.filter(function (card) {
                        return !card.oversized;
                    });
                    _this2.emit(DeckBuilder.EventSymbols.parsed, normalCards.length, oversizedCards.length);
                    _this2.renderAllCards(normalCards, oversizedCards, {}, 1, function (cardImages) {
                        _this2.emit(DeckBuilder.EventSymbols.doneRendering);
                        _this2.zipCards(cardImages).then(resolve);
                    });
                }).catch(reject);
            });
        }
    }, {
        key: "parse",
        value: function parse(csv) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var csvOptions = {
                    columns: true,
                    ltrim: true,
                    rtrim: true,
                    skip_empty_lines: true,
                    auto_parse: true
                };
                csvParse(csv, csvOptions, function (err, data) {
                    if (err) {
                        return reject(new Error("Could not parse CSV File: " + err.message));
                    }
                    var cards = _this3.parseCards(data);
                    resolve(cards);
                });
            });
        }
    }, {
        key: "parseCards",
        value: function parseCards(data) {
            var baseCard = {};
            var baseOversizedCard = {};
            var cards = [];
            if (!data) {
                return;
            }
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var cardData = _step.value;

                    var sanitized = {
                        roundCorners: false
                    };
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = Object.keys(cardData)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var key = _step2.value;

                            var value = cardData[key];
                            key = _1.toCamelCase(key);
                            if (key.startsWith("#")) {
                                continue;
                            }
                            if (key === "vp" || key === "vps") {
                                key = "victorypoints";
                            }
                            if (key === "variant" && typeof value !== "boolean") {
                                value = Boolean(value);
                            }
                            if (key === "alsoBold" && value !== "") {
                                value = value.split(",");
                            }
                            if (value !== "") {
                                if (typeof value === "string") {
                                    value = _1.tryToCast(value);
                                }
                                sanitized[key] = value;
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    if (sanitized.name === "__defaults__") {
                        Object.assign(baseCard, sanitized);
                    } else if (sanitized.name === "__oversized_defaults__") {
                        Object.assign(baseOversizedCard, baseCard);
                        Object.assign(baseOversizedCard, sanitized);
                    } else {
                        var base = sanitized.oversized ? baseOversizedCard : baseCard;
                        sanitized = Object.assign({}, base, sanitized);
                    }
                    if (sanitized.name !== "__defaults__" && sanitized.name !== "__oversized_defaults__") {
                        var card = new card_1.Card(sanitized);
                        cards.push(card);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return cards;
        }
    }, {
        key: "renderAllCards",
        value: function renderAllCards(normalCards, oversizedCards, cardImages, batch, callback) {
            var _this4 = this;

            this.emit(DeckBuilder.EventSymbols.batchStart, batch);
            this.renderCards(normalCards, oversizedCards).then(function (app) {
                if (!app) {
                    callback(cardImages);
                }
                app.render();
                app.view.toBlob(function (blob) {
                    _this4.emit(DeckBuilder.EventSymbols.batchComplete, batch);
                    cardImages["card-" + batch + ".png"] = blob;
                    _this4.destroyPIXITextures(app.stage);
                    for (var textureKey in PIXI.loader.resources) {
                        if (!initialize_1.initialTextures.hasOwnProperty(textureKey)) {
                            PIXI.loader.resources[textureKey].texture.destroy(true);
                            delete PIXI.loader.resources[textureKey];
                            delete PIXI.utils.TextureCache[textureKey];
                            delete PIXI.utils.BaseTextureCache[textureKey];
                        }
                    }
                    app.destroy(true);
                    if (normalCards.length || oversizedCards.length) {
                        batch++;
                        _this4.renderAllCards(normalCards, oversizedCards, cardImages, batch, callback);
                    } else {
                        callback(cardImages);
                    }
                });
            });
        }
    }, {
        key: "destroyPIXITextures",
        value: function destroyPIXITextures(obj) {
            if (obj instanceof PIXI.Sprite) {
                if (!initialize_1.initialTexturesToKey.has(obj.texture)) {
                    obj.destroy(true);
                }
            }
            if (obj instanceof PIXI.Container) {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = obj.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var child = _step3.value;

                        this.destroyPIXITextures(child);
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            }
        }
    }, {
        key: "renderCards",
        value: function renderCards(normalCards, oversizedCards) {
            var _this5 = this;

            return new Promise(function (resolve, reject) {
                var cards = normalCards.length ? normalCards : oversizedCards;
                if (cards.length === 0) {
                    resolve(null);
                }
                var maxWidth = _this5.maxWidth;
                var maxHeight = _this5.maxHeight;
                var i = 0;
                var textures = new Set();
                var currentCards = [];
                while (cards.length) {
                    i++;
                    var card = cards.shift();
                    currentCards.push(card);
                    textures.add(card.imageURL);
                    textures.add(card.logoURL);
                    if (i === maxWidth * maxHeight) {
                        break;
                    }
                }
                _1.loadTextures(Array.from(textures), function () {
                    var unloadedTextures = [];
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = textures[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var texture = _step4.value;

                            var resource = PIXI.loader.resources[texture];
                            if (!resource || resource.error) {
                                unloadedTextures.push(texture);
                            }
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
                        }
                    }

                    if (unloadedTextures.length) {
                        var errorTextures = unloadedTextures.join(", ");
                        _this5.emit(DeckBuilder.EventSymbols.error, "Could not load textures: " + errorTextures);
                    }
                    _this5.emit(DeckBuilder.EventSymbols.batchTexturesLoaded);
                    var cardWidth = currentCards[0].pxWidth;
                    var cardHeight = currentCards[0].pxHeight;
                    var renders = currentCards.map(function (card) {
                        return card.renderSync();
                    });
                    var width = 2;
                    var height = 1;
                    while (width * height < renders.length) {
                        if (width < maxWidth) {
                            width++;
                        }
                        if (height < maxHeight && width * height < renders.length) {
                            height++;
                        }
                    }
                    maxWidth = width;
                    maxHeight = height;
                    var resizedWidth = cardWidth;
                    var resizedHeight = cardHeight;
                    var ourAspectRatio = cardHeight / cardWidth;
                    if (resizedWidth * maxWidth > resizedHeight * maxHeight) {
                        resizedWidth = Math.floor(MAX_TEXTURE_LENGTH / maxWidth);
                        resizedHeight = Math.round(resizedWidth * ourAspectRatio);
                    } else {
                        resizedHeight = Math.floor(MAX_TEXTURE_LENGTH / maxHeight);
                        resizedWidth = Math.round(resizedHeight * (1 / ourAspectRatio));
                    }
                    if (resizedWidth > cardWidth) {
                        resizedWidth = cardWidth;
                        resizedHeight = cardHeight;
                    }
                    var app = new PIXI.Application(resizedWidth * maxWidth, resizedHeight * maxHeight, { antialias: true });
                    var scale = resizedWidth / cardWidth;
                    for (var r = 0; r < renders.length; r++) {
                        var x = r % maxWidth;
                        var y = Math.floor(r / maxWidth);
                        var render = renders[r];
                        render.cacheAsBitmap = true;
                        app.stage.addChild(render);
                        if (scale !== 1) {
                            render.scale.set(scale);
                        }
                        render.pivot.set(0, 0);
                        render.position.set(x * resizedWidth, y * resizedHeight);
                        app.stage.addChild(render);
                    }
                    resolve(app);
                });
            });
        }
    }, {
        key: "zipCards",
        value: function zipCards(cardImages) {
            var _this6 = this;

            return new Promise(function (resolve, reject) {
                var zip = new JSZip();
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = Object.keys(cardImages)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var key = _step5.value;

                        zip.file(key, cardImages[key]);
                    }
                } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                            _iterator5.return();
                        }
                    } finally {
                        if (_didIteratorError5) {
                            throw _iteratorError5;
                        }
                    }
                }

                zip.file("source-spreadsheet.csv", _this6.csvText);
                zip.file("readme.txt", readmeText.replace("{width}", _this6.maxWidth).replace("{height}", _this6.maxHeight));
                zip.generateAsync({ type: "blob" }).then(function (content) {
                    _this6.generatedZip = content;
                    _this6.emit(DeckBuilder.EventSymbols.zipped);
                    resolve(_this6.generatedZip);
                });
            });
        }
    }]);

    return DeckBuilder;
}(events_1.EventEmitter);

DeckBuilder.EventSymbols = {
    error: Symbol("error"),
    parsed: Symbol("parsed"),
    doneRendering: Symbol("doneRendering"),
    batchStart: Symbol("batchStart"),
    batchTexturesLoaded: Symbol("batchTexturesLoaded"),
    batchComplete: Symbol("batchComplete"),
    zipped: Symbol("zipped")
};
exports.DeckBuilder = DeckBuilder;

/***/ }),

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(27);
var entireReadme = __webpack_require__(244);

var AboutTab = function (_$Tab) {
    _inherits(AboutTab, _$Tab);

    function AboutTab() {
        _classCallCheck(this, AboutTab);

        var container = document.createElement("div");

        var _this = _possibleConstructorReturn(this, (AboutTab.__proto__ || Object.getPrototypeOf(AboutTab)).call(this, "About", container));

        var readme = String(entireReadme);
        container.innerHTML = readme.substr(0, readme.indexOf("<hr"));
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = container.getElementsByTagName("h1")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var h1 = _step.value;

                h1.remove();
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return _this;
    }

    return AboutTab;
}(_1.Tab);

exports.default = AboutTab;

/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var filesaver = __webpack_require__(222);
var path_1 = __webpack_require__(8);
var deck_builder_1 = __webpack_require__(164);
var _1 = __webpack_require__(27);
var _2 = __webpack_require__(10);
var store = __webpack_require__(149);
var hbs = __webpack_require__(224);
__webpack_require__(403);
var tabTemplate = _2.template(hbs);

var DeckGeneratorTab = function (_$Tab) {
    _inherits(DeckGeneratorTab, _$Tab);

    function DeckGeneratorTab() {
        _classCallCheck(this, DeckGeneratorTab);

        var _this = _possibleConstructorReturn(this, (DeckGeneratorTab.__proto__ || Object.getPrototypeOf(DeckGeneratorTab)).call(this, "Deck Generator", tabTemplate()));

        _this.fakeLabelElement = _2.select(_this.element, ".file-name");
        _this.noneSelectedElement = _2.select(_this.fakeLabelElement, ".none-selected");
        _this.generateButton = _2.select(_this.element, ".generate-button");
        _this.maxCardsXInput = _2.select(_this.element, ".max-cards-x-input");
        _this.maxCardsYInput = _2.select(_this.element, ".max-cards-y-input");
        _this.progressBarElement = _2.select(_this.element, ".progress-bar-foreground");
        _this.generationLog = _2.select(_this.element, ".generation-log");
        _this.downloadButton = _2.select(_this.element, ".download-button");
        _this.inputElement = _2.select(_this.element, ".csv-file-selector");
        _this.generationDiv = _2.select(_this.element, ".generation");
        _this.inputElement.addEventListener("change", function () {
            return _this.updateFileInput();
        });
        _this.generateButton.addEventListener("click", function () {
            return _this.generate();
        });
        _this.downloadButton.addEventListener("click", function () {
            return _this.download();
        });
        _this.setupCardDimension(_this.maxCardsXInput, "x", 10, 7);
        _this.setupCardDimension(_this.maxCardsYInput, "y", 7, 5);
        _this.maxCardsXInput.value = String(store.get("max-cards-x") || 7);
        _this.maxCardsXInput.addEventListener("change", function () {
            store.set("max-cards-x", Number(_this.maxCardsXInput.value));
        });
        _this.maxCardsYInput.value = String(store.get("max-cards-y") || 5);
        _this.maxCardsYInput.addEventListener("change", function () {
            store.set("max-cards-y", Number(_this.maxCardsYInput.value));
        });
        _this.updateFileInput();
        return _this;
    }

    _createClass(DeckGeneratorTab, [{
        key: "updateFileInput",
        value: function updateFileInput() {
            var fakeValue = this.inputElement.value;
            this.fakeLabelElement.innerHTML = path_1.basename(_2.replaceAll(fakeValue, "\\", "/"));
            if (!fakeValue) {
                this.fakeLabelElement.appendChild(this.noneSelectedElement);
            }
            this.generateButton.disabled = !fakeValue;
            this.generateButton.title = fakeValue ? "" : "Please select a file to generate you deck from.";
        }
    }, {
        key: "setupCardDimension",
        value: function setupCardDimension(input, coordinate, max, startingValue) {
            var id = "max-cards-" + coordinate;
            input.value = String(store.get(id) || startingValue);
            input.min = "2";
            input.max = "" + max;
            input.addEventListener("change", function () {
                var value = input.valueAsNumber;
                if (!value || value > Number(input.max) || value < Number(input.min)) {
                    value = startingValue;
                }
                store.set(id, value);
                input.valueAsNumber = value;
            });
        }
    }, {
        key: "generate",
        value: function generate() {
            var _this2 = this;

            var file = this.inputElement.files[0];
            if (file) {
                _2.expand(this.generationDiv).then(function () {
                    return _this2.startGenerating(file);
                });
            }
        }
    }, {
        key: "startGenerating",
        value: function startGenerating(file) {
            var _this3 = this;

            this.generateButton.disabled = true;
            this.inputElement.disabled = true;
            this.maxCardsXInput.disabled = true;
            this.maxCardsYInput.disabled = true;
            this.log("Reading local file...");
            var reader = new FileReader();
            reader.readAsText(file);
            reader.addEventListener("load", function () {
                var width = Number(_this3.maxCardsXInput.value);
                var height = Number(_this3.maxCardsYInput.value);
                var deckBuilder = new deck_builder_1.DeckBuilder(width, height);
                _this3.generateButton.innerText = "Generating...";
                deckBuilder.on(deck_builder_1.DeckBuilder.EventSymbols.error, function (error) {
                    _this3.log(error, true);
                });
                var batches = 1;
                var currentBatch = 1;
                var renderingProgress = 0.9;
                deckBuilder.on(deck_builder_1.DeckBuilder.EventSymbols.parsed, function (numNormalCards, numOversizedCards) {
                    _this3.log("File parsed.");
                    _this3.log(" &bull; " + numNormalCards + " normal sized cards found.");
                    _this3.log(" &bull; " + numOversizedCards + " oversized cards found.");
                    var cardsPerBatch = width * height;
                    batches = Math.ceil(numNormalCards / cardsPerBatch) + Math.ceil(numOversizedCards / cardsPerBatch);
                    _this3.setProgress(0.02);
                });
                deckBuilder.on(deck_builder_1.DeckBuilder.EventSymbols.batchStart, function (batch) {
                    currentBatch = batch;
                    _this3.setProgress(renderingProgress * ((currentBatch - 1) / batches));
                    _this3.log("Batch " + currentBatch + "/" + batches + " - Downloading card images.");
                });
                deckBuilder.on(deck_builder_1.DeckBuilder.EventSymbols.batchTexturesLoaded, function (batch) {
                    _this3.setProgress(renderingProgress * (currentBatch - 0.6667) / batches);
                    _this3.log("Batch " + currentBatch + "/" + batches + " - All card images downloaded.");
                });
                deckBuilder.on(deck_builder_1.DeckBuilder.EventSymbols.batchComplete, function (batch) {
                    _this3.setProgress(renderingProgress * (currentBatch - 0.3333) / batches);
                    _this3.log("Batch " + currentBatch + "/" + batches + " - Rendering completed.");
                });
                deckBuilder.on(deck_builder_1.DeckBuilder.EventSymbols.doneRendering, function (batch) {
                    _this3.setProgress(renderingProgress);
                    _this3.log("All card batches have been rendered.");
                    _this3.log("Zipping up cards into one achieve.");
                });
                deckBuilder.on(deck_builder_1.DeckBuilder.EventSymbols.zipped, function (batch) {
                    _this3.setProgress(1);
                    _this3.log("Zip file ready for download.");
                    _this3.generateButton.innerText = "Generated!";
                    _this3.downloadButton.disabled = false;
                });
                deckBuilder.buildCards(reader.result).then(function (zip) {
                    _this3.generatedZip = zip;
                }).catch(function (err) {
                    _this3.log(err.message, true);
                    _this3.log("Deck generation aborted due to fatal error", true);
                });
            });
        }
    }, {
        key: "log",
        value: function log(str, error) {
            var li = document.createElement("li");
            if (error) {
                str = "Error: " + str;
                li.classList.add("error");
            }
            li.innerHTML = str;
            this.generationLog.appendChild(li);
        }
    }, {
        key: "setProgress",
        value: function setProgress(scale) {
            var percent = scale * 100;
            this.progressBarElement.style.width = percent + "%";
            this.progressBarElement.innerHTML = percent.toFixed(0) + "%";
        }
    }, {
        key: "download",
        value: function download() {
            if (this.generatedZip) {
                filesaver.saveAs(this.generatedZip, "generated-deck.zip");
            }
        }
    }]);

    return DeckGeneratorTab;
}(_1.Tab);

exports.DeckGeneratorTab = DeckGeneratorTab;

/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(166));

/***/ }),

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var card_options_1 = __webpack_require__(72);
var table_1 = __webpack_require__(74);
var _1 = __webpack_require__(27);
var utils_1 = __webpack_require__(10);
var hbs = __webpack_require__(225);
__webpack_require__(404);
var tabTemplate = utils_1.template(hbs);
var typeTitles = {
    "text": "Normal alphanumeric text.",
    "number": "A number, no text.",
    "checkbox": "If the cell is empty that counts as unchecked (false). " + "Any other value, such as \"X\" indicate that cell is checked.",
    "url": "Text that is a valid URL to an image",
    "color": "A hexadecimal color in the format #FF0000 (red)",
    "text list": "A list of words or text items. Indicate a new text in the " + "list via a comma and space \", \". E.g. \"Some Card Name, Some " + "Special Term, Bold This too\""
};

var HelpTab = function (_$Tab) {
    _inherits(HelpTab, _$Tab);

    function HelpTab() {
        _classCallCheck(this, HelpTab);

        var _this = _possibleConstructorReturn(this, (HelpTab.__proto__ || Object.getPrototypeOf(HelpTab)).call(this, "Help", tabTemplate()));

        var columns = [{
            name: "Column Name",
            id: "name",
            notEditable: true
        }, {
            name: "Type",
            id: "type",
            notEditable: true
        }, {
            name: "Description",
            id: "description",
            notEditable: true
        }];
        _this.cardOptionsTable = new table_1.EditableTable(utils_1.select(_this.element, ".card-options"), columns, card_options_1.CardOptionsList);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = _this.element.getElementsByTagName("td")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var td = _step.value;

                var title = typeTitles[utils_1.removeTags(td.innerHTML)];
                if (title) {
                    td.title = title;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return _this;
    }

    return HelpTab;
}(_1.Tab);

exports.HelpTab = HelpTab;

/***/ }),

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(168));

/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var about_1 = __webpack_require__(165);
var _1 = __webpack_require__(167);
var _2 = __webpack_require__(169);
var _3 = __webpack_require__(171);
function getTabs() {
    return [new _3.LiveEditorTab(), new _1.DeckGeneratorTab(), new _2.HelpTab(), new about_1.default()];
}
exports.getTabs = getTabs;

/***/ }),

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(173));

/***/ }),

/***/ 172:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var card_options_1 = __webpack_require__(72);
var _1 = __webpack_require__(10);
function addTitlesTo(columns) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = columns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var column = _step.value;

            var name = column.name;
            if (name === "Delete") {
                continue;
            }
            if (name === "VP") {
                name = "Victory Points";
            }
            column.rowsTitle = _1.stripTagsFromString(card_options_1.CardOptions[name].description);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}
var deleteButton = document.createElement("button");
deleteButton.innerHTML = "&#x2716;";
deleteButton.setAttribute("title", "Delete this row");
exports.defaultsHeadings = [{
    name: "Name",
    notEditable: true
}, {
    name: "Set"
}, {
    name: "Set Text Color",
    color: true
}, {
    name: "Set Background Color",
    color: true
}, {
    name: "Copyright"
}, {
    name: "Legal",
    longText: true
}, {
    name: "Logo URL"
}, {
    name: "Logo Scale",
    type: "number",
    inputAttributes: {
        min: 0.010,
        max: 2,
        step: 0.001
    }
}];
addTitlesTo(exports.defaultsHeadings);
exports.defaultsRows = [{
    name: "__defaults__",
    logoURL: "https://i.imgur.com/J6SuXcE.png",
    set: "Teen Titans",
    setTextColor: "#ffec34",
    setBackgroundColor: "#ed1c24",
    copyright: "2015 CZE",
    legal: "TEEN TITANS and all related character and elements are trademarks and © DC Comics\n(s15)",
    logoScale: 0.975
}];
exports.cardsHeadings = [{
    name: "Name"
}, {
    name: "Type",
    allowedValues: ["Equipment", "Hero", "Location", "Starter", "Super Power", "Villain", "Weakness"]
}, {
    name: "Text",
    longText: true
}, {
    name: "Cost",
    type: "number"
}, {
    name: "VP",
    id: "victoryPoints",
    type: "number"
}, {
    name: "Subtype"
}, {
    name: "Variant",
    type: "boolean"
}, {
    name: "Oversized",
    type: "boolean",
    transform: function transform(checked, row) {
        if (checked && row.values.type !== "Hero" && row.values.type !== "Villain") {
            return false;
        }
        return checked;
    }
}, {
    name: "Image URL"
}, {
    name: "Delete",
    type: "node",
    defaultValue: deleteButton
}];
addTitlesTo(exports.cardsHeadings);
exports.cardsRows = [{
    name: "Vulnerability",
    type: "Starter",
    text: "",
    imageURL: "https://i.imgur.com/em2ZPJG.png",
    vp: 0,
    cost: 0
}, {
    name: "Wonder Girl",
    type: "Hero",
    oversized: true,
    imageURL: "https://i.imgur.com/RjNwCAX.png",
    text: "Once during each of your turns, if you control two or more " + "Equipment, draw two cards and then discard a card."
}];

/***/ }),

/***/ 173:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = __webpack_require__(64);
var _1 = __webpack_require__(73);
var table_1 = __webpack_require__(74);
var _2 = __webpack_require__(27);
var _3 = __webpack_require__(10);
var store = __webpack_require__(149);
var live_editor_tables_1 = __webpack_require__(172);
var hbs = __webpack_require__(226);
__webpack_require__(405);
var tabTemplate = _3.template(hbs);

var LiveEditorTab = function (_$Tab) {
    _inherits(LiveEditorTab, _$Tab);

    function LiveEditorTab() {
        _classCallCheck(this, LiveEditorTab);

        var _this = _possibleConstructorReturn(this, (LiveEditorTab.__proto__ || Object.getPrototypeOf(LiveEditorTab)).call(this, "Live Editor", tabTemplate()));

        _this.maxCustomCards = 6;
        _this.cards = new Map();
        _this.canvases = new Map();
        _this.tooManyCardsElement = _3.select(_this.element, ".too-many-cards");
        _this.canvasesElement = _3.select(_this.element, ".canvases");
        _this.addRowButton = _3.select(_this.element, ".add-row-button");
        _this.scaleSlider = _3.select(_this.element, ".canvases-scale-slider");
        _this.scaleSlider.addEventListener("input", function () {
            return _this.resizeCanvases();
        });
        _this.scaleSliderPercent = _3.select(_this.element, ".canvases-scale-percent");
        _this.scaleSlider.value = store.get("card-scale") || 0.5;
        _this.defaultsTable = new table_1.EditableTable(_3.select(_this.element, ".defaults-table"));
        _this.defaultsTable.addColumns(live_editor_tables_1.defaultsHeadings);
        _this.defaultsTable.on(table_1.EditableTable.EventSymbols.rowAdded, function (rowValues, row) {
            setTimeout(function () {
                return row.tr.classList.add("shown");
            }, 50);
        });
        _this.defaultsTable.on(table_1.EditableTable.EventSymbols.cellChanged, function (row) {
            _this.updateStore(_this.defaultsTable);
            _this.renderAllCards();
        });
        _this.defaultsTable.addRows(store.get("card-defaults") || live_editor_tables_1.defaultsRows);
        var cardsElement = _3.select(_this.element, ".cards-table");
        _this.cardsTable = new table_1.EditableTable(cardsElement);
        _this.cardsTable.on(table_1.EditableTable.EventSymbols.rowAdded, function (rowValues, row) {
            _this.updateStore(_this.cardsTable);
            _this.rowAdded(row);
        });
        _this.cardsTable.on(table_1.EditableTable.EventSymbols.cellChanged, function (row) {
            _this.updateStore(_this.cardsTable);
            _this.renderCard(row);
        });
        _this.cardsTable.on(table_1.EditableTable.EventSymbols.rowDeleted, function (row) {
            _this.updateStore(_this.cardsTable);
            _this.rowDeleted(row);
        });
        _this.app = new PIXI.Application(_1.CARD_MAX_WIDTH, _1.CARD_MAX_HEIGHT, { antialias: true, transparent: true });
        _this.clearGraphics = new PIXI.Graphics();
        _this.app.stage.addChild(_this.clearGraphics);
        _this.cardsTable.addColumns(live_editor_tables_1.cardsHeadings);
        _this.cardsTable.addRows(store.get("cards") || live_editor_tables_1.cardsRows);
        _this.addRowButton.addEventListener("click", function () {
            _this.cardsTable.addRow(live_editor_tables_1.cardsRows[0]);
        });
        _this.resetToDefaultsButton = _3.select(_this.element, ".reset-to-defaults");
        _this.resetToDefaultsButton.addEventListener("click", function () {
            _this.resetToDefaults();
        });
        return _this;
    }

    _createClass(LiveEditorTab, [{
        key: "rowAdded",
        value: function rowAdded(row) {
            var _this2 = this;

            var canvas = document.createElement("canvas");
            setTimeout(function () {
                canvas.classList.add("shown");
                row.tr.classList.add("shown");
            }, 50);
            var deleteButton = row.values.delete;
            deleteButton.addEventListener("click", function () {
                row.tr.classList.remove("shown");
                canvas.classList.remove("shown");
                _this2.checkMaxCards(_this2.cardsTable.rows.length - 1);
                setTimeout(function () {
                    _this2.cardsTable.deleteRow(row);
                }, 355);
            });
            var card = new _1.Card(row.values);
            this.cards.set(row, card);
            this.canvases.set(row, canvas);
            this.canvasesElement.appendChild(canvas);
            this.renderCard(row);
            this.checkMaxCards(this.cardsTable.rows.length);
        }
    }, {
        key: "rowDeleted",
        value: function rowDeleted(row) {
            this.updateStore(this.cardsTable);
            this.cards.delete(row);
            this.canvases.get(row).remove();
            this.canvases.delete(row);
        }
    }, {
        key: "renderAllCards",
        value: function renderAllCards() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.cardsTable.getAllRows()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var row = _step.value;

                    this.renderCard(row);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: "renderCard",
        value: function renderCard(row) {
            var _this3 = this;

            var card = this.cards.get(row);
            var canvas = this.canvases.get(row);
            this.clearGraphics.beginFill(0x000000, 0);
            this.clearGraphics.drawRect(0, 0, card.pxWidth, card.pxHeight);
            var defaults = _3.clone(this.defaultsTable.getRow(0).values);
            var args = _3.clone(defaults, row.values);
            card.setFrom(args);
            card.render().then(function (container) {
                _this3.checkForErrors(row, card);
                _this3.app.stage.addChild(container);
                _this3.app.render();
                canvas.width = card.pxWidth;
                canvas.height = card.pxHeight;
                canvas.getContext("2d").drawImage(_this3.app.view, 0, 0);
                _this3.app.stage.removeChild(container);
                _this3.resizeCanvases(canvas);
            });
        }
    }, {
        key: "resizeCanvases",
        value: function resizeCanvases(canvas) {
            var scale = Number(this.scaleSlider.value);
            var asPercent = Math.round(scale * 10000) / 100;
            this.scaleSliderPercent.innerHTML = asPercent + "%";
            store.set("card-scale", scale);
            var elements = void 0;
            if (canvas) {
                elements = [canvas];
            } else {
                elements = this.canvasesElement.getElementsByTagName("canvas");
            }
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = elements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var element = _step2.value;

                    var width = Number(element.getAttribute("width"));
                    var height = Number(element.getAttribute("height"));
                    element.style.width = width * scale + "px";
                    element.style.height = height * scale + "px";
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: "checkForErrors",
        value: function checkForErrors(row, card) {
            this.checkIfImageLoaded(row, card, "imageURL");
            this.checkIfImageLoaded(this.defaultsTable.rows[0], card, "logoURL");
        }
    }, {
        key: "checkIfImageLoaded",
        value: function checkIfImageLoaded(row, card, key) {
            var resource = PIXI.loader.resources[card[key]];
            var td = row.tr.getElementsByClassName("column-" + key)[0];
            td.classList.toggle("error", Boolean(resource.error) || !resource || !resource.texture);
        }
    }, {
        key: "updateStore",
        value: function updateStore(table) {
            var storeKey = table === this.cardsTable ? "cards" : "card-defaults";
            store.set(storeKey, table.rows.map(function (row) {
                return row.values;
            }));
        }
    }, {
        key: "resetToDefaults",
        value: function resetToDefaults() {
            var _this4 = this;

            var cards = this.cardsTable.rows.slice();
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = cards[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var row = _step3.value;

                    row.tr.classList.remove("shown");
                    this.canvases.get(row).classList.remove("shown");
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            var defaults = this.defaultsTable.rows.slice();
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = defaults[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var _row2 = _step4.value;

                    _row2.tr.classList.remove("shown");
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            this.scaleSlider.value = String(0.5);
            setTimeout(function () {
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = cards[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var row = _step5.value;

                        _this4.cardsTable.deleteRow(row);
                    }
                } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                            _iterator5.return();
                        }
                    } finally {
                        if (_didIteratorError5) {
                            throw _iteratorError5;
                        }
                    }
                }

                var _iteratorNormalCompletion6 = true;
                var _didIteratorError6 = false;
                var _iteratorError6 = undefined;

                try {
                    for (var _iterator6 = defaults[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                        var _row = _step6.value;

                        _this4.defaultsTable.deleteRow(_row);
                    }
                } catch (err) {
                    _didIteratorError6 = true;
                    _iteratorError6 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion6 && _iterator6.return) {
                            _iterator6.return();
                        }
                    } finally {
                        if (_didIteratorError6) {
                            throw _iteratorError6;
                        }
                    }
                }

                setTimeout(function () {
                    _this4.defaultsTable.addRows(live_editor_tables_1.defaultsRows);
                    _this4.updateStore(_this4.defaultsTable);
                    _this4.cardsTable.addRows(live_editor_tables_1.cardsRows);
                    _this4.updateStore(_this4.cardsTable);
                }, 50);
            }, 355);
        }
    }, {
        key: "checkMaxCards",
        value: function checkMaxCards(numberOfCards) {
            var tooManyCards = numberOfCards >= this.maxCustomCards;
            this.addRowButton.disabled = tooManyCards;
            this.tooManyCardsElement.classList.toggle("collapsed", !tooManyCards);
        }
    }]);

    return LiveEditorTab;
}(_2.Tab);

exports.LiveEditorTab = LiveEditorTab;

/***/ }),

/***/ 174:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(10);

var Tab = function Tab(name, element) {
    _classCallCheck(this, Tab);

    this.name = name;
    this.element = element;
    this.id = _1.toDashCase(this.name);
};

exports.default = Tab;

/***/ }),

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = __webpack_require__(22);
var _1 = __webpack_require__(10);
var hbs = __webpack_require__(227);
var tabularTemplate = _1.template(hbs);

var Tabular = function (_events_1$EventEmitte) {
    _inherits(Tabular, _events_1$EventEmitte);

    function Tabular(tabs, parent) {
        _classCallCheck(this, Tabular);

        var _this = _possibleConstructorReturn(this, (Tabular.__proto__ || Object.getPrototypeOf(Tabular)).call(this));

        _this.tabToContent = new Map();
        _this.tabToListElement = new Map();
        _this.timeouts = new Set();
        _this.element = tabularTemplate();
        _this.tabsList = _1.select(_this.element, "ul");
        _this.tabsContents = _1.select(_this.element, ".tabular-contents");
        if (tabs) {
            _this.setTabs(tabs);
        }
        if (parent) {
            _this.setParent(parent);
        }
        return _this;
    }

    _createClass(Tabular, [{
        key: "setTabs",
        value: function setTabs(tabs, startingTab) {
            var _this2 = this;

            this.tabs = tabs;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                var _loop = function _loop() {
                    var tab = _step.value;

                    var li = document.createElement("li");
                    li.innerHTML = tab.name;
                    li.addEventListener("click", function () {
                        return _this2.changeTab(tab);
                    });
                    _this2.tabsList.appendChild(li);
                    _this2.tabToListElement.set(tab, li);
                    var div = document.createElement("div");
                    div.classList.add("tab-contents");
                    div.appendChild(tab.element);
                    _this2.tabsContents.appendChild(div);
                    _this2.tabToContent.set(tab, div);
                };

                for (var _iterator = tabs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    _loop();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.changeTab(startingTab || tabs[0]);
        }
    }, {
        key: "setParent",
        value: function setParent(parent) {
            this.parent = parent;
            parent.appendChild(this.element);
        }
    }, {
        key: "getTabByID",
        value: function getTabByID(id) {
            return this.tabs.find(function (tab) {
                return tab.id === id;
            });
        }
    }, {
        key: "changeTab",
        value: function changeTab(toTab) {
            var _this3 = this;

            var found = this.tabs.find(function (aTab) {
                return aTab === toTab;
            });
            if (!found) {
                throw new Error("Cannot change to Tab " + toTab + " because it is not a tab of ours.");
            }
            var oldTab = this.currentTab;
            this.currentTab = toTab;
            if (oldTab) {
                this.tabToListElement.get(oldTab).classList.remove("current");
            }
            this.tabToListElement.get(this.currentTab).classList.add("current");
            var newContent = this.tabToContent.get(this.currentTab);
            var oldContent = this.tabToContent.get(oldTab);
            if (!oldTab) {
                newContent.classList.add("current");
                newContent.classList.remove("hidden");
                this.hideTabs();
            } else {
                this.tabsContents.style.height = oldContent.clientHeight + "px";
                oldContent.classList.remove("current");
                newContent.classList.remove("hidden");
                this.clearTimeouts();
                this.setTimeout(function () {
                    newContent.remove();
                    _this3.tabsContents.insertBefore(newContent, _this3.tabsContents.firstChild);
                    _this3.setTimeout(function () {
                        oldContent.classList.add("hidden");
                        newContent.classList.add("current");
                        _this3.tabsContents.style.height = newContent.clientHeight + "px";
                        _this3.setTimeout(function () {
                            _this3.tabsContents.style.height = "";
                            _this3.hideTabs();
                            _this3.emit(Tabular.EventSymbols.tabChanged, toTab);
                        }, 355);
                    }, 50);
                }, 355);
            }
            this.emit(Tabular.EventSymbols.tabChanging, toTab);
        }
    }, {
        key: "hideTabs",
        value: function hideTabs() {
            this.tabToContent.get(this.currentTab).classList.remove("hidden");
            this.tabToListElement.get(this.currentTab).classList.add("current");
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.tabs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _tab = _step2.value;

                    if (_tab !== this.currentTab) {
                        this.tabToContent.get(_tab).classList.add("hidden");
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: "setTimeout",
        value: function (_setTimeout) {
            function setTimeout(_x, _x2) {
                return _setTimeout.apply(this, arguments);
            }

            setTimeout.toString = function () {
                return _setTimeout.toString();
            };

            return setTimeout;
        }(function (callback, time) {
            var _this4 = this;

            var timer = setTimeout(function () {
                _this4.timeouts.delete(timer);
                callback();
            }, time);
            this.timeouts.add(timer);
        })
    }, {
        key: "clearTimeouts",
        value: function clearTimeouts() {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.timeouts[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var timer = _step3.value;

                    clearTimeout(timer);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            this.timeouts.clear();
        }
    }]);

    return Tabular;
}(events_1.EventEmitter);

Tabular.EventSymbols = {
    tabChanging: Symbol("tabChanging"),
    tabChanged: Symbol("tabChanged")
};
exports.Tabular = Tabular;

/***/ }),

/***/ 176:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(170);
var _2 = __webpack_require__(27);
var _3 = __webpack_require__(10);
var hbs = __webpack_require__(228);
__webpack_require__(407);
var uiTemplate = _3.template(hbs);

var UI = function UI(element) {
    var _this = this;

    _classCallCheck(this, UI);

    this.title = "Cryptozoic Game Engine";
    this.subtitle = "Custom Deck Builder";
    this.tabsChanging = true;
    this.parent = element;
    this.element = uiTemplate(this);
    this.parent.appendChild(this.element);
    this.mainElement = _3.select(this.element, "main");
    document.documentElement.setAttribute("data-browser", navigator.userAgent);
    document.title = this.title + " - " + this.subtitle;
    var faviconLink = document.createElement("link");
    faviconLink.href = __webpack_require__(213);
    faviconLink.rel = "icon";
    faviconLink.type = "image/png";
    document.head.appendChild(faviconLink);
    this.tabular = new _2.Tabular();
    this.tabular.on(_2.Tabular.EventSymbols.tabChanging, function (tab) {
        _this.tabsChanging = true;
        window.location.hash = tab.id;
    });
    this.tabular.on(_2.Tabular.EventSymbols.tabChanged, function (tab) {
        _this.tabsChanging = false;
    });
    var tabs = _1.getTabs();
    var startingTab = tabs[0];
    if (window.location.hash) {
        startingTab = tabs.find(function (tab) {
            return tab.id === window.location.hash.substr(1);
        });
    }
    this.tabular.setTabs(tabs, startingTab);
    this.tabular.setParent(this.mainElement);
    this.tabsChanging = false;
    document.body.onhashchange = function () {
        if (_this.tabsChanging) {
            return;
        }
        var hash = window.location.hash.substr(1);
        var tab = _this.tabular.getTabByID(hash);
        if (tab) {
            _this.tabular.changeTab(tab);
        }
    };
};

exports.UI = UI;

/***/ }),

/***/ 177:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(160);
__webpack_require__(161);
var ui_1 = __webpack_require__(159);
var initialize_1 = __webpack_require__(71);
var unloadedMessage = document.createElement("p");
document.body.appendChild(unloadedMessage);
unloadedMessage.classList.add("unloaded-message");
unloadedMessage.innerText = "Loading...";
initialize_1.initialize(function () {
    unloadedMessage.remove();
    new ui_1.UI(document.body);
});

/***/ }),

/***/ 178:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var FontFaceObserver = __webpack_require__(223);
__webpack_require__(408);
var fonts = {
    CompactaBT: ["regular", "bold", "italics"],
    CompactaBdBT: ["regular", "bold"],
    TradeGothic: ["regular", "bold", "italics"]
};
var ready = {};
var onReady = {
    callback: null
};
function checkIfReady() {
    var areWeReady = true;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.keys(ready)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            if (!ready[key]) {
                areWeReady = false;
                break;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    if (areWeReady && onReady.callback) {
        onReady.callback();
    }
}
var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
    var _loop = function _loop() {
        var fontFamily = _step2.value;

        var font = fonts[fontFamily];
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            var _loop2 = function _loop2() {
                var fontType = _step3.value;

                ready[fontFamily + fontType] = false;
                var properties = void 0;
                if (fontType !== "regular") {
                    properties = fontType === "bold" ? { weight: "bold" } : { style: "italic" };
                }
                new FontFaceObserver(fontFamily, properties).load().then(function () {
                    ready[fontFamily + fontType] = true;
                    checkIfReady();
                }, function () {
                    var message = fontFamily + " " + fontType + " could not be loaded";
                    onReady.callback(new Error(message));
                });
            };

            for (var _iterator3 = font[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                _loop2();
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }
    };

    for (var _iterator2 = Object.keys(fonts)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        _loop();
    }
} catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
} finally {
    try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
        }
    } finally {
        if (_didIteratorError2) {
            throw _iteratorError2;
        }
    }
}

function onFontsLoaded(callback) {
    onReady.callback = callback;
    checkIfReady();
}
exports.onFontsLoaded = onFontsLoaded;

/***/ }),

/***/ 179:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function createNodeFromTemplate(required, args) {
    var tempDiv = document.createElement("div");
    tempDiv.innerHTML = required(args);
    var node = tempDiv.firstChild;
    node.parentElement.removeChild(node);
    return node;
}
function template(required) {
    return function (args) {
        return createNodeFromTemplate(required, args);
    };
}
exports.template = template;
function expand(element) {
    return new Promise(function (resolve, reject) {
        element.classList.add("measuring");
        setTimeout(function () {
            var height = element.clientHeight + "px";
            element.classList.remove("measuring");
            setTimeout(function () {
                element.style.height = height;
                element.classList.add("expanded");
                setTimeout(function () {
                    element.classList.remove("expanded", "expandable");
                    element.style.height = "";
                    resolve();
                }, 350);
            }, 50);
        }, 50);
    });
}
exports.expand = expand;
function select(from, query) {
    if (query.startsWith(".")) {
        return from.getElementsByClassName(query.substr(1))[0];
    }
    if (query.startsWith("#")) {
        return document.getElementById(query.substr(1));
    }
    return from.getElementsByTagName(query)[0];
}
exports.select = select;

/***/ }),

/***/ 180:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = __webpack_require__(75);
function newSprite(textureKey, container) {
    var resource = PIXI.loader.resources[textureKey];
    if (!resource) {
        throw new Error("No resource found for key " + textureKey);
    }
    var sprite = new PIXI.Sprite(resource.texture);
    if (container) {
        container.addChild(sprite);
    }
    return sprite;
}
exports.newSprite = newSprite;
var backlogTextures = new Set();
var backlogCallbacks = [];
function loadTextures(textures, callback) {
    var filtered = new Set(textures.filter(function (t) {
        return t && !PIXI.loader.resources[t];
    }));
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = filtered[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _texture = _step.value;

            backlogTextures.add(_texture);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    if (callback) {
        backlogCallbacks.push(callback);
    }
    if (backlogTextures.size) {
        if (PIXI.loader.loading) {
            return;
        }
        var nowLoading = new Set(backlogTextures);
        var nowCallbacks = backlogCallbacks.slice();
        backlogTextures.clear();
        backlogCallbacks.length = 0;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = nowLoading[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var texture = _step2.value;

                PIXI.loader.add({
                    url: texture,
                    key: texture,
                    crossOrigin: true
                });
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        PIXI.loader.load(function () {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = nowLoading[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var name = _step3.value;

                    var texture = PIXI.loader.resources[name].texture;
                    if (texture) {
                        var baseTexture = texture.baseTexture;
                        baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
                        baseTexture.mipmap = true;
                        PIXI.utils.BaseTextureCache[name].scaleMode = PIXI.SCALE_MODES.LINEAR;
                        baseTexture.update();
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = nowCallbacks[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var nowCallback = _step4.value;

                    nowCallback();
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            loadTextures([]);
        });
    } else {
        if (!PIXI.loader.loading) {
            var _nowCallbacks = backlogCallbacks.slice();
            backlogCallbacks.length = 0;
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = _nowCallbacks[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var nowCallback = _step5.value;

                    nowCallback();
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }
        }
    }
}
exports.loadTextures = loadTextures;
exports.wrapStyledTextCharacters = {
    boldStart: String.fromCharCode(17),
    boldEnd: String.fromCharCode(18),
    italicStart: String.fromCharCode(19),
    italicEnd: String.fromCharCode(20)
};
function wrapStyledText(text, width, normalStyle) {
    var container = new PIXI.Container();
    var boldStyle = normalStyle.clone();
    boldStyle.fontWeight = "bold";
    var italicStyle = normalStyle.clone();
    italicStyle.fontStyle = "italic";
    var pixiLine = new PIXI.Container();
    pixiLine.setParent(container);
    var currentLine = "";
    var bolding = false;
    var italics = false;
    var x = 0;
    var y = 0;
    var iter = 5000;
    for (var i = 0; i < text.length; i++) {
        if (!iter--) {
            throw new Error("Infinite loop detected trying to wrap text, aborting");
        }
        var char = text[i];
        var currentStyle = normalStyle;
        if (bolding) {
            currentStyle = boldStyle;
        }
        if (italics) {
            currentStyle = italicStyle;
        }
        var newline = false;
        var paddedNewline = false;
        var cutoff = false;
        switch (char) {
            case "\n":
                newline = true;
                if (text[i + 1] === "\n") {
                    i++;
                    paddedNewline = true;
                }
                break;
            case exports.wrapStyledTextCharacters.boldStart:
                if (!italics) {
                    if (!bolding) {
                        cutoff = true;
                    }
                    bolding = true;
                }
                break;
            case exports.wrapStyledTextCharacters.boldEnd:
                if (!italics) {
                    if (bolding) {
                        cutoff = true;
                    }
                    bolding = false;
                }
                break;
            case exports.wrapStyledTextCharacters.italicStart:
                if (!italics || bolding) {
                    cutoff = true;
                }
                bolding = false;
                italics = true;
                break;
            case exports.wrapStyledTextCharacters.italicEnd:
                if (italics || bolding) {
                    cutoff = true;
                }
                bolding = false;
                italics = false;
                break;
            default:
                currentLine += char;
                break;
        }
        if (i === text.length - 1) {
            newline = true;
        }
        if (!newline) {
            var bounds = PIXI.TextMetrics.measureText(currentLine, currentStyle);
            var lastLineObject = pixiLine.children[pixiLine.children.length - 1];
            var lastLineOffset = lastLineObject ? lastLineObject.x + lastLineObject.width : 0;
            var totalLineWidth = bounds.width + lastLineOffset;
            if (totalLineWidth >= width) {
                for (var r = i; r >= 0; r--) {
                    var rChar = text[r];
                    if (rChar === " ") {
                        var delta = i - r;
                        currentLine = currentLine.substring(0, currentLine.length - delta);
                        i = r;
                        newline = true;
                        break;
                    }
                }
            }
        }
        if (cutoff || newline) {
            var pixiText = void 0;
            if (currentLine) {
                pixiText = new PIXI.Text(currentLine, currentStyle);
                pixiLine.addChild(pixiText);
                pixiText.x = Math.round(x);
            }
            if (newline) {
                y += Number(currentStyle.fontSize) * (paddedNewline ? 1.5 : 1);
                x = 0;
                pixiLine = new PIXI.Container();
                pixiLine.position.set(Math.round(x), Math.round(y));
                container.addChild(pixiLine);
            } else if (pixiText) {
                x += pixiText.width - PIXI.TextMetrics.measureText(" ", currentStyle).width / 5;
            }
            currentLine = "";
        }
    }
    return container;
}
exports.wrapStyledText = wrapStyledText;
function autoSizeAndWrapStyledText(text, width, height, normalStyle) {
    var autoSizeStep = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
    var collisions = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
    var centerHorizontally = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
    var centerVertically = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;

    var resizing = true;
    while (resizing) {
        if (normalStyle.fontSize <= 0) {
            return null;
        }
        resizing = false;
        var container = wrapStyledText(text, width, normalStyle);
        if (centerHorizontally) {
            container.pivot.y = -(height - container.height) / 2;
        }
        if (centerVertically) {
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = container.children[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var child = _step6.value;

                    var childContainer = child;
                    child.x = (width - childContainer.width) / 2;
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }
        }
        if (container.height > height) {
            resizing = true;
        } else {
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = collisions[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var collision = _step7.value;
                    var _iteratorNormalCompletion8 = true;
                    var _didIteratorError8 = false;
                    var _iteratorError8 = undefined;

                    try {
                        for (var _iterator8 = container.children[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                            var _child = _step8.value;

                            var textbox = _child.getBounds();
                            if (collision instanceof PIXI.Rectangle) {
                                if (math_1.doRectanglesOverlap(collision, textbox)) {
                                    resizing = true;
                                    break;
                                }
                            } else if (collision instanceof PIXI.Circle) {
                                if (math_1.doesCircleOverlapRectangle(textbox, collision)) {
                                    resizing = true;
                                    break;
                                }
                            }
                        }
                    } catch (err) {
                        _didIteratorError8 = true;
                        _iteratorError8 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion8 && _iterator8.return) {
                                _iterator8.return();
                            }
                        } finally {
                            if (_didIteratorError8) {
                                throw _iteratorError8;
                            }
                        }
                    }

                    if (resizing) {
                        break;
                    }
                }
            } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
                        _iterator7.return();
                    }
                } finally {
                    if (_didIteratorError7) {
                        throw _iteratorError7;
                    }
                }
            }
        }
        if (resizing) {
            normalStyle.fontSize = Number(normalStyle.fontSize) - autoSizeStep;
        } else {
            return container;
        }
    }
    return null;
}
exports.autoSizeAndWrapStyledText = autoSizeAndWrapStyledText;

/***/ }),

/***/ 181:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
    return new Date().getFullYear();
};

/***/ }),

/***/ 185:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(undefined);
// imports


// module
exports.push([module.i, ".deck-generator-tab .file-uploader-wrapper {\n  display: block;\n  width: 100%;\n  text-align: center; }\n\n.deck-generator-tab .csv-file-selector:disabled + .csv-file-selector-label .file-name, .deck-generator-tab .csv-file-selector:disabled + .csv-file-selector-label .file-button {\n  background-color: #999;\n  border-color: #999;\n  cursor: default; }\n\n.deck-generator-tab .csv-file-selector:disabled + .csv-file-selector-label .file-name {\n  background-color: #ddd; }\n  .deck-generator-tab .csv-file-selector:disabled + .csv-file-selector-label .file-name .none-selected {\n    color: #999; }\n\n.deck-generator-tab .csv-file-selector-label {\n  cursor: pointer;\n  display: inline-block; }\n  .deck-generator-tab .csv-file-selector-label:hover .file-name, .deck-generator-tab .csv-file-selector-label:hover .file-button, .deck-generator-tab .csv-file-selector-label:focus .file-name, .deck-generator-tab .csv-file-selector-label:focus .file-button {\n    background-color: #00adea;\n    border-color: #00adea; }\n  .deck-generator-tab .csv-file-selector-label:hover .file-name, .deck-generator-tab .csv-file-selector-label:focus .file-name {\n    background-color: #ffffff; }\n  .deck-generator-tab .csv-file-selector-label .file-name, .deck-generator-tab .csv-file-selector-label .file-button {\n    float: left;\n    width: 10em;\n    height: 1em;\n    padding: 1em 0;\n    border: 0.125em solid #007AA2;\n    color: #ffffff;\n    box-shadow: 3px 3px #000000; }\n  .deck-generator-tab .csv-file-selector-label .file-name {\n    width: 35em;\n    border-radius: 0.75em 0 0 0.75em;\n    color: #000000;\n    font-weight: bold;\n    white-space: nowrap;\n    overflow: hidden; }\n    .deck-generator-tab .csv-file-selector-label .file-name .none-selected {\n      font-weight: normal;\n      color: #00adea; }\n  .deck-generator-tab .csv-file-selector-label .file-button {\n    background: #007AA2;\n    text-align: center;\n    border-radius: 0 0.75em 0.75em 0; }\n    .deck-generator-tab .csv-file-selector-label .file-button svg {\n      fill: #ffffff;\n      margin-right: 0.25em;\n      height: 0.8em; }\n\n.deck-generator-tab .csv-file-selector {\n  display: none; }\n\n.deck-generator-tab .generate-button {\n  font-size: 2em;\n  padding: 1rem 2rem;\n  display: block;\n  margin: 0 auto; }\n\n.deck-generator-tab .max-cards-x, .deck-generator-tab .max-cards-y {\n  display: inline-block;\n  margin: 1em; }\n\n.deck-generator-tab .generation-options {\n  text-align: center; }\n  .deck-generator-tab .generation-options .max-cards-x {\n    margin-right: 0.25em; }\n  .deck-generator-tab .generation-options .max-cards-y {\n    margin-left: 0.25em; }\n  .deck-generator-tab .generation-options input[type=number] {\n    width: 2.5em;\n    text-align: right; }\n\n.deck-generator-tab .progress-bar-background {\n  width: 75%;\n  margin: 0 auto;\n  min-height: 2em;\n  border: 0.25em solid #555555;\n  background: #999;\n  border-radius: 0.75em; }\n  .deck-generator-tab .progress-bar-background .progress-bar-foreground {\n    min-width: 0%;\n    max-width: 100%;\n    display: inline-block;\n    background: #FFC60E;\n    border-radius: 0.5em;\n    min-height: 1em;\n    padding: 0.5em 0;\n    text-align: center; }\n\n.deck-generator-tab .generation.expanded, .deck-generator-tab .generation:not(.expandable) {\n  padding-bottom: 1em; }\n\n.deck-generator-tab .generation-log {\n  display: block;\n  border: 0.25em solid #007AA2;\n  padding: 1em;\n  border-radius: 0.75em;\n  background-color: #ddd;\n  list-style-type: none; }\n  .deck-generator-tab .generation-log li + li {\n    margin-top: 1em; }\n  .deck-generator-tab .generation-log li:nth-child(odd) {\n    color: #005F7F; }\n  .deck-generator-tab .generation-log li.error {\n    color: #f82104; }\n    .deck-generator-tab .generation-log li.error:nth-child(odd) {\n      color: #ad1703; }\n\n.deck-generator-tab .download-button {\n  font-size: 4em;\n  display: block;\n  margin: 1rem auto 0 auto; }\n  .deck-generator-tab .download-button svg {\n    width: 0.8em;\n    height: 0.8em; }\n", ""]);

// exports


/***/ }),

/***/ 186:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(undefined);
// imports


// module
exports.push([module.i, ".help-tab table tr:first-child th {\n  text-align: left; }\n  .help-tab table tr:first-child th:nth-child(1) {\n    width: 10em; }\n  .help-tab table tr:first-child th:nth-child(2) {\n    width: 5em; }\n  .help-tab table tr:first-child th:nth-child(3) {\n    padding-left: 0.5em; }\n\n.help-tab table tr:not(first-child) td:nth-child(1) {\n  font-family: monospace; }\n\n.help-tab table tr:not(first-child) td:nth-child(2) {\n  color: #007AA2;\n  font-style: italic;\n  cursor: help; }\n\n.help-tab img {\n  display: block;\n  margin: 0 auto; }\n", ""]);

// exports


/***/ }),

/***/ 187:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(undefined);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n.input-like, .live-editor table input[type=checkbox] + label:before {\n  border: 1px solid #999;\n  color: #000000;\n  border-radius: 0.375em;\n  background-color: #ffffff; }\n  .input-like:hover, .live-editor table input[type=checkbox] + label:hover:before, .input-like:focus, .live-editor table input[type=checkbox] + label:focus:before {\n    outline: none;\n    border-color: #27C7FC; }\n  .input-like:focus, .live-editor table input[type=checkbox] + label:focus:before {\n    background-color: #ffffff; }\n  .input-like:disabled, .live-editor table input[type=checkbox] + label:disabled:before {\n    background-color: #999;\n    cursor: default; }\n\n.live-editor .custom-cards {\n  margin-top: 1em; }\n\n.live-editor .custom-cards-bottom {\n  float: left;\n  width: 100%;\n  text-align: center;\n  margin-top: 0.5em; }\n\n.live-editor .canvases-scale {\n  margin-top: 0.375em;\n  float: left; }\n  .live-editor .canvases-scale .canvases-scale-percent {\n    margin-left: 0.5em;\n    color: #007AA2;\n    text-align: left;\n    width: 3.5em;\n    display: inline-block; }\n\n.live-editor .add-row-button {\n  font-weight: bold;\n  cursor: pointer;\n  float: right;\n  margin-right: 0.625em; }\n\n.live-editor .reset-to-defaults {\n  background-color: #FFC60E;\n  color: #000000; }\n  .live-editor .reset-to-defaults:before {\n    display: inline-block;\n    content: '\\21BB';\n    margin-right: 0.375em; }\n  .live-editor .reset-to-defaults:hover {\n    background-color: #FFD240; }\n    .live-editor .reset-to-defaults:hover:before {\n      -webkit-transform: rotate(360deg);\n      -moz-transform: rotate(360deg);\n      -ms-transform: rotate(360deg);\n      -o-transform: rotate(360deg);\n      transform: rotate(360deg); }\n\n.live-editor table {\n  width: 100%; }\n  .live-editor table input, .live-editor table select, .live-editor table textarea {\n    font-size: 1em;\n    width: 100%;\n    padding: 0.25em; }\n    .live-editor table input[type=number], .live-editor table select[type=number], .live-editor table textarea[type=number] {\n      width: 4em;\n      text-align: right; }\n    .live-editor table input[type=color], .live-editor table select[type=color], .live-editor table textarea[type=color] {\n      padding: 0;\n      background: transparent;\n      border: 0;\n      cursor: pointer; }\n      html[data-browser*=\"Chrome\"] .live-editor table input[type=color], html[data-browser*=\"Chrome\"] .live-editor table select[type=color], html[data-browser*=\"Chrome\"] .live-editor table textarea[type=color] {\n        height: 2em; }\n  .live-editor table input[type=checkbox] {\n    display: none; }\n    .live-editor table input[type=checkbox] + label:before {\n      font-weight: bold;\n      content: '\\A0';\n      cursor: pointer;\n      min-width: 1.5em;\n      padding: 0.25em 0.125em;\n      display: inline-block; }\n    .live-editor table input[type=checkbox]:checked + label:before {\n      content: '\\2713'; }\n  .live-editor table .column-logoScale input, .live-editor table .column-copyright input {\n    width: 3.75em; }\n  .live-editor table input[type=color] {\n    width: 5em; }\n  .live-editor table textarea {\n    height: 3.5em;\n    resize: none; }\n  .live-editor table .column-copyright input {\n    width: 4.5em; }\n  .live-editor table .column-type select, .live-editor table .column-type input, .live-editor table .column-subtype select, .live-editor table .column-subtype input {\n    width: 6em; }\n  .live-editor table .column-legal textarea {\n    width: 20em; }\n  .live-editor table .column-set input, .live-editor table .column-name input, .live-editor table .column-imageURL input, .live-editor table .column-logoURL input {\n    width: 8.75em; }\n  .live-editor table .column-cost input, .live-editor table .column-victoryPoints input {\n    width: 2.5em; }\n  .live-editor table .column-text {\n    width: 30em; }\n    .live-editor table .column-text textarea {\n      width: calc(100% - 1em); }\n  .live-editor table .column-delete > button {\n    font-weight: bold;\n    cursor: pointer; }\n  .live-editor table tr td {\n    text-align: center;\n    padding: 0;\n    opacity: 0; }\n    .live-editor table tr td > div {\n      max-height: 0;\n      margin: 0; }\n    .live-editor table tr td.error input {\n      border-color: #f82104;\n      background-color: #febab1; }\n  .live-editor table tr.shown > td {\n    opacity: 1; }\n    .live-editor table tr.shown > td > div {\n      margin: 0.5em;\n      max-height: 4.5em;\n      overflow: hidden;\n      box-sizing: border-box; }\n\n.live-editor .too-many-cards {\n  clear: both;\n  text-align: center;\n  padding-top: 1em;\n  max-height: 3em; }\n  .live-editor .too-many-cards .warning-block {\n    display: inline-block;\n    text-align: center;\n    background: #A17B00;\n    color: #ffffff;\n    padding: 0.5em;\n    border-radius: 0.75em; }\n    .live-editor .too-many-cards .warning-block a {\n      color: #FFDC6A; }\n      .live-editor .too-many-cards .warning-block a:hover, .live-editor .too-many-cards .warning-block a:focus {\n        color: #27C7FC; }\n  .live-editor .too-many-cards.collapsed {\n    max-height: 0em;\n    opacity: 0; }\n\n.live-editor .canvases {\n  text-align: center; }\n  .live-editor .canvases canvas {\n    margin: 0.75em;\n    display: inline-block;\n    opacity: 0;\n    max-height: 0;\n    max-width: 0;\n    overflow: hidden; }\n    .live-editor .canvases canvas.shown {\n      opacity: 1;\n      max-height: 1200px;\n      max-width: 900px; }\n", ""]);

// exports


/***/ }),

/***/ 188:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(undefined);
// imports


// module
exports.push([module.i, ".tabular .tabluar-tabs li {\n  cursor: pointer; }\n\n.tabular .tabular-contents {\n  position: relative; }\n  .tabular .tabular-contents .tab-contents {\n    display: block;\n    overflow: hidden;\n    opacity: 0;\n    max-height: 999999px; }\n    .tabular .tabular-contents .tab-contents.current {\n      opacity: 1; }\n    .tabular .tabular-contents .tab-contents.hidden {\n      display: none; }\n", ""]);

// exports


/***/ }),

/***/ 189:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(undefined);
// imports


// module
exports.push([module.i, ".input-like, .custom-deck-builder input, .custom-deck-builder textarea, .custom-deck-builder select, .custom-deck-builder option, .custom-deck-builder button {\n  border: 1px solid #999;\n  color: #000000;\n  border-radius: 0.375em;\n  background-color: #ffffff; }\n  .input-like:hover, .custom-deck-builder input:hover, .custom-deck-builder textarea:hover, .custom-deck-builder select:hover, .custom-deck-builder option:hover, .custom-deck-builder button:hover, .input-like:focus, .custom-deck-builder input:focus, .custom-deck-builder textarea:focus, .custom-deck-builder select:focus, .custom-deck-builder option:focus, .custom-deck-builder button:focus {\n    outline: none;\n    border-color: #27C7FC; }\n  .input-like:focus, .custom-deck-builder input:focus, .custom-deck-builder textarea:focus, .custom-deck-builder select:focus, .custom-deck-builder option:focus, .custom-deck-builder button:focus {\n    background-color: #ffffff; }\n  .input-like:disabled, .custom-deck-builder input:disabled, .custom-deck-builder textarea:disabled, .custom-deck-builder select:disabled, .custom-deck-builder option:disabled, .custom-deck-builder button:disabled {\n    background-color: #999;\n    cursor: default; }\n\ninput[type=range] {\n  -webkit-appearance: none; }\n  input[type=range]:focus {\n    outline: none; }\n  input[type=range]::-webkit-slider-runnable-track {\n    height: 8px;\n    cursor: pointer;\n    transition: all .2s ease;\n    box-shadow: 0 0 0 transparent, 0 0 0 transparent;\n    background: #bbb;\n    border: 0 solid transparent;\n    border-radius: 0; }\n    input[type=range]::-webkit-slider-runnable-track:disabled {\n      cursor: default;\n      background: #ddd;\n      opacity: 0.5; }\n  input[type=range]::-webkit-slider-thumb {\n    box-shadow: 0 0 0 transparent, 0 0 0 transparent;\n    border: 0 solid transparent;\n    height: 22px;\n    width: 7px;\n    border-radius: 0;\n    background: #007AA2;\n    cursor: pointer;\n    -webkit-appearance: none;\n    margin-top: -7px; }\n    input[type=range]::-webkit-slider-thumb:disabled {\n      cursor: default;\n      background: #27C7FC;\n      opacity: 0.5; }\n    input[type=range]::-webkit-slider-thumb:hover {\n      background: #06C1FF; }\n    input[type=range]::-webkit-slider-thumb:disabled {\n      cursor: default;\n      background: #27C7FC;\n      opacity: 0.5; }\n  input[type=range]:focus::-webkit-slider-runnable-track {\n    background: #a2a2a2; }\n  input[type=range]::-moz-range-track {\n    height: 8px;\n    cursor: pointer;\n    transition: all .2s ease;\n    box-shadow: 0 0 0 transparent, 0 0 0 transparent;\n    background: #bbb;\n    border: 0 solid transparent;\n    border-radius: 0; }\n    input[type=range]::-moz-range-track:disabled {\n      cursor: default;\n      background: #ddd;\n      opacity: 0.5; }\n  input[type=range]::-moz-range-thumb {\n    box-shadow: 0 0 0 transparent, 0 0 0 transparent;\n    border: 0 solid transparent;\n    height: 22px;\n    width: 7px;\n    border-radius: 0;\n    background: #007AA2;\n    cursor: pointer; }\n    input[type=range]::-moz-range-thumb:disabled {\n      cursor: default;\n      background: #27C7FC;\n      opacity: 0.5; }\n    input[type=range]::-moz-range-thumb:hover {\n      background: #06C1FF; }\n    input[type=range]::-moz-range-thumb:disabled {\n      cursor: default;\n      background: #27C7FC;\n      opacity: 0.5; }\n  input[type=range]::-ms-track {\n    height: 8px;\n    cursor: pointer;\n    transition: all .2s ease;\n    background: transparent;\n    border-color: transparent;\n    border-width: 7px 0;\n    color: transparent; }\n    input[type=range]::-ms-track:disabled {\n      cursor: default;\n      background: #ddd;\n      opacity: 0.5; }\n  input[type=range]::-ms-fill-lower {\n    box-shadow: 0 0 0 transparent, 0 0 0 transparent;\n    background: #a2a2a2;\n    border: 0 solid transparent;\n    border-radius: 0; }\n  input[type=range]::-ms-fill-upper {\n    box-shadow: 0 0 0 transparent, 0 0 0 transparent;\n    background: #bbb;\n    border: 0 solid transparent;\n    border-radius: 0; }\n    input[type=range]::-ms-fill-upper:disabled {\n      background: #ddd; }\n  input[type=range]::-ms-thumb {\n    box-shadow: 0 0 0 transparent, 0 0 0 transparent;\n    border: 0 solid transparent;\n    height: 22px;\n    width: 7px;\n    border-radius: 0;\n    background: #007AA2;\n    cursor: pointer; }\n    input[type=range]::-ms-thumb:disabled {\n      cursor: default;\n      background: #27C7FC;\n      opacity: 0.5; }\n    input[type=range]::-ms-thumb:hover {\n      background: #06C1FF; }\n    input[type=range]::-ms-thumb:disabled {\n      cursor: default;\n      background: #27C7FC;\n      opacity: 0.5; }\n  input[type=range]:focus::-ms-fill-lower {\n    background: #bbb; }\n    input[type=range]:focus::-ms-fill-lower:disabled {\n      background: #ddd; }\n  input[type=range]:focus::-ms-fill-upper {\n    background: #a2a2a2; }\n  input[type=range]:disabled {\n    cursor: default;\n    background: #ddd;\n    opacity: 0.5; }\n\nhtml {\n  overflow-y: scroll; }\n\nbody {\n  background: url(" + __webpack_require__(209) + ") no-repeat center center fixed;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  -o-background-size: cover;\n  background-size: cover; }\n\n.card-name, .custom-deck-builder h1, .custom-deck-builder h2, .custom-deck-builder h3, .custom-deck-builder h4, .custom-deck-builder h5, .custom-deck-builder h6, .custom-deck-builder .tabular nav ul li {\n  font-size: 2.5em;\n  font-family: CompactaBT, Impact, Charcoal, sans-serif;\n  letter-spacing: -0.025em;\n  margin: 0;\n  color: #FFC60E;\n  text-shadow: 2px 2px #000000;\n  text-transform: uppercase;\n  transform: skewX(-15deg) scaleY(0.75);\n  -webkit-transform: skewX(-15deg) scaleY(0.75);\n  -ms-transform: skewX(-15deg) scaleY(0.75);\n  -moz-transform: skewX(-15deg) scaleY(0.75);\n  -o-transform: skewX(-15deg) scaleY(0.75); }\n\n.expandable {\n  height: 0;\n  overflow: hidden;\n  visibility: hidden;\n  opacity: 0;\n  pointer-events: none; }\n  .expandable.measuring {\n    -webkit-transition: none;\n    -moz-transition: none;\n    -ms-transition: none;\n    -o-transition: none;\n    transition: none;\n    height: auto;\n    position: absolute; }\n  .expandable.expanded {\n    opacity: 1;\n    visibility: visible;\n    height: auto;\n    pointer-events: all; }\n\n.custom-deck-builder {\n  color: #ffffff;\n  width: calc(1280px - 2em);\n  margin: 2em auto 1em auto;\n  font-family: TradeGothic, Verdana, Geneva, sans-serif;\n  font-size: 1em;\n  letter-spacing: -0.025em; }\n  .custom-deck-builder a, .custom-deck-builder a:visited {\n    color: #00adea;\n    text-decoration: underline; }\n    .custom-deck-builder a:hover, .custom-deck-builder a:focus, .custom-deck-builder a:visited:hover, .custom-deck-builder a:visited:focus {\n      color: #CD9D00; }\n  .custom-deck-builder .page-title h1 > span {\n    font-size: 5rem;\n    text-shadow: 5px 5px #000000;\n    display: block;\n    text-align: center; }\n  .custom-deck-builder .page-title h1 .subtitle {\n    color: #FFDC6A;\n    font-size: 3.75rem; }\n  .custom-deck-builder h2, .custom-deck-builder h3, .custom-deck-builder h4, .custom-deck-builder h5, .custom-deck-builder h6 {\n    color: #06C1FF;\n    margin-left: 0.075em; }\n  .custom-deck-builder input, .custom-deck-builder textarea, .custom-deck-builder select, .custom-deck-builder option, .custom-deck-builder button {\n    font-family: TradeGothic, Verdana, Geneva, sans-serif;\n    font-size: 1em;\n    letter-spacing: -0.025em; }\n  .custom-deck-builder button {\n    background-color: #007AA2;\n    border: none;\n    box-shadow: 3px 3px #000000;\n    color: #ffffff;\n    padding: 0.375em 0.5em;\n    cursor: pointer;\n    margin-bottom: 3px; }\n    .custom-deck-builder button:hover, .custom-deck-builder button:focus {\n      background-color: #06C1FF; }\n    .custom-deck-builder button:disabled {\n      background-color: #999;\n      cursor: default; }\n  .custom-deck-builder abbr[title] {\n    text-decoration: none;\n    cursor: help; }\n  .custom-deck-builder .tabular nav {\n    display: block;\n    background: url(" + __webpack_require__(211) + ") no-repeat center center;\n    -webkit-background-size: cover;\n    -moz-background-size: cover;\n    -o-background-size: cover;\n    background-size: cover;\n    color: #ffffff;\n    border-radius: 1em 1em 0 0;\n    border-bottom: 0.375rem solid #00adea; }\n    .custom-deck-builder .tabular nav ul {\n      padding: 1em 0;\n      margin: 0;\n      list-style-type: none; }\n      .custom-deck-builder .tabular nav ul li {\n        cursor: pointer;\n        font-size: 3.5em;\n        text-shadow: 4px 4px #000000;\n        display: inline-block;\n        margin: 0 0.5em; }\n        .custom-deck-builder .tabular nav ul li:not(.current) {\n          color: #A17B00; }\n        .custom-deck-builder .tabular nav ul li:hover, .custom-deck-builder .tabular nav ul li:focus {\n          color: #FFDC6A; }\n  .custom-deck-builder .tabular .tabular-contents {\n    background: #ffffff;\n    color: #000000;\n    padding: 1em; }\n  .custom-deck-builder dl dt {\n    font-weight: bold;\n    color: #007AA2; }\n    .custom-deck-builder dl dt + dd {\n      margin-left: 1em;\n      color: #005F7F; }\n      .custom-deck-builder dl dt + dd + dt {\n        margin-top: 1em; }\n  .custom-deck-builder table {\n    border: none;\n    border-collapse: collapse;\n    border-spacing: 0; }\n    .custom-deck-builder table tr:nth-child(even) > td {\n      background-color: #ddd; }\n    .custom-deck-builder table td {\n      padding: 0.5em; }\n  .custom-deck-builder tr:first-child > th {\n    background-color: #FFDC6A;\n    border-bottom: 0.25em solid #FFC60E;\n    padding: 0.5em 0.5em 0.25em 0.5em; }\n    .custom-deck-builder tr:first-child > th:first-child {\n      border-radius: 0.625em 0 0 0; }\n    .custom-deck-builder tr:first-child > th:last-child {\n      border-radius: 0 0.625em 0 0; }\n  .custom-deck-builder tr:last-child > td:first-child {\n    border-radius: 0 0 0 0.625em; }\n  .custom-deck-builder tr:last-child > td:last-child {\n    border-radius: 0 0 0.625em 0; }\n  .custom-deck-builder table, .custom-deck-builder tr, .custom-deck-builder th, .custom-deck-builder td {\n    border: none; }\n  .custom-deck-builder footer {\n    text-align: center;\n    font-size: 1.25em;\n    padding: 1em 0;\n    border-top: 0.375rem solid #00adea;\n    border-radius: 0 0 1em 1em;\n    background: url(" + __webpack_require__(210) + ") no-repeat center center;\n    -webkit-background-size: cover;\n    -moz-background-size: cover;\n    -o-background-size: cover;\n    background-size: cover; }\n    .custom-deck-builder footer a, .custom-deck-builder footer a:visited {\n      color: #FFC60E; }\n", ""]);

// exports


/***/ }),

/***/ 190:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(undefined);
// imports


// module
exports.push([module.i, "@font-face {\n  font-family: CompactaBT;\n  src: url(" + __webpack_require__(218) + ") format(\"opentype\"); }\n\n@font-face {\n  font-family: CompactaBT;\n  font-weight: bold;\n  src: url(" + __webpack_require__(216) + ") format(\"opentype\"); }\n\n@font-face {\n  font-family: CompactaBT;\n  font-style: italic;\n  src: url(" + __webpack_require__(217) + ") format(\"opentype\"); }\n\n@font-face {\n  font-family: CompactaBdBT;\n  src: url(" + __webpack_require__(215) + ") format(\"truetype\"); }\n\n@font-face {\n  font-family: CompactaBdBT;\n  font-weight: bold;\n  src: url(" + __webpack_require__(214) + ") format(\"truetype\"); }\n\n@font-face {\n  font-family: TradeGothic;\n  src: url(" + __webpack_require__(221) + ") format(\"woff\"); }\n\n@font-face {\n  font-family: TradeGothic;\n  font-weight: bold;\n  src: url(" + __webpack_require__(219) + ") format(\"truetype\"); }\n\n@font-face {\n  font-family: TradeGothic;\n  font-style: italic;\n  src: url(" + __webpack_require__(220) + ") format(\"opentype\"); }\n", ""]);

// exports


/***/ }),

/***/ 191:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(undefined);
// imports


// module
exports.push([module.i, ".input-like {\n  border: 1px solid #999;\n  color: #000000;\n  border-radius: 0.375em;\n  background-color: #ffffff; }\n  .input-like:hover, .input-like:focus {\n    outline: none;\n    border-color: #27C7FC; }\n  .input-like:focus {\n    background-color: #ffffff; }\n  .input-like:disabled {\n    background-color: #999;\n    cursor: default; }\n\n*, *:before, *:after {\n  -webkit-transition: all 0.35s ease-in-out;\n  -moz-transition: all 0.35s ease-in-out;\n  -ms-transition: all 0.35s ease-in-out;\n  -o-transition: all 0.35s ease-in-out;\n  transition: all 0.35s ease-in-out; }\n\np {\n  margin: 0 0 1em 0; }\n\n* + p {\n  margin-top: 1em; }\n\nh1 + p, h2 + p, h3 + p, h4 + p, h5 + p, h6 + p {\n  margin-top: 0; }\n\nbody {\n  background: #005F7F; }\n  body > .unloaded-message {\n    color: #FFC60E;\n    display: block;\n    font-weight: bold;\n    font-size: 3em;\n    margin: 1em auto;\n    text-align: center; }\n", ""]);

// exports


/***/ }),

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/f73966e84da5cefb55bc88f287680a42.png";

/***/ }),

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/746554058e001fcffc5ab3f0212d47b9.png";

/***/ }),

/***/ 195:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/d042c4dd0014847032b6ddfc401dda8d.png";

/***/ }),

/***/ 196:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/de6d3b4350d95e575bf730434febc000.png";

/***/ }),

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/e70e315b98145495760f797e802cbed1.png";

/***/ }),

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/cf1e8982bc803e66867e0dfc7cb18282.png";

/***/ }),

/***/ 199:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/275d6b6a5e57f4596aaf5fab085677f3.png";

/***/ }),

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/756c7885cca3251f091065a561a180b3.png";

/***/ }),

/***/ 201:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/ee0f44576fb1df659f72845b5086cd36.png";

/***/ }),

/***/ 202:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/3915a476e2a284486169827114c529c6.png";

/***/ }),

/***/ 203:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/846e29413d904668b0f43d477a328b2c.png";

/***/ }),

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/abca638dc6f1e221196134e1275aaad0.png";

/***/ }),

/***/ 205:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/c3903aac7f8a93a31e03ac79d81b0578.png";

/***/ }),

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/bef059bef4ae3590ac55c1900b94912c.png";

/***/ }),

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/d0ca5136df4e523818e139423571bfb0.png";

/***/ }),

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/205c0a75321d91c1035bb7e7defb5ba7.png";

/***/ }),

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/27963f10586f4adb3ee60ddd844bafee.jpg";

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _v = __webpack_require__(157);

var uuid = _interopRequireWildcard(_v);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var lookups = new Map();

module.exports = function (lookup) {
    var id = void 0;

    if (lookup) {
        if (lookups.has(lookup)) {
            id = lookups.get(lookup);
            lookups.delete(lookup);
        } else {
            id = uuid.default();
            lookups.set(lookup, id);
        }
    }

    return id || uuid.default();
};

/***/ }),

/***/ 210:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/2f647df6adf0f9337da5ed968d8d9ba3.jpg";

/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/6529039b5bd390a8b2260f48418cb112.jpg";

/***/ }),

/***/ 212:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/13386f2b64779e1c52f6626d5bb1015f.png";

/***/ }),

/***/ 213:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/60debde16cc531620d0edfb6608f1043.png";

/***/ }),

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/4ecdb5886bf7f71b67b26b7acaa68653.ttf";

/***/ }),

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/035e8b4b319c1c6e843f8cbcc85d42e0.ttf";

/***/ }),

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/f0d74efcb3514ddd8b40798b589948d1.otf";

/***/ }),

/***/ 217:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/f82cba211182fbb07d3510cbe89c7ccb.otf";

/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/3596833b8852b6ea37b94e4f6b572e5b.otf";

/***/ }),

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/cdfd0160e30988fa0f6330f01c1bb710.ttf";

/***/ }),

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/e614413a37093b678d900978f5c3ef1c.otf";

/***/ }),

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resources/4ceca9b16de3f3089eb490977af7b391.woff";

/***/ }),

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(30);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "<div class=\"deck-generator-tab\">\n	<p>This tool is intended to convert a spreadsheet of cards into a few images of the generated cards. These images can then be imported and played in a game such as <a href=\"http://store.steampowered.com/app/286160/Tabletop_Simulator/\">Tabletop Simulator</a>.</p>\n	<p>Select a <a href=\"https://en.wikipedia.org/wiki/Comma-separated_values\">CSV file</a> to parse into a deck of custom cards to download.</p>\n	<div class=\"file-uploader-wrapper\">\n		<input id=\""
    + alias2(__default(__webpack_require__(21)).call(alias1,"file",{"name":"uuid","hash":{},"data":data}))
    + "\" class=\"csv-file-selector\" type=\"file\" accept=\".csv\"/>\n		<label for=\""
    + alias2(__default(__webpack_require__(21)).call(alias1,"file",{"name":"uuid","hash":{},"data":data}))
    + "\" class=\"csv-file-selector-label\">\n			<span class=\"file-name\">\n				<em class=\"none-selected\">None Selected</em>\n			</span>\n			<span class=\"file-button\">\n				<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"17\" viewBox=\"0 0 20 17\">\n					<path d=\"M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z\"></path>\n					</svg>\n				 Choose a file\n			</span>\n		</label>\n	</div>\n	<p>For more information on the format your CSV file should be in, check out the <a href=\"#help\">Help tab</a>.</p>\n	<p><em>Note:</em> Generation cards can be memory intensive. Every image you set for your card will be loaded into memory and combined to form high resolution 4K textures of cards. For main deck sized spreadsheets (150 cards) this can take ~600 MB to 1 GB of memory. If you encounter bottlenecks due to your computer please consider splitting up your sheet into multiple files.</p>\n	<button class=\"generate-button\">Generate</button>\n	<div class=\"generation-options\">\n		<span class=\"max-cards-x\">\n			<label title=\"The maximum number of cards to pack into an image along the (horizontal) X-axis.\" for=\""
    + alias2(__default(__webpack_require__(21)).call(alias1,"x",{"name":"uuid","hash":{},"data":data}))
    + "\">Max Cards X:</label> <input type=\"number\" class=\"max-cards-x-input\" id=\""
    + alias2(__default(__webpack_require__(21)).call(alias1,"x",{"name":"uuid","hash":{},"data":data}))
    + "\" />\n		</span>\n		<span class=\"max-cards-y\">\n			<label title=\"The maximum number of cards to pack into an image along the (vertical) Y-axis.\" for=\""
    + alias2(__default(__webpack_require__(21)).call(alias1,"y",{"name":"uuid","hash":{},"data":data}))
    + "\">Max Cards Y:</label> <input type=\"number\" class=\"max-cards-y-input\" id=\""
    + alias2(__default(__webpack_require__(21)).call(alias1,"y",{"name":"uuid","hash":{},"data":data}))
    + "\" />\n		</span>\n	</div>\n	<div class=\"generation expandable\">\n		<div class=\"progress-bar-background\">\n			<div class=\"progress-bar-foreground\">0%</div>\n		</div>\n		<ul class=\"generation-log\">\n		</ul>\n		<button class=\"download-button\" disabled>\n			<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" id=\"Capa_1\" width=\"512px\" height=\"512px\" viewBox=\"0 0 554.625 554.625\" xml:space=\"preserve\">\n				<path d=\"M267.75,153h95.625L248.625,19.125v114.75C248.625,145.35,258.188,153,267.75,153z\" fill=\"#FFFFFF\"/>\n				<path d=\"M133.875,401.625V267.75c0-32.513,24.862-57.375,57.375-57.375h172.125v-38.25H267.75c-21.038,0-38.25-17.212-38.25-38.25    V19.125H38.25C17.212,19.125,0,36.337,0,57.375V497.25c0,21.037,17.212,38.25,38.25,38.25h286.875    c21.037,0,38.25-17.213,38.25-38.25V459H191.25C158.737,459,133.875,434.138,133.875,401.625z\" fill=\"#FFFFFF\"/>\n				<path d=\"M516.375,229.5H191.25c-21.038,0-38.25,17.212-38.25,38.25v133.875c0,21.037,17.212,38.25,38.25,38.25h325.125    c21.037,0,38.25-17.213,38.25-38.25V267.75C554.625,246.712,537.412,229.5,516.375,229.5z M306,286.875L229.5,382.5H306v19.125    h-95.625V382.5l76.5-95.625h-76.5V267.75H306V286.875z M382.5,286.875h-19.125V382.5H382.5v19.125h-57.375V382.5h19.125v-95.625    h-19.125V267.75H382.5V286.875z M459,344.25h-38.25v57.375h-19.125V306v-38.25H459c21.037,0,38.25,17.213,38.25,38.25    S480.037,344.25,459,344.25z\" fill=\"#FFFFFF\"/>\n				<path d=\"M459,286.875h-38.25v38.25H459c11.475,0,19.125-7.65,19.125-19.125S470.475,286.875,459,286.875z\" fill=\"#FFFFFF\"/>\n			</svg>\n			Download Deck\n		</button>\n	</div>\n</div>\n";
},"useData":true});

/***/ }),

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(30);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"help-tab\">\n	<p>This tab is intended for help with using this tool, specifically uding the <a href=\"#deck-generator\">Deck Generator</a> functionality.</p>\n	<section class=\"availible-options\">\n		<h2>Your Custom Spreadsheet</h2>\n		<p>Most of the funtionality of this tool is in creating your down <abbr title=\"Cryptozoic Game Engine\">CGE</abbr> deck. To do that all you need to create is a spreadsheet in your office sheet of choice, and follow these rules when formatting it.</p>\n		<p>The first row of your spreadsheet <strong>must</strong> be the headers for each column of options. The list of availible options is below:</p>\n		<div class=\"card-options\"></div>\n		<p>After you make your first row, all entries after count as a card. You can create blank rows and they will be skipped over. Columns that do not match one of the above options are skipped as well, so feel free to add columns to help you organize your cards.</p>\n		<p>Additionally there are two special rows. If you name your card <code>__defaults__</code>, then <strong>all</strong> cards after it will default to the values of that row. This is useful for setting all the values for shared options such as Set, Legal, Copyright, etc. The other row name is <code>__oversized_defaults__</code> but will only be applied to Oversized cards.</p>\n	</section>\n	<section>\n		<h2>Examples</h2>\n		<p>Below are some examples of valid what to expect and valid spreadsheets to use.</p>\n		<p>For an example spreadsheet for use with this tool, check out my <a href=\"https://docs.google.com/spreadsheets/d/1C4sG2btMuTEaFaTlKtoSytHsuSTmM2uhnR2j-IEhsKk/edit?usp=sharing\">Overwatch Deck Building Game spreadsheet here</a>. You can download the first sheet as a CSV file and import it using this tool to generate your own copy of the deck.</p>\n		<img src=\"" + __webpack_require__(212) + "\" alt=\"card example\" title=\"Example of what column names effect what parts of the card.\"/>\n		<p>For any issues, especially technical ones, create an <a href=\"https://github.com/JacobFischer/Custom-Deck-Builder/issues\">issue on GitHub</a>.</p>\n	</section>\n</div>\n";
},"useData":true});

/***/ }),

/***/ 226:
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(30);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"live-editor\">\n	<div class=\"tables\">\n		<p>This tab allows you to edit cards live to get a feel for how this tool works. Feel free to play around with it, but for serious card generation please use the <a href=\"#deck-generator\">Deck Generator</a> tab to generation large batches of cards properly.</p>\n		<div class=\"defaults-table\">\n			<h2 title=\"These are default values for all custom cards.\">Card Defaults</h2>\n		</div>\n		<div class=\"custom-cards\">\n			<h2 title=\"These are custom cards you can create and play with to see how this builder works\">Custom Cards</h2>\n			<div class=\"cards-table\"></div>\n			<div class=\"custom-cards-bottom\">\n				<div class=\"canvases-scale\">\n					<label for=\"canvases-scale-slider\">Card Scale: </label>\n					<input id=\"canvases-scale-slider\" class=\"canvases-scale-slider\" type=\"range\" min=\"0.05\" max=\"1\" step=\"any\" value=\"0.5\"/>\n					<span class=\"canvases-scale-percent\"></span>\n				</div>\n				<button class=\"reset-to-defaults\" title=\"Resets the custom and default card rows to default values\">Reset to defaults</button>\n				<button class=\"add-row-button\">&#65291; Add Row</button>\n			</div>\n		</div>\n		<div class=\"too-many-cards collapsed\">\n			<span class=\"warning-block\">You've created a lot of custom cards. You should probably use the <a href=\"#deck-generator\">Deck Generator Tool</a> to handle all these cards instead.</span>\n		</div>\n	</div>\n	<div class=\"canvases\"></div>\n</div>\n";
},"useData":true});

/***/ }),

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(30);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"tabular\">\n	<nav class=\"tabluar-tabs\">\n		<ul>\n		</ul>\n	</nav>\n	<div class=\"tabular-contents\"></div>\n</div>\n";
},"useData":true});

/***/ }),

/***/ 228:
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(30);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"custom-deck-builder\">\n	<div class=\"page-title\">\n		<h1>\n			<span class=\"title\">"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</span>\n			<span class=\"subtitle\">"
    + alias2(alias1((depth0 != null ? depth0.subtitle : depth0), depth0))
    + "</span>\n		</h1>\n	</div>\n	<main></main>\n	<footer>Cryptozoic engine &copy; "
    + alias2(__default(__webpack_require__(181)).call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"currentYear","hash":{},"data":data}))
    + " <a href=\"https://www.cryptozoic.com/\">Cryptozoic Entertainment</a>. This is a fan project by <a href=\"https://github.com/JacobFischer\">Jacob Fischer</a>. Source availible on <a href=\"https://github.com/JacobFischer/Custom-Deck-Builder\">Github</a>.</footer>\n</div>\n";
},"useData":true});

/***/ }),

/***/ 244:
/***/ (function(module, exports) {

module.exports = "<h1 id=\"custom-deck-builder\">Custom Deck Builder</h1>\n<h2 id=\"about-this-tool\">About This Tool</h2>\n<p>This application is a <strong>fan creation</strong> by <a href=\"https://github.com/JacobFischer/\">Jacob Fischer</a> with the sole intent of making it easier to try custom cards in Cryptozoic&#39;s Game Engine. It is open source and available on <a href=\"https://github.com/JacobFischer/Custom-Deck-Builder\">GitHub</a>.</p>\n<p>No cards produced using this tool should be used to profit from. Instead please buy <a href=\"https://www.cryptozoic.com/\">Cryptozoic</a>&#39;s own deck building games utilizing their engine such as the DC Deck Building game, they are excellent.</p>\n<p>This project was produced mostly as a tool to help its author more easily prototype custom cards to try in <a href=\"http://store.steampowered.com/app/286160/Tabletop_Simulator/\">Table Top Simulator</a> with and around Cryptozoic&#39;s own titles, as well as an excuse to brush up on some technical skills.</p>\n<h2 id=\"technical-details\">Technical Details</h2>\n<p>This application is an <a href=\"https://en.wikipedia.org/wiki/Single-page_application\" title=\"Single-page Application\">SPA</a>. Once you load the page you have everything you need to build some custom cards. <strong>No</strong> data is saved on a server somewhere. All the processing is done and saved on your machine via your web browser. I&#39;m not interested in tracking you or stealing your data.</p>\n<p>This project was made using a variety of frameworks:</p>\n<ul>\n<li><strong><a href=\"https://www.typescriptlang.org/\" title=\"JavaScript with types\">TypeScript</a></strong>: The coding language used for pretty much everything in this project.</li>\n<li><strong><a href=\"http://sass-lang.com/\" title=\"Syntactically Awesome Style Sheets\">SASS</a></strong>: Used to control the style and most animations on this page.</li>\n<li><strong><a href=\"http://handlebarsjs.com/\" title=\"Simple HTML Templates\">Handlebars</a></strong>: Used to template the HTML layout and elements for all page sections.</li>\n<li><strong><a href=\"http://www.pixijs.com/\" title=\"2D graphics library for easily drawing cards\">PixiJS</a></strong>: Currently the best browser library for manipulating 2D graphics and images on canvases. Used to render the custom cards.</li>\n<li><strong><a href=\"https://www.npmjs.com/\" title=\"Node Package Manager\">NPM</a></strong>: The biggest and most popular JavaScript package manager, that hosts many of the smaller modules not explicitly mentioned here, but are still necessary to run.</li>\n<li><strong><a href=\"https://webpack.js.org/\">Webpack 2</a></strong>: What wraps all these things together into a single page. I used this opportunity to transition Webpack 1.x skills to 2.0.</li>\n</ul>\n<p>All the source code, commits, and resources are available freely on <a href=\"https://github.com/JacobFischer/Custom-Deck-Builder\">GitHub</a>. All classes, methods, and exports and documented using well formed docstrings; so if you wish to modify this tool, do so to your heart&#39;s content!</p>\n<hr>\n<p>A live version of application is kept up to date on <a href=\"https://jacobfischer.github.io/Custom-Deck-Builder/\">https://jacobfischer.github.io/Custom-Deck-Builder/</a>. Check out that version if you are not interested in developing it yourself.</p>\n<h2 id=\"how-to-build\">How to Build</h2>\n<p>As this is a webpack project, you just need to build and deploy it. As with most projects ensure you have <a href=\"https://nodejs.org/\">Node.js</a> installed, then just:</p>\n<pre><code>npm install\nnpm run dev\n</code></pre><p>Then just in your browser navigate to <a href=\"http://localhost:8080/\">http://localhost:8080/</a></p>\n<p>Alternatively run <code>npm run build</code> to run webpack and save the output in the <code>built/</code> directory, and you can deploy the static assets at your will.</p>\n";

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
var tab_1 = __webpack_require__(174);
exports.Tab = tab_1.default;
__webpack_require__(406);
__export(__webpack_require__(175));

/***/ }),

/***/ 381:
/***/ (function(module, exports) {

module.exports = "Congratulations on building your custom deck! This file helps to explain what you can do with your cool new cards.\n\nThe intended use for these images is to import into a card program, like Tabletop Simulator.\n\n## Tabletop Simulator\n\nTabletop Simulator can build custom decks of cards from textures (images) that contains a grid of cards. If you already know how to import custom decks into Tabletop Simulator, great! Otherwise this readme can help you.\n\nFor reference, your Deck was generated with {width} cards horizontally and {height} cards vertically, though the last sheets of normal and oversized cards may have less.\n\n## Other Notes\n\nThis file and the textures were generated using the Cryptozoic Deck Building Game Custom Card Builder tool created by Jacob Fischer.\n\nhttps://jacobfischer.github.io/Custom-Deck-Builder/\n\nSource Code for this tool is open source and available at GitHub: https://github.com/JacobFischer/Custom-Deck-Builder\n"

/***/ }),

/***/ 403:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(185);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(15)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./deck-generator-tab.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./deck-generator-tab.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 404:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(186);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(15)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./help.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./help.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 405:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(187);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(15)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./live-editor.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./live-editor.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 406:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(188);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(15)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./tabular.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./tabular.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 407:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(189);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(15)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./ui.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./ui.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 408:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(190);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(15)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./fonts.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./fonts.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 420:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __webpack_require__(8);
var PIXI = __webpack_require__(64);
var fonts_1 = __webpack_require__(178);
var wrapper = {
    fontsLoaded: false,
    pixiLoaded: false,
    callback: false
};
function checkIfInitialized() {
    if (wrapper.fontsLoaded && wrapper.pixiLoaded && wrapper.callback) {
        wrapper.callback();
    }
}
var textures = {};
function requireAll(r) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = r.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            var textureName = path_1.basename(key, ".png");
            var texturePath = r(key);
            textures[textureName] = texturePath;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}
requireAll(__webpack_require__(158));
exports.initialTextures = textures;
exports.initialTexturesToKey = new Map();
function initialize(callback) {
    wrapper.callback = callback;
    PIXI.utils.skipHello();
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = Object.keys(exports.initialTextures)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var key = _step2.value;

            PIXI.loader.add(key, exports.initialTextures[key]);
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    PIXI.loader.load(function () {
        wrapper.pixiLoaded = true;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = Object.keys(exports.initialTextures)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var key = _step3.value;

                exports.initialTexturesToKey.set(PIXI.loader.resources[key].texture, key);
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        checkIfInitialized();
    });
    requireAll(__webpack_require__(158));
}
exports.initialize = initialize;
fonts_1.onFontsLoaded(function (error) {
    if (error) {
        console.error(error);
    } else {
        wrapper.fontsLoaded = true;
        checkIfInitialized();
    }
});

/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.CardOptionsList = [{
    name: "Name",
    type: "text",
    description: "The name of the card."
}, {
    name: "Type",
    type: "text",
    description: "The card type. Must be \"Equipment\", \"Hero\", \"Location\", " + "\"Starter\", \"Super Power\", \"Villain\", or \"Weakness\". " + "Alternatively \"Super Hero\" or \"Super Villain\" are " + "shorthand for their oversized versions"
}, {
    name: "Variant",
    type: "checkbox",
    description: "If enabled, the card's textbox will be black instead of " + "white, such as for the Villain Stack. If the type is " + "\"Hero\" or \"Villain\", then they also gain the special " + "\"Super Hero/Villain\" subtype. This option has no effect " + "on Oversized card"
}, {
    name: "Oversized",
    type: "checkbox",
    description: "If enabled, the card becomes an oversized player card. " + "This option is only valid for \"Hero\" and \"Villain\" types," + " and Sub Type, Cost, and Victory Points are ignored."
}, {
    name: "Type Prefix",
    type: "text",
    description: "Some text to place in front of the card's type. " + "Ignored on oversized cards."
}, {
    name: "Victory Points",
    type: "number",
    description: "The number of Victory Points this is worth at the end. " + "Can be negative or \"*\". Ignored on Oversized cards."
}, {
    name: "Cost",
    type: "number",
    description: "How much this card costs. Ignored on Oversized cards."
}, {
    name: "Text",
    type: "text",
    description: "The card text describing what this card does. It will " + "auto format in both font size and bold/italics. Words " + "like \"+2 Power\", \"Attack\", and other common <abbr " + "title=\"Cryptozoic Game Engine\">CGE</abbr> terms will " + "automatically be bolded or italics. To manually bold text" + " use [b]bold this[/b], and to italic use [i]italic " + "this[/i]. Newlines can be used, and two sequential " + "newlines indicate a break between sections of text."
}, {
    name: "Image URL",
    type: "url",
    description: "URL to the image for this card. We recommend using a site" + " like <a href=\"https://imgur.com/\">imgur</a> to manage " + "your images. The image will be automatically centered on " + "the card. Normal cards will be 750px \xD7 523px in size, and" + " Oversized ones will be 900px \xD7 741px."
}, {
    name: "Logo URL",
    type: "url",
    description: "URL to the image for the logo in the top right of this " + "card. For both sizes of cards the image will be rendered " + "at 175px \xD7 175px."
}, {
    name: "Logo Scale",
    type: "number",
    description: "A number between 0.00 to 1.00 that scales the logo down " + "so it better fits on cards."
}, {
    name: "Copyright",
    type: "text",
    description: "The year and company the card is Copyright from. The \xA9 " + "symbol is added automatically, and if this is omitted " + "just the year will be displayed, e.g. " + ("\"\xA9" + new Date().getFullYear() + "\".")
}, {
    name: "Legal",
    type: "text",
    description: "The legal disclaimer at the bottom of the card. Often has" + " a set notation such as \"(s01)\"."
}, {
    name: "Subtype",
    type: "text",
    description: "An additional type describing the card, such as its owner" + " in the Street Fighter Deck Building Game."
}, {
    name: "Set",
    type: "text",
    description: "The set this card is a part of."
}, {
    name: "Set Text Color",
    type: "color",
    description: "The hex color to use for the text on the set indicator."
}, {
    name: "Set Background Color",
    type: "color",
    description: "The hex color to use for the background rectangle for the" + " set indication."
}, {
    name: "Preferred Text Size",
    type: "number",
    description: "The text size to start at when fitting text on the card. " + "Defaults to 38. <em>Note</em>: if the text does not fit " + "at this size it will be downsized until it fits."
}, {
    name: "Also Bold",
    type: "text list",
    description: "List of words separated by commas and a space \", \" of " + "words to bold even if they lack bold tags ([b]word[/b])."
}, {
    name: "Round Corners",
    type: "checkbox",
    description: "If the corners should be rounded. By default disabled " + "for the deck building tool, and enabled for the live " + "editor."
}];
exports.CardOptions = {};
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = exports.CardOptionsList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var cardOption = _step.value;

        exports.CardOptions[cardOption.name] = cardOption;
    }
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}

/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(163));

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = __webpack_require__(22);
var string_1 = __webpack_require__(76);
var uuid = __webpack_require__(157);

var EditableTable = function (_events_1$EventEmitte) {
    _inherits(EditableTable, _events_1$EventEmitte);

    function EditableTable(parent, columns, rows) {
        _classCallCheck(this, EditableTable);

        var _this = _possibleConstructorReturn(this, (EditableTable.__proto__ || Object.getPrototypeOf(EditableTable)).call(this));

        _this.table = document.createElement("table");
        _this.headingsRow = document.createElement("tr");
        _this.headings = new Map();
        _this.parent = parent;
        _this.columns = [];
        _this.rows = [];
        _this.table.classList.add("gui-table");
        _this.table.appendChild(_this.headingsRow);
        _this.parent.appendChild(_this.table);
        if (columns) {
            _this.addColumns(columns);
        }
        if (rows) {
            _this.addRows(rows);
        }
        return _this;
    }

    _createClass(EditableTable, [{
        key: "addColumns",
        value: function addColumns(columns) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = columns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var column = _step.value;

                    this.formatColumn(column);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.updateColumns();
        }
    }, {
        key: "addColumn",
        value: function addColumn(column) {
            this.formatColumn(column);
            this.updateColumns();
        }
    }, {
        key: "addRows",
        value: function addRows(rows) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = rows[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var row = _step2.value;

                    this.formatRow(row);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            this.updateRows(true);
        }
    }, {
        key: "addRow",
        value: function addRow(row) {
            this.formatRow(row);
            this.updateRows(true);
        }
    }, {
        key: "getRow",
        value: function getRow(index) {
            if (index > -1 && index < this.rows.length) {
                return this.rows[index];
            }
            throw new RangeError(index + " not in range of table with " + this.rows.length + " rows.");
        }
    }, {
        key: "getAllRows",
        value: function getAllRows() {
            return this.rows.slice();
        }
    }, {
        key: "deleteRow",
        value: function deleteRow(index) {
            if ((typeof index === "undefined" ? "undefined" : _typeof(index)) === "object") {
                index = index.index;
            }
            this.getRow(index);
            var row = this.rows[index];
            this.rows.splice(index, 1);
            for (var i = index; i < this.rows.length; i++) {
                this.rows[i].index = i;
            }
            row.tr.remove();
            this.emit(EditableTable.EventSymbols.rowDeleted, row);
        }
    }, {
        key: "formatColumn",
        value: function formatColumn(column) {
            if (typeof column === "string") {
                column = {
                    id: column
                };
            }
            if (!column.name) {
                column.name = column.id;
            }
            if (!column.id) {
                column.id = string_1.toCamelCase(column.name);
            }
            column.type = column.type || "string";
            switch (column.type) {
                case "string":
                    column.defaultValue = "";
                    column.transform = column.transform || String;
                    break;
                case "number":
                    column.defaultValue = 0;
                    column.transform = column.transform || Number;
                    break;
                case "boolean":
                    column.transform = column.transform || Boolean;
                    if (column.defaultValue === undefined) {
                        column.defaultValue = Boolean(column.defaultValue);
                    }
                    break;
                case "node":
                    column.notEditable = true;
                    column.transform = function (val) {
                        return val;
                    };
                    if (!column.defaultValue) {
                        throw new Error("Node values require default value to clone from");
                    }
                    break;
            }
            this.columns.push(column);
        }
    }, {
        key: "updateColumns",
        value: function updateColumns() {
            if (this.headings.size < this.columns.length) {
                var newColumns = this.columns.slice(this.headings.size);
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = newColumns[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var column = _step3.value;

                        var hr = document.createElement("th");
                        hr.innerHTML = column.name;
                        this.headingsRow.appendChild(hr);
                        this.headings.set(column.id, hr);
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                this.updateRows(false);
            }
        }
    }, {
        key: "formatRow",
        value: function formatRow(values) {
            if (values instanceof Array) {
                var obj = {};
                for (var i = 0; i < this.columns.length; i++) {
                    var column = this.columns[i];
                    obj[column.id] = values[i];
                }
                values = obj;
            }
            var row = {
                index: this.rows.length,
                values: values,
                tr: document.createElement("tr"),
                tds: []
            };
            this.rows.push(row);
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.columns[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var _column = _step4.value;

                    if (_column.type === "node") {
                        var cloning = _column.defaultValue;
                        var clone = cloning.cloneNode();
                        clone.innerHTML = cloning.innerHTML;
                        row.values[_column.id] = clone;
                    }
                    if (_column.allowedValues) {
                        if (_column.allowedValues.indexOf(row.values[_column.id]) === -1) {
                            row.values[_column.id] = _column.allowedValues[0];
                        }
                    }
                    if (row.values[_column.id] === undefined) {
                        row.values[_column.id] = _column.defaultValue;
                    }
                    row.values[_column.id] = _column.transform(row.values[_column.id], row);
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            this.emit(EditableTable.EventSymbols.rowAdded, row.values, row);
        }
    }, {
        key: "updateRows",
        value: function updateRows(added) {
            var _this2 = this;

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                var _loop = function _loop() {
                    var row = _step5.value;

                    if (!row.tr.parentElement) {
                        _this2.table.appendChild(row.tr);
                    }

                    var _loop2 = function _loop2(i) {
                        var id = "cell-" + uuid();
                        var column = _this2.columns[i];
                        var td = document.createElement("td");
                        td.setAttribute("class", "column-" + column.id);
                        var wrapper = document.createElement("div");
                        td.appendChild(wrapper);
                        if (column.type === "node") {
                            wrapper.appendChild(row.values[column.id]);
                        }
                        if (!column.notEditable) {
                            var child = void 0;
                            var event = "change";
                            var checkbox = false;
                            if (column.allowedValues) {
                                child = document.createElement("select");
                                var _iteratorNormalCompletion6 = true;
                                var _didIteratorError6 = false;
                                var _iteratorError6 = undefined;

                                try {
                                    for (var _iterator6 = column.allowedValues[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                        var value = _step6.value;

                                        var option = document.createElement("option");
                                        option.setAttribute("value", String(value));
                                        option.innerText = String(value);
                                        child.appendChild(option);
                                    }
                                } catch (err) {
                                    _didIteratorError6 = true;
                                    _iteratorError6 = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion6 && _iterator6.return) {
                                            _iterator6.return();
                                        }
                                    } finally {
                                        if (_didIteratorError6) {
                                            throw _iteratorError6;
                                        }
                                    }
                                }
                            } else if (column.longText) {
                                child = document.createElement("textarea");
                            } else {
                                child = document.createElement("input");
                                var inputType = "text";
                                switch (column.type) {
                                    case "boolean":
                                        inputType = "checkbox";
                                        event = "click";
                                        checkbox = true;
                                        var label = document.createElement("label");
                                        label.setAttribute("for", id);
                                        wrapper.appendChild(label);
                                        break;
                                    case "number":
                                        inputType = "number";
                                        break;
                                    case "string":
                                        if (column.color) {
                                            inputType = "color";
                                        }
                                        break;
                                }
                                child.setAttribute("type", inputType);
                            }
                            if (checkbox) {
                                child.checked = row.values[column.id];
                            } else {
                                child.value = String(row.values[column.id]);
                            }
                            if (column.inputAttributes) {
                                var _iteratorNormalCompletion7 = true;
                                var _didIteratorError7 = false;
                                var _iteratorError7 = undefined;

                                try {
                                    for (var _iterator7 = Object.keys(column.inputAttributes)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                                        var attribute = _step7.value;

                                        child.setAttribute(attribute, String(column.inputAttributes[attribute]));
                                    }
                                } catch (err) {
                                    _didIteratorError7 = true;
                                    _iteratorError7 = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion7 && _iterator7.return) {
                                            _iterator7.return();
                                        }
                                    } finally {
                                        if (_didIteratorError7) {
                                            throw _iteratorError7;
                                        }
                                    }
                                }
                            }
                            child.id = id;
                            wrapper.insertBefore(child, wrapper.firstChild);
                            var lastValue = child.value;
                            child.addEventListener(event, function () {
                                var newValue = child.value;
                                if (checkbox) {
                                    newValue = child.checked;
                                }
                                var untransformed = newValue;
                                newValue = column.transform(newValue, row);
                                if (lastValue !== newValue) {
                                    row.values[column.id] = column.transform(newValue, row);
                                    _this2.emit(EditableTable.EventSymbols.cellChanged, row, column, newValue);
                                    lastValue = newValue;
                                }
                                if (newValue !== untransformed) {
                                    if (checkbox) {
                                        child.checked = newValue;
                                    } else {
                                        child.value = newValue;
                                    }
                                }
                            });
                        } else if (column.type !== "node") {
                            wrapper.innerHTML = String(row.values[column.id]);
                        }
                        if (column.rowsTitle) {
                            td.title = column.rowsTitle;
                        }
                        row.tds.push(td);
                        row.tr.appendChild(td);
                    };

                    for (var i = row.tds.length; i < _this2.columns.length; i++) {
                        _loop2(i);
                    }
                };

                for (var _iterator5 = this.rows[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    _loop();
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }
        }
    }]);

    return EditableTable;
}(events_1.EventEmitter);

EditableTable.EventSymbols = {
    rowAdded: Symbol("rowAdded"),
    cellChanged: Symbol("cellChanged"),
    rowDeleted: Symbol("rowDeleted")
};
exports.EditableTable = EditableTable;

/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}
exports.clamp = clamp;
function doRectanglesOverlap(r1, r2) {
    return !(r2.x > r1.x + r1.width || r2.x + r2.width < r1.x || r2.y > r1.y + r1.height || r2.y + r2.height < r1.y);
}
exports.doRectanglesOverlap = doRectanglesOverlap;
function doesCircleOverlapRectangle(rect, circle) {
    var distX = Math.abs(circle.x - rect.x - rect.width / 2);
    var distY = Math.abs(circle.y - rect.y - rect.height / 2);
    if (distX > rect.width / 2 + circle.radius || distY > rect.height / 2 + circle.radius) {
        return false;
    }
    if (distX <= rect.width / 2 || distY <= rect.height / 2) {
        return true;
    }
    var dx = distX - rect.width / 2;
    var dy = distY - rect.height / 2;
    return dx * dx + dy * dy <= circle.radius * circle.radius;
}
exports.doesCircleOverlapRectangle = doesCircleOverlapRectangle;

/***/ }),

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function tryToCast(value) {
    if (typeof value === "string") {
        var asNum = Number(value);
        if (!isNaN(asNum)) {
            value = asNum;
        } else {
            var lowered = value.toLowerCase();
            if (lowered === "false") {
                value = false;
            } else if (lowered === "true") {
                value = true;
            }
        }
    }
    return value;
}
exports.tryToCast = tryToCast;
function toCamelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (matched, index) {
        if (+matched === 0) {
            return "";
        }
        return index === 0 ? matched.toLowerCase() : matched.toUpperCase();
    });
}
exports.toCamelCase = toCamelCase;
function toDashCase(str) {
    if (!str) {
        return "";
    }
    str = str[0].toLowerCase() + str.substr(1);
    str = replaceAll(str, " ", "");
    return str.replace(/([A-Z])/g, function (sub) {
        return "-" + sub.toLowerCase();
    });
}
exports.toDashCase = toDashCase;
function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
exports.escapeRegExp = escapeRegExp;
function removeTags(str) {
    var replacement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

    return str.replace(/(<([^>]+)>)/ig, replacement);
}
exports.removeTags = removeTags;
function stripTagsFromString(str) {
    var div = document.createElement("div");
    div.innerHTML = str;
    return div.textContent || div.innerText || "";
}
exports.stripTagsFromString = stripTagsFromString;
function replaceAll(target, search) {
    var replacement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

    return target.replace(new RegExp(escapeRegExp(search), "g"), replacement);
}
exports.replaceAll = replaceAll;
function surroundText(search, regex, front, end) {
    var matches = [];
    while (true) {
        var result = regex.exec(search);
        if (result) {
            matches.push({
                start: result.index,
                end: result.index + result[0].length,
                str: result[0]
            });
        } else {
            break;
        }
    }
    var addLength = front.length + end.length;
    var addedLength = 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = matches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var match = _step.value;

            search = [search.substring(0, match.start + addedLength), front, match.str, end, search.substring(match.end + addedLength)].join("");
            addedLength += addLength;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return search;
}
exports.surroundText = surroundText;

/***/ })

},[177]);
//# sourceMappingURL=index.js.map