<template>
  <q-page padding>
    <migade-pan />
    <div class="row q-pa-xl">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <formulario-servicio :estaModoCrear="true" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { defineAsyncComponent, defineComponent } from "vue";

defineComponent({
  name: "CrearServicio",
});

const MigadePan = defineAsyncComponent(() =>
  import("src/components/MigadePan.vue")
);

const FormularioServicio = defineAsyncComponent(() =>
  import("src/components/Servicios/FormularioServicio.vue")
);
</script>
