<template>
  <q-page class="bg-grey-3">
    <div class="q-pa-md">
      <q-card class="q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-8" active-color="black">
          <q-breadcrumbs-el label="Master Laporan" icon="widgets" />
          <q-breadcrumbs-el label="Data Laporan" icon="description" />
        </q-breadcrumbs>
      </q-card>
      <div class="row items-center q-col-gutter-md q-pt-md">
        <div class="col-md-6 col-xs-12">
          <q-card class="my-card" bordered>
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-overline">Laporan</div>
                <div class="text-h5 q-mt-sm q-mb-xs">Buku Bank</div>
                <div class="text-caption text-grey">
                  Menampilkan catatan penerimaan dan pengeluaran melalui
                  rekening bank.
                </div>
              </q-card-section>

              <q-card-section class="col-5 flex flex-center">
                <q-icon
                  name="trending_up"
                  class="rounded-borders"
                  style="font-size: 120px; color: #588157"
                />
              </q-card-section>
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-btn @click="bukuBank()" flat class="text-blue-7">
                Lihat Laporan
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
        <div class="col-md-6 col-xs-12">
          <q-card class="my-card" bordered>
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-overline">Laporan</div>
                <div class="text-h5 q-mt-sm q-mb-xs">Buku Besar</div>
                <div class="text-caption text-grey">
                  Menampilkan catatan semua transaksi dalam bentuk jurnal untuk
                  masing-masing transaksi dalam suatu periode
                </div>
              </q-card-section>

              <q-card-section class="col-5 flex flex-center">
                <q-icon
                  name="trending_up"
                  class="rounded-borders"
                  style="font-size: 120px; color: #588157"
                />
              </q-card-section>
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-btn @click="bukuBesar()" flat class="text-blue-7">
                Lihat Laporan
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
        <div class="col-md-6 col-xs-12">
          <q-card class="my-card" bordered>
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-overline">Laporan</div>
                <div class="text-h5 q-mt-sm q-mb-xs">Buku Pembantu Advance</div>
                <div class="text-caption text-grey">
                  Menampilkan catatan semua pencairan advance
                </div>
              </q-card-section>

              <q-card-section class="col-5 flex flex-center">
                <q-icon
                  name="trending_up"
                  class="rounded-borders"
                  style="font-size: 120px; color: #588157"
                />
              </q-card-section>
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-btn @click="bukuPembantuAdvance()" flat class="text-blue-7">
                Lihat Laporan
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
        <div class="col-md-6 col-xs-12">
          <q-card class="my-card" bordered style="height: 225px">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-overline">Laporan</div>
                <div class="text-h5 q-mt-sm q-mb-xs">Buku Pembantu Biaya</div>
                <div class="text-caption text-grey">
                  Menampilkan catatan semua pengeluaran / biaya yang terjadi
                  baik atas dana yang dicairkan melalui mekanisme advance atau
                  non advance
                </div>
              </q-card-section>

              <q-card-section class="col-5 flex flex-center">
                <q-icon
                  name="trending_up"
                  class="rounded-borders"
                  style="font-size: 120px; color: #588157"
                />
              </q-card-section>
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-btn @click="bukuPembantuBiaya()" flat class="text-blue-7">
                Lihat Laporan
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
        <div class="col-md-6 col-xs-12">
          <q-card class="my-card" bordered style="height: 225px">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-overline">Laporan</div>
                <div class="text-h5 q-mt-sm q-mb-xs">Buku Kas Kecil</div>
                <div class="text-caption text-grey">
                  Menampilkan catatan pengeluaran dibawah nilai kas kecil yang
                  disepakati oleh masing-masing lembaga terkait untuk
                  pengeluaran operasional kantor.
                </div>
              </q-card-section>

              <q-card-section class="col-5 flex flex-center">
                <q-icon
                  name="trending_up"
                  class="rounded-borders"
                  style="font-size: 120px; color: #588157"
                />
              </q-card-section>
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-btn @click="bukuKasKecil()" flat class="text-blue-7">
                Lihat Laporan
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
        <div class="col-md-6 col-xs-12">
          <q-card class="my-card" bordered style="height: 245px">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-overline">Laporan</div>
                <div class="text-h5 q-mt-sm q-mb-xs">Rekonsiliasi Bank</div>
                <div class="text-caption text-grey">
                  Untuk menyamakan antara pencatatan bank yang tertera di Bank
                  Statement / Rekening Koran dengan pencatatan pembukuan oleh
                  organisasi. Rekonsiliasi dilakukan di akhir periode setiap
                  bulan.
                </div>
              </q-card-section>

              <q-card-section class="col-5 flex flex-center">
                <q-icon
                  name="trending_up"
                  class="rounded-borders"
                  style="font-size: 120px; color: #588157"
                />
              </q-card-section>
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-btn @click="rekonsiliasiBank()" flat class="text-blue-7">
                Lihat Laporan
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "DataLaporan",
  data() {
    return {};
  },
  methods: {
    bukuBesar() {
      this.$router.push({ name: "laporanBukuBesar" });
    },
    bukuBank() {
      this.$router.push({ name: "laporanBukuBank" });
    },
    bukuPembantuAdvance() {
      this.$router.push({ name: "laporanBukuPembantuAdvance" });
    },
    bukuPembantuBiaya() {
      this.$router.push({ name: "laporanBukuPembantuBiaya" });
    },
    bukuKasKecil() {
      this.$router.push({ name: "laporanBukuKasKecil" });
    },
    rekonsiliasiBank() {
      this.$router.push({ name: "laporanRekonsiliasiBank" });
    },
  },
};
</script>
