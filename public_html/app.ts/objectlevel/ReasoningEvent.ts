/**
 *
 * @author jalheart
 */
import { Event } from '../metacore/Event';
import { Profile } from '../metacore/Profile';
export class ReasoningEvent extends Event{
    private _profile:Profile;
    // <editor-fold defaultstate="collapsed" desc="GETs y SETs">
    /**
     * @return the profile
     */
    public get profile(): Profile{
        return this._profile;
    }

    /**
     * @param profile the profile to set
     */
    public set profile(profile: Profile) {
        this._profile = profile;
    }
    // </editor-fold>
}