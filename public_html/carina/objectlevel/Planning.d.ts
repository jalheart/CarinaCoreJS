import { CognitiveFunction } from '../metacore/CognitiveFunction';
export declare class Planning extends CognitiveFunction {
    processInformation(value?: any): Promise<any>;
    private processInformationComputationalStrategy(value?);
    executePlans(pPlans?: any): Promise<any>;
    private executePlan(plans, categories, pos);
}
