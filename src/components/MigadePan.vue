<template>
  <q-card class="row bg sectionShadow">
    <q-card-section
      fit
      class="flex flex-center bg-white"
      style="border-radius: 20px 35px 35px 20px; cursor: pointer"
      @click="router.push('/main')"
    >
      <div>
        <q-avatar size="3vmax" icon="home" text-color="primary" />
      </div>
    </q-card-section>
    <q-card-section
      fit
      class="flex flex-center routeBox"
      style="border-radius: 0px 35px 35px 0px; cursor: pointer; width: fit-content;"
      v-for="ruta in rutaMigaDepan"
      :key="ruta"
      v-show="ruta !== 'main' && ruta !== ''"
      @click="irAlLink(ruta)"
    >
      <div style="text-align: center;">
        <span class="text-primary" style="font-size: 1.2vmax;">
          {{ ruta }}
        </span>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const rutaMigaDepan = computed({
  get() {
    const params = route.params
    if (Object.keys(params).length > 0) {
      const pathArray = router.currentRoute.value.path.split("/");
      return pathArray.slice(0, -1);
    }else {
      return router.currentRoute.value.path.split("/");
    }
  },
});

function irAlLink(ruta) {
  let cadena = router.currentRoute.value.path;
  const partes = cadena.split("/");
  const sizePartes = partes.length
  const indice = partes.indexOf(ruta);

  if (indice !== -1) {
    const params = route.params
    partes.length = indice + 1;
    if (Object.keys(params).length > 0 && indice === sizePartes - 2) {
      router.push(router.currentRoute.value.fullPath);
    } else {
      router.push(partes.join("/"));
    }
  }
}

</script>

<style scoped>
.routeBox {
  width: 10vmax;
  background: rgb(248, 249, 252);
  background: linear-gradient(
    90deg,
    rgba(248, 249, 252, 1) 0%,
    rgba(255, 255, 255, 1) 68%
  );
  border-radius: 0px 40px 40px 0px;
}

.bg {
  background: #f8f9fc;
  border-radius: 20px;
}

.sectionShadow {
  -webkit-box-shadow: -1px 14px 24px -5px rgba(57, 66, 196, 0.5);
  box-shadow: -1px 14px 24px -5px rgba(11, 19, 138, 0.2);
}
</style>
