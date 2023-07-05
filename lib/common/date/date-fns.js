"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeekdayNameForTimeZoneFromDate = exports.now = exports.parseISO = exports.subSeconds = exports.subMinutes = exports.intervalToDuration = exports.isWithinInterval = exports.addMinutes = exports.addHours = exports.startOfToday = exports.startOfDay = exports.isBefore = exports.isAfter = exports.addSeconds = exports.addDays = void 0;
const date_fns_1 = require("date-fns");
Object.defineProperty(exports, "addDays", { enumerable: true, get: function () { return date_fns_1.addDays; } });
Object.defineProperty(exports, "addSeconds", { enumerable: true, get: function () { return date_fns_1.addSeconds; } });
Object.defineProperty(exports, "isAfter", { enumerable: true, get: function () { return date_fns_1.isAfter; } });
Object.defineProperty(exports, "isBefore", { enumerable: true, get: function () { return date_fns_1.isBefore; } });
Object.defineProperty(exports, "startOfDay", { enumerable: true, get: function () { return date_fns_1.startOfDay; } });
Object.defineProperty(exports, "startOfToday", { enumerable: true, get: function () { return date_fns_1.startOfToday; } });
Object.defineProperty(exports, "addHours", { enumerable: true, get: function () { return date_fns_1.addHours; } });
Object.defineProperty(exports, "addMinutes", { enumerable: true, get: function () { return date_fns_1.addMinutes; } });
Object.defineProperty(exports, "isWithinInterval", { enumerable: true, get: function () { return date_fns_1.isWithinInterval; } });
Object.defineProperty(exports, "intervalToDuration", { enumerable: true, get: function () { return date_fns_1.intervalToDuration; } });
Object.defineProperty(exports, "subMinutes", { enumerable: true, get: function () { return date_fns_1.subMinutes; } });
Object.defineProperty(exports, "subSeconds", { enumerable: true, get: function () { return date_fns_1.subSeconds; } });
Object.defineProperty(exports, "parseISO", { enumerable: true, get: function () { return date_fns_1.parseISO; } });
function now() {
    return new Date();
}
exports.now = now;
function getWeekdayNameForTimeZoneFromDate(date, timeZone) {
    return date.toLocaleString('en-US', { weekday: 'long', timeZone }).toLowerCase();
}
exports.getWeekdayNameForTimeZoneFromDate = getWeekdayNameForTimeZoneFromDate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1mbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbW9uL2RhdGUvZGF0ZS1mbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdUNBY2tCO0FBR2hCLHdGQWhCQSxrQkFBTyxPQWdCQTtBQUNQLDJGQWhCQSxxQkFBVSxPQWdCQTtBQUNWLHdGQWhCQSxrQkFBTyxPQWdCQTtBQUNQLHlGQWhCQSxtQkFBUSxPQWdCQTtBQUNSLDJGQWhCQSxxQkFBVSxPQWdCQTtBQUNWLDZGQWhCQSx1QkFBWSxPQWdCQTtBQUNaLHlGQWhCQSxtQkFBUSxPQWdCQTtBQUNSLDJGQWhCQSxxQkFBVSxPQWdCQTtBQUNWLGlHQWhCQSwyQkFBZ0IsT0FnQkE7QUFDaEIsbUdBaEJBLDZCQUFrQixPQWdCQTtBQUNsQiwyRkFoQkEscUJBQVUsT0FnQkE7QUFDViwyRkFoQkEscUJBQVUsT0FnQkE7QUFDVix5RkFoQkEsbUJBQVEsT0FnQkE7QUFHVixTQUFnQixHQUFHO0lBQ2pCLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUNwQixDQUFDO0FBRkQsa0JBRUM7QUFFRCxTQUFnQixpQ0FBaUMsQ0FBQyxJQUFVLEVBQUUsUUFBZ0I7SUFDNUUsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNuRixDQUFDO0FBRkQsOEVBRUMifQ==