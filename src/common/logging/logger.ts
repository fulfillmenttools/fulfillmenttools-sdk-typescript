import { Logger } from 'tslog';

export class CustomLogger<LogObj> extends Logger<LogObj> {
  constructor() {
    super({ type: 'json' });
  }
}
