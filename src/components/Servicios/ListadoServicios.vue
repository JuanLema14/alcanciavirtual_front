<template>
  <!-- INICIO>> Pantalla emergente de acciones de servicios -->
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
          @click="editarServicios()"
          style="border-radius: 20px; cursor: pointer"
        >
          <div class="q-pa-md">
            <q-avatar color="primary" icon="edit" text-color="white" />
          </div>
          <q-item-section>
            <div class="text-weight-bold text-subtitle2">Editar Servicio</div>
          </q-item-section>
        </div>
      </q-card-section>

      <q-card-section>
        <div
          class="flex flex-center row hovClick"
          @click="eliminarServicio()"
          style="border-radius: 20px; cursor: pointer"
        >
          <div class="q-pa-md">
            <q-avatar color="primary" icon="delete" text-color="white" />
          </div>
          <q-item-section>
            <div class="text-weight-bold text-subtitle2">Eliminar Servicio</div>
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
  <!-- FIN>> Pantalla emergente de acciones de servicios -->

  <q-card class="sectionShadow" style="border-radius: 10px 10px 10px 10px">
    <q-table
      @request="ordenarPor"
      :rows="servicios"
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
              Lista de Servicios
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
          label="Registrar Servicio"
          icon-right="roofing"
          @click="crearServicio()"
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
          <q-td key="nombre_servicio" :props="props">
            <span class="text-secondary">{{ props.row.nombre_servicio }}</span>
          </q-td>
          <q-td key="valor_servicio" :props="props">
            <span class="text-secondary">{{ props.row.valor_servicio }}</span>
          </q-td>
          <q-td key="estado" :props="props">
            <span class="text-secondary">{{ props.row.estado }}</span>
          </q-td>
          <q-td key="cantidad_meses" :props="props">
            <span class="text-secondary">{{ props.row.cantidad_meses }}</span>
          </q-td>
          <q-td key="fecha_pago" :props="props">
            <span class="text-secondary">{{ props.row.fecha_pago }}</span>
          </q-td>
          <q-td key="tipo_servicio" :props="props">
            <span class="text-secondary">{{ props.row.tipo_servicio }}</span>
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
          <q-td key="nombre_servicio" :props="props">
            <q-skeleton width="5vmax" height="5px" />
          </q-td>
          <q-td key="valor_servicio" :props="props">
            <q-skeleton width="5vmax" height="5px" />
          </q-td>
          <q-td key="estado" :props="props">
            <q-skeleton width="5vmax" height="5px" />
          </q-td>
          <q-td key="cantidad_meses" :props="props">
            <q-skeleton width="5vmax" height="5px" />
          </q-td>
          <q-td key="fecha_pago" :props="props">
            <q-skeleton width="5vmax" height="5px" />
          </q-td>
          <q-td key="tipo_servicio" :props="props">
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
import { useServiciosStore } from "stores/servicios-store";

defineComponent({
  name: "ListadoServicios",
});

const columns = [
  {
    format: (val) => `${val}`,
    label: "Nombre del servicio",
    name: "nombre_servicio",
    field: "nombre_servicio",
    align: "center",
  },
  {
    label: "Valor del servicio",
    name: "valor_servicio",
    field: "valor_servicio",
    align: "center",
  },
  {
    label: "estado",
    name: "estado",
    field: "estado",
    align: "center",
  },
  {
    label: "Meses suscrito",
    name: "cantidad_meses",
    field: "cantidad_meses",
    align: "center",
  },
  {
    label: "Fecha de pago",
    name: "fecha_pago",
    field: "fecha_pago",
    align: "center",
  },
  {
    label: "Tipo de servicio",
    name: "tipo_servicio",
    field: "tipo_servicio",
    align: "center",
  },
];

const serviciosStore = useServiciosStore();
const $q = useQuasar();
const router = useRouter();

const loading = ref(false);
const idServicio = ref(null);
const acciones = ref(false);

const servicios = computed({
  get() {
    return serviciosStore.servicios.data;
  },
});

const localPagination = computed({
  get() {
    return serviciosStore.pagination;
  },
});

const currentPage = computed({
  get() {
    return +serviciosStore.pagination.page + 1;
  },
  async set(pageNumber) {
    serviciosStore.pagination.page = pageNumber;
  },
});

const maxPage = computed(() =>
  Math.ceil(
    serviciosStore.pagination.rowsNumber / serviciosStore.pagination.rowsPerPage
  )
);

const initialPagination = ref({
  sortBy: "codigoServicio",
  descending: false,
  page: 0,
  rowsPerPage: 5,
  rowsNumber: 10,
});

onMounted(async () => {
  try {
    await serviciosStore.cargarServicios();
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

  serviciosStore.pagination.page = +pageNumber - 1;
  await serviciosStore.cargarServicios();
  loading.value = false;

  $q.loading.hide();
}

async function ordenarPor(serviciosOrden) {
  const { page, rowsPerPage, sortBy, descending } = serviciosOrden.pagination;

  loading.value = true;

  initialPagination.value.page = page;
  initialPagination.value.rowsPerPage = rowsPerPage;
  initialPagination.value.sortBy = sortBy;
  initialPagination.value.descending = descending;

  serviciosStore.pagination.descending = descending;
  serviciosStore.pagination.page = page;
  serviciosStore.cargarServicios();
  loading.value = false;

  $q.loading.hide();
}

function accionesFunc(idParm) {
  idServicio.value = window.btoa(idParm);
  acciones.value = true;
}

/* -----  Acciones  ----- */

function editarServicios() {
  router.push("/main/servicios/editar/" + idServicio.value);
}

function crearServicio() {
  router.push("/main/servicios/crear/");
}

async function eliminarServicio() {
  try {
    $q.loading.show({
      message: "Eliminando ...",
    });
    await serviciosStore.retirarServicio(+window.atob(idServicio.value));
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
</style>
