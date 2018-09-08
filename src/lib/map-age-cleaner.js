const pDefer = () => {
  const ret = {};

  ret.promise = new Promise((resolve, reject) => {
    ret.resolve = resolve;
    ret.reject = reject;
  });

  return ret;
};

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0: case 1: t = op; break;
        case 4: _.label++; return { value: op[1], done: false };
        case 5: _.label++; y = op[1]; op = [0]; continue;
        case 7: op = _.ops.pop(); _.trys.pop(); continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
          if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
          if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
          if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
          if (t[2]) _.ops.pop();
          _.trys.pop(); continue;
      }
      op = body.call(thisArg, _);
    } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
    if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
};
define(["require", "exports", "p-defer"], function (require, exports, p_defer_1) {
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  function mapAgeCleaner(map, property) {
    var _this = this;
    if (property === void 0) { property = 'maxAge'; }
    var processingKey;
    var processingTimer;
    var processingDeferred;
    var cleanup = function () { return __awaiter(_this, void 0, void 0, function () {
      var setupTimer, _i, map_1, entry, _a;
      var _this = this;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (processingKey !== undefined) {
              // If we are already processing an item, we can safely exit
              return [2 /*return*/];
            }
            setupTimer = function (item) { return __awaiter(_this, void 0, void 0, function () {
              var delay;
              return __generator(this, function (_a) {
                processingDeferred = p_defer_1.default();
                delay = item[1][property] - Date.now();
                if (delay <= 0) {
                  // Remove the item immediately if the delay is equal to or below 0
                  map.delete(item[0]);
                  processingDeferred.resolve();
                  return [2 /*return*/];
                }
                // Keep track of the current processed key
                processingKey = item[0];
                processingTimer = setTimeout(function () {
                  // Remove the item when the timeout fires
                  map.delete(item[0]);
                  if (processingDeferred) {
                    processingDeferred.resolve();
                  }
                }, delay);
                return [2 /*return*/, processingDeferred.promise];
              });
            }); };
            _b.label = 1;
          case 1:
            _b.trys.push([1, 6, , 7]);
            _i = 0, map_1 = map;
            _b.label = 2;
          case 2:
            if (!(_i < map_1.length)) return [3 /*break*/, 5];
            entry = map_1[_i];
            return [4 /*yield*/, setupTimer(entry)];
          case 3:
            _b.sent();
            _b.label = 4;
          case 4:
            _i++;
            return [3 /*break*/, 2];
          case 5: return [3 /*break*/, 7];
          case 6:
            _a = _b.sent();
            return [3 /*break*/, 7];
          case 7:
            processingKey = undefined;
            return [2 /*return*/];
        }
      });
    }); };
    var reset = function () {
      processingKey = undefined;
      if (processingTimer !== undefined) {
        clearTimeout(processingTimer);
        processingTimer = undefined;
      }
      if (processingDeferred !== undefined) { // tslint:disable-line:early-exit
        processingDeferred.reject(undefined);
        processingDeferred = undefined;
      }
    };
    var originalSet = map.set.bind(map);
    map.set = function (key, value) {
      if (map.has(key)) {
        // If the key already exist, remove it so we can add it back at the end of the map.
        map.delete(key);
      }
      // Call the original `map.set`
      var result = originalSet(key, value);
      // If we are already processing a key and the key added is the current processed key, stop processing it
      if (processingKey && processingKey === key) {
        reset();
      }
      // Always run the cleanup method in case it wasn't started yet
      cleanup(); // tslint:disable-line:no-floating-promises
      return result;
    };
    cleanup(); // tslint:disable-line:no-floating-promises
    return map;
  }
  exports.default = mapAgeCleaner;
});
