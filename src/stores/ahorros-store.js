import { defineStore } from "pinia";
import { axiosInstance } from "../boot/axios";
import { ref } from "vue";

const RUTA_TOTAL_AHORROS = "/ahorro/ahorrototal";
const RUTA_CARGAR_AHORROS = "/ahorro/listarahorro";
const RUTA_AGREGAR_AHORRO = "/ahorro/agregarahorro";
const RUTA_CONSULTAR_AHORRO = "/ahorro/consultarahorro";
const RUTA_ACTUALIZAR_AHORRO = "/ahorro/actualizarahorro";
const RUTA_RETIRAR_AHORRO = "/ahorro/retirarahorro";

export const useAhorrosStore = defineStore("storeAhorros", () => {
  const ahorros = ref({
    data: [],
  });

  const ahorroTotal = ref(0);

  const cargarTotalAhorrado = async (sumarValorMetas) => {
    try {
      const params = {
        params: {
          valorMetas: sumarValorMetas,
        },
      };

      return new Promise(async function (resolve, reject) {
        await axiosInstance
          .get(RUTA_TOTAL_AHORROS, null, params)
          .then((response) => {
            if (response.data) {
              ahorroTotal.value = response.data;
              resolve();
            } else {
              reject(
                new Error("Ha ocurrido un error, consulte con el Administrador")
              );
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    } catch (error) {
      throw error;
    }
  };

  const cargarAhorros = async (original) => {
    try {
      return new Promise(async function (resolve, reject) {
        await axiosInstance
          .get(RUTA_CARGAR_AHORROS)
          .then((response) => {
            if (response.data) {
              ahorros.value.data = response.data;
              resolve();
            } else {
              reject(
                new Error("Ha ocurrido un error, consulte con el Administrador")
              );
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    } catch (error) {
      throw error;
    }
  };

  async function agregarAhorro(ahorroParam) {
    try {
      const params = {
        params: {
          valor_ahorro: +ahorroParam.valor_ahorro,
          tipo_ahorro: ahorroParam.tipo_ahorro.value,
        },
      };

      const p = new Promise(async function (resolve, reject) {
        try {
          await axiosInstance
            .post(RUTA_AGREGAR_AHORRO, null, params)
            .then((response) => {
              if (response.data) {
                resolve(response.data);
              } else {
                reject(
                  new Error(
                    "Ha ocurrido un error, consulte con el Administrador"
                  )
                );
              }
            })
            .catch((error) => {
              reject(error);
            });
        } catch (error) {
          reject(error);
        }
      });
      return p;
    } catch (error) {
      console.log("Error en el proceso:", error.message);
    }
  }

  async function consultarAhorro(idAhorro) {
    try {
      const p = new Promise(async function (resolve, reject) {
        try {
          await axiosInstance
            .get(RUTA_CONSULTAR_AHORRO + "/" + idAhorro)
            .then((response) => {
              if (response.data) {
                resolve(response.data);
              } else {
                reject(
                  new Error(
                    "Ha ocurrido un error, consulte con el Administrador"
                  )
                );
              }
            })
            .catch((error) => {
              reject(error);
            });
        } catch (error) {
          reject(error);
        }
      });
      return p;
    } catch (error) {
      console.log("Error en el proceso:", error.message);
    }
  }

  async function actualizarAhorro(datosAhorro) {
    try {
      const params = {
        id: datosAhorro.id,
        valor_ahorro: +datosAhorro.valor_ahorro,
        tipo_ahorro: datosAhorro.tipo_ahorro,
        fecha_ingreso: datosAhorro.fecha_ingreso,
      };

      const p = new Promise(async function (resolve, reject) {
        try {
          await axiosInstance
            .put(RUTA_ACTUALIZAR_AHORRO + "/" + datosAhorro.id, params)
            .then((response) => {
              if (response.data) {
                resolve(response.data);
              } else {
                reject(
                  new Error(
                    "Ha ocurrido un error, consulte con el Administrador"
                  )
                );
              }
            })
            .catch((error) => {
              reject(error);
            });
        } catch (error) {
          reject(error);
        }
      });
      return p;
    } catch (error) {
      console.log("Error en el proceso:", error.message);
    }
  }

  async function retirarAhorro(id) {
    try {
      const p = new Promise(async function (resolve, reject) {
        try {
          await axiosInstance
            .delete(RUTA_RETIRAR_AHORRO + "/" + id)
            .then((response) => {
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        } catch (error) {
          reject(error);
        }
      });
      return p;
    } catch (error) {
      console.log("Error en el proceso:", error.message);
    }
  }

  return {
    cargarAhorros,
    agregarAhorro,
    consultarAhorro,
    actualizarAhorro,
    cargarTotalAhorrado,
    retirarAhorro,
    ahorros,
  };
});
