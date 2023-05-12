<template>
  <div class="q-pa-md">
    <q-card class="q-pa-xl q-mt-md">
      <div class="text-center text-h6 text-uppercase text-blue">
        Menu Akses Pengguna
      </div>
    </q-card>
  </div>
  <div class="row items-center justify-center q-col-gutter-md q-pa-md">
    <div class="col-md-6 col-sm-6 col-xs-12">
      <q-card class="bg-blue">
        <q-item clickable v-ripple :to="{ name: 'dashboard' }" class="q-pa-lg">
          <q-item-section avatar>
            <q-btn
              round
              color="blue-2"
              text-color="blue-8"
              icon="business_center"
              size="lg"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weight-bold q-mb-sm text-white text-h3">
              UNIT KOPERASI SRIKANDI
            </q-item-label>
          </q-item-section>
          <q-item-section v-if="$q.screen.lg || $q.screen.xl || $q.screen.md">
            <q-item-label class="text-white q-pa-md"
              >Silahkan masuk di menu akses pengguna unit koperasi srikandi
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
    </div>

    <div class="col-md-6 col-sm-6 col-xs-12">
      <q-card style="" class="bg-warning">
        <q-item
          clickable
          v-ripple
          :to="{ name: 'dashboardKopi' }"
          class="q-pa-lg"
        >
          <q-item-section avatar>
            <q-btn
              round
              color="blue-2"
              text-color="blue-8"
              icon="payments"
              size="lg"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weight-bold q-mb-sm text-white text-h3"
              >UNIT USAHA KOPI
            </q-item-label>
          </q-item-section>
          <q-item-section v-if="$q.screen.lg || $q.screen.xl || $q.screen.md">
            <q-item-label class="text-white">
              Silahkan masuk di menu akses pengguna unit usaha kopi
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
    </div>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Menu Access",
  data() {
    return {
      dataUser: this.$q.localStorage.getItem("dataUser"),
    };
  },
};
</script>

<style lang="sass" scoped></style>
