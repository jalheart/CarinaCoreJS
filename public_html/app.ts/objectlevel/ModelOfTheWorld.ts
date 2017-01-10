/**
 * @author jalheart
 */
import { Goal} from '../metacore/Goal';
import { BasicMemoryUnity} from '../memory/BasicMemoryUnity';
import { WorkingMemory} from '../memory/WorkingMemory';
export class ModelOfTheWorld{
    private _mission:Goal;
    private _isCreated: boolean = false;
    // <editor-fold defaultstate="collapsed" desc="GETs y SETs">
    /**
     * @return the mission
     */
    public get mission(): Goal{
        return this._mission;
    }
    /**
     * @param mission the mission to set
     */
    public set mission(mission: Goal) {
        this._mission = mission;
    }
    /**
     * @return the is_created
     */
    public getStateIsCreated():Promise<boolean>{
        return new Promise((resolve,reject)=>{
            WorkingMemory.instance.retrieveInformation("is_created").then((result)=>{
                var isCreated: BasicMemoryUnity = result;
                resolve(isCreated!=null?isCreated.information:this._isCreated);                    
            });                
        });
    }
    /**
     * @param is_created the is_created to set
     */
    public set stateIsCreated(isCreated: boolean) {
        this._isCreated = isCreated;
    }
    // </editor-fold>    
}    