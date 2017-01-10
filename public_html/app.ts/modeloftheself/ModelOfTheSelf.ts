/**
 *
 * @author jalheart
 */ 
import { Profile } from '../metacore/Profile';
import { Event } from '../metacore/Event';
import { CognitiveFunction } from '../metacore/CognitiveFunction';
export class ModelOfTheSelf{
    private _profiles: Profile[];
    private _events: Event[];
    private _knownCognitiveFunctions:CognitiveFunction[];
    public static _modelOfTheSelf:ModelOfTheSelf;
    private constructorf(){
    }
    public static get modelOfTheSelf():ModelOfTheSelf{
        if(this._modelOfTheSelf==null){
            this._modelOfTheSelf =new ModelOfTheSelf();
        }
        return this._modelOfTheSelf;
    }
    // <editor-fold defaultstate="collapsed" desc="GETs y SETs">
    /**
     * @return the profiles
     */
    public get profiles(): Profile[]{
        return this._profiles;
    }

    /**
     * @param profiles the profiles to set
     */
    public set profiles(profiles: Profile[]) {
        this._profiles = profiles;
    }
    /**
     * @return the profile
     */
    public getProfile(i: number): Profile{
        return this._profiles[i];
    }
    /**
     * @param profiles the profile to set
     */
    public addProfile(profile: Profile, i: number) {
        if (this.profiles.length<i){
            this.profiles.push(profile);
        }else{
            this.profiles[i]= profile;
        }
    }
    /**
     * @return the events
     */
    public get events(): Event[]{
        return this._events;
    }

    /**
     * @param events the events to set
     */
    public set events(events: Event[]) {
        this._events = events;
    }
    /**
     * @return the event
     */
    public getEvent(i: number): Event{
        return this._events[i];
    }
    /**
     * @param event the event to set
     */
    public addEvent(event: Event, i: number) {
        if (this._events.length<i){
            this.events.push(event);
        }else{
            this.events[i]= event;
        }
    }
    /**
     * @return the knownCognitiveFunctions
     */
    public get knownCognitiveFunctions(): CognitiveFunction[]{
        if (this._knownCognitiveFunctions==null){
            this._knownCognitiveFunctions =[];
        }
        return this._knownCognitiveFunctions;
    }
// </editor-fold>
}