import { BasicMemoryUnity} from './BasicMemoryUnity';
export abstract class MemoryDriver{
    private _config:any;
    public constructor(config:any) {
        this.config =config;            
    }        
    public abstract init(): Promise<boolean>;
    public abstract storeInformation(information: BasicMemoryUnity): Promise<boolean>;
    public abstract retrieveInformation(cue:string):Promise<BasicMemoryUnity>;
    public abstract forgetInformation(cue: string): Promise<boolean>;
    // <editor-fold defaultstate="collapsed" desc="GETs y SETs">
    /**
     * @return the _config
     */
    public get config(): any {
        return this._config;
    }

    /**
     * @param _config the _config to set
     */
    public set config(config: any) {
        this._config = config;
    }
    // </editor-fold>
}