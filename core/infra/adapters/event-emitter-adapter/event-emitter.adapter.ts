import { IEventEmitterAdapter } from '@domain/adapters/event-emitter-adapter/event-emitter.adapter';
import { EventEmitter2 } from '@nestjs/event-emitter';

export class EventEmitterAdapter implements IEventEmitterAdapter {
  constructor(private eventEmitter: EventEmitter2) {}

  emit(eventName: string, params) {
    this.eventEmitter.emit(eventName, params);
  }
}
