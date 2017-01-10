System.register(["../metacore/CognitiveFunction", "../memory/WorkingMemory", "./Input"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CognitiveFunction_1, WorkingMemory_1, Input_1, Perception;
    return {
        setters: [
            function (CognitiveFunction_1_1) {
                CognitiveFunction_1 = CognitiveFunction_1_1;
            },
            function (WorkingMemory_1_1) {
                WorkingMemory_1 = WorkingMemory_1_1;
            },
            function (Input_1_1) {
                Input_1 = Input_1_1;
            }
        ],
        execute: function () {
            Perception = class Perception extends CognitiveFunction_1.CognitiveFunction {
                processInformation(value) {
                    return new Promise((resolve) => {
                        WorkingMemory_1.WorkingMemory.instance.getBCPU().then((bcpu) => {
                            bcpu.addInput(new Input_1.Input(value["information"], value["type_sensor"]));
                            WorkingMemory_1.WorkingMemory.instance.updateMentalState("is_perceived", true);
                            WorkingMemory_1.WorkingMemory.instance.setBCPU(bcpu).then((result) => {
                                resolve(true);
                            });
                        });
                    });
                }
            };
            exports_1("Perception", Perception);
        }
    };
});
