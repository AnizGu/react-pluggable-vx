import { EventEmitter } from 'fbemitter';
import { EventHandler } from '../typings';

class PluggableEventHandler implements EventHandler {
    private emitter = new EventEmitter();

    send = (eventType: string, ...args: any[]) => {
        this.emitter.emit(eventType, args);
    }

    subscribe = <T extends Function>(eventType: string, listener: T) => {
        this.emitter.addListener(eventType, (...args: any[]) => {
            listener(...args[0])
        });
    }

    subscribeOnce = <T extends Function>(eventType: string, listener: T) => {
        this.emitter.once(eventType, (...args: any[]) => {
            listener(...args[0])
        });
    }

    removeAll = (eventType?: string) => {
        this.emitter.removeAllListeners(eventType);
    }

}

export default PluggableEventHandler;