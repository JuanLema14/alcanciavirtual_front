import { defineStore } from "pinia";
import { axiosInstance } from "boot/axios";
import { Cookies } from "quasar";
import { ref } from "vue";

const REGISTER_ROUTE = process.env.REGISTER_ROUTE;
const LOGIN_ROUTE = process.env.LOGIN_ROUTE;
const FETCH_USER_ROUTE = process.env.FETCH_USER_ROUTE;

export const useAuthStore = defineStore("autenticacion", () => {
  const responseAuth = ref(null);
  const responseSignUp = ref(null);
  const nombre = ref("");
  const email = ref("");
  const loginCallbacks = [];

  async function signUp(data) {
    try {
      return new Promise(async (resolve, reject) => {
        return axiosInstance
          .post(REGISTER_ROUTE, data)
          .then((response) => {
            if (response.data.estado === "OK") {
              responseSignUp.value = response.data;
              resolve();
            } else {
              responseSignUp.value = response.data;
              resolve();
            }
          })
          .catch(function (error) {
            console.log(error);
            reject(error);
          });
      });
    } catch (error) {}
  }

  async function doLogin(data) {
    try {
      const params = {
        email: data.body.email,
        password: data.body.password,
      };
      return new Promise((resolve, reject) => {
        return axiosInstance
          .post(LOGIN_ROUTE, params)
          .then((response) => {
            if (response.data.estado === "OK") {
              responseAuth.value = response.data;
              nombre.value = response.data.nombre;
              email.value = response.data.email;
              setHeader({
                token: response.headers.authorization,
              });
              resolve();
            } else {
              reject(
                new Error("Ocurrio un error al intentar autenticar al usuario!")
              );
            }
          })
          .catch(function (error) {
            console.log(error);
            reject(error);
          });
      });
    } catch (error) {}
  }

  function loggedIn() {
    return responseAuth.value !== null;
  }

  async function setHeader(data) {
    axiosInstance.defaults.headers.common.Authorization = data.token;
    Cookies.set("authorization_token", data.token);
  }

  async function fetch() {
    const token = Cookies.get("authorization_token");
    if (token) {
      axiosInstance.defaults.headers.common.Authorization = "Bearer " + token;
    }

    return new Promise((resolve, reject) => {
      if (axiosInstance.defaults.headers.common.Authorization) {
        return axiosInstance
          .get(FETCH_USER_ROUTE)
          .then((response) => {
            if (response.data.estado === "OK") {
              responseAuth.value = response.data;
              nombre.value = response.data.nombre;
              email.value = response.data.email;
              resolve();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        reject(new Error("No authorization token found"));
      }
    });
  }

  async function logout() {
    Cookies.remove("authorization_token");
    responseAuth.value = null;
  }

  return {
    email,
    nombre,
    responseAuth,
    responseSignUp,
    fetch,
    logout,
    signUp,
    doLogin,
    loggedIn,
    setHeader,
  };
});
