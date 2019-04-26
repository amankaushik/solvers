<template>
    <v-container fluid>
        <v-layout align-center justify-center row>
            <v-stepper v-model="stepper">
                <v-stepper-header>
                    <v-stepper-step :complete="stepper > 1" step="1">Select Algorithm</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="stepper > 2" step="2">Name of step 2</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="3">Name of step 3</v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-container fluid px-0>
                            <v-radio-group v-model="radioGroup">
                                <v-radio
                                        v-for="algo in availableAlgos"
                                        :key="algo"
                                        :label="algo"
                                        :value="algo"
                                        color="success"
                                ></v-radio>
                            </v-radio-group>
                        </v-container>
                        <v-btn
                                color="primary"
                                @click="stepper = 2"
                        >
                            Continue
                        </v-btn>

                        <v-btn flat disabled="true">Cancel</v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <v-layout row wrap>
                            <v-flex>
                                <v-text-field v-model="inputA"
                                              label="A"
                                              placeholder="0"
                                              outline
                                ></v-text-field>
                                <v-text-field v-model="inputB"
                                              label="B"
                                              placeholder="0"
                                              outline
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-btn
                                color="primary"
                                @click="stepper = 3"
                                :disabled="(inputA == null) || (inputB == null)"
                        >
                            Continue
                        </v-btn>

                        <v-btn flat color="warning" @click="stepper = 1">Back</v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <v-layout row wrap>
                            <v-flex>
                                <v-text-field v-model="start"
                                              label="start"
                                              placeholder="0.0"
                                              outline
                                ></v-text-field>
                                <v-text-field v-model="timestamp"
                                              label="h"
                                              placeholder="0.0"
                                              outline
                                ></v-text-field>
                                <v-text-field v-model="stop"
                                              label="stop"
                                              placeholder="0.0"
                                              outline
                                ></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-btn
                                color="primary"
                                @click="runAlgo()"
                                :disabled="(start == null) || (timestamp == null) || (stop == null)"
                        >
                            Run
                        </v-btn>
                        <v-btn flat color="warning" @click="stepper = 2">Back</v-btn>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-layout>
        <v-container fluid>
            <v-layout v-if="output" align-center justify-center row>
                <v-card>
                    <v-card-title>{{radioGroup}}</v-card-title>
                    <v-card-text>{{output}}</v-card-text>
                </v-card>
            </v-layout>
        </v-container>
    </v-container>
</template>

<script>
    export default {
        name: "Landing",
        data() {
            return {
                stepper: 0,
                radioGroup: "Euler Forward",
                availableAlgos: ["Euler Forward", "Euler Backwards", "Heun"],
                inputA: null,
                inputB: null,
                start: null,
                stop: null,
                timestamp: null,
                output: null
            }
        },
        methods: {
            runAlgo: function () {
                this.output = "Hello";
            }
        }
    }
</script>