/**
 *
 * @author jalheart
 */ 
import { CognitiveFunction } from '../metacore/CognitiveFunction';
import { WorkingMemory } from '../memory/WorkingMemory';
import { BasicCognitiveProcessingUnit} from './BasicCognitiveProcessingUnit';
import { Input} from './Input';

export class Perception extends CognitiveFunction{
//    private _perception:BasicCognitiveProcessingUnit;
    
    public processInformation(value: any): Promise<any>{
        return new Promise((resolve)=>{
            WorkingMemory.instance.getBCPU().then((bcpu)=>{
                bcpu.addInput(new Input(value["information"], value["type_sensor"]));
//                this.perception =bcpu;
                WorkingMemory.instance.updateMentalState("is_perceived", true);
                WorkingMemory.instance.setBCPU(bcpu).then((result)=>{
                    resolve(true);
                })
            });
        });
    }
}