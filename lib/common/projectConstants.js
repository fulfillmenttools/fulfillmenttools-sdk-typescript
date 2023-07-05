"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_RETRIES = exports.USER_AGENT = exports.APP_VERSION = exports.APP_NAME = exports.SHORT_SHA = void 0;
exports.SHORT_SHA = process.env.SHORT_SHA || 'undefined';
exports.APP_NAME = process.env.npm_package_name || 'PS FFT Client';
exports.APP_VERSION = process.env.npm_package_version || '0.0.1';
exports.USER_AGENT = `${exports.APP_NAME}/${exports.APP_VERSION} (${exports.SHORT_SHA})`;
exports.MAX_RETRIES = 3;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdENvbnN0YW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vcHJvamVjdENvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsSUFBSSxXQUFXLENBQUM7QUFDakQsUUFBQSxRQUFRLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsSUFBSSxlQUFlLENBQUM7QUFDM0QsUUFBQSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsSUFBSSxPQUFPLENBQUM7QUFDekQsUUFBQSxVQUFVLEdBQUcsR0FBRyxnQkFBUSxJQUFJLG1CQUFXLEtBQUssaUJBQVMsR0FBRyxDQUFDO0FBQ3pELFFBQUEsV0FBVyxHQUFHLENBQUMsQ0FBQyJ9