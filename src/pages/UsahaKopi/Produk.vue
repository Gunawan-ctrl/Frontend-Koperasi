<template>
  <q-page class="bg-brown-1">
    <div class="q-pa-md">
      <q-card class="q-pa-md">
        <q-breadcrumbs separator="---" class="text-brown" active-color="black">
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Data Barang" icon="extension" />
          <q-breadcrumbs-el label="Produk" icon="category" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-md">
        <div class="row q-gutter-md col-12">
          <q-card class="my-card col-lg-3 col-md-4 col-sm-7" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h6 q-mt-sm" style="font-size: 14px">
                  Data Produk
                </div>
                <div class="text-caption text-grey" style="font-size: 11px">
                  berisi semua data produk unit usaha kopi.
                </div>
                <div class="row items-center">
                  <q-icon name="credit_score" />
                  <div
                    class="text-h6 q-ml-sm text-blue-13"
                    style="font-size: 12px"
                  >
                    3000
                  </div>
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>

        <div class="row col-12 q-mt-md">
          <q-card class="col-md-12 col-xs-12" flat bordered>
            <q-table
              :rows="data"
              :columns="columns"
              row-key="name"
              :filter="filter"
              :pagination="pagination"
            >
              <template v-slot:top>
                <div class="col">
                  <div class="text-weight-bold">PRODUK</div>
                  <div>Daftar semua produk pada saat ini</div>
                </div>

                <q-space />

                <q-btn
                  @click="openDialog(false, null)"
                  flat
                  icon="library_add"
                  text-color="blue-7"
                >
                  <q-tooltip> Tambah Data </q-tooltip>
                </q-btn>

                <q-btn
                  flat
                  unelevated
                  icon="document_scanner"
                  text-color="blue-7"
                  @click="exportToCSV()"
                >
                  <q-tooltip> Export Data </q-tooltip>
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
                  <q-td key="namaProduk" :props="props">
                    {{ props.row.namaProduk }}
                  </q-td>
                  <q-td key="hpp" :props="props">
                    {{ props.row.hpp }}
                  </q-td>
                  <q-td key="hargaJual" :props="props">
                    Rp {{ props.row.hargaJual }}
                  </q-td>
                  <q-td key="keuntunganPerProduk" :props="props">
                    Rp {{ props.row.keuntunganPerProduk }}
                  </q-td>
                  <q-td key="fotoProduk" :props="props">
                    Rp {{ props.row.fotoProduk }}
                  </q-td>
                  <q-td key="keterangan" :props="props">
                    Rp {{ props.row.keterangan }}
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
                  <q-icon name="category" size="30px" color="brown" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-bold text-uppercase">
                  Input /Edit Produk
                </q-item-label>
                <q-item-label caption>
                  Input atau edit data produk
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
                    v-model="namaProduk"
                    outlined
                    label="Nama Produk"
                  />
                  <q-input
                    dense
                    type="number"
                    v-model="hpp"
                    outlined
                    label="Harga Pokok Penjualan"
                  />
                  <q-input
                    dense
                    type="number"
                    v-model="hargaJual"
                    outlined
                    label="Harga Jual"
                  />
                </q-card-section>

                <q-separator vertical />

                <q-card-section class="q-gutter-md fit">
                  <q-input
                    dense
                    type="number"
                    v-model="keuntunganPerProduk"
                    outlined
                    label="Keuntungan Per Produk"
                  />
                  <q-input
                    dense
                    type="number"
                    v-model="stok"
                    outlined
                    label="Stok"
                  />
                  <q-input
                    dense
                    type="file"
                    v-model="fotoProduk"
                    outlined
                    label="Foto Produk"
                  />
                  <q-input
                    dense
                    v-model="keterangan"
                    outlined
                    label="Keterangan"
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
// import Vue3autocounter from "vue3-autocounter";

const columns = [
  {
    name: "namaProduk",
    label: "Nama Produk",
    field: "namaProduk",
    align: "left",
  },
  {
    name: "hpp",
    label: "Harga Pokok Penjualan",
    field: "hpp",
    align: "left",
  },
  {
    name: "hargaJual",
    label: "Harga Jual",
    field: "hargaJual",
    align: "left",
  },
  {
    name: "keuntunganPerProduk",
    label: "Keuntungan Per Produk",
    field: "keuntunganPerProduk",
    align: "left",
  },
  {
    name: "stok",
    label: "Stok",
    field: "stok",
    align: "left",
  },
  {
    name: "fotoProduk",
    label: "Foto Produk",
    field: "fotoProduk",
    align: "left",
  },
  {
    name: "keterangan",
    label: "Keterangan",
    field: "keterangan",
    align: "left",
  },
  {
    name: "action",
    label: "Action",
    field: "action",
    align: "center",
  },
];

const data = [];

export default {
  name: "ProdukPage",
  components: {
    // "vue3-autocounter": Vue3autocounter,
  },
  data() {
    return {
      columns,
      data,
      filter: "",
      pagination: {
        rowsPerPage: 10,
      },
      visibles: false,
      editMode: false,
      dialog: false,
      namaProduk: null,
      hpp: null,
      hargaJual: null,
      keuntunganPerProduk: null,
      stok: null,
      fotoProduk: null,
      keterangan: null,
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
        this.namaProduk = data.namaProduk;
        this.hpp = data.hpp;
        this.hargaJual = data.hargaJual;
        this.keuntunganPerProduk = data.keuntunganPerProduk;
        this.stok = data.stok;
        this.fotoProduk = data.fotoProduk;
        this.keterangan = data.keterangan;
        this.idActive = data._id;
      } else {
        this.namaProduk = null;
        this.hpp = null;
        this.hargaJual = null;
        this.keuntunganPerProduk = null;
        this.stok = null;
        this.fotoProduk = null;
        this.keterangan = null;
        this.idActive = null;
      }
      this.dialog = true;
    },
    resetDialog() {
      this.editMode = false;
      this.dialog = false;
    },
    resetForm() {
      this.namaProduk = null;
      this.hpp = null;
      this.hargaJual = null;
      this.keuntunganPerProduk = null;
      this.stok = null;
      this.fotoProduk = null;
      this.keterangan = null;
    },
    onSubmit() {
      if (this.editMode) {
        this.$axios
          .put(`produk/edit/${this.idActive}`, {
            namaProduk: this.namaProduk,
            hpp: this.hpp,
            hargaJual: this.hargaJual,
            keuntunganPerProduk: this.keuntunganPerProduk,
            stok: this.stok,
            fotoProduk: this.fotoProduk,
            keterangan: this.keterangan,
          })
          .then((res) => {
            if ((res.data.sukses = true)) {
              this.$successNotif(res.data.pesan, "positive");
            }
            this.getData();
            this.resetDialog();
            this.resetForm();
          });
      } else {
        this.$axios
          .post("produk/add", {
            namaProduk: this.namaProduk,
            hpp: this.hpp,
            hargaJual: this.hargaJual,
            keuntunganPerProduk: this.keuntunganPerProduk,
            stok: this.stok,
            fotoProduk: this.fotoProduk,
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
      this.$axios.get("produk/getAll").then((res) => {
        if (res.data.sukses) {
          this.data = res.data.data;
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
          this.$axios.delete(`produk/delete/${_id}`).then((res) => {
            if (res.data.sukses) {
              this.$successNotif(res.data.pesan, "positive");
            }
            this.getData();
          });
        });
    },
    onReset() {
      this.namaProduk = null;
      this.hpp = null;
      this.hargaJual = null;
      this.keuntunganPerProduk = null;
      this.stok = null;
      this.fotoProduk = null;
      this.keterangan = null;
    },
  },
};
</script>

<style scoped></style>
