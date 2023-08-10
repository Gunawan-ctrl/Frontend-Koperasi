<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-brown-1">
      <q-toolbar>
        <q-btn
          @click="leftDrawerOpen = !leftDrawerOpen"
          flat
          round
          dense
          class="text-black"
          icon="menu"
        />
        <q-space />
        <q-btn-dropdown
          flat
          size="md"
          icon="manage_accounts"
          color="black"
          label="Administrator"
        >
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-sm">Settings</div>
              <q-btn
                color="brown"
                outline
                label="Akses Pengguna"
                :to="{ name: 'accesPengguna' }"
                size="sm"
                v-close-popup
              />
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
              <q-avatar size="72px">
                <img src="~assets/logo_gapari.png" />
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs text-weight-bold">
                Gunawan
              </div>

              <q-btn
                color="brown"
                outline
                label="Logout"
                @click="logout()"
                size="sm"
                v-close-popup
              />
            </div>
          </div>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="sentiment_very_dissatisfied" text-color="primary" />
          <span class="q-ml-sm">Apakah anda yakin untuk keluar ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat :to="{ name: 'dash' }" label="Logout" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="300"
      :breakpoint="400"
    >
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item
            clickable
            :to="{ name: 'dashboardKopi' }"
            v-ripple
            active-class="active"
          >
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section> Dashboard </q-item-section>
          </q-item>

          <q-item>
            <q-item-section> MAIN MENU </q-item-section>
          </q-item>

          <q-item
            clickable
            :to="{ name: 'penjualan' }"
            v-ripple
            active-class="active"
          >
            <q-item-section avatar>
              <q-icon name="storefront" />
            </q-item-section>
            <q-item-section> Penjualan </q-item-section>
          </q-item>

          <q-item
            clickable
            :to="{ name: 'pembelian' }"
            v-ripple
            active-class="active"
          >
            <q-item-section avatar>
              <q-icon name="shopping_bag" />
            </q-item-section>
            <q-item-section> Pembelian </q-item-section>
          </q-item>

          <q-item
            clickable
            :to="{ name: 'pengeluaranKopi' }"
            v-ripple
            active-class="active"
          >
            <q-item-section avatar>
              <q-icon name="price_change" />
            </q-item-section>
            <q-item-section> Pengeluaran </q-item-section>
          </q-item>

          <q-expansion-item
            expand-separator
            icon="extension"
            label="Data Barang"
            :content-inset-level="1"
          >
            <q-item
              clickable
              :to="{ name: 'produk' }"
              v-ripple
              active-class="active"
            >
              <q-item-section avatar>
                <q-icon name="category" />
              </q-item-section>
              <q-item-section> Produk </q-item-section>
            </q-item>

            <q-item
              clickable
              :to="{ name: 'inventaris' }"
              v-ripple
              active-class="active"
            >
              <q-item-section avatar>
                <q-icon name="beenhere" />
              </q-item-section>
              <q-item-section> Inventaris </q-item-section>
            </q-item>

            <q-item
              clickable
              :to="{ name: 'stok' }"
              v-ripple
              active-class="active"
            >
              <q-item-section avatar>
                <q-icon name="inventory_2" />
              </q-item-section>
              <q-item-section> Stok</q-item-section>
            </q-item>
          </q-expansion-item>

          <q-item>
            <q-item-section> EXTRAS </q-item-section>
          </q-item>

          <q-expansion-item
            expand-separator
            icon="groups"
            label="Mitra"
            :content-inset-level="1"
          >
            <q-item
              clickable
              :to="{ name: 'supplier' }"
              v-ripple
              active-class="active"
            >
              <q-item-section avatar>
                <q-icon name="local_shipping" />
              </q-item-section>
              <q-item-section> Supplier</q-item-section>
            </q-item>

            <q-item
              clickable
              :to="{ name: 'customer' }"
              v-ripple
              active-class="active"
            >
              <q-item-section avatar>
                <q-icon name="account_circle" />
              </q-item-section>
              <q-item-section> Customer </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-item
            clickable
            :to="{ name: 'laporan' }"
            v-ripple
            active-class="active"
          >
            <q-item-section avatar>
              <q-icon name="summarize" />
            </q-item-section>

            <q-item-section> Laporan </q-item-section>
          </q-item>

          <q-item
            @click="confirm = true"
            clickable
            v-ripple
            active-class="active"
          >
            <q-item-section avatar>
              <q-icon name="sentiment_very_dissatisfied" />
            </q-item-section>

            <q-item-section> Sign Out </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="./../../public/images/banner/Kopi-background.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="~assets/logo_gapari.png" />
          </q-avatar>
          <div claSs="text-black text-h6">Administrator</div>
          <div class="text-brown-7">@admin_usahaKopi</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { LocalStorage } from "quasar";
export default {
  name: "KopiLayout",
  data() {
    return {
      leftDrawerOpen: false,
      confirm: false,
    };
  },
  methods: {
    logout() {
      // LocalStorage.remove("user", { path: "/auth" });
      this.$router.push({ name: "login" });
    },
  },
};
</script>
<style scoped>
body.body--dark {
  background: #333333;
}
.active {
  color: #9f8170;
  font-weight: bold;
}
</style>
