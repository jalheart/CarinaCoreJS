import { FuntionalElement} from './FuntionalElement';
export abstract class Strategy extends FuntionalElement{
    abstract run(): Promise<any>;
}