import { RootElement} from '../metacore/RootElement';
export class Pattern extends RootElement{
    private _pattern:any;
    public constructor(pattern?:any) {
        super();
        this.pattern = pattern ? pattern:null;
    }
    // <editor-fold defaultstate="collapsed" desc="GETs y SETs">
    /**
     * @return the pattern
     */
    public get pattern():any{
        return this._pattern;
    }

    /**
     * @param pattern the pattern to set
     */
    public set pattern(pattern:any) {
        this._pattern = pattern;
    }
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="implementación fromJSON">
    public static fromJSON(jsonObject: any): Pattern{
        var salida: Pattern;
        salida = new Pattern(jsonObject._pattern?jsonObject._pattern:null);        
        return salida;
    } 
    // </editor-fold>
}