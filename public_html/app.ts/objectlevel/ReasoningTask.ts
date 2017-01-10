/**
 *
 * @author jalheart
 */ 
import { Strategy } from '../metacore/Strategy';
import { CognitiveTask} from './CognitiveTask';
export class ReasoningTask extends CognitiveTask{
    private _strategys: Strategy[];
    public buildProfile(){

    }
    public run():any{            
    }
    // <editor-fold defaultstate="collapsed" desc="SETs y GETs">
    /**
     * @return the strategys
     */
    public get strategys(): Strategy[]{
        return this._strategys;
    }

    /**
     * @param strategys the strategys to set
     */
    public set strategys(strategys: Strategy[]) {
        this._strategys = strategys;
    }
    public addStrategy(strategy:Strategy){
        this._strategys.push(strategy);
    }
    public getStrategy(pos: number): Strategy{
        return pos < this._strategys.length?this._strategys[pos]:null;
    }
    // </editor-fold>
}