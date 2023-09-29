<template>
  <q-layout>
    <!-- <q-footer style="background: transparent; position: absolute;">
      <q-toolbar style="background: transparent;">
        <p class="text-grey-5">
          Copyright © - Juan Andrés Lema
        </p>
      </q-toolbar>
    </q-footer> -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>

import { defineComponent } from "vue";

defineComponent({
  name: 'LoginLayout'
})

</script>
