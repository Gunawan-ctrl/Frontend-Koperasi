<template>
  <q-page class="bg-brown-1">
    <div class="q-pa-md">
      <q-card class="q-pa-md">
        <q-breadcrumbs separator="---" class="text-brown" active-color="black">
          <q-breadcrumbs-el icon="inbox" label="Dashboard" />
        </q-breadcrumbs>
      </q-card>

      <div class="row items-center q-col-gutter-md q-pt-md">
        <div class="col-md-4 col-sm-12 col-xs-12">
          <q-card class="col-md-3 col-sm col-lg-2" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h6" style="font-size: 14px; color: #9f8170">
                  Penjualan
                </div>
                <div class="text-caption text-grey" style="font-size: 11px">
                  Berisi semua data penjualan usaha kopi.
                </div>
                <div class="text-h6" style="color: #9f8170">Rp. 300.000</div>
              </q-card-section>

              <q-card-section class="col-4 flex flex-center">
                <q-icon
                  name="storefront"
                  style="font-size: 5.4em; color: #9f8170"
                />
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-md-4 col-sm-12 col-xs-12">
          <q-card class="col-md-3 col-sm col-lg-2" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h6" style="font-size: 14px; color: #9f8170">
                  Pembelian
                </div>
                <div class="text-caption text-grey" style="font-size: 11px">
                  Berisi semua data pembelian usaha kopi.
                </div>
                <div class="text-h6" style="color: #9f8170">Rp. 400.000</div>
              </q-card-section>

              <q-card-section class="col-4 flex flex-center">
                <q-icon
                  name="shopping_bag"
                  style="font-size: 5.4em; color: #9f8170"
                />
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-md-4 col-sm-12 col-xs-12">
          <q-card class="col-md-3 col-sm col-lg-2" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h6" style="font-size: 14px; color: #9f8170">
                  Pengeluaran
                </div>
                <div class="text-caption text-grey" style="font-size: 11px">
                  Berisi semua data pengeluaran usaha kopi.
                </div>
                <div class="text-h6" style="color: #9f8170">Rp. 200.000</div>
              </q-card-section>

              <q-card-section class="col-4 flex flex-center">
                <q-icon
                  name="price_change"
                  style="font-size: 5.4em; color: #9f8170"
                />
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row items-center q-col-gutter-md q-pt-md">
        <div class="col-md-8 col-xs-12">
          <ChartsBarKopi :data="chartBarKopi" :color="color" />
        </div>
        <div class="col-md-4 col-xs-12">
          <ChartsDoughnutKopi :data="chartDoughnutKopi" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
// import Vue3autocounter from "vue3-autocounter";
import ChartsBarKopi from "./../../components/MyCharts/ChartBarKopi.vue";
import ChartsDoughnutKopi from "./../../components/MyCharts/ChartDoughnutKopi.vue";
import {
  Chart as ChartJS,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "PageIndex",
  components: {
    ChartsBarKopi,
    ChartsDoughnutKopi,
  },
  data() {
    return {
      chartBarKopi: null,
      chartDoughnutKopi: null,
      visibles: false,
      color: [],
      tabs: "produk",
      splitterModel: 5,
      saldo: "200.000",
      debit: "100.000",
      kredit: "50.000",
    };
  },
  methods: {
    getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
  },
};
</script>

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
