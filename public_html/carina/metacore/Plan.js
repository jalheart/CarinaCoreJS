System.register(["./Element"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Element_1, Plan;
    return {
        setters: [
            function (Element_1_1) {
                Element_1 = Element_1_1;
            }
        ],
        execute: function () {
            Plan = class Plan extends Element_1.Element {
                constructor() {
                    super(...arguments);
                    this._actions = [];
                    this._currentAction = 0;
                }
                Plan() {
                    this._actions = [];
                }
                executePlan() {
                    return new Promise((resolve) => {
                        var currentAction;
                        if (this.actions.length <= 0)
                            resolve(true);
                        this.executeAction(0).then((result) => {
                            resolve(true);
                        });
                    });
                }
                executeAction(pos) {
                    return new Promise((resolve) => {
                        this.actions[pos].run().then((result) => {
                            if (this.actions[pos].stopPlan) {
                                if (this.actions.length > pos - 1) {
                                    pos = this.actions.length - 1;
                                    this.executeAction(pos).then((resultEP) => {
                                        resolve(true);
                                    });
                                }
                                else {
                                    resolve(true);
                                }
                            }
                            else {
                                pos++;
                                if (pos >= this.actions.length) {
                                    resolve(true);
                                }
                                else {
                                    this.executeAction(pos).then((resultEP) => {
                                        resolve(true);
                                    });
                                }
                            }
                        });
                    });
                }
                get actionsLength() {
                    return this._actions.length;
                }
                get actions() {
                    return this._actions;
                }
                set actions(actions) {
                    this._actions = actions;
                }
                addAction(action) {
                    this.actions.push(action);
                }
                get currentAction() {
                    return this._currentAction;
                }
                set currentAction(currentAction) {
                    this._currentAction = currentAction;
                }
                static fromJSON(plan) {
                    var planTmp = new Plan();
                    return planTmp;
                }
            };
            exports_1("Plan", Plan);
        }
    };
});
