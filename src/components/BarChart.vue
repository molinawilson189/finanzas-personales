<script setup>
import { Bar} from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
    chartData: {
        type: Object,
        required: true}
})

console.log(props.chartData)
</script>


<template>
    <h1>Soy BarChart</h1>
    <Bar :data="chartData" />
</template>