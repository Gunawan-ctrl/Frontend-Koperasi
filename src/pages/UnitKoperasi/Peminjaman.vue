<template>
  <q-page class="bg-grey-3">
    <div class="q-pa-md">
      <q-card class="q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-8" active-color="black">
          <q-breadcrumbs-el label="Master Data" icon="widgets" />
          <q-breadcrumbs-el label="Peminjaman" icon="payments" />
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
                <div class="text-weight-bold">PEMINJAMAN</div>
                <div>Daftar semua peminjaman pada saat ini</div>
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
                <q-td key="tanggal" :props="props">
                  {{
                    new Date(props.row.tanggal).toLocaleDateString("id", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  }}
                </q-td>
                <q-td key="namaPeminjam" :props="props">
                  {{ props.row.nasabahSrikandi.nama }}
                </q-td>
                <q-td key="keterangan" :props="props">
                  {{ props.row.keterangan }}
                </q-td>
                <q-td key="jumlah" :props="props">
                  {{ props.row.jumlah }}
                </q-td>
                <q-td key="bunga" :props="props">
                  {{ props.row.bunga }} %
                </q-td>
                <q-td key="total" :props="props">
                  {{ props.row.total }}
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
              <q-icon name="payments" size="30px" color="blue-7" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weight-bold text-uppercase">
              Input /Edit Peminjaman
            </q-item-label>
            <q-item-label caption>
              Input atau edit data peminjaman
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
              <q-select
                option-label="nama"
                key="namaPeminjam"
                :options="optionPeminjam"
                dense
                v-model="namaPeminjam"
                outlined
                label="Nama Peminjam"
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section>
                      <q-item-label caption>
                        {{ scope.opt.nama }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
              <q-input dense v-model="keterangan" outlined label="Keterangan" />
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
                v-model="bunga"
                outlined
                label="Bunga (%)"
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
const columns = [
  {
    name: "tanggal",
    label: "Tanggal",
    field: "tanggal",
    align: "left",
  },
  {
    name: "namaPeminjam",
    label: "Nama Peminjam",
    field: "namaPeminjam",
    align: "left",
  },
  {
    name: "keterangan",
    label: "Keterangan",
    field: "keterangan",
    align: "left",
  },
  {
    name: "jumlah",
    label: "Jumlah",
    field: "jumlah",
    align: "left",
  },
  {
    name: "bunga",
    label: "Bunga (%)",
    field: "bunga",
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
  name: "PeminjamanPage",

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
      jumlahPinjaman: null,
      tanggal: null,
      optionPeminjam: [],
      namaPeminjam: null,
      keterangan: null,
      jumlah: null,
      bunga: null,
      idNasabah: null,
      statusPinjam: 1,
      // total: null,
      // total: (this.jumlah * this.bunga) / 100 + this.jumlah,
    };
  },
  created() {
    this.getData();
    this.getPeminjam();
  },
  methods: {
    openDialog(editMode, data) {
      this.editMode = editMode;
      if (editMode) {
        this.tanggal = data.tanggal;
        this.namaPeminjam = data.namaPeminjam;
        this.keterangan = data.keterangan;
        this.jumlah = data.jumlah;
        this.bunga = data.bunga;
        this.total = data.total;
        // this.idNasabah = data.idNasabah;
        this.idActive = data._id;
      } else {
        this.tanggal = null;
        this.namaPeminjam = null;
        this.keterangan = null;
        this.jumlah = null;
        this.bunga = null;
        this.total = null;
        // this.idNasabah = null;
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
      this.namaPeminjam = null;
      this.keterangan = null;
      this.jumlah = null;
      this.bunga = null;
      this.total = null;
      // this.idNasabah = null;
    },
    onSubmit() {
      if (this.editMode) {
        this.$axios
          .put(`peminjaman/edit/${this.idActive}`, {
            tanggal: this.tanggal,
            namaPeminjam: this.namaPeminjam,
            keterangan: this.keterangan,
            jumlah: this.jumlah,
            bunga: this.bunga,
            total: this.total,
            // idNasabah: this.namaPeminjam._id,
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
        const payload = {
          tanggal: this.tanggal,
          keterangan: this.keterangan,
          jumlah: this.jumlah,
          bunga: this.bunga,
          total: this.total,
          pendapatan: this.pendapatan,
          idNasabah: this.namaPeminjam._id,
        };
        console.log(payload);
        this.$axios.post("peminjaman/add", payload).then((res) => {
          if ((res.data.sukses = true)) {
            this.$successNotif(res.data.pesan, "positive");
          }
          this.dialog = false;
          this.getData();
        });
      }
    },
    getData() {
      this.$axios.get("peminjaman/getAll").then((res) => {
        if (res.data.sukses) {
          this.rows = res.data.data;
          console.log(this.rows);
        }
      });
    },
    getPeminjam() {
      this.$axios.get("nasabah/getAll").then((res) => {
        if (res.data.sukses) {
          this.optionPeminjam = res.data.data;
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
          this.$axios.delete(`peminjaman/delete/${_id}`).then((res) => {
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
      return (
        (parseInt(this.jumlah) * parseInt(this.bunga)) / 100 +
        parseInt(this.jumlah)
      );
    },
    pendapatan() {
      return (this.jumlah * this.bunga) / 100;
    },
  },
};
</script>
