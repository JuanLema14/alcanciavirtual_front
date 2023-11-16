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
              <q-icon name="shopping_cart" />
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

      <div class="row q-col-gutter-sm q-pa-sm">
        <div
          class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row q-pa-sm q-col-gutter-md"
        >
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <div class="q-pa-md">
              <span class="text-subtitle2 text-grey-8">Nombre</span>
            </div>
            <q-input
              rounded
              standout="bg-grey-5 text-white"
              v-model="descripcionMeta"
              label="Nombre de la meta"
              bg-color="grey-4"
              :rules="[(val) => val.length > 0 || 'Escriba un nombre valido']"
            />
          </div>
        </div>

        <div
          class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row q-pa-sm q-col-gutter-md"
        >
          <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
            <div class="q-pa-md">
              <span class="text-subtitle2 text-grey-8">Cantidad</span>
            </div>
            <q-input
              mask="###.###.###.###.###.###.###.###.###.###"
              maxlength="21"
              reverse-fill-mask
              unmasked-value
              rounded
              standout="bg-grey-5 text-white"
              v-model="cantidadMeta"
              label="Cantidad de la meta"
              bg-color="grey-4"
              :rules="[(val) => +val > 0 || 'Ingrese una cantidad real']"
            />
          </div>
          <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
            <div class="q-pa-md">
              <span class="text-subtitle2 text-grey-8">Estado</span>
            </div>
            <q-select
              rounded
              standout="bg-grey-5 text-white"
              v-model="estadoMeta"
              label="Estado de la meta"
              :options="opcionesEstadoMeta"
              option-value="value"
              option-label="label"
              bg-color="grey-4"
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section>
                    <div class="row">
                      <q-badge
                        style="border-radius: 50%; width: 1vmax"
                        :class="verificarEstadoBadge(scope.opt.value)"
                      />
                      <q-item-label class="q-pl-sm">
                        {{ scope.opt.label }}
                      </q-item-label>
                    </div>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>

        <div
          class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row q-pa-sm q-col-gutter-md"
        >
        <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
            <div class="q-pa-md">
              <span class="text-subtitle2 text-grey-8">Cantidad Abono</span>
            </div>
            <q-input
              mask="###.###.###.###.###.###.###.###.###.###"
              maxlength="21"
              reverse-fill-mask
              unmasked-value
              rounded
              standout="bg-grey-5 text-white"
              v-model="cantidadAbonadaMeta"
              label="Cantidad abonada a la meta"
              bg-color="grey-4"
            />
          </div>

          <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
            <div class="q-pa-md">
              <span class="text-subtitle2 text-grey-8">Fecha esperada</span>
            </div>
            <q-input
              rounded
              standout="bg-grey-5 text-white"
              v-model="fechaEsperada"
              label="Fecha esperada de la meta"
              mask="date"
              bg-color="grey-4"
            >
              <template v-slot:append>
                <q-icon name="event" color="primary" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date :locale="fechaEs" v-model="fechaEsperada" minimal>
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Cerrar"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>

      </div>
    </q-form>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useMetasStore } from "stores/metas-store";
import { useRouter } from "vue-router";

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
const router = useRouter();

const metaConsultada = ref({});
const descripcionMeta = ref("");
const cantidadMeta = ref();
const estadoMeta = ref("");
const cantidadAbonadaMeta = ref(0);
const fechaEsperada = ref();

const opcionesEstadoMeta = ref([
  { value: "Completado", label: "Completada!" },
  { value: "Iniciado", label: "Meta Iniciada" },
  { value: "Cancelado", label: "Cancelada" },
]);

onMounted(async () => {
  try {
    if (!props.estaModoCrear) {
      metaConsultada.value = await metasStore.consultarMeta(
        props.idMeta
      );

      descripcionMeta.value = metaConsultada.value.descripcion_meta;
      cantidadMeta.value = metaConsultada.value.cantidad_meta;
      estadoMeta.value = metaConsultada.value.estado;
      cantidadAbonadaMeta.value = metaConsultada.value.cantidad_abonada;
      fechaEsperada.value = metaConsultada.value.fecha_esperada;
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

function verificarEstadoBadge(estado) {
  let colorClass = "";
  switch (estado) {
    case "Completado":
      colorClass = "q-pa-xs ColorCo";
      break;

    case "Iniciado":
      colorClass = "q-pa-xs ColorIn";
      break;

    case "Cancelado":
      colorClass = "q-pa-xs ColorCan";
      break;

    default:
      colorClass = "q-pa-xs ColorDF";
      break;
  }
  return colorClass;
}


const fechaEs = ref({
  months: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  days: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ],
});

const convertirFecha = (fecha) => {
  const partes = fecha.split('/');
  const fechaFormateada = `${partes[0]}-${partes[1]}-${partes[2]}T00:00:00`;
  return fechaFormateada;
};

function accionFormulario() {
  if (props.estaModoCrear) {
    crearMeta();
  } else {
    editarMeta();
  }
}

function limpiarFormulario() {}

async function editarMeta() {
  try {
    $q.loading.show({
      message: "Creando ...",
    });

    let estadoEdicion = ''

    if (estadoMeta.value.value) {
      estadoEdicion = estadoMeta.value.value;
    }else {
      estadoEdicion = estadoMeta.value
    }

    const metaActualizar = {
      id: props.idMeta,
      descripcion_meta: descripcionMeta.value,
      cantidad_meta: cantidadMeta.value,
      estado: estadoEdicion,
      cantidad_abonada: cantidadAbonadaMeta.value,
      fecha_esperada: convertirFecha(fechaEsperada.value),
    };

    if (metaActualizar === metaConsultada.value) {
      throw new Error("Recuerde cambiar algun parametro para actualizar");
    }

    await metasStore.actualizarMeta(metaActualizar);

    router.push("/main/metas");

    $q.notify({
      progress: true,
      message: "Se edito con exito!",
      color: "positive",
      icon: "done",
      textColor: "white",
      multiLine: true,
    });
  } catch (error) {
    $q.notify({
      progress: true,
      message: "Ha ocurrido un error: " + error.message,
      color: "warning",
      icon: "warning",
      textColor: "white",
      multiLine: true,
    });
  } finally {
    $q.loading.hide();
  }
}

async function crearMeta() {
  try {
    $q.loading.show({
      message: "Creando ...",
    });

    if (!estadoMeta.value && !fechaEsperada.value) {
      throw new Error("Recuerde añadir el estado y la fecha esperada");
    }

    const metaCrear = {
      descripcion_meta: descripcionMeta.value,
      cantidad_meta: cantidadMeta.value,
      estado: estadoMeta.value,
      cantidad_abonada: cantidadAbonadaMeta.value,
      fecha_esperada: convertirFecha(fechaEsperada.value),
    };

    await metasStore.agregarMeta(metaCrear);

    router.push("/main/metas");

    $q.notify({
      progress: true,
      message: "Se agrego con exito!",
      color: "positive",
      icon: "done",
      textColor: "white",
      multiLine: true,
    });
  } catch (error) {
    $q.notify({
      progress: true,
      message: "Ha ocurrido un error: " + error.message,
      color: "warning",
      icon: "warning",
      textColor: "white",
      multiLine: true,
    });
  } finally {
    $q.loading.hide();
  }
}
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

/* Colores estado */

.ColorCan {
  background: rgb(251, 194, 59);
  background: linear-gradient(
    100deg,
    rgba(251, 194, 59, 1) 19%,
    rgba(246, 86, 55, 1) 74%
  );
}

.ColorDF {
  background: rgb(186, 203, 222);
  background: linear-gradient(
    100deg,
    rgba(186, 203, 222, 1) 19%,
    rgba(157, 171, 194, 1) 74%
  );
}

.ColorCo {
  background: rgb(144, 232, 45);
  background: linear-gradient(
    100deg,
    rgba(144, 232, 45, 1) 19%,
    rgba(33, 178, 54, 1) 74%
  );
}
.ColorIn {
  background: rgb(98, 166, 255);
  background: linear-gradient(
    100deg,
    rgba(98, 166, 255, 1) 19%,
    rgba(12, 99, 212, 1) 74%
  );
}
</style>
