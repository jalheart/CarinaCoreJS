System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var BasicMemoryUnity;
    return {
        setters: [],
        execute: function () {
            BasicMemoryUnity = class BasicMemoryUnity {
                constructor(cue, information) {
                    this.cue = cue;
                    this.information = information;
                }
                set cue(cue) {
                    this._cue = cue;
                }
                get cue() {
                    return this._cue;
                }
                set information(information) {
                    this._information = information;
                }
                get information() {
                    return this._information;
                }
                getInformation(c) {
                    return c.fromJSON(this._information);
                }
            };
            exports_1("BasicMemoryUnity", BasicMemoryUnity);
        }
    };
});
