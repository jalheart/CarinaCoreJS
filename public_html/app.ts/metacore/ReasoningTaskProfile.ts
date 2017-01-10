import { Profile} from './Profile';
import { Field } from './Field';
export class ReasoningTaskProfile extends Profile{
    private _fields: Field[];
    public ReasoningTaskProfile(fields:Field[]) {
        this._fields  =[];
        for (let field of fields){
            this.setField(field.name, field.value);
        }
    }
    public setField(name: string, value:any){
        this._fields.push(new Field(name, value));
    }
}