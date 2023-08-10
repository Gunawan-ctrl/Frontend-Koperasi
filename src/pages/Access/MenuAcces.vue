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
      <q-card
        class="my-card flex text-subtitle2"
        style="
          height: 230px;
          background-image: url('https://img.freepik.com/free-photo/aerial-view-business-team_53876-124515.jpg?w=1060&t=st=1683967254~exp=1683967854~hmac=5cffe1934af24abf8d6a6618dd9199876199c0241c13b3f42ee0160dcb9e28e2');
          background-repeat: no-repeat;
          background-size: cover;
        "
      >
        <q-item clickable v-ripple :to="{ name: 'dashboard' }" class="q-pa-lg">
          <q-item-section avatar>
            <q-btn
              round
              color="white"
              text-color="brown"
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
      <q-card
        class="my-card flex text-indigo-10 text-subtitle2"
        style="
          height: 230px;
          background-image: url('images/banner/Kopi-background.png');
          background-repeat: no-repeat;
          background-size: cover;
        "
      >
        <q-item
          clickable
          v-ripple
          :to="{ name: 'dashboardKopi' }"
          class="q-pa-lg"
        >
          <q-item-section avatar>
            <q-btn
              round
              color="white"
              text-color="brown"
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
