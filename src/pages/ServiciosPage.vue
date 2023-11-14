<template>
  <q-page padding>
    <migade-pan />
    <div class="row q-pa-xl">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <listado-servicios />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { defineAsyncComponent } from "vue";

const MigadePan = defineAsyncComponent(() =>
  import("src/components/MigadePan.vue")
);

const ListadoServicios = defineAsyncComponent(() =>
  import("src/components/Servicios/ListadoServicios.vue")
);
</script>
