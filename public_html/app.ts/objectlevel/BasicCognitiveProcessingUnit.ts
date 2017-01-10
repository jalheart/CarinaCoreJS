/**
 *
 * @author jalheart
 */
import { RootElement} from '../metacore/RootElement';
import { Input} from './Input';
import { Pattern} from './Pattern';
import { Category} from './Category';
import { Plan} from '../metacore/Plan';
import { Goal} from '../metacore/Goal';
export class BasicCognitiveProcessingUnit extends RootElement{    
    private _inputs     : any   ={};//Es un objeto a ser usado como un arreglo asociativo que en cada atributo agregado se le asigna una nueva posicion
    private _pattern    : Pattern;
    private _categorys  : Category[];
    private _plans      :Plan[];
    private _goal       :Goal;
    public addInput(input: Input | any,typeSensor?:string){
        if (input instanceof Input){
            this.input  =input;
        }else{
            var newInput: Input  =new Input();
            newInput.information = input;
            newInput.type       =typeSensor;
            this.input          =newInput;
        }
    }        
    public addPattern(pattern:any){
        var newPattern: Pattern = new Pattern(pattern);
        this.pattern    =newPattern;
    }
    public addCategories(categories: any[]){
        //TODO Es agregar, no reemplazar
        if(categories!=null){            
            var categorysTemp: Category[] = [];
            var newCategory: Category;
            for (var category of categories) {
                newCategory =new Category();
                newCategory.category    =category;
                categorysTemp.push(newCategory);
            }
            this.categorys  =categorysTemp;
        }
    }
    public addPlans(plans: Plan[]){
        this._plans  =plans;
    }
    // <editor-fold defaultstate="collapsed" desc="GETs y SETs">
    /**
     * @return the input
     */
    public get inputs():any{
        return this._inputs;
    }
    public getInput(type:string):Input{
        return this._inputs==null?null:this._inputs[type];
    }
    /**
     * @param input the input to set
     */
    public set input(input:Input) {
//        if(this._inputs==null)this._inputs  ={};
        this._inputs    ={};//TODO Temporalmente solo se admite un input a la vez
        this._inputs[input.type] = input;        
    }
    public set inputs(inputs:any) {
        this._inputs = inputs;
    }

    /**
     * @return the pattern
     */
    public get pattern(): Pattern{
        return this._pattern;
    }

    /**
     * @param pattern the pattern to set
     */
    public set pattern(pattern: Pattern) {
        this._pattern = pattern;
    }

    /**
     * @return the categorys
     */
    public get categorys(): Category[]{
        return this._categorys;
    }

    /**
     * @param categorys the categorys to set
     */
    public set categorys(categorys: Category[]) {
        this._categorys = categorys;
    }
    public get plans(): Plan[]{
        return this._plans;
    }
    public set plans(plans: Plan[]){
        this._plans  =plans;
    }
     /**
     * @return the _goal
     */
    public get goal(): Goal {
        return this._goal;
    }

    /**
     * @param _goal the _goal to set
     */
    public set goal(goal: Goal) {
        this._goal = goal;
    }
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="implementación fromJSON">
    public static fromJSON(jsonObject: any): BasicCognitiveProcessingUnit{
        var salida: BasicCognitiveProcessingUnit;
        salida = new BasicCognitiveProcessingUnit();
        if (jsonObject._name)salida.name = jsonObject['_name'];        
        if (jsonObject._pattern) salida.pattern = Pattern.fromJSON(jsonObject._pattern);
        if (jsonObject._inputs) salida.inputs = BasicCognitiveProcessingUnit.inputsFromJSON(jsonObject._inputs);
        if (jsonObject._categorys) salida.categorys = BasicCognitiveProcessingUnit.categoriesFromJSON(jsonObject._categorys);
        if (jsonObject._plans) salida.plans = BasicCognitiveProcessingUnit.plansFromJSON(jsonObject._plans);        
        return salida;
    }
    public static inputsFromJSON(inputs:any):any{
        var salida={};
        for (let tipo in inputs)
            salida[tipo] = Input.fromJSON(inputs[tipo]);
        return salida;
    }
    public static categoriesFromJSON(categories:any):any{
        var salida=[];
        for (let category of categories)
            salida.push(Category.fromJSON(category));
        return salida;
    }
    public static plansFromJSON(plans:any):any{
        var salida: Plan[]=[];        
        for (let plan in plans)
            salida.push(Plan.fromJSON(plans[plan]));
        return salida;
    }
    // </editor-fold>
}