<template>
  <q-page padding>
    <migade-pan />
    <div class="row q-pa-xl">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <formulario-meta :estaModoCrear="true" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { defineAsyncComponent, defineComponent } from "vue";

defineComponent({
  name: "CrearMeta",
});

const MigadePan = defineAsyncComponent(() =>
  import("src/components/MigadePan.vue")
);

const FormularioMeta = defineAsyncComponent(() =>
  import("src/components/Metas/FormularioMeta.vue")
);
</script>
