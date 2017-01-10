/**
 *
 * @author jalheart
 */ 
import { RootElement} from '../metacore/RootElement';
export class Category extends RootElement{
    private _category:any;
    public constructor(category?:any){
        super();
        this.category = category ? category:null;
    }

    public get category():any{
        return this._category;
    }
    public set category(category:any){
        this._category = category;
    }
    // <editor-fold defaultstate="collapsed" desc="implementación fromJSON">
    public static fromJSON(jsonObject: any): Category{
        var salida: Category;
        salida = new Category();
        if (jsonObject._category) salida.category = jsonObject._category;        
        return salida;
    }    
    // </editor-fold>
}