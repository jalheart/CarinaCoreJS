import { Memory} from './Memory';
import { MemoryDriver} from './MemoryDriver';
export class PerceptualMemory extends Memory{    
    private static _instance    :PerceptualMemory =null;    
    private constructor(driver:MemoryDriver) {
        super(driver);
    }
    public static init(driver:MemoryDriver){
        if(this._instance==null){
            this._instance   =new PerceptualMemory(driver);
        }
    }
    public static get instance():PerceptualMemory{
        return this._instance;
    }
}