<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page class="bg-grey-3">
    <div class="q-pa-md">
      <q-card class="q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-8" active-color="black">
          <q-breadcrumbs-el label="Master Data" icon="widgets" />
          <q-breadcrumbs-el label="Nasabah" icon="group_add" />
        </q-breadcrumbs>
      </q-card>
      <div class="row items-center q-col-gutter-md q-pt-md">
        <div class="col-md-12 col-xs-12">
          <q-table
            :rows="rows"
            :columns="columns"
            row-key="name"
            :filter="filter"
            :pagination="pagination"
          >
            <template v-slot:top>
              <div class="col">
                <div class="text-weight-bold">NASABAH</div>
                <div>Daftar semua nasabah pada saat ini</div>
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
                @click="exportTable()"
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
                <q-td key="nama" :props="props">
                  {{ props.row.nama }}
                </q-td>
                <q-td key="email" :props="props">
                  {{ props.row.email }}
                </q-td>
                <q-td key="alamat" :props="props">
                  {{ props.row.alamat }}
                </q-td>
                <q-td key="kelamin" :props="props">
                  {{ props.row.kelamin }}
                </q-td>
                <q-td key="status" :props="props">
                  <q-badge
                    :color="props.row.status === 'Aktif' ? 'green' : 'red'"
                    text-color="white"
                    dense
                    class="text-weight-bold"
                    square
                  >
                    {{ props.row.status === "Aktif" ? "AKTIF" : "TIDAK AKTIF" }}
                  </q-badge>
                </q-td>
                <q-td key="statusPinjam">
                  <q-badge
                    :color="this.total === null ? 'green' : 'red'"
                    text-color="white"
                    dense
                    class="text-weight-bold"
                    square
                  >
                    {{
                      this.total === null ? "TIDAK MEMINJAM" : "SEDANG MEMINJAM"
                    }}
                  </q-badge>
                </q-td>
                <q-td key="jumlahPinjaman" :props="props">
                  Rp. {{ this.total }}
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
        </div>
      </div>
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
              <q-icon name="group_add" size="30px" color="blue-7" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weight-bold text-uppercase">
              Input /Edit Nasabah
            </q-item-label>
            <q-item-label caption> Input atau edit data nasabah </q-item-label>
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
              <q-input dense v-model="nama" outlined label="Nama" />
              <q-input
                dense
                type="email"
                v-model="email"
                outlined
                label="Email"
              />
              <q-input dense v-model="alamat" outlined label="Alamat" />
            </q-card-section>

            <q-separator vertical />

            <q-card-section class="q-gutter-md fit">
              <q-select
                dense
                v-model="kelamin"
                :options="optionKelamin"
                outlined
                label="Jenis Kelamin"
              />
              <q-select
                dense
                outlined
                v-model="status"
                option-label="label"
                :options="optionStatus"
                label="Status"
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
  </q-page>
</template>

<script>
import { exportFile } from "quasar";

const columns = [
  {
    name: "nama",
    label: "Nama",
    field: "nama",
    align: "left",
  },
  {
    name: "email",
    label: "Email",
    field: "email",
    align: "left",
  },
  {
    name: "alamat",
    label: "Alamat",
    field: "alamat",
    align: "left",
  },
  {
    name: "kelamin",
    label: "Kelamin",
    field: "kelamin",
    align: "left",
  },
  {
    name: "status",
    label: "Status",
    field: "status",
    align: "left",
  },
  {
    name: "statusPinjam",
    label: "Status Peminjaman",
    field: "statusPinjam",
    align: "left",
  },
  {
    name: "jumlahPinjaman",
    label: "Jumlah Pinjaman",
    field: "jumlahPinjaman",
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
  name: "NasabahPage",
  data() {
    return {
      columns,
      rows,
      filter: "",
      pagination: {
        rowsPerPage: 10,
      },
      visibles: false,
      dialog: false,
      total: null,
      nama: null,
      email: null,
      alamat: null,
      kelamin: null,
      optionKelamin: ["Laki-Laki", "Perempuan"],
      status: null,
      statusPinjam: 0,
      // statusPeminjaman: "meminjam",
      optionStatus: ["Aktif", "Tidak Aktif"],
      jumlahPinjaman: null,
    };
  },
  created() {
    this.getData();
    this.getStatusAktif();
    this.getPeminjaman();
  },
  methods: {
    openDialog(editMode, data) {
      this.editMode = editMode;
      if (editMode) {
        this.nama = data.nama;
        this.email = data.email;
        this.alamat = data.alamat;
        this.kelamin = data.kelamin;
        this.status = data.status;
        this.statusPinjam = data.statusPinjam;
        this.jumlahPinjaman = data.jumlahPinjaman;
        this.idActive = data._id;
      } else {
        this.nama = null;
        this.email = null;
        this.alamat = null;
        this.kelamin = null;
        this.status = null;
        this.statusPinjam = 0;
        this.jumlahPinjaman = null;
        this.idActive = null;
      }
      this.dialog = true;
    },
    resetDialog() {
      this.editMode = false;
      this.dialog = false;
    },
    onReset() {
      this.nama = null;
      this.email = null;
      this.alamat = null;
      this.kelamin = null;
      this.status = null;
      this.statusPinjam = 0;
      this.jumlahPinjaman = null;
    },
    onSubmit() {
      if (this.editMode) {
        this.$axios
          .put(`nasabah/edit/${this.idActive}`, {
            nama: this.nama,
            email: this.email,
            alamat: this.alamat,
            kelamin: this.kelamin,
            status: this.status,
            statusPinjam: this.statusPinjam,
            jumlahPinjaman: this.jumlahPinjaman,
          })
          .then((res) => {
            // console.log(res);
            if ((res.data.sukses = true)) {
              this.$successNotif(res.data.pesan, "positive");
            }
            this.getData();
            this.resetDialog();
            this.onReset();
          });
      } else {
        this.$axios
          .post("nasabah/add", {
            nama: this.nama,
            email: this.email,
            alamat: this.alamat,
            kelamin: this.kelamin,
            status: this.status,
            statusPinjam: this.statusPinjam,
            jumlahPinjaman: this.jumlahPinjaman,
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
      this.$axios.get("nasabah/getAll").then((res) => {
        if (res.data.sukses) {
          this.rows = res.data.data;
          // console.log(this.rows);
        }
      });
    },
    getStatusAktif() {
      this.$axios.get("nasabah/getStatusAktif").then((res) => {
        if (res.data.sukses) {
          this.aktif = res.data.data;
          console.log(this.aktif);
        }
      });
    },
    getPeminjaman() {
      this.$axios.get("peminjaman/getAll").then((res) => {
        if (res.data.sukses) {
          res.data.data.forEach((data) => {
            this.total = data.total;
          });
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
          this.$axios.delete(`nasabah/delete/${_id}`).then((res) => {
            if (res.data.sukses) {
              this.$successNotif(res.data.pesan, "positive");
            }
            this.getData();
          });
        });
    },
    exportTable() {
      const content = ["No Anggota; Nama; Email; Alamat; Kelamin; Status"]
        .concat(
          this.rows.map((row) => {
            return `${row.no_anggota};${row.nama};${row.email};${row.alamat};${row.kelamin};${row.status}`;
          })
        )
        .join("\r\n");
      const status = exportFile("daftar-nasabah.csv", content, "text/csv");
      if (status !== true) {
        this.$q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    },
  },
};
</script>
