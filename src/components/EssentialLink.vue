<template>
  <q-item
    clickable
    autofocus
    @click="irAlLink(link)"
    style="margin: 4%; border-radius: 5px; width: 76%"
    :class="claseLinkSeleccionado"
  >
    <q-item-section v-if="icon" avatar>
      <div class="row flex flex-center">
        <q-avatar
          style="width: 2.3vmax; height: 2.3vmax"
          rounded
          :icon="icon"
          :text-color="iconoColor"
          :class="validarClick(link)"
        />
      </div>
    </q-item-section>
    <q-item-section>
      <q-item-label :class="textoColorClase">{{ text }}</q-item-label>
      <q-item-label v-if="icon" caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { useRoutesStore } from "stores/routes-store.js";
import { useRouter } from "vue-router";
import { ref } from "vue";

const routesStore = useRoutesStore();
const router = useRouter();
const props = defineProps({
  text: {
    type: String,
    required: true,
  },

  caption: {
    type: String,
    default: "",
  },

  link: {
    type: String,
    default: "#",
  },

  icon: {
    type: String,
    default: "",
  },

  color: {
    type: String,
    default: "grey",
  },
});

const iconoColor = ref("secondary");
const textoColorClase = ref("text-secondary");
const claseLinkSeleccionado = ref("");

function validarClick(link) {
  if (routesStore.linkActualMenu.length) {
    if (routesStore.linkActualMenu.includes(link)) {
      iconoColor.value = "white";
      claseLinkSeleccionado.value = "shadowBox bg-white flat";
      textoColorClase.value = "text-secondary";
      return "bg-primary text-white shadow-1";
    } else {
      claseLinkSeleccionado.value = "";
      textoColorClase.value = "text-grey-6";
      iconoColor.value = "secondary";
      return "shadowBox";
    }
  } else {
    return "shadowBox";
  }
}

async function irAlLink(link) {
  routesStore.linkActualMenu = [];
  routesStore.linkActualMenu.push(link);
  router.push(link);
}
</script>

<style scoped>
.shadowBox {
  -webkit-box-shadow: -1px 14px 24px -5px rgba(57, 66, 196, 0.54);
  box-shadow: -1px 14px 24px -5px rgba(11, 19, 138, 0.54);
}
</style>
