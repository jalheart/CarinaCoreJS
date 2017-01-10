/**
 *
 * @author jalheart
 */ 
import { Sensor } from '../metacore/Sensor';
export class MouseSensor extends Sensor{
    constructor(){
        super();
        this.type   ='mouse';
    }
}