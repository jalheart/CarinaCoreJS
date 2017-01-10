/**
 *
 * @author jalheart
 */ 
import { CognitiveFunction } from '../metacore/CognitiveFunction';
import { WorkingMemory } from '../memory/WorkingMemory';
import { BasicMemoryUnity } from '../memory/BasicMemoryUnity';
import { LongTermMemory } from '../memory/LongTermMemory';
import { PerceptualMemory } from '../memory/PerceptualMemory';
import { BasicCognitiveProcessingUnit} from './BasicCognitiveProcessingUnit';
import { Input} from './Input';
import { Pattern} from './Pattern';
    
export class Recognition extends CognitiveFunction{
    public processInformation(value?:any):Promise<any> {
        return this.processInformationComputationalStrategy(value);
    }
    public processInformationComputationalStrategy(value?:any): Promise<boolean>{
        return new Promise((resolve,reject)=>{
            var workingMemory:WorkingMemory        =WorkingMemory.instance;
            var bcpu: BasicCognitiveProcessingUnit = workingMemory.bcpu;
            var inputs: {} = bcpu.inputs;            
            this.checkText().then((result)=>{
                /*
                Constructor<?> constructor  =value.getConstructor(Object.class);
                ComputationalStrategy   algorithmStrategy   =(ComputationalStrategy)constructor.newInstance(((BasicMemoryUnity)information).information);
                Boolean recognition   =(Boolean)algorithmStrategy.run();
                */
                //TODO Aquí se debe escoger que tipo de reconocimiento se hace depeniento del tipo de sensor o del tipo de dato registrado en el input            
                var recognition: boolean = result;
                var information:any;
                var data:any={};
                var keys: string[] = Object.keys(inputs);
                for (let key in inputs) {
                    information = (<Input>inputs[key]).information;
                    data.value   =information;
                    data.recognized=recognition;
                }
                var mi:BasicMemoryUnity  =new BasicMemoryUnity("recognition_data", data);
                PerceptualMemory.instance.storeInformation(mi).then((result)=>{
                    bcpu.addPattern(recognition);
                    workingMemory.setBCPU(bcpu).then((result)=>{
                        resolve(recognition);                        
                    });
                });
            });                         
        });
    }
    private checkText(): Promise<boolean>{
        return new Promise((resolve,reject)=>{
            WorkingMemory.instance.getBCPU().then((bcpu)=>{
                var inputs: any = bcpu.inputs;    
                LongTermMemory.instance.retrieveInformation("patterns").then((result)=>{
                    var patterns: any[] = result.information;                    
                    //Se verifica que el valor ingresado corresponda con algun patron                    
                    for (let key in inputs) {
                        for (var pattern of patterns) {
                            var strPattern: string = pattern._pattern;
                            var strInfo: string      =inputs[key].information;
                            var regExp: RegExp = new RegExp(strPattern);                            
                            if (regExp.test(strInfo)){
                                resolve(true);
                            }
                        }
                    }
                    resolve(false);
                });
            });
        });
    }
}