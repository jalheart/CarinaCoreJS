/**
 *
 * @author jalheart
 */ 
import { CognitiveFunction } from '../metacore/CognitiveFunction';
import { ComputationalStrategy } from '../metacore/ComputationalStrategy';
import { WorkingMemory } from '../memory/WorkingMemory';
import { BasicCognitiveProcessingUnit} from './BasicCognitiveProcessingUnit';
import { Category} from './Category';
import { LongTermMemory} from '../memory/LongTermMemory';
import { BasicMemoryUnity} from '../memory/BasicMemoryUnity';

export class Categorization extends CognitiveFunction{
    public processInformation(value?:any):Promise<any>{
        return this.processInformationComputationalStrategy(value);
    }
    public processInformationComputationalStrategy(value?: new (categories: Category[]) => ComputationalStrategy):Promise<any>{
        var workingMemory:WorkingMemory             =WorkingMemory.instance;
        var bcpu: BasicCognitiveProcessingUnit = workingMemory.bcpu;
        return new Promise((resolve)=>{
            this.getCategories().then((result)=>{
                var categories: Category[] = result;
                var algorithmStrategy: ComputationalStrategy = new value(categories);
                algorithmStrategy.run().then((categorization)=>{
                    bcpu.addCategories(categorization);
                    workingMemory.setBCPU(bcpu).then((result)=>{
                        workingMemory.updateMentalState("is_categorized", (categorization != null && categorization.length>0));
                        resolve(categorization != null && categorization.length>0);
                    });
                });
            });                          
        });
    }
    public getCategories():Promise<Category[]>{
        return new Promise((resolve,reject)=>{
            LongTermMemory.instance.retrieveInformation("categories").then((result)=>{
                var categories: Category[]  =[];
                if (result){
                    for (let category of result.information){
                        categories.push(Category.fromJSON(category));
                    }
                    resolve(categories);
                }else{
                    resolve(null);
                }
            });                
        });            
    }
}