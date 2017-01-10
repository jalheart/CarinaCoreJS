import { Element} from './Element';
export abstract class CognitiveFunction extends Element{
    public abstract processInformation(value: any): Promise<any>;
}