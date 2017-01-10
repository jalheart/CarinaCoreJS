System.register(["../metacore/RootElement", "./Input", "./Pattern", "./Category", "../metacore/Plan"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RootElement_1, Input_1, Pattern_1, Category_1, Plan_1, BasicCognitiveProcessingUnit;
    return {
        setters: [
            function (RootElement_1_1) {
                RootElement_1 = RootElement_1_1;
            },
            function (Input_1_1) {
                Input_1 = Input_1_1;
            },
            function (Pattern_1_1) {
                Pattern_1 = Pattern_1_1;
            },
            function (Category_1_1) {
                Category_1 = Category_1_1;
            },
            function (Plan_1_1) {
                Plan_1 = Plan_1_1;
            }
        ],
        execute: function () {
            BasicCognitiveProcessingUnit = class BasicCognitiveProcessingUnit extends RootElement_1.RootElement {
                constructor() {
                    super(...arguments);
                    this._inputs = {};
                }
                addInput(input, typeSensor) {
                    if (input instanceof Input_1.Input) {
                        this.input = input;
                    }
                    else {
                        var newInput = new Input_1.Input();
                        newInput.information = input;
                        newInput.type = typeSensor;
                        this.input = newInput;
                    }
                }
                addPattern(pattern) {
                    var newPattern = new Pattern_1.Pattern(pattern);
                    this.pattern = newPattern;
                }
                addCategories(categories) {
                    if (categories != null) {
                        var categorysTemp = [];
                        var newCategory;
                        for (var category of categories) {
                            newCategory = new Category_1.Category();
                            newCategory.category = category;
                            categorysTemp.push(newCategory);
                        }
                        this.categorys = categorysTemp;
                    }
                }
                addPlans(plans) {
                    this._plans = plans;
                }
                get inputs() {
                    return this._inputs;
                }
                getInput(type) {
                    return this._inputs == null ? null : this._inputs[type];
                }
                set input(input) {
                    this._inputs = {};
                    this._inputs[input.type] = input;
                }
                set inputs(inputs) {
                    this._inputs = inputs;
                }
                get pattern() {
                    return this._pattern;
                }
                set pattern(pattern) {
                    this._pattern = pattern;
                }
                get categorys() {
                    return this._categorys;
                }
                set categorys(categorys) {
                    this._categorys = categorys;
                }
                get plans() {
                    return this._plans;
                }
                set plans(plans) {
                    this._plans = plans;
                }
                get goal() {
                    return this._goal;
                }
                set goal(goal) {
                    this._goal = goal;
                }
                static fromJSON(jsonObject) {
                    var salida;
                    salida = new BasicCognitiveProcessingUnit();
                    if (jsonObject._name)
                        salida.name = jsonObject['_name'];
                    if (jsonObject._pattern)
                        salida.pattern = Pattern_1.Pattern.fromJSON(jsonObject._pattern);
                    if (jsonObject._inputs)
                        salida.inputs = BasicCognitiveProcessingUnit.inputsFromJSON(jsonObject._inputs);
                    if (jsonObject._categorys)
                        salida.categorys = BasicCognitiveProcessingUnit.categoriesFromJSON(jsonObject._categorys);
                    if (jsonObject._plans)
                        salida.plans = BasicCognitiveProcessingUnit.plansFromJSON(jsonObject._plans);
                    return salida;
                }
                static inputsFromJSON(inputs) {
                    var salida = {};
                    for (let tipo in inputs)
                        salida[tipo] = Input_1.Input.fromJSON(inputs[tipo]);
                    return salida;
                }
                static categoriesFromJSON(categories) {
                    var salida = [];
                    for (let category of categories)
                        salida.push(Category_1.Category.fromJSON(category));
                    return salida;
                }
                static plansFromJSON(plans) {
                    var salida = [];
                    for (let plan in plans)
                        salida.push(Plan_1.Plan.fromJSON(plans[plan]));
                    return salida;
                }
            };
            exports_1("BasicCognitiveProcessingUnit", BasicCognitiveProcessingUnit);
        }
    };
});
