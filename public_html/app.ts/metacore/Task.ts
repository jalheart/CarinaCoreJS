import { FuntionalElement} from './FuntionalElement';
import { State} from './State';
import { Goal} from './Goal';
export abstract class Task extends FuntionalElement{
    private _goal: Goal;
    protected _effects: State[];
    protected _preconditions: State[];
    protected _executed: boolean=false;
    protected _successful: boolean   =false;
    protected _stopPlan: boolean     =false;    
    public Task() {}    
    abstract run():Promise<any>;
    buildProfile(){}
    public updateTaskState(executed: boolean, successful: boolean, stopPlan: boolean){
        this.executed   =executed;
        this.successful =successful;
        this.stopPlan   =stopPlan;
    }
    // <editor-fold defaultstate="collapsed" desc="GETs y SETs">
    /**
     * @return the goal
     */
    get goal(): Goal{
        return this._goal;
    }

    /**
     * @param goal the goal to set
     */
    set goal(goal: Goal) {
        this._goal = goal;
    }
    /**
     * @return the _executed
     */
    set executed(value: boolean){
        this._executed = value;
    }
    get executed(): boolean {
        return this._executed;
    }

    /**
     * @return the _successful
     */
    set successful(value:boolean){
        this._successful = value;
    }
    get successful(): boolean{
        return this._successful;
    }
    /**
     * @return the _stopPlan
     */
    set stopPlan(value: boolean){
        this._stopPlan = value;
    }
    get stopPlan(): boolean{
        return this._stopPlan;
    }
    /**
     * @return the effects
     */
    get effects(): State[]{
        return this._effects;
    }

    /**
     * @param effects the effects to set
     */
    set effects(effects: State[]) {
        this._effects = effects;
    }

    /**
     * @return the preconditions
     */
    get preconditions(): State[]{
        return this._preconditions;
    }
    /**
     * @param preconditions the preconditions to set
     */
    set preconditions(preconditions: State[]) {
        this._preconditions = preconditions;
    }
    addEffect(effect: State){
        if(this._effects==null)this._effects   =[];
        this._effects.push(effect);
    }
    addPrecondition(effect: State){
        if(this._preconditions==null)this._preconditions   =[];
        this._preconditions.push(effect);
    }
    /**
     * Devuelve un efecto de la tarea basado en su posición dentro de la lista
     * @param pos 
     * @return State
     */
    getEffect(pos: number | string): State{
        return typeof pos === 'number' ? this.getEffectN(pos) : this.getEffectS(pos);
    }
    private getEffectN(pos: number): State{
        if (this._effects == null || this._effects.length<=pos)return null;
        return this.effects[pos];
    }
    /**
     * Devuelve un efecto de la tarea basado en su nombre
     * @param name
     * @return State
     */
    private getEffectS(name: string): State{
        for (let stateTmp of this._effects) {
            if (stateTmp.name == name) return stateTmp;
        }
        return null;
    }  
    /**
     * Devuelve una precondicón de la tarea basado en su posición dentro de la lista
     * @param pos
     * @return State
     */
    getPrecondition(pos: number | string): State{
        if (typeof pos==='number'){
            return this.getPreconditionN(pos);
        } else if (typeof pos==='string'){
            return this.getPreconditionS(pos);
        }
    }
    private getPreconditionN(pos: number): State{
        if (this._preconditions == null || this._preconditions.length<=pos)return null;
        return this.preconditions[pos];
    }
    private getPreconditionS(name: string): State{
        for (let stateTmp of this._preconditions) {
            if (stateTmp.name == name) return stateTmp;
        }
        return null;
    }          
    // </editor-fold>
}