System.register(["../metacore/RootElement"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RootElement_1, Input;
    return {
        setters: [
            function (RootElement_1_1) {
                RootElement_1 = RootElement_1_1;
            }
        ],
        execute: function () {
            Input = class Input extends RootElement_1.RootElement {
                constructor(information, type) {
                    super();
                    this.information = information ? information : null;
                    this.type = type ? type : null;
                }
                get information() {
                    return this._information;
                }
                set information(information) {
                    this._information = information;
                }
                get type() {
                    return this._type;
                }
                set type(type) {
                    this._type = type;
                }
                static fromJSON(jsonObject) {
                    var salida;
                    salida = new Input();
                    if (jsonObject._type)
                        salida.type = jsonObject['_type'];
                    if (jsonObject._information)
                        salida.information = jsonObject['_information'];
                    return salida;
                }
            };
            exports_1("Input", Input);
        }
    };
});
