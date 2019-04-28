<template>
    <v-container fluid>
        <v-layout align-center justify-center row>
            <v-stepper v-model="stepper">
                <v-stepper-header>
                    <v-stepper-step :complete="stepper > 1" step="1">Select Algorithm</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="stepper > 2" step="2">Equation Parameters</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="3">Simulation Parameters</v-stepper-step>
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

                        <v-btn flat :disabled=true>Cancel</v-btn>
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
                                :disabled="(this.start == null) || (this.timestamp == null) || (this.stop == null)"
                        >
                            Run
                        </v-btn>
                        <v-btn flat color="warning" @click="stepper = 2">Back</v-btn>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-layout>
        <v-container fluid>
            <v-layout v-if="table" align-center justify-center row>
                <v-card>
                    <v-card-title>{{radioGroup}}</v-card-title>
                    <v-card-text>
                        <v-data-table
                                :headers="headers"
                                :items="table"
                                align="left"
                                class="elevation-1"
                        >
                            <template v-slot:items="props">
                                <td class="text-xs-right">{{ props.item.i }}</td>
                                <td class="text-xs-right">{{ props.item.x }}</td>
                                <td class="text-xs-right">{{ props.item.h }}</td>
                                <td class="text-xs-right">{{ props.item.t }}</td>
                            </template>
                        </v-data-table>
                        <v-divider></v-divider>
                        <GChart
                                type="LineChart"
                                :data="chartData"
                                :options="chartOptions"
                                class="elevation-1"
                        >
                            >
                        </GChart>
                    </v-card-text>
                </v-card>
            </v-layout>
        </v-container>
    </v-container>
</template>

<script>
    import eulerForward from './methodsEF';
    import eulerBackward from './methodsEB';
    import {GChart} from "vue-google-charts";
    import heun from "./methodsHeun";

    export default {
        name: "Landing",
        data() {
            return {
                stepper: 0,
                radioGroup: "Euler Forward",
                availableAlgos: ["Euler Forward", "Euler Backward", "Heun"],
                inputA: null,
                inputB: null,
                start: null,
                stop: null,
                timestamp: null,
                table: null,
                headers: [{text: "i", value: "i"}, {text: "x", value: "x"},
                    {text: "h", value: "h"}, {text: "t", value: "t"}],
                labels: [],
                values: [],
                chartOptions: {
                    chart: {
                        hAxis: {
                            title: 'Time'
                        },
                        vAxis: {
                            title: 'X'
                        },
                        series: {
                            1: {curveType: 'function'}
                        }
                    }
                },
                chartData: []
            }
        },
        components: {
            GChart
        },
        methods: {
            runAlgo: function () {
                let chartData = [];
                chartData.push(["Time", "X"]);
                let methodToUse = null;
                if (this.radioGroup === "Euler Forward") {
                    methodToUse = eulerForward;
                } else if (this.radioGroup === "Euler Backward") {
                    methodToUse = eulerBackward;
                } else { // Huen
                    methodToUse = heun;
                }
                this.table = methodToUse(parseFloat(this.start), parseFloat(this.stop), parseFloat(this.timestamp),
                    parseFloat(this.inputA), parseFloat(this.inputB));
                this.table.forEach(function (node) {
                    chartData.push([node.t, node.x]);
                });
                this.chartData = chartData;
            }
        }
    }
</script>