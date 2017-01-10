import { RootElement} from './RootElement';
export class Field extends RootElement{
    private _value: any;
    constructor(name: string, value: any) {
        super();
        this.name   =name;
        this.value = value;
    }
    // <editor-fold defaultstate="collapsed" desc="GETs y SETs">
    /**
     * @return the value
     */
    get value(): any{
        return this._value;
    }

    /**
     * @param value the value to set
     */
    set value(value: any) {
        this._value = value;
    }
    // </editor-fold>
}