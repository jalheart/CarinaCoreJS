import { FuntionalElement } from './FuntionalElement';
import { State } from './State';
import { Goal } from './Goal';
export declare abstract class Task extends FuntionalElement {
    private _goal;
    protected _effects: State[];
    protected _preconditions: State[];
    protected _executed: boolean;
    protected _successful: boolean;
    protected _stopPlan: boolean;
    Task(): void;
    abstract run(): Promise<any>;
    buildProfile(): void;
    updateTaskState(executed: boolean, successful: boolean, stopPlan: boolean): void;
    goal: Goal;
    executed: boolean;
    successful: boolean;
    stopPlan: boolean;
    effects: State[];
    preconditions: State[];
    addEffect(effect: State): void;
    addPrecondition(effect: State): void;
    getEffect(pos: number | string): State;
    private getEffectN(pos);
    private getEffectS(name);
    getPrecondition(pos: number | string): State;
    private getPreconditionN(pos);
    private getPreconditionS(name);
}
