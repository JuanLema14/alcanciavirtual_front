<template>
  <q-page class="row" style="background: linear-gradient(180deg, rgba(242,246,255,1) 41%, rgba(59,19,97,1) 84%);">
    <div class="col-xl-6 col-lg-6 col-md-6 col-xs-12 backg_form row justify-center" style="padding-top: 6vmax;">
      <q-card style="border-radius: 20px; width: 24vmax; height: 30vmax;"
        class="warning backg_form_slider flex flex-center">
        <q-tabs v-model="loginTabs" dense class="text-grey" active-color="primary" indicator-color="primary"
          narrow-indicator>
          <q-tab name="signIn" label="sign In" class="q-pa-md" />
          <q-tab name="signUp" label="sign Up" class="q-pa-md" />
        </q-tabs>
        <!-- <div class="col-xl-6 col-lg-6 col-md-6 col-xs-12 flex flex-center" v-if="$q.platform.is.mobile">

        </div> -->
        <q-tab-panels v-model="loginTabs" animated transition-prev="scale" transition-next="scale"
          @transition="limpiarForm()"
          style="border-radius: 20px; background: white; -webkit-box-shadow: 0px -9px 20px -5px rgba(0,0,0,0.2); box-shadow: 0px -9px 20px -5px rgba(0,0,0,0.2);">
          <q-tab-panel name="signIn">
            <q-card-section class="flex flex-center">
              <div class="warning" v-show="errorAutenticacion && mostrarAviso">
                <aviso-estado :texto="mensaje" :cancelar="true" @ocultarAviso="editarAviso" class="q-pb-md" />
              </div>
              <div>
                <div class="q-pb-md">
                </div>
                <div class="text-h6 text-grey-5">
                  <span class="textoDegradado text-weight-bold row">¡Bienvenido de nuevo!</span>
                  inicio de sesion
                </div>
              </div>
            </q-card-section>

            <q-form @submit.prevent="onSubmit" ref="form">
              <div>
                <div class="text-secondary text-weight-bold q-pa-sm">Email</div>
                <q-input v-model="email" type="email" label="Email" :rules="validations['email']" lazy-rules autofocus
                  outlined dense />
              </div>

              <div>
                <div class="text-secondary text-weight-bold q-pa-sm">
                  Password
                </div>
                <q-input v-model="password" outlined dense color="primary" label="Password"
                  :type="showPassword ? 'text' : 'password'" :rules="validations['password']">
                  <template v-slot:append>
                    <q-icon :name="showPassword ? 'visibility' : 'visibility_off'" class="cursor-pointer"
                      @click="showPassword = !showPassword" />
                  </template>
                </q-input>
              </div>

              <q-card-section class="row justify-center">
                <div class="col-xl-6 col-lg-6 col-md-10 col-xs-10">
                  <q-btn type="submit" class="full-width degradadoBoton" rounded text-color="white"
                    label="Iniciar sesión" />
                </div>
              </q-card-section>

            </q-form>
          </q-tab-panel>

          <q-tab-panel name="signUp">
            <q-card-section class="flex flex-center">
              <div class="warning" v-show="errorAutenticacion && mostrarAviso"
                style="position: absolute; z-index: 10000;">
                <aviso-estado :texto="mensaje" :cancelar="true" @ocultarAviso="editarAviso" class="q-pb-md" />
              </div>
              <div>
                <div class="q-pb-md">
                </div>
                <div class="text-h6 text-grey-5">
                  <span class="textoDegradado text-weight-bold row">¡Crea tu cuenta con nosotros!</span>
                  Registro
                </div>
              </div>
            </q-card-section>
            <q-form @submit.prevent="onSubmitsignUp" ref="form">

              <div>
                <div class="text-secondary text-weight-bold q-pa-sm">Email</div>
                <q-input v-model="emailR" type="email" label="Email" :rules="validations['email']" lazy-rules outlined
                  dense />
              </div>

              <div>
                <div class="text-secondary text-weight-bold q-pa-sm">User Name</div>
                <q-input v-model="userName" label="User Name" :rules="validations['userName']" lazy-rules outlined
                  dense />
              </div>

              <div>
                <div class="text-secondary text-weight-bold q-pa-sm">
                  Password
                </div>
                <q-input v-model="passwordR" outlined dense color="primary" label="Password"
                  :type="showPassword ? 'text' : 'password'" :rules="validations['password']">
                  <template v-slot:append>
                    <q-icon :name="showPassword ? 'visibility' : 'visibility_off'" class="cursor-pointer"
                      @click="showPassword = !showPassword" />
                  </template>
                </q-input>
              </div>

              <q-card-section class="row justify-center">
                <div class="col-xl-6 col-lg-6 col-md-10 col-xs-10">
                  <q-btn type="submit" class="full-width degradadoBoton" rounded text-color="white"
                    label="Crear cuenta" />
                </div>
              </q-card-section>

            </q-form>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>

    <div class="col-xl-6 col-lg-6 col-md-6 col-xs-12 flex flex-center backg_image" v-if="!$q.platform.is.mobile">
      <div style="z-index: 1000;">
        <div class="row flex flex-center">
          <img src="~assets/logo.png" style="width: 25vmax;" />
        </div>
      </div>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"
        style="width: 40vmax; z-index: 0; position: absolute;">
        <path fill="#F5ACFF"
          d="M42.7,-77.8C53.2,-68,57.8,-52.1,63.2,-38.1C68.5,-24.1,74.4,-12,73.1,-0.8C71.8,10.5,63.2,21,56.2,32.2C49.3,43.4,44.1,55.3,35,65.6C25.9,75.9,12.9,84.6,1,82.8C-10.9,81,-21.8,68.9,-31.1,58.7C-40.4,48.5,-48.1,40.4,-57.4,30.9C-66.8,21.5,-77.8,10.7,-81,-1.9C-84.2,-14.5,-79.7,-28.9,-72.7,-42.5C-65.8,-56,-56.4,-68.7,-43.8,-77.2C-31.3,-85.8,-15.6,-90.2,0.3,-90.6C16.2,-91.1,32.3,-87.5,42.7,-77.8Z"
          transform="translate(100 100)" />
      </svg>
    </div>
  </q-page>
</template>

<script setup>
import { ref, defineAsyncComponent, defineComponent } from "vue";
import { useAuthStore } from "stores/auth-store";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const AvisoEstado = defineAsyncComponent(() =>
  import("../components/avisos/AvisoEstado.vue")
);

const userName = ref("");
const email = ref("");
const emailR = ref("");
const password = ref("");
const passwordR = ref("");
const showPassword = ref(false);
const mensaje = ref("");
const mostrarAviso = ref(true);
const router = useRouter();
const $q = useQuasar();
const autenticacionStore = useAuthStore();
const form = ref("");
const errorAutenticacion = ref(false);
const loginTabs = ref("signIn")

function limpiarForm() {
  userName.value = "";
  email.value = "";
  emailR.value = "";
  password.value = "";
  passwordR.value = "";
  showPassword.value = false;
  mensaje.value = "";
  mostrarAviso.value = false;
}

const validations = {
  email: [(val) => val !== "" || "Campo requerido"],
  password: [(val) => val !== "" || "Campo requerido"],
  userName: [(val) => val !== "" || "Campo requerido"],
};

function editarAviso(estado) {
  mostrarAviso.value = estado;
}

function onSubmit() {
  try {
    $q.loading.show({
      backgroundColor: "#fff",
      message: "Ingresando a la aplicación ...",
      messageColor: "white",
    });

    autenticacionStore
      .doLogin({
        body: {
          email: email.value,
          password: password.value,
        },
      })
      .then((response) => {
        if (autenticacionStore.responseAuth.estado === "NOK") {
          mensaje.value = "mensaje de error prueba";
          errorAutenticacion.value = true;
          mostrarAviso.value = true;
        } else {
          email.value = null;
          form.value = null;
          password.value = null;
          router.push("/main");
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 0) {
            mensaje.value = "En este momento no es posible conectarse con el servidor por favor comuniquese con el administrador";
            errorAutenticacion.value = true;
            mostrarAviso.value = true;
          }
        } else {
          mensaje.value = "En este momento no es posible conectarse con el servidor por favor comuniquese con el administrador";
          errorAutenticacion.value = true;
          mostrarAviso.value = true;
        }
      })
      .finally(() => {
        $q.loading.hide();
      });

  } catch (error) {
    console.log(error)
  }

}

async function onSubmitsignUp() {
  $q.loading.show({
    backgroundColor: "#fff",
    message: "Ingresando a la aplicación ...",
    messageColor: "white",
  });

  try {

    autenticacionStore.signUp({
      nombre: userName.value,
      email: emailR.value,
      password: passwordR.value,
    })
      .then((response) => {
        if (autenticacionStore.responseSignUp.estado === "NOK") {
          mensaje.value = autenticacionStore.responseSignUp.mensaje;
          errorAutenticacion.value = true;
          mostrarAviso.value = true;
        } else {
          email.value = emailR.value;
          password.value = passwordR.value;
          $q.loading.hide()
          onSubmit()
        }
      })
  } catch (error) {
    console.log(error);
  } finally {
    $q.loading.hide()
  }

}


defineComponent({
  name: 'LoginPage',
});
</script>

<style>
.degradadoBoton {
  background: linear-gradient(156deg, rgba(162, 27, 191, 1) 19%, rgba(110, 34, 172, 1) 47%, rgba(59, 19, 97, 1) 74%);
}

.textoDegradado {
  font-size: 2vmax;
  background: linear-gradient(156deg, rgba(162, 27, 191, 1) 19%, rgba(110, 34, 172, 1) 47%, rgba(59, 19, 97, 1) 74%);
  -webkit-background-clip: text;
  color: transparent;
}

.warning {
  -webkit-box-shadow: -1px 14px 24px -5px rgba(57, 66, 196, 0.5);
  box-shadow: -1px 14px 24px -5px rgba(11, 19, 138, 0.2);
}

.backg_image {
  background: linear-gradient(194deg, rgba(162, 27, 191, 1) 0%, rgba(59, 19, 97, 1) 84%);
  border-radius: 100px 0px 0px 0px;
  height: 120vmax;

}


.backg_form {
  background: #f2f6ff;
  border-radius: 0px 0px 100px 0px;
  height: 120vmax;
}

.backg_form_slider {
  background: #f8f8f8;
  border-radius: 20px;
}

.title {
  font-family: 'atiba';
}
</style>
