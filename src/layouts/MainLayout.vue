<template>
  <q-layout view="lHh Lpr lFf" class="bg">
    <q-header flat class="bg-transparent q-pa-md">
      <q-toolbar class="toolbarShadow" style="border-radius: 10px 10px 10px 10px">
        <q-btn flat dense round text-color="grey-7" icon="menu" aria-label="Menu" @click="toggleLeftDrawer"
          v-if="!leftDrawerOpen" />

        <q-space />

        <div class="q-pl-sm q-gutter-sm row items-center no-wrap flex">
          <div class="row flex flex-center absolute" style="right: 1vmax; top: -0.3vmax">
            <span v-if="morphGroupModel === 'btn'" class="text-grey-7">Opciones de usuario</span>
            <q-btn v-morph:btn:userGroup:300.resize="morphGroupModel" fab flat color="grey-7" icon="person"
              @click="nextMorph">
            </q-btn>
          </div>

          <q-card v-morph:card1:userGroup:500.resize="morphGroupModel" class="bg-white settingsMenu" flat>
            <q-card-section class="sectionShadow">
              <div class="row justify-between flex flex-center">
                <span class="text-grey-7">{{ email }}</span>
                <q-btn fab flat color="grey-7" icon="person" @click="nextMorph" />
              </div>

              <q-separator />

              <q-item clickable @click="logout">
                <q-item-section>
                  <div class="text-secondary">
                    <q-icon name="logout" color="grey-7" />
                    Salir
                  </div>
                </q-item-section>
              </q-item>
              <q-btn flat label="Cancel" text-color="secondary" @click="nextMorph" />
            </q-card-section>
          </q-card>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" style="background: #f2f6ff;" show-if-above>
      <q-scroll-area class="fit">
        <div class="q-pt-md q-pb-md">
          <q-btn flat no-caps no-wrap class="q-ml-xs" to="/main">
            <div class="flex flex-center">
              <q-avatar square text-color="white" style="width: 2.3vmax; height: 2.3vmax">
                <div style="z-index: 1000;">
                  <div class="row flex flex-center">
                    <img src="~assets/logo.png" style="width: 60%;" />
                  </div>
                </div>
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"
                  style="width: 100%; z-index: 0; position: absolute;">
                  <path fill="#F5ACFF"
                    d="M42.7,-77.8C53.2,-68,57.8,-52.1,63.2,-38.1C68.5,-24.1,74.4,-12,73.1,-0.8C71.8,10.5,63.2,21,56.2,32.2C49.3,43.4,44.1,55.3,35,65.6C25.9,75.9,12.9,84.6,1,82.8C-10.9,81,-21.8,68.9,-31.1,58.7C-40.4,48.5,-48.1,40.4,-57.4,30.9C-66.8,21.5,-77.8,10.7,-81,-1.9C-84.2,-14.5,-79.7,-28.9,-72.7,-42.5C-65.8,-56,-56.4,-68.7,-43.8,-77.2C-31.3,-85.8,-15.6,-90.2,0.3,-90.6C16.2,-91.1,32.3,-87.5,42.7,-77.8Z"
                    transform="translate(100 100)" />
                </svg>
              </q-avatar>
            </div>
            <q-toolbar-title shrink class="text-weight-bold flex flex-center">
              <span class="text-secondary" style="font-size: 1.8vh">Alcancia Virtual</span>
            </q-toolbar-title>
          </q-btn>
        </div>

        <q-item>
          <q-item-section>
            <q-separator class="q-mt-md q-mb-xs" color="grey-4" />
          </q-item-section>
        </q-item>

        <q-list padding>
          <div class="text-primary q-pl-lg q-pt-md" v-if="links1.length > 0">
            OPCIONES
          </div>
          <EssentialLink v-for="link in links1" :key="link.text" v-bind="link" />

          <q-item>
            <q-item-section>
              <q-separator v-if="links2.length > 0" class="q-mt-md q-mb-xs" color="grey-4" />
            </q-item-section>
          </q-item>

          <EssentialLink v-for="link in links2" :key="link.text" v-bind="link" />

          <q-item>
            <q-item-section>
              <q-separator v-if="links2.length > 0" class="q-mt-md q-mb-xs" color="grey-4" />
            </q-item-section>
          </q-item>

          <EssentialLink v-for="link in links3" :key="link.text" v-bind="link" />
        </q-list>

      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, defineAsyncComponent, computed, onMounted } from "vue";
import { useAuthStore } from "stores/auth-store";
import { useRoutesStore } from "stores/routes-store.js";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const EssentialLink = defineAsyncComponent(() =>
  import("../components/EssentialLink.vue")
);

const router = useRouter();
const $q = useQuasar();
const leftDrawerOpen = ref(true);
const autenticacionStore = useAuthStore();
const routesStore = useRoutesStore();
const morphGroupModel = ref("btn");

const nextMorphStep = {
  btn: "card1",
  card1: "btn",
};

function nextMorph() {
  morphGroupModel.value = nextMorphStep[morphGroupModel.value];
}

const links1 = ref([
  {
    text: 'Home',
    caption: 'home',
    icon: 'home',
    link: '/main'
  },
  {
    text: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: '/'
  },
  {
    text: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: '/'
  },
  {
    text: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: '/'
  },
  {
    text: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: '/'
  },
  {
    text: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: '/'
  },
  {
    text: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: '/'
  }
])

const links2 = ref([])
const links3 = ref([])
const email = computed({
  get() {
    if (autenticacionStore.responseAuth != null) {
      return autenticacionStore.email;
    } else {
      return "";
    }
  },
});
const nombre = computed({
  get() {
    if (autenticacionStore.responseAuth != null) {
      return autenticacionStore.nombre;
    } else {
      return "";
    }
  },
});

onMounted(() => {
  routesStore.linkActualMenu = [];
  routesStore.linkActualMenu.push(router.currentRoute.value.path);
});

function logout() {
  $q.loading.show({
    message: "Saliendo ...",
  });
  autenticacionStore
    .logout()
    .then(() => {
      routesStore.linkActualMenu = [];
      router.push("/");
    })
    .finally(() => {
      $q.loading.hide();
    });
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style lang="scss" scoped>
.bg {
  background-color: #f2f6ff;
}

.textoEmail {
  font-size: 0.8vmax;
}

.settingsMenu {
  width: 300px;
  border-radius: 2em;
  right: 1vmax;
  top: 0vmax;
  position: absolute;
}

.sectionShadow {
  -webkit-box-shadow: -1px 14px 24px -5px rgba(57, 66, 196, 0.5);
  box-shadow: -1px 14px 24px -5px rgba(11, 19, 138, 0.2);
}

.toolbarShadow {
  background: #fff;
  box-shadow: 0 .3125rem .625rem #0000001f !important;
}
</style>
