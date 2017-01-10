import { MemoryDriver} from './MemoryDriver';
import { BasicMemoryUnity} from './BasicMemoryUnity';
export abstract class Memory{
    private _driver: MemoryDriver = null;
    public constructor(driver: MemoryDriver){
        this._driver    =driver;

    }
    /**
     * @param information type MemoryInformation
     */
    public storeInformation(information: BasicMemoryUnity): Promise<boolean>{
        return this.driver.storeInformation(information);
    }
    public retrieveInformation(cue: string):Promise<BasicMemoryUnity>{
        return this.driver.retrieveInformation(cue);
    }
    public forgetInformation(cue: string){
        this.driver.forgetInformation(cue);
    }

    /**
     * @return the _driver
     */
    public get driver():MemoryDriver {
        return this._driver;
    }

    /**
     * @param _driver the _driver to set
     */
    public set driver(driver:MemoryDriver ) {
        this._driver = driver;
    }
}