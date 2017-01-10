import { RootElement } from '../metacore/RootElement';
export declare class Input extends RootElement {
    private _information;
    private _type;
    constructor(information?: any, type?: string);
    information: any;
    type: string;
    static fromJSON(jsonObject: any): Input;
}
