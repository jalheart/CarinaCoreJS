export abstract class RootElement {
    private _name: string;
    private _output: any;
    constructor(){}
    get name(): string{
        return this._name;
    }
    set name(name: string){
        this._name = name;
    }
    get output(): string{
        return this._output;
    }
    set output(output: string){
        this._output = output;
    }
}