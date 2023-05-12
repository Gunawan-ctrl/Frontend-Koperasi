<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered>
      <q-toolbar>
        <q-btn
          @click="leftDrawerOpen = !leftDrawerOpen"
          flat
          dense
          round
          icon="menu"
        />

        <q-space />

        <q-btn-dropdown
          flat
          size="md"
          icon="manage_accounts"
          color="white"
          label="Administrator"
        >
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-sm">Settings</div>
              <q-btn
                color="primary"
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
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs text-weight-bold">
                {{ dataUser.username }}
              </div>

              <q-btn
                color="primary"
                outline
                label="Logout"
                @click="logout()"
                push
                size="sm"
                v-close-popup
              />
            </div>
          </div>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="280">
      <div class="q-mt-md q-ml-md">
        <q-btn dense flat round icon="lens" size="8.5px" color="blue" />
        <q-btn dense flat round icon="lens" size="8.5px" color="green" />
        <q-btn dense flat round icon="lens" size="8.5px" color="orange-6" />
      </div>
      <q-list>
        <q-card flat class="text-justify q-py-md">
          <q-item>
            <q-item-section avatar>
              <q-avatar rounded>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-subtitle2 text-weight-bold">
                Koperasi Apps
              </q-item-label>
              <q-item-label class="text-grey text-overline">
                {{ dataUser.username }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
        <q-item
          clickable
          active-class="active"
          v-ripple
          :to="{ name: 'dashboard' }"
        >
          <q-item-section avatar>
            <q-icon name="home" size="sm" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section class="text-blue-8 text-weight-bold">
            MASTER DATA
          </q-item-section>
        </q-item>

        <q-item
          clickable
          active-class="active"
          v-ripple
          :to="{ name: 'pengeluaran' }"
        >
          <q-item-section avatar>
            <q-icon name="price_change" size="sm" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Pengeluaran</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          active-class="active"
          v-ripple
          :to="{ name: 'peminjaman' }"
        >
          <q-item-section avatar>
            <q-icon name="payments" size="sm" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Peminjaman</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          active-class="active"
          v-ripple
          :to="{ name: 'pendapatan' }"
        >
          <q-item-section avatar>
            <q-icon name="business_center" size="sm" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Pendapatan</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          active-class="active"
          v-ripple
          :to="{ name: 'nasabah' }"
        >
          <q-item-section avatar>
            <q-icon name="group_add" size="sm" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Nasabah</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section class="text-blue-8 text-weight-bold">
            MASTER LAPORAN
          </q-item-section>
        </q-item>

        <q-item
          clickable
          active-class="active"
          :to="{ name: 'dataLaporan' }"
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="description" />
          </q-item-section>
          <q-item-section> Data Laporan </q-item-section>
        </q-item>

        <q-item>
          <q-item-section class="text-blue-8 text-weight-bold">
            MASTER LANJUTAN
          </q-item-section>
        </q-item>

        <q-item
          clickable
          active-class="active"
          v-ripple
          :to="{ name: 'profil' }"
        >
          <q-item-section avatar>
            <q-icon name="manage_accounts" size="sm" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Profil</q-item-label>
          </q-item-section>
        </q-item>

        <q-item @click="logout()" clickable active-class="active" v-ripple>
          <q-item-section avatar>
            <q-icon name="logout" size="sm" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Logout</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from "quasar";

export default {
  name: "MainLayout",
  components: {},
  data() {
    const $q = useQuasar();
    return {
      leftDrawerOpen: false,
      konfirm: false,
      info: null,
      dataUser: this.$q.localStorage.getItem("dataUser"),
    };
  },
  methods: {
    logout() {
      this.$q.localStorage.clear();
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
  color: #1976d2;
  font-weight: bold;
}
</style>
