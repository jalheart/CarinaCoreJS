import { Memory } from './Memory';
import { BasicCognitiveProcessingUnit } from '../objectlevel/BasicCognitiveProcessingUnit';
import { Profile } from '../metacore/Profile';
import { State } from '../metacore/State';
import { ModelOfTheWorld } from '../objectlevel/ModelOfTheWorld';
import { MemoryDriver } from './MemoryDriver';
export declare class WorkingMemory extends Memory {
    private static _instance;
    private _bcpu;
    private _modelOfTheWorld;
    private _profiles;
    private _mentalStates;
    private constructor(driver);
    static init(driver: MemoryDriver): void;
    bcpu: BasicCognitiveProcessingUnit;
    getBCPU(): Promise<BasicCognitiveProcessingUnit>;
    setBCPU(bcpu: BasicCognitiveProcessingUnit): Promise<boolean>;
    modelOfTheWorld: ModelOfTheWorld;
    getModelOfTheWorld(classType: any): Promise<ModelOfTheWorld>;
    getProfile(id: number): Profile;
    readonly profiles: Profile[];
    setProfiles(profile: Profile, s?: boolean): void;
    readonly mentalStates: State[];
    setMentalStates(ms: State[]): Promise<any>;
    getMentalState(state: string): State;
    updateMentalState(name: string, value: boolean): Promise<boolean>;
    setMentalState(ms: State, s?: boolean): Promise<boolean>;
    static readonly instance: WorkingMemory;
    getMentalStatePos(name: string): number;
    syncBCPU(value: BasicCognitiveProcessingUnit): Promise<boolean>;
    syncModelOfTheWorld(value: ModelOfTheWorld): Promise<boolean>;
}
