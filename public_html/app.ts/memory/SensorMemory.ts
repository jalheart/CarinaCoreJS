import { Memory} from './Memory';
import { MemoryDriver} from './MemoryDriver';
export class SensorMemory extends  Memory{
    private static _instance:SensorMemory;
    private constructor(driver:MemoryDriver) {
        super(driver);
    }
    public static init(driver:MemoryDriver){
        if(this._instance==null){
            this._instance   =new SensorMemory(driver);
        }
    }
    public static get instance():SensorMemory{
        return this._instance;
    }
}