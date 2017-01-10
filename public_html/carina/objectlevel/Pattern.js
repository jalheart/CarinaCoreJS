System.register(["../metacore/RootElement"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RootElement_1, Pattern;
    return {
        setters: [
            function (RootElement_1_1) {
                RootElement_1 = RootElement_1_1;
            }
        ],
        execute: function () {
            Pattern = class Pattern extends RootElement_1.RootElement {
                constructor(pattern) {
                    super();
                    this.pattern = pattern ? pattern : null;
                }
                get pattern() {
                    return this._pattern;
                }
                set pattern(pattern) {
                    this._pattern = pattern;
                }
                static fromJSON(jsonObject) {
                    var salida;
                    salida = new Pattern(jsonObject._pattern ? jsonObject._pattern : null);
                    return salida;
                }
            };
            exports_1("Pattern", Pattern);
        }
    };
});
