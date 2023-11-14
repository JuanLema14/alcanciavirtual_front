<template>
  <!-- INICIO>> Pantalla emergente de acciones de metas -->
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
          @click="editarMetas()"
          style="border-radius: 20px; cursor: pointer"
        >
          <div class="q-pa-md">
            <q-avatar color="primary" icon="edit" text-color="white" />
          </div>
          <q-item-section>
            <div class="text-weight-bold text-subtitle2">Editar Meta</div>
          </q-item-section>
        </div>
      </q-card-section>

      <q-card-section>
        <div
          class="flex flex-center row hovClick"
          @click="eliminarMeta()"
          style="border-radius: 20px; cursor: pointer"
        >
          <div class="q-pa-md">
            <q-avatar color="primary" icon="delete" text-color="white" />
          </div>
          <q-item-section>
            <div class="text-weight-bold text-subtitle2">Eliminar Meta</div>
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
  <!-- FIN>> Pantalla emergente de acciones de metas -->

  <q-card class="sectionShadow" style="border-radius: 10px 10px 10px 10px">
    <q-table
      @request="ordenarPor"
      :rows="metas"
      row-key="id"
      :columns="columns"
      v-model:pagination="initialPagination"
      binary-state-sort
      hide-pagination
      :rows-per-page-options="[0]"
      flat
      no-data-label="No se encontraron datos"
      no-results-label="El filtro no encontró ningún resultado"
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
              Lista de Metas
            </span>
          </q-toolbar-title>
        </q-toolbar>
      </template>

      <!-- acciones superiores de la tabla -->

      <template v-slot:top-right>
        <q-btn
          class="glossy"
          rounded
          dense
          color="primary"
          label="Registrar Meta"
          icon-right="sports_score"
          @click="crearMeta()"
        />
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
          <q-td key="descripcion_meta" :props="props">
            <span class="text-secondary">{{ props.row.descripcion_meta }}</span>
          </q-td>
          <q-td key="cantidad_meta" :props="props">
            <span class="text-secondary"
              >${{ fixedNumber(props.row.cantidad_meta) }}</span
            >
          </q-td>
          <q-td key="cantidad_abonada" :props="props">
            <span class="text-secondary"
              >${{ fixedNumber(props.row.cantidad_abonada) }}</span
            >
          </q-td>
          <q-td key="estado" :props="props">
            <q-badge
              style="border-radius: 25px"
              :class="verificarEstadoBadge(props.row.estado)"
            >
              <span class="text-subtitle1">{{ props.row.estado }}</span>
            </q-badge>
          </q-td>
          <q-td key="fecha_creacion" :props="props">
            <span class="text-secondary">{{
              formDate(props.row.fecha_creacion)
            }}<q-tooltip class="bg-grey-6">{{
                formFecha(props.row.fecha_creacion)
              }}</q-tooltip></span>
          </q-td>
          <q-td key="fecha_esperada" :props="props">
            <span class="text-secondary"
              >{{ formDate(props.row.fecha_esperada) }}
              <q-tooltip class="bg-grey-6">{{
                formFecha(props.row.fecha_esperada)
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
          <q-td key="descripcion_meta" :props="props">
            <q-skeleton width="5vmax" height="5px" />
          </q-td>
          <q-td key="cantidad_meta" :props="props">
            <q-skeleton width="5vmax" height="5px" />
          </q-td>
          <q-td key="cantidad_abonada" :props="props">
            <q-skeleton width="5vmax" height="5px" />
          </q-td>
          <q-td key="estado" :props="props">
            <q-skeleton width="5vmax" height="5px" />
          </q-td>
          <q-td key="fecha_creacion" :props="props">
            <q-skeleton width="5vmax" height="5px" />
          </q-td>
          <q-td key="fecha_esperada" :props="props">
            <q-skeleton width="5vmax" height="5px" />
          </q-td>
          <q-td auto-width>
            <div>
              <q-skeleton type="QAvatar" />
            </div>
          </q-td>
        </q-tr>
      </template>

      <!-- Paginacion -->

      <template v-slot:bottom>
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-pagination
            v-if="localPagination.rowsNumber > 0"
            v-model="currentPage"
            :max="maxPage"
            :max-pages="6"
            boundary-numbers
            @update:modelValue="onRequest"
          />
        </div>
      </template>
    </q-table>
  </q-card>
</template>

<script setup>
import { ref, computed, onMounted, defineComponent } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useMetasStore } from "stores/metas-store";

defineComponent({
  name: "ListadoMetas",
});

const columns = [
  {
    format: (val) => `${val}`,
    label: "Descripcion de la meta",
    name: "descripcion_meta",
    field: "descripcion_meta",
    align: "center",
  },
  {
    label: "Valor de la meta",
    name: "cantidad_meta",
    field: "cantidad_meta",
    align: "center",
  },
  {
    label: "Cantidad abonada",
    name: "cantidad_abonada",
    field: "cantidad_abonada",
    align: "center",
  },
  {
    label: "estado",
    name: "estado",
    field: "estado",
    align: "center",
  },
  {
    label: "Fecha de creacion",
    name: "fecha_creacion",
    field: "fecha_creacion",
    align: "center",
  },
  {
    label: "Fecha esperada",
    name: "fecha_esperada",
    field: "fecha_esperada",
    align: "center",
  },
];

const metasStore = useMetasStore();
const $q = useQuasar();
const router = useRouter();

const loading = ref(false);
const idMeta = ref(null);
const acciones = ref(false);

const metas = computed({
  get() {
    return metasStore.metas.data;
  },
});

const localPagination = computed({
  get() {
    return metasStore.pagination;
  },
});

const currentPage = computed({
  get() {
    return +metasStore.pagination.page + 1;
  },
  async set(pageNumber) {
    metasStore.pagination.page = pageNumber;
  },
});

const maxPage = computed(() =>
  Math.ceil(
    metasStore.pagination.rowsNumber / metasStore.pagination.rowsPerPage
  )
);

const initialPagination = ref({
  sortBy: "codigoMeta",
  descending: false,
  page: 0,
  rowsPerPage: 5,
  rowsNumber: 10,
});

onMounted(async () => {
  try {
    await metasStore.cargarMetas();
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

async function onRequest(pageNumber) {
  loading.value = true;
  $q.loading.show({
    message: "Cargando ...",
  });

  metasStore.pagination.page = +pageNumber - 1;
  await metasStore.cargarMetas();
  loading.value = false;

  $q.loading.hide();
}

async function ordenarPor(metasOrden) {
  const { page, rowsPerPage, sortBy, descending } = metasOrden.pagination;

  loading.value = true;

  initialPagination.value.page = page;
  initialPagination.value.rowsPerPage = rowsPerPage;
  initialPagination.value.sortBy = sortBy;
  initialPagination.value.descending = descending;

  metasStore.pagination.descending = descending;
  metasStore.pagination.page = page;
  metasStore.cargarMetas();
  loading.value = false;

  $q.loading.hide();
}

function accionesFunc(idParm) {
  idMeta.value = window.btoa(idParm);
  acciones.value = true;
}

/* ----- Estado ----- */

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

function editarMetas() {
  router.push("/main/metas/editar/" + idMeta.value);
}

function crearMeta() {
  router.push("/main/metas/crear/");
}

async function eliminarMeta() {
  try {
    $q.loading.show({
      message: "Eliminando ...",
    });
    await metasStore.retirarMeta(+window.atob(idMeta.value));
    acciones.value = false;
    onRequest(1);
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
