<template>
  <q-page class="bg-brown-1">
    <div class="q-pa-md">
      <q-card class="q-pa-md">
        <q-breadcrumbs separator="---" class="text-brown" active-color="black">
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Pembelian" icon="shopping_bag" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-md">
        <div class="row q-gutter-md col-12">
          <q-card class="my-card col-lg-3 col-md-4 col-sm-6" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col-4 flex flex-center">
                <lottie style="width: 80px" :options="defaultOptions" />
              </q-card-section>
              <q-card-section class="q-pt-xs">
                <div class="text-h6 q-mt-sm" style="font-size: 14px">
                  Data Pembelian
                </div>
                <div class="text-caption text-grey" style="font-size: 11px">
                  jumlah pembelian usaha kopi.
                </div>
                <div class="row items-center">
                  <q-icon name="credit_score" />
                  <div
                    class="text-h6 q-ml-sm text-blue-13"
                    style="font-size: 12px"
                  >
                    <vue3-autocounter
                      ref="counter"
                      :startAmount="0"
                      :endAmount="Number(dataPembelian)"
                      :duration="3"
                      :autoinit="true"
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>

        <div class="row col-12 q-mt-md">
          <q-card class="my-card col" flat bordered>
            <q-table
              :rows="rows"
              :columns="columns"
              row-key="name"
              :filter="filter"
              :pagination="pagination"
            >
              <template v-slot:top>
                <div class="col">
                  <div class="text-weight-bold">PEMBELIAN</div>
                  <div>Daftar semua pembelian pada saat ini</div>
                </div>

                <q-space />

                <q-btn
                  @click="openDialog(false, null)"
                  icon="library_add"
                  color="blue-7"
                  label="Tambah Data"
                >
                </q-btn>

                <q-btn
                  flat
                  color="primary"
                  icon="search"
                  @click="visibles = !visibles"
                  size="md"
                  class="q-mr-sm"
                />
                <q-slide-transition>
                  <div v-show="visibles">
                    <q-input
                      outlined
                      debounce="300"
                      placeholder="Pencarian"
                      style="width: 200px"
                      color="primary"
                      v-model="filter"
                      dense
                    />
                  </div>
                </q-slide-transition>
              </template>

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="tanggal" :props="props">
                    {{
                      new Date(props.row.tanggal).toLocaleDateString("id", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    }}
                  </q-td>
                  <q-td key="namaSupplier" :props="props">
                    {{ props.row.namaSupplier }}
                  </q-td>
                  <q-td key="nomorTelepon" :props="props">
                    {{ props.row.nomorTelepon }}
                  </q-td>
                  <q-td key="keterangan" :props="props">
                    {{ props.row.keterangan }}
                  </q-td>
                  <q-td key="harga" :props="props">
                    Rp. {{ props.row.harga }}
                  </q-td>
                  <q-td key="jumlah" :props="props">
                    {{ props.row.jumlah }}
                  </q-td>
                  <q-td key="total" :props="props">
                    Rp. {{ props.row.total }}
                  </q-td>
                  <q-td key="action" :props="props">
                    <div class="justify-center q-gutter-x-xs">
                      <q-btn
                        flat
                        color="blue-8"
                        size="md"
                        class="q-px-xs"
                        icon="edit"
                        @click="openDialog(true, props.row)"
                      ></q-btn>
                      <q-btn
                        flat
                        color="red"
                        size="md"
                        @click="hapusData(props.row._id)"
                        class="q-px-xs"
                        icon="delete"
                      ></q-btn>
                    </div>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-card>
        </div>

        <q-dialog v-model="dialog">
          <q-card
            class="my-card"
            flat
            bordered
            style="width: 600px; max-width: 70vw"
          >
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <q-icon name="shopping_bag" size="30px" color="brown" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-bold text-uppercase">
                  Input /Edit Pembelian
                </q-item-label>
                <q-item-label caption>
                  Input atau edit data pembelian
                </q-item-label>
              </q-item-section>

              <q-item-section class="col-1">
                <q-btn
                  flat
                  dense
                  icon="close"
                  class="float-right"
                  color="grey-8"
                  v-close-popup
                ></q-btn>
              </q-item-section>
            </q-item>

            <q-separator />

            <q-form @submit="onSubmit()" @reset="onReset()">
              <q-card-section horizontal>
                <q-card-section class="q-gutter-md fit">
                  <q-input
                    dense
                    type="date"
                    v-model="tanggal"
                    outlined
                    label="Tanggal"
                  />
                  <q-input
                    dense
                    v-model="namaSupplier"
                    outlined
                    label="Nama Supplier "
                  />
                  <q-input
                    dense
                    type="number"
                    v-model="nomorTelepon"
                    outlined
                    label="Nomor Telpon"
                  />
                </q-card-section>

                <q-separator vertical />

                <q-card-section class="q-gutter-md fit">
                  <q-input
                    dense
                    v-model="keterangan"
                    outlined
                    label="Keterangan"
                  />
                  <q-input
                    dense
                    type="number"
                    v-model="harga"
                    outlined
                    label="Harga"
                  />
                  <q-input
                    dense
                    type="number"
                    v-model="jumlah"
                    outlined
                    label="Jumlah"
                  />
                </q-card-section>
              </q-card-section>

              <q-separator />

              <q-card-actions>
                <q-btn flat type="submit" label="Simpan" color="primary" />
                <q-btn flat type="reset" label="Reset" color="grey" />
              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script>
import Vue3autocounter from "vue3-autocounter";
import Lottie from "./../../components/Lottie.vue";
import * as animationData from "./../../../public/images/lottie/pengeluaran.json";
const columns = [
  {
    name: "tanggal",
    label: "Tanggal",
    field: "tanggal",
    align: "left",
  },
  {
    name: "namaSupplier",
    label: "Nama Supplier",
    field: "namaSupplier",
    align: "left",
  },
  {
    name: "nomorTelepon",
    label: "Nomor Telepon",
    field: "nomorTelepon",
    align: "left",
  },
  {
    name: "keterangan",
    label: "Keterangan",
    field: "keterangan",
    align: "left",
  },
  {
    name: "harga",
    label: "Harga",
    field: "harga",
    align: "left",
  },
  {
    name: "jumlah",
    label: "Jumlah",
    field: "jumlah",
    align: "left",
  },
  {
    name: "total",
    label: "Total",
    field: "total",
    align: "left",
  },
  {
    name: "action",
    label: "Action",
    field: "action",
    align: "center",
  },
];

const rows = [];

export default {
  name: "PembelianPage",
  components: {
    "vue3-autocounter": Vue3autocounter,
    Lottie: Lottie,
  },
  data() {
    return {
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 2,
      columns,
      rows,
      filter: "",
      pagination: {
        rowsPerPage: 10,
      },
      visibles: false,
      editMode: false,
      dialog: false,
      dataPembelian: 4000,
      tanggal: null,
      namaSupplier: null,
      nomorTelepon: null,
      keterangan: null,
      jumlah: null,
      harga: null,
      idActive: null,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    openDialog(editMode, data) {
      this.editMode = editMode;
      if (editMode) {
        this.tanggal = data.tanggal;
        this.namaSupplier = data.namaSupplier;
        this.nomorTelepon = data.nomorTelepon;
        this.keterangan = data.keterangan;
        this.jumlah = data.jumlah;
        this.harga = data.harga;
        this.total = data.total;
        this.idActive = data._id;
      } else {
        this.tanggal = null;
        this.namaSupplier = null;
        this.nomorTelepon = null;
        this.harga = null;
        this.jumlah = null;
        this.total = null;
        this.keterangan = null;
        this.idActive = null;
      }
      this.dialog = true;
    },
    resetDialog() {
      this.editMode = false;
      this.dialog = false;
    },
    onReset() {
      this.tanggal = null;
      this.namaSupplier = null;
      this.nomorTelepon = null;
      this.harga = null;
      this.jumlah = null;
      this.total = null;
      this.keterangan = null;
    },
    onSubmit() {
      if (this.editMode) {
        this.$axios
          .put(`pembelian/edit/${this.idActive}`, {
            tanggal: this.tanggal,
            namaSupplier: this.namaSupplier,
            nomorTelepon: this.nomorTelepon,
            harga: this.harga,
            jumlah: this.jumlah,
            total: this.total,
            keterangan: this.keterangan,
          })
          .then((res) => {
            if ((res.data.sukses = true)) {
              this.$successNotif(res.data.pesan, "positive");
            }
            this.getData();
            this.resetDialog();
            this.onReset();
          });
      } else {
        this.$axios
          .post("pembelian/add", {
            tanggal: this.tanggal,
            namaSupplier: this.namaSupplier,
            nomorTelepon: this.nomorTelepon,
            harga: this.harga,
            jumlah: this.jumlah,
            total: this.total,
            keterangan: this.keterangan,
          })
          .then((res) => {
            if ((res.data.sukses = true)) {
              this.$successNotif(res.data.pesan, "positive");
            }
            this.dialog = false;
            this.getData();
          });
      }
    },
    getData() {
      this.$axios.get("pembelian/getAll").then((res) => {
        if (res.data.sukses) {
          this.rows = res.data.data;
        }
      });
    },
    hapusData(_id) {
      this.$q
        .dialog({
          title: "Konfirmasi",
          message: "Apakah anda yakin ingin menghapus data ini?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.$axios.delete(`pembelian/delete/${_id}`).then((res) => {
            if (res.data.sukses) {
              this.$successNotif(res.data.pesan, "positive");
            }
            this.getData();
          });
        });
    },
  },
  computed: {
    total() {
      return this.harga * this.jumlah;
    },
  },
};
</script>

<style scoped></style>
