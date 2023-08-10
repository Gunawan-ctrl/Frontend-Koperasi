const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      authAdmin: true,
    },
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("pages/UnitKoperasi/IndexPage.vue"),
      },
      {
        path: "/nasabah",
        name: "nasabah",
        component: () => import("pages/UnitKoperasi/Nasabah.vue"),
      },
      {
        path: "/pendapatan",
        name: "pendapatan",
        component: () => import("pages/UnitKoperasi/Pendapatan.vue"),
      },
      {
        path: "/pengeluaran",
        name: "pengeluaran",
        component: () => import("pages/UnitKoperasi/Pengeluaran.vue"),
      },
      {
        path: "/peminjaman",
        name: "peminjaman",
        component: () => import("pages/UnitKoperasi/Peminjaman.vue"),
      },
      {
        path: "/data-laporan",
        name: "dataLaporan",
        component: () => import("pages/UnitKoperasi/laporan/DataLaporan.vue"),
      },
      {
        path: "/laporan-buku-bank",
        name: "laporanBukuBank",
        component: () => import("pages/UnitKoperasi/laporan/BukuBank.vue"),
      },
      {
        path: "/laporan-buku-besar",
        name: "laporanBukuBesar",
        component: () => import("pages/UnitKoperasi/laporan/BukuBesar.vue"),
      },
      {
        path: "/laporan-buku-pembantu-advance",
        name: "laporanBukuPembantuAdvance",
        component: () =>
          import("pages/UnitKoperasi/laporan/BukuPembantuAdvance.vue"),
      },
      {
        path: "/laporan-buku-pembantu-biaya",
        name: "laporanBukuPembantuBiaya",
        component: () =>
          import("pages/UnitKoperasi/laporan/BukuPembantuBiaya.vue"),
      },
      {
        path: "/laporan-buku-kas-kecil",
        name: "laporanBukuKasKecil",
        component: () => import("pages/UnitKoperasi/laporan/BukuKasKecil.vue"),
      },
      {
        path: "/laporan-rekonsiliasi-bank",
        name: "laporanRekonsiliasiBank",
        component: () =>
          import("pages/UnitKoperasi/laporan/RekonsiliasiBank.vue"),
      },
      {
        path: "/profil",
        name: "profil",
        component: () => import("pages/UnitKoperasi/lanjutan/ProfilPage.vue"),
      },
    ],
  },

  {
    path: "/",
    component: () => import("layouts/KopiLayout.vue"),
    meta: {
      authAdmin: true,
    },
    children: [
      {
        path: "/dashboard-kopi",
        name: "dashboardKopi",
        component: () => import("pages/UsahaKopi/Dashboard.vue"),
      },
      {
        path: "/penjualan-kopi",
        name: "penjualan",
        component: () => import("pages/UsahaKopi/Penjualan.vue"),
      },
      {
        path: "/pembelian-kopi",
        name: "pembelian",
        component: () => import("pages/UsahaKopi/Pembelian.vue"),
      },
      {
        path: "/pengeluaran-kopi",
        name: "pengeluaranKopi",
        component: () => import("pages/UsahaKopi/Pengeluaran.vue"),
      },
      {
        path: "/customer-kopi",
        name: "customer",
        component: () => import("pages/UsahaKopi/Customers.vue"),
      },
      {
        path: "/produk-kopi",
        name: "produk",
        component: () => import("pages/UsahaKopi/Produk.vue"),
      },
      {
        path: "/stok-kopi",
        name: "stok",
        component: () => import("pages/UsahaKopi/Stok.vue"),
      },
      {
        path: "/supplier-kopi",
        name: "supplier",
        component: () => import("pages/UsahaKopi/Supplier.vue"),
      },
      {
        path: "/inventaris-kopi",
        name: "inventaris",
        component: () => import("pages/UsahaKopi/Inventaris.vue"),
      },
    ],
  },
  {
    path: "/acces-pengguna",
    name: "accesPengguna",
    component: () => import("pages/Access/MenuAcces.vue"),
  },

  {
    path: "/login",
    name: "login",
    component: () => import("pages/Access/LoginPage.vue"),
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
