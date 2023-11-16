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
              <q-icon name="wallet" />
            </q-avatar>
            <div class="text-weight-bold text-secondary q-pl-sm text-h6">
              Formulario de Servicios
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
              v-model="nombreServicio"
              label="Nombre del servicio"
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
              <span class="text-subtitle2 text-grey-8">Valor</span>
            </div>
            <q-input
              mask="###.###.###.###.###.###.###.###.###.###"
              maxlength="21"
              reverse-fill-mask
              unmasked-value
              rounded
              standout="bg-grey-5 text-white"
              v-model="valorServicio"
              label="Valor del servicio"
              bg-color="grey-4"
              :rules="[(val) => +val > 0 || 'Ingrese un valor real']"
            />
          </div>
          <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
            <div class="q-pa-md">
              <span class="text-subtitle2 text-grey-8">Estado</span>
            </div>
            <q-select
              rounded
              standout="bg-grey-5 text-white"
              v-model="estadoServicio"
              label="Estado del servicio"
              :options="opcionesEstadoServicio"
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
              <span class="text-subtitle2 text-grey-8">Cantidad meses</span>
            </div>
            <q-input
              rounded
              standout="bg-grey-5 text-white"
              v-model.number="cantidadMeses"
              type="number"
              label="Cantidad de meses del servicio"
              bg-color="grey-4"
              :rules="[(val) => +val > 0 || 'Ingrese un valor real']"
            />
          </div>

          <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
            <div class="q-pa-md">
              <span class="text-subtitle2 text-grey-8">Fecha de pago</span>
            </div>
            <q-input
              rounded
              standout="bg-grey-5 text-white"
              v-model="fechaPago"
              label="Fecha de pago del servicio"
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
                    <q-date :locale="fechaEs" v-model="fechaPago" minimal>
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

        <div
          class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row q-pa-sm q-col-gutter-md"
        >
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <div class="q-pa-md">
              <span class="text-subtitle2 text-grey-8">Tipo</span>
            </div>
            <q-select
              rounded
              standout="bg-grey-5 text-white"
              v-model="tipoServicio"
              label="Tipo de servicio"
              :options="opcionesTipoServicio"
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
                        :class="verificarTipoBadge(scope.opt.value)"
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
      </div>
    </q-form>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useServiciosStore } from "stores/servicios-store";
import { useRouter } from "vue-router";

const props = defineProps({
  estaModoCrear: {
    type: Boolean,
    default: false,
  },
  idServicio: {
    type: Number,
  },
});

const serviciosStore = useServiciosStore();
const $q = useQuasar();
const router = useRouter();

const servicioConsultado = ref({});
const nombreServicio = ref("");
const valorServicio = ref();
const estadoServicio = ref("");
const cantidadMeses = ref();
const fechaPago = ref();
const tipoServicio = ref("");

const opcionesEstadoServicio = ref([
  { value: "Pagado", label: "Ya se pago!" },
  { value: "Mora", label: "El pago esta en Mora" },
  { value: "PendientePago", label: "Pendiente para pagar" },
]);
const opcionesTipoServicio = ref([
  { value: "Publico", label: "Publico" },
  { value: "Entretenimiento", label: "Entretenimiento" },
  { value: "Academico", label: "Academico" },
  { value: "Medico", label: "Medico" },
  { value: "Gastronomico", label: "Gastronomico" },
  { value: "Transporte", label: "Transporte" },
]);

onMounted(async () => {
  try {
    if (!props.estaModoCrear) {
      servicioConsultado.value = await serviciosStore.consultarServicio(
        props.idServicio
      );

      nombreServicio.value = servicioConsultado.value.nombre_servicio;
      valorServicio.value = servicioConsultado.value.valor_servicio;
      estadoServicio.value = servicioConsultado.value.estado;
      cantidadMeses.value = servicioConsultado.value.cantidad_meses;
      fechaPago.value = servicioConsultado.value.fecha_pago;
      tipoServicio.value = servicioConsultado.value.tipo_servicio;
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
    case "Pagado":
      colorClass = "q-pa-xs ColorPa";
      break;

    case "Mora":
      colorClass = "q-pa-xs ColorMor";
      break;

    case "PendientePago":
      colorClass = "q-pa-xs ColorPen";
      break;

    default:
      colorClass = "q-pa-xs ColorDF";
      break;
  }
  return colorClass;
}

function verificarTipoBadge(estado) {
  let colorClass = "";
  switch (estado) {
    case "Publico":
      colorClass = "q-pa-xs ColorPu";
      break;

    case "Entretenimiento":
      colorClass = "q-pa-xs ColorEn";
      break;

    case "Academico":
      colorClass = "q-pa-xs ColorAc";
      break;

    case "Medico":
      colorClass = "q-pa-xs ColorMed";
      break;

    case "Gastronomico":
      colorClass = "q-pa-xs ColorGas";
      break;

    case "Transporte":
      colorClass = "q-pa-xs ColorTra";
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
    crearServicio();
  } else {
    editarServicio();
  }
}

function limpiarFormulario() {}

async function editarServicio() {
  try {
    $q.loading.show({
      message: "Creando ...",
    });
    const hoy = new Date();

    const fechaPagoValidar = new Date(fechaPago.value);

    if (fechaPagoValidar < hoy) {
      estadoServicio.value = "Mora";
    }

    let estadoEdicion = ''
    let tipoEdicion = ''

    if (estadoServicio.value.value) {
      estadoEdicion = estadoServicio.value.value;
    }else {
      estadoEdicion = estadoServicio.value
    }

    if (tipoServicio.value.value) {
      tipoEdicion = tipoServicio.value.value;
    }else {
      tipoEdicion = tipoServicio.value
    }

    const servicioActualizar = {
      id: props.idServicio,
      nombre_servicio: nombreServicio.value,
      valor_servicio: valorServicio.value,
      estado: estadoEdicion,
      cantidad_meses: cantidadMeses.value,
      fecha_pago: convertirFecha(fechaPago.value),
      tipo_servicio: tipoEdicion,
    };

    if (servicioActualizar === servicioConsultado.value) {
      throw new Error("Recuerde cambiar algun parametro para actualizar");
    }

    await serviciosStore.actualizarServicio(servicioActualizar);

    router.push("/main/servicios");

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

async function crearServicio() {
  try {
    $q.loading.show({
      message: "Creando ...",
    });
    const hoy = new Date();

    const fechaPagoValidar = new Date(fechaPago.value);

    if (!tipoServicio.value && !estadoServicio.value && !fechaPago.value) {
      throw new Error("Recuerde añadir el tipo de servicio, el estado y la fecha del pago");
    }

    if (fechaPagoValidar < hoy) {
      estadoServicio.value = "Mora";
    }

    const servicioCrear = {
      nombre_servicio: nombreServicio.value,
      valor_servicio: valorServicio.value,
      estado: estadoServicio.value,
      cantidad_meses: cantidadMeses.value,
      fecha_pago: convertirFecha(fechaPago.value),
      tipo_servicio: tipoServicio.value,
    };

    await serviciosStore.agregarServicio(servicioCrear);

    router.push("/main/servicios");

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

.ColorPen {
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

.ColorPa {
  background: rgb(144, 232, 45);
  background: linear-gradient(
    100deg,
    rgba(144, 232, 45, 1) 19%,
    rgba(33, 178, 54, 1) 74%
  );
}
.ColorMor {
  background: rgb(255, 0, 99);
  background: linear-gradient(
    114deg,
    rgba(255, 0, 99, 1) 27%,
    rgba(255, 0, 0, 1) 100%
  );
}

/* Colores tipo */

.ColorPu {
  background: rgb(98, 166, 255);
  background: linear-gradient(
    100deg,
    rgba(98, 166, 255, 1) 19%,
    rgba(12, 99, 212, 1) 74%
  );
}

.ColorEn {
  background: rgb(255, 114, 169);
  background: linear-gradient(
    114deg,
    rgba(255, 114, 169, 1) 27%,
    rgba(187, 13, 81, 1) 100%
  );
}

.ColorAc {
  background: rgb(132, 255, 97);
  background: linear-gradient(
    114deg,
    rgba(132, 255, 97, 1) 27%,
    rgba(0, 167, 11, 1) 100%
  );
}

.ColorMed {
  background: rgb(247, 68, 68);
  background: linear-gradient(
    114deg,
    rgba(247, 68, 68, 1) 27%,
    rgba(168, 0, 0, 1) 100%
  );
}

.ColorGas {
  background: rgb(247, 167, 68);
  background: linear-gradient(
    114deg,
    rgba(247, 167, 68, 1) 27%,
    rgba(247, 227, 68, 1) 100%
  );
}

.ColorTra {
  background: rgb(181, 115, 255);
  background: linear-gradient(
    114deg,
    rgba(181, 115, 255, 1) 27%,
    rgba(76, 0, 161, 1) 100%
  );
}
</style>
