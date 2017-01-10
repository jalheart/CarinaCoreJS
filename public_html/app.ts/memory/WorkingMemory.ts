/**
 *
 * @author jalheart
 */
import { Memory} from './Memory';
import { BasicCognitiveProcessingUnit } from '../objectlevel/BasicCognitiveProcessingUnit';
import { Profile} from '../metacore/Profile';
import { State} from '../metacore/State';
import { ModelOfTheWorld} from '../objectlevel/ModelOfTheWorld';
import { MemoryDriver} from './MemoryDriver';
import { BasicMemoryUnity} from './BasicMemoryUnity';
export class WorkingMemory extends Memory{
    private static _instance:WorkingMemory;
    private _bcpu   :BasicCognitiveProcessingUnit;
    private _modelOfTheWorld :ModelOfTheWorld ;
    private _profiles: Profile[];
    private _mentalStates: State[]  =[];
    private constructor(driver: MemoryDriver) {
        super(driver);
        this.getBCPU().then((result)=>{            
            if (result!=null){
                this.bcpu = result;
            }
        });
        this.driver.retrieveInformation("model_of_the_world").then((result)=>{                
            if (result!=null){
                this.modelOfTheWorld = result.information;
            }                
        })

        this.driver.retrieveInformation("profiles").then((result)=>{                
            if (result!=null){
                for (let profile of result.information){
                    this.setProfiles(profile,true);                    
                }                
            }
        })

        this.driver.retrieveInformation("mental_state").then((result)=>{
            if (result!=null){
                for (let ms of (result.information as State[])){
                    this.setMentalState(ms);
                }                
            }                
        })

    }    
    public static init(driver:MemoryDriver){
        if(this._instance==null){
            this._instance   =new WorkingMemory(driver);
        }
    }
    // <editor-fold defaultstate="collapsed" desc="GETs y SETs">
    /**
     * @return the bcpu
     */
    get bcpu(): BasicCognitiveProcessingUnit{
        return this._bcpu;
    }
    public getBCPU(): Promise<BasicCognitiveProcessingUnit>{
        return new Promise((resolve)=>{
            this.driver.retrieveInformation('bcpu').then((result)=>{
                if(result!=null)
                    resolve(BasicCognitiveProcessingUnit.fromJSON(result.information))
                else
                    resolve(null);                    
            });
        });
    }
    /**
     * @param bcpu the bcpu to set
     */
    set bcpu(bcpu:BasicCognitiveProcessingUnit) {
        this._bcpu = bcpu;
        this.syncBCPU(bcpu);
    }
    public setBCPU(bcpu:BasicCognitiveProcessingUnit):Promise<boolean>{
        return new Promise((resolve)=>{
            this._bcpu = bcpu;
            this.syncBCPU(bcpu).then((result)=>{
                resolve(true);                
            });
        });
    }
    /**
     * @return the model_of_the_world
     */
    public get modelOfTheWorld():ModelOfTheWorld {
        return this._modelOfTheWorld;
    }
    public getModelOfTheWorld(classType:any):Promise<ModelOfTheWorld>{
        return new Promise((resolve)=>{
            this.driver.retrieveInformation('model_of_the_world').then((motw)=>{
                resolve(classType.fromJSON(motw.information));
            });
        });
    }
    /**
     * @param model_of_the_world the model_of_the_world to set
     */
    public set modelOfTheWorld(model_of_the_world:ModelOfTheWorld) {        
        this._modelOfTheWorld = model_of_the_world;
        this.syncModelOfTheWorld(model_of_the_world);
    }
    /**
     * @return the profiles
     */
    public getProfile(id:number):Profile {        
        return this._profiles[id];
    }
    public get profiles(): Profile[]{
        return this._profiles;
    }

    /**
     * @param profiles the profiles to set
     */
    public setProfiles(profile: Profile, s?: boolean) {
        this.profiles.push(profile);
        if(!s){
            this.driver.storeInformation(new BasicMemoryUnity("profiles", this.profiles));
        }            
    }
    /**
     * @return the mental_states
     */
    public get mentalStates(): State[]{
        return this._mentalStates;
    }
    public setMentalStates(ms: State[]): Promise<any>{
        return new Promise((resolve)=>{
            this._mentalStates   =ms;
            this.driver.storeInformation(new BasicMemoryUnity("mental_state", this.mentalStates)).then((result)=>{
                resolve(result);
            });
        });
    }
    public getMentalState(state: string): State{
        for (let s of this.mentalStates){
            if (s.name === state){
                return s;
            }
        }
        return null;
    }
    public updateMentalState(name: string, value: boolean): Promise<boolean>{        
        return new Promise((resolve)=>{
            var pos: number = this.getMentalStatePos(name);
            if (pos>=0){
                var state: State = this._mentalStates[pos];
                state.value =value;
                this.setMentalState(state).then((result)=>{
                    resolve(result);
                });
            }else{
                var state: State = new State(name, value);
                this.setMentalState(state).then((result)=>{
                    resolve(result);
                });
            }
        });
    }
    /**
     * @param mental_state the mental_state to set
     */
    public setMentalState(ms: State, s?: boolean): Promise<boolean>{
        return new Promise((resolve)=>{
            var pos = this.getMentalStatePos(ms.name);
            if(pos==-1){
                this._mentalStates.push(ms);
            }else{
                this._mentalStates[pos].value = ms.value;
            }
            if(!s){
                this.driver.storeInformation(new BasicMemoryUnity("mental_state", this.mentalStates)).then((result)=>{
                    resolve(result);
                });
            }                
        });
    }
    /**
     * Accesor para singleton
     * @return WorkingMemory
     */
    public static get instance():WorkingMemory{
        return this._instance;
    }
    public getMentalStatePos(name: string): number{
        for (let i = 0; i < this._mentalStates.length; i++) {
            if (this._mentalStates[i].name === name) return i;
        }
        return -1;
    }
    // </editor-fold>

    public syncBCPU(value: BasicCognitiveProcessingUnit): Promise<boolean>{
        return new Promise((resolve)=>{
            this.driver.storeInformation(new BasicMemoryUnity("bcpu",value)).then((result)=>{
                resolve(true);
            });
        });
    }
    public syncModelOfTheWorld(value: ModelOfTheWorld): Promise<boolean>{
        return new Promise((resolve)=>{            
            this.driver.storeInformation(new BasicMemoryUnity("model_of_the_world", value)).then((result)=>{
                resolve(true) ;
            });
        });
    }
}