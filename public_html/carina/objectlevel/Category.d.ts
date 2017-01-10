import { RootElement } from '../metacore/RootElement';
export declare class Category extends RootElement {
    private _category;
    constructor(category?: any);
    category: any;
    static fromJSON(jsonObject: any): Category;
}
