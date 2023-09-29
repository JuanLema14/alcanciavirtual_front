<template>
  <div>
    <q-card flat>
      <q-toolbar class="info_card">
        <q-avatar square>
          <img src="~assets/logo_w.png" />
        </q-avatar>
        <q-toolbar-title>
          <span class="text-white text-weight-bold">Alcancia Virtual</span>
        </q-toolbar-title>
        <q-btn round v-if="cancelar" class="card2 text-white" flat icon="cancel" @click="$emit('ocultarAviso', false)">
        </q-btn>
      </q-toolbar>

      <q-separator />

      <q-card-section>
        <div class="text-subtitle1">
          {{ texto }}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>

const props = defineProps({
  texto: { type: String },
  cancelar: { type: Boolean },
})
</script>

<style scoped>
.info_card {
  background: rgb(244, 190, 255);
  background: linear-gradient(156deg, rgba(244, 190, 255, 1) 21%, rgba(132, 74, 180, 1) 91%);
}
</style>
