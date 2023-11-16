<template>
  <q-card class="warning bgImage" style="border-radius: 25px">
    <q-card-section class="row q-col-gutter-sm">
      <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8 row">
        <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
          <q-carousel
            v-model="ahorroCarousel"
            transition-prev="scale"
            transition-next="scale"
            ref="carousel"
            control-color="warning"
            class="glassMorph"
            fit
            swipeable
            animated
          >
            <q-carousel-slide name="1">
              <div class="row q-col-gutter-sm">
                <div class="col-lg-12 col-md-12 col-sm col-xs-12"></div>
                <div class="col-lg-12 col-md-12 col-sm col-xs-12">
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
                      v-model="valorAhorro"
                      label="Valor del ahorro"
                      bg-color="grey-4"
                    />
                  </div>

                  <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                    <div class="q-pa-md">
                      <span class="text-subtitle2 text-grey-8">Tipo</span>
                    </div>
                    <q-select
                      rounded
                      standout="bg-grey-5 text-white"
                      v-model="tipoAhorro"
                      label="Tipo de Ahorro"
                      :options="opcionesTipoAhorro"
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

                <div>
                  <q-btn
                    class="full-width degradadoBoton"
                    rounded
                    text-color="white"
                    label="Registrar"
                  />
                </div>
              </div>
            </q-carousel-slide>

            <q-carousel-slide name="2">
              <listado-ahorro />
            </q-carousel-slide>
          </q-carousel>
        </div>
      </div>

      <div
        class="col-lg-4 col-md-4 col-sm-4 col-xs-4"
        v-if="ahorroCarousel == '1'"
      >
        <div class="flex flex-center">
          <img
            src="~assets/cerdito_1.png"
            style="width: 50vh"
            v-if="imagenAhorro === 0"
          />
          <img
            src="~assets/cerdito_semi_lleno.png"
            style="width: 50vh"
            v-if="imagenAhorro === 1"
          />
          <img
            src="~assets/cerdito_lleno.png"
            style="width: 50vh"
            v-if="imagenAhorro === 2"
          />
          <img
            src="~assets/cerdito_lleno_2.png"
            style="width: 50vh"
            v-if="imagenAhorro === 3"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, onMounted, defineComponent, defineAsyncComponent } from "vue";
import { useQuasar } from "quasar";
import { useAhorrosStore } from "stores/ahorros-store";

const ListadoAhorro = defineAsyncComponent(() =>
  import("src/components/Ahorro/ListaAhorro.vue")
);
defineComponent({
  name: "IndexPage",
});

const $q = useQuasar();
const ahorrosStore = useAhorrosStore();

const imagenAhorro = ref(0);
const valorAhorro = ref(0);
const tipoAhorro = ref("");
const ahorroCarousel = ref("1");

const opcionesTipoAhorro = ref([
  { value: "Pago", label: "Pago" },
  { value: "Remesa", label: "Remesa" },
]);

onMounted(async () => {
  try {
    await ahorrosStore.cargarTotalAhorrado(false);
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

/* ----- Acciones ----- */

async function crearAhorro() {
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

.degradadoBoton {
  background: linear-gradient(
    156deg,
    rgba(162, 27, 191, 1) 19%,
    rgba(110, 34, 172, 1) 47%,
    rgba(59, 19, 97, 1) 74%
  );
}

.divDegradado {
  background: linear-gradient(
    194deg,
    rgba(162, 27, 191, 1) 0%,
    rgba(59, 19, 97, 1) 84%
  );
}

.glassMorph {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(11.7px);
  -webkit-backdrop-filter: blur(11.7px);
}

.bgImage {
  background-image: url("src/assets/Fondo2.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
