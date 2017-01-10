/**
 *
 * @author jalheart
 */ 
import { CognitiveFunction } from '../metacore/CognitiveFunction';
import { ComputationalStrategy } from '../metacore/ComputationalStrategy';
import { Plan } from '../metacore/Plan';
import { WorkingMemory } from '../memory/WorkingMemory';
import { BasicCognitiveProcessingUnit} from './BasicCognitiveProcessingUnit';
import { Category} from './Category';

export class Planning extends CognitiveFunction{
    public processInformation(value?:any):Promise<any>{
        return this.processInformationComputationalStrategy(value);
    }
    private processInformationComputationalStrategy(value?: new (categories: Category[]) => ComputationalStrategy):Promise<any>{
        return new Promise((resolve)=>{
            WorkingMemory.instance.getBCPU().then((bcpu)=>{
                var categories: Category[] = bcpu.categorys;
                var algorithmStrategy: ComputationalStrategy = new value(categories);
                algorithmStrategy.run().then((plans)=>{//plans es un objeto que en cada atributo tiene el plan para cada categoria                    
                    bcpu.addPlans(plans);
                    WorkingMemory.instance.setBCPU(bcpu).then((resultBCPU)=>{                        
                        WorkingMemory.instance.updateMentalState("is_planned", (plans != null && Object.keys(plans).length > 0)).then((resultUMS)=>{
                            //FIXME Temporalmente se devuelven los planes, hay que arreglar que se pueda almacenar un objeto completo en la memoria, y se devuelvo un booleano true
                            resolve(plans);
                        });
                    });
                });
            });            
        });
    }
    public executePlans(pPlans?:any): Promise<any>{
        return new Promise((resolve)=>{            
            WorkingMemory.instance.getBCPU().then((bcpu)=>{
                var categories: Category[] = bcpu.categorys;
                var plans: any = pPlans ? pPlans:bcpu.plans;
                if (categories.length>0){
                    this.executePlan(plans, categories, 0).then((result)=>{
                        resolve(true);
                    })
                }else{
                    resolve(true);                    
                }
//                for (var category of categories) {
//                    plans[category.category].executePlan();                    
//                }            
            });
        });
    }
    private executePlan(plans: any, categories: Category[], pos: number):Promise<any>{
        return new Promise((resolve)=>{
            (<Plan>plans[categories[pos].category]).executePlan().then((result)=>{
                pos++;
                if (pos >= categories.length){
                    resolve(true);
                }else{
                    this.executePlan(plans, categories, pos).then((resultEP)=>{
                        resolve(true);
                    });
                }
            });
        });
    }
}