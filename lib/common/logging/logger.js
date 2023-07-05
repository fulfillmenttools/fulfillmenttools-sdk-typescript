"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLogger = void 0;
const tslog_1 = require("tslog");
class CustomLogger extends tslog_1.Logger {
    constructor() {
        super({ type: 'json' });
    }
}
exports.CustomLogger = CustomLogger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1vbi9sb2dnaW5nL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBK0I7QUFFL0IsTUFBYSxZQUFxQixTQUFRLGNBQWM7SUFDdEQ7UUFDRSxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUMxQixDQUFDO0NBQ0Y7QUFKRCxvQ0FJQyJ9