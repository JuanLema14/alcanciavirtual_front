<template>
  <!-- INICIO>> Pantalla emergente de acciones de ahorros -->
  <q-dialog v-model="acciones">
    <q-card class="my-card">
      <q-toolbar>
        <q-avatar>
          <q-img src="~assets/logo.png" />
        </q-avatar>
        <q-item-section>
          <div class="text-grey-14 text-weight-medium">
            Seleccione la acción que desea realizar:
          </div>
        </q-item-section>
      </q-toolbar>

      <q-separator />

      <q-card-section>
        <div
          class="flex flex-center row hovClick"
          @click="eliminarAhorro()"
          style="border-radius: 20px; cursor: pointer"
        >
          <div class="q-pa-md">
            <q-avatar color="primary" icon="delete" text-color="white" />
          </div>
          <q-item-section>
            <div class="text-weight-bold text-subtitle2">Eliminar Ahorro</div>
          </q-item-section>
        </div>
      </q-card-section>

      <div class="col-lg-6 row justify-center">
        <q-card-actions>
          <q-btn v-close-popup color="primary" label="cancelar" />
        </q-card-actions>
      </div>
    </q-card>
  </q-dialog>
  <!-- FIN>> Pantalla emergente de acciones de ahorros -->

  <q-card class="sectionShadow" style="border-radius: 10px 10px 10px 10px">
    <q-table
      :rows="ahorros"
      row-key="id"
      :columns="columns"
      :rows-per-page-options="[0]"
      flat
      no-data-label="No se encontraron datos"
    >
      <!-- titulos superiores de la tabla -->

      <template v-slot:top-left>
        <q-toolbar>
          <q-avatar
            square
            text-color="white"
            style="width: 2.3vmax; height: 2.3vmax"
          >
            <div style="z-index: 1000">
              <div class="row flex flex-center">
                <img src="~assets/logo.png" style="width: 60%" />
              </div>
            </div>
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              style="width: 100%; z-index: 0; position: absolute"
            >
              <path
                fill="#F5ACFF"
                d="M42.7,-77.8C53.2,-68,57.8,-52.1,63.2,-38.1C68.5,-24.1,74.4,-12,73.1,-0.8C71.8,10.5,63.2,21,56.2,32.2C49.3,43.4,44.1,55.3,35,65.6C25.9,75.9,12.9,84.6,1,82.8C-10.9,81,-21.8,68.9,-31.1,58.7C-40.4,48.5,-48.1,40.4,-57.4,30.9C-66.8,21.5,-77.8,10.7,-81,-1.9C-84.2,-14.5,-79.7,-28.9,-72.7,-42.5C-65.8,-56,-56.4,-68.7,-43.8,-77.2C-31.3,-85.8,-15.6,-90.2,0.3,-90.6C16.2,-91.1,32.3,-87.5,42.7,-77.8Z"
                transform="translate(100 100)"
              />
            </svg>
          </q-avatar>

          <q-toolbar-title>
            <span class="text-weight-bolder text-secondary">
              Lista de Ahorros
            </span>
          </q-toolbar-title>
        </q-toolbar>
      </template>


      <!-- titulos de las columnas de la tabla -->

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            <div class="text-weight-medium text-grey-6">
              {{ col.label }}
            </div>
          </q-th>
          <q-th>
            <div class="text-weight-medium text-grey-6">Acciones</div>
          </q-th>
        </q-tr>
      </template>

      <!-- cuerpo de la tabla -->

      <template v-slot:body="props">
        <q-tr :props="props" v-if="!loading">
          <q-td key="valorAhorro" :props="props">
            <span class="text-secondary">${{ fixedNumber(props.row.valorAhorro) }}</span>
          </q-td>
          <q-td key="tipoAhorro" :props="props">
            <div
              :class="verificarEstadoBadge(props.row.tipoAhorro)"
              style="border-radius: 25px; width: fit-content"
            >
              <q-badge style="border-radius: 25px" class="glassMorph">
                <span class="text-subtitle1">{{ props.row.tipoAhorro }}</span>
              </q-badge>
            </div>
          </q-td>
          <q-td key="fechaIngreso" :props="props">
            <span class="text-secondary"
              >{{ formDate(props.row.fechaIngreso)
              }}<q-tooltip class="bg-grey-6">{{
                formFecha(props.row.fechaIngreso)
              }}</q-tooltip></span
            >
          </q-td>
          <q-td auto-width>
            <div>
              <q-btn
                @click="accionesFunc(JSON.stringify(props.row.id))"
                flat
                bordered
                round
                color="transparent"
                text-color="primary"
                icon="info"
              >
                <q-tooltip class="bg-grey-6">Acciones</q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </q-tr>
        <q-tr v-else>
          <q-td key="tipoAhorro" :props="props">
            <q-skeleton width="5vmax" height="5px" />
          </q-td>
          <q-td key="valorAhorro" :props="props">
            <q-skeleton width="5vmax" height="5px" />
          </q-td>
          <q-td key="fechaIngreso" :props="props">
            <q-skeleton width="5vmax" height="5px" />
          </q-td>
          <q-td auto-width>
            <div>
              <q-skeleton type="QAvatar" />
            </div>
          </q-td>
        </q-tr>
      </template>

    </q-table>
  </q-card>
</template>

<script setup>
import { ref, computed, onMounted, defineComponent } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useAhorrosStore } from "stores/ahorros-store";

defineComponent({
  name: "ListadoAhorros",
});

const columns = [
  {
    format: (val) => `${val}`,
    label: "Valor del ahorro",
    name: "valorAhorro",
    field: "valorAhorro",
    align: "center",
  },
  {
    label: "Tipo de ahorro",
    name: "tipoAhorro",
    field: "tipoAhorro",
    align: "left",
  },
  {
    label: "Fecha de Ingreso",
    name: "fechaIngreso",
    field: "fechaIngreso",
    align: "left",
  },
];

const ahorrosStore = useAhorrosStore();
const $q = useQuasar();
const router = useRouter();

const loading = ref(false);
const idAhorro = ref(null);
const acciones = ref(false);

const ahorros = computed({
  get() {
    return ahorrosStore.ahorros.data;
  },
});

onMounted(async () => {
  try {
    await ahorrosStore.cargarAhorros();
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

function accionesFunc(idParm) {
  idAhorro.value = window.btoa(idParm);
  acciones.value = true;
}

/* ----- Estado ----- */

function verificarEstadoBadge(estado) {
  let colorClass = "";
  switch (estado) {
    case "Remesa":
      colorClass = "q-pa-xs ColorRe";
      break;

    case "Pago":
      colorClass = "q-pa-xs ColorPa";
      break;

    default:
      colorClass = "q-pa-xs ColorDF";
      break;
  }
  return colorClass;
}

function fixedNumber(number) {
  return new Intl.NumberFormat("es-CO", {
    maximumFractionDigits: 2,
  }).format(+number);
}

function formDate(parametroFecha) {
  const fecha = new Date(parametroFecha);
  const fechaSinHora = fecha.toLocaleDateString();
  return fechaSinHora;
}

function formFecha(parametroFecha) {
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  // Creamos array con los días de la semana
  const diasSemana = [
    "Domingo",
    "Lunes",
    "martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  // Creamos el objeto fecha instanciándolo con la clase Date
  const fecha = new Date(parametroFecha);
  const hora = " a las " + fecha.toLocaleTimeString();
  // Construimos el formato de salida
  const fechaModificada =
    diasSemana[fecha.getDay()] +
    ", " +
    fecha.getDate() +
    " de " +
    meses[fecha.getMonth()] +
    " de " +
    fecha.getUTCFullYear() +
    hora;

  return fechaModificada;
}

/* -----  Acciones  ----- */

async function eliminarAhorro() {
  try {
    $q.loading.show({
      message: "Eliminando ...",
    });
    await ahorrosStore.retirarAhorro(+window.atob(idAhorro.value));
    acciones.value = false;
    await ahorrosStore.cargarAhorros();
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

<style lang="scss" scoped>
.sectionShadow {
  -webkit-box-shadow: -1px 14px 24px -5px rgba(57, 66, 196, 0.5);
  box-shadow: -1px 14px 24px -5px rgba(11, 19, 138, 0.2);
}

.hovClick {
  background: #eceff7;
}

.hovClick:hover {
  background: #e4e5e7;
}

/* Colores estado */

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


.ColorRe {
  background: rgb(181, 115, 255);
  background: linear-gradient(
    114deg,
    rgba(181, 115, 255, 1) 27%,
    rgba(76, 0, 161, 1) 100%
  );
}

.glassMorph {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(11.7px);
  -webkit-backdrop-filter: blur(11.7px);
}
</style>
