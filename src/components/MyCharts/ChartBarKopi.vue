<template>
  <q-card flat bordered>
    <q-item>
      <q-item-section avatar class="">
        <q-icon color="brown-4" name="fas fa-chart-line" size="34px" />
      </q-item-section>

      <q-item-section>
        <div class="text-weight-bold text-brown">Grafik Pertumbuhan Usaha</div>
      </q-item-section>
    </q-item>
    <q-card-section>
      <Bar :data="chartBarKopi" :height="137" />
    </q-card-section>
  </q-card>
</template>

<script>
import { Bar } from "vue-chartjs";

export default {
  components: {
    Bar,
  },
  // props: {
  //   totalAkteYa: {
  //     type: Number,
  //     default: 0,
  //   },
  //   totalAkteTidak: {
  //     type: Number,
  //     default: 0,
  //   },
  //   totalEktpYa: {
  //     type: Number,
  //     default: 0,
  //   },
  //   totalEktpTidak: {
  //     type: Number,
  //     default: 0,
  //   },
  // },
  data() {
    return {
      chartBarKopi: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Okt",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Data Penjualan",
            backgroundColor: ["#304FFE", "#ef6445", "#304FF1"],
            borderRadius: 6,
            data: [30, 90, 50, 70, 30, 90, 50, 70, 30, 90, 50, 70],
            maxBarThickness: 30,
          },
        ],
      },
    };
  },
};
</script>
