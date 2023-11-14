<template>
  <q-card class="sectionShadow" style="border-radius: 10px 10px 10px 10px">
    <q-form
      @submit="accionFormulario"
      @reset="limpiarFormulario"
      class="q-gutter-md"
    >
      <div class="q-pb-md">
        <q-toolbar class="row justify-between">
          <div class="row flex flex-center">
            <q-avatar round color="white" text-color="primary" size="3vmax">
              <q-icon name="medical_information" />
            </q-avatar>
            <div class="text-weight-bold text-secondary q-pl-sm text-h6">
              Formulario de Metas
            </div>
          </div>
          <div>
            <q-btn
              type="submit"
              class="full-width botonDegradado"
              rounded
              text-color="white"
              label="Actualizar"
            />
          </div>
        </q-toolbar>
      </div>

      <q-separator />

      <div class="row q-col-gutter-sm">

      </div>
    </q-form>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useMetasStore } from "stores/metas-store";

const props = defineProps({
  estaModoCrear: {
    type: Boolean,
    default: false,
  },
  idMeta: {
    type: Number,
  },
});

const metasStore = useMetasStore();
const $q = useQuasar();

const metaConsultada = ref({});

const ocionesImpresoraUrgente = ref([{ value: "", label: "" }]);

onMounted(async() => {
  try {
    if (!props.estaModoCrear) {
      metaConsultada.value = await metasStore.consultarMeta(props.idMeta);
      console.log(metaConsultada.value);
    }
  } catch (error) {
    $q.notify({
      progress: true,
      message: "Ha ocurrido un error: " + error.message,
      color: "warning",
      icon: "warning",
      textColor: "white",
      multiLine: true,
    });
  }
});

function accionFormulario() {
  if (props.estaModoCrear) {
    editarMeta();
  } else {
    crearMeta();
  }
}

function limpiarFormulario() {}

function editarMeta() {}

function crearMeta() {}
</script>

<style scoped>
.botonDegradado {
  background: rgb(181, 115, 255);
  background: linear-gradient(
    114deg,
    rgba(181, 115, 255, 1) 27%,
    rgba(76, 0, 161, 1) 100%
  );
}

.sectionShadow {
  -webkit-box-shadow: -1px 14px 24px -5px rgba(57, 66, 196, 0.5);
  box-shadow: -1px 14px 24px -5px rgba(11, 19, 138, 0.2);
}
</style>
