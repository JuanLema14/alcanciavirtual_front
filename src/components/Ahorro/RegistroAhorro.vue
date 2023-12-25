<template>
  <q-card class="warning bgImage" style="border-radius: 25px; height: 65vh">
    <q-card-section>
      <q-carousel
        v-model="ahorroCarousel"
        transition-prev="scale"
        transition-next="scale"
        ref="carousel"
        control-color="primary"
        class="glassMorph"
        fit
        style="height: fit-content"
        swipeable
        animated
        arrows
      >
        <q-carousel-slide name="1">
          <div class="row q-col-gutter-sm">
            <div
              class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row q-col-gutter-sm"
            >
              <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class="q-pa-md">
                  <span class="text-subtitle2 text-grey-8"
                    >Valor a alcanzar</span
                  >
                </div>

                <div class="row q-col-gutter-sm">
                  <q-input
                    mask="###.###.###.###.###.###.###.###.###.###"
                    maxlength="21"
                    reverse-fill-mask
                    unmasked-value
                    v-model="valorAahorrar"
                    label="Valor total que quieres alcanzar"
                    rounded
                    standout="bg-grey-5 text-white"
                    bg-color="grey-4"
                  />
                  <div class="q-pa-sm">
                    <q-btn
                      @click="guardarValorAAlcanzar()"
                      class="degradadoBoton"
                      rounded
                      text-color="white"
                      label="guardar valor"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              class="col-lg-8 col-md-8 col-sm-8 col-xs-8 row q-col-gutter-sm"
            >
              <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
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

              <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
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

              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 row">
                  <q-btn
                    @click="crearAhorro()"
                    class="full-width degradadoBoton"
                    rounded
                    text-color="white"
                    label="Registrar"
                  />
                </div>
              </div>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div class="q-pa-md">
                <span class="text-subtitle2 text-grey-8">Ahorros</span>
              </div>

              <q-input
                mask="###.###.###.###.###.###.###.###.###.###"
                readonly
                maxlength="21"
                reverse-fill-mask
                unmasked-value
                v-model="valorTotalAhorro"
                label="Valor total ahorrado"
                rounded
                standout="bg-grey-5 text-white"
                bg-color="grey-4"
              />
            </div>

            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
              <img
                src="~assets/cerdito_1.png"
                style="width: 20vh"
                v-if="imagenAhorro === 0"
              />
              <img
                src="~assets/cerdito_semi_lleno.png"
                style="width: 20vh"
                v-if="imagenAhorro === 1"
              />
              <img
                src="~assets/cerdito_lleno.png"
                style="width: 20vh"
                v-if="imagenAhorro === 2"
              />
              <img
                src="~assets/cerdito_lleno_2.png"
                style="width: 20vh"
                v-if="imagenAhorro === 3"
              />
            </div>

            <div class="col-lg-12 col-sm-12 col-xs-12 q-gutter-x-md">
              <q-toggle
                v-model="sumarValorAhorradoenMetas"
                color="primary"
                keep-color
                label="Sumar valor ahorrado en metas?"
              />
              <q-btn
                @click="consultarTotal()"
                class="degradadoBoton"
                rounded
                text-color="white"
                label="Consultar total ahorrado"
              />
            </div>
          </div>
        </q-carousel-slide>

        <q-carousel-slide name="2">
          <listado-ahorro />
        </q-carousel-slide>
      </q-carousel>
    </q-card-section>
  </q-card>
</template>

<script setup>
import {
  ref,
  onMounted,
  defineComponent,
  defineAsyncComponent,
  computed,
} from "vue";
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

const valorAhorro = ref(0);
const valorAahorrar = ref(0);
const tipoAhorro = ref("");
const ahorroCarousel = ref("1");
const sumarValorAhorradoenMetas = ref(false);

const opcionesTipoAhorro = ref([
  { value: "Pago", label: "Pago" },
  { value: "Remesa", label: "Remesa" },
]);

onMounted(async () => {
  try {
    await ahorrosStore.cargarTotalAhorrado(sumarValorAhorradoenMetas.value);
    await ahorrosStore.cargarValorAAhorrar();

    valorAahorrar.value = ahorrosStore.valorAAhorrar;
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

const valorTotalAhorro = computed({
  get() {
    return ahorrosStore.ahorroTotal;
  },
});

const imagenAhorro = computed(() => {
  if (ahorrosStore.ahorroTotal !== 0) {
    const porcentajeAhorro =
      (ahorrosStore.ahorroTotal / valorAahorrar.value) * 100;

    if (porcentajeAhorro < 10) {
      return 0;
    } else if (porcentajeAhorro >= 10 && porcentajeAhorro < 25) {
      return 1;
    } else if (porcentajeAhorro >= 25 && porcentajeAhorro < 70) {
      return 2;
    } else {
      return 3;
    }
  } else {
    return 0;
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

    if (!tipoAhorro.value && !valorAhorro.value) {
      throw new Error("llene los datos correctamente");
    }

    const registroAhorrar = {
      valor_ahorro: valorAhorro.value,
      tipo_ahorro: tipoAhorro.value,
    };

    await ahorrosStore.agregarAhorro(registroAhorrar);
    await ahorrosStore.cargarTotalAhorrado(sumarValorAhorradoenMetas.value);
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

async function guardarValorAAlcanzar() {
  try {
    $q.loading.show({
      message: "guardando ...",
    });

    if (valorAahorrar.value < 0) {
      throw new Error("Ingrese un valor valido");
    }

    await ahorrosStore.actualizarValorAAhorrar(valorAahorrar.value);

    $q.notify({
      progress: true,
      message: "Se actualizo con exito!",
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

async function consultarTotal() {
  try {
    await ahorrosStore.cargarTotalAhorrado(sumarValorAhorradoenMetas.value);
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
