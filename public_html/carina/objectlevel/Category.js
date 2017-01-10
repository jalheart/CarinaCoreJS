System.register(["../metacore/RootElement"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RootElement_1, Category;
    return {
        setters: [
            function (RootElement_1_1) {
                RootElement_1 = RootElement_1_1;
            }
        ],
        execute: function () {
            Category = class Category extends RootElement_1.RootElement {
                constructor(category) {
                    super();
                    this.category = category ? category : null;
                }
                get category() {
                    return this._category;
                }
                set category(category) {
                    this._category = category;
                }
                static fromJSON(jsonObject) {
                    var salida;
                    salida = new Category();
                    if (jsonObject._category)
                        salida.category = jsonObject._category;
                    return salida;
                }
            };
            exports_1("Category", Category);
        }
    };
});
