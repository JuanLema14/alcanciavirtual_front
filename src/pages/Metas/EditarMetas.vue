<template>
  <q-page padding>
    <migade-pan />
    <div class="row q-pa-xl">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <formulario-meta
          :idMeta="idMeta"
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
  name: "EditarMeta",
});

const MigadePan = defineAsyncComponent(() =>
  import("src/components/MigadePan.vue")
);

const FormularioMeta = defineAsyncComponent(() =>
  import("src/components/Metas/FormularioMeta.vue")
);

const route = useRoute();

const idMeta = ref(null);

onMounted(() => {
  idMeta.value = +window.atob(route.params.idMeta);
});
</script>
