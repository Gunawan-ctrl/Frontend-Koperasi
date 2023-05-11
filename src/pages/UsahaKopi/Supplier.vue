<template>
  <q-page class="bg-brown-1">
    <div class="q-pa-md">
      <q-card class="q-pa-md">
        <q-breadcrumbs separator="---" class="text-brown" active-color="black">
          <q-breadcrumbs-el label="Extras" icon="widgets" />
          <q-breadcrumbs-el label="Mitra" icon="groups" />
          <q-breadcrumbs-el label="Supplier" icon="local_shipping" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-md">
        <div class="row q-gutter-md col-12">
          <q-card class="my-card col-lg-3 col-md-4 col-sm-7" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h6 q-mt-sm" style="font-size: 14px">
                  Data Supplier
                </div>
                <div class="text-caption text-grey" style="font-size: 11px">
                  berisi semua data supplier unit usaha kopi.
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
                      :endAmount="Number(dataSupplier)"
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
                  <div class="text-weight-bold">SUPPLIER</div>
                  <div>Daftar semua supplier pada saat ini</div>
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
                  <q-td key="namaSupplier" :props="props">
                    {{ props.row.namaSupplier }}
                  </q-td>
                  <q-td key="keterangan" :props="props">
                    {{ props.row.keterangan }}
                  </q-td>
                  <q-td key="nomorTelepon" :props="props">
                    {{ props.row.nomorTelepon }}
                  </q-td>
                  <q-td key="alamat" :props="props">
                    {{ props.row.alamat }}
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
                  <q-icon name="local_shipping" size="30px" color="brown" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-bold text-uppercase">
                  Input /Edit Supplier
                </q-item-label>
                <q-item-label caption>
                  Input atau edit data supplier
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
                    v-model="namaSupplier"
                    outlined
                    label="Nama Supplier"
                  />
                  <q-input
                    dense
                    v-model="keterangan"
                    outlined
                    label="Keterangan"
                  />
                </q-card-section>

                <q-separator vertical />

                <q-card-section class="q-gutter-md fit">
                  <q-input
                    dense
                    type="number"
                    v-model="nomorTelepon"
                    outlined
                    label="Nomor Telepon"
                  />
                  <q-input dense v-model="alamat" outlined label="Alamat" />
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
    name: "namaSupplier",
    label: "Nama Supplier",
    field: "namaSupplier",
    align: "left",
  },
  {
    name: "keterangan",
    label: "Keterangan",
    field: "keterangan",
    align: "left",
  },
  {
    name: "nomorTelepon",
    label: "Nomor Telepon",
    field: "nomorTelepon",
    align: "left",
  },
  {
    name: "alamat",
    label: "Alamat",
    field: "alamat",
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
  name: "SupplierPage",
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
      dataSupplier: 20,
      namaSupplier: null,
      keterangan: null,
      nomorTelepon: null,
      alamat: null,
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
        this.namaSupplier = data.namaSupplier;
        this.keterangan = data.keterangan;
        this.nomorTelepon = data.nomorTelepon;
        this.alamat = data.alamat;
        this.idActive = data._id;
      } else {
        this.namaSupplier = null;
        this.keterangan = null;
        this.nomorTelepon = null;
        this.alamat = null;
        this.idActive = null;
      }
      this.dialog = true;
    },
    resetDialog() {
      this.editMode = false;
      this.dialog = false;
    },
    resetForm() {
      this.namaSupplier = null;
      this.keterangan = null;
      this.nomorTelepon = null;
      this.alamat = null;
    },
    onSubmit() {
      if (this.editMode) {
        this.$axios
          .put(`supplier/edit/${this.idActive}`, {
            namaSupplier: this.namaSupplier,
            keterangan: this.keterangan,
            nomorTelepon: this.nomorTelepon,
            alamat: this.alamat,
          })
          .then((res) => {
            console.log(res);
            if ((res.data.sukses = true)) {
              this.$successNotif(res.data.pesan, "positive");
            }
            this.getData();
            this.resetDialog();
            this.resetForm();
          });
      } else {
        this.$axios
          .post("supplier/add", {
            namaSupplier: this.namaSupplier,
            keterangan: this.keterangan,
            nomorTelepon: this.nomorTelepon,
            alamat: this.alamat,
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
      this.$axios.get("supplier/getAll").then((res) => {
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
          this.$axios.delete(`supplier/delete/${_id}`).then((res) => {
            if (res.data.sukses) {
              this.$successNotif(res.data.pesan, "positive");
            }
            this.getData();
          });
        });
    },
    onReset() {
      this.namaSupplier = null;
      this.keterangan = null;
      this.nomorTelepon = null;
      this.alamat = null;
    },
  },
};
</script>
