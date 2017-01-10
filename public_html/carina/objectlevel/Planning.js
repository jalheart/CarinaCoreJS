System.register(["../metacore/CognitiveFunction", "../memory/WorkingMemory"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CognitiveFunction_1, WorkingMemory_1, Planning;
    return {
        setters: [
            function (CognitiveFunction_1_1) {
                CognitiveFunction_1 = CognitiveFunction_1_1;
            },
            function (WorkingMemory_1_1) {
                WorkingMemory_1 = WorkingMemory_1_1;
            }
        ],
        execute: function () {
            Planning = class Planning extends CognitiveFunction_1.CognitiveFunction {
                processInformation(value) {
                    return this.processInformationComputationalStrategy(value);
                }
                processInformationComputationalStrategy(value) {
                    return new Promise((resolve) => {
                        WorkingMemory_1.WorkingMemory.instance.getBCPU().then((bcpu) => {
                            var categories = bcpu.categorys;
                            var algorithmStrategy = new value(categories);
                            algorithmStrategy.run().then((plans) => {
                                bcpu.addPlans(plans);
                                WorkingMemory_1.WorkingMemory.instance.setBCPU(bcpu).then((resultBCPU) => {
                                    WorkingMemory_1.WorkingMemory.instance.updateMentalState("is_planned", (plans != null && Object.keys(plans).length > 0)).then((resultUMS) => {
                                        resolve(plans);
                                    });
                                });
                            });
                        });
                    });
                }
                executePlans(pPlans) {
                    return new Promise((resolve) => {
                        WorkingMemory_1.WorkingMemory.instance.getBCPU().then((bcpu) => {
                            var categories = bcpu.categorys;
                            var plans = pPlans ? pPlans : bcpu.plans;
                            if (categories.length > 0) {
                                this.executePlan(plans, categories, 0).then((result) => {
                                    resolve(true);
                                });
                            }
                            else {
                                resolve(true);
                            }
                        });
                    });
                }
                executePlan(plans, categories, pos) {
                    return new Promise((resolve) => {
                        plans[categories[pos].category].executePlan().then((result) => {
                            pos++;
                            if (pos >= categories.length) {
                                resolve(true);
                            }
                            else {
                                this.executePlan(plans, categories, pos).then((resultEP) => {
                                    resolve(true);
                                });
                            }
                        });
                    });
                }
            };
            exports_1("Planning", Planning);
        }
    };
});
