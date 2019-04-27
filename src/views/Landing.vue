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
            <v-layout v-if="table" align-center justify-center row>
                <v-card>
                    <v-card-title>{{radioGroup}}</v-card-title>
                    <v-card-text>
                        <v-data-table
                                :headers="headers"
                                :items="table"
                                class="elevation-1"
                        >
                            <template v-slot:items="props">
                                <td class="text-xs-right">{{ props.item.i }}</td>
                                <td class="text-xs-right">{{ props.item.x }}</td>
                                <td class="text-xs-right">{{ props.item.h }}</td>
                                <td class="text-xs-right">{{ props.item.t }}</td>
                            </template>
                        </v-data-table>
                        <!--<v-sheet
                                class="v-sheet&#45;&#45;offset mx-auto"
                                color="cyan"
                                elevation="12"
                                max-width="calc(100% - 32px)"
                        >
                            <v-sparkline
                                    :labels="labels"
                                    :value="values"
                                    color="white"
                                    line-width="2"
                                    padding="16"
                            ></v-sparkline>
                        </v-sheet>-->
                        <GChart
                            type="LineChart"
                            :data="chartData"
                            :options="chartOptions"
                            >
                        </GChart>
                    </v-card-text>
                </v-card>
            </v-layout>
        </v-container>
    </v-container>
</template>

<script>
    import eulerForward from './methods';
    import {GChart} from "vue-google-charts";

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
                this.table = eulerForward(parseFloat(this.start), parseFloat(this.stop), parseFloat(this.timestamp),
                    parseFloat(this.inputA), parseFloat(this.inputB));
                let chartData = [];
                chartData.push(["Time", "X"]);
                this.table.forEach(function (node) {
                    chartData.push([node.t, node.x]);
                });
                this.chartData = chartData;
            }
        }
    } </script>