import { RootElement} from './RootElement';
import { State} from './State';
export abstract class FuntionalElement extends RootElement{
    public state: State;
    public startTime:any;
    public endTime:any;
    private _effect: State;
    private _precodition: State;
    constructor(){
        super();
    }
    set effect(effect: State){
        this._effect = effect;
    }
    get effect(): State{
        return this._effect;            
    }
    set precodition(precodition: State){
        this._precodition = precodition;
    }
    get precodition(): State{
        return this._precodition;
    }
}