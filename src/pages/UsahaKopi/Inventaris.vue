<template>
  <q-page class="bg-brown-1">
    <div class="q-pa-md">
      <q-card class="q-pa-md">
        <q-breadcrumbs separator="---" class="text-brown" active-color="black">
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Data Barang" icon="extension" />
          <q-breadcrumbs-el label="Inventaris" icon="beenhere" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-md">
        <div class="row q-gutter-md col-12">
          <q-card class="my-card col-lg-3 col-md-4 col-sm-6" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h6 q-mt-sm" style="font-size: 14px">
                  Data Inventaris
                </div>
                <div class="text-caption text-grey" style="font-size: 11px">
                  berisi semua data inventaris unit usaha kopi.
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
                      :endAmount="Number(dataInventaris)"
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
                  <div class="text-weight-bold">Inventaris</div>
                  <div>Daftar semua inventaris pada saat ini</div>
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
                  <q-td key="namaInventaris" :props="props">
                    {{ props.row.namaInventaris }}
                  </q-td>
                  <q-td key="masaManfaat" :props="props">
                    {{ props.row.masaManfaat }}
                  </q-td>
                  <q-td key="tahunPerolehan" :props="props">
                    {{ props.row.tahunPerolehan }}
                  </q-td>
                  <q-td key="nilaiPerolehan" :props="props">
                    {{ props.row.nilaiPerolehan }}
                  </q-td>
                  <q-td key="akumulasiPenyusutan" :props="props">
                    {{ props.row.akumulasiPenyusutan }}
                  </q-td>
                  <q-td key="jumlah" :props="props">
                    {{ props.row.jumlah }}
                  </q-td>
                  <q-td key="nilaiSisaInventori" :props="props">
                    {{ props.row.nilaiSisaInventori }}
                  </q-td>
                  <q-td key="dasarPenyusutan" :props="props">
                    {{ props.row.dasarPenyusutan }}
                  </q-td>
                  <q-td key="tarif" :props="props">
                    {{ props.row.tarif }}
                  </q-td>
                  <q-td key="sisaManfaat" :props="props">
                    {{ props.row.sisaManfaat }}
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
                  <q-icon name="beenhere" size="30px" color="brown" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-bold text-uppercase">
                  Input /Edit Inventaris
                </q-item-label>
                <q-item-label caption>
                  Input atau edit data Inventaris
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
                    v-model="namaInventaris"
                    outlined
                    label="Nama Inventaris "
                  />
                  <q-input
                    dense
                    type="number"
                    v-model="masaManfaat"
                    outlined
                    label="Masa Manfaat"
                  />
                  <q-input
                    dense
                    type="number"
                    v-model="tahunPerolehan"
                    outlined
                    label="Tahun Perolehan"
                  />
                  <q-input
                    dense
                    type="number"
                    v-model="nilaiPerolehan"
                    outlined
                    label="Nilai Perolehan"
                  />
                  <q-input
                    dense
                    type="number"
                    v-model="akumulasiPenyusutan"
                    outlined
                    label="Akumulasi Penyusutan"
                  />
                </q-card-section>

                <q-separator vertical />

                <q-card-section class="q-gutter-md fit">
                  <q-input
                    dense
                    type="number"
                    v-model="jumlah"
                    outlined
                    label="Jumlah"
                  />
                  <q-input
                    dense
                    type="number"
                    v-model="nilaiSisaInventori"
                    outlined
                    label="Nilai Sisa Inventori"
                  />
                  <q-input
                    dense
                    type="number"
                    v-model="dasarPenyusutan"
                    outlined
                    label="Dasar Penyusutan"
                  />
                  <q-input
                    dense
                    type="number"
                    v-model="tarif"
                    outlined
                    label="Tarif"
                  />
                  <q-input
                    dense
                    type="number"
                    v-model="sisaManfaat"
                    outlined
                    label="Sisa Manfaat"
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

const columns = [
  {
    name: "namaInventaris",
    label: "Nama Inventaris",
    field: "namaInventaris",
    align: "left",
  },
  {
    name: "masaManfaat",
    label: "Masa Manfaat",
    field: "masaManfaat",
    align: "left",
  },
  {
    name: "tahunPerolehan",
    label: "Tahun Perolehan",
    field: "tahunPerolehan",
    align: "left",
  },
  {
    name: "nilaiPerolehan",
    label: "Nilai Perolehan",
    field: "nilaiPerolehan",
    align: "left",
  },
  {
    name: "akumulasiPenyusutan",
    label: "Akumulasi Penyusutan",
    field: "akumulasiPenyusutan",
    align: "left",
  },
  {
    name: "jumlah",
    label: "Jumlah",
    field: " jumlah",
    align: "left",
  },
  {
    name: "nilaiSisaInventori",
    label: "Nilai Sisa Inventori",
    field: " nilaiSisaInventori",
    align: "left",
  },
  {
    name: "dasarPenyusutan",
    label: "Dasar Penyusutan",
    field: "dasarPenyusutan",
    align: "left",
  },
  {
    name: "tarif",
    label: "Tarif",
    field: "tarif",
    align: "left",
  },
  {
    name: "sisaManfaat",
    label: "Sisa Manfaat",
    field: "sisaManfaat",
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
  name: "InventarisPage",
  components: {
    "vue3-autocounter": Vue3autocounter,
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
      dataInventaris: 2000,
      namaInventaris: null,
      jumlah: null,
      masaManfaat: null,
      tahunPerolehan: null,
      nilaiPerolehan: null,
      akumulasiPenyusutan: null,
      nilaiSisaInventori: null,
      dasarPenyusutan: null,
      tarif: null,
      sisaManfaat: null,
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
        this.namaInventaris = data.namaInventaris;
        this.jumlah = data.jumlah;
        this.masaManfaat = data.masaManfaat;
        this.tahunPerolehan = data.tahunPerolehan;
        this.nilaiPerolehan = data.nilaiPerolehan;
        this.akumulasiPenyusutan = data.akumulasiPenyusutan;
        this.nilaiSisaInventori = data.nilaiSisaInventori;
        this.dasarPenyusutan = data.dasarPenyusutan;
        this.tarif = data.tarif;
        this.sisaManfaat = data.sisaManfaat;
        this.idActive = data._id;
      } else {
        this.namaInventaris = null;
        this.jumlah = null;
        this.masaManfaat = null;
        this.statusPembelian = null;
        this.tahunPerolehan = null;
        this.nilaiPerolehan = null;
        this.akumulasiPenyusutan = null;
        this.nilaiSisaInventori = null;
        this.dasarPenyusutan = null;
        this.tarif = null;
        this.sisaManfaat = null;
        this.idActive = null;
      }
      this.dialog = true;
    },
    resetDialog() {
      this.editMode = false;
      this.dialog = false;
    },
    onReset() {
      this.namaInventaris = null;
      this.jumlah = null;
      this.masaManfaat = null;
      this.statusPembelian = null;
      this.tahunPerolehan = null;
      this.nilaiPerolehan = null;
      this.akumulasiPenyusutan = null;
      this.nilaiSisaInventori = null;
      this.dasarPenyusutan = null;
      this.tarif = null;
      this.sisaManfaat = null;
    },
    onSubmit() {
      if (this.editMode) {
        this.$axios
          .put(`inventaris/edit/${this.idActive}`, {
            namaInventaris: this.namaInventaris,
            jumlah: this.jumlah,
            masaManfaat: this.masaManfaat,
            tahunPerolehan: this.tahunPerolehan,
            nilaiPerolehan: this.nilaiPerolehan,
            akumulasiPenyusutan: this.akumulasiPenyusutan,
            nilaiSisaInventori: this.nilaiSisaInventori,
            dasarPenyusutan: this.dasarPenyusutan,
            tarif: this.tarif,
            sisaManfaat: this.sisaManfaat,
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
          .post("inventaris/add", {
            namaInventaris: this.namaInventaris,
            jumlah: this.jumlah,
            masaManfaat: this.masaManfaat,
            tahunPerolehan: this.tahunPerolehan,
            nilaiPerolehan: this.nilaiPerolehan,
            akumulasiPenyusutan: this.akumulasiPenyusutan,
            nilaiSisaInventori: this.nilaiSisaInventori,
            dasarPenyusutan: this.dasarPenyusutan,
            tarif: this.tarif,
            sisaManfaat: this.sisaManfaat,
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
      this.$axios.get("inventaris/getAll").then((res) => {
        console.log(res);
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
          this.$axios.delete(`inventaris/delete/${_id}`).then((res) => {
            if (res.data.sukses) {
              this.$successNotif(res.data.pesan, "positive");
            }
            this.getData();
          });
        });
    },
  },
};
</script>
