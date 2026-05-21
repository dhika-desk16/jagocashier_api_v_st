"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimezoneInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
let TimezoneInterceptor = class TimezoneInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, rxjs_1.map)((data) => {
            return ensureTimezoneJakarta(data);
        }));
    }
};
exports.TimezoneInterceptor = TimezoneInterceptor;
exports.TimezoneInterceptor = TimezoneInterceptor = __decorate([
    (0, common_1.Injectable)()
], TimezoneInterceptor);
function ensureTimezoneJakarta(obj) {
    if (!obj)
        return obj;
    try {
        if (obj instanceof Date) {
            return (0, dayjs_1.default)(obj).tz('Asia/Jakarta', true).format('YYYY-MM-DD HH:mm:ss');
        }
        if (Array.isArray(obj))
            return obj.map(ensureTimezoneJakarta);
        if (typeof obj === 'object') {
            return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, ensureTimezoneJakarta(v)]));
        }
        return obj;
    }
    catch (err) {
        console.error('[ensureTimezoneJakarta] ERROR on obj:', obj, err);
        return obj;
    }
}
//# sourceMappingURL=TimezoneInterceptor.js.map