import { Element} from './Element';
export class State extends Element{
    //private _name: boolean;
    private _value: boolean;
    public constructor(name: string, value: boolean) {
        super();
        this.name = name;
        this.value = value;
    }    
    // <editor-fold defaultstate="collapsed" desc="GETs y SETs">
    /**
     * @return the value
     */
    get value(): boolean{
        return this._value;
    }

    /**
     * @param value the value to set
     */
    set value(value: boolean) {
        this._value = value;
    }        
    // </editor-fold>
}