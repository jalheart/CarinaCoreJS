import { Memory} from './Memory';
import { MemoryDriver} from './MemoryDriver';
export class LongTermMemory extends Memory{
    private static _instance:LongTermMemory =null;
    private constructor(driver:MemoryDriver) {
        super(driver);
    }
    public static init(driver:MemoryDriver){
        if(this._instance==null){
            this._instance   =new LongTermMemory(driver);
        }
    }
    public static get instance():LongTermMemory{
        return this._instance;
    }
}