<template>
  <q-page padding>
    <migade-pan />
    <div class="row q-pa-xl">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <formulario-servicio
          :idServicio="idServicio"
          :estaModoCrear="false"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { defineAsyncComponent, onMounted, ref, defineComponent } from "vue";
import { useRoute } from "vue-router";

defineComponent({
  name: "EditarServicio",
});

const MigadePan = defineAsyncComponent(() =>
  import("src/components/MigadePan.vue")
);

const FormularioServicio = defineAsyncComponent(() =>
  import("src/components/Servicios/FormularioServicio.vue")
);

const route = useRoute();

const idServicio = ref(null);

onMounted(() => {
  idServicio.value = +window.atob(route.params.idServicio);
});
</script>
