<template>
  <q-page class="bg-grey-3">
    <div class="q-pa-md">
      <q-card class="q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-8" active-color="black">
          <q-breadcrumbs-el label="Dashboard" icon="inbox" />
        </q-breadcrumbs>
      </q-card>
      <div class="row items-center q-col-gutter-md q-pt-md">
        <div class="col-12 col-md-4 col-sm-6 col-xs-12 col-lg-4">
          <q-card flat style="padding: 20px 0px 20px 0px" class="bg-blue">
            <q-item>
              <q-item-section avatar>
                <q-btn
                  round
                  color="white"
                  text-color="blue-8"
                  icon="business_center"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-bold q-mb-sm text-white">
                  PENDAPATAN
                </q-item-label>
                <q-item-label caption class="text-white">
                  Jumlah pendapatan pada bulan ini
                </q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-white">
                  <strong>Rp. {{ pendapatan }}</strong>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </div>

        <div class="col-md-4 col-sm-6 col-xs-12">
          <q-card flat style="padding: 20px 0px 20px 0px" class="bg-green">
            <q-item>
              <q-item-section avatar>
                <q-btn round color="white" text-color="green" icon="payments" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-bold q-mb-sm text-white">
                  PEMINJAMAN
                </q-item-label>
                <q-item-label caption class="text-white">
                  Jumlah peminjaman pada bulan ini
                </q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-white"
                  ><strong>Rp. {{ peminjaman }}</strong>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </div>

        <div class="col-md-4 col-sm-12 col-xs-12">
          <q-card flat style="padding: 20px 0px 20px 0px" class="bg-orange-6">
            <q-item>
              <q-item-section avatar>
                <q-btn
                  round
                  color="white"
                  text-color="orange-6"
                  icon="price_change"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-bold q-mb-sm text-white">
                  PENGELUARAN
                </q-item-label>
                <q-item-label caption class="text-white">
                  Jumlah pengeluaran pada bulan ini
                </q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-white"
                  ><strong>Rp. {{ pengeluaran }}</strong>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </div>
      <div class="row items-center q-col-gutter-md q-py-md">
        <div class="col-md-8 col-xs-12">
          <ChartsBar :data="chartBar" :color="color" />
        </div>
        <div class="col-md-4 col-xs-12">
          <ChartsDoughnut :data="chartDoughnut" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import ChartsBar from "./../../components/MyCharts/ChartBar.vue";
import ChartsDoughnut from "./../../components/MyCharts/ChartDoughnut.vue";
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
// import Vue3autocounter from "vue3-autocounter";

export default defineComponent({
  name: "IndexPage",
  components: {
    ChartsBar,
    ChartsDoughnut,
    // "vue3-autocounter": Vue3autocounter,
  },
  data() {
    return {
      pendapatan: "100.000",
      peminjaman: "50.000",
      pengeluaran: "120.000",
      chartDoughnut: null,
      chartBar: null,
      color: null,
    };
  },
  created() {
    this.getPendapatan();
    this.getPeminjaman();
  },
  methods: {
    getPendapatan() {
      this.$axios.get("peminjaman/getAll").then((res) => {
        if (res.data.sukses) {
          res.data.data.forEach((data) => {
            this.pendapatan = data.pendapatan;
            console.log(this.pendapatan);
          });
        }
      });
    },
    getPeminjaman() {
      this.$axios.get("peminjaman/getAll").then((res) => {
        if (res.data.sukses) {
          res.data.data.forEach((data) => {
            this.peminjaman = data.total;
            console.log(this.peminjaman);
          });
        }
      });
    },
  },
});
</script>
