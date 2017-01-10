import { Element} from './Element';
export class Event extends Element{    
    constructor(name: string) {
        super();
        this.name   =name;
    }
}