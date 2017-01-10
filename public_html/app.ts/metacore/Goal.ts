import { Element} from './Element';
import { State} from './State';
export class Goal extends Element{
    private _sourceState: State;
    private _targetState: State;
    set sourceState(state: State){
        this._sourceState = state;
    }
    get sourceState(): State{
        return this._sourceState;
    }
    set targetState(state: State){
        this._targetState= state;
    }
    get targetState(): State{
        return this._targetState;
    }
}