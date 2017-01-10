export class BasicMemoryUnity{
    private _cue: string;
    private _information:any;    
    public constructor(cue?: string, information?: any) {
        this.cue    =cue;
        this.information=information;
    }
    public set cue(cue:string){
        this._cue = cue;
    }
    public get cue(): string{
        return this._cue;
    }
    public set information(information: any){
        this._information = information;
    }
    public get information():any{
        return this._information;
    }
    public getInformation(c: any):any{
        return c.fromJSON(this._information);
    }
}