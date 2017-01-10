import { SensorMemory} from '../memory/SensorMemory';
import { RootElement} from './RootElement';
export abstract class Sensor extends RootElement{
    private _eventHandlers={};
    private _type: string;
    private _sensorMemory: SensorMemory;
    public constructor() {
        super();
        this._sensorMemory   =SensorMemory.instance;
    }
    public perceiveInformation(value:any):any{
        return null;
    }
    
    public addEventListener(theEvent:string, theHandler:any) {
        this._eventHandlers[theEvent] = this._eventHandlers[theEvent] || [];
        this._eventHandlers[theEvent].push(theHandler);
    }
    // remove a listener
    removeEventListener(theEvent:string, theHandler:any) {
      // TODO
    }
    // remove all listeners
    removeAllListeners(theEvent:string) {
      // TODO
    }
    // dispatch event to all listeners
    dispatchAll(theEvent:string) {
        var theHandlers = this._eventHandlers[theEvent];
        if(theHandlers) {
          for(var i = 0; i < theHandlers.length; i += 1) {
            this.dispatchEvent(theEvent, theHandlers[i]);
          }
        }
    }
    // send event to a handler
    dispatchEvent(theEvent:string, theHandler:any) {
      theHandler(this);
    }
    // <editor-fold defaultstate="collapsed" desc="GETs y SETs">
    /**
     * @return the type
     */
    public get type():string {
        return this._type;
    }

    /**
     * @param type the type to set
     */
    public set type(type) {
        this._type = type;
    }
    /**
     * @return the sensorMemory
     */
    public get sensorMemory(): SensorMemory {
        return this._sensorMemory;
    }
    // </editor-fold>
}