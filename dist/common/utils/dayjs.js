"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nowWIB = exports.formatWIB = exports.nowUTC = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
dayjs_1.default.tz.setDefault('Asia/Jakarta');
const nowUTC = () => (0, dayjs_1.default)().utc().toDate();
exports.nowUTC = nowUTC;
const formatWIB = (date) => (0, dayjs_1.default)(date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
exports.formatWIB = formatWIB;
const nowWIB = () => (0, dayjs_1.default)().tz('Asia/Jakarta');
exports.nowWIB = nowWIB;
//# sourceMappingURL=dayjs.js.map