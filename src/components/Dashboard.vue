<script setup>
import { useAuth } from "@/Composables/useAuth.js";
import { getDatabase, ref as dbRef, onValue } from "firebase/database";
import { onMounted, ref } from "vue"
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import BarChart from '../components/BarChart.vue';

const { user} = useAuth()

const chartData = ref ({
    labels: [],
    datasets: [
        {
            label: 'Ingresos',
            backgroundColor: 'rgb(54, 162, 235)',
            data: []
        },
        {
            label: 'Gastos',
            backgroundColor: 'rgb(255, 99, 132)',
            data: []
        }
    ]
})

// inicializar la base de datos
const db = getDatabase();

// obtener los datos de la base de datos
const fetchData = (userUid) => {
    // obtener la referencia de la base de datos
    const transactionRef = dbRef(db, `transaction/${userUid}`);


    onValue(transactionRef, (snapshot) => {
        const data = snapshot.val();
        if(!data) return console.log("No hay datos");

        const labels = []
        const ingresos = []
        const gastos = []

        for (const key in data) {
            const { type, amount, date } = data[key]
            labels.push(new Date(date).toLocaleDateString());

            if (type === "ingresos") {
                ingresos.push(amount)
        } else if (type === "gastos") {
            gastos.push(amount)
          }
       }
       chartData.value.labels = labels 
       chartData.value.datasets[0].data = ingresos
       chartData.value.datasets[1].data = gastos
    })
    }
    onMounted(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const userUid = auth.currentUser.uid;
                fetchData(userUid);
            } else
            console.log("No hay usuario autenticado")
        })
    })



</script>




<template>
    <h1>Soy Dashboard</h1>
    <h2 v-if="user">Bienvenido, {{ user.displayName }}</h2>
    <div v-if="chartData && chartData.labels.length > 0">
        <BarChart :chartData="chartData" />
    
    </div>
</template>