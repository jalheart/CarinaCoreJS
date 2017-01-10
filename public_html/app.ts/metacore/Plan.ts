import { Element } from './Element';
import { Task} from './Task';
export class Plan extends Element{
    private _actions:Task[] =[];
    private _currentAction: number   =0;
    public Plan() {
        this._actions =[];
    }
    /**
     * @return Boolean Indica si el plan se ejecutó satisfactoriamente
     */
     public executePlan():Promise<any>{
         return new Promise((resolve)=>{
            var currentAction: Task;
            if (this.actions.length <= 0) resolve(true);
            this.executeAction(0).then((result)=>{
                resolve(true);
            });
         });
    }
     private executeAction(pos: number): Promise<any>{
        return new Promise((resolve)=>{
            this.actions[pos].run().then((result)=>{
                if(this.actions[pos].stopPlan){
                    //Esto se hace para mostrar el tablero.
                    //FIXME Esto debe ser reemplazado por una algoritmo, en el cual se carga el resto de las acciones que faltan por ejecutar y que no se pueden detener, y ejecutarlas
                    if (this.actions.length > pos-1){
                        pos =this.actions.length-1;
                        this.executeAction(pos).then((resultEP)=>{
                            resolve(true);
                        });
                    }else{
                        resolve(true);
                    }
                }else{
                    pos++;
                    if (pos >= this.actions.length){
                        resolve(true);
                    }else{
                        this.executeAction(pos).then((resultEP)=>{
                            resolve(true);
                        });
                    }
                }
            });
        });
     }
    // <editor-fold defaultstate="collapsed" desc="GETs y SETs">
    public get actionsLength():number{
        return this._actions.length;
    }
    /**
     * @return the actions
     */
    public get actions(): Task[] {
        return this._actions;
    }

    /**
     * @param actions the actions to set
     */
    public set actions(actions:Task[]) {
        this._actions = actions;
    }
//    public addAction(action: Task) {
    public addAction(action: any) {
        this.actions.push(action);
    }
    /**
     * @return the currentAction
     */
    public get currentAction(): number {
        return this._currentAction;
    }

    /**
     * @param currentAction the currentAction to set
     */
    public set currentAction(currentAction: number) {
        this._currentAction = currentAction;
    }
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="implementación fromJSON">
    public static fromJSON(plan: any): Plan{
        var planTmp: Plan = new Plan();        
        return planTmp;
    }
    // </editor-fold>
}