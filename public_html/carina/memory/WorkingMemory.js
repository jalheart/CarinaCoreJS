System.register(["./Memory", "../objectlevel/BasicCognitiveProcessingUnit", "../metacore/State", "./BasicMemoryUnity"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Memory_1, BasicCognitiveProcessingUnit_1, State_1, BasicMemoryUnity_1, WorkingMemory;
    return {
        setters: [
            function (Memory_1_1) {
                Memory_1 = Memory_1_1;
            },
            function (BasicCognitiveProcessingUnit_1_1) {
                BasicCognitiveProcessingUnit_1 = BasicCognitiveProcessingUnit_1_1;
            },
            function (State_1_1) {
                State_1 = State_1_1;
            },
            function (BasicMemoryUnity_1_1) {
                BasicMemoryUnity_1 = BasicMemoryUnity_1_1;
            }
        ],
        execute: function () {
            WorkingMemory = class WorkingMemory extends Memory_1.Memory {
                constructor(driver) {
                    super(driver);
                    this._mentalStates = [];
                    this.getBCPU().then((result) => {
                        if (result != null) {
                            this.bcpu = result;
                        }
                    });
                    this.driver.retrieveInformation("model_of_the_world").then((result) => {
                        if (result != null) {
                            this.modelOfTheWorld = result.information;
                        }
                    });
                    this.driver.retrieveInformation("profiles").then((result) => {
                        if (result != null) {
                            for (let profile of result.information) {
                                this.setProfiles(profile, true);
                            }
                        }
                    });
                    this.driver.retrieveInformation("mental_state").then((result) => {
                        if (result != null) {
                            for (let ms of result.information) {
                                this.setMentalState(ms);
                            }
                        }
                    });
                }
                static init(driver) {
                    if (this._instance == null) {
                        this._instance = new WorkingMemory(driver);
                    }
                }
                get bcpu() {
                    return this._bcpu;
                }
                getBCPU() {
                    return new Promise((resolve) => {
                        this.driver.retrieveInformation('bcpu').then((result) => {
                            if (result != null)
                                resolve(BasicCognitiveProcessingUnit_1.BasicCognitiveProcessingUnit.fromJSON(result.information));
                            else
                                resolve(null);
                        });
                    });
                }
                set bcpu(bcpu) {
                    this._bcpu = bcpu;
                    this.syncBCPU(bcpu);
                }
                setBCPU(bcpu) {
                    return new Promise((resolve) => {
                        this._bcpu = bcpu;
                        this.syncBCPU(bcpu).then((result) => {
                            resolve(true);
                        });
                    });
                }
                get modelOfTheWorld() {
                    return this._modelOfTheWorld;
                }
                getModelOfTheWorld(classType) {
                    return new Promise((resolve) => {
                        this.driver.retrieveInformation('model_of_the_world').then((motw) => {
                            resolve(classType.fromJSON(motw.information));
                        });
                    });
                }
                set modelOfTheWorld(model_of_the_world) {
                    this._modelOfTheWorld = model_of_the_world;
                    this.syncModelOfTheWorld(model_of_the_world);
                }
                getProfile(id) {
                    return this._profiles[id];
                }
                get profiles() {
                    return this._profiles;
                }
                setProfiles(profile, s) {
                    this.profiles.push(profile);
                    if (!s) {
                        this.driver.storeInformation(new BasicMemoryUnity_1.BasicMemoryUnity("profiles", this.profiles));
                    }
                }
                get mentalStates() {
                    return this._mentalStates;
                }
                setMentalStates(ms) {
                    return new Promise((resolve) => {
                        this._mentalStates = ms;
                        this.driver.storeInformation(new BasicMemoryUnity_1.BasicMemoryUnity("mental_state", this.mentalStates)).then((result) => {
                            resolve(result);
                        });
                    });
                }
                getMentalState(state) {
                    for (let s of this.mentalStates) {
                        if (s.name === state) {
                            return s;
                        }
                    }
                    return null;
                }
                updateMentalState(name, value) {
                    return new Promise((resolve) => {
                        var pos = this.getMentalStatePos(name);
                        if (pos >= 0) {
                            var state = this._mentalStates[pos];
                            state.value = value;
                            this.setMentalState(state).then((result) => {
                                resolve(result);
                            });
                        }
                        else {
                            var state = new State_1.State(name, value);
                            this.setMentalState(state).then((result) => {
                                resolve(result);
                            });
                        }
                    });
                }
                setMentalState(ms, s) {
                    return new Promise((resolve) => {
                        var pos = this.getMentalStatePos(ms.name);
                        if (pos == -1) {
                            this._mentalStates.push(ms);
                        }
                        else {
                            this._mentalStates[pos].value = ms.value;
                        }
                        if (!s) {
                            this.driver.storeInformation(new BasicMemoryUnity_1.BasicMemoryUnity("mental_state", this.mentalStates)).then((result) => {
                                resolve(result);
                            });
                        }
                    });
                }
                static get instance() {
                    return this._instance;
                }
                getMentalStatePos(name) {
                    for (let i = 0; i < this._mentalStates.length; i++) {
                        if (this._mentalStates[i].name === name)
                            return i;
                    }
                    return -1;
                }
                syncBCPU(value) {
                    return new Promise((resolve) => {
                        this.driver.storeInformation(new BasicMemoryUnity_1.BasicMemoryUnity("bcpu", value)).then((result) => {
                            resolve(true);
                        });
                    });
                }
                syncModelOfTheWorld(value) {
                    return new Promise((resolve) => {
                        this.driver.storeInformation(new BasicMemoryUnity_1.BasicMemoryUnity("model_of_the_world", value)).then((result) => {
                            resolve(true);
                        });
                    });
                }
            };
            exports_1("WorkingMemory", WorkingMemory);
        }
    };
});
