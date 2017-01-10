/**
 *
 * @author jalheart
 */ 
import { RootElement} from '../metacore/RootElement';
export class Input extends RootElement{
    private _information:any;
    private _type: string;

    public constructor(information?:any, type?:string) {
        super();
        this.information = information ? information:null;
        this.type = type?type:null;
    }
    // <editor-fold defaultstate="collapsed" desc="GETs y SETs">
    /**
     * @return the information
     */
    public get information():any{
        return this._information;
    }

    /**
     * @param information the information to set
     */
    public set information(information:any) {
        this._information = information;
    }

    /**
     * @return the type
     */
    public get type(): string{
        return this._type;
    }

    /**
     * @param type the type to set
     */
    public set type(type: string) {
        this._type = type;
    }
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="implementación fromJSON">
    public static fromJSON(jsonObject: any): Input{
        var salida: Input;
        salida = new Input();
        if (jsonObject._type) salida.type = jsonObject['_type'];
        if (jsonObject._information) salida.information = jsonObject['_information'];
        return salida;
    }
    // </editor-fold>
}