import { Element } from './Element';
import { Task } from './Task';
export declare class Plan extends Element {
    private _actions;
    private _currentAction;
    Plan(): void;
    executePlan(): Promise<any>;
    private executeAction(pos);
    readonly actionsLength: number;
    actions: Task[];
    addAction(action: any): void;
    currentAction: number;
    static fromJSON(plan: any): Plan;
}
