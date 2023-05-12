<template>
  <q-card flat bordered>
    <q-item>
      <q-item-section avatar class="">
        <q-icon color="blue-7" name="payments" size="34px" />
      </q-item-section>

      <q-item-section>
        <div class="text-weight-bold text-blue-7">Pertumbuhan Uang</div>
      </q-item-section>
    </q-item>
    <q-card-section>
      <Doughnut :data="dataDoughnut" />
    </q-card-section>
  </q-card>
</template>

<script>
import { Doughnut } from "vue-chartjs";

export default {
  components: {
    Doughnut,
  },
  props: {
    // label : {
    //   type: Array,
    //   default: null
    // },
    // jumlah:{
    // 	type: Number,
    // 	default: 0
    // },
    // color: {
    //   type: Array,
    //   default: null,
    // },
  },
  data() {
    return {
      dataDoughnut: {
        labels: ["Penjualan", "Pembelian", "Pengeluaran"],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
            // backgroundColor: this.color,
            // data: this.jumlah,
            data: [40, 20, 80],
          },
        ],
      },
    };
  },
};
</script>
